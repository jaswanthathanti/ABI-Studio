import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Client Reviews & Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client / Couple Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Client Role',
      type: 'string',
      description: 'E.g. "Wedding Couple", "Father of the Bride", "Event Organizer"',
      initialValue: 'Wedding Couple',
    }),
    defineField({
      name: 'event',
      title: 'Event / Service Booked',
      type: 'string',
      description: 'E.g. "Wedding Photography + LED", "Cinematic Film"',
    }),
    defineField({
      name: 'quote',
      title: 'Review / Testimonial Text',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (1 to 5)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5),
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
