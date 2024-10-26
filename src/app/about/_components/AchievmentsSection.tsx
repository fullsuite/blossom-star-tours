import Image from "next/image";
import { StatCard } from "@/components/ui/stat-card";
import { Heading } from "@/components/ui/heading";
import { AboutUsPage } from "@/lib/types/page/aboutUsPage";

interface AchievementsSectionProps {
  content: AboutUsPage["achievements"];
}

export default function AchievementsSection({
  content,
}: AchievementsSectionProps) {
  const { heading, subheading, backgroundImage, stats } = content;

  return (
    <section className="relative w-full overflow-hidden bg-primary text-white py-14 sm:py-20 2xl:py-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage.url} // Ensure your actual image URL or import is here
          alt="Background"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto z-10 flex flex-col items-center text-center">
        {/* Title */}
        <Heading variant="section" className="text-white mb-4">
          {heading}
        </Heading>
        <p className="text-sm sm:text-base mb-12 text-white max-w-3xl">
          {subheading}
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
