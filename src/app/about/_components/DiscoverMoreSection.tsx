// src/app/about/_components/DiscoverMoreSection.tsx

import { Heading } from "@/components/ui/heading";
import { ShieldCheckIcon } from "lucide-react";
import Image from "next/image";
import { AboutUsPage } from "@/lib/types/page/aboutUsPage";
import PortableTextBlock from "@/components/ui/portable-text-block";

interface DiscoverMoreSectionProps {
  content: AboutUsPage["introduction"];
}

export default function DiscoverMoreSection({
  content,
}: DiscoverMoreSectionProps) {
  const { eyebrow, heading, body, feature, image } = content;

  return (
    <section className="relative py-16 2xl:py-36 overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 sm:gap-10">
        {/* Left Column (Text Section) */}
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 mb-6">{eyebrow}</p>
          <Heading variant="section">{heading}</Heading>
          {/* Render body text (Portable Text) */}
          <PortableTextBlock value={body} />
        </div>

        {/* Right Column (Image with Overlapping Card) */}
        <div className="relative w-full">
          {/* Image */}
          <Image
            src={image.url} // Dynamic image URL from content
            alt="Tour"
            width={500}
            height={600}
            className="rounded-xl object-cover w-full xs:w-9/12 sm:w-3/5 md:w-2/3 lg:w-4/5 mx-auto sm:mx-0 sm:ml-auto"
          />
          {/* Overlapping Info Card */}
          <div className="absolute -top-16 sm:top-20 left-10 xs:left-24 2xs:left-36 sm:left-10 lg:left-0 bg-neutral-100 px-4 md:px-8 py-6 md:py-10 rounded-xl max-w-sm">
            <div className="flex items-start">
              {/* Icon Container */}
              <div className="bg-primary mr-4 rounded-full flex items-center justify-center w-12 h-12 md:w-16 md:h-16 shrink-0">
                {/* Icon */}
                <ShieldCheckIcon className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              {/* Text Content */}
              <div className="w-40 md:w-56">
                <h3 className="text-sm md:text-base font-bold text-primary mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  {feature.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
