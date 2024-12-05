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
  ],
});