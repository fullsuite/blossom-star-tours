// Server Component

import { fetchPackageDetails } from "@/sanity/lib/client";
import PackageDetailPage from "./_components/page";

export default async function PackageDetailServerComponent({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params; // Extract the slug from the URL

  const packageDetails = await fetchPackageDetails(slug);

  // Handle not found
  if (!packageDetails) {
    return <div>Package not found</div>;
  }

  // return <div></div>;
  return <PackageDetailPage packageDetails={packageDetails} />;
}
