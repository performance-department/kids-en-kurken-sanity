import {InboxIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const contactFormType = defineType({
  name: 'contactForm',
  title: 'Contactformulier inzending',
  type: 'document',
  icon: InboxIcon,
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
      name: 'message',
      title: 'Bericht',
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
      email: 'email',
      submittedAt: 'submittedAt',
      read: 'read',
    },
    prepare(selection) {
      const {name, email, submittedAt, read} = selection
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString('nl-NL') : ''
      return {
        title: name || 'Geen naam',
        subtitle: `${email} - ${date}`,
        media: read ? '✅' : '📬',
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
      by: [{field: 'read', direction: 'asc'}, {field: 'submittedAt', direction: 'desc'}],
    },
  ],
})
