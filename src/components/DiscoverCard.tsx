"use client";

import Image from 'next/image';
import { Button } from "@/components/ui/button";

import discoverBackground from '@/assets/Home/Subscribe_BG.jpg';

export default function DiscoverCard() {
  return (
    <div className="relative bg-eucalyptus-600 text-white p-16 rounded-2xl h-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src={discoverBackground} alt="Discover Background" className="w-full h-full object-cover object-right"/>
      </div>

      {/* Content (Centered) */}
      <div className="flex flex-col justify-center relative">
        <h3 className="text-3xl lg:text-4xl font-bold mb-4">
          Discover Our Unique Experiences!
        </h3>
        <p className="text-lg mb-6 max-w-[20rem]">
          We have a package that will suit your experiences that you want!
        </p>
        <Button variant="secondary" size="lg" className="px-6 py-3 rounded-md w-fit hover:bg-neutral-900/90 hover:text-white">
          See our Tours
        </Button>
      </div>
    </div>
  );
}
