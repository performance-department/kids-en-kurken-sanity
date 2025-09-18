import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Pagina',
  type: 'document',
  icon: DocumentTextIcon,
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
      name: 'content',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
})
