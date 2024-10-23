// src/app/tours/page.tsx

import PageHeader from "@/components/PageHeader";
import ImageGallery from "./_components/ImageGallery";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

export default function ToursPage() {
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
