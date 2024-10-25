import React from 'react';
import Image from 'next/image';
import IconStar from"@/assets/Icons/Icon-Star.svg";
import IconStarFull from"@/assets/Icons/Icon-Star-Full.svg";
import IconStarHalf from"@/assets/Icons/Icon-Star-Half.svg";

// convert rating to star
const UserStarRating = ({rating, size = 20} : {rating: number, size?: number}) => {
  if (rating > 5 || rating < 0) return; 
    console.log(rating)
    const fullScore = Math.floor(rating);
    const halfScore = rating % 1 !== 0;
    const emptyScore = 5 - fullScore - (halfScore ? 1 : 0);

    return (
      <div className="flex gap-0.5">
        {fullScore > 0 && [...Array(fullScore)].map((_, index) => (
          <Image
            key={index}
            src={IconStarFull}
            alt="star"
            width={size}
            height={size}
          />
        ))}
        {halfScore && (
          <Image
            src={IconStarHalf}
            alt="star"
            width={size}
            height={size}
          />)}
        {emptyScore > 0 && [...Array(emptyScore)].map((_, index) => (
          <Image
            key={index}
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
