// src/types/contactUsPage.ts

import { PageHeader } from "@/lib/types/common/pageHeader";

export interface ContactUsPage {
    pageHeader: PageHeader;
    contactSection: {
      heading: string;
      subheading: string;
      location: string;
      email: string;
      contacts: {
        icon?: string;
        label?: string;
        value: string;
      }[];
      whatsapp: {
        label: string;
        number: string;
        buttonText: string;
      };
      hours: string;
    };
    contactForm: {
      heading: string;
      description: string;
      successMessage: string;
    };
  }