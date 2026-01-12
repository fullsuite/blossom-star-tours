// src/app/(main)/about/page.tsx

import PageHeader from "@/components/PageHeader";
import DiscoverMoreSection from "./_components/DiscoverMoreSection";
import AchievementsSection from "./_components/AchievmentsSection";
import ExperiencesSection from "./_components/ExperiencesSection";
import { AboutUsPage } from "@/lib/types/page/aboutUsPage";
import { fetchAboutUsPageData } from "@/sanity/lib/client";

export default async function AboutPage() {
  const data: AboutUsPage | null = await fetchAboutUsPageData();

  if (!data) {
    return <div>Failed to load data.</div>;
  }

  const { pageHeader, introduction, achievements, experiences } = data;

  return (
    <>
      <PageHeader title={pageHeader.title} />
      <div>
        <DiscoverMoreSection content={introduction} />
        <AchievementsSection content={achievements} />
        <ExperiencesSection content={experiences} />
      </div>
    </>
  );
}
