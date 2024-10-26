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