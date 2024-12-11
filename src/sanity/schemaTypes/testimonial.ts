// schemas/testimonial.js
import { defineType, defineField } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
        name: 'location',
        title: 'Customer Location',
        type: 'string',
        validation: Rule => Rule.required(),
      }),
    defineField({
      name: 'review',
      title: 'Review Text',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'review',
      media: 'image',
    },
  },
});