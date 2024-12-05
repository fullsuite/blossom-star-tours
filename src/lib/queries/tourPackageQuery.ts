export const tourPackageQuery = `
*[_type == "tourPackage"] {
  _id,
  slug,
  name,
  description,
  duration,
  "firstImage": images[0].asset,
  "firstGroup": groups[0] {
    standardPricing,
    pricingType,
    standardInclusions
  }
}
`;