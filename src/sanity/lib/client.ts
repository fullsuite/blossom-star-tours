import { createClient, type QueryParams } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
import { homePageQuery } from '@/lib/queries/homePageQuery';
import { HomePage } from '@/lib/types/page/homePage';
import { AboutUsPage } from '@/lib/types/page/aboutUsPage';
import { aboutUsPageQuery } from '@/lib/queries/aboutUsPageQuery';
import { TourGalleryPage } from '@/lib/types/page/tourGalleryPage';
import { tourGalleryQuery } from '@/lib/queries/tourGalleryQuery';
import { ContactUsPage } from '@/lib/types/page/contactUsPage';
import { contactUsPageQuery } from '@/lib/queries/contactUsPageQuery';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 60, // default revalidation time in seconds
  tags = [],
}: {
  query: QueryString
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
}) {
  return client.fetch(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  })
}

export async function fetchHomePageData(): Promise<HomePage | null> {
  const data = await sanityFetch ( {
    query : homePageQuery, 
    // revalidate: 10 
  });
  return data || null;
}

export async function fetchAboutUsPageData(): Promise<AboutUsPage | null> {
  const data = await sanityFetch ( {
    query : aboutUsPageQuery, 
    // revalidate: 10 
  });
  return data || null;
}

export async function fetchTourGalleryPageData(): Promise<TourGalleryPage | null> {
  const data = await sanityFetch ( {
    query : tourGalleryQuery, 
    // revalidate: 10 
  });
  return data || null;
}

export async function fetchContactPageData(): Promise<ContactUsPage | null> {
  const data = await sanityFetch ( {
    query : contactUsPageQuery, 
    // revalidate: 10 
  });
  return data || null;
}