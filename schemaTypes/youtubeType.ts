import {defineType} from 'sanity'

export const youtubeType = defineType({
  name: 'youtube',
  title: 'YouTube Video',
  type: 'object',
  fields: [
    {
      name: 'videoId',
      title: 'YouTube Video ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Video Title',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'title',
      videoId: 'videoId',
    },
    prepare({title, videoId}) {
      return {
        title: title || 'YouTube Video',
        subtitle: videoId,
        media: undefined, // Could add YouTube thumbnail here if needed
      }
    },
  },
})
