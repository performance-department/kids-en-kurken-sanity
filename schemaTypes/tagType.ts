import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const tagType = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({name: 'name', type: 'string'}),
    defineField({name: 'slug', type: 'slug'}),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
})
