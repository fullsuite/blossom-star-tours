"use client";
import { useState } from "react"
import { format } from "date-fns"
import { SearchIcon, MapPin, Plane, CalendarDays, UsersRound } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";


export default function SearchForm() {
  const [dates, setDates] = useState<Date>();
  return (
    <form className="bg-white rounded-xl shadow-lg flex flex-1 flex-col lg:flex-row items-stretch lg:items-center space-y-0 overflow-hidden">
    <div className="py-6 px-6 lg:py-4 flex flex-col lg:flex-row items-center gap-5 flex-1">
      <div className="flex-1 w-full flex flex-col gap-y-1">
        <div className="flex gap-1">
          <MapPin width={16} height={16} strokeWidth={1.5} className="text-accent-pink"/>
          <label
            htmlFor="destination"
            className="block text-sm font-bold text-body"
          >
            Destinations
          </label>
        </div>  
        <input
          id="destination"
          type="text"
          placeholder="What tour package?"
          className="block w-full p-0 py-2 !border-none text-body text-sm placeholder:text-body-light rounded-md focus:outline-none"
        />
      </div>
      <div className="flex-1 w-full flex flex-col gap-y-1">
        <div className="flex gap-1">
          <Plane width={16} height={16} strokeWidth={1.5} className="text-accent-pink"/>
          <label
            htmlFor="activity"
            className="block text-sm font-bold text-body"
          >
            Activity
          </label>
        </div>

        <input
          id="activity"
          type="text"
          placeholder="All Activity"
          className="block w-full p-0 py-2 !border-none text-body text-sm placeholder:text-body-light rounded-md focus:outline-none"
        />
      </div>
      <div className="flex-1 w-full flex flex-col gap-y-1">
      <div className="flex gap-1">
        <CalendarDays width={16} height={16} strokeWidth={1.5} className="text-accent-pink"/>
        <label
          htmlFor="dates"
          className="block text-sm font-bold text-body"
        >
           Dates
        </label>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button className={`w-full !bg-transparent !border-none !shadow-none !p-0 !py-2 h-auto items-center justify-start text-sm ${!dates ? "text-body-light" : "text-body"}`}>
            {dates ? (
            format(dates, "dd-MM-yyyy")
            ) : (
              <>DD-MM-YYYY</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dates}
            onSelect={setDates}
            disabled={(date) =>
              date < new Date()
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      </div>
      <div className="flex-1 w-full flex flex-col gap-y-1">
        <div className="flex gap-1">
          <UsersRound width={16} height={16} strokeWidth={1.5} className="text-accent-pink"/>
          <label
            htmlFor="guests"
            className="block text-sm font-bold text-body"
          >
            Guests
          </label>
        </div>
        <input
            id="guests"
            type="number"
            placeholder="2 Persons"
            className="block w-full p-0 py-2 !border-none text-body text-sm placeholder:text-body-light rounded-md focus:outline-none"
          />
      </div>
    </div>
    <button
      type="submit"
      className="bg-eucalyptus-600 text-white px-6 py-4 lg:px-12 lg:py-4 shadow hover:bg-eucalyptus-700 transition h-full flex flex-col justify-center space-y-2 items-center w-full lg:w-auto"
    >
      <SearchIcon className="h-4 aspect-square" />
      <p className="text-base tracking-tight font-bold">Search now</p>
    </button>
  </form>
  );
}
