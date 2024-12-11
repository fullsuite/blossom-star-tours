import { defineType, defineField, defineArrayMember } from 'sanity';

export const aboutUsPage = defineType({
  name: 'aboutUsPage',
  title: 'About Us Page',
  type: 'document',
  fields: [
    // Page header section
    defineField({
      name: 'pageHeader',
      title: 'Page Header',
      type: 'pageHeader',
      description: 'Header section for the About Us page',
      validation: Rule => Rule.required(),
    }),

    // Introduction section
    defineField({
      name: 'introduction',
      title: 'Introduction Section',
      type: 'object',
      fields: [
        defineField({
            name: 'eyebrow',
            title: 'Section Eyebrow',
            type: 'string',
            validation: Rule => Rule.required(),
          }),
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [{ type: 'block' }], // Changed to Portable Text (block content)
          description: 'Brief introductory text about the company',
        }),
        defineField({
          name: 'feature',
          title: 'Feature Highlight',
          type: 'featureItem', // Using the existing featureItem schema
          description: 'Highlighted feature with image, title, and content',
        }),
        defineField({
          name: 'image',
          title: 'Main Image',
          type: 'image',
          options: { hotspot: true },
          description: 'Primary image to display in the introduction section',
        }),
      ],
    }),

    // Achievements section
    defineField({
      name: 'achievements',
      title: 'Achievements Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'subheading',
            title: 'Section Subheading',
            type: 'string',
            validation: Rule => Rule.required(),
          }),
        defineField({
          name: 'stats',
          title: 'Statistics',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'statistics', // Using the existing statistics schema
            }),
          ],
          validation: Rule => Rule.min(1).error('At least one statistic is required.'),
        }),
        defineField({
            name: 'backgroundImage',
            title: 'Background Image',
            type: 'image',
            options: {
              hotspot: true,
            },
            description: 'Background image for the achievements section',
          }),
      ],
    }),

    // Experiences section
    defineField({
      name: 'experiences',
      title: 'Experiences Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [{ type: 'block' }], // Changed to Portable Text (block content)
          description: 'Description for the experiences section',
        }),
        defineField({
          name: 'experiencesList',
          title: 'Experiences List',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'featureWithPercentage', // Using the new featureWithPercentage schema
            }),
          ],
          validation: Rule => Rule.min(1).error('At least one experience item is required.'),
        }),
        defineField({
          name: 'images',
          title: 'Experience Images',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          description: 'A gallery of images representing various experiences',
          options: {
            layout: 'grid',
          },
          validation: Rule => Rule.min(2).max(2).error('Exactly 2 images are required'),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'pageHeader.title', // Selecting the title from the embedded pageHeader
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title || 'Untitled About Us Page',
      };
    },
  },
});