export const tourPackageQuery = `
*[_type == "tourPackage" && defined(slug.current)] {
  _id,
  _createdAt,
  slug,
  name,
  description,
  duration,
  durationCategory,
  categories,
  packageContents,
  "firstImage": images[0].asset,
  "firstGroup": groups[0] {
    standardPricing,
    pricingType,
    standardInclusions
  },
  "price": groups[0].standardPricing,
  "minGroupSize": groups[0].minGroupSize,
  "maxGroupSize": math::max(groups[].maxGroupSize)
}
`;