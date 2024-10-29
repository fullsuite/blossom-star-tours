"use client";

import { Send } from 'lucide-react';

export default function SubscribeCard() {
  return (
    <div className="bg-gray-100 p-6 sm:p-8 md:p-12 rounded-2xl flex flex-col justify-center h-full">
      <h3 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
        Don&#39;t Miss out on our Exclusive Offers
      </h3>
      <p className="text-lg text-body-secondary mb-6">
        Stay up to date with our latest information, offers, and more.
      </p>
      <form className="bg-white rounded-xl shadow-lg flex flex-row items-center gap-1 xl:gap-4 overflow-hidden max-w-xl lg:max-w-full">
        <div className="relative flex flex-row items-center justify-center gap-1 xl:gap-4 flex-1">
          <label
            htmlFor="emailAddress"
            className="hidden xs:block absolute top-0 left-4 bottom-2 my-auto w-5 h-5"
          >
            <Send strokeWidth={3} className="w-5 h-5 inline-block text-body-secondary" />
          </label> 
          <input
            id="emailAddress"
            type="email"
            placeholder="Your Email Address"
            className="block w-full pl-4 xs:pl-12 py-2 border-0 focus:outline-none focus:!shadow-none"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 xs:px-6 md:px-8 xl:px-10 py-4  shadow hover:bg-eucalyptus-700 transition h-full flex flex-col justify-center items-center"
        >
          <p className="font-semibold">Subscribe</p>
        </button>
      </form>
    </div>
  );
}
