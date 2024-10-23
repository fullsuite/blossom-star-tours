"use client";

import Image from "next/image";
import ContentBlock from "@/components/ContentBlock";

export default function ExperienceSection() {
  return (
    <section className="py-10 lg:py-20">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
        {/* Left Column - Images */}
        <div className="relative">
          {/* Top Image */}
          <div className="relative z-10 mb-6">
            <Image
              src="https://picsum.photos/400/400?random=1"
              alt="Image 1"
              width={400}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>

          {/* Bottom Image (Overlapping) */}
          <div className="absolute right-0 bottom-6 z-0 bg-red-50">
            <Image
              src="https://picsum.photos/300/400?random=2"
              alt="Image 2"
              width={400}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Right Column - Content */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-green-800 mb-6">
            Experience with Blossom Stars
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Discover the unparalleled experiences we offer at Blossom Stars. Our
            commitment to excellence and attention to detail ensures that each
            journey with us is both spiritually fulfilling and culturally
            enriching.
          </p>

          {/* Content Blocks */}
          <ContentBlock
            title="Best Islamic Guided Tour Agency"
            description="We are offering exceptional Islamic tours that combine spiritual fulfillment with cultural insights. Our dedicated team ensures every journey is enriching and memorable."
            icon="🌟"
          />
          <ContentBlock
            title="Trusted and Fully Committed Team"
            description="Our team is comprised of experienced professionals who are deeply committed to providing you with a seamless travel experience."
            icon="👍"
          />
          <ContentBlock
            title="Unique and Memorable Experience"
            description="Each of our tours is crafted to deliver a one-of-a-kind experience, ensuring that your spiritual journey is both unique and unforgettable."
            icon="✨"
          />
        </div>
      </div>
    </section>
  );
}
