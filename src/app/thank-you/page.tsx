import Image from 'next/image';
import Link from 'next/link';
import thankYouIllustration from '@/assets/thank-you/undraw_travel_booking.png';

export default async function ThankYouPage() {
  const name = 'John Doe';
  return (
    <section className="relative w-full pt-10">
      <div className="container flex flex-col items-center mx-auto text-center pb-20">
        <Image
          src={thankYouIllustration}
          alt="Thank You Illustration"
          className="object-cover w-full max-w-xl h-full"
        />
        <h1 className="text-4xl sm:text-5xl 2xl:text-6xl font-bold text-primary leading-tight mt-2 mb-6">
          Thank You.
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-8 w-full font-medium max-w-full xs:max-w-xl">
          Thank you, <strong>{name}</strong>, for booking your tour with us!
          Please check your email for confirmation and all the details. Safe
          travels ahead!
        </p>
        <Link
          href={`/packages`}
          className="bg-primary text-white shadow hover:bg-eucalyptus-700 w-full xs:w-max px-8 py-3 rounded"
        >
          Back to Packages
        </Link>
      </div>
      {/* Tour Packages Details -- Divider */}
      <div className="block w-full max-w-[calc(100%-2rem)] 5xl:max-w-[calc(100%-4rem)] h-[1px] bg-wild-sand-200 mx-auto mb-10 lg:mb-20 "></div>
    </section>
  );
}
