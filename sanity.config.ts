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
        styleguide: `
    TITLE: NL → [Target] Translation & Name Handling

    GOAL
    - Fluent, accurate translation.
    - Names handled safely.

    PROPER NOUNS (KEEP)
    - Real people, brands, orgs, products, handles, hashtags, emails, URLs, IDs.
    - Surnames unchanged; diacritics preserved.
    - Places: use common exonym only if standard (e.g., Londen→London); else keep.

    PERSON NAMES
    1) Default: KEEP given names as written.
    2) Preserve gender. Never swap female↔male.
    3) Real vs placeholder:
       - Real person (byline, quote attribution, staff, customer) → KEEP EXACTLY.
       - Clearly generic examples (“Jan en Piet…”, “Janneke…”) → MAY adapt to a common target-language equivalent of the SAME GENDER.
       - If unsure → KEEP.
    4) Compound names stay compound (Jan-Willem, Anne-Marie). Initials/titles kept; translate generic title words if standard (prof.→Prof.).

    SAFE EQUIVALENTS (ONLY for obvious placeholders)
    - EN: Jan→John; Johan→John; Pieter→Peter; Willem→William; Johanna→Joanna; Maria→Mary.
    - DE: Jan→Johann; Pieter→Peter; Willem→Wilhelm.
    - FR: Jan/Johan→Jean; Pieter→Pierre; Willem→Guillaume; Johanna→Jeanne; Maria→Marie.
    - ES: Jan/Johan→Juan; Pieter→Pedro; Willem→Guillermo; Johanna→Juana; Maria→María.
    - KEEP across languages (do not adapt unless author explicitly says it’s a placeholder): Anne, Irene, Laura, Karin, Eva, Jacob.

    DO NOT
    - Do not fabricate new names.
    - Do not translate brands/surnames.
    - Do not change a name if there’s ANY doubt.

    EXAMPLES
    - “Anne werkt bij Acme.” → “Anne works at Acme.” (unchanged, female)
    - “Jan en Piet bespreken…” → EN: “John and Peter discuss…” (placeholder)

    QUALITY CHECK
    - Re-scan all names: real? keep. placeholder? map same gender. unsure? keep. “Anne” never becomes “John”.
    `,
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
