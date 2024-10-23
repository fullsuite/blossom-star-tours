// src/app/home/page.tsx

import QuoteBlock from "@/components/QuoteBlock";
import CTASection from "@/components/CTASection";
import ExperienceShowcase from "./_components/ExperiencesShowcase";
import ExperienceSection from "./_components/ExperienceSection";
import TestimonialSection from "./_components/Testimonials";
import Hero from "./_components/Hero";
import FeaturedPackages from "./_components/FeaturedPackages";
import Achievements from "./_components/Achievements";

export default function HomePage() {
  const quote = {
    content:
      "Knowledge doesn’t come to you, but <strong>you have to go to it.</strong>",
    author: "Imam Malik",
  };

  return (
    <div>
      <Hero />
      <QuoteBlock quote={quote} />
      <FeaturedPackages />
      <Achievements />
      <CTASection />
      <ExperienceShowcase />
      <ExperienceSection />
      <TestimonialSection />
      <QuoteBlock quote={quote} />
    </div>
  );
}
