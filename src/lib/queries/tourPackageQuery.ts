export const tourPackageQuery = `
*[_type == "tourPackage"] {
  _id,
  _createdAt,
  slug,
  name,
  description,
  duration,
  packageContents,
  "firstImage": images[0].asset,
  "firstGroup": groups[0] {
    standardPricing,
    pricingType,
    standardInclusions
  },
  "price": groups[0].standardPricing
}
`;