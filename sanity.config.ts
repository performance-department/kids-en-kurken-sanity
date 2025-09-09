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
    TITLE: Translation & Name Handling (NL → target language)

    GOAL
    - Produce natural, fluent translations.
    - Handle PERSON NAMES safely: keep real people’s names unchanged; only adapt clearly generic placeholders to common target-language equivalents of the same gender.

    TONE & REGISTER
    - Match the source tone and formality.
    - Keep punctuation, emphasis, and emojis unless culturally odd.

    PROPER NOUNS (DO NOT TRANSLATE)
    - People, brands, product names, organizations, legal entities, @handles, hashtags, filenames, email addresses, URLs, IDs.
    - Geographical names: use the target language’s standard exonym only if widely established (e.g., "Londen" → "London"); otherwise keep original.

    PERSON NAMES — RULES
    1) Default: KEEP THE NAME AS-IS.
       - If a name is common in the target language already, do not change it (e.g., “Anne”, “Irene”, “Laura”, “Peter” stay the same).
    2) Preserve gender at all times. NEVER change a feminine name into a masculine name or vice versa.
    3) Real people vs. placeholders:
       - Real person (author, quoted source, employee, customer, byline, tagged person, testimonial name) → KEEP EXACTLY.
       - Clearly generic/placeholder examples (“Jan en Piet praten…”, “Janneke belt…”) → you MAY adapt to a common target-language equivalent of the SAME GENDER, but only if the equivalent is standard and unambiguous.
       - If unsure whether it’s real or placeholder → KEEP THE ORIGINAL.
    4) Surnames never change. Compound given names stay compound (e.g., “Jan-Willem”, “Anne-Marie”).
    5) Diacritics: preserve them. Do not anglicize (“Jérôme” stays “Jérôme” unless the person is known to use “Jerome” in the target language).
    6) Edge cases:
       - Words that can also be names (“Mark”, “May”, “Robin”): decide by context and capitalization; if ambiguous → keep.
       - Initials (“A. de Vries”), honorifics (“dr.”, “mr.”), and titles: keep as-is but translate the generic title word if appropriate (“prof.” → “Prof.”).
    7) Never fabricate new names. Never swap genders. Never “normalize” to culturally different names if the source is clearly a real person.

    PLACEHOLDER NAME MAPPING (USE *ONLY* WHEN IT’S OBVIOUSLY A GENERIC EXAMPLE, NOT A REAL PERSON)
    - English (en):
      • Male: Jan → John; Johan → John; Pieter → Peter; Willem → William; Jacob → Jacob
      • Female: Johanna → Joanna; Maria → Mary; Annelies → Annalise (if clearly placeholder); Eva → Eve
      • Keep: Anne, Irene, Laura, Karin (do not change these; they’re fine in English)
    - German (de):
      • Male: Jan → Johann; Pieter → Peter; Willem → Wilhelm
      • Female: Johanna → Johanna; Maria → Maria; Eva → Eva
      • Keep: Anne, Irene, Laura, Karin
    - French (fr):
      • Male: Jan/Johan → Jean; Pieter → Pierre; Willem → Guillaume
      • Female: Johanna → Jeanne; Maria → Marie; Eva → Ève
      • Keep: Anne, Irène (add accent), Laura, Karine (optional only if clearly placeholder; otherwise keep “Karin”)
    - Spanish (es):
      • Male: Jan/Johan → Juan; Pieter → Pedro; Willem → Guillermo
      • Female: Johanna → Juana; Maria → María; Eva → Eva
      • Keep: Anne (or Ana only if clearly placeholder), Irene, Laura, Karin
    GUIDANCE: If the name already works in the target language (e.g., “Anne”), DO NOT change it. Only apply the mapping when the text uses obviously generic Dutch stand-ins (e.g., “Jan en Piet” in a hypothetical scenario).

    EXAMPLES — CORRECT
    - NL: “Anne werkt bij Acme en zegt: ‘Ik bel later.’”
      EN: “Anne works at Acme and says, ‘I’ll call later.’”  // Anne unchanged (common in EN, female preserved)
    - NL: “Jan en Piet bespreken de planning.”
      EN (placeholder case): “John and Peter discuss the schedule.”
    - NL: “Janneke is onze fictieve klant in dit voorbeeld.”
      EN (placeholder case): “Joanna is our fictional customer in this example.”
      EN (uncertain if real): “Janneke is our customer in this example.” // keep if not clearly placeholder
    - NL: “Interview met Karin de Vries.”
      EN: “Interview with Karin de Vries.” // real person, do not adapt
    - NL: “Volg @anne_dev en mail naar anne@example.com”
      EN: “Follow @anne_dev and email anne@example.com” // handles & emails unchanged

    DO-NOT-DO LIST
    - Do NOT change feminine names to masculine (“Anne” → “John” is WRONG).
    - Do NOT adapt names in bylines, quotes with attribution, testimonials, case studies, or mentions of real staff or customers.
    - Do NOT translate surnames or brand names.
    - Do NOT apply mapping when uncertain; keep original instead.

    OTHER TRANSLATION CONVENTIONS
    - Numbers & units: convert only if the source explicitly uses localized formats; otherwise keep numeric values and translate unit words.
    - Dates: localize month/day names to the target language; keep ISO-like formats if used in UI strings.
    - Quotation style: use the target language’s typical quotation marks if the style requires; otherwise keep simple ASCII quotes.

    QUALITY CHECK (end of task)
    - Re-scan all person names:
      1) Real or placeholder? If real → unchanged.
      2) If placeholder → adapted only if mapping is standard AND gender preserved.
      3) “Anne” in any target language → usually KEEP (very common female name).
    - If any uncertainty remains about a name → KEEP ORIGINAL.
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
