import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
import { homePageQuery } from '@/lib/queries/homePageQuery';
import { HomePage } from '@/lib/types/page/homePage';
import { AboutUsPage } from '@/lib/types/page/aboutUsPage';
import { aboutUsPageQuery } from '@/lib/queries/aboutUsPageQuery';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})


export async function fetchHomePageData(): Promise<HomePage | null> {
  const data = await client.fetch(homePageQuery);
  return data || null;
}

export async function fetchAboutUsPageData(): Promise<AboutUsPage | null> {
  const data = await client.fetch(aboutUsPageQuery);
  return data || null;
}