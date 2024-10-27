// tourGalleryQuery.js

export const tourGalleryQuery = `
 *[_type == "tourGalleryPage"][0] {
    pageHeader,
    introSection {
      heading,
      subheading
    },
    galleryImages[] {
      ...,
      tags
    }
  }
`;