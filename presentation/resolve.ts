// ./lib/presentation/resolve.ts
import {defineLocations, defineDocuments} from 'sanity/presentation'

/**
 * Safe date splitter that avoids timezone shifts.
 * Accepts Sanity `date` or `datetime` strings.
 */
function ymdParts(dateStr?: string) {
  if (!dateStr) return null
  const iso = dateStr.slice(0, 10) // "YYYY-MM-DD"
  const [yyyy, mm, dd] = iso.split('-')
  if (!yyyy || !mm || !dd) return null
  return {yyyy, mm, dd}
}

// If your blog lives under a base path (e.g. "/blog"), set it here:
const BASE_PATH = '' // e.g. '/blog'

export const locations = {
  post: defineLocations({
    select: {title: 'title', slug: 'slug.current', date: 'date'},
    resolve: (doc) => {
      if (!doc?.slug || !doc?.date) return null
      const parts = ymdParts(doc.date)
      if (!parts) return null
      const {yyyy, mm, dd} = parts
      const href = `${BASE_PATH}/${yyyy}/${mm}/${dd}/${doc.slug}`
      return {
        locations: [
          {title: doc.title || 'This post', href},
          // Optional extras that can help editors:
          // {title: `${yyyy}/${mm}`, href: `${BASE_PATH}/${yyyy}/${mm}`},
          // {title: `${yyyy}`, href: `${BASE_PATH}/${yyyy}`},
        ],
      }
    },
  }),
}

// Presentation will auto-select a post doc when visiting this route.
// We only match on slug (usually unique). If you require the date to match too,
// see the commented filter below.
export const mainDocuments = defineDocuments([
  {
    route: `${BASE_PATH}/:yyyy/:mm/:dd/:slug`,
    filter: `_type == "post" && slug.current == $slug`,
    // Strict match variant (uncomment if slugs may repeat):
    // filter:
    //   `_type == "post" && slug.current == $slug &&
    //    string(dateTime(date))[0..3] == $yyyy &&
    //    string(dateTime(date))[5..6] == $mm &&
    //    string(dateTime(date))[8..9] == $dd`,
  },
])
