// schemas/statistics.js
import { defineType, defineField } from 'sanity';

export const statistics = defineType({
  name: 'statistics',
  title: 'Statistics',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Stat Label',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Stat Value',
      type: 'string',  // Ensuring value is a string as requested
      validation: Rule => Rule.required(),
    }),
  ],
});