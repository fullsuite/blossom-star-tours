"use client";

import { useEffect, useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import PackageCard from '@/components/PackageCard';
import { ChevronDown } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MinimalTourPackage } from "@/lib/types/tour/package";
import { PackagesPage } from "@/lib/types/page/packagesPage";

type SortOption = 'newest' | 'oldest' | 'price-low' | 'price-high';

const sortLabels: Record<SortOption, string> = {
  'newest': 'Newest First',
  'oldest': 'Oldest First',
  'price-low': 'Price: Low to High',
  'price-high': 'Price: High to Low',
};

interface PackagesPageClientProps {
  packages: MinimalTourPackage[];
  pageData: PackagesPage | null;
}

export default function PackagesPageClient({ packages, pageData }: PackagesPageClientProps) {
  const [maxHeight, setMaxHeight] = useState<string | number>(0);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const cardRefs = useRef<HTMLDivElement[]>([]);

  // Sort packages based on selected option
  const sortedPackages = useMemo(() => {
    if (!packages) return [];

    const sorted = [...packages];
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b._createdAt || 0).getTime() - new Date(a._createdAt || 0).getTime());
      case 'oldest':
        return sorted.sort((a, b) => new Date(a._createdAt || 0).getTime() - new Date(b._createdAt || 0).getTime());
      case 'price-low':
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-high':
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      default:
        return sorted;
    }
  }, [packages, sortBy]);

  // Debounce function to limit the number of times the resize function runs
  function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number) {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  // Function to calculate the tallest card height or set it to 'max-content' on smaller screens
  const calculateTallestCardHeight = () => {
    const isSmallScreen = window.innerWidth < 640;

    if (isSmallScreen) {
      setMaxHeight('max-content');
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
    window.addEventListener('resize', handleResize);

    // Clean up the resize listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Default quote fallback
  const defaultQuote = {
    content: "Knowledge doesn't come to you, but <strong>you have to go to it.</strong>",
    author: 'Imam Malik',
  };

  // Portable text components for rendering bold text
  const quoteComponents = {
    marks: {
      strong: ({ children }: { children: React.ReactNode }) => (
        <strong className="font-bold">{children}</strong>
      ),
    },
  };

  return (
    <>
      <PageHeader title={pageData?.pageHeader?.title || "Our Tour Packages"} />
      <section className="py-10 lg:py-20 bg-white">
        <div className="container mx-auto text-center">
          {/* Section Heading */}
          <div className="flex justify-between gap-4 items-end mb-16 flex-col sm:flex-row">
            <div className="w-28 hidden lg:inline "></div>
            <div className="max-w-2xl text-start lg:text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-green-800 mb-6">
                {pageData?.introduction?.heading || "Take a look at our Experience Collection"}
              </h2>
              <p className="text-gray-600 text-lg ">
                {pageData?.introduction?.description || "Discover the best of our curated travel experiences, each designed to offer unforgettable moments and spiritual enrichment."}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  Sort By: {sortLabels[sortBy]}
                  <ChevronDown className="w-4 aspect-square ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuCheckboxItem
                  checked={sortBy === 'newest'}
                  onCheckedChange={() => setSortBy('newest')}
                >
                  {sortLabels['newest']}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={sortBy === 'oldest'}
                  onCheckedChange={() => setSortBy('oldest')}
                >
                  {sortLabels['oldest']}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={sortBy === 'price-low'}
                  onCheckedChange={() => setSortBy('price-low')}
                >
                  {sortLabels['price-low']}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={sortBy === 'price-high'}
                  onCheckedChange={() => setSortBy('price-high')}
                >
                  {sortLabels['price-high']}
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Package Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-y-24">
            {sortedPackages?.map((pkg, index) => (
              <PackageCard
                key={pkg.slug || index}
                ref={(el) => {
                  if (el) cardRefs.current[index] = el;
                }}
                package={pkg}
                style={{
                  height: maxHeight || 'auto',
                  minHeight: 'max-content',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="w-full pt-10">
        <div className="container mx-auto">
          <div className="relative flex flex-col w-full justify-center mx-auto text-center items-center px-10 sm:p-16 pt-32 pb-24 text-white overflow-hidden">
            {/* Background Image */}
            {pageData?.quoteSection?.backgroundImage ? (
              <>
                <Image
                  src={urlFor(pageData.quoteSection.backgroundImage).auto('format').quality(80).url()}
                  alt="Quote background"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-eucalyptus-700/80" />
              </>
            ) : (
              <div className="absolute inset-0 bg-eucalyptus-700" />
            )}

            {/* Quote Content */}
            <div className="relative z-10">
              {pageData?.quoteSection?.quoteText ? (
                <div className="text-3xl lg:text-5xl font-medium leading-snug mb-4 lg:leading-snug max-w-2xl">
                  <PortableText
                    value={pageData.quoteSection.quoteText}
                    components={quoteComponents}
                  />
                </div>
              ) : (
                <div
                  className="text-3xl lg:text-5xl font-medium leading-snug mb-4 lg:leading-snug max-w-2xl"
                  dangerouslySetInnerHTML={{ __html: defaultQuote.content }}
                />
              )}
              <p className="text-lg mt-4">
                {pageData?.quoteSection?.author || defaultQuote.author}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
