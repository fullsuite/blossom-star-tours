'use client';
import Image from "next/image";
import { useState } from 'react';
import { CirclePlay } from "lucide-react";

import kabahPhoto from '@/assets/Home/kabah-photo.jpg';

export default function  VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full h-64 sm:h-[30rem] bg-black rounded-3xl overflow-hidden">
      {!isPlaying ? (
        <div className="relative w-full h-full">
          <Image src={kabahPhoto} alt="Kabah Photo" className="absolute inset-0 w-full h-full object-cover" />
          {/* Play button */}
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 flex items-center justify-center w-full h-full bg-transparent text-white"
          >
            <CirclePlay className="w-20 h-20 text-current" strokeWidth={1} />
          </button>
        </div>
      ) : (
        // HTML5 video player
        <video
          className="absolute inset-0 w-full h-full"
          src="/Home/Home-Video.mov"  // Accessing from the public folder
          autoPlay
          controls
          onEnded={() => setIsPlaying(false)}
          // onClick={() => setIsPlaying(false)}
        />
      )}
    </div>
  );
}