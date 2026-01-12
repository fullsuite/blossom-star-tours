"use client";

import Image from "next/image";
import ContentBlock from "@/components/ContentBlock";
import { Star, Sparkles, ThumbsUp } from "lucide-react";
import { HomePage } from "@/lib/types/page/homePage";
import { urlFor } from "@/sanity/lib/image";

interface ExperienceSectionProps {
  content: HomePage["experienceFeatures"]; // Use HomePage type for consistency
}

export default function ExperienceSection({ content }: ExperienceSectionProps) {
  const { heading, subheading, images, features } = content;

  return (
    <section className="py-10 lg:py-20">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
        {/* Left Column - Images */}
        <div className="relative w-full h-full hidden lg:block">
          {/* Top Image */}
          <div className="relative z-10 mb-6  w-3/5 aspect-square">
            <Image
              src={urlFor(images[0]).auto('format').quality(80).width(600).url()}
              alt="Image 1"
              className="rounded-2xl object-cover"
              fill
              sizes="(max-width: 1024px) 60vw, 30vw"
            />
          </div>

          {/* Bottom Image (Overlapping) */}
          <div className="absolute right-0 bottom-6 z-0 w-3/5 h-3/4">
            <Image
              src={urlFor(images[1]).auto('format').quality(80).width(600).url()}
              alt="Image 2"
              className="rounded-2xl object-cover"
              fill
              sizes="(max-width: 1024px) 60vw, 30vw"
            />
          </div>
        </div>

        {/* Right Column - Content */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
            {heading}
          </h2>
          <p className="text-body-secondary text-lg mb-8">{subheading}</p>

          {/* Content Blocks */}
          {features.map((feature, index) => (
            <ContentBlock
              className={index % 2 != 0 ? "lg:ml-8" : "lg:mr-8"}
              key={index}
              title={feature.title}
              description={feature.body}
              icon={
                index === 0 ? (
                  <Star className="text-white w-6 h-6" />
                ) : index === 1 ? (
                  <ThumbsUp className="text-white w-6 h-6" />
                ) : (
                  <Sparkles className="text-white w-6 h-6" />
                )
                // TODO: Handle custom component
              }
            />
          ))}
        </div>

        {/* Mobile - Images */}
        <div className="relative w-full h-full pb-48 sm:56 md:64 block lg:hidden">
          <div className="relative z-10 w-3/5 aspect-square">
            <Image
              src={urlFor(images[0]).auto('format').quality(80).width(400).url()}
              alt="Image 1"
              className="rounded-2xl object-cover"
              fill
              sizes="60vw"
            />
          </div>
          <div className="absolute right-0 bottom-6 z-0 w-3/5 h-3/4">
            <Image
              src={urlFor(images[1]).auto('format').quality(80).width(400).url()}
              alt="Image 2"
              className="rounded-2xl object-cover"
              fill
              sizes="60vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
