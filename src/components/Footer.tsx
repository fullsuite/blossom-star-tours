import { MailIcon, PhoneIcon } from "lucide-react";
import React from "react";

// Reusable footer section component
interface FooterSectionProps {
  title: string;
  items: {
    name: string;
    href?: string;
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
      <h3 className="text-lg font-semibold text-eucalyptus-500 mb-4">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.name} className="flex items-center space-x-2">
            {/* If it's a contact info section, just show the text with optional icon */}
            {isContactInfo && item.icon}
            {item.href ? (
              <a href={item.href} className="text-sm hover:text-gray-400">
                {item.name}
              </a>
            ) : (
              <p className="text-sm">{item.name}</p> // For non-link items (like address)
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
      name: "455 West Orchard Street, Kings Mountain, NC 280867",
    },
    {
      name: "+088 (006) 992-99-10",
      icon: <PhoneIcon className="h-4 w-4 text-eucalyptus-500" />,
    },
    {
      name: "example@gmail.com",
      icon: <MailIcon className="h-4 w-4 text-eucalyptus-500" />,
    },
  ],
  social: [
    { name: "Twitter", href: "#", icon: <svg></svg> },
    { name: "Facebook", href: "#", icon: <svg></svg> },
    { name: "Instagram", href: "#", icon: <svg></svg> },
    { name: "Pinterest", href: "#", icon: <svg></svg> },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-neutral-50 py-10">
      <div className="container mx-auto grid grid-cols-1 gap-16 text-neutral-500 sm:grid-cols-4">
        {/* Company Info */}
        <div>
          <img
            alt="Blossom Star"
            src="https://picsum.photos/200/50" // Use Picsum for logo
            className="mb-4 h-auto"
          />
          <p className="text-sm leading-6">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-neutral-600 hover:text-neutral-400"
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
    </footer>
  );
}
