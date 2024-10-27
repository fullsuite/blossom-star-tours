import { FeatureItem } from "@/lib/types/common/featureItem";
import { ImageAsset } from "@/lib/types/common/imageAsset";
import { Quote } from "@/lib/types/common/quote";
import { Statistics } from "@/lib/types/common/statistic";
import { Testimonial } from "@/lib/types/common/testimonial";
import { TourPackage } from "@/lib/types/tour/package";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

  
  // Main Page Types
  export interface HomePage {
    title: string;
    heroSection: {
      heading: string;
      subHeading?: string;
      ctaButton: string;
      ctaLink: string;
      image: SanityImageSource;
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
      gallery: SanityImageSource[];
    };
    experienceFeatures: {
      heading: string;
      subheading?: string;
      images: SanityImageSource[];
      features: FeatureItem[];
    };
    testimonials: {
      heading: string;
      subheading?: string;
      testimonialsList: Testimonial[];
    };
    bottomQuoteSection: Quote;
  }
    
 
  
  
  
  
