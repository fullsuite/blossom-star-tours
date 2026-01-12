import { Suspense } from "react";
import { fetchTourPackages, fetchPackagesPageData } from "@/sanity/lib/client";
import { MinimalTourPackage } from "@/lib/types/tour/package";
import PackagesPageClient from "./_components/PackagesPageClient";

export default async function PackagesPage() {
  const [packages, pageData] = await Promise.all([
    fetchTourPackages(),
    fetchPackagesPageData()
  ]);

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PackagesPageClient packages={packages as MinimalTourPackage[]} pageData={pageData} />
    </Suspense>
  );
}
