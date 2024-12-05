// src/schemas/contactUsPage.ts
import { defineType, defineField, defineArrayMember } from 'sanity';

export const contactUsPage = defineType({
  name: 'contactUsPage',
  title: 'Contact Us Page',
  type: 'document',
  fields: [
    // Page Header
    defineField({
      name: 'pageHeader',
      title: 'Page Header',
      type: 'pageHeader',
      description: 'Header section for the Contact Us page',
      validation: Rule => Rule.required(),
    }),

    // Contact Section
    defineField({
      name: 'contactSection',
      title: 'Contact Information Section',
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
          description: 'Description for the contact section',
        }),
        defineField({
          name: 'contacts',
          title: 'Contact Methods',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  description: 'Icon identifier for the contact method (e.g., location, phone, email)',
                  validation: Rule => Rule.required(),
                }),
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  description: 'Label for the contact method (e.g., "Location", "Phone")',
                  validation: Rule => Rule.required(),
                }),
                defineField({
                  name: 'value',
                  title: 'Contact Details',
                  type: 'string',
                  description: 'Actual contact information (e.g., address, phone number, email)',
                  validation: Rule => Rule.required(),
                }),
              ],
            }),
          ],
          validation: Rule => Rule.min(1).error('At least one contact method is required.'),
        }),
        defineField({
          name: 'whatsapp',
          title: 'WhatsApp Contact',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Label for WhatsApp contact (e.g., "Emergency Contact")',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'number',
              title: 'WhatsApp Number',
              type: 'string',
              description: 'WhatsApp phone number for contact',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              description: 'Text for WhatsApp contact button (e.g., "Chat With Us")',
            }),
          ],
        }),
        defineField({
          name: 'hours',
          title: 'Business Hours',
          type: 'string',
          description: 'Details of the business hours',
          validation: Rule => Rule.required(),
        }),
      ],
    }),

    // Contact Form Section
    defineField({
      name: 'contactForm',
      title: 'Contact Form',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Form Heading',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Form Description',
          type: 'text',
          description: 'Description text for the contact form',
        }),
        defineField({
          name: 'successMessage',
          title: 'Success Message',
          type: 'text',
          description: 'Message displayed upon successful form submission',
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
        title: title || 'Untitled Contact Us Page',
      };
    },
  },
});