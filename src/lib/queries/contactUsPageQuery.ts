// src/lib/queries/contactUsPageQuery.ts

export const contactUsPageQuery = `*[_type == "contactUsPage"][0]{
    pageHeader,
    contactSection{
      heading,
      subheading,
      contacts[]{
        icon,
        label,
        value
      },
      whatsapp{
        label,
        number,
        buttonText
      },
      hours
    },
    contactForm{
      heading,
      description,
      successMessage
    }
  }`;