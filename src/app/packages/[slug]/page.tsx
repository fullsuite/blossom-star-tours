// Server Component

import { fetchPackageDetails } from '@/sanity/lib/client';
import PackageDetailPage from './_components/page';
import { DetailedTourPackage } from '@/lib/types/tour/package';

export default async function PackageDetailServerComponent({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params; // Extract the slug from the URL

  const packageDetails: DetailedTourPackage | null =
    await fetchPackageDetails(slug);

  // Handle not found
  if (!packageDetails || packageDetails === null) {
    return <div>Package not found</div>;
  }

  // return <div></div>;
  return (
    <PackageDetailPage packageDetails={packageDetails as DetailedTourPackage} />
  );
}
