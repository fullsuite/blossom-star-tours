// schemas/pageHeader.js
import { defineType, defineField } from 'sanity';

export const pageHeader = defineType({
  name: 'pageHeader',
  title: 'Page Header',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional background image for the page header',
    }),
  ],
});