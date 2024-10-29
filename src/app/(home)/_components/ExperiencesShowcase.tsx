"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HomePage } from "@/lib/types/page/homePage";
import { urlFor } from "@/sanity/lib/image";

interface ExperienceShowcaseProps {
  content: HomePage["experienceShowcase"];
}

export default function ExperienceShowcase({
  content,
}: ExperienceShowcaseProps) {
  const { heading, subheading, gallery } = content;

  return (
    <section className="py-10 lg:py-20 w-full overflow-hidden">
      <div className="container mx-auto text-center">
        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <div className="flex justify-between items-end mb-8">
            <div className="flex flex-col items-start text-left">
              <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-6">
                {heading}
              </h2>
              <p className="text-body-secondary text-lg max-w-[37.5rem]">
                {subheading}
              </p>
            </div>
            <div className="flex items-end gap-x-2">
              {/* Adjust spacing between buttons */}
              <CarouselPrevious className="bg-white border-body-light !rounded-full w-auto h-auto p-2">
                <ChevronLeft className="text-body-light" />
              </CarouselPrevious>
              <CarouselNext className="bg-white border-body-light !rounded-full w-auto h-auto p-2">
                <ChevronRight className="text-body-light" />
              </CarouselNext>
            </div>
          </div>

          <CarouselContent>
            {gallery.map((image, index) => (
              <CarouselItem
                key={index}
                className="sm:basis-1/2 md:basis-1/3 xl:basis-1/4 !h-[400px]"
              >
                <div className="rounded-lg w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src={urlFor(image).url()}
                    alt={""}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Controls */}
        </Carousel>
      </div>
    </section>
  );
}
