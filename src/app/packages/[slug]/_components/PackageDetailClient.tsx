'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Calendar } from '@/components/ui/calendar'; // Adjust the import path for your project
import { isBefore, isSameDay } from 'date-fns';
import { bookingClient } from '@/client/bookingClient'; // Assuming you have this set up
import Image, { StaticImageData } from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
// import { urlFor } from '@/sanity/lib/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Users,
  CircleUserRound,
  MapPin,
  CalendarDays,
  Plane,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import PageHeader from '@/components/PageHeader';
import DayInfo from './DayInfo';
// import { set } from 'sanity';

import ImageOne from '@/assets/Packages/Package 1/P1- (1).jpg';
import ImageTwo from '@/assets/Packages/Package 1/P1- (2).jpg';
import ImageThree from '@/assets/Packages/Package 1/P1- (3).jpg';
import ImageFour from '@/assets/Packages/Package 1/P1- (4).jpg';
import ImageFive from '@/assets/Packages/Package 1/P1- (5).jpg';
import ImageSix from '@/assets/Packages/Package 1/P1- (6).jpg';
import ImageSeven from '@/assets/Packages/Package 1/P1- (7).jpg';
import ImageEight from '@/assets/Packages/Package 1/P1- (8).jpg';
import dividerSwirl from '@/assets/Home/Divider_Swirl.png';

import Stripe from 'stripe';
import { supabase } from '@/client/supabaseClient';
import { useRouter } from 'next/navigation';
import Pricing from './Pricing';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { urlFor } from '@/sanity/lib/image';
import { DetailedTourPackage } from '@/lib/types/tour/package';
import { fetchPackageDetails } from '@/sanity/lib/client';

export interface Package {
  typePackage: string;
  tourId: string;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  duration: string;
  maxPeople: number;
  minAge: string;
  pickup: string;
  slug: string;
  overview: string;
  tourHighlight: string;
  hasPremium: boolean;
  pricingList: any;
  images?: { src: string | StaticImageData; alt: string }[]; // Add images array
  itinerary?: { day: string; description: string }[]; // Add itinerary array
}

export interface Availability {
  date: Date | string;
  spotsLeft: number;
}

