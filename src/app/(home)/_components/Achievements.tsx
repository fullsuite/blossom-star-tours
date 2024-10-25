import React from "react";
import Image from "next/image";
import { StatCard } from "@/components/ui/stat-card"; // Import the StatCard component
import VideoPlayer from "@/components/ui/video-player"; // Import the VideoPlayer component

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "20k", label: "Satisfied Customers" },
  { value: "15k", label: "Total Tours" },
  { value: "10k", label: "Social Media Likes" },
  { value: "5k", label: "Highly Rated" },
];

export default function Achievements() {
  return (
    <section className="relative w-full py-10 lg:py-20 bg-white overflow-hidden">
      <div className="relative container mx-auto">
        {/* Div 1 - Main Content */}
        <div className="relative grid grid-cols-1 lg:grid-cols-4 lg:gap-16 z-10 ">
          {/* Row 1: First 2 Columns Empty + Text in Last 2 Columns */}
          <div className="lg:col-span-2"></div>
          <div className="lg:col-span-2 text-center lg:text-left">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-6">
              Our Achievements
            </h2>
            <p className="text-body-secondary text-lg">
              We take pride in our commitment to delivering exceptional travel
              experiences. Here are some of the milestones we’ve reached on our
              journey to serving our valued customers and enriching their
              spiritual travels.
            </p>
          </div>

          {/* Row 2: Image spanning 3 columns */}
          <div></div>
          <div className="lg:col-span-3 relative ">
            <VideoPlayer />
          </div>
        </div>

        {/* Div 2 - Stats */}
        <div className="absolute top-12 left-24 inset-0 w-96 flex flex-col items-stretch z-20">
          {/* First Column: Stats */}
          <div className="grid grid-cols-2 gap-4 h-fit w-fit mt-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${index % 2 !== 0 ? "transform translate-y-8" : "transform -translate-y-8"}`}
              >
                <StatCard
                  value={stat.value}
                  label={stat.label}
                  variant="dark" // Use dark variant
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}