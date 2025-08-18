import {ComposeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
      hidden: ({document}) => !document?.title,
    }),
    defineField({name: 'date', type: 'datetime', initialValue: () => new Date().toISOString()}),
    defineField({name: 'content', type: 'array', of: [{type: 'block'}, {type: 'image'}]}),
    defineField({name: 'featuredMedia', type: 'image'}),
    defineField({name: 'sticky', type: 'boolean'}),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],

  orderings: [
    {
      title: 'Date (newest first)',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Date (oldest first)',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],
})
