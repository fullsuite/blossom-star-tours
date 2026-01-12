'use client';

import heroBackgroundPattern from '@/assets/Home/Theme_Swirl_Top-Home.png';
import SearchForm from './SearchForm';
import { HomePage } from '@/lib/types/page/homePage';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

interface HeroProps {
  content: HomePage['heroSection'];
}

export default function Hero({ content }: HeroProps) {
  const { heading, subHeading, image } = content;

  console.log(image);

  return (
    <section className="mt-3 lg:py-20 pt-10 pb-4 sm:pb-20 overflow-hidden min-h-[880px] mb-2 xl:mb-0 flex">
      <Image
        src={heroBackgroundPattern}
        alt=""
        className="absolute mt-0 md:-mt-20 lg:mt-0 inset-0 -z-10 object-cover object-bottom xl:w-[100vw] w-[1440px] lg:h-[990px] h-[1100px]"
      />
      <div className="container relative lg:max-h-[636px] ">
        {/* Div 1 - Text and Search Form */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Column 1: Text */}
          <div className="lg:col-span-1 flex flex-col justify-center">
            <button className="bg-white hover:bg-primary text-primary hover:text-white transition linear duration-200 px-4 py-2 rounded-full text-sm shadow-md font-bold w-fit mb-8">
              Book a Tour Now
            </button>
            <h1 className="text-4xl sm:text-5xl 2xl:text-6xl font-bold text-primary leading-tight mb-6">
              {heading}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8 w-3/4 font-medium">
              {subHeading}
            </p>
          </div>

          {/* Row 2 - Full width search form */}
          <div className="lg:col-span-2 w-full md:max-w-[calc(100%-330px-20px)] lg:max-w-5xl flex justify-center sm:justify-start lg:pb-10 pl-0 lg:pl-4 ">
            <SearchForm />
          </div>
        </div>

        {/* Div 2 - Background Image */}
        <div className="absolute inset-0 w-full max-w-[1250px] hidden md:flex justify-end px-6 3xl:px-0 mx-auto pt-[330px] md:pt-72 lg:pt-0">
          {/* Image in the second column */}
          <div className="relative aspect-[3.5/5]">
            <Image
              src={urlFor(image).auto('format').quality(80).width(800).url()}
              alt="Tour"
              className="object-cover w-full h-full rounded-xl"
              fill
              sizes="(max-width: 1024px) 50vw, 40vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
