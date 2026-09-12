import { defineType, defineField } from 'sanity'

export const finalCta = defineType({
  name: 'finalCta',
  title: 'Final Call to Action (CTA)',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Top Eyebrow Badge',
      type: 'string',
      initialValue: "LET'S CREATE TOGETHER",
    }),
    defineField({
      name: 'headline',
      title: 'Headline First Part',
      type: 'string',
      initialValue: 'Ready to Capture Your ',
    }),
    defineField({
      name: 'headlineHighlight',
      title: 'Headline Highlighted Gradient Word',
      type: 'string',
      initialValue: 'Special Day?',
    }),
    defineField({
      name: 'description',
      title: 'Supporting Description Paragraph',
      type: 'text',
      rows: 3,
      initialValue: "Let's create beautiful memories together. From wedding photography to LED setups, we'll make your celebration truly unforgettable.",
    }),
    defineField({
      name: 'primaryButtonLabel',
      title: 'Primary Button Text',
      type: 'string',
      initialValue: 'Get a Quote',
    }),
    defineField({
      name: 'phone',
      title: 'Direct Call Phone Number',
      type: 'string',
      initialValue: '+91 94404 27791',
    }),
    defineField({
      name: 'bulletPoints',
      title: 'Confidence / Turnaround Bullets',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Flexible Packages', 'Same-Day Teasers', 'LED Screen Rentals'],
    }),
  ],
})
