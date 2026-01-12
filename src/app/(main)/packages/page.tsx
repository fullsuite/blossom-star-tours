import { fetchTourPackages, fetchPackagesPageData } from "@/sanity/lib/client";
import { MinimalTourPackage } from "@/lib/types/tour/package";
import PackagesPageClient from "./_components/PackagesPageClient";

export default async function PackagesPage() {
  const [packages, pageData] = await Promise.all([
    fetchTourPackages(),
    fetchPackagesPageData()
  ]);

  return <PackagesPageClient packages={packages as MinimalTourPackage[]} pageData={pageData} />;
}
