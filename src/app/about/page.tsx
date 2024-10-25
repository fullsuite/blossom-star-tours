// src/app/about/page.tsx

import PageHeader from "@/components/PageHeader";
import DiscoverMoreSection from "./_components/DiscoverMoreSection";
import AchievementsSection from "./_components/AchievmentsSection";
import ExperiencesSection from "./_components/ExperiencesSection";

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About Blossom Stars" />
      <div>
        <DiscoverMoreSection />
        <AchievementsSection />
        <ExperiencesSection />
      </div>
    </>
  );
}
