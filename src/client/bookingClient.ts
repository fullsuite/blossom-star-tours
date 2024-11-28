import { verify } from 'crypto';
import { supabase } from './supabaseClient';
import {
  addDays,
  addMonths,
  endOfMonth,
  isAfter,
  startOfMonth,
} from 'date-fns';
import { stripe } from './stripeClient';

interface Booking {
  date: string;
  participants: number;
}

interface BookingWithID {
  id: string;
  date: string;
  participants: number;
}

export const bookingClient = {
  // Fetch all available dates with remaining capacity (capacity is guide-based, not tour-based)
  async getAvailableDates(
    currentDate: Date,
    tourId: string,
    guideCapacity: number
  ) {
    const { data: bookingsData, error } = await supabase
      .from('bookings')
      .select('date, participants')
      .eq('tour_id', tourId)
      .order('date', { ascending: true });

    if (error) {
      console.log('Error fetching bookings:', error);
      throw new Error('Error fetching bookings');
    }

    const totalGuides = 2; // Total number of guides
    // const guideCapacity = 50 // Each guide can take 50 participants

    // Create an availability map where each day of the current month is accounted for
    const availabilityMap: Record<string, number> = {};
    const currentMonthStart = startOfMonth(currentDate);
    const currentMonthEnd = endOfMonth(addMonths(currentDate, 1));

    // Populate every day of the current month with full capacity
    for (
      let day = currentMonthStart;
      !isAfter(day, currentMonthEnd);
      day = addDays(day, 1)
    ) {
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
    const availability = Object.entries(availabilityMap).map(
      ([date, spotsLeft]) => ({
        date,
        spotsLeft,
      })
    );

    console.log(availability);

    return availability;
  },

  // Create a new booking (total capacity is based on all bookings for the day)
  async createBooking(
    id: string,
    date: string,
    participants: number
  ): Promise<BookingWithID> {
    // Step 1: Fetch tour_id based on the slug
    // const { data: tour, error: tourError } = await supabase
    //   .from('tours')
    //   .select('id')
    //   .eq('slug', tourSlug)
    //   .single() // Ensure a single tour is fetched

    // if (tourError || !tour) {
    //   console.log(tourError)

    //   throw new Error('Tour not found')
    // }

    const tourId = id; // Use the fetched tour_id

    console.log(date);

    // Step 2: Check availability for the specific tour and date
    const availability = await this.checkAvailability(
      tourId,
      date,
      participants
    );

    if (!availability.available) {
      throw new Error(availability.message);
    }

    const input = {
      tour_id: tourId, // Associate the booking with the correct tour ID
      participants, // Number of participants for the booking
      date, // The date of the tour (ensure this is an ISO string)
    };

    // return
    // Step 3: Insert the booking into the 'bookings' table using tour_id
    const { data, error } = await supabase.from('bookings').insert(input);

    if (error) {
      throw new Error('Error creating booking');
    }

    return { ...input, id: (data as any)?.id };
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

    console.log('Tour ID', tourId);

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

  // Verify tour package
  async verifyTour(tourId: string, title: string, slug: string) {
    const { data: existingTour, error: errorTour } = await supabase
      .from('tours') // Replace 'tours' with your actual table name
      .select('*') // Replace '*' with specific columns if needed
      .eq('id', tourId) // Filter by ID
      .single();

    let productIdStripe = '';
    if (!existingTour || errorTour) {
      if (!existingTour.productIdStripe) {
        const product = await stripe.products.create({
          name: existingTour.name,
          description: existingTour.details,
        });

        productIdStripe = product.id;
        const { data, error } = await supabase
          .from('tours') // Replace 'tours' with your actual table name
          .insert({
            id: tourId,
            name: title,
            slug: slug,
            productIdStripe,
          });
      } else productIdStripe = existingTour.productIdStripe;
    } else if (existingTour.productIdStripe == null) {
      const product = await stripe.products.create({
        name: existingTour.name,
        description: existingTour.details,
      });

      productIdStripe = product.id;
      const { data, error } = await supabase
        .from('tours') // Replace 'tours' with your actual table name
        .update({ productIdStripe }) // Fields to update
        .eq('id', tourId);
    } else productIdStripe = existingTour.productIdStripe;

    const { data: tour, error: errorTour2 } = await supabase
      .from('tours') // Replace 'tours' with your actual table name
      .select('*') // Replace '*' with specific columns if needed
      .eq('id', tourId) // Filter by ID
      .single();

    return tour;
  },

  // Verify user package
  async verifyUser(email: string) {
    const { data: existingUser, error: errorUser } = await supabase
      .from('users') // Replace 'users' with your actual table name
      .select('*') // Select all columns; replace '*' with specific columns if needed
      .eq('email', email)
      .single(); // Expect exactly one matching row

    let customerIdStripe = '';
    if (!existingUser || errorUser) {
      const customer = await stripe.customers.create({
        email,
        description: `New customer with email ${email} for customer portal.`,
      });

      customerIdStripe = customer.id;
      const { data, error } = await supabase
        .from('users') // Replace 'tours' with your actual table name
        .insert({
          email: email,
          customerIdStripe,
        });
    } else if (existingUser.customerIdStripe == null) {
      const customer = await stripe.customers.create({
        email,
        description: `New customer with email ${email} for customer portal.`,
      });

      customerIdStripe = customer.id;
      const { data, error } = await supabase
        .from('users') // Replace 'tours' with your actual table name
        .update({ customerIdStripe }) // Fields to update
        .eq('email', email);
    } else customerIdStripe = existingUser.customerIdStripe;

    const { data: user, error: errorUser2 } = await supabase
      .from('users') // Replace 'tours' with your actual table name
      .select('*') // Replace '*' with specific columns if needed
      .eq('email', email) // Filter by ID
      .single();

    return user;
  },

  // Generate stripe portal
  async generateStripePortal(
    bookingId: string,
    productIdStripe: string,
    customerIdStripe: string,
    amount: number
  ) {
    // Step 1: Create a price for the product
    const price = await stripe.prices.create({
      product: productIdStripe,
      unit_amount: amount * 100, // Amount in cents
      currency: 'usd',
    });

    // Step 2: Create the invoice without auto-advancing
    const invoice = await stripe.invoices.create({
      customer: customerIdStripe,
      collection_method: 'send_invoice',
      days_until_due: 1, // Set the number of days until the invoice is due
      currency: 'usd',
      metadata: {
        bookingId, // Replace with the actual booking ID
      },
    });

    // Step 3: Create an invoice item using the price variable
    await stripe.invoiceItems.create({
      customer: customerIdStripe,
      price: price.id, // Use the price created earlier
      invoice: invoice.id,
      currency: 'usd',
    });

    // Optionally finalize and send the invoice
    await stripe.invoices.sendInvoice(invoice.id);

    // Step 4: Create a customer portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerIdStripe,
      return_url: `${process.env.NEXT_PUBLIC_URL}/thank-you`, // Redirect after confirmation
    });

    return session.url;
  },
};
