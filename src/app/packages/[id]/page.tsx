"use client";

import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar"; // Adjust the import path for your project
import { addDays, isBefore, isSameDay } from "date-fns";
import { bookingClient } from "@/client/bookingClient"; // Assuming you have this set up

export interface Package {
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  duration: string;
  slug: string;
}

export interface Availability {
  date: Date;
  spotsLeft: number;
}

const packages: Package[] = [
  {
    imageUrl: "https://picsum.photos/400/300",
    title: "Umrah and Hotel Package",
    description:
      "Experience a spiritually fulfilling Umrah journey with our comprehensive package, including premium accommodations and guided tours.",
    price: 9999,
    rating: 4.4,
    duration: "10 days",
    slug: "umrah-and-hotel-package",
  },
  {
    imageUrl: "https://picsum.photos/400/300?random=1",
    title: "Full Package",
    description:
      "Immerse yourself in the heart of Islamic history with our full package, offering a balanced mix of spiritual and cultural experiences.",
    price: 4999,
    rating: 4.4,
    duration: "4 days",
    slug: "full-package",
  },
  {
    imageUrl: "https://picsum.photos/400/300?random=2",
    title: "Extreme Tour",
    description:
      "Embark on an adventurous journey with our Extreme Tour, featuring thrilling activities that blend excitement with cultural discovery.",
    price: 4999,
    rating: 4.4,
    duration: "2 days",
    slug: "extreme-tour",
  },
];

// Mock unavailable dates for testing
const unavailableDates = [
  addDays(new Date(), 2),
  addDays(new Date(), 4),
  addDays(new Date(), 6),
];

