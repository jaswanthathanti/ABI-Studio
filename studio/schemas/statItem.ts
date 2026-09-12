import { defineType, defineField } from 'sanity'

export const statItem = defineType({
  name: 'statItem',
  title: 'Key Stats & Milestones',
  type: 'document',
  fields: [
    defineField({
      name: 'value',
      title: 'Stat Number / Value',
      type: 'string',
      description: 'E.g. "500+", "30+", "100%", "4.9/5"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Stat Label',
      type: 'string',
      description: 'E.g. "Weddings Captured", "Years Experience"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Type',
      type: 'string',
      options: {
        list: [
          { title: 'Heart (Weddings / Love)', value: 'Heart' },
          { title: 'Users (Clients / Guests)', value: 'Users' },
          { title: 'Clock (Experience / Time)', value: 'Clock' },
          { title: 'Star (Rating / Satisfaction)', value: 'Star' },
        ],
      },
      initialValue: 'Heart',
    }),
    defineField({
      name: 'description',
      title: 'Brief Sub-description',
      type: 'string',
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
