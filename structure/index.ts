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
                .id('nl-posts')
                .title('🇳🇱')
                .child(
                  S.documentList()
                    .title('Alle berichten')
                    .filter('_type == "post" && language == "nl"')
                    .menuItems(S.documentTypeList('post').getMenuItems())
                    .defaultOrdering([{field: 'date', direction: 'desc'}]),
                ),
              S.listItem()
                .id('en-posts')
                .title('🇬🇧')
                .child(
                  S.documentList()
                    .title('Alle berichten')
                    .filter('_type == "post" && language == "en"')
                    .menuItems(S.documentTypeList('post').getMenuItems())
                    .defaultOrdering([{field: 'date', direction: 'desc'}]),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Categorieën')
        .icon(FilterIcon)
        .child(
          S.list()
            .title('Taal')
            .items([
              S.listItem()
                .id('nl-categories')
                .title('🇳🇱')
                .child(
                  S.documentList()
                    .title('Alle categorieën')
                    .filter('_type == "category" && language == "nl"'),
                ),
              S.listItem()
                .id('en-categories')
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
            .title('Taal')
            .items([
              S.listItem()
                .id('nl-tags')
                .title('🇳🇱')
                .child(
                  S.documentList().title('Alle tags').filter('_type == "tag" && language == "nl"'),
                ),
              S.listItem()
                .id('en-tags')
                .title('🇬🇧')
                .child(
                  S.documentList().title('Alle tags').filter('_type == "tag" && language == "en"'),
                ),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem('comment').title('Reacties'),
    ])
