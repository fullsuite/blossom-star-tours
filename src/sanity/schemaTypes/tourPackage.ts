import { defineType, defineField, defineArrayMember } from 'sanity';

export const tourPackage = defineType({
  name: 'tourPackage',
  title: 'Tour Package',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Package Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Package Description',
      type: 'text',
      description: 'Brief description of the package.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'The total duration of the tour (e.g. "4 hours", "Full Day", "3 Days").',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'durationCategory',
      title: 'Duration Category',
      type: 'string',
      description: 'Category for filtering by duration.',
      options: {
        list: [
          { title: 'Half Day (up to 4 hours)', value: 'half-day' },
          { title: 'Full Day (4-8 hours)', value: 'full-day' },
          { title: 'Multi-Day (1+ days)', value: 'multi-day' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'categories',
      title: 'Tour Categories',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Select all categories that apply to this tour.',
      options: {
        list: [
          { title: 'Spiritual', value: 'spiritual' },
          { title: 'Historical', value: 'historical' },
          { title: 'Adventure', value: 'adventure' },
          { title: 'Relaxing', value: 'relaxing' },
          { title: 'Cultural', value: 'cultural' },
          { title: 'Nature', value: 'nature' },
          { title: 'Family-Friendly', value: 'family' },
        ],
      },
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
        })
      ],
      options: {
        layout: 'grid',
      },
      description: 'A gallery of images for the package.',
      validation: Rule => Rule.min(1).error('At least one image is required.')
    }),
    defineField({
      name: 'groups',
      title: 'Group Options and Pricing',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Package Name',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'minGroupSize',
              title: 'Minimum Group Size',
              type: 'number',
              validation: Rule => Rule.required(),
              description: 'The minimum number of people in the group.'
            }),
            defineField({
              name: 'maxGroupSize',
              title: 'Maximum Group Size',
              type: 'number',
              validation: Rule => Rule.required(),
              description: 'The maximum number of people in the group.'
            }),
            defineField({
              name: 'pricingType',
              title: 'Pricing Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Per Group', value: 'perGroup' },
                  { title: 'Per Person', value: 'perPerson' }
                ],
              },
              validation: Rule => Rule.required(),
              description: 'Specifies if the pricing is per group or per person.'
            }),
            defineField({
              name: 'standardPricing',
              title: 'Standard Pricing',
              type: 'number',
              validation: Rule => Rule.required(),
              description: 'The price for the standard option.'
            }),
            defineField({
              name: 'standardInclusions',
              title: 'Standard Inclusions',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'List of inclusions for the standard package.',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'premiumPricing',
              title: 'Premium Pricing',
              type: 'number',
              description: 'The price for the premium option (if available).'
            }),
            defineField({
              name: 'premiumInclusions',
              title: 'Premium Inclusions',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'List of inclusions for the premium package.'
            })
          ],
          preview: {
            select: {
              title: 'name',
            },
            prepare({ title }) {
              return {
                title: `${title}`,
              };
            },
          },
        })
      ],
      validation: Rule => Rule.required(),
      description: 'Pricing and inclusions for different group sizes.'
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'images.0', // Display the first image in the preview
    },
  },
});