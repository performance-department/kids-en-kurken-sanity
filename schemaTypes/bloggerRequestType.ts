import {UserIcon, EnvelopeIcon, CheckmarkIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const bloggerRequestType = defineType({
  name: 'bloggerRequest',
  title: 'Blogger/influencer aanvraag',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Naam',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Achternaam',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'instagram',
      title: 'Instagramnaam',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'subjects',
      title: 'Over deze onderwerpen deel ik content',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Ingezonden op',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'read',
      title: 'Gelezen',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      lastName: 'lastName',
      email: 'email',
      instagram: 'instagram',
      submittedAt: 'submittedAt',
      read: 'read',
    },
    prepare(selection) {
      const {name, lastName, email, instagram, submittedAt, read} = selection
      const fullName = `${name || ''} ${lastName || ''}`.trim()
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString('nl-NL') : ''
      return {
        title: fullName || 'Geen naam',
        subtitle: `${instagram ? `@${instagram}` : email} - ${date}`,
        media: read ? CheckmarkIcon : EnvelopeIcon,
      }
    },
  },
  orderings: [
    {
      title: 'Nieuwste eerst',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
    {
      title: 'Oudste eerst',
      name: 'submittedAtAsc',
      by: [{field: 'submittedAt', direction: 'asc'}],
    },
    {
      title: 'Ongelezen eerst',
      name: 'unreadFirst',
      by: [
        {field: 'read', direction: 'asc'},
        {field: 'submittedAt', direction: 'desc'},
      ],
    },
  ],
})
