import {DocumentIcon, EnvelopeIcon, CheckmarkIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const submissionType = defineType({
  name: 'submission',
  title: 'Inzending',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Naam',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'instagram',
      title: 'Instagramnaam',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Boodschap',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'withName',
      title: 'Met naam',
      type: 'boolean',
      initialValue: false,
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
      email: 'email',
      instagram: 'instagram',
      submittedAt: 'submittedAt',
      read: 'read',
      withName: 'withName',
    },
    prepare(selection) {
      const {name, email, instagram, submittedAt, read, withName} = selection
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString('nl-NL') : ''
      const nameDisplay = withName ? name : 'Anoniem'
      return {
        title: nameDisplay || 'Geen naam',
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
