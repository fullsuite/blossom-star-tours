import Image from 'next/image';
import Link from 'next/link';
import thankYouIllustration from '@/assets/thank-you/blossom-tours-thank-you-illustration.svg';

interface ThankYouPageProps {
  searchParams: { type?: string };
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const isEnquiry = searchParams.type === 'enquiry';

  return (
    <section className="relative w-full pt-10">
      <div className="container flex flex-col items-center mx-auto text-center pb-20">
        <Image
          src={thankYouIllustration}
          alt="Thank You Illustration"
          className="object-cover w-full max-w-xl h-full"
        />
        <h1 className="text-4xl sm:text-5xl 2xl:text-6xl font-bold text-primary leading-tight mt-8 mb-6">
          {isEnquiry ? 'Enquiry Submitted!' : 'Thank You.'}
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-8 w-full font-medium max-w-full xs:max-w-xl">
          {isEnquiry ? (
            <>
              Thank you for your enquiry! Our team will review your request and
              get back to you within 24 hours via WhatsApp or email with a
              personalized quote. Please check your email for a confirmation of
              your enquiry details.
            </>
          ) : (
            <>
              Thank you for booking your tour with us! Please check your email
              for confirmation and all the details. Safe travels ahead!
            </>
          )}
        </p>
        <Link
          href="/packages"
          className="bg-primary text-white shadow hover:bg-eucalyptus-700 w-full xs:w-max px-8 py-3 rounded"
        >
          Browse More Packages
        </Link>
      </div>
      {/* Divider */}
      <div className="block w-full max-w-[calc(100%-2rem)] 5xl:max-w-[calc(100%-4rem)] h-[1px] bg-wild-sand-200 mx-auto mb-10 lg:mb-20"></div>
    </section>
  );
}
