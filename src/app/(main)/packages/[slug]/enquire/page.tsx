import { fetchPackageDetails } from '@/sanity/lib/client';
import { DetailedTourPackage } from '@/lib/types/tour/package';
import EnquiryFormClient from './_components/EnquiryFormClient';

export default async function EnquirePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const packageDetails: DetailedTourPackage | null =
    await fetchPackageDetails(slug);

  if (!packageDetails) {
    return <div>Package not found</div>;
  }

  return <EnquiryFormClient packageDetails={packageDetails} />;
}
