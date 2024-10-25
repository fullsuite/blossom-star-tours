"use client";

import React, { useState, useEffect } from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    name: "Yusuf M",
    location: "Sydney, AUS",
    text: "Our journey was nothing short of a unique experience! The tours were thoughtfully curated, blending Islamic history, culture, and incredible sightseeing. The guides were deeply knowledgeable, making each site come alive with historical significance. I highly recommend this to anyone seeking a meaningful connection with their faith while exploring the world.",
    rating: 5,
  },
  {
    name: "Amina S",
    location: "London, UK",
    text: "This tour company offered a truly unique experience. From the moment we started, each location was enriched with Islamic teachings and history, making it more than just a vacation. It felt like a journey of self-discovery, learning, and spiritual growth that stayed with me long after the trip ended.",
    rating: 5,
  },
  {
    name: "Sara R",
    location: "New York, USA",
    text: "An exceptional experience! The blend of Islamic heritage with stunning destinations created a unique journey that I will cherish forever. From the detailed planning to the beautiful sights, every moment was thoughtful, and the people we met made it unforgettable.",
    rating: 5,
  },
  {
    name: "Ali H",
    location: "Dubai, UAE",
    text: "This tour was incredible from start to finish! The guides were passionate and knowledgeable, sharing insights that added so much to each destination. The careful inclusion of Islamic heritage made each visit memorable, providing a connection that felt both personal and enlightening.",
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
    <section className="py-10 lg:py-20 w-full overflow-hidden bg-wild-sand-50 mb-10">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
          Explore the Unique Experiences Shared by Our Guests
        </h2>
        <p className="text-primary text-lg mb-10">
          See what our wonderful travelers had to say about their experiences.
        </p>

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
            {testimonials.map((testimonial, index) => (
              <CarouselItem 
                key={index} 
                className={`pl-12 max-w-[47rem] transition-opacity duration-500 ${
                  current === index ? "opacity-100" : "opacity-50"
                }`}
              >
                <div className="bg-white shadow-lg rounded-2xl p-12 text-left h-full flex flex-col">
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
                  <p className="font-bold text-green-700 mt-auto">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex items-center justify-center mt-12 gap-x-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`rounded-full ${current === index ? "bg-gray-400" : "bg-white"} ${current === index ? "h-5 w-5" : "h-4 w-4"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
