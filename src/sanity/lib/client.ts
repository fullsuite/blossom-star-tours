import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
import { homePageQuery } from '@/lib/queries/homePageQuery';
import { HomePage } from '@/lib/types';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export async function fetchHomePageData(): Promise<HomePage | null> {
  const data = await client.fetch(homePageQuery);

  if (!data) return null;
  return data as HomePage;
}