"use client";

import Image from "next/image";
import { MapPin, PhoneCall, Mail, MessagesSquare } from "lucide-react";
import { ContactUsPage } from "@/lib/types/page/contactUsPage";
import IconWhatsapp from "@/assets/Icons/whatsapp.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ContactSectionProps {
  content: ContactUsPage["contactSection"];
  form: ContactUsPage["contactForm"];
}

export default function ContactSection( props: ContactSectionProps ) {
  const { content, form } = props;
  return (
    <section className="relative py-10 lg:py-20">
      <div className="container mx-auto relative flex flex-col items-stretch gap-20">

        {/* Contact - Header */}
        <div className="flex flex-col items-center justify-center text-center gap-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-primary z-10 w-auto lg:w-max mx-auto">{content.heading}</h2>
          <p className="text-sm md:text-base text-body-secondary max-w-lg">{content.subheading}</p>
        </div>

        {/* Contact - Content Wrapper */}
        <div className="grid grid-cols-[max-content_1fr] gap-12">
          {/* Contact - Content */}
          <div className="flex flex-col gap-8 bg-gray-100 w-96 h-auto p-6 rounded-xl">
            {/* Contact - Content - Location */}
            <div className="flex flex-row items-center gap-6">
              <div className="flex items-center justify-center p-4 bg-primary rounded-xl">
                <MapPin strokeWidth={1.5} className="w-10 h-10 text-white"  />
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-bold text-body-secondary">Location:</p>
                <p className="text-body-secondary">{content.location}</p>
              </div>
            </div>
            {/* Contact - Content - Phone */}
            <div className="flex flex-row items-center gap-6">
              <div className="flex items-center justify-center p-4 bg-primary rounded-xl">
                <PhoneCall strokeWidth={1.5} className="w-10 h-10 text-white"  />
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-bold text-body-secondary">Phone:</p>
                {content.contacts.map( ( contact, index ) => (
                <p className="text-body-secondary" key={index}>{contact.value}</p>                  
                ))}
              </div>
            </div>
            {/* Contact - Content - Email */}
            <div className="flex flex-row items-center gap-6">
              <div className="flex items-center justify-center p-4 bg-primary rounded-xl">
                <Mail strokeWidth={1.5} className="w-10 h-10 text-white"  />
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-bold text-body-secondary">Email:</p>
                <p className="text-body-secondary">{content.email}</p>
              </div>
            </div>
            {/* Contact - Content - Whatsapp */}
            <div className="border border-gray-300 p-6 my-4 rounded-xl flex flex-col items-stretch gap-4">
              {/* Contact - Content - Whatsapp - Header */}
              <div className="flex flex-row items-center gap-4">
                <div className="p-3 flex items-center justify-center bg-primary rounded-full">
                  <Image
                    src={IconWhatsapp}
                    alt="icon whatsapp"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl font-bold text-body-secondary">Emergency Contact</p>
                  <p className="text-lg text-body-secondary font-semibold">{content.whatsapp.label}</p>
                  <p className="text-lg text-body-secondary">{content.whatsapp.number}</p>
                </div>
              </div>
              {/* Contact - Content - Whatsapp - Divider */}
              <div className="h-[1px] w-full bg-gray-300"></div>
              {/* Contact - Content - Whatsapp - Button */}
              <Link href={`https://wa.me/${content.whatsapp.number}`} passHref target="_blank">
                <Button variant="outline_accent" className="w-full py-4 border-2 text-lg font-bold h-auto">
                  <MessagesSquare className="!w-6 !h-6 text-accent-pink" />
                  {content.whatsapp.buttonText}
                </Button>
              </Link>
              {/* Contact - Content - Whatsapp - Footer */}
              <div className="flex flex-col gap-1">
                <p className="text-base text-body-secondary">Mondays - Sundays</p>
                <p className="text-base text-body">{content.hours}</p>
              </div>
            </div>
          </div>

          {/* Contact - Form */}
          <div className="flex flex-col gap-8">
            {/* Contact - Form - Header */}
            <div className="flex flex-col gap-4 pt-10">
              <p className="text-2xl font-bold text-body-secondary">{form.heading}</p>
              <p className="text-sm md:text-base text-body-secondary">{form.description}</p>
            </div>
            {/* Contact - Form - Form */}
            <form className="flex flex-col gap-6">
              <div className="flex flex-row gap-6">
                <input type="text" name="name" id="name" placeholder="Name *" className="p-4 flex-1 rounded-lg border border-gray-300 placeholder:text-gray-300 focus:outline-none text-body h-auto" required />
                <input type="email" name="email" id="email" placeholder="Email *" className="p-4 flex-1 rounded-lg border border-gray-300 placeholder:text-gray-300 focus:outline-none text-body h-auto" required />
              </div>
              <input type="text" name="subject" id="subject" placeholder="Subject" className="p-4 rounded-lg border border-gray-300 placeholder:text-gray-300 focus:outline-none text-body h-auto" />
              <textarea name="comment" id="comment" placeholder="Comment" className="p-4 rounded-lg border border-gray-300 placeholder:text-gray-300 focus:outline-none text-body h-auto" rows={5}></textarea>
              <button type="submit" name="submit" id="submit" className="bg-primary text-white shadow hover:bg-eucalyptus-700 w-max px-8 py-3 rounded">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
