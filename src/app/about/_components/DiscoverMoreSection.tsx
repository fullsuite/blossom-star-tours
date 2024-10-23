import { Heading } from "@/components/ui/heading";
import { Paragraph } from "@/components/ui/paragraph";
import { ShieldCheckIcon } from "lucide-react";
import Image from "next/image";

export default function DiscoverMoreSection() {
  return (
    <section className="relative bg-gray-50 py-16">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column (Text Section) */}
        <div className="flex flex-col justify-center">
          <p className="text-sm text-gray-500 mb-2">
            Welcome to Blossom Stars Ultimate Tours
          </p>
          <Heading variant="section">Discover More of Who We Are</Heading>
          <Paragraph className=" mb-6 mt-6">
            At Blossom Stars Ultimate Tours, we are dedicated to providing
            exceptional travel experiences that blend spiritual fulfillment with
            rich cultural insights. Our mission is to guide you through
            meaningful journeys that resonate with your faith and curiosity.
          </Paragraph>
          <Paragraph className="">
            Our team of experienced professionals is committed to delivering
            personalized services that cater to your unique needs and
            preferences. We take pride in our attention to detail, ensuring that
            every aspect of your journey is thoughtfully planned and executed.
          </Paragraph>
        </div>

        {/* Right Column (Image with Overlapping Card) */}
        <div className="relative">
          {/* Image */}
          <Image
            src="https://picsum.photos/500/600" // Replace with your image source
            alt="Tour"
            width={500}
            height={600}
            className="rounded-xl object-cover w-2/3 ml-auto"
          />
          {/* Overlapping Info Card */}
          <div className="absolute top-20 left-10 bg-neutral-100 p-8 rounded-xl max-w-xs">
            <div className="flex items-start">
              {/* Icon Container */}
              <div className="bg-eucalyptus-600 mr-4 rounded-full flex items-center justify-center w-16 h-16 shrink-0">
                {/* Icon */}
                <ShieldCheckIcon className="w-8 h-8 text-white" />
              </div>
              {/* Text Content */}
              <div>
                <h3 className="text-lg font-bold text-green-800">
                  Reliable & Fully Insured
                </h3>
                <p className="text-sm text-gray-600">
                  Our tours are reliable and fully insured, providing you with
                  peace of mind and a secure travel experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
