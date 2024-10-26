import { Heading } from "@/components/ui/heading";
import Image from "next/image";
import PortableTextBlock from "@/components/ui/portable-text-block";
import { AboutUsPage } from "@/lib/types/page/aboutUsPage";

interface ExperiencesSectionProps {
  content: AboutUsPage["experiences"];
}

export default function ExperiencesSection({
  content,
}: ExperiencesSectionProps) {
  const { heading, body, experiencesList, images } = content;

  return (
    <section className="relative container mx-auto pb-80 mb-0 md:mb-20 lg:mb-0 sm:pb-44 py-14 sm:py-20 2xl:py-36 grid grid-cols-1 lg:grid-cols-2 gap-52 xs:gap-60 sm:gap-0 lg:gap-14 xl:gap-16 2xl:gap-32 3xl:gap-48 items-center z-[1]">
      {/* Left side: Text and Progress Bars */}
      <div className="relative flex flex-col w-full z-20">
        <Heading variant="section" className="text-primary mb-5 sm:mb-8">
          {heading}
        </Heading>

        {/* Use the standardized PortableTextComponent */}
        <PortableTextBlock value={body} className={"mb-6 sm:mb-10"} />

        {/* Progress Bars */}
        <div className="space-y-6 w-full sm:w-1/2 sm:self-end lg:w-full">
          {experiencesList.map((experience, index) => (
            <div key={index}>
              <div className="flex justify-between text-wild-sand-600 text-sm sm:text-base ">
                <span>{experience.title}</span>
                <span>{experience.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                <div
                  className="bg-primary h-3 rounded-full"
                  style={{ width: `${experience.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side: Overlapping images */}
      <div className="relative h-full w-full xs:w-11/12 2xs:w-9/12 sm:w-1/2 md:w-5/12 lg:w-full mx-auto sm:mx-0 sm:mr-0 z-10">
        {/* Top Image */}
        <div className="absolute right-0 sm:right-6 md:right-0 sm:-top-10 lg:top-14 xl:top-0 z-10 mb-6 aspect-[1/1] w-2/3">
          <Image
            src={images[0].url}
            alt="Experience Image 1"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl shadow-md"
          />
        </div>

        {/* Bottom Image (Overlapping) */}
        <div className="absolute left-0 -bottom-20 sm:-bottom-8 md:-bottom-10 xl:-bottom-16 z-0 aspect-[1/1] w-2/3">
          <Image
            src={images[1].url}
            alt="Experience Image 2"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
