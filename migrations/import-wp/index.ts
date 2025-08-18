import {decode} from 'html-entities'
import type {SanityDocumentLike} from 'sanity'
import {createOrReplace, defineMigration} from 'sanity/migrate'
import type {WP_REST_API_Post, WP_REST_API_Term} from 'wp-types'

import {getDataTypes} from './lib/getDataTypes'
import {wpDataTypeFetch} from './lib/wpDataTypeFetch'

export default defineMigration({
  title: 'Import WP JSON data',

  async *migrate() {
    const {wpType, sanityType} = getDataTypes(process.argv)
    let page = 1
    let hasMore = true

    while (hasMore) {
      try {
        let wpData = await wpDataTypeFetch(wpType, page)

        if (Array.isArray(wpData) && wpData.length) {
          const docs: SanityDocumentLike[] = []

          for (let wpDoc of wpData) {
            const doc: SanityDocumentLike = {
              _id: `${sanityType}-${wpDoc.id}`,
              _type: sanityType,
            }

            if (wpType === 'posts') {
              wpDoc = wpDoc as WP_REST_API_Post
              doc.title = decode(wpDoc.title.rendered).trim()
              doc.slug = {_type: 'slug', current: wpDoc.slug}
              doc.date = new Date(`${wpDoc.date_gmt}Z`).toISOString()
              doc.language = 'nl'
              doc.sticky = wpDoc.sticky == true
            } else if (wpType === 'categories' || wpType === 'tags') {
              wpDoc = wpDoc as WP_REST_API_Term
              doc.name = decode(wpDoc.name).trim()
              doc.slug = {_type: 'slug', current: wpDoc.slug}
              doc.language = 'nl'
            }

            docs.push(doc)
          }

          yield docs.map((doc) => createOrReplace(doc))
          page++
        } else {
          hasMore = false
        }
      } catch (error) {
        console.error(`Error fetching data for page ${page}:`, error)
        hasMore = false
      }
    }
  },
})
