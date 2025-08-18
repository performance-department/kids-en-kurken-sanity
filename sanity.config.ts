import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {documentInternationalization} from '@sanity/document-internationalization'
import {structure} from './structure'
import {media} from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'Kids en Kurken',

  projectId: 'k0ht5mjl',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
    media(),
    documentInternationalization({
      supportedLanguages: [
        {id: 'nl', title: 'Dutch'},
        {id: 'en', title: 'English'},
      ],
      schemaTypes: ['post', 'category', 'tag'],
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => [
      {
        id: 'post-nl',
        title: 'Post',
        schemaType: 'post',
        value: {language: 'nl'},
      },
      {
        id: 'category-nl',
        title: 'Category',
        schemaType: 'category',
        value: {language: 'nl'},
      },
      {
        id: 'tag-nl',
        title: 'Tag',
        schemaType: 'tag',
        value: {language: 'nl'},
      },
    ],
  },
})
