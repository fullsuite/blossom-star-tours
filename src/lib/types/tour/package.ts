import { Group } from "@/lib/types/tour/group";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface TourPackage {
    name: string;
    description: string;
    duration: string;
    images: SanityImageSource[];
    groups: Group[];
  }
  
