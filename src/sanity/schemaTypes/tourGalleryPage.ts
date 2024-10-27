import { defineType, defineField, defineArrayMember } from 'sanity';

export const tourGalleryPage = defineType({
  name: 'tourGalleryPage',
  title: 'Tour Gallery Page',
  type: 'document',
  fields: [
    // Page header section
    defineField({
      name: 'pageHeader',
      title: 'Page Header',
      type: 'pageHeader',
      description: 'Header section for the Tour Gallery page',
      validation: Rule => Rule.required(),
    }),

    // Introduction section
    defineField({
      name: 'introSection',
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
          name: 'subheading',
          title: 'Section Subheading',
          type: 'text',
          description: 'Description for the gallery section',
        }),
      ],
    }),

    // Gallery Images with Inline Tags and Alt Text
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              validation: Rule => Rule.required().error('Alt text is required'),
              description: 'Alternative text for the image for accessibility',
            }),
            defineField({
              name: 'tags',
              title: 'Tags',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Tags for filtering images',
              options: {
                layout: 'tags',
                list: [
                  { title: 'Umrah', value: 'Umrah' },
                  { title: 'Midnight BBQ', value: 'Midnight BBQ' },
                  { title: 'Museums', value: 'Museums' },
                  { title: 'Tours', value: 'Tours' },
                  { title: 'Food', value: 'Food' },
                  { title: 'Hotel', value: 'Hotel' },
                ],
              },
              validation: Rule => Rule.min(1).error('Each image must have at least one tag.'),
            }),
          ],
        }),
      ],
      options: { layout: 'grid' }, // Display images in a grid layout
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