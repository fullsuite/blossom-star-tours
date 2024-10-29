// types.ts

// Common Types
export interface ImageAsset {
    url: string;
  }
  
  export interface Quote {
    quoteText: string; // Define this as 'any' for the Portable Text content
    author: string;
  }
  
  // Main Page Types
  export interface HomePage {
    title: string;
    heroSection: {
      heading: string;
      subHeading?: string;
      ctaButton: string;
      ctaLink: string;
      image: ImageAsset;
    };
    topQuoteSection: Quote;
    featuredPackages: {
      eyebrow?: string;
      heading: string;
      packages: TourPackage[];
    };
    achievements: {
      heading: string;
      body: string;
      video: ImageAsset;
      stats: Statistics[];
    };
    experienceShowcase: {
      heading: string;
      subheading?: string;
      gallery: ImageAsset[];
    };
    experienceFeatures: {
      heading: string;
      subheading?: string;
      images: ImageAsset[];
      features: FeatureItem[];
    };
    testimonials: {
      heading: string;
      subheading?: string;
      testimonialsList: Testimonial[];
    };
    bottomQuoteSection: Quote;
  }
  
  // Other Interfaces for Nested Schemas
  
  export interface FeatureItem {
    icon: string;
    title: string;
    body: string;
  }
  
  export interface Statistics {
    label: string;
    value: string;
  }
  
  export interface Testimonial {
    name: string;
    location: string;
    review: string;
  }
  
  export interface TourPackage {
    name: string;
    description: string;
    duration: string;
    images: ImageAsset[];
    groups: Group[];
  }
  
  export interface Group {
    name: string;
    minGroupSize: number;
    maxGroupSize: number;
    pricingType: "perGroup" | "perPerson";
    standardPricing: number;
    standardInclusions: string[];
    premiumPricing?: number;
    premiumInclusions?: string[];
  }