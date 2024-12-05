// Server Component
import React from "react";
import { fetchTourPackages } from "@/sanity/lib/client";
import PackagesPage from "./_components/page";

export default async function PackagesServerComponent() {
  const data = await fetchTourPackages();

  return <PackagesPage tourPackages={data} />;
}
