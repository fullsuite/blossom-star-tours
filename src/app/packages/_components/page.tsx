"use client";

import React, { useEffect, useState, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import PackageCard from "@/components/PackageCard";
import { StaticImageData } from "next/image";
import { MoveRightIcon, ChevronDown, CircleCheck } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Group } from "@/lib/types";
import { MinimalTourPackage } from "@/lib/types/tour/package";
import { fetchTourPackages } from "@/sanity/lib/client";

// Define the Package type
interface Package {
  images: StaticImageData[] | any[];
  name: string;
  description: string;
  rating: number;
  duration: string;
  groups: Group[];
  slug: string;
  tag: string;
  packageContents: {
    name: string;
    contents: string[];
  };
}

// Define an array of packages
const packages: Package[] = [
  {
    images: [
      {
        asset: {
          _ref: "image-eb370ee977bd6389c71dac1decd45787af1965fc-1920x1280-jpg",
          _type: "reference",
        },
        _key: "e9259177511e",
        _type: "image",
      },
    ],
    name: "Ummrah and Hotel Package",
    description:
      "Experience a spiritually fulfilling Umrah journey with our comprehensive package, including premium accommodations and guided tours.",
    duration: "10 days",
    groups: [
      {
        maxGroupSize: 5,
        minGroupSize: 2,
        name: "Group 1",
        premiumInclusions: ["Refreshments"],
        premiumPricing: 9.99,
        standardInclusions: ["Refreshments"],
        standardPricing: 9.99,
        pricingType: "perGroup",
      },
    ],
    rating: 4.4,
    slug: "umrah-and-hotel-package",
    tag: "Full Package",
    packageContents: {
      name: "Ultimate Package",
      contents: [
        "Premium Accommodations",
        "Guided Tour",
        "Cultural Experience",
        "Relaxation",
        "Food and Beverages",
      ],
    },
  },
  {
    images: [
      {
        asset: {
          _ref: "image-eb370ee977bd6389c71dac1decd45787af1965fc-1920x1280-jpg",
          _type: "reference",
        },
        _key: "e9259177511e",
        _type: "image",
      },
    ],
    name: "Full Package",
    description:
      "Immerse yourself in the heart of Islamic history with our full package, offering a balanced mix of spiritual and cultural experiences.",
    groups: [
      {
        maxGroupSize: 5,
        minGroupSize: 2,
        name: "Group 1",
        premiumInclusions: ["Refreshments"],
        premiumPricing: 9.99,
        standardInclusions: ["Refreshments"],
        standardPricing: 9.99,
        pricingType: "perGroup",
      },
    ],
    rating: 4.4,
    duration: "4 days",
    slug: "full-package",
    tag: "Best Experience",
    packageContents: {
      name: "Full Tour Package",
      contents: [
        "Premium Accommodations",
        "Guided Tour",
        "Cultural Experience",
        "Relaxation",
        "Food and Beverages",
      ],
    },
  },
  {
    images: [
      {
        asset: {
          _ref: "image-eb370ee977bd6389c71dac1decd45787af1965fc-1920x1280-jpg",
          _type: "reference",
        },
        _key: "e9259177511e",
        _type: "image",
      },
    ],
    name: "Museum Tour",
    description:
      "Delve into the rich history of Islam with our meseum tour, featuring guided visits to iconic sites and cultural landmarks.",
    groups: [
      {
        maxGroupSize: 5,
        minGroupSize: 2,
        name: "Group 1",
        premiumInclusions: ["Refreshments"],
        premiumPricing: 9.99,
        standardInclusions: ["Refreshments"],
        standardPricing: 9.99,
        pricingType: "perGroup",
      },
    ],
    rating: 4.4,
    duration: "2 days",
    slug: "museum-tour",
    tag: "Tour Package",
    packageContents: {
      name: "Musium Tour",
      contents: [
        "Premium Accommodations",
        "Guided Tour",
        "Cultural Experience",
        "Relaxation",
        "Food and Beverages",
      ],
    },
  },
  {
    images: [
      {
        asset: {
          _ref: "image-eb370ee977bd6389c71dac1decd45787af1965fc-1920x1280-jpg",
          _type: "reference",
        },
        _key: "e9259177511e",
        _type: "image",
      },
    ],
    name: "Date Farm Tour",
    description:
      "Explore the rich cultural heritage of Saudi Arabia with our Date Farm Tour, offering a unique glimpse into traditional agricultural practices.",
    groups: [
      {
        maxGroupSize: 5,
        minGroupSize: 2,
        name: "Group 1",
        premiumInclusions: ["Refreshments"],
        premiumPricing: 9.99,
        standardInclusions: ["Refreshments"],
        standardPricing: 9.99,
        pricingType: "perGroup",
      },
    ],
    rating: 4.4,
    duration: "4 days",
    slug: "date-farm-tour",
    tag: "Best Experience",
    packageContents: {
      name: "Package Contents",
      contents: [
        "Premium Accommodations",
        "Guided Tour",
        "Cultural Experience",
        "Relaxation",
        "Food and Beverages",
      ],
    },
  },
  {
    images: [
      {
        asset: {
          _ref: "image-eb370ee977bd6389c71dac1decd45787af1965fc-1920x1280-jpg",
          _type: "reference",
        },
        _key: "e9259177511e",
        _type: "image",
      },
    ],
    name: "Relaxing Tour",
    description:
      "Unwind and rejuvenate with our Relaxing Tour, designed to offer peaceful moments in serene locations, perfect spiritual reflection.",
    groups: [
      {
        maxGroupSize: 5,
        minGroupSize: 2,
        name: "Group 1",
        premiumInclusions: ["Refreshments"],
        premiumPricing: 9.99,
        standardInclusions: ["Refreshments"],
        standardPricing: 9.99,
        pricingType: "perGroup",
      },
    ],
    rating: 4.4,
    duration: "4 days",
    slug: "relaxing-tour",
    tag: "Relaxing Tour",
    packageContents: {
      name: "Package Contents",
      contents: [
        "Premium Accommodations",
        "Guided Tour",
        "Cultural Experience",
        "Relaxation",
        "Food and Beverages",
      ],
    },
  },
  {
    images: [
      {
        asset: {
          _ref: "image-eb370ee977bd6389c71dac1decd45787af1965fc-1920x1280-jpg",
          _type: "reference",
        },
        _key: "e9259177511e",
        _type: "image",
      },
    ],
    name: "Extreme Tour",
    description:
      "Embark on an adventurous journey with our Extreme Tour, featuring thrilling activities that blend excitement with cultural discovery.",
    groups: [
      {
        maxGroupSize: 5,
        minGroupSize: 2,
        name: "Group 1",
        premiumInclusions: ["Refreshments"],
        premiumPricing: 9.99,
        standardInclusions: ["Refreshments"],
        standardPricing: 9.99,
        pricingType: "perGroup",
      },
    ],
    rating: 4.4,
    duration: "2 days",
    slug: "extreme-tour",
    tag: "Extreme Package",
    packageContents: {
      name: "Package Contents",
      contents: [
        "Premium Accommodations",
        "Guided Tour",
        "Cultural Experience",
        "Relaxation",
        "Food and Beverages",
      ],
    },
  },
];

