import { supabase } from './supabaseClient';
import { addDays, endOfMonth, isAfter, startOfMonth } from 'date-fns';

interface Booking {
  date: string;
  participants: number;
}

export const bookingClient = {
  // Fetch all available dates with remaining capacity (capacity is guide-based, not tour-based)
  async getAvailableDates(currentDate: Date) {
    const { data: bookingsData, error } = await supabase
      .from('bookings')
      .select('date, participants')
      .order('date', { ascending: true });
  
    if (error) {
      console.log('Error fetching bookings:', error);
      throw new Error('Error fetching bookings');
    }
  
    const totalGuides = 2; // Total number of guides
    const guideCapacity = 50; // Each guide can take 50 participants
  
    // Create an availability map where each day of the current month is accounted for
    const availabilityMap: Record<string, number> = {};
    const currentMonthStart = startOfMonth(currentDate);
    const currentMonthEnd = endOfMonth(currentDate);
  
    // Populate every day of the current month with full capacity
    for (let day = currentMonthStart; !isAfter(day, currentMonthEnd); day = addDays(day, 1)) {
      if (isAfter(day, currentDate)) {
        const formattedDate = day.toISOString().split('T')[0]; // format date as YYYY-MM-DD
        availabilityMap[formattedDate] = totalGuides * guideCapacity; // Start with full guide capacity for each day
      }
    }
  
    // Aggregate bookings data and calculate remaining spots per day
    bookingsData.forEach((booking: Booking) => {
      const bookingDate = new Date(booking.date).toISOString().split('T')[0]; // Use only the date part
      const participants = booking.participants;
  
      // Calculate how many guides this booking requires
      const guidesNeeded = Math.ceil(participants / guideCapacity); // Round up to the nearest whole guide
  
      // Calculate the capacity this booking will take up
      const capacityTaken = guidesNeeded * guideCapacity;
  
      // Update the availability map by reducing the capacity for that day
      if (availabilityMap[bookingDate] !== undefined) {
        availabilityMap[bookingDate] -= capacityTaken;
  
        // Ensure no negative spots left
        if (availabilityMap[bookingDate] < 0) {
          availabilityMap[bookingDate] = 0;
        }
      }
    });
  
    // Convert the availability map to an array for easier handling in the UI
    const availability = Object.entries(availabilityMap).map(([date, spotsLeft]) => ({
      date,
      spotsLeft,
    }));
  
    console.log(availability);
  
    return availability;
  },

  // Create a new booking (total capacity is based on all bookings for the day)
  async createBooking(tourSlug: string, date: string, participants: number) {
    // Step 1: Fetch tour_id based on the slug
    const { data: tour, error: tourError } = await supabase
      .from('tours')
      .select('id')
      .eq('slug', tourSlug)
      .single(); // Ensure a single tour is fetched

    if (tourError || !tour) {
        console.log(tourError);
        
      throw new Error('Tour not found');
    }

    const tourId = tour.id; // Use the fetched tour_id

    console.log(date);
    
    // Step 2: Check availability for the specific tour and date
    const availability = await this.checkAvailability(tourId, date, participants);

    if (!availability.available) {
      throw new Error(availability.message);
    }

    // return
    // Step 3: Insert the booking into the 'bookings' table using tour_id
    const { data, error } = await supabase.from('bookings').insert([
      {
        tour_id: tourId, // Associate the booking with the correct tour ID
        participants,    // Number of participants for the booking
        date,            // The date of the tour (ensure this is an ISO string)
      },
    ]);

    if (error) {
      throw new Error('Error creating booking');
    }

    return data;
  },

  // Fetch all tours from the CMS (or Supabase)
  async getTours() {
    const { data: tours, error } = await supabase.from('tours').select('*');

    if (error) {
      throw new Error('Error fetching tours');
    }

    return tours;
  },

  // Check availability for a specific date, based on total bookings for that day
  async checkAvailability(tourId: string, date: string, participants: number) {
    const totalGuides = 2; // You can fetch this from a guide table if needed
    const maxCapacity = totalGuides * 50;

    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('participants')
      .eq('tour_id', tourId)
      .eq('date', date);

      console.log("Tour ID", tourId);
      
    if (error) {
        console.log(error);
        
      throw new Error('Error fetching bookings');
    }

    const currentParticipants = bookings.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (sum: number, booking: any) => sum + booking.participants,
      0
    );

    if (currentParticipants + participants > maxCapacity) {
      return {
        available: false,
        message: `Only ${maxCapacity - currentParticipants} spots left on ${date}`,
      };
    }

    return { available: true };
  },

  // Fetch available guides for capacity calculation
  async getGuides() {
    const { data: guides, error } = await supabase.from('guides').select('*');

    if (error) {
      throw new Error('Error fetching guides');
    }

    return guides;
  },
};