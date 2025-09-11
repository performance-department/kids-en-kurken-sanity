import type {StructureResolver} from 'sanity/structure'
import {
  ComposeIcon,
  FilterIcon,
  TagIcon,
  ClockIcon,
  CogIcon,
  DocumentIcon,
  InboxIcon,
} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Menu')
    .items([
      // Content section
      S.divider().title('📝 Content'),

      S.listItem()
        .id('berichten')
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
      S.listItem()
        .id('categories')
        .title('Categorieën')
        .icon(FilterIcon)
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
      S.listItem()
        .id('tags')
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

      // Site Management section
      S.divider().title('⚙️ Sitebeheer'),

      S.listItem()
        .id('site-management-placeholder')
        .title('Binnenkort beschikbaar...')
        .child(S.list().title('Nog geen documenten').items([])),

      // Moderation section

      S.divider().title('💬 Reacties'),

      S.listItem()
        .id('pending-comments')
        .title('Te beoordelen')
        .icon(ClockIcon)
        .child(
          S.documentList()
            .title('Te beoordelen reacties')
            .filter('_type == "commentBucket" && count(comments[status == "hold"]) > 0')
            .defaultOrdering([{field: '_updatedAt', direction: 'desc'}]),
        ),
      S.documentTypeListItem('commentBucket').title('Alle reacties'),

      // Forms section
      S.divider().title('📊 Formulieren'),

      S.listItem()
        .id('forms-placeholder')
        .title('Binnenkort beschikbaar...')
        .child(S.list().title('Nog geen formulieren').items([])),
    ])
