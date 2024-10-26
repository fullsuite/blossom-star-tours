"use client";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { CirclePlay } from "lucide-react";

interface VideoPlayerProps {
  thumbnail: string | StaticImageData; // Accepts either a URL or StaticImageData for local imports
  videoUrl: string;
}

export default function VideoPlayer({ thumbnail, videoUrl }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full h-64 sm:h-[30rem] bg-black rounded-3xl overflow-hidden">
      {!isPlaying ? (
        <div className="relative w-full h-full">
          {/* Thumbnail Image */}
          <Image
            src={thumbnail}
            alt="Video Thumbnail"
            className="absolute inset-0 w-full h-full object-cover"
          />
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
          src={videoUrl}
          autoPlay
          controls
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </div>
  );
}
