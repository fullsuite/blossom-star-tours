import { Heading } from "@/components/ui/heading";
import { Paragraph } from "@/components/ui/paragraph";
import Image from "next/image";

export default function ExperiencesSection() {
  return (
    <section className="relative container mx-auto py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Left side: Text and Progress Bars */}
      <div>
        {/* Title */}
        <Heading variant="section" className="text-green-800 mb-6">
          Our Experiences to Offer You
        </Heading>

        {/* Paragraph */}
        <Paragraph variant="default" className="mb-6 text-gray-600">
          At Blossom Stars Ultimate Tours, we offer a variety of enriching
          experiences designed to cater to your spiritual and cultural
          interests. Our tours are meticulously planned to ensure that you gain
          the most from each journey, whether it’s a deep dive into Islamic
          history or a unique cultural adventure.
        </Paragraph>

        <Paragraph variant="default" className="mb-10 text-gray-600">
          Our commitment is to provide experiences that not only meet your
          expectations but exceed them, leaving you with cherished memories and
          a renewed sense of faith.
        </Paragraph>

        {/* Progress Bars */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between">
              <span>Islamic Experience</span>
              <span>78%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
              <div
                className="bg-eucalyptus-600 h-3 rounded-full"
                style={{ width: "78%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <span>Unique Experience</span>
              <span>92%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
              <div
                className="bg-eucalyptus-600 h-3 rounded-full"
                style={{ width: "92%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <span>Another Experience</span>
              <span>62%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
              <div
                className="bg-eucalyptus-600 h-3 rounded-full"
                style={{ width: "62%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Overlapping images */}
      <div className="relative h-full ">
        {/* Top Image */}
        <div className="absolute right-0 z-10 mb-6 aspect-[1/1] w-2/3 ">
          <Image
            src="https://picsum.photos/400/400?random=1"
            alt="Experience Image 1"
            layout="fill" // Ensures the image fills its container
            objectFit="cover" // Maintains aspect ratio while covering the area
            className="rounded-2xl shadow-md"
          />
        </div>

        {/* Bottom Image (Overlapping) */}
        <div className="absolute left-0 bottom-0 z-0 aspect-[1/1] w-2/3 ">
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
