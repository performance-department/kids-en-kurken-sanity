import {CommentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const commentType = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({name: 'author', type: 'string'}),
    defineField({name: 'date', type: 'datetime'}),
    defineField({name: 'content', type: 'array', of: [{type: 'block'}, {type: 'image'}]}),
    defineField({name: 'post', type: 'reference', to: [{type: 'post'}]}),
    defineField({name: 'parent', type: 'reference', to: [{type: 'comment'}]}),
  ],
})
