import { ImageAsset } from "@/lib/types/common/imageAsset";
import { PageHeader } from "@/lib/types/common/pageHeader";

export interface IntroductionSection {
  heading: string;
  description: string;
}

export interface QuoteSection {
  quoteText: any[]; // Portable Text content type (block content)
  author: string;
  backgroundImage: ImageAsset;
}

export interface PackagesPage {
  pageHeader: PageHeader;
  introduction: IntroductionSection;
  quoteSection: QuoteSection;
}
