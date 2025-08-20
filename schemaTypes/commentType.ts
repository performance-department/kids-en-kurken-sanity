import {CommentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const commentType = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'post',
      type: 'reference',
      to: [{type: 'post'}],
      weak: true,
      readOnly: true,
    }),
    defineField({
      name: 'parent',
      type: 'reference',
      to: [{type: 'comment'}],
      weak: true,
      readOnly: true,
    }),
    defineField({name: 'authorName', title: 'Naam', type: 'string', readOnly: true}),
    defineField({name: 'authorEmail', title: 'E-mail', type: 'string', readOnly: true}),
    defineField({name: 'content', type: 'text', rows: 4}),
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
    defineField({name: 'date', type: 'datetime', readOnly: true}),
  ],
})
