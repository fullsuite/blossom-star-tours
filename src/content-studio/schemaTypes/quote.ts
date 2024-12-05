// schemas/quote.js
import { defineType, defineField } from 'sanity';

export const quote = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'document',
  fields: [
    defineField({
      name: 'quoteText',
      title: 'Quote Text',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The main text of the quote, with support for rich text formatting.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'The author of the quote',
    }),
  ],
  preview: {
    select: {
      title: 'quoteText',
      subtitle: 'author',
    },
    prepare({ title, subtitle }) {
      const plainText = title[0]?.children?.map(child => child.text).join('') || '';
      return {
        title: plainText,
        subtitle,
      };
    },
  },
});