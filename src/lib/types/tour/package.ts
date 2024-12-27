import { ImageAsset } from "@/lib/types";
import { Group } from "@/lib/types/tour/group";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface TourPackage {
    name: string;
    description: string;
    duration: string;
    images: SanityImageSource[];
    groups: Group[];
  }
  




// Type for a minimal tour package
export type MinimalTourPackage = {
  _id: string;
  slug: string;
  name: string;
  description: string;
  duration: string;
  firstImage: ImageAsset
  firstGroup: {
    standardPricing: number;
    pricingType: "perGroup" | "perPerson";
    standardInclusions: string[];
  };
  packageContents: any;
};

export interface Itinerary {
  time: string; // e.g., "Day 01"
  description: string; // e.g., "Pickup and Arrive at Makkah Hotel"
}

// Type for a detailed tour package
export type DetailedTourPackage = {
  _id: string;
  slug: Slug;
  name: string;
  description: string;
  duration: string;
  pickup: string;
  minAge: number;
  maxPeople: number;
  images: ImageAsset; // Array of images with URLs
  groups: Group[];
  itinerary: Itinerary[]; // Array of itinerary items
};