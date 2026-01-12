export const packagesPageQuery = `
  *[_type == "packagesPage"][0]{
    pageHeader {
      title
    },
    introduction {
      heading,
      description
    },
    quoteSection {
      quoteText,
      author,
      backgroundImage
    }
  }
`;
