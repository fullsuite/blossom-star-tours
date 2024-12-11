// types/tourGalleryPage.ts

import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PageHeader } from "../common/pageHeader";

export interface TourPackage {
  name: string;
  description: string;
  duration: string;
  images: any[];
}
