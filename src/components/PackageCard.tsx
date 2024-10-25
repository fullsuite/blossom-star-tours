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
import UserStarRating from "./UserStarRating";

interface PackageCardProps {
  imageUrl: string;
  title: string;
  description: string;
  price: string;
  rating: number;
  duration: string;
}

export default function PackageCard({
  imageUrl,
  title,
  description,
  price,
  rating,
  duration,
}: PackageCardProps) {

  return (
    <Card className="w-full  shadow-lg rounded-2xl overflow-hidden relative">
      {/* Image */}
      <div className="relative w-full aspect-[4/3] -mb-8 z-0">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
        {/* Badge */}
        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-medium">
          Full Package
        </div>
      </div>

      {/* Card Content */}
      <CardContent className="py-4 px-8 z-10 relative bg-white rounded-t-lg">
        {/* Rating and Price */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2">
            <UserStarRating rating={rating} size={18}/>
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <span className="text-lg font-bold text-eucalyptus-600">{price}</span>
        </div>

        {/* Title and Description */}
        <CardHeader className="mb-3 text-left p-0">
          <CardTitle className="text-xl font-bold text-eucalyptus-600">
            {title}
          </CardTitle>
          <CardDescription className="text-gray-600 text-sm">
            {description}
          </CardDescription>
        </CardHeader>

        {/* Duration and Explore Button */}
        <div className="flex justify-between items-center mt-4 py-2 px-4 bg-wild-sand-50 rounded-md">
          <div className="text-sm flex items-center space-x-1 font">
            <ClockIcon className="w-4 aspect-square text-accent-pink" />
            <span>{duration}</span>
          </div>
          <Button variant="link" className="text-sm text-accent-pink">
            <p className="font-bold">Explore</p>
            <MoveRightIcon className="w-4 aspect-square text-accent-pink ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
