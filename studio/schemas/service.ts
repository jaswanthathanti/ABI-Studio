import { defineType, defineField } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service Cards',
  description: 'Each document here represents one Service Card displayed in the website services section. Adding a document creates a new card on the web.',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Name / Title',
      type: 'string',
      description: 'E.g. "Wedding Photography", "LED Screen Rentals", "Cinematic Films"',
      validation: (Rule) => Rule.required().error('Please enter a title for this service card'),
    }),
    defineField({
      name: 'number',
      title: 'Display Number Code',
      type: 'string',
      description: 'Optional: E.g. "01", "02", "03". If empty, will auto-number based on display order.',
    }),
    defineField({
      name: 'category',
      title: 'Category Label',
      type: 'string',
      description: 'Small category tag shown at the top of the card (e.g. "LED Displays", "Photography", "Cinematography")',
    }),
    defineField({
      name: 'tagline',
      title: 'Card Tagline',
      type: 'string',
      description: 'Short catchy highlight sentence displayed on the service card',
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'text',
      rows: 3,
      description: 'Comprehensive overview shown on the card and in the detailed modal popup',
    }),
    defineField({
      name: 'coverImage',
      title: 'Service Cover Visual / Photo',
      type: 'image',
      description: 'Image displayed on the card (recommended 16:9 ratio)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Type',
      type: 'string',
      description: 'Icon badge displayed on the card',
      options: {
        list: [
          { title: 'Tv (LED Walls & Screens)', value: 'Tv' },
          { title: 'Camera (Photography)', value: 'Camera' },
          { title: 'Video (Films & Drones)', value: 'Video' },
          { title: 'BookOpen (Albums & Prints)', value: 'BookOpen' },
          { title: 'Heart (Pre-Wedding Shoots)', value: 'Heart' },
          { title: 'PartyPopper (Events & Celebrations)', value: 'PartyPopper' },
          { title: 'Sparkles (Custom & Luxury Services)', value: 'Sparkles' },
        ],
      },
      initialValue: 'Camera',
    }),
    defineField({
      name: 'features',
      title: 'Card Highlights / Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Quick bullet tags displayed as pills on the card (e.g. "Wedding LED Walls", "Stage LED Screens")',
    }),
    defineField({
      name: 'whatIsCovered',
      title: 'Detailed Coverage Breakdown',
      type: 'array',
      description: 'Optional: Expanded coverage items shown in the detail modal popup',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Coverage Item Title', type: 'string' }),
            defineField({ name: 'description', title: 'Coverage Item Description', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'deliverables',
      title: 'Deliverables List',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Optional: Tangible deliverables given to client (e.g. "High-Definition Modular LED Display Wall")',
    }),
    defineField({
      name: 'durationOrScope',
      title: 'Duration or Scope',
      type: 'string',
      description: 'E.g. "Full Day & Multi-Day Event Coverage"',
    }),
    defineField({
      name: 'teamSize',
      title: 'Team Size / On-site Crew',
      type: 'string',
      description: 'E.g. "2 Senior Photographers + 1 Drone Pilot"',
    }),
    defineField({
      name: 'order',
      title: 'Display Order on Website',
      type: 'number',
      description: 'Position on the website: 1 appears first, 2 appears second, etc.',
      initialValue: 1,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      number: 'number',
      media: 'coverImage',
      order: 'order',
    },
    prepare({ title, category, number, media, order }) {
      const numPrefix = number ? `[${number}] ` : order !== undefined ? `[#${order}] ` : '';
      const cat = category || 'Service Card';
      return {
        title: `${numPrefix}${title || 'Untitled Service Card'}`,
        subtitle: cat,
        media,
      };
    },
  },
})
