import { MailIcon, PhoneIcon, FacebookIcon, InstagramIcon, MapPinIcon } from 'lucide-react';
import React from 'react';
import Image from 'next/image';

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
            {isContactInfo && item.icon}
            {item.href ? (
              <a
                href={item.href}
                className="text-sm text-body-secondary hover:text-primary"
              >
                {item.name}
              </a>
            ) : item.type === 'tel' ? (
              <a
                href={`tel:${item.name}`}
                className="text-sm text-body-secondary hover:text-primary"
              >
                {item.name}
              </a>
            ) : item.type === 'email' ? (
              <a
                href={`mailto:${item.name}`}
                className="text-sm text-body-secondary hover:text-primary"
              >
                {item.name}
              </a>
            ) : (
              <p className="text-sm text-body-secondary">{item.name}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const navigation = {
  explore: [
    { name: 'Tour Packages', href: '/packages' },
    { name: 'Tours & Locations', href: '/tours' },
    { name: 'Gallery', href: '/tours' },
    { name: 'About Us', href: '/about' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Privacy & Policy', href: '#' },
  ],
  contactInfo: [
    {
      name: 'Dhul Hulaifah, Medina',
      icon: <MapPinIcon className="h-4 w-4 text-eucalyptus-500 shrink-0" />,
    },
    {
      name: '0444 555 666',
      type: 'tel',
      icon: <PhoneIcon className="h-4 w-4 text-eucalyptus-500 shrink-0" />,
    },
    {
      name: '0423 578 889',
      type: 'tel',
      icon: <PhoneIcon className="h-4 w-4 text-eucalyptus-500 shrink-0" />,
    },
    {
      name: 'tours@blossomstar.com',
      type: 'email',
      icon: <MailIcon className="h-4 w-4 text-eucalyptus-500 shrink-0" />,
    },
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61585605383960',
      icon: <FacebookIcon className="h-5 w-5 text-current" />,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/blossomstartours/',
      icon: <InstagramIcon className="h-5 w-5 text-current" />,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full pt-10 lg:pt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:gap-12 xl:gap-16 text-neutral-500 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 overflow-x-hidden pb-20 border-b border-wild-sand-200">
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2 text-center lg:text-left">
            <p className="font-bold text-2xl tracking-[-1%] text-wild-sand-600 pb-2 md:pb-4 lg:pb-6">
              Blossom Star
            </p>
            <p className="text-sm leading-6 text-body-secondary mx-auto lg:mx-0 md:max-w-[28rem] lg:max-w-[18rem]">
              Discover the beauty and spirituality of Madinah with our guided
              tours. From sacred sites to desert adventures, we create
              unforgettable experiences for every traveller.
            </p>
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
          {/* Explore Links */}
          <FooterSection title="Explore" items={navigation.explore} />
          {/* Support Links */}
          <FooterSection title="Support" items={navigation.support} />
          {/* Contact Info */}
          <FooterSection
            title="Contact Info"
            items={navigation.contactInfo}
            isContactInfo={true}
          />

          {/* Emergency / WhatsApp */}
          <div>
            <p className="font-bold text-primary mb-6 mt-4">Emergency Contact</p>
            <ul className="flex flex-col space-y-4">
              <li>
                <a
                  href="https://wa.me/0423578889"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-body-secondary hover:text-primary"
                >
                  <WhatsAppIcon className="h-4 w-4 text-eucalyptus-500 shrink-0" />
                  <span>Whatsapp (24/7)</span>
                </a>
                <p className="text-sm text-body-secondary mt-1 ml-6">0423 578 889</p>
              </li>
              <li>
                <p className="text-sm font-medium text-primary">Chat With Us</p>
                <p className="text-sm text-body-secondary mt-1">Mondays - Sundays</p>
                <p className="text-sm text-body-secondary">7am - 11pm ET | 4am - 8pm PT</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full py-6 pb-16 flex flex-col sm:flex-row space-y-4 sm:space-y-0 justify-between items-center">
          <p className="text-sm text-body-light">© All Rights Reserved.</p>
          <Image
            src={footerPayments}
            alt="payment method icons"
            width={376}
            height={55}
            className="aspect-[376/55] object-contain w-auto h-8 xl:h-9 2xl:h-10 pointer-events-none"
          />
        </div>
      </div>
    </footer>
  );
}
