import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {documentInternationalization} from '@sanity/document-internationalization'
import {structure} from './structure'
import {media} from 'sanity-plugin-media'
import {nlNLLocale} from '@sanity/locale-nl-nl'
import {assist} from '@sanity/assist'
import {locations, mainDocuments} from './presentation/resolve'

export default defineConfig({
  name: 'default',
  title: 'Kids en Kurken',

  projectId: 'xgffjas2',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
    // presentationTool({
    //   resolve: {locations, mainDocuments},
    //   previewUrl: {
    //     origin: 'https://kids-en-kurken.vercel.app',
    //     previewMode: {
    //       enable: '/preview/enable',
    //       disable: '/preview/disable',
    //     },
    //   },
    // }),
    media(),
    documentInternationalization({
      supportedLanguages: [
        {id: 'nl', title: 'Dutch'},
        {id: 'en', title: 'English'},
      ],
      schemaTypes: ['post', 'category', 'tag'],
    }),
    nlNLLocale(),
    assist({
      translate: {
        document: {
          languageField: 'language',
          documentTypes: ['post', 'category', 'tag'],
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => [
      {
        id: 'post-nl',
        title: 'Bericht',
        schemaType: 'post',
        value: {language: 'nl'},
      },
      {
        id: 'category-nl',
        title: 'Categorie',
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
