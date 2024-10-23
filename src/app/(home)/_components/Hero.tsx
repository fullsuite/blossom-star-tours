"use client";

import SearchForm from "./SearchForm";

export default function Hero() {
  return (
    <section className="bg-gray-100 py-10 lg:py-20 overflow-hidden h-[70vh] flex items-center">
      <div className="container relative">
        {/* Div 1 - Text and Search Form */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Column 1: Text */}
          <div className="lg:col-span-1 flex flex-col justify-center">
            <button className="bg-white px-4 py-2 rounded-full text-sm mb-4 shadow-md text-eucalyptus-600 font-bold w-fit mb-8">
              Book a Tour Now
            </button>
            <h1 className="text-4xl lg:text-5xl font-bold text-eucalyptus-600 leading-tight mb-6">
              Embark on a Journey of Faith, Experience, and Discovery.
            </h1>
            <p className="text-lg text-gray-600 mb-8 w-3/4 font-medium">
              Our expertly crafted tours are designed to provide meaningful
              experiences, combining spiritual reflection with rich cultural
              exploration.
            </p>
          </div>

          {/* Row 2 - Full width search form */}
          <div className="lg:col-span-2 pb-20 max-w-4xl flex justify-center">
            <SearchForm />
          </div>
        </div>

        {/* Div 2 - Background Image */}
        <div className="absolute inset-0 w-full grid grid-cols-1 lg:grid-cols-2">
          {/* Empty column for layout */}
          <div></div>

          {/* Image in the second column */}
          <div className="relative">
            <img
              src="https://picsum.photos/200/300" // Replace with the actual image path
              alt="Tour"
              className="h-full aspect-[3/4] absolute inset-0 object-cover rounded-xl mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
