// src/app/tours/_components/ImageGallery.tsx

"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
// src/app/tours/_components/GalleryRow.tsx

import ImageTours1 from "@/assets/Tours-Gallery/BS-Tour_Medina_2.webp";
import ImageTours2 from "@/assets/Tours-Gallery/BS-Tour_DesertCamping.jpg";
import ImageTours3 from "@/assets/Tours-Gallery/BS-Tour_CamelRide.jpg";
import ImageTours4 from "@/assets/Tours-Gallery/BS-Tour_DateFarm.webp";
import ImageTours5 from "@/assets/Tours-Gallery/BS-Tour_DesertRide.jpg";
import ImageTours6 from "@/assets/Tours-Gallery/BS-Tour_Mount_Uhud.webp";
import ImageTours7 from "@/assets/Tours-Gallery/BS-Tour_Hotel.jpg";
import ImageTours8 from "@/assets/Tours-Gallery/BS-Tour_Ummrah.jpg";


const images = [
  { src: ImageTours1, category: "Umrah" },
  { src: ImageTours2, category: "Midnight BBQ" },
  { src: ImageTours3, category: "Museums" },
  { src: ImageTours4, category: "Tours" },
  { src: ImageTours5, category: "Food" },
  { src: ImageTours6, category: "Hotel" },
  { src: ImageTours7, category: "Hotel" },
  { src: ImageTours8, category: "Hotel" },
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

      useEffect(() => {
        console.log(selectedCategory, categories)
      }, [selectedCategory])
  return (
    <section className="container">
      <div className=" max-w-xl mx-auto">
        <h2 className="text-center text-3xl font-bold text-green-800 mb-4">
          Take a look at our Experience Collection
        </h2>
        <p className="text-center text-md text-gray-400 mb-10">
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
        <div className="flex 2xs:justify-center">
          <TabsList className="justify-normal 2xs:justify-center mb-8 bg-transparent xs:gap-1 md:gap-3 lg:gap-4 2lg:gap-5 overflow-x-scroll sm:overflow-x-auto overflow-y-hidden no-scrollbar">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className=" md:text-base xs:text-sm xs:px-2 xs:py-2 md:px-4 data-[state=active]:bg-primary data-[state=active]:text-white">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value={selectedCategory}>
          {/* Render GalleryRow for every 4 images */}
          <div className="space-y-2 md:space-y-4">
            {filteredImages.map((_, idx) => {
              const imagesWithIndex = filteredImages.map((image, index) => ({
                ...image,      
                index: index     
              }));
              console.log("idx : ", idx);
              if (idx % 4 === 0) {
                // Slice 4 images at a time
                const imagesForRow = imagesWithIndex.slice(idx, idx + 4);
                // const reversed = idx % 8 === 4; // Reverse every other row
                console.log("imagesForRow : ",imagesForRow);
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

interface ImageItem {
  src: string | StaticImageData; // Accept either type
  category: string;
  index: number;
  alt?: string;
}

interface GalleryRowProps {
  images: ImageItem[]; // The four images that are passed in
  reversed?: boolean; // To handle the reversed layout
}

const GalleryRow: React.FC<GalleryRowProps> = ({ images }) => {
  const largeImageIndices = [0, 4, 7];
  const smallImageIndices = [1, 2, 3];

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 h-full">
        {images.map((image, index) => {
          const isLargeImage = largeImageIndices.includes(image.index);
          const isSmallGrid = image?.index === 4;
          const isNestedGrid = image?.index === 3 && !largeImageIndices.includes(image.index);
          console.log(isLargeImage, isNestedGrid, 'sadsad', smallImageIndices.slice(1, 3), smallImageIndices)
          if (isLargeImage) {
            return (
              <div
                key={index}
                className={`col-span-2 ${image.index === 4 ? "bg-stone-50" : "bg-gray-50"} h-auto md:h-full flex flex-col`}
              >
                <a
                  href="#"
                  className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 flex-grow h-custom-225 sm:h-custom-275 md:h-fit"
                >
                  <Image
                    src={image.src}
                    alt={image.alt || ""}
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    layout="fill"
                  />
                </a>
                {isSmallGrid && (
                  <div className="grid md:gap-4 gap-2 grid-cols-2 md:mt-4 mt-2">
                    {smallImageIndices.slice(0, 2).map((smallIdx) => (
                      <a
                        href="#"
                        className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 h-custom-225 sm:h-custom-275 md:h-fit"
                        key={`small-${smallIdx}`}
                      >
                        <Image
                          src={images[smallIdx].src}
                          alt={images[smallIdx].alt || ""}
                          className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                          layout="fill"
                        />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          if (isNestedGrid) {
            return (
              <div key={index} className="col-span-2 bg-stone-50" >
                <div className="grid md:gap-4 gap-2 grid-cols-2 md:mb-4 mb-2">
                  {smallImageIndices.slice(0, 2).map((smallIdx) => (
                    <a
                      href="#"
                      className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 h-custom-225 sm:h-custom-275 md:h-fit"
                      key={`nested-small-${smallIdx}`}
                    >
                      <Image
                        src={images[smallIdx].src}
                        alt={images[smallIdx].alt || ""}
                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                        layout="fill"
                      />
                    </a>
                  ))}
                </div>
                <a
                  href="#"
                  className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 h-custom-225 sm:h-custom-275 md:h-fit"
                >
                  <Image
                    src={image.src}
                    alt={image.alt || ""}
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    layout="fill"
                  />
                </a>
              </div>
            );
          }

          return null; // We don't need to render anything for index 2 and 3 as they're handled in the nested grid
        })}
      </div>
    </section>
  );
};
