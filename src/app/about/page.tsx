// src/app/about/page.tsx

import PageHeader from "@/components/PageHeader";
import DiscoverMoreSection from "@/app/about/_components/DiscoverMoreSection";
import AchievementsSection from "@/app/about/_components/AchievmentsSection";
import ExperiencesSection from "@/app/about/_components/ExperiencesSection";
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
