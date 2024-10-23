import Image from "next/image";
import { StatCard } from "@/components/ui/stat-card"; // Make sure to import the StatCard component
import { Heading } from "@/components/ui/heading";
import { Paragraph } from "@/components/ui/paragraph";

const stats = [
  { value: "20k", label: "Satisfied Customers" },
  { value: "10k", label: "Social Media Likes" },
  { value: "15k", label: "Total Tours" },
  { value: "5k", label: "Highly Rated" },
];

export default function AchievementsSection() {
  return (
    <section className="relative bg-eucalyptus-500 text-white py-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/1920/1080" // Replace with your actual image URL
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-20" // To create that overlay effect
        />
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto z-10 flex flex-col items-center text-center">
        {/* Title */}
        <Heading variant="section" className="text-white mb-4">
          Our Achievements
        </Heading>
        <Paragraph className=" mb-12 text-white max-w-3xl">
          We take pride in our commitment to delivering exceptional travel
          experiences. Here are some of the milestones we’ve reached on our
          journey to serving our valued customers.
        </Paragraph>

        {/* Grid for Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl">
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
