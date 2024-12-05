// schemas/featureItem.js
import { defineType, defineField } from 'sanity';

export const featureItem = defineType({
  name: 'featureItem',
  title: 'Feature Item',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Feature Icon Name',
      type: 'string',
      description: 'Enter the name of a Lucide icon, e.g., "home", "star", "settings"',
      validation: Rule => Rule.required().error('Icon name is required'),
    }),
    defineField({
      name: 'title',
      title: 'Feature Title',
      type: 'string',
      validation: Rule => Rule.required().error('Title is required'),
    }),
    defineField({
      name: 'body',
      title: 'Feature Content',
      type: 'text',
      description: 'Detailed description of the feature',
      validation: Rule => Rule.max(200).error('Content must be 200 characters or less'),
    }),
  ],
});