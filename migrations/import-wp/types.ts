import type {WP_REST_API_Categories, WP_REST_API_Posts, WP_REST_API_Tags} from 'wp-types'

export type WordPressDataType = 'categories' | 'posts' | 'tags'

export type WordPressDataTypeResponses = {
  categories: WP_REST_API_Categories
  posts: WP_REST_API_Posts
  tags: WP_REST_API_Tags
}

export type SanitySchemaType = 'category' | 'post' | 'tag'
