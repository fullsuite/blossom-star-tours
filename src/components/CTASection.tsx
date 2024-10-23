"use client";

import DiscoverCard from "@/components/DiscoverCard";
import SubscribeCard from "@/components/SubscribeCard";

export default function CTASection() {
  return (
    <section className="py-10 lg:py-12">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DiscoverCard />
        <SubscribeCard />
      </div>
    </section>
  );
}
