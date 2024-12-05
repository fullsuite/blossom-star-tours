// Reusable schema for features with a title and percentage
import { defineType, defineField } from 'sanity';

export const featureWithPercentage = defineType({
    name: 'featureWithPercentage',
    title: 'Feature with Percentage',
    type: 'object',
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: Rule => Rule.required(),
      }),
      defineField({
        name: 'percentage',
        title: 'Percentage',
        type: 'number',
        validation: Rule => Rule.required().min(0).max(100),
      }),
    ],
  });