const packages: Package[] = [
  {
    typePackage: 'Full Package',
    imageUrl: 'https://picsum.photos/400/300',
    title: 'Umrah and Hotel Package',
    description:
      'Experience a spiritually fulfilling Umrah journey with our comprehensive package, including premium accommodations and guided tours.',
    price: 4500,
    rating: 4.4,
    duration: '10 days',
    maxPeople: 20,
    minAge: '12 +',
    pickup: 'Airport',
    slug: 'umrah-and-hotel-package',
    tourId: 'cbb02563-78bb-4cfb-a979-de1a973c1c05',
    overview: `The Sacred Journey to Makkah is crafted for those seeking a profound and spiritual connection through the sacred rites of Umrah. This experience is designed for travelers who wish to immerse themselves in the rich Islamic heritage and spiritual significance of Makkah and Medina. More than just a pilgrimage, the Sacred Journey to Makkah combines the timeless rituals of Umrah with opportunities to explore the historical sites, hidden gems, and cultural treasures of Islam's holiest cities.<br/><br/>

    From the majestic Kaaba to the serene Masjid al-Nabawi, our tour offers a deep and meaningful exploration of these revered places. You will be guided through the rituals of Umrah, with opportunities to reflect, pray, and connect with the spiritual essence of Islam. This journey is not just about visiting sacred sites but about embracing the profound peace and tranquility that comes from walking in the footsteps of the Prophet Muhammad (PBUH).`,
    tourHighlight: `Experience the profound spiritual atmosphere of Makkah and Medina, where faith and history converge. <br /><br />
    Perform the sacred rites of Ummrah with the guidance of
    knowledgeable scholars, ensuring a meaningful and fulfilling
    experience. <br /><br />
    Explore the historic sites of Islam, including the Cave of Hira,
    Jabal al-Nour, and the Prophet&apos;s Mosque, deepening your
    understanding of Islamic history and culture. <br /><br />
    Discover the hidden gems of Makkah, including local markets and
    lesser-known mosques, offering a unique perspective on life in
    these holy cities. <br /><br />
    Enjoy comfortable accommodations and personalized service,
    ensuring that your journey is as peaceful and enriching as
    possible.`,
    hasPremium: true,
    pricingList: [
      {
        people: '2-4 People',
        standartPackagePrice: '$400',
        standartPackageList: ['Refreshment'],
        premiumPackagePrice: '$500',
        premiumPackageList: ['Spiritual reminder', 'Extra historical stop'],
        addon: null,
      },
      {
        people: '6-10 People',
        standartPackagePrice: '$500',
        standartPackageList: ['Refreshment'],
        premiumPackagePrice: '$600',
        premiumPackageList: ['Spiritual reminder', 'Extra historical stop'],
        addon: `(Salman Al-Faarisi garden) and Saudi cultural refreshments:
        Dates, Mamoul, tea or coffe`,
      },
      {
        people: '10-22 People',
        standartPackagePrice: '$600',
        standartPackageList: ['Refreshment'],
        premiumPackagePrice: '$700',
        premiumPackageList: ['Spiritual reminder', 'Extra historical stop'],
        addon: null,
      },
      {
        people: '50 People',
        standartPackagePrice: '$800',
        standartPackageList: ['Refreshment'],
        premiumPackagePrice: '$1000',
        premiumPackageList: ['Spiritual reminder', 'Extra historical stop'],
        addon: null,
      },
    ],
    images: [
      { src: ImageOne, alt: 'Image 1' },
      { src: ImageTwo, alt: 'Image 2' },
      { src: ImageThree, alt: 'Image 3' },
      { src: ImageFour, alt: 'Image 4' },
      { src: ImageFive, alt: 'Image 5' },
      { src: ImageSix, alt: 'Image 6' },
      { src: ImageSeven, alt: 'Image 7' },
      { src: ImageEight, alt: 'Image 8' },
    ],
    itinerary: [
      {
        day: 'Day 01',
        description: 'Pickup and Arrive at Makkah Hotel',
      },
      {
        day: 'Day 02',
        description: 'Ummrah',
      },
      {
        day: 'Day 03',
        description: 'Makkah Museum',
      },
      {
        day: 'Day 04',
        description: 'Bullet Train to Medina + Arrive at Medina Hotel',
      },
      {
        day: 'Day 05',
        description: 'Sacred Site Tours (x4)',
      },
      {
        day: 'Day 06',
        description: 'Museum Tour (x3)',
      },
      {
        day: 'Day 07',
        description: 'English Islamic Lesson',
      },
      {
        day: 'Day 08',
        description: 'Sacred Site Tours (x4)',
      },
      {
        day: 'Day 09',
        description: 'Depature',
      },
    ],
  },
  {
    typePackage: 'Full Package',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    title: 'Full Package',
    description:
      'Immerse yourself in the heart of Islamic history with our full package, offering a balanced mix of spiritual and cultural experiences.',
    price: 3000,
    rating: 4.4,
    duration: '4 days',
    maxPeople: 20,
    minAge: '12 +',
    pickup: 'Airport',
    slug: 'full-package',
    tourId: 'cbb02563-78bb-4cfb-a979-de1a973c1c06',
    overview: `The Sacred Journey to Makkah is crafted for those seeking a profound and spiritual connection through the sacred rites of Umrah. This experience is designed for travelers who wish to immerse themselves in the rich Islamic heritage and spiritual significance of Makkah and Medina. More than just a pilgrimage, the Sacred Journey to Makkah combines the timeless rituals of Umrah with opportunities to explore the historical sites, hidden gems, and cultural treasures of Islam's holiest cities.<br/><br/>

    From the majestic Kaaba to the serene Masjid al-Nabawi, our tour offers a deep and meaningful exploration of these revered places. You will be guided through the rituals of Umrah, with opportunities to reflect, pray, and connect with the spiritual essence of Islam. This journey is not just about visiting sacred sites but about embracing the profound peace and tranquility that comes from walking in the footsteps of the Prophet Muhammad (PBUH).`,
    tourHighlight: `Experience the profound spiritual atmosphere of Makkah and Medina, where faith and history converge. <br /><br />
    Perform the sacred rites of Ummrah with the guidance of
    knowledgeable scholars, ensuring a meaningful and fulfilling
    experience. <br /><br />
    Explore the historic sites of Islam, including the Cave of Hira,
    Jabal al-Nour, and the Prophet&apos;s Mosque, deepening your
    understanding of Islamic history and culture. <br /><br />
    Discover the hidden gems of Makkah, including local markets and
    lesser-known mosques, offering a unique perspective on life in
    these holy cities. <br /><br />
    Enjoy comfortable accommodations and personalized service,
    ensuring that your journey is as peaceful and enriching as
    possible.`,
    hasPremium: true,
    pricingList: [
      {
        people: '2-4 People',
        standartPackagePrice: '$400',
        standartPackageList: ['Refreshment'],
        premiumPackagePrice: null,
        premiumPackageList: null,
      },
      {
        people: '6-10 People',
        standartPackagePrice: '$500',
        standartPackageList: ['Refreshment'],
        premiumPackagePrice: '$600',
        premiumPackageList: ['Spiritual reminder', 'Extra historical stop'],
      },
      {
        people: '10-22 People',
        standartPackagePrice: '$600',
        standartPackageList: ['Refreshment'],
        premiumPackagePrice: '$700',
        premiumPackageList: ['Spiritual reminder', 'Extra historical stop'],
      },
      {
        people: '50 People',
        standartPackagePrice: '$800',
        standartPackageList: ['Refreshment'],
        premiumPackagePrice: '$1000',
        premiumPackageList: ['Spiritual reminder', 'Extra historical stop'],
      },
    ],
    images: [
      { src: ImageOne, alt: 'Image 1' },
      { src: ImageTwo, alt: 'Image 2' },
      { src: ImageThree, alt: 'Image 3' },
      { src: ImageFour, alt: 'Image 4' },
      { src: ImageFive, alt: 'Image 5' },
      { src: ImageSix, alt: 'Image 6' },
      { src: ImageSeven, alt: 'Image 7' },
      { src: ImageEight, alt: 'Image 8' },
    ],
    itinerary: [
      {
        day: 'Day 01',
        description: 'Pickup and Arrive at Makkah Hotel',
      },
      {
        day: 'Day 02',
        description: 'Ummrah',
      },
      {
        day: 'Day 03',
        description: 'Makkah Museum',
      },
      {
        day: 'Day 04',
        description: 'Bullet Train to Medina + Arrive at Medina Hotel',
      },
      {
        day: 'Day 05',
        description: 'Sacred Site Tours (x4)',
      },
      {
        day: 'Day 06',
        description: 'Museum Tour (x3)',
      },
      {
        day: 'Day 07',
        description: 'English Islamic Lesson',
      },
      {
        day: 'Day 08',
        description: 'Sacred Site Tours (x4)',
      },
      {
        day: 'Day 09',
        description: 'Depature',
      },
    ],
  },
  {
    typePackage: 'Full Package',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    title: 'Extreme Tour',
    description:
      'Embark on an adventurous journey with our Extreme Tour, featuring thrilling activities that blend excitement with cultural discovery.',
    price: 4000,
    rating: 4.4,
    duration: '2 days',
    maxPeople: 20,
    minAge: '12 +',
    pickup: 'Airport',
    slug: 'extreme-tour',
    tourId: 'cbb02563-78bb-4cfb-a979-de1a973c1c07',
    overview: `The Sacred Journey to Makkah is crafted for those seeking a profound and spiritual connection through the sacred rites of Umrah. This experience is designed for travelers who wish to immerse themselves in the rich Islamic heritage and spiritual significance of Makkah and Medina. More than just a pilgrimage, the Sacred Journey to Makkah combines the timeless rituals of Umrah with opportunities to explore the historical sites, hidden gems, and cultural treasures of Islam's holiest cities.<br/><br/>

    From the majestic Kaaba to the serene Masjid al-Nabawi, our tour offers a deep and meaningful exploration of these revered places. You will be guided through the rituals of Umrah, with opportunities to reflect, pray, and connect with the spiritual essence of Islam. This journey is not just about visiting sacred sites but about embracing the profound peace and tranquility that comes from walking in the footsteps of the Prophet Muhammad (PBUH).`,
    tourHighlight: `Experience the profound spiritual atmosphere of Makkah and Medina, where faith and history converge. <br /><br />
    Perform the sacred rites of Ummrah with the guidance of
    knowledgeable scholars, ensuring a meaningful and fulfilling
    experience. <br /><br />
    Explore the historic sites of Islam, including the Cave of Hira,
    Jabal al-Nour, and the Prophet&apos;s Mosque, deepening your
    understanding of Islamic history and culture. <br /><br />
    Discover the hidden gems of Makkah, including local markets and
    lesser-known mosques, offering a unique perspective on life in
    these holy cities. <br /><br />
    Enjoy comfortable accommodations and personalized service,
    ensuring that your journey is as peaceful and enriching as
    possible.`,
    hasPremium: false,
    pricingList: [
      {
        people: '2-4 People',
        standartPackagePrice: '$400',
        standartPackageList: ['Refreshment'],
        premiumPackagePrice: null,
        premiumPackageList: null,
      },
      {
        people: '6-10 People',
        standartPackagePrice: '$500',
        standartPackageList: ['Refreshment'],
        premiumPackagePrice: null,
        premiumPackageList: null,
      },
      {
        people: '10-22 People',
        standartPackagePrice: '$600',
        standartPackageList: ['Refreshment'],
        premiumPackagePrice: null,
        premiumPackageList: null,
      },
      {
        people: '50 People',
        standartPackagePrice: '$800',
        standartPackageList: ['Refreshment'],
        premiumPackagePrice: null,
        premiumPackageList: null,
      },
    ],
    images: [
      { src: ImageOne, alt: 'Image 1' },
      { src: ImageTwo, alt: 'Image 2' },
      { src: ImageThree, alt: 'Image 3' },
      { src: ImageFour, alt: 'Image 4' },
      { src: ImageFive, alt: 'Image 5' },
      { src: ImageSix, alt: 'Image 6' },
      { src: ImageSeven, alt: 'Image 7' },
      { src: ImageEight, alt: 'Image 8' },
    ],
    itinerary: [
      {
        day: 'Day 01',
        description: 'Pickup and Arrive at Makkah Hotel',
      },
      {
        day: 'Day 02',
        description: 'Ummrah',
      },
      {
        day: 'Day 03',
        description: 'Makkah Museum',
      },
      {
        day: 'Day 04',
        description: 'Bullet Train to Medina + Arrive at Medina Hotel',
      },
      {
        day: 'Day 05',
        description: 'Sacred Site Tours (x4)',
      },
      {
        day: 'Day 06',
        description: 'Museum Tour (x3)',
      },
      {
        day: 'Day 07',
        description: 'English Islamic Lesson',
      },
      {
        day: 'Day 08',
        description: 'Sacred Site Tours (x4)',
      },
      {
        day: 'Day 09',
        description: 'Depature',
      },
    ],
  },
];

