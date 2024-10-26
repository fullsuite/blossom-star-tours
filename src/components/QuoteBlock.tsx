"use client";

import React from "react";
import Image from "next/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { Quote } from "@/lib/types"; // Import the Quote type from the types file

import dividerSwirl from "@/assets/Home/Divider_Swirl.png";

interface QuoteProps {
  quote: Quote;
}

export default function QuoteBlock({ quote }: QuoteProps) {
  console.log(quote);

  return (
    <section className="w-full pt-10">
      <div className="container mx-auto">
        <div className="flex flex-col max-w-2xl justify-center mx-auto text-center items-center">
          {/* Render content with PortableText */}
          <div className="text-3xl lg:text-5xl text-primary leading-snug mb-4 lg:leading-snug">
            <PortableText value={quote.quoteText} />
          </div>
          {/* Render author */}
          <p className="text-lg text-gray-600 mt-4">{quote.author}</p>
        </div>
        <Image
          src={dividerSwirl}
          alt="divider swirl"
          width={1248}
          height={98}
          className="aspect-[1248/98] object-contain w-full h-auto mt-16"
        />
      </div>
    </section>
  );
}
