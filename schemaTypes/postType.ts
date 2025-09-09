import {ComposeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Bericht',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    defineField({name: 'title', title: 'Titel', type: 'string'}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        documentInternationalization: {
          exclude: true,
        },
      },
      validation: (rule) => rule.required(),
      hidden: ({document}) => !document?.title,
    }),
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}, {type: 'externalImage'}, {type: 'youtube'}],
    }),
    defineField({name: 'featuredMedia', title: 'Uitgelichte afbeelding', type: 'image'}),
    defineField({name: 'sticky', type: 'boolean'}),
    defineField({
      name: 'categories',
      title: 'Categorieën',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
      options: {
        documentInternationalization: {
          exclude: true,
        },
      },
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
      options: {
        documentInternationalization: {
          exclude: true,
        },
      },
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
      title: 'Datum (nieuwste eerst)',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Datum (oudste eerst)',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],
})