// Mock unavailable dates for testing
// const unavailableDates = [
//   addDays(new Date(), 2),
//   addDays(new Date(), 4),
//   addDays(new Date(), 6),
// ];

interface PackageDetailPageClientProps {
  packageDetails: DetailedTourPackage;
}

// Package detail page component
export default function PackageDetailPage({
  packageDetails,
}: PackageDetailPageClientProps) {
  // Find the selected package based on the slug
  const selectedPackage = packageDetails; //packages.find((pkg) => pkg.slug === params.id);
  console.log(selectedPackage, 'selectedPackage');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number | 0>(0);
  const [availableDates, setAvailableDates] = useState<Availability[]>([]);
  const [isCalendarDisabled, setIsCalendarDisabled] = useState(true);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [price, setPrice] = useState<number>(
    selectedPackage.groups[0].standardPricing
  );
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState('standart');
  const [displaySelect, setDisplaySelect] = useState(false);

  const router = useRouter();

  // Function to check if a date is unavailable (based on state or unavailableDates)
  // const isDateUnavailable = (date: Date) => {
  //   return unavailableDates.some((unavailableDate) =>
  //     isSameDay(unavailableDate, date)
  //   );
  // };

  // Function to handle guest count changes
  const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuests(Number(e.target.value));
    setIsCalendarDisabled(true); // Disable the calendar until availability is checked
    setAvailableDates([]);
    setSelectedDate(null);
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

  const getPriceBasedOnGroups = () => {
    const selectedGroup = selectedPackage.groups.find(
      (group) => guests >= group.minGroupSize && guests <= group.maxGroupSize
    );

    if (!selectedGroup) {
      const selectedGroup =
        selectedPackage.groups.find((group) => guests <= group.maxGroupSize) ||
        selectedPackage.groups[selectedPackage.groups.length - 1];

      if (selectedGroup.pricingType === 'perGroup') {
        return selectedGroup
          ? selectedPlan == 'standart'
            ? selectedGroup.standardPricing
            : selectedGroup.premiumPricing
          : 250;
      } else if (selectedGroup.pricingType === 'perPerson') {
        if (guests > 0) {
          return selectedGroup
            ? selectedPlan == 'standart'
              ? selectedGroup.standardPricing * guests
              : (selectedGroup.premiumPricing || 0) * guests
            : 0;
        } else {
          return selectedGroup
            ? selectedPlan == 'standart'
              ? selectedGroup.standardPricing * 1
              : (selectedGroup.premiumPricing || 0) * 1
            : 0;
        }
      }
    }
    if (selectedGroup?.pricingType === 'perGroup') {
      return selectedGroup
        ? selectedPlan == 'standart'
          ? selectedGroup.standardPricing
          : selectedGroup.premiumPricing
        : 250;
    } else if (selectedGroup?.pricingType === 'perPerson') {
      if (guests > 0) {
        return selectedGroup
          ? selectedPlan == 'standart'
            ? selectedGroup.standardPricing * guests
            : (selectedGroup.premiumPricing || 0) * guests
          : 0;
      } else {
        return selectedGroup
          ? selectedPlan == 'standart'
            ? selectedGroup.standardPricing * 1
            : (selectedGroup.premiumPricing || 0) * 1
          : 0;
      }
    }
  };

  const getMaxGroupBasedOnGuests = () => {
    const selectedGroup = selectedPackage.groups.find(
      (group) => guests >= group.minGroupSize && guests <= group.maxGroupSize
    );

    if (!selectedGroup) {
      const selectedGroup =
        selectedPackage.groups.find((group) => guests <= group.maxGroupSize) ||
        selectedPackage.groups[selectedPackage.groups.length - 1];

      return selectedGroup
        ? selectedGroup.maxGroupSize
        : selectedPackage.groups[selectedPackage.groups.length - 1]
            .maxGroupSize;
    }
    return selectedGroup
      ? selectedGroup.maxGroupSize
      : selectedPackage.groups[selectedPackage.groups.length - 1].maxGroupSize;
  };

  const checkAvailability = async () => {
    setIsCheckingAvailability(true);

    try {
      const currentDate = new Date(); // Use today's date
      const availability: Availability[] =
        await bookingClient.getAvailableDates(
          currentDate,
          selectedPackage._id,
          getMaxGroupBasedOnGuests()
        );

      console.log(getMaxGroupBasedOnGuests(), 'palspdlasdasd');
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

      setPrice(getPriceBasedOnGroups() as number);
      // console.log("Available returned:", available);
      setAvailableDates(available); // Store available dates with spots info
      setDisplaySelect(true);
      setIsCalendarDisabled(false); // Enable calendar
    } catch (error) {
      console.error('Error fetching availability:', error);
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  useEffect(() => {
    console.log(selectedPackage, 'asds');
    setPrice(getPriceBasedOnGroups() as number);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlan]);

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

    if (!selectedDate || !guests || guests <= 0) {
      setBookingError('Please select a valid date and number of guests.');
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
        selectedPackage.slug.current,
        selectedDateUTC.toISOString(), // Pass UTC date to the server
        guests
      );

      // Handle success, maybe redirect or show a success message
      alert('Booking successful!');
    } catch (error) {
      console.error('Error creating booking:', error);
      setBookingError('Failed to create booking. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const originalPrice = (price: number): string => {
    return Math.round(price * 3).toLocaleString(); // Format with commas
  };

  const images = Array.isArray(selectedPackage.images)
    ? selectedPackage.images
    : [];

  return (
    <>
      <PageHeader title="Our Tour Packages" />
      {/* Tour Packages Details */}
      <section className="relative overflow-hidden pt-10 lg:pt-20">
        <div className="container mx-auto">
          {/* Carousel */}
          <Carousel
            opts={{
              align: 'center',
              loop: true,
              skipSnaps: true, // Smoothens the transition
            }}
            className="w-full transtion-all transition duration-1000 ease-linear"
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false, // Keep autoplay running for smoother transitions
              }),
            ]}
          >
            <div className="flex flex-col sm:flex-row justify-between items-end mb-8 gap-8 sm:gap-0">
              <div className="flex flex-col items-start text-left max-w-2xl">
                <p className="text-lg text-body-secondary mb-2">
                  {/* {selectedPackage.typePackage} */}
                </p>
                <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {selectedPackage.name}
                </h1>
                <p className="text-lg text-body-secondary max-w-xl pt-4">
                  {selectedPackage.description}
                </p>
              </div>
              <div className="flex items-end space-x-3">
                {/* Adjust spacing between buttons */}
                <CarouselPrevious className="bg-white rounded-full  p-2">
                  <ChevronLeft />
                </CarouselPrevious>
                <CarouselNext className="bg-white rounded-full  p-2">
                  <ChevronRight />
                </CarouselNext>
              </div>
            </div>

            <CarouselContent>
              {[...images, ...images]?.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="rounded-lg overflow-hidden w-full h-full">
                    <Image
                      src={urlFor(image).url()}
                      alt={image.alt}
                      width={1920}
                      height={1080}
                      className="object-cover w-full h-64 sm:h-[24rem] md:h-[30rem] lg:h-[36rem] xl:h-[40rem]"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Controls */}
          </Carousel>
        </div>
        {/* Tour Packages Details -- Cost & Calendar, QuoteBlock -- Tablet to Mobile Responsive */}
        <div className="container w-full flex 2lg:hidden flex-col justify-between pt-6 sm:pt-10">
          {/* Booking Form (3rd Column) */}
          <div className="bg-white p-6 md:p-10 shadow-xl rounded-2xl">
            <p className="text-xl font-bold text-body-secondary">Cost:</p>
            {/* <div className="flex flex-row items-center gap-8 my-1">
              <h3 className="text-3xl font-bold text-primary">
                ${selectedPackage.price.toLocaleString()}
              </h3>
              <span className="text-xl font-bold text-red-500 line-through">
                ${originalPrice(selectedPackage.price)}
              </span>
            </div> */}
            <div className="relative flex flex-row items-center justify-between gap-2 w-full my-4">
              <div className="absolute m-auto w-full h-[1px] border-b border-dashed border-wild-sand-200 z-0"></div>
              <div className="h-2 w-2 block rounded-full bg-wild-sand-200"></div>
              <Plane
                strokeWidth={1.5}
                className="h-6 w-6 text-body-secondary rotate-45"
              />
              <div className="h-2 w-2 block rounded-full bg-wild-sand-200"></div>
            </div>
            {/* Number of Guests */}
            <div className="mb-4">
              <label className="block text-base font-medium mb-2">
                Number of Guests
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={guests || ''}
                placeholder="Enter number of guests"
                onChange={handleGuestsChange}
                className="w-full px-4 py-2 border rounded-md"
                // on enter
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    checkAvailability();
                  }
                }}
              />
            </div>

            {/* Check Availability Button */}
            {isCalendarDisabled && (
              <button
                type="button"
                onClick={checkAvailability}
                className="w-full px-6 py-3 bg-green-700 text-white font-bold rounded-md shadow-md hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isCheckingAvailability || guests === null} // Disable while checking
              >
                {isCheckingAvailability ? 'Checking...' : 'Check Availability'}
              </button>
            )}

            {/* Book Now Button */}
            {!isCalendarDisabled && (
              <>
                {/* Calendar Date Selection */}
                <div className="mb-4">
                  <label className="block text-base font-medium mb-2">
                    Select Date
                  </label>
                  <div className={isCalendarDisabled ? 'opacity-50' : ''}>
                    <Calendar
                      mode="single"
                      selected={selectedDate ?? undefined}
                      onSelect={(date) => setSelectedDate(date as Date)}
                      disabled={isDateDisabled} // Disable based on availability
                      // disabled={(date) => date < new Date()}
                      className="h-full w-full px-4 py-2 rounded-md flex border"
                      classNames={{
                        months:
                          'flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1',
                        month: 'space-y-4 w-full flex flex-col',
                        table: 'w-full h-full border-collapse space-y-1',
                        head_row: '',
                        row: 'w-full mt-2',
                      }}
                    />
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger
                    type="button"
                    className="w-full mt-4 px-6 py-3 bg-primary text-white font-bold rounded-md shadow-md hover:bg-eucalyptus-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!selectedDate}
                  >
                    Book Now
                  </DialogTrigger>
                  <DialogContent className="bg-white p-6 2xs:p-8 w-full 2xs:w-max max-w-[calc(100vw-2rem)] !rounded-xl overflow-hidden">
                    <form onSubmit={handleBooking}>
                      <DialogHeader>
                        <DialogTitle>
                          <h3 className="text-2xl sm:text-3xl font-bold text-primary">
                            Complete Your Booking
                          </h3>
                        </DialogTitle>
                        <DialogDescription className="text-lg text-body-secondary my-2">
                          Total Cost :{' '}
                          <span className="text-primary font-bold">
                            ${price}
                          </span>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col items-stretch gap-4 mt-4">
                        <div className="flex flex-col 2xs:flex-row items-stretch gap-4">
                          <input
                            type="text"
                            placeholder="First Name"
                            className="w-full px-4 py-2 border rounded-md flex-1"
                          />
                          <input
                            type="text"
                            placeholder="Last Name"
                            className="w-full px-4 py-2 border rounded-md flex-1"
                          />
                        </div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          className="w-full px-4 py-2 border rounded-md flex-1"
                        />
                      </div>
                      <DialogFooter>
                        <button
                          type="submit"
                          className="w-full 2xs:w-max ml-auto mt-4 px-6 py-3 bg-primary text-white font-bold rounded-md shadow-md hover:bg-eucalyptus-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isBooking ? 'Checkout...' : 'Checkout Now'}
                        </button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
        {/* Tour Packages Details -- Features */}
        <div className="container relative mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 2lg:grid-cols-2 xl:grid-cols-4 justify-start items-start 2xl:flex 2xl:flex-row 2xl:justify-between 2xl:items-center gap-6 lg:gap-8 xl:gap-2 2xl:gap-16 max-w-none 2lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mt-10 lg:mt-16">
            {/* Tour Packages Details -- Features Item */}
            <div className="flex flex-row gap-4 items-center 2xl:justify-center">
              <CalendarDays
                strokeWidth={1.5}
                className="h-8 w-8 text-accent-pink"
              />
              <div className="flex flex-col">
                <p className="text-lg font-bold text-body-secondary">
                  Duration
                </p>
                <p className="text-lg text-body-secondary">
                  {selectedPackage.duration}
                </p>
              </div>
            </div>
            {/* Tour Packages Details -- Features Item */}
            <div className="flex flex-row gap-4 items-center 2xl:justify-center">
              <Users strokeWidth={1.5} className="h-8 w-8 text-accent-pink" />
              <div className="flex flex-col">
                <p className="text-lg font-bold text-body-secondary">
                  Max People
                </p>
                <p className="text-lg text-body-secondary">
                  {selectedPackage.maxPeople ? selectedPackage.maxPeople : '-'}
                </p>
              </div>
            </div>
            {/* Tour Packages Details -- Features Item */}
            <div className="flex flex-row gap-4 items-center 2xl:justify-center">
              <CircleUserRound
                strokeWidth={1.5}
                className="h-8 w-8 text-accent-pink"
              />
              <div className="flex flex-col">
                <p className="text-lg font-bold text-body-secondary">Min Age</p>
                <p className="text-lg text-body-secondary">
                  {selectedPackage.minAge ? selectedPackage.minAge : '-'}
                </p>
              </div>
            </div>
            {/* Tour Packages Details -- Features Item */}
            <div className="flex flex-row gap-4 items-center 2xl:justify-center">
              <MapPin strokeWidth={1.5} className="h-8 w-8 text-accent-pink" />
              <div className="flex flex-col">
                <p className="text-lg font-bold text-body-secondary">Pickup</p>
                <p className="text-lg text-body-secondary">
                  {selectedPackage.pickup ? selectedPackage.pickup : '-'}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Tour Packages Details -- Divider */}
        <div className="w-full max-w-[calc(100%-2rem)] 5xl:max-w-[calc(100%-4rem)] h-[1px] bg-wild-sand-200 mx-auto my-8 lg:my-10 "></div>
        {/* Tour Packages Details -- Body Wrapper */}
        <div className="container relative flex flex-col items-stretch pb-24">
          {/* Tour Packages Details -- Overview, Tour Highlights, Tour Plan, Cost & Calendar, QouteBlock */}
          <div className="relative flex flex-col gap-10">
            {/* Tour Packages Details -- Overview */}
            <div className="flex flex-col gap-6 2lg:max-w-xl xl:max-w-2xl">
              <p className="text-xl lg:text-2xl font-bold text-primary">
                Overview
              </p>
              <p
                className="text-lg text-body-secondary"
                dangerouslySetInnerHTML={{
                  __html: selectedPackage.description,
                }}
              ></p>
            </div>
            {/* Tour Packages Details -- Tour Highlights */}
            {/* <div className="flex flex-col gap-6 2lg:max-w-xl xl:max-w-2xl">
              <p className="text-xl lg:text-2xl font-bold text-primary">
                Tour Highlights
              </p>
              <p
                className="text-lg text-body-secondary"
                dangerouslySetInnerHTML={{
                  __html: selectedPackage.tourHighlight,
                }}
              ></div>
            </div> */}
            {/* Tour Packages Details -- Group Pricing Breakdown */}
            <div className="flex flex-col gap-6 2lg:max-w-xl xl:max-w-2xl">
              <>
                {selectedPackage.groups.find(
                  (group) =>
                    group.premiumInclusions != null &&
                    group.premiumPricing != null
                ) ? (
                  <p className="text-xl lg:text-2xl font-bold text-primary">
                    Group Pricing Breakdown (Information)
                  </p>
                ) : (
                  <p className="text-xl lg:text-2xl font-bold text-primary">
                    Pricing Breakdown (Information)
                  </p>
                )}
              </>
              <p className="text-lg text-body-secondary">
                Based on the number of guests you will book for, our automatic
                process will place you in the correct group. Please click on the
                below to find out more information.
              </p>
              <Pricing pricingList={selectedPackage.groups} />
            </div>
            {/* Tour Packages Details -- Tour Plan */}
            <div className="flex flex-col gap-6 2lg:max-w-xl xl:max-w-2xl">
              <p className="text-xl lg:text-2xl font-bold text-primary">
                Tour Plan
              </p>
              <div className="flex flex-col items-stretch gap-4">
                {(selectedPackage.itinerary || [])?.map((item, index) => (
                  <DayInfo
                    key={index}
                    day={item.time}
                    description={item.description}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Tour Packages Details -- Cost & Calendar, QuoteBlock -- Dekstop */}
          <div className="2lg:absolute 2lg:-top-40 2lg:right-8 2xl:right-10 w-[21.125rem] hidden 2lg:flex flex-col justify-between mt-10 2lg:mt-0">
            {/* Booking Form (3rd Column) */}
            <div className="bg-white p-10 shadow-xl rounded-2xl">
              <p className="text-xl font-bold text-body-secondary">Cost:</p>
              <div className="flex flex-row items-center gap-8 my-1">
                <h3 className="text-3xl font-bold text-primary">${price}</h3>
                <span className="text-xl font-bold text-red-500 line-through">
                  ${originalPrice(price)}
                </span>
              </div>
              <div className="relative flex flex-row items-center justify-between gap-2 w-full my-4">
                <div className="absolute m-auto w-full h-[1px] border-b border-dashed border-wild-sand-200 z-0"></div>
                <div className="h-2 w-2 block rounded-full bg-wild-sand-200"></div>
                <Plane
                  strokeWidth={1.5}
                  className="h-6 w-6 text-body-secondary rotate-45"
                />
                <div className="h-2 w-2 block rounded-full bg-wild-sand-200"></div>
              </div>
              {/* Number of Guests */}
              <div className="mb-4">
                <label className="block text-base font-medium mb-2">
                  Number of Guests
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={guests || ''}
                  placeholder="Enter number of guests"
                  onChange={handleGuestsChange}
                  className="w-full px-4 py-2 border rounded-md"
                  // on enter
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      checkAvailability();
                    }
                  }}
                />
              </div>
              {/* Select Package */}
              {displaySelect &&
              selectedPackage.groups.find(
                (group) =>
                  group.premiumInclusions != null &&
                  group.premiumPricing != null
              ) ? (
                <div className="mb-4">
                  <label className="block text-base font-medium mb-2">
                    Choose a plan
                  </label>
                  <Select
                    value={selectedPlan}
                    onValueChange={(value) => setSelectedPlan(value)}
                  >
                    <SelectTrigger className="w-full px-4 py-2 h-auto text-base border rounded-md">
                      <SelectValue placeholder="Standart Package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standart">Standart Package</SelectItem>
                      <SelectItem value="premium">Premium Package</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                ''
              )}

              {/* Check Availability Button */}
              {isCalendarDisabled && (
                <button
                  type="button"
                  onClick={checkAvailability}
                  className="w-full px-6 py-3 bg-green-700 text-white font-bold rounded-md shadow-md hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    isCheckingAvailability ||
                    guests === null ||
                    guests <= 0 ||
                    guests === undefined
                  } // Disable while checking
                >
                  {isCheckingAvailability
                    ? 'Checking...'
                    : 'Check Availability'}
                </button>
              )}

              {/* Book Now Button */}
              {!isCalendarDisabled && (
                <>
                  {/* Calendar Date Selection */}
                  <div className="mb-4">
                    <label className="block text-base font-medium mb-2">
                      Select Date
                    </label>
                    <div className={isCalendarDisabled ? 'opacity-50' : ''}>
                      <Calendar
                        mode="single"
                        selected={selectedDate ?? undefined}
                        onSelect={(date) => setSelectedDate(date as Date)}
                        disabled={isDateDisabled} // Disable based on availability
                        // disabled={(date) => date < new Date()}
                        className="w-max px-4 py-2 border rounded-md"
                      />
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger
                      type="button"
                      className="w-full mt-4 px-6 py-3 bg-primary text-white font-bold rounded-md shadow-md hover:bg-eucalyptus-800 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!selectedDate}
                    >
                      Book Now
                    </DialogTrigger>
                    <DialogContent className="bg-white p-6 2xs:p-8 w-full 2xs:w-max max-w-[calc(100vw-2rem)] !rounded-xl overflow-hidden">
                      <form onSubmit={handleBooking}>
                        <DialogHeader>
                          <DialogTitle>
                            <h3 className="text-2xl sm:text-3xl font-bold text-primary">
                              Complete Your Booking
                            </h3>
                          </DialogTitle>
                          <DialogDescription className="text-lg text-body-secondary my-2">
                            Total Cost :{' '}
                            <span className="text-primary font-bold">
                              ${price}
                            </span>
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col items-stretch gap-4 mt-4">
                          <div className="flex flex-col 2xs:flex-row items-stretch gap-4">
                            <input
                              type="text"
                              placeholder="First Name"
                              className="w-full px-4 py-2 border rounded-md flex-1"
                            />
                            <input
                              type="text"
                              placeholder="Last Name"
                              className="w-full px-4 py-2 border rounded-md flex-1"
                            />
                          </div>
                          <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full px-4 py-2 border rounded-md flex-1"
                          />
                        </div>
                        <DialogFooter>
                          <button
                            type="submit"
                            className="w-full 2xs:w-max ml-auto mt-4 px-6 py-3 bg-primary text-white font-bold rounded-md shadow-md hover:bg-eucalyptus-800 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isBooking ? 'Checkout...' : 'Checkout Now'}
                          </button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
            {/* Quote Block --  Dekstop */}
            <div className="w-full max-w-[280px] mt-20 mx-auto">
              <div className="mx-auto">
                <div className="flex flex-col max-w-2xl justify-center mx-auto text-center items-center">
                  <span className="text-4xl text-primary">
                    Knowledge doesn’t come to you, but
                    <strong> you have to go to it.</strong>
                  </span>
                  {/* Render author */}
                  <p className="text-lg text-gray-600 mt-4">Imam Malik</p>
                </div>
                <Image
                  src={dividerSwirl}
                  alt="divider swirl"
                  width={1248}
                  height={98}
                  className="aspect-[1248/98] object-contain w-full h-auto mt-16 lg:hidden"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Quote Block --  Dekstop */}
        <div className="w-full lg:hidden mx-auto">
          <div className="container mx-auto">
            <div className="flex flex-col max-w-2xl justify-center mx-auto text-center items-center">
              <span className="text-3xl text-primary">
                Knowledge doesn’t come to you, but
                <strong> you have to go to it.</strong>
              </span>
              {/* Render author */}
              <p className="text-lg text-gray-600 mt-4">Imam Malik</p>
            </div>
            <Image
              src={dividerSwirl}
              alt="divider swirl"
              width={1248}
              height={98}
              className="aspect-[1248/98] object-contain w-full h-auto mt-16 lg:hidden"
            />
          </div>
        </div>
        {/* Tour Packages Details -- Divider */}
        <div className="hidden lg:block w-full max-w-[calc(100%-2rem)] 5xl:max-w-[calc(100%-4rem)] h-[1px] bg-wild-sand-200 mx-auto mb-10 lg:mb-20 "></div>
      </section>
    </>
  );
}
