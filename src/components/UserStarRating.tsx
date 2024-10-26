import React from "react";
import Image from "next/image";
import IconStar from "@/assets/Icons/Icon-Star.svg";
import IconStarFull from "@/assets/Icons/Icon-Star-Full.svg";
import IconStarHalf from "@/assets/Icons/Icon-Star-Half.svg";
import clsx from "clsx";

interface UserStarRatingProps {
  rating: number;
  size?: number;
  className?: string; // Optional className prop
}

// Convert rating to stars
const UserStarRating = ({
  rating,
  size = 20,
  className,
}: UserStarRatingProps) => {
  if (rating > 5 || rating < 0) return null;

  const fullScore = Math.floor(rating);
  const halfScore = rating % 1 !== 0;
  const emptyScore = 5 - fullScore - (halfScore ? 1 : 0);

  return (
    <div className={clsx("flex gap-0.5", className)}>
      {fullScore > 0 &&
        [...Array(fullScore)].map((_, index) => (
          <Image
            key={`full-${index}`}
            src={IconStarFull}
            alt="star"
            width={size}
            height={size}
          />
        ))}
      {halfScore && (
        <Image src={IconStarHalf} alt="star" width={size} height={size} />
      )}
      {emptyScore > 0 &&
        [...Array(emptyScore)].map((_, index) => (
          <Image
            key={`empty-${index}`}
            src={IconStar}
            alt="star"
            width={size}
            height={size}
          />
        ))}
    </div>
  );
};

export default UserStarRating;
