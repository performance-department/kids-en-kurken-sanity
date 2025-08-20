import type {
  WP_REST_API_Categories,
  WP_REST_API_Posts,
  WP_REST_API_Tags,
  WP_REST_API_Comments,
} from 'wp-types'

export type WordPressDataType = 'categories' | 'posts' | 'tags' | 'comments'

export type WordPressDataTypeResponses = {
  categories: WP_REST_API_Categories
  posts: WP_REST_API_Posts
  tags: WP_REST_API_Tags
  comments: WP_REST_API_Comments
}

export type SanitySchemaType = 'category' | 'post' | 'tag' | 'comment'
