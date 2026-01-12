import { type SchemaTypeDefinition } from 'sanity'
import { tourPackage } from './tourPackage'
import { homePage } from './homePage'
import { aboutUsPage } from './aboutUsPage'
import { statistics } from './statistics'
import { testimonial } from './testimonial'
import { pageHeader } from './pageHeader'
import { featureItem } from './featureItem'
import { quote } from './quote'
import { featureWithPercentage } from './featureWithPercentage'
import { tourGalleryPage } from './tourGalleryPage'
import { contactUsPage } from './contactUsPage'
import { packagesPage } from './packagesPage'

export const schemaTypes: SchemaTypeDefinition[] = [
  tourPackage,
  homePage,
  aboutUsPage,
  tourGalleryPage,
  contactUsPage,
  packagesPage,
  quote,
  statistics,
  featureItem,
  testimonial,
  pageHeader,
  featureWithPercentage
]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}
