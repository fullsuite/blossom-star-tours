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
      description: 'The total duration of the tour.',
      validation: Rule => Rule.required(),
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