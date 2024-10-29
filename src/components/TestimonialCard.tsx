// src/components/TestimonialCard.tsx
"use client";

import React from "react";
import UserStarRating from "@/components/UserStarRating";

interface Testimonial {
  name: string;
  location: string;
  review: string;
  rating: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const { name, location, review, rating } = testimonial;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 lg:p-12 text-left h-full flex flex-col">
      <UserStarRating rating={rating} className={"mb-4"} />
      <p className="text-gray-600 mb-4">&quot;{review}&quot;</p>
      <p className="font-bold text-green-700 mt-auto">{name}</p>
      <p className="text-gray-400 text-sm">{location}</p>
    </div>
  );
};

export default TestimonialCard;
