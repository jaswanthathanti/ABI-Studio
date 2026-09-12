import { defineType, defineField } from 'sanity'

export const aboutStudio = defineType({
  name: 'aboutStudio',
  title: 'About Studio & Founder',
  type: 'document',
  fields: [
    defineField({
      name: 'founderName',
      title: 'Founder / Lead Photographer Name',
      type: 'string',
      initialValue: 'A. Satish Chand',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'founderTitle',
      title: 'Professional Title',
      type: 'string',
      initialValue: 'Master Photographer & Founder',
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Experience Highlight',
      type: 'string',
      initialValue: '30+ Years Experience',
    }),
    defineField({
      name: 'weddingsCount',
      title: 'Milestone Count',
      type: 'string',
      initialValue: '500+ Weddings',
    }),
    defineField({
      name: 'founderBio',
      title: 'Personal Bio & Mission Statement',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'founderPhoto',
      title: 'Founder Portrait Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'experienceCards',
      title: 'Pillar Highlight Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Award (Craft & Dedication)', value: 'Award' },
                  { title: 'Heart (Love Stories)', value: 'Heart' },
                  { title: 'Tv (LED & Tech Setup)', value: 'Tv' },
                  { title: 'Camera (Full-Spectrum Equipment)', value: 'Camera' },
                ],
              },
              initialValue: 'Award',
            }),
            defineField({ name: 'highlight', title: 'Card Badge / Number', type: 'string' }),
            defineField({ name: 'title', title: 'Card Title', type: 'string' }),
            defineField({ name: 'desc', title: 'Card Description', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'skillPills',
      title: 'Specialty Skill Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Pills listed below cards (e.g. "Candid Photography", "Drone Aerial 4K")',
    }),
  ],
})
