"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ClockIcon, MoveRightIcon } from "lucide-react";
import Image from "next/image";
import UserStarRating from "@/components/UserStarRating";
import { MinimalTourPackage, TourPackage } from "@/lib/types/tour/package";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

interface PackageCardProps {
  package: MinimalTourPackage;
  classNames?: string;
  style?: React.CSSProperties;
}

const PackageCard = React.forwardRef<HTMLDivElement, PackageCardProps>(
  ({ package: pkg, classNames, style }, ref) => {
    const { name, description, duration, firstGroup, firstImage, slug } = pkg;

    // Extract pricing details from the first group
    const { standardPricing, pricingType } = firstGroup;
    const formattedPrice = standardPricing
      ? `$${standardPricing.toFixed(2)}`
      : "N/A";
    const pricingLabel =
      pricingType === "perPerson" ? "per person" : "per group";

    const router = useRouter();

    return (
      <Card
        ref={ref}
        className={cn(
          "w-full shadow-lg rounded-2xl overflow-hidden relative flex flex-col",
          classNames
        )}
        style={style}
      >
        {/* Image */}
        <div className="relative w-full aspect-[4/3] -mb-8 z-0">
          <Image
            src={urlFor(firstImage).url()}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
          {/* Badge */}
          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-semibold">
            {"Full Package"}
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
              <span className="text-lg font-bold text-eucalyptus-600">
                {formattedPrice}
              </span>
              <span className="block text-xs font-medium text-gray-500">
                {pricingLabel}
              </span>
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

          {/* Duration and Explore Button */}
          <div className="flex justify-between items-center mt-auto py-2 px-4 bg-wild-sand-50 rounded-xl">
            <div className="text-sm flex items-center space-x-1 font">
              <ClockIcon className="w-4 aspect-square text-accent-pink" />
              <span>{duration}</span>
            </div>
            <Button
              variant="link"
              className="text-sm text-accent-pink"
              onClick={() => router.push(`/packages/${slug.current}`)}
            >
              <p className="font-bold">Explore</p>
              <MoveRightIcon className="w-4 aspect-square text-accent-pink ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);

PackageCard.displayName = "PackageCard";

export default PackageCard;
