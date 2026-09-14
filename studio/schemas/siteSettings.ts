import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings & Contacts',
  type: 'document',
  fields: [
    defineField({
      name: 'studioName',
      title: 'Studio Brand Name',
      type: 'string',
      description: 'Main brand name displayed in header and footer (e.g. "LED\'s & ABI Studio")',
      initialValue: "LED's & ABI Studio",
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline & Short Description',
      type: 'text',
      rows: 2,
      description: 'Used in the footer and SEO metadata',
      initialValue: 'Your trusted partner for wedding photography, cinematic films, LED screen rentals, photo albums, and event coverage.',
    }),
    defineField({
      name: 'phone',
      title: 'Primary Phone Number',
      type: 'string',
      description: 'E.g. +91 94404 27791',
      initialValue: '+91 94404 27791',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Contact Number',
      type: 'string',
      description: 'Number without spaces or symbols for direct WhatsApp link (e.g. 919440427791)',
      initialValue: '919440427791',
    }),
    defineField({
      name: 'email',
      title: 'Official Email Address',
      type: 'string',
      initialValue: 'athantichandu@gmail.com',
    }),
    defineField({
      name: 'address',
      title: 'Studio Physical Address',
      type: 'string',
      initialValue: 'ABI Studio, Creative District',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram Profile URL',
      type: 'url',
      initialValue: 'https://instagram.com',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Channel URL',
      type: 'url',
      initialValue: 'https://youtube.com',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook Page URL',
      type: 'url',
      initialValue: 'https://facebook.com',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      initialValue: 'https://linkedin.com',
    }),
  ],
})
