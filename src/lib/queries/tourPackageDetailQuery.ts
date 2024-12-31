export const tourPackageDetailQuery = `
*[_type == "tourPackage" && slug.current == $slug][0] {
  _id,
  slug,
  name,
  description,
  duration,
  maxPeople,
  minAge,
  pickup,
  images[] {
    asset
  },
  groups[] {
    name,
    minGroupSize,
    maxGroupSize,
    pricingType,
    standardPricing,
    standardInclusions,
    premiumPricing,
    premiumInclusions
  },
  itinerary[] {
    time,
    description
  }
}
`;