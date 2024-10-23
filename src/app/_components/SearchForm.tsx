"use client";

import { SearchIcon } from "lucide-react";

export default function SearchForm() {
  return (
    <form className="bg-white rounded-xl shadow-lg flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 overflow-hidden">
      <div className="flex-1 p-4 ">
        <label
          htmlFor="destination"
          className="block text-sm font-medium text-gray-700"
        >
          Destinations
        </label>
        <input
          id="destination"
          type="text"
          placeholder="What tour package?"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-600"
        />
      </div>
      <div className="flex-1">
        <label
          htmlFor="activity"
          className="block text-sm font-medium text-gray-700"
        >
          Activity
        </label>
        <input
          id="activity"
          type="text"
          placeholder="All Activity"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-600"
        />
      </div>
      <div className="flex-1">
        <label
          htmlFor="dates"
          className="block text-sm font-medium text-gray-700"
        >
          Dates
        </label>
        <input
          id="dates"
          type="date"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-600"
        />
      </div>
      <div className="flex-1">
        <label
          htmlFor="guests"
          className="block text-sm font-medium text-gray-700"
        >
          Guests
        </label>
        <input
          id="guests"
          type="number"
          placeholder="2 Persons"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-600"
        />
      </div>
      <button
        type="submit"
        className="bg-eucalyptus-600 text-white px-6 py-2  shadow hover:bg-eucalyptus-700 transition h-full flex flex-col justify-center space-y-2 items-center"
      >
        <SearchIcon className="h-4 aspect-square" />
        <p className="font-semibold">Search now</p>
      </button>
    </form>
  );
}
