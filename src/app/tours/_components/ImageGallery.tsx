// src/app/tours/_components/ImageGallery.tsx

'use client';

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
// src/app/tours/_components/GalleryRow.tsx

import ImageTours1 from '@/assets/Tours-Gallery/BS-Tour_Medina_2.webp';
import ImageTours2 from '@/assets/Tours-Gallery/BS-Tour_DesertCamping.jpg';
import ImageTours3 from '@/assets/Tours-Gallery/BS-Tour_CamelRide.jpg';
import ImageTours4 from '@/assets/Tours-Gallery/BS-Tour_DateFarm.webp';
import ImageTours5 from '@/assets/Tours-Gallery/BS-Tour_DesertRide.jpg';
import ImageTours6 from '@/assets/Tours-Gallery/BS-Tour_Mount_Uhud.webp';
import ImageTours7 from '@/assets/Tours-Gallery/BS-Tour_Hotel.jpg';
import ImageTours8 from '@/assets/Tours-Gallery/BS-Tour_Ummrah.jpg';

const images = [
  { src: ImageTours1, category: 'Umrah' },
  { src: ImageTours2, category: 'Midnight BBQ' },
  { src: ImageTours3, category: 'Tours' },
  { src: ImageTours4, category: 'Museums' },
  { src: ImageTours5, category: 'Tours' },
  { src: ImageTours6, category: 'Hotel' },
  { src: ImageTours7, category: 'Food' },
  { src: ImageTours8, category: 'Hotel' },
];

const categories = [
  'Show All',
  'Umrah',
  'Midnight BBQ',
  'Museums',
  'Tours',
  'Food',
  'Hotel',
];

