import { defineType, defineField, defineArrayMember } from 'sanity';
import { pageHeader } from './pageHeader';
import { statistics } from './statistics';
import { featureItem } from './featureItem';

export const aboutUsPage = defineType({
  name: 'aboutUsPage',
  title: 'About Us Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageHeader',
      title: 'Page Header',
      type: 'pageHeader',
      description: 'The main header section of the About Us page.',
    }),
    defineField({
      name: 'introText',
      title: 'Introductory Text',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Introductory text about the company, with support for rich text formatting.',
    }),
    defineField({
      name: 'featureSection',
      title: 'Feature Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          description: 'Heading for the features section.',
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
          name: 'stats',
          title: 'Statistics',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'statistics',
            }),
          ],
          description: 'A list of achievements as statistics.',
        }),
      ],
    }),
    defineField({
      name: 'extraContent',
      title: 'Additional Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Additional content or text for the About Us page.',
    }),
  ],
});