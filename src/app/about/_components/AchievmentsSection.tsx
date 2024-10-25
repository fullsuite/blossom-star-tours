import Image from "next/image";
import { StatCard } from "@/components/ui/stat-card"; // Make sure to import the StatCard component
import { Heading } from "@/components/ui/heading";
import BanngerBgImage from "@/assets/About Us/AboutUs_Banner-BG.jpg";

const stats = [
  { value: "20k", label: "Satisfied Customers" },
  { value: "10k", label: "Social Media Likes" },
  { value: "15k", label: "Total Tours" },
  { value: "5k", label: "Highly Rated" },
];

export default function AchievementsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-primary text-white py-14 sm:py-20 2xl:py-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={BanngerBgImage} // Replace with your actual image URL
          alt="Background"
          layout="fill"
          objectFit="cover" 
        />
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto z-10 flex flex-col items-center text-center">
        {/* Title */}
        <Heading variant="section" className="text-white mb-4">
          Our Achievements
        </Heading>
        <p className="text-sm sm:text-base mb-12 text-white max-w-3xl">
          We take pride in our commitment to delivering exceptional travel
          experiences. Here are some of the milestones.
        </p>

        {/* Grid for Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 md:gap-4 lg:gap-8 max-w-4xl">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              variant="light" // Using the light variant
            />
          ))}
        </div>
      </div>
    </section>
  );
}
