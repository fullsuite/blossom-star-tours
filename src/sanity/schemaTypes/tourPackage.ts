import { defineType, defineField, defineArrayMember } from 'sanity';

export const tourPackage = defineType({
  name: 'tourPackage',
  title: 'Tour Package',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 200,
        },
        validation: Rule => Rule.required(),
      }),
    defineField({
        name: 'image',
        title: 'Package Image',
        type: 'image',
        options: {
          hotspot: true,
        },
        validation: Rule => Rule.required(),
      }),
    defineField({
      name: 'callout',
      title: 'Callout',
      type: 'string',
      description: 'A special callout text for the package (e.g., "Limited Time Offer")',
    }),
    
    
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Feature',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'title' },
          },
        }),
      ],
      description: 'A list of features included in this package.',
    }),
    
    defineField({
        name: 'stripePriceId',
        title: 'Stripe Price ID',
        type: 'string',
        description: 'The Stripe Price ID associated with this package for payment.',
        validation: Rule => Rule.required(),
      }),
  ],
  
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
});