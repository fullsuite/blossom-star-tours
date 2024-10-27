// types/tourGalleryPage.ts

import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PageHeader } from "../common/pageHeader";

export interface TourGalleryPage {
    pageHeader: PageHeader;
    introSection: {
      heading: string;
      subheading: string;
    };
    galleryImages: GalleryImage[];
  }
  
  export interface GalleryImage {
    image: SanityImageSource;
    alt: string;
    tags: string[];
  }