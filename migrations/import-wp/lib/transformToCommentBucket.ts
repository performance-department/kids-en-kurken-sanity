import type {WP_REST_API_Comment} from 'wp-types'

const SANITY_COMMENT_STATUSES = new Set(['approved', 'hold', 'spam', 'trash'])

export interface CommentBucket {
  _id: string
  _type: 'commentBucket'
  post?: {
    _type: 'reference'
    _ref: string
    _weak: true
  }
  bucketIndex: number
  comments: Array<{
    wpId: number
    parentWpId?: number
    authorName?: string
    authorEmail?: string
    content?: string
    status: 'approved' | 'hold' | 'spam' | 'trash'
    date?: string
  }>
  commentCount: number
}

export function transformToCommentBucket(
  wpComments: WP_REST_API_Comment[],
  postId: number,
  bucketIndex: number,
): CommentBucket {
  const bucket: CommentBucket = {
    _id: `comment-bucket-post-${postId}-${bucketIndex}`,
    _type: 'commentBucket',
    post: {
      _type: 'reference',
      _ref: `post-${postId}`,
      _weak: true,
    },
    bucketIndex,
    comments: [],
    commentCount: wpComments.length,
  }

  bucket.comments = wpComments.map((wpDoc) => {
    const comment: CommentBucket['comments'][0] = {
      wpId: wpDoc.id,
    }

    if (typeof wpDoc.parent === 'number' && wpDoc.parent > 0) {
      comment.parentWpId = wpDoc.parent
    }

    if (wpDoc.author_name) {
      comment.authorName = wpDoc.author_name.trim()
    }
    if (wpDoc.author_email) {
      comment.authorEmail = wpDoc.author_email.trim()
    }

    let raw: string | undefined

    if (wpDoc.content && typeof wpDoc.content === 'object') {
      raw = (wpDoc.content as any).raw ?? (wpDoc.content as any).rendered
    }

    if (typeof raw === 'string') {
      comment.content = raw.trim()
    }

    const status = (wpDoc as any).status as string | undefined
    comment.status = SANITY_COMMENT_STATUSES.has(status ?? '') ? (status as any) : 'approved'

    if ((wpDoc as any).date_gmt) {
      // e.g. "2024-05-10T12:34:56" -> append Z to ensure UTC
      comment.date = new Date(`${(wpDoc as any).date_gmt}Z`).toISOString()
    } else if ((wpDoc as any).date) {
      comment.date = new Date(`${(wpDoc as any).date}Z`).toISOString()
    }

    return comment
  })

  return bucket
}
