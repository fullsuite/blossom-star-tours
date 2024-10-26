import { FeatureItem } from "@/lib/types/common/featureItem";
import { ImageAsset } from "@/lib/types/common/imageAsset";
import { PageHeader } from "@/lib/types/common/pageHeader";

export interface Statistics {
    label: string;
    value: string;
  }
  
  export interface FeatureWithPercentage {
    title: string;
    percentage: number;
  }
  
  export interface IntroductionSection {
    eyebrow: string;
    heading: string;
    body: any[]; // Portable Text content type (block content)
    feature: FeatureItem;
    image: ImageAsset;
  }
  
  export interface AchievementsSection {
    heading: string;
    subheading: string;
    stats: Statistics[];
    backgroundImage: ImageAsset;
  }
  
  export interface ExperiencesSection {
    heading: string;
    body: any[]; // Portable Text content type (block content)
    experiencesList: FeatureWithPercentage[];
    images: ImageAsset[];
  }
  
  export interface AboutUsPage {
    pageHeader: PageHeader;
    introduction: IntroductionSection;
    achievements: AchievementsSection;
    experiences: ExperiencesSection;
  }