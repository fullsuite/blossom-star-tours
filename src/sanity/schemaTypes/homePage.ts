import { defineType, defineField, defineArrayMember } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Title of the home page for internal reference',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Main Heading',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'subHeading',
          title: 'Subheading',
          type: 'string',
        }),
        defineField({
          name: 'ctaButton',
          title: 'CTA Button Text',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'ctaLink',
          title: 'CTA Button Link',
          type: 'url',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
          validation: Rule => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'topQuoteSection',
      title: 'Top Quote Section',
      type: 'reference',
      to: [{ type: 'quote' }],
      description: 'Quote section displayed at the top of the homepage',
    }),
    defineField({
      name: 'featuredPackages',
      title: 'Featured Packages Section',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Section Eyebrow',
          type: 'string',
        }),
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
        }),
        defineField({
          name: 'packages',
          title: 'Featured Packages',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'reference',
              to: [{ type: 'tourPackage' }],
            }),
          ],
          description: 'Select packages to feature on the home page.',
        }),
      ],
    }),
    defineField({
      name: 'achievements',
      title: 'Achievements Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
        }),
        defineField({
            name: 'body',
            title: 'Content Section',
            type: 'text',  // Long text field
            description: 'Detailed text content for the achievements section.',
          }),
        defineField({
            name: 'video',
            title: 'Section Video',
            type: 'file',
            options: {
              accept: 'video/*',  // Restrict upload to video files
            },
            description: 'Upload a video file to display in the achievements section',
          }),
        defineField({
            name: 'stats',
            title: 'Statistics',
            type: 'array',
            of: [
              defineArrayMember({
                type: 'statistics',  // Now referencing the statistics object
              }),
            ],
            description: 'A list of achievements as statistics.',
        }),
      ],
    }),
    defineField({
      name: 'experienceShowcase',
      title: 'Experience Showcase Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
        }),
        defineField({
            name: 'subheading',
            title: 'Section Subheading',
            type: 'text',
          }),
        defineField({
          name: 'gallery',
          title: 'Gallery Images',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
            }),
          ],
          description: 'A showcase of images representing the tour experiences.',
          options: {
            layout: 'grid',
          },
        }),
      ],
    }),
    defineField({
      name: 'experienceFeatures',
      title: 'Experience Features Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          description: 'Heading for the Experience Features section',
        }),
        defineField({
            name: 'subheading',
            title: 'Section Subheading',
            type: 'text',
          }),
          defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [
              defineArrayMember({
                type: 'image',
                options: { hotspot: true },
                fields: [
                    defineField({
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                    }),
                  ],
              }),
            ],
            description: 'A showcase of images representing the tour experiences.',
            options: {
              layout: 'grid',
            },
            validation: Rule => Rule.min(2).max(2).error('Exactly 2 images are required'),
          }),
        defineField({
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'featureItem',
            }),
          ],
          description: 'A list of features with an image, title, and content.',
        }),
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
        }),
        defineField({
            name: 'subheading',
            title: 'Section Subheading',
            type: 'text',
          }),
        defineField({
          name: 'testimonialsList',
          title: 'Testimonials',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'reference',
              to: [{ type: 'testimonial' }],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'bottomQuoteSection',
      title: 'Bottom Quote Section',
      type: 'reference',
      to: [{ type: 'quote' }],
      description: 'Quote section displayed at the bottom of the homepage',
    }),
  ],
});