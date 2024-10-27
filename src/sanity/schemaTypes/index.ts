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

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    tourPackage,
    homePage,
    aboutUsPage,
    tourGalleryPage,
    quote,
    statistics,
    featureItem,
    testimonial,
    pageHeader,
    featureWithPercentage
  ],
}
