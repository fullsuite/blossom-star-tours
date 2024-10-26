import { ImageAsset } from "@/lib/types/common/imageAsset";
import { Group } from "@/lib/types/tour/group";

export interface TourPackage {
    name: string;
    description: string;
    duration: string;
    images: ImageAsset[];
    groups: Group[];
  }
  
