// src/app/home/page.tsx

import QuoteBlock from "@/components/QuoteBlock";
import CTASection from "@/components/CTASection";
import ExperienceShowcase from "./_components/ExperiencesShowcase";
import ExperienceSection from "./_components/ExperienceSection";
import TestimonialSection from "./_components/Testimonials";
import Hero from "./_components/Hero";
import FeaturedPackages from "./_components/FeaturedPackages";
import Achievements from "./_components/Achievements";
import { HomePage as HomePageData } from "@/lib/types";
import { fetchHomePageData } from "@/sanity/lib/client";

export default async function HomePage() {
  const data: HomePageData | null = await fetchHomePageData();

  if (!data) {
    return <div>Failed to load data.</div>;
  } else {
    console.log(data);
  }

  const {
    heroSection,
    topQuoteSection,
    featuredPackages,
    achievements,
    experienceShowcase,
    experienceFeatures,
    testimonials,
    bottomQuoteSection,
  } = data;

  return (
    <>
      <Hero content={heroSection} />
      <QuoteBlock quote={topQuoteSection} />
      <FeaturedPackages content={featuredPackages} />
      <Achievements content={achievements} />
      <CTASection />
      <ExperienceShowcase content={experienceShowcase} />
      <ExperienceSection content={experienceFeatures} />
      <TestimonialSection content={testimonials} />
      <QuoteBlock quote={bottomQuoteSection} />
    </>
  );
}
