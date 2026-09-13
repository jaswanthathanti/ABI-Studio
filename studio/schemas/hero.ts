import { defineType, defineField } from 'sanity'

export const hero = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Top Eyebrow Badge',
      type: 'string',
      description: 'Small floating badge above main title',
      initialValue: '- CAPTURING YOUR PRECIOUS MOMENTS -',
    }),
    defineField({
      name: 'titlePrefix',
      title: 'Title First Half',
      type: 'string',
      description: 'White text before highlighted gradient brand name (e.g. "LED\'s & ")',
      initialValue: "LED's & ",
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Title Highlighted Brand',
      type: 'string',
      description: 'Gradient highlighted text (e.g. "ABI Studio")',
      initialValue: 'ABI Studio',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Services Line',
      type: 'string',
      description: 'Supporting tagline under title',
      initialValue: 'Wedding Photography | Cinematic Films | LED Screens | Photo Albums',
    }),
    defineField({
      name: 'viewWorkLabel',
      title: 'Primary Button Label',
      type: 'string',
      initialValue: 'View Our Work',
    }),
    defineField({
      name: 'contactLabel',
      title: 'Contact Button Label',
      type: 'string',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'showreelLabel',
      title: 'Showreel Button Label',
      type: 'string',
      initialValue: 'Watch Showreel',
    }),
    defineField({
      name: 'showreelVideoUrl',
      title: 'Showreel Video URL (YouTube / Vimeo / MP4)',
      type: 'url',
      description: 'Video opened when visitor clicks "Watch Showreel"',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      description: 'High-resolution atmospheric studio background photo',
      options: {
        hotspot: true,
      },
    }),
  ],
})
