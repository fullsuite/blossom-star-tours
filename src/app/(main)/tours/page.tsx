// src/app/(main)/tours/page.tsx

import PageHeader from "@/components/PageHeader";
import ImageGallery from "./_components/ImageGallery";
import CTASection from "@/components/CTASection";
import { TourGalleryPage } from "@/lib/types/page/tourGalleryPage";
import { fetchTourGalleryPageData } from "@/sanity/lib/client";

export default async function ToursPage() {
  const data: TourGalleryPage | null = await fetchTourGalleryPageData();

  console.log(data);

  return (
    <div>
      {/* Reuse the PageHeader component */}
      <PageHeader title="Tours and Locations" />

      {/* Gallery Section with Tabs */}
      <ImageGallery />

      <CTASection />
    </div>
  );
}
