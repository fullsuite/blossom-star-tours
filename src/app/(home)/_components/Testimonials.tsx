"use client";

import React, { useState, useEffect } from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    name: "Yusuf M",
    location: "Sydney, AUS",
    text: "Our journey was nothing short of a unique experience! The tours were thoughtfully curated, blending Islamic history and culture seamlessly. I highly recommend this to anyone seeking a meaningful connection with their faith while exploring the world.",
    rating: 5,
  },
  {
    name: "Amina S",
    location: "London, UK",
    text: "This tour company offered a truly unique experience. From the moment we started, everything was infused with Islamic teachings and history, making it more than just a vacation. It felt like a journey of self-discovery and spiritual growth.",
    rating: 5,
  },
  {
    name: "Sara R",
    location: "New York, USA",
    text: "An exceptional experience! The blend of Islamic heritage with stunning destinations created a unique journey that I will cherish forever.",
    rating: 5,
  },
  {
    name: "Sara R",
    location: "New York, USA",
    text: "An exceptional experience! The blend of Islamic heritage with stunning destinations created a unique journey that I will cherish forever.",
    rating: 5,
  },
];

export default function TestimonialSection() {
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="py-10 lg:py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl lg:text-5xl font-bold text-green-800 mb-6">
          Explore the Unique Experiences Shared by Our Guests
        </h2>
        <p className="text-gray-600 text-lg mb-10">
          See what our wonderful travelers had to say about their experiences.
        </p>

        <Carousel
          opts={{
            align: "start",
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
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map(
                      (_, starIndex) => (
                        <span key={starIndex} className="text-yellow-500">
                          ⭐
                        </span>
                      )
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <p className="font-bold text-green-700">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious /> */}
          {/* <CarouselNext /> */}
        </Carousel>
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-3 w-3 rounded-full ${
                current === index ? "bg-green-700" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
