import {CommentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const commentBucketType = defineType({
  name: 'commentBucket',
  title: 'Comment Bucket',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{type: 'post'}],
      weak: true,
      readOnly: true,
      description: 'The post these comments belong to',
    }),
    defineField({
      name: 'bucketIndex',
      title: 'Bucket Index',
      type: 'number',
      description: 'Bucket index for this post (0-based if post has multiple buckets)',
      readOnly: true,
    }),
    defineField({
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'comment',
          title: 'Comment',
          fields: [
            defineField({
              name: 'wpId',
              title: 'WordPress ID',
              type: 'number',
              description: 'Original WordPress comment ID',
              readOnly: true,
            }),

            defineField({
              name: 'parentWpId',
              title: 'Parent WordPress ID',
              type: 'number',
              description: 'WordPress ID of parent comment (if reply)',
              readOnly: true,
            }),
            defineField({
              name: 'authorName',
              title: 'Author Name',
              type: 'string',
              readOnly: true,
            }),
            defineField({
              name: 'authorEmail',
              title: 'Author Email',
              type: 'string',
              readOnly: true,
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'status',
              title: 'Status',
              type: 'string',
              initialValue: 'approved',
              options: {
                list: [
                  {title: 'Approved', value: 'approved'},
                  {title: 'Pending', value: 'hold'},
                  {title: 'Spam', value: 'spam'},
                  {title: 'Trash', value: 'trash'},
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'date',
              title: 'Date',
              type: 'datetime',
              readOnly: true,
            }),
          ],
          preview: {
            select: {
              authorName: 'authorName',
              content: 'content',
              date: 'date',
            },
            prepare({authorName, content, date}) {
              return {
                title: authorName || 'Anonymous',
                subtitle: content ? `${content.slice(0, 100)}...` : 'No content',
                media: CommentIcon,
              }
            },
          },
        },
      ],
      options: {
        layout: 'list',
      },
    }),
    defineField({
      name: 'commentCount',
      title: 'Comment Count',
      type: 'number',
      description: 'Number of comments in this bucket',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      postTitle: 'post.title',
      bucketIndex: 'bucketIndex',
      commentCount: 'commentCount',
    },
    prepare({postTitle, bucketIndex, commentCount}) {
      return {
        title: `Comments: ${postTitle || 'Unknown Post'}`,
        subtitle: `Bucket ${bucketIndex} • ${commentCount || 0} comments`,
        media: CommentIcon,
      }
    },
  },
})
