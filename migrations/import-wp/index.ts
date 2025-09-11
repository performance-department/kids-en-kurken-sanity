import {createClient} from '@sanity/client'
import pLimit from 'p-limit'
import {createOrReplace, defineMigration} from 'sanity/migrate'
import type {WP_REST_API_Comment, WP_REST_API_Post, WP_REST_API_Term} from 'wp-types'

import {getDataTypes} from './lib/getDataTypes'
import {sanityFetchImages} from './lib/sanityFetchImages'
import {transformToPost} from './lib/transformToPost'
import {transformToCategory} from './lib/transformToCategory'
import {transformToTag} from './lib/transformToTag'
import {transformToCommentBucket} from './lib/transformToCommentBucket'
import {wpDataTypeFetch} from './lib/wpDataTypeFetch'

const limit = pLimit(5)

// Add image imports, parallelized and limited
export default defineMigration({
  title: 'Import WP JSON data',

  async *migrate(docs, context) {
    // Create a full client to handle image uploads
    const client = createClient(context.client.config())

    // Create an in-memory image cache to avoid re-uploading images
    const existingImages = await sanityFetchImages(client)

    const {wpType} = getDataTypes(process.argv)
    let page = 1
    let hasMore = true

    // For comments, we need to collect all comments first and group them by post
    if (wpType === 'comments') {
      const allComments: WP_REST_API_Comment[] = []

      // Collect all comments from all pages
      while (hasMore) {
        try {
          const wpData = await wpDataTypeFetch(wpType, page)

          if (Array.isArray(wpData) && wpData.length) {
            allComments.push(...(wpData as WP_REST_API_Comment[]))
            page++
          } else {
            hasMore = false
          }
        } catch (error) {
          console.error(`Error fetching comments for page ${page}:`, error)
          hasMore = false
        }
      }

      console.log(
        `Collected ${allComments.length} comments, grouping by post and creating buckets...`,
      )

      // Group comments by post ID
      const commentsByPost = new Map<number, WP_REST_API_Comment[]>()

      for (const comment of allComments) {
        const postId = typeof comment.post === 'number' ? comment.post : 0
        if (postId > 0) {
          if (!commentsByPost.has(postId)) {
            commentsByPost.set(postId, [])
          }
          commentsByPost.get(postId)!.push(comment)
        }
      }

      console.log(`Found comments for ${commentsByPost.size} posts`)

      // Create buckets of up to 100 comments per post
      const bucketSize = 100
      let totalBuckets = 0

      for (const [postId, comments] of commentsByPost.entries()) {
        let bucketIndex = 0

        for (let i = 0; i < comments.length; i += bucketSize) {
          const commentChunk = comments.slice(i, i + bucketSize)
          const bucket = transformToCommentBucket(commentChunk, postId, bucketIndex)

          yield [createOrReplace(bucket)]
          bucketIndex++
          totalBuckets++
        }
      }

      console.log(`Created ${totalBuckets} comment buckets across ${commentsByPost.size} posts`)
    } else {
      // Handle other types as before
      while (hasMore) {
        try {
          let wpData = await wpDataTypeFetch(wpType, page)

          if (Array.isArray(wpData) && wpData.length) {
            // Create an array of concurrency-limited promises to stage documents
            const docs = wpData.map((wpDoc) =>
              limit(async () => {
                if (wpType === 'posts') {
                  wpDoc = wpDoc as WP_REST_API_Post
                  const doc = await transformToPost(wpDoc, client, existingImages)
                  return doc
                } else if (wpType === 'categories') {
                  wpDoc = wpDoc as WP_REST_API_Term
                  const doc = await transformToCategory(wpDoc)
                  return doc
                } else if (wpType === 'tags') {
                  wpDoc = wpDoc as WP_REST_API_Term
                  const doc = await transformToTag(wpDoc)
                  return doc
                }

                hasMore = false
                throw new Error(`Unhandled WordPress type: ${wpType}`)
              }),
            )

            // Resolve all documents concurrently, throttled by p-limit
            const resolvedDocs = await Promise.all(docs)

            yield resolvedDocs.map((doc) => createOrReplace(doc))
            page++
          } else {
            hasMore = false
          }
        } catch (error) {
          console.error(`Error fetching data for page ${page}:`, error)
          // Stop the loop in case of an error
          hasMore = false
        }
      }
    }
  },
})
