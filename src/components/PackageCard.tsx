'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { ClockIcon, MoveRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import UserStarRating from '@/components/UserStarRating';
import { urlFor } from '@/sanity/lib/image';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

interface PackageCardProps {
  package: any;
  classNames?: string;
  style?: React.CSSProperties;
}

const PackageCard = React.forwardRef<HTMLDivElement, PackageCardProps>(
  ({ package: pkg, classNames, style }, ref) => {
    const { name, description, duration, firstGroup, firstImage, slug } = pkg;
    const [formattedPrice, setFormattedPrice] = useState<string>('');
    const [pricingLabel, setPricingLabel] = useState<string>('');

    // Extract pricing details from the first group

    useEffect(() => {
      if (firstGroup != null) {
        const { standardPricing, pricingType } = firstGroup;
        setFormattedPrice(
          standardPricing
            ? `$${standardPricing.toLocaleString('en-US')}`
            : 'N/A'
        );
        setPricingLabel(
          pricingType === 'perPerson' ? 'per person' : 'per group'
        );
      }
    }, [firstGroup]);

    const packageUrl = `/packages/${slug.current}`;

    return (
      <Link href={packageUrl} className="block h-full">
        <Card
          ref={ref}
          className={cn(
            'w-full h-full shadow-lg rounded-2xl overflow-hidden relative flex flex-col cursor-pointer transition-shadow hover:shadow-xl',
            classNames
          )}
          style={style}
        >
          {/* Image */}
          <div className="relative w-full aspect-[4/3] -mb-8 z-0">
            <Image
              src={urlFor(firstImage ? firstImage : pkg.images[0].asset).auto('format').quality(80).url()}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="rounded-t-lg object-cover"
            />
            {/* Badge */}
            <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-semibold">
              {'Full Package'}
            </div>
          </div>

          {/* Card Content */}
          <CardContent className="py-4 px-8 z-10 relative bg-white rounded-t-lg flex flex-col flex-1">
            {/* Rating and Price */}
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <UserStarRating rating={5} size={18} />
                <span className="text-sm font-medium">{5.0}</span>
              </div>
              <div className="text-right">
                <span className="block text-xs font-medium text-gray-500">
                  From
                </span>
                {firstGroup ? (
                  <>
                    <span className="text-lg font-bold text-eucalyptus-600">
                      {formattedPrice}
                    </span>
                    <span className="block text-xs font-medium text-gray-500">
                      {pricingLabel}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-lg font-bold text-eucalyptus-600">
                      $250.00
                    </span>
                    <span className="block text-xs font-medium text-gray-500">
                      per group
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Title and Description */}
            <CardHeader className="mb-3 text-left p-0">
              <CardTitle className="text-xl font-bold text-eucalyptus-600">
                {name}
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm line-clamp-3">
                {description}
              </CardDescription>
            </CardHeader>

            {/* Duration and Explore Button - pushed to bottom */}
            <div className="flex justify-between items-center mt-auto py-2 px-4 bg-wild-sand-50 rounded-xl">
              {duration ? (
                <div className="text-sm flex items-center space-x-1 font">
                  <ClockIcon className="w-4 aspect-square text-accent-pink" />
                  <span>{duration}</span>
                </div>
              ) : (
                <div />
              )}
              <div className="flex items-center text-sm text-accent-pink">
                <span className="font-bold">Explore</span>
                <MoveRightIcon className="w-4 aspect-square text-accent-pink ml-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }
);

PackageCard.displayName = 'PackageCard';

export default PackageCard;
