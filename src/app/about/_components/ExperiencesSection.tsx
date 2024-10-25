import { Heading } from "@/components/ui/heading";
import Image from "next/image";

export default function ExperiencesSection() {
  return (
    <section className="relative container mx-auto pb-80 mb-0 md:mb-20 lg:mb-0 sm:pb-44 py-14 sm:py-20 2xl:py-36 grid grid-cols-1 lg:grid-cols-2 gap-52 xs:gap-60 sm:gap-0 lg:gap-14 xl:gap-16 2xl:gap-32 3xl:gap-48 items-center z-[1]">
      {/* Left side: Text and Progress Bars */}
      <div className="relative flex flex-col w-full z-20">
        {/* Title */}
        <Heading variant="section" className="text-primary mb-5 sm:mb-8">
          Our Experiences to Offer You
        </Heading>

        {/* Paragraph */}
        <p className="mb-3 sm:mb-6 text-wild-sand-600 text-sm sm:text-base">
          At Blossom Stars Ultimate Tours, we offer a variety of enriching
          experiences designed to cater to your spiritual and cultural
          interests. Our tours are meticulously planned to ensure that you gain
          the most from each journey, whether it’s a deep dive into Islamic
          history or a unique cultural adventure.
        </p>

        <p className="mb-6 sm:mb-10 text-wild-sand-600 text-sm sm:text-base">
          Our commitment is to provide experiences that not only meet your
          expectations but exceed them, leaving you with cherished memories and
          a renewed sense of faith.
        </p>

        {/* Progress Bars */}
        <div className="space-y-6 w-full sm:w-1/2 sm:self-end lg:w-full">
          <div>
            <div className="flex justify-between text-wild-sand-600 text-sm sm:text-base ">
              <span>Islamic Experience</span>
              <span>78%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
              <div
                className="bg-primary h-3 rounded-full"
                style={{ width: "78%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-wild-sand-600 text-sm sm:text-base ">
              <span>Unique Experience</span>
              <span>92%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
              <div
                className="bg-primary h-3 rounded-full"
                style={{ width: "92%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-wild-sand-600 text-sm sm:text-base">
              <span>Another Experience</span>
              <span>62%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
              <div
                className="bg-primary h-3 rounded-full"
                style={{ width: "62%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Overlapping images */}
      <div className="relative h-full w-full xs:w-11/12 2xs:w-9/12 sm:w-1/2 md:w-5/12 lg:w-full mx-auto sm:mx-0 sm:mr-0 z-10">
        {/* Top Image */}
        <div className="absolute right-0 sm:right-6 md:right-0 sm:-top-10 lg:top-14 xl:top-0 z-10 mb-6 aspect-[1/1] w-2/3">
          <Image
            src="https://picsum.photos/400/400?random=1"
            alt="Experience Image 1"
            layout="fill" // Ensures the image fills its container
            objectFit="cover" // Maintains aspect ratio while covering the area
            className="rounded-2xl shadow-md"
          />
        </div>

        {/* Bottom Image (Overlapping) */}
        <div className="absolute left-0 -bottom-20 sm:-bottom-8 md:-bottom-10 xl:-bottom-16 z-0 aspect-[1/1] w-2/3">
          <Image
            src="https://picsum.photos/300/400?random=2"
            alt="Experience Image 2"
            layout="fill" // Ensures the image fills its container
            objectFit="cover" // Maintains aspect ratio while covering the area
            className="rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
