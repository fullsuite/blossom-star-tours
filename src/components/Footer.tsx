import { MailIcon, PhoneIcon, FacebookIcon, InstagramIcon } from "lucide-react";
import React from "react";
import Image from 'next/image'

// import logoFooter from '@/assets/Logo-Footer.png';
import footerPayments from '@/assets/Footer_Payments.jpg';

// Reusable footer section component
interface FooterSectionProps {
  title: string;
  items: {
    name: string;
    href?: string;
    type?: string;
    icon?: React.ReactNode;
  }[];
  isContactInfo?: boolean;
}

const FooterSection: React.FC<FooterSectionProps> = ({
  title,
  items,
  isContactInfo = false,
}) => {
  return (
    <div>
      <p className="font-bold text-primary mb-6 mt-4">{title}</p>
      <ul className="flex flex-col space-y-3">
        {items.map((item) => (
          <li key={item.name} className="flex items-center space-x-2">
            {/* If it's a contact info section, just show the text with optional icon */}
            {isContactInfo && item.icon}
            {item.href ? (
              <a href={item.href} className="text-sm text-body-secondary hover:text-primary">
                {item.name}
              </a>
            ) : item.type === "tel" ? (
                <a href={`tel:${item.name}`} className="text-sm text-body-secondary hover:text-primary">
                  {item.name}
                </a>
            ) : item.type === "email" ? (
                <a href={`mailto:${item.name}`} className="text-sm text-body-secondary hover:text-primary">
                  {item.name}
                </a>
            ) : (
              <p className="text-sm text-body-secondary">{item.name}</p> // For non-link items (like address)
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const navigation = {
  support: [
    { name: "Customer Support", href: "#" },
    { name: "Privacy & Policy", href: "#" },
    { name: "Contact Channels", href: "#" },
  ],
  aboutUs: [
    { name: "Our Story", href: "#" },
    { name: "Travel Blog & Tips", href: "#" },
    { name: "Working With Us", href: "#" },
    { name: "Be Our Partner", href: "#" },
  ],
  contactInfo: [
    {
      name: "455 West Orchard Street, Kings Mountain, NC 280867"
    },
    {
      name: "+088 (006) 992-99-10",
      type: "tel",
      icon: <PhoneIcon className="h-4 w-4 text-eucalyptus-500" />,
    },
    {
      name: "example@gmail.com",
      type: "email",
      icon: <MailIcon className="h-4 w-4 text-eucalyptus-500" />,
    },
  ],
  social: [
    { name: "Facebook", href: "#", icon: <FacebookIcon className="h-5 w-5 text-current"/> },
    { name: "Instagram", href: "#", icon: <InstagramIcon className="h-5 w-5 text-current"/> },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full pt-10 lg:pt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:gap-12 xl:gap-16 text-neutral-500 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5  overflow-x-hidden pb-20 border-b border-wild-sand-50">
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-3 md:col-span-3 lg:col-span-2 text-center lg:text-left">
            <p className="font-bold text-2xl tracking-[-1%] text-wild-sand-600 pb-2 md:pb-4 lg:pb-6">Blossom Star</p>
            <p className="text-sm leading-6 text-body-secondary mx-auto lg:mx-0 md:max-w-[28rem] lg:max-w-[18rem]">There are many variations of lorem ipsum available but it is the majority of suffered that alteration in that some dummy text.</p>
            {/* Social Icons */}
            <div className="w-full flex gap-x-4 mt-4 md:mt-6 lg:mt-8 justify-center lg:justify-start">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-body-secondary transition linear duration-200 hover:text-primary"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          {/* Support Links */}
          <FooterSection title="Support" items={navigation.support} />
          {/* About Us Links */}
          <FooterSection title="About Us" items={navigation.aboutUs} />
          {/* Contact Info */}
          <FooterSection
            title="Contact Info"
            items={navigation.contactInfo}
            isContactInfo={true} // Custom behavior for contact info section
          />
        </div>
        <div className="w-full py-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 justify-between items-center">
          <p className="text-sm text-body-light">© All Rights Reserved.</p>
          <Image src={footerPayments} alt="payment method icons" width={376} height={55} className="aspect-[376/55] object-contain w-auto h-10 xl:h-11 2xl:h-[3.4375rem] pointer-events-none" />
        </div>
      </div>
    </footer>
  );
}
