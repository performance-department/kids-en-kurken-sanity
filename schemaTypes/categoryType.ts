import {FilterIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: FilterIcon,
  fields: [
    defineField({name: 'name', type: 'string'}),
    defineField({name: 'slug', type: 'slug'}),
    defineField({name: 'parent', type: 'reference', to: [{type: 'category'}]}),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
})
