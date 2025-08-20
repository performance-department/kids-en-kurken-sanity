import type {WP_REST_API_Comment} from 'wp-types'

import type {Comment} from '../../../sanity.types'

// Remove these keys because they'll be created by Content Lake
type StagedComment = Omit<Comment, '_createdAt' | '_updatedAt' | '_rev'>

const SANITY_COMMENT_STATUSES = new Set(['approved', 'hold', 'spam', 'trash'])

export async function transformToComment(wpDoc: WP_REST_API_Comment): Promise<StagedComment> {
  const doc: StagedComment = {
    _id: `comment-${wpDoc.id}`,
    _type: 'comment',
  }

  if (typeof wpDoc.post === 'number' && wpDoc.post > 0) {
    doc.post = {
      _type: 'reference',
      _ref: `post-${wpDoc.post}`,
      _weak: true,
    }
  }

  if (typeof wpDoc.parent === 'number' && wpDoc.parent > 0) {
    doc.parent = {
      _type: 'reference',
      _ref: `comment-${wpDoc.parent}`,
      _weak: true,
    }
  }

  if (wpDoc.author_name) {
    doc.authorName = wpDoc.author_name.trim()
  }
  if (wpDoc.author_email) {
    doc.authorEmail = wpDoc.author_email.trim()
  }

  let raw: string | undefined

  if (wpDoc.content && typeof wpDoc.content === 'object') {
    raw = (wpDoc.content as any).raw ?? (wpDoc.content as any).rendered
  }

  if (typeof raw === 'string') {
    doc.content = raw.trim()
  }

  const status = (wpDoc as any).status as string | undefined
  doc.status = SANITY_COMMENT_STATUSES.has(status ?? '') ? (status as any) : 'approved'

  if ((wpDoc as any).date_gmt) {
    // e.g. "2024-05-10T12:34:56" -> append Z to ensure UTC
    doc.date = new Date(`${(wpDoc as any).date_gmt}Z`).toISOString()
  } else if ((wpDoc as any).date) {
    doc.date = new Date(`${(wpDoc as any).date}Z`).toISOString()
  }

  return doc
}
