export const aboutUsPageQuery = `
  *[_type == "aboutUsPage"][0]{
    pageHeader {
      title
    },
    introduction {
      eyebrow,
      heading,
      body[] {
        ... // Fetch Portable Text content
      },
      feature {
        title,
        body,
        icon
      },
      image {
        "url": asset->url
      }
    },
    achievements {
      heading,
      subheading,
      stats[] {
        label,
        value
      },
      backgroundImage {
        "url": asset->url
      }
    },
    experiences {
      heading,
      body[] {
        ... // Fetch Portable Text content
      },
      experiencesList[] {
        title,
        percentage
      },
      images[] {
        "url": asset->url
      }
    }
  }
`;