import {defineConfig} from 'sanity'
// import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {documentInternationalization} from '@sanity/document-internationalization'
import {structure} from './structure'
import {media} from 'sanity-plugin-media'
import {nlNLLocale} from '@sanity/locale-nl-nl'
import {assist} from '@sanity/assist'
// import {locations, mainDocuments} from './presentation/resolve'

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
      schemaTypes: ['post', 'category', 'tag', 'page'],
    }),
    nlNLLocale(),
    assist({
      translate: {
        styleguide: `
    TITLE: NL→EN Translation + Name Localization

    SCOPE
    - Translate to natural English.
    - Localize Dutch GIVEN NAMES to common English forms, preserving gender.
    - Never change brands, orgs, products, handles, hashtags, emails, URLs, IDs, or surnames.

    WHEN TO LOCALIZE A GIVEN NAME
    - Localize if it appears as a standalone given name in running text (examples, personas, stories).
    - KEEP EXACTLY if: byline/author credit, quote attribution, full name with surname, staff/customer case studies, tagged person, handle/email.
    - If uncertain, keep.

    NEVER DO
    - Never swap gender.
    - Never invent a new person.
    - Never translate surnames or brand names.

    KEEP AS-IS (already common in EN)
    - Anne, Laura, Irene, Eva, Karin, Emma, Julia, Sara/Sarah, Anna, Lisa, Anouk, Lotte (unless clearly a placeholder → “Lottie” optional).

    LOCALIZE MAP (NL → EN, use only for given names without surname or clear placeholders)
    - Jan → John
    - Johan → John
    - Piet / Pieter → Peter
    - Willem → William
    - Hendrik → Henry
    - Henk → Henry
    - Dirk → Derek
    - Joost → Justin (only if clearly placeholder; else keep)
    - Johanna → Joanna
    - Janneke → Joanna
    - Hanneke → Hannah
    - Tineke → Tina   ← important
    - Sanne → Susanna (if placeholder; else keep)
    - Anja → Anya

    EXAMPLES
    - “Tineke belt later.” → “Tina will call later.”
    - “Interview met Tineke de Vries” → “Interview with Tineke de Vries” (KEEP: real person + surname)
    - “Jan en Pieter bespreken…” → “John and Peter discuss…”
    - “Anne werkt bij Acme.” → “Anne works at Acme.” (KEEP)

    QUALITY CHECK (end)
    - Re-scan all names: if byline/attribution/surname → KEEP. Otherwise, apply map; never change gender. If unsure → KEEP.
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
      {
        id: 'page-nl',
        title: 'Pagina',
        schemaType: 'page',
        value: {language: 'nl'},
      },
    ],
  },
})
