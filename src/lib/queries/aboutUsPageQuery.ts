export const aboutUsPageQuery = `
  *[_type == "aboutUsPage"][0]{
    pageHeader {
      title
    },
    introduction {
      eyebrow,
      heading,
      body,
      feature {
        title,
        body,
        icon
      },
      image
    },
    achievements {
      heading,
      subheading,
      stats[] {
        label,
        value
      },
      backgroundImage
    },
    experiences {
      heading,
      body,
      experiencesList[] {
        title,
        percentage
      },
      images
    }
  }
`;