// src/app/contact/page.tsx

import PageHeader from "@/components/PageHeader";
import { ContactUsPage } from "@/lib/types/page/contactUsPage";
import { fetchContactPageData } from "@/sanity/lib/client";
import ContactSection from "./_components/ContactSection";
import CTASection from "@/components/CTASection";

export default async function ContactPage() {
  const data: ContactUsPage | null = await fetchContactPageData();

  if (!data) {
    return <div>Failed to load data.</div>;
  }

  const contactSection = {
    heading: "We are here for you. Get in Touch.",
    subheading: "Whether you have questions about our tours, need assistance with booking, or simply want to learn more, our team is ready to help.",
    location: "Dhul Hulaifah, Medina",
    email: "tours@blossomstar.com",
    contacts: [
      {
        value: "0444 555 666"
      },
      {
        value: "0423 578 889"
      },
    ],
    whatsapp: {
      label: "Whatsapp (24/7)",
      number: "0423 578 889",
      buttonText: "Chat With Us"
    },
    hours: "7am - 11pm ET | 4am - 8pm PT"
  }

  const contactForm = {
    heading: "Leave A Reply",
    description: "Your email address will not be published. Required fields are marked *",
    successMessage: "Message sent successfully."
  }


  return (
    <>
      <PageHeader title="Contact Us" />
      <ContactSection content={contactSection} form={contactForm} />
      <CTASection />
    </>
  );
}