// Package detail page component
export default function PackageDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Find the selected package based on the slug
  const selectedPackage = packages.find((pkg) => pkg.slug === params.id);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number>(1);
  const [availableDates, setAvailableDates] = useState<Availability[]>([]);
  const [isCalendarDisabled, setIsCalendarDisabled] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  // Handle case where the package is not found
  if (!selectedPackage) {
    return notFound();
  }

  // Function to check if a date is unavailable (based on state or unavailableDates)
  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some((unavailableDate) =>
      isSameDay(unavailableDate, date)
    );
  };

  // Function to handle guest count changes
  const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuests(Number(e.target.value));
    setIsCalendarDisabled(true); // Disable the calendar until availability is checked
  };

  // Function to check availability
  // const checkAvailability = async () => {
  //   setIsCheckingAvailability(true);

  //   try {
  //     // Fetch available dates for the selected package and guests
  //     const currentDate = new Date(); // Use today's date
  //     const availability = await bookingClient.getAvailableDates(currentDate);

  //     // Filter available dates that can accommodate the number of guests
  //     const available = availability
  //       .filter((day) => day.spotsLeft >= guests)
  //       .map((day) => new Date(day.date));
  //     console.log("Available returned:", available);

  //     setAvailableDates(available);
  //     setIsCalendarDisabled(false); // Enable calendar
  //   } catch (error) {
  //     console.error("Error fetching availability:", error);
  //   } finally {
  //     setIsCheckingAvailability(false);
  //   }
  // };

  const checkAvailability = async () => {
    setIsCheckingAvailability(true);

    try {
      const currentDate = new Date(); // Use today's date
      const availability: Availability[] =
        await bookingClient.getAvailableDates(currentDate);

      // Convert available dates from UTC to local time and keep track of spots
      const available = availability.map((day) => {
        const utcDate = new Date(day.date);
        const localDate = new Date(
          utcDate.getUTCFullYear(),
          utcDate.getUTCMonth(),
          utcDate.getUTCDate()
        );
        return {
          date: localDate,
          spotsLeft: day.spotsLeft,
        };
      });

      console.log("Available returned:", available);
      setAvailableDates(available); // Store available dates with spots info
      setIsCalendarDisabled(false); // Enable calendar
    } catch (error) {
      console.error("Error fetching availability:", error);
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  // Function to check if the date is disabled based on availability
  // const isDateDisabled = (date: Date) => {
  //   return (
  //     isBefore(date, new Date()) || // Disable past dates
  //     !availableDates.some((availableDate) => isSameDay(availableDate, date)) // Disable dates not in availableDates
  //   );
  // };
  const isDateDisabled = (date: Date) => {
    return (
      isBefore(date, new Date()) || // Disable past dates
      !availableDates.some(
        (availableDate) =>
          isSameDay(availableDate.date, date) && availableDate.spotsLeft > 0 // Disable if spots are 0
      )
    );
  };

  // Function to handle form submission for booking
  // const handleBooking = async (e: React.FormEvent) => {
  //   e.preventDefault(); // Prevent form submission
  //   setIsBooking(true);
  //   setBookingError(null);

  //   if (!selectedDate || guests <= 0) {
  //     setBookingError("Please select a valid date and number of guests.");
  //     setIsBooking(false);
  //     return;
  //   }

  //   try {
  //     // Call the bookingClient to create a new booking
  //     await bookingClient.createBooking(
  //       selectedPackage.slug,
  //       selectedDate.toISOString(),
  //       guests
  //     );

  //     // Handle success, maybe redirect or show a success message
  //     alert("Booking successful!");
  //   } catch (error) {
  //     console.error("Error creating booking:", error);
  //     setBookingError("Failed to create booking. Please try again.");
  //   } finally {
  //     setIsBooking(false);
  //   }
  // };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);
    setBookingError(null);

    if (!selectedDate || guests <= 0) {
      setBookingError("Please select a valid date and number of guests.");
      setIsBooking(false);
      return;
    }

    try {
      // Convert the selected date to UTC before sending it to the server
      const selectedDateUTC = new Date(
        Date.UTC(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate()
        )
      );

      // Call the bookingClient to create a new booking
      await bookingClient.createBooking(
        selectedPackage.slug,
        selectedDateUTC.toISOString(), // Pass UTC date to the server
        guests
      );

      // Handle success, maybe redirect or show a success message
      alert("Booking successful!");
    } catch (error) {
      console.error("Error creating booking:", error);
      setBookingError("Failed to create booking. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Package Details (2 Columns) */}
      <div className="lg:col-span-2">
        <h1 className="text-4xl font-bold mb-4">{selectedPackage.title}</h1>
        <img
          src={selectedPackage.imageUrl}
          alt={selectedPackage.title}
          className="w-full mb-6 rounded-lg"
        />
        <p className="text-lg leading-relaxed mb-4">
          {selectedPackage.description}
        </p>
        <p className="text-lg font-semibold">
          Duration: {selectedPackage.duration}
        </p>
        <p className="text-lg font-semibold">Price: ${selectedPackage.price}</p>
        <p className="text-lg font-semibold">
          Rating: {selectedPackage.rating} ⭐
        </p>
      </div>

      {/* Booking Form (3rd Column) */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Book Your Tour</h2>
        <form onSubmit={handleBooking}>
          {/* Number of Guests */}
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">
              Number of Guests
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={guests}
              onChange={handleGuestsChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Calendar Date Selection */}
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">
              Select Date
            </label>
            <div className={isCalendarDisabled ? "opacity-50" : ""}>
              <Calendar
                mode="single"
                selected={selectedDate ?? undefined}
                onSelect={(date) => setSelectedDate(date)}
                disabled={isDateDisabled} // Disable based on availability
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>

          {/* Check Availability Button */}
          {isCalendarDisabled && (
            <button
              type="button"
              onClick={checkAvailability}
              className="w-full px-6 py-3 bg-green-700 text-white font-bold rounded-md shadow-md hover:bg-green-800"
              disabled={isCheckingAvailability} // Disable while checking
            >
              {isCheckingAvailability ? "Checking..." : "Check Availability"}
            </button>
          )}

          {/* Book Now Button */}
          {!isCalendarDisabled && (
            <button
              type="submit"
              className="w-full mt-4 px-6 py-3 bg-eucalyptus-700 text-white font-bold rounded-md shadow-md hover:bg-eucalyptus-800"
              disabled={isBooking}
            >
              {isBooking ? "Booking..." : "Book Now"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
