"use client";

import { Button } from "@/components/ui/button";
import PackageCard from "@/components/PackageCard";
import { HomePage } from "@/lib/types/page/homePage";

interface FeaturedPackagesProps {
  content: HomePage["featuredPackages"];
}

export default function FeaturedPackages({ content }: FeaturedPackagesProps) {
  const { eyebrow, heading, packages } = content;

  return (
    <section className="py-10 lg:py-20 bg-white">
      <div className="container mx-auto text-center">
        {eyebrow && <p className="text-gray-600 text-lg mb-4">{eyebrow}</p>}
        <div className="flex flex-col items-stretch relative mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-primary">
            {heading}
          </h2>
          <Button className="absolute right-0 top-0 bottom-0 my-auto bg-primary text-white px-6 py-2 rounded-md shadow hidden xl:block">
            View all our Packages
          </Button>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <PackageCard package={pkg} key={index} />
          ))}
        </div>

        {/* View All Packages Button */}
        <Button className="mt-8 bg-primary text-white px-6 py-2 rounded-md shadow xl:hidden">
          View all our Packages
        </Button>
      </div>
    </section>
  );
}
