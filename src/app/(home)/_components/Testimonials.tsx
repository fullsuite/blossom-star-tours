"use client";

import React, { useState, useEffect } from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { HomePage } from "@/lib/types";
import TestimonialCard from "@/components/TestimonialCard";

interface TestimonialSectionProps {
  content: HomePage["testimonials"];
}

export default function TestimonialSection({
  content,
}: TestimonialSectionProps) {
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const { heading, subheading, testimonialsList } = content;

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="py-10 lg:py-20 w-full overflow-hidden bg-wild-sand-50 mb-10">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
          {heading}
        </h2>
        <p className="text-body-secondary text-lg mb-10">{subheading}</p>

        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent>
            {testimonialsList.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className={`pl-12 max-w-[47rem] transition-opacity duration-500 ${
                  current === index ? "opacity-100" : "opacity-50"
                }`}
              >
                <TestimonialCard testimonial={{ ...testimonial, rating: 5 }} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex items-center justify-center mt-12 gap-x-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`rounded-full ${
                current === index ? "bg-gray-400" : "bg-white"
              } ${current === index ? "h-5 w-5" : "h-4 w-4"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
