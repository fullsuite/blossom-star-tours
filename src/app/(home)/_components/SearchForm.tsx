"use client";

import { SearchIcon, MapPin, Plane, CalendarDays, UsersRound } from "lucide-react";

export default function SearchForm() {
  return (
    <form className="bg-white rounded-xl shadow-lg flex flex-col lg:flex-row items-center space-y-0 overflow-hidden">
    <div className="py-6 px-6 lg:py-4 flex flex-col lg:flex-row items-center gap-5 flex-1">
      <div className="flex-1 w-full">
        <div className="flex gap-1">
          <MapPin width={16} height={16} strokeWidth={1.5} color="#ED768B"/>
          <label
            htmlFor="destination"
            className="block text-sm font-bold text-gray-600"
          >
            Destinations
          </label>
        </div>
        
        <input
          id="destination"
          type="text"
          placeholder="What tour package?"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-600"
        />
      </div>
      <div className="flex-1 w-full">
        <div className="flex gap-1">
          <Plane width={16} height={16} strokeWidth={1.5} color="#ED768B"/>
          <label
            htmlFor="activity"
            className="block text-sm font-bold text-gray-600"
          >
            Activity
          </label>
        </div>

        <input
          id="activity"
          type="text"
          placeholder="All Activity"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-600"
        />
      </div>
      <div className="flex-1 w-full">
      <div className="flex gap-1">
        <CalendarDays width={16} height={16} strokeWidth={1.5} color="#ED768B"/>
        <label
          htmlFor="dates"
          className="block text-sm font-bold text-gray-600"
        >
           Dates
        </label>
      </div>
        <input
          id="dates"
          type="date"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-600 text-gray-500"
        />
      </div>
      <div className="flex-1 w-full">
        <div className="flex gap-1">
          <UsersRound width={16} height={16} strokeWidth={1.5} color="#ED768B"/>
          <label
            htmlFor="guests"
            className="block text-sm font-bold text-gray-600"
          >
            Guests
          </label>
        </div>
        <input
            id="guests"
            type="number"
            placeholder="2 Persons"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-600"
          />
      </div>
    </div>
    <button
      type="submit"
      className="bg-eucalyptus-600 text-white px-6 py-4 lg:py-2 shadow hover:bg-eucalyptus-700 transition h-full flex flex-col justify-center space-y-2 items-center w-full lg:w-auto"
    >
      <SearchIcon className="h-4 aspect-square" />
      <p className="font-semibold">Search now</p>
    </button>
  </form>
  );
}
