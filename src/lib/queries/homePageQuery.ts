// lib/queries.ts
export const homePageQuery = `
  *[_type == "homePage"][0] {
    title,
    heroSection {
      heading,
      subHeading,
      ctaButton,
      ctaLink,
      "image": { "url": image.asset->url }
    },
    topQuoteSection->{
      quoteText,
      author
    },
    featuredPackages {
      eyebrow,
      heading,
      packages[]->{
        name,
        description,
        duration,
        "images": images[]{ "url": asset->url },
        groups[] {
          name,
          minGroupSize,
          maxGroupSize,
          pricingType,
          standardPricing,
          standardInclusions,
          premiumPricing,
          premiumInclusions
        }
      }
    },
    achievements {
      heading,
      body,
    "video": { "url": video.asset->url },
      stats[] {
        label,
        value
      }
    },
    experienceShowcase {
      heading,
      subheading,
      "gallery": gallery[]{ "url": asset->url }
    },
    experienceFeatures {
      heading,
      subheading,
    "images": images[]{ "url": asset->url },
      features[] {
        icon,
        title,
        body
      }
    },
    testimonials {
      heading,
      subheading,
      testimonialsList[]->{
        name,
        location,
        review
      }
    },
    bottomQuoteSection->{
      quoteText,
      author
    }
  }
`