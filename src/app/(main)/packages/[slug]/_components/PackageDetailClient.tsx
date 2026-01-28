'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

import {
  Users,
  CircleUserRound,
  MapPin,
  CalendarDays,
  Plane,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';

import PageHeader from '@/components/PageHeader';
import DayInfo from './DayInfo';
import { Button } from '@/components/ui/button';

import ImageOne from '@/assets/Packages/Package 1/P1- (1).jpg';
import ImageTwo from '@/assets/Packages/Package 1/P1- (2).jpg';
import ImageThree from '@/assets/Packages/Package 1/P1- (3).jpg';
import ImageFour from '@/assets/Packages/Package 1/P1- (4).jpg';
import ImageFive from '@/assets/Packages/Package 1/P1- (5).jpg';
import ImageSix from '@/assets/Packages/Package 1/P1- (6).jpg';
import ImageSeven from '@/assets/Packages/Package 1/P1- (7).jpg';
import ImageEight from '@/assets/Packages/Package 1/P1- (8).jpg';
import dividerSwirl from '@/assets/Home/Divider_Swirl.png';

import Pricing from './Pricing';

import { urlFor } from '@/sanity/lib/image';
import { DetailedTourPackage } from '@/lib/types/tour/package';

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
  const selectedPackage = packageDetails;

  // Get price range for display
  const priceRange = selectedPackage.groups?.length > 0
    ? {
        min: Math.min(...selectedPackage.groups.map(g => g.standardPricing)),
        max: Math.max(...selectedPackage.groups.map(g => g.premiumPricing || g.standardPricing)),
      }
    : null;

  // Derive max people from groups if not set at package level
  const derivedMaxPeople = selectedPackage.maxPeople
    ? selectedPackage.maxPeople
    : selectedPackage.groups?.length > 0
      ? Math.max(...selectedPackage.groups.map(g => g.maxGroupSize))
      : null;

  // Derive min group size (useful for displaying minimum booking requirement)
  const derivedMinPeople = selectedPackage.groups?.length > 0
    ? Math.min(...selectedPackage.groups.map(g => g.minGroupSize))
    : null;

  const originalPrice = (price: number): string => {
    return Math.round(price * 3).toLocaleString();
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
                      src={urlFor(image).auto('format').quality(80).width(1920).url()}
                      alt={image.alt || 'Tour package image'}
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
        {/* Tour Packages Details -- Enquiry Card -- Tablet to Mobile Responsive */}
        <div className="container w-full flex 2lg:hidden flex-col justify-between pt-6 sm:pt-10">
          <div className="bg-white p-6 md:p-10 shadow-xl rounded-2xl">
            <p className="text-xl font-bold text-body-secondary">Starting From:</p>
            {priceRange && (
              <div className="flex flex-row items-center gap-4 my-2">
                <h3 className="text-3xl font-bold text-primary">
                  ${priceRange.min.toLocaleString()}
                </h3>
                <span className="text-xl font-bold text-red-500 line-through">
                  ${originalPrice(priceRange.min)}
                </span>
              </div>
            )}
            <div className="relative flex flex-row items-center justify-between gap-2 w-full my-4">
              <div className="absolute m-auto w-full h-[1px] border-b border-dashed border-wild-sand-200 z-0"></div>
              <div className="h-2 w-2 block rounded-full bg-wild-sand-200"></div>
              <Plane
                strokeWidth={1.5}
                className="h-6 w-6 text-body-secondary rotate-45"
              />
              <div className="h-2 w-2 block rounded-full bg-wild-sand-200"></div>
            </div>
            <p className="text-body-secondary mb-6">
              Interested in this package? Fill out our enquiry form and our team will get back to you with a personalized quote.
            </p>
            <Link href={`/packages/${selectedPackage.slug.current}/enquire`}>
              <Button className="w-full h-14 text-lg font-bold">
                <MessageCircle className="!w-5 !h-5 mr-2" />
                Enquire Now
              </Button>
            </Link>
          </div>
        </div>
        {/* Tour Packages Details -- Features */}
        <div className="container relative mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 2lg:grid-cols-2 xl:grid-cols-4 justify-start items-start 2xl:flex 2xl:flex-row 2xl:justify-between 2xl:items-center gap-6 lg:gap-8 xl:gap-2 2xl:gap-16 max-w-none 2lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mt-10 lg:mt-16">
            {/* Tour Packages Details -- Features Item */}
            {selectedPackage.duration && (
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
            )}
            {/* Tour Packages Details -- Features Item */}
            <div className="flex flex-row gap-4 items-center 2xl:justify-center">
              <Users strokeWidth={1.5} className="h-8 w-8 text-accent-pink" />
              <div className="flex flex-col">
                <p className="text-lg font-bold text-body-secondary">
                  Group Size
                </p>
                <p className="text-lg text-body-secondary">
                  {derivedMinPeople && derivedMaxPeople
                    ? `${derivedMinPeople} - ${derivedMaxPeople} people`
                    : derivedMaxPeople
                      ? `Up to ${derivedMaxPeople} people`
                      : '-'}
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
                  {selectedPackage.minAge ? `${selectedPackage.minAge}+` : '-'}
                </p>
              </div>
            </div>
            {/* Tour Packages Details -- Features Item */}
            <div className="flex flex-row gap-4 items-center 2xl:justify-center">
              <MapPin strokeWidth={1.5} className="h-8 w-8 text-accent-pink" />
              <div className="flex flex-col">
                <p className="text-lg font-bold text-body-secondary">Pickup</p>
                <p className="text-lg text-body-secondary">
                  {selectedPackage.pickup ? selectedPackage.pickup : 'Contact for details'}
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
              {selectedPackage.itinerary && selectedPackage.itinerary.length > 0 ? (
                <div className="flex flex-col items-stretch gap-4">
                  {selectedPackage.itinerary.map((item, index) => (
                    <DayInfo
                      key={index}
                      day={item.time}
                      description={item.description}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-body-secondary text-sm">
                  The detailed tour plan will be shared upon enquiry. Please get in touch with us for the full itinerary.
                </p>
              )}
            </div>
          </div>
          {/* Tour Packages Details -- Enquiry Card -- Desktop */}
          <div className="2lg:absolute 2lg:-top-40 2lg:right-8 2xl:right-10 w-[21.125rem] hidden 2lg:flex flex-col justify-between mt-10 2lg:mt-0">
            <div className="bg-white p-10 shadow-xl rounded-2xl">
              <p className="text-xl font-bold text-body-secondary">Starting From:</p>
              {priceRange && (
                <div className="flex flex-row items-center gap-4 my-2">
                  <h3 className="text-3xl font-bold text-primary">
                    ${priceRange.min.toLocaleString()}
                  </h3>
                  <span className="text-xl font-bold text-red-500 line-through">
                    ${originalPrice(priceRange.min)}
                  </span>
                </div>
              )}
              <div className="relative flex flex-row items-center justify-between gap-2 w-full my-4">
                <div className="absolute m-auto w-full h-[1px] border-b border-dashed border-wild-sand-200 z-0"></div>
                <div className="h-2 w-2 block rounded-full bg-wild-sand-200"></div>
                <Plane
                  strokeWidth={1.5}
                  className="h-6 w-6 text-body-secondary rotate-45"
                />
                <div className="h-2 w-2 block rounded-full bg-wild-sand-200"></div>
              </div>
              <p className="text-body-secondary mb-6 text-sm">
                Interested in this package? Fill out our enquiry form and our team will get back to you with a personalized quote.
              </p>
              <Link href={`/packages/${selectedPackage.slug.current}/enquire`}>
                <Button className="w-full h-12 text-base font-bold">
                  <MessageCircle className="!w-5 !h-5 mr-2" />
                  Enquire Now
                </Button>
              </Link>
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
