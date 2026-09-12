import { defineType, defineField } from 'sanity'

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Portfolio & Gallery Items',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project / Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Secondary Heading',
      type: 'string',
      description: 'E.g. "A Grand Traditional Wedding"',
    }),
    defineField({
      name: 'category',
      title: 'Gallery Category',
      type: 'string',
      options: {
        list: [
          { title: 'Weddings', value: 'Weddings' },
          { title: 'Pre-Wedding', value: 'Pre-Wedding' },
          { title: 'Events', value: 'Events' },
          { title: 'LED Setups', value: 'LED Setups' },
          { title: 'Albums', value: 'Albums' },
          { title: 'Films', value: 'Films' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Photography (Photo)', value: 'photo' },
          { title: 'Cinematic Film (Video)', value: 'film' },
        ],
      },
      initialValue: 'photo',
    }),
    defineField({
      name: 'image',
      title: 'Photo / Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video Link (YouTube / Vimeo / MP4)',
      type: 'url',
      description: 'Optional: For wedding film teasers or full highlights',
    }),
    defineField({
      name: 'client',
      title: 'Client / Family Name',
      type: 'string',
      description: 'E.g. "Sharma Family", "Priya & Arjun"',
    }),
    defineField({
      name: 'year',
      title: 'Event Year',
      type: 'string',
      initialValue: '2026',
    }),
    defineField({
      name: 'resolution',
      title: 'Format / Quality Badge',
      type: 'string',
      description: 'E.g. "4K UHD Cinema", "Full HD Photography"',
    }),
    defineField({
      name: 'description',
      title: 'Project Story / Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'specs',
      title: 'Highlights / Specifications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'E.g. "Full Day Coverage", "Candid + Traditional", "Drone Aerial Shots"',
    }),
    defineField({
      name: 'showOnHomepage',
      title: 'Show on Homepage "Our Work Speaks" Carousel',
      type: 'boolean',
      description: 'Toggle on to feature this item on the main homepage carousel in addition to the full /gallery page',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
