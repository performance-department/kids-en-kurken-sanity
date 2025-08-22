import type {StructureResolver} from 'sanity/structure'
import {ComposeIcon, FilterIcon, TagIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Menu')
    .items([
      S.listItem()
        .title('Berichten')
        .icon(ComposeIcon)
        .child(
          S.list()
            .title('Taal')
            .items([
              S.listItem()
                .id('nl-posts') // Unique ID added
                .title('🇳🇱')
                .child(
                  S.documentList()
                    .title('Alle berichten')
                    .filter('_type == "post" && language == "nl"'),
                ),
              S.listItem()
                .id('en-posts') // Unique ID added
                .title('🇬🇧')
                .child(
                  S.documentList()
                    .title('Alle berichten')
                    .filter('_type == "post" && language == "en"'),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Categorieën')
        .icon(FilterIcon)
        .child(
          S.list()
            .title('Categorieën per taal')
            .items([
              S.listItem()
                .id('nl-categories') // Unique ID added
                .title('🇳🇱')
                .child(
                  S.documentList()
                    .title('Alle categorieën')
                    .filter('_type == "category" && language == "nl"'),
                ),
              S.listItem()
                .id('en-categories') // Unique ID added
                .title('🇬🇧')
                .child(
                  S.documentList()
                    .title('Alle categorieën')
                    .filter('_type == "category" && language == "en"'),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Tags')
        .icon(TagIcon)
        .child(
          S.list()
            .title('Tags per taal')
            .items([
              S.listItem()
                .id('nl-tags') // Unique ID added
                .title('🇳🇱')
                .child(
                  S.documentList().title('Alle  tags').filter('_type == "tag" && language == "nl"'),
                ),
              S.listItem()
                .id('en-tags') // Unique ID added
                .title('🇬🇧')
                .child(
                  S.documentList().title('Alle  tags').filter('_type == "tag" && language == "en"'),
                ),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem('comment').title('Reacties'),
    ])
