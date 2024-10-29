// src/app/tours/_components/ImageGallery.tsx

"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { useState } from "react";

const images = [
  { src: "https://picsum.photos/400/400?random=1", category: "Umrah" },
  { src: "https://picsum.photos/400/400?random=2", category: "Midnight BBQ" },
  { src: "https://picsum.photos/400/400?random=3", category: "Museums" },
  { src: "https://picsum.photos/400/400?random=4", category: "Tours" },
  { src: "https://picsum.photos/400/400?random=5", category: "Food" },
  { src: "https://picsum.photos/400/400?random=6", category: "Hotel" },
  { src: "https://picsum.photos/400/400?random=7", category: "Hotel" },
  { src: "https://picsum.photos/400/400?random=8", category: "Hotel" },
];

const categories = [
  "Show All",
  "Umrah",
  "Midnight BBQ",
  "Museums",
  "Tours",
  "Food",
  "Hotel",
];

export default function ImageGallery() {
  const [selectedCategory, setSelectedCategory] = useState("Show All");

  const filteredImages =
    selectedCategory === "Show All"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  return (
    <section className="container">
      <div className=" max-w-xl mx-auto">
        <h2 className="text-center text-3xl font-bold text-green-800 mb-4">
          Take a look at our Experience Collection
        </h2>
        <p className="text-center text-lg text-gray-600 mb-10">
          Explore a visual journey through our curated experiences. Each image
          captures the essence of the spiritual and cultural adventures we
          offer.
        </p>
      </div>
      <hr />
      {/* Tabs Section */}
      <Tabs
        defaultValue="Show All"
        onValueChange={setSelectedCategory}
        className="mt-12"
      >
        <div className="flex justify-center">
          <TabsList className="justify-center mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value={selectedCategory}>
          {/* Render GalleryRow for every 4 images */}
          <div className="space-y-10">
            {filteredImages.map((_, idx) => {
              if (idx % 4 === 0) {
                // Slice 4 images at a time
                const imagesForRow = filteredImages.slice(idx, idx + 4);
                // const reversed = idx % 8 === 4; // Reverse every other row

                return (
                  <GalleryRow
                    key={idx}
                    images={imagesForRow}
                    reversed={false}
                  />
                );
              }
              return null;
            })}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

// src/app/tours/_components/GalleryRow.tsx

import React from "react";

interface ImageItem {
  src: string;
  category: string;
  alt?: string;
}

interface GalleryRowProps {
  images: ImageItem[]; // The four images that are passed in
  reversed?: boolean; // To handle the reversed layout
}
const GalleryRow: React.FC<GalleryRowProps> = ({ images }) => {
  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 h-full">
        {images.slice(0, 4).map((image, index) => {
          if (index === 0) {
            // First image spans 2 columns
            return (
              <div
                key={index}
                className="col-span-2 bg-gray-50 h-auto md:h-full flex flex-col"
              >
                <a
                  href="#"
                  className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 flex-grow"
                >
                  <Image
                    src={image.src}
                    alt={image.alt ? image.alt : ""}
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    layout="fill"
                  />
                </a>
              </div>
            );
          }

          if (index === 1) {
            // Second image and nested grid for next two images
            return (
              <div key={index} className="col-span-2 bg-stone-50">
                <a
                  href="#"
                  className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 mb-4"
                >
                  <Image
                    src={image.src}
                    alt={image.alt ? image.alt : ""}
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    layout="fill"
                  />
                </a>
                <div className="grid gap-4 grid-cols-2">
                  {images.slice(2, 4).map((smallImage, idx) => (
                    <a
                      href="#"
                      className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40"
                      key={`small-${idx}`}
                    >
                      <Image
                        src={smallImage.src}
                        alt={smallImage.alt ? smallImage.alt : ""}
                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                        layout="fill"
                      />
                    </a>
                  ))}
                </div>
              </div>
            );
          }

          return null; // We don't need to render anything for index 2 and 3 as they're handled in the nested grid
        })}
      </div>
    </section>
  );
};
