import { defineType, defineField } from 'sanity';

export const packagesPage = defineType({
  name: 'packagesPage',
  title: 'Packages Page',
  type: 'document',
  fields: [
    // Page header section
    defineField({
      name: 'pageHeader',
      title: 'Page Header',
      type: 'pageHeader',
      description: 'Header section for the Packages page',
      validation: Rule => Rule.required(),
    }),

    // Introduction section
    defineField({
      name: 'introduction',
      title: 'Introduction Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          description: 'Brief description below the heading',
        }),
      ],
    }),

    // Quote section with background image
    defineField({
      name: 'quoteSection',
      title: 'Quote Section',
      type: 'object',
      fields: [
        defineField({
          name: 'quoteText',
          title: 'Quote Text',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'The main text of the quote, with support for rich text formatting (use bold for emphasis).',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'author',
          title: 'Author',
          type: 'string',
          description: 'The author of the quote',
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Background image for the quote section',
          validation: Rule => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'pageHeader.title',
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title || 'Packages Page',
      };
    },
  },
});