export default function ImageGallery() {
  const [selectedCategory, setSelectedCategory] = useState('Show All');
  // const [smallImageTargetIndex, setSmallImageTargetIndex] = useState(0);
  let largeImageTempIndex = 0;
  let smallImageTempIndex = 0;
  let nestedImageTempIndex = 0;
  let largeImagePlus1 = false;
  let largeImagePlus7 = false;
  let smallImagePlus1 = false;
  let smallImagePlus7 = false;
  let nestedImagePlus1 = false;
  let nestedImagePlus2 = false;

  const filteredImages =
    selectedCategory === 'Show All'
      ? images
      : images.filter((img) => img.category === selectedCategory);

  useEffect(() => {
    console.log(selectedCategory, categories, 'asdsadasd');
  }, [selectedCategory]);
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
              <TabsTrigger
                key={category}
                value={category}
                className=" md:text-base xs:text-sm xs:px-2 xs:py-2 md:px-4 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
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
                index: index,
              }));
              console.log('idx : ', idx);
              if (idx % 4 === 0) {
                // Slice 4 images at a time
                const imagesForRow = imagesWithIndex.slice(idx, idx + 4);

                const largeImage = () => {
                  return imagesForRow.reduce<number[]>((result, image) => {
                    if (image.index === 0) {
                      largeImagePlus1 = false;
                      largeImagePlus7 = true;
                    }
                    if (image.index === largeImageTempIndex) {
                      result.push(image.index);
                      if (largeImagePlus1) {
                        largeImageTempIndex += 1;
                        largeImagePlus7 = true;
                        largeImagePlus1 = false;
                      } else if (largeImagePlus7) {
                        largeImageTempIndex += 7;
                        largeImagePlus7 = false;
                        largeImagePlus1 = true;
                      }
                    }
                    return result;
                  }, []);
                };

                const smallImage = () => {
                  return imagesForRow.reduce<number[]>((result, image) => {
                    if (image.index === 0) {
                      smallImageTempIndex += 3;
                      smallImagePlus1 = true;
                      smallImagePlus7 = false;
                    }
                    if (image.index === smallImageTempIndex) {
                      result.push(image.index);
                      if (smallImagePlus1) {
                        smallImageTempIndex += 1;
                        smallImagePlus7 = true;
                        smallImagePlus1 = false;
                      } else if (smallImagePlus7) {
                        smallImageTempIndex += 7;
                        smallImagePlus7 = false;
                        smallImagePlus1 = true;
                      }
                    }
                    return result;
                  }, []);
                };

                const nestedImage = () => {
                  return imagesForRow.reduce<number[]>((result, image) => {
                    if (image.index === 0) {
                      nestedImageTempIndex += 1;
                      nestedImagePlus1 = true;
                      nestedImagePlus2 = false;
                    }
                    if (image.index === nestedImageTempIndex) {
                      result.push(image.index);
                      if (nestedImagePlus1) {
                        nestedImageTempIndex += 1;
                        nestedImagePlus2 = true;
                        nestedImagePlus1 = false;
                      } else if (nestedImagePlus2) {
                        nestedImageTempIndex += 3;
                        nestedImagePlus2 = false;
                        nestedImagePlus1 = true;
                      }
                    }
                    return result;
                  }, []);
                };

                const largeImageIndex = largeImage();
                const smallImageIndex = smallImage();
                const nestedImageIndex = nestedImage();
                // const reversed = idx % 8 === 4; // Reverse every other row
                console.log('imagesForRow : ', imagesForRow);
                return (
                  <GalleryRow
                    key={idx}
                    images={imagesForRow}
                    reversed={false}
                    imageIndex={idx}
                    largeImage={largeImageIndex}
                    smallImage={smallImageIndex}
                    nestedValue={nestedImageIndex}
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
  imageIndex?: number;
  largeImage: any;
  smallImage: any;
  nestedValue: any;
}

const GalleryRow: React.FC<GalleryRowProps> = ({
  images,
  imageIndex,
  largeImage,
  smallImage,
  nestedValue,
}) => {
  const largeImageIndices = [0, 4, 7];
  // const smallImageIndices = [1, 2, 3];
  const isBottom = imageIndex != null ? (imageIndex / 4) % 2 : null;

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 h-full min-h-[368px]">
        {images.map((image, index) => {
          const isLargeImage = largeImage.includes(image.index);
          const isSmallGrid = smallImage.includes(image.index);
          const isNestedGrid = nestedValue[0] == image.index;

          if (isLargeImage || (isNestedGrid && isBottom)) {
            return (
              <div
                key={index}
                className={`col-span-2 ${largeImageIndices.includes(image.index) ? 'bg-stone-50' : 'bg-gray-50'} h-auto md:h-full flex flex-col`}
              >
                {isLargeImage ? (
                  <a
                    href="#"
                    className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 flex-grow h-[16rem] sm:h-[17rem] md:h-[13rem] lg:h-[15rem] xl:h-[18rem]"
                  >
                    <Image
                      src={image?.src}
                      alt={image?.alt || ''}
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                      layout="fill"
                    />
                  </a>
                ) : (
                  ''
                )}
                {isNestedGrid && (
                  <>
                    <a
                      href="#"
                      className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 flex-grow h-[16rem] sm:h-[17rem] md:h-[13rem] lg:h-[15rem] xl:h-[18rem]"
                    >
                      <Image
                        src={
                          images.find((image) => image.index == smallImage)
                            ?.src as string
                        }
                        alt={
                          images.find((image) => image.index == smallImage)
                            ?.alt || ''
                        }
                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                        layout="fill"
                      />
                    </a>
                    <div
                      className={`flex flex-col sm:grid gap-2 md:gap-4 sm:grid-cols-${nestedValue.length} md:mt-4 mt-2`}
                    >
                      {nestedValue.map(
                        (smallIdx) => (
                          console.log(smallIdx, 'asdsad'),
                          (
                            <a
                              href="#"
                              className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 h-[16rem] sm:h-[17rem] md:h-[13rem] lg:h-[15rem] xl:h-[18rem] wleo-small-grid"
                              key={`small-${smallIdx}`}
                            >
                              <Image
                                src={
                                  images.find(
                                    (image) => image.index == smallIdx
                                  )?.src as string
                                }
                                alt={
                                  images.find(
                                    (image) => image.index == smallIdx
                                  )?.alt || ''
                                }
                                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                layout="fill"
                              />
                            </a>
                          )
                        )
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          }

          // For bottom left group grid, when there's only one item, then show the image with full height
          if (isSmallGrid && nestedValue.length == 0 && isBottom) {
            console.log(images, smallImage, 'asndjasnd');
            return (
              <div
                key={index}
                className="col-span-2 bg-stone-50 h-auto md:h-full flex flex-col"
              >
                <a
                  href="#"
                  className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 flex-grow h-[16rem] sm:h-[17rem] md:h-[13rem] lg:h-[15rem] xl:h-[18rem]"
                >
                  <Image
                    src={
                      images.find((image) => image.index == smallImage)
                        ?.src as string
                    }
                    alt={
                      images.find((image) => image.index == smallImage)?.alt ||
                      ''
                    }
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    layout="fill"
                  />
                </a>
              </div>
            );
          }

          if (isNestedGrid && !isBottom) {
            // console.log(images, smallImage, smallImage.length > 0, 'asndjasnd', smallImage.length > 0 ?? 'p')
            return (
              <div key={index} className="col-span-2 bg-stone-50">
                {isNestedGrid ? (
                  <div
                    className={`flex flex-col sm:grid gap-2 md:gap-4 sm:grid-cols-${smallImage.length > 0 ? nestedValue.length : '1'} md:mb-4 mb-2`}
                  >
                    {nestedValue.map((smallIdx) => (
                      <a
                        href="#"
                        className={`group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 h-[16rem] sm:h-[17rem] md:h-[13rem] lg:h-[15rem] xl:h-[18rem]`}
                        key={`nested-small-${smallIdx}`}
                      >
                        <Image
                          src={
                            images.find((image) => image.index == smallIdx)
                              ?.src as string
                          }
                          alt={
                            images.find((image) => image.index == smallIdx)
                              ?.alt || ''
                          }
                          className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                          layout="fill"
                        />
                      </a>
                    ))}
                  </div>
                ) : (
                  ''
                )}
                {smallImage.length > 0 ? (
                  <a
                    href="#"
                    className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 h-[16rem] sm:h-[17rem] md:h-[13rem] lg:h-[15rem] xl:h-[18rem]"
                  >
                    <Image
                      src={
                        images.find((image) => image.index == smallImage)
                          ?.src as string
                      }
                      alt={
                        images.find((image) => image.index == smallImage)
                          ?.alt || ''
                      }
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                      layout="fill"
                    />
                  </a>
                ) : (
                  ''
                )}
              </div>
            );
          }

          return null; // We don't need to render anything for index 2 and 3 as they're handled in the nested grid
        })}
      </div>
    </section>
  );
};
