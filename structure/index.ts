import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Menu')
    .items([
      S.documentTypeListItem('post').title('Berichten'),
      S.documentTypeListItem('category').title('Categorieën'),
      S.documentTypeListItem('tag').title('Tags'),
      S.documentTypeListItem('comment').title('Reacties'),
    ])