interface PackagesPageProps {
  tourPackages: MinimalTourPackage[];
}

export default function PackagesPage({ tourPackages }: PackagesPageProps) {
  const [packageContentsOpen, setPackageContentsOpen] = useState<string[]>([]);
  const [maxHeight, setMaxHeight] = useState<string | number>(0);
  const [filter, setFilter] = useState(1);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  // Debounce function to limit the number of times the resize function runs
  function debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  // Function to calculate the tallest card height or set it to 'max-content' on smaller screens
  const calculateTallestCardHeight = () => {
    const isSmallScreen = window.innerWidth < 640;

    if (isSmallScreen) {
      setMaxHeight("max-content");
    } else if (cardRefs.current.length > 0) {
      const heights = cardRefs.current.map((ref) => ref?.offsetHeight || 0);
      const tallestHeight = Math.max(...heights);
      setMaxHeight(tallestHeight);
    }
  };

  useEffect(() => {
    calculateTallestCardHeight();

    // Debounced resize handler to recalculate on window resize
    const handleResize = debounce(calculateTallestCardHeight, 100);
    window.addEventListener("resize", handleResize);

    // Clean up the resize listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [packageContentsOpen]);

  console.log("maxHeight", maxHeight);

  const quote = {
    content:
      "Knowledge doesn’t come to you, but <strong>you have to go to it.</strong>",
    author: "Imam Malik",
  };
  return (
    <>
      <PageHeader title="Our Tour Packages" />
      <section className="py-10 lg:py-20 bg-white">
        <div className="container mx-auto text-center">
          {/* Section Heading */}
          <div className="flex justify-between gap-4 items-end mb-16 flex-col sm:flex-row">
            <div className="w-28 hidden lg:inline "></div>
            <div className="max-w-2xl text-start lg:text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-green-800 mb-6">
                Take a look at our Experience Collection
              </h2>
              <p className="text-gray-600 text-lg ">
                Discover the best of our curated travel experiences, each
                designed to offer unforgottable moments and spiritual
                enrichment.
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  Filter Packages By:{" "}
                  <ChevronDown className="w-4 aspect-square ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuCheckboxItem
                  checked={filter === 1}
                  onCheckedChange={() => setFilter(1)}
                >
                  Oldest
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filter === 2}
                  onCheckedChange={() => setFilter(2)}
                >
                  Newest
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filter === 3}
                  onCheckedChange={() => setFilter(3)}
                >
                  Cheapest
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filter === 4}
                  onCheckedChange={() => setFilter(4)}
                >
                  Most Expensive
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Package Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-y-24">
            {tourPackages.map((pkg, index) => (
              <div className="flex flex-col flex-1" key={index}>
                <PackageCard
                  ref={(el) => {
                    if (el) cardRefs.current[index] = el; // Ensure only valid elements are added
                  }}
                  package={pkg}
                  slug={pkg.slug}
                  style={{
                    height: maxHeight || "auto",
                    minHeight: "max-content",
                  }} // Apply the maxHeight here
                  classNames={
                    packageContentsOpen.includes(pkg.slug) ? "flex-1" : ""
                  }
                />
                {packageContentsOpen.includes(pkg.slug) && (
                  <div className="w-full mt-10 text-start mx-8">
                    <h3 className="text-2xl font-bold text-wild-sand-950 mb-4">
                      {"Inclusions"}
                    </h3>
                    <ul className="list-inside list-none">
                      {pkg.firstGroup.standardInclusions.map(
                        (content, index) => (
                          <li
                            className="mb-2 flex gap-2 text-wild-sand-800 font-semibold"
                            key={index}
                          >
                            <CircleCheck className="w-4 aspect-square" />
                            {content}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
                <div className="flex justify-center items-center mt-8 mx-8 py-2 px-2 bg-wild-sand-50 rounded-md w-auto">
                  <Button
                    className="text-eucalyptus-600 justify-between w-full"
                    variant="link"
                    onClick={() =>
                      setPackageContentsOpen((prev) =>
                        prev.includes(pkg.slug)
                          ? prev.filter((slug) => slug !== pkg.slug)
                          : [...prev, pkg.slug]
                      )
                    }
                  >
                    <p className="font-bold text-xs sm:text-sm overflow-hidden text-ellipsis">
                      {packageContentsOpen.includes(pkg.slug)
                        ? "Hide this Package contains"
                        : "View what this Package contains"}
                    </p>
                    <MoveRightIcon className="min-w-4 aspect-square ml-2 text-eucalyptus-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full pt-10">
        <div className="container mx-auto">
          <div className="flex flex-col w-full justify-center mx-auto text-center items-center bg-eucalyptus-700 px-10 sm:p-16 pt-32 pb-24 text-white">
            {/* Render content with HTML, ensuring styling */}
            <div
              className="text-3xl lg:text-5xl font-medium leading-snug mb-4 lg:leading-snug max-w-2xl"
              dangerouslySetInnerHTML={{ __html: quote.content }}
            />
            {/* Render author */}
            <p className="text-lg mt-4">{quote.author}</p>
          </div>
        </div>
      </section>
    </>
  );
}
