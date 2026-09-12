import { defineType, defineField } from 'sanity'

export const faqItem = defineType({
  name: 'faqItem',
  title: 'Frequently Asked Questions (FAQ)',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category Filter',
      type: 'string',
      options: {
        list: [
          { title: 'Photography & Films', value: 'photography' },
          { title: 'LED Screen Rentals', value: 'led' },
          { title: 'Albums & Prints', value: 'albums' },
          { title: 'Booking & Delivery', value: 'booking' },
        ],
      },
      initialValue: 'booking',
      validation: (Rule) => Rule.required(),
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
