// src/app/contact/page.tsx

import PageHeader from "@/components/PageHeader";
import { ContactUsPage } from "@/lib/types/page/contactUsPage";
import { fetchContactPageData } from "@/sanity/lib/client";

export default async function ContactPage() {
  const data: ContactUsPage | null = await fetchContactPageData();

  console.log(data);

  if (!data) {
    return <div>Failed to load data.</div>;
  }

  return (
    <div className="">
      <PageHeader title="Contact Us" />
      <div></div>
    </div>
  );
}
