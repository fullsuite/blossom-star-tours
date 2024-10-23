"use client";

import { Button } from "@/components/ui/button";

export default function DiscoverCard() {
  return (
    <div className="relative bg-eucalyptus-600 text-white p-16 rounded-2xl h-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/800/600" // Replace with the actual image dimensions you want
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Eucalyptus Overlay */}
      <div className="absolute inset-0 from-eucalyptus-700 to-eucalyptus-700/80 bg-gradient-to-r"></div>

      {/* Content (Centered) */}
      <div className="flex flex-col justify-center w-2/3 relative">
        <h3 className="text-3xl lg:text-4xl font-bold mb-4">
          Discover Our Unique Experiences!
        </h3>
        <p className="text-lg mb-6">
          We have a package that will suit your experiences that you want!
        </p>
        <Button
          variant="secondary"
          size="lg"
          className="px-6 py-3 rounded-md w-fit"
        >
          See our Tours
        </Button>
      </div>
    </div>
  );
}
