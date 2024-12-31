// src/app/home/page.tsx

import QuoteBlock from "@/components/QuoteBlock";
import CTASection from "@/components/CTASection";
import ExperienceShowcase from "@/app/(home)/_components/ExperiencesShowcase";
import ExperienceSection from "@/app/(home)/_components/ExperienceSection";
import TestimonialSection from "@/app/(home)/_components/Testimonials";
import Hero from "@/app/(home)/_components/Hero";
import FeaturedPackages from "@/app/(home)/_components/FeaturedPackages";
import Achievements from "@/app/(home)/_components/Achievements";
import { HomePage as HomePageData } from "@/lib/types/page/homePage";
import { fetchHomePageData } from "@/sanity/lib/client";

export default async function HomePage() {
  const data: HomePageData | null = await fetchHomePageData();

  if (!data) {
    return <div>Failed to load data.</div>;
  }

  console.log(data.featuredPackages.packages[0].groups);

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
