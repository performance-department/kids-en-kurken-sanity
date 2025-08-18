import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {documentInternationalization} from '@sanity/document-internationalization'

export default defineConfig({
  name: 'default',
  title: 'Kids en Kurken',

  projectId: 'k0ht5mjl',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
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
  },
})
