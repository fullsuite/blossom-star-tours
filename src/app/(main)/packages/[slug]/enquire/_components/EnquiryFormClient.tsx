'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { countries } from 'countries-list';
import { CalendarDays, Users, CircleUserRound, MapPin, Check, ChevronsUpDown } from 'lucide-react';

import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { DetailedTourPackage } from '@/lib/types/tour/package';
import { urlFor } from '@/sanity/lib/image';

// Popular hotels in Makkah and Madinah
const POPULAR_HOTELS = [
  // Makkah Hotels
  { value: 'swissotel-makkah', label: 'Swissotel Al Maqam Makkah', city: 'Makkah' },
  { value: 'fairmont-makkah', label: 'Fairmont Makkah Clock Tower', city: 'Makkah' },
  { value: 'hilton-makkah', label: 'Hilton Makkah Convention Hotel', city: 'Makkah' },
  { value: 'movenpick-makkah', label: 'Movenpick Hotel & Residence Hajar Tower Makkah', city: 'Makkah' },
  { value: 'pullman-zamzam-makkah', label: 'Pullman ZamZam Makkah', city: 'Makkah' },
  { value: 'conrad-makkah', label: 'Conrad Makkah', city: 'Makkah' },
  { value: 'raffles-makkah', label: 'Raffles Makkah Palace', city: 'Makkah' },
  { value: 'jabal-omar-hyatt', label: 'Jabal Omar Hyatt Regency Makkah', city: 'Makkah' },
  { value: 'dar-al-tawhid', label: 'Dar Al Tawhid Intercontinental', city: 'Makkah' },
  { value: 'sheraton-makkah', label: 'Sheraton Makkah Jabal Al Kaaba Hotel', city: 'Makkah' },
  // Madinah Hotels
  { value: 'oberoi-madinah', label: 'The Oberoi Madinah', city: 'Madinah' },
  { value: 'ritz-carlton-madinah', label: 'The Ritz-Carlton Madinah', city: 'Madinah' },
  { value: 'hilton-madinah', label: 'Hilton Madinah', city: 'Madinah' },
  { value: 'pullman-zamzam-madinah', label: 'Pullman Zamzam Madinah', city: 'Madinah' },
  { value: 'crowne-plaza-madinah', label: 'Crowne Plaza Madinah', city: 'Madinah' },
  { value: 'intercontinental-madinah', label: 'InterContinental Madinah - Dar Al Iman', city: 'Madinah' },
  { value: 'anwar-al-madinah', label: 'Anwar Al Madinah Movenpick', city: 'Madinah' },
  { value: 'shaza-madinah', label: 'Shaza Al Madinah', city: 'Madinah' },
  { value: 'dar-al-taqwa', label: 'Dar Al Taqwa Hotel Madinah', city: 'Madinah' },
  { value: 'millennium-madinah', label: 'Millennium Al Madinah Airport', city: 'Madinah' },
];

const SERVICE_TYPES = [
  { value: 'private', label: 'Private Tour' },
  { value: 'group', label: 'Group Tour' },
  { value: 'vip', label: 'VIP Experience' },
  { value: 'custom', label: 'Custom Package' },
];

interface EnquiryFormClientProps {
  packageDetails: DetailedTourPackage;
}

export default function EnquiryFormClient({ packageDetails }: EnquiryFormClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [hotelOpen, setHotelOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    country: '',
    whatsappNumber: '',
    saudiNumber: '',
    email: '',
    hotel: '',
    customHotel: '',
    numberOfMen: '',
    numberOfWomen: '',
    numberOfKids: '',
    serviceType: '',
  });

  // Get country list excluding Israel (IL)
  const countryList = useMemo(() => {
    return Object.entries(countries)
      .filter(([code]) => code !== 'IL')
      .map(([code, country]) => ({
        value: code,
        label: country.name,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  // Handle form field changes
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          packageId: packageDetails._id,
          packageName: packageDetails.name,
          packageSlug: packageDetails.slug.current,
          packageImage: packageImage,
          packageDuration: packageDetails.duration,
        }),
      });

      if (response.ok) {
        router.push('/thank-you?type=enquiry');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to submit enquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get first image for package display
  const packageImage = packageDetails.images?.[0]
    ? urlFor(packageDetails.images[0]).auto('format').quality(80).width(512).url()
    : null;

  // Get price range from groups
  const priceRange = packageDetails.groups?.length > 0
    ? {
        min: Math.min(...packageDetails.groups.map(g => g.standardPricing)),
        max: Math.max(...packageDetails.groups.map(g => g.premiumPricing || g.standardPricing)),
      }
    : null;

  return (
    <>
      <PageHeader title="Package Enquiry" />

      <section className="relative py-10 lg:py-20">
        <div className="container mx-auto">
          {/* Package Info Card */}
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-10">
            <p className="text-sm font-medium text-body-secondary mb-4">Selected Package</p>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Package Image */}
              {packageImage && (
                <div className="w-full md:w-64 h-48 md:h-40 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={packageImage}
                    alt={packageDetails.name}
                    width={256}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Package Details */}
              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
                  {packageDetails.name}
                </h2>
                <p className="text-body-secondary mb-4 line-clamp-2">
                  {packageDetails.description}
                </p>

                {/* Package Features */}
                <div className="flex flex-wrap gap-4 md:gap-6">
                  {packageDetails.duration && (
                  <div className="flex items-center gap-2">
                    <CalendarDays strokeWidth={1.5} className="h-5 w-5 text-accent-pink" />
                    <span className="text-sm text-body-secondary">{packageDetails.duration}</span>
                  </div>
                  )}
                  {packageDetails.maxPeople && (
                    <div className="flex items-center gap-2">
                      <Users strokeWidth={1.5} className="h-5 w-5 text-accent-pink" />
                      <span className="text-sm text-body-secondary">Max {packageDetails.maxPeople} people</span>
                    </div>
                  )}
                  {packageDetails.minAge && (
                    <div className="flex items-center gap-2">
                      <CircleUserRound strokeWidth={1.5} className="h-5 w-5 text-accent-pink" />
                      <span className="text-sm text-body-secondary">Min age {packageDetails.minAge}+</span>
                    </div>
                  )}
                  {packageDetails.pickup && (
                    <div className="flex items-center gap-2">
                      <MapPin strokeWidth={1.5} className="h-5 w-5 text-accent-pink" />
                      <span className="text-sm text-body-secondary">{packageDetails.pickup}</span>
                    </div>
                  )}
                </div>

                {/* Price Range */}
                {priceRange && (
                  <div className="mt-4">
                    <span className="text-lg font-bold text-primary">
                      From ${priceRange.min.toLocaleString()}
                    </span>
                    {priceRange.min !== priceRange.max && (
                      <span className="text-body-secondary"> - ${priceRange.max.toLocaleString()}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
                Enquire About This Package
              </h3>
              <p className="text-body-secondary">
                Fill out the form below and our team will get back to you with a personalized quote and all the details you need.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
                <h4 className="text-lg font-bold text-body mb-4">Personal Information</h4>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    required
                    className="h-12"
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 16)).toISOString().split('T')[0]}
                  />
                  <p className="text-sm text-body-light">You must be at least 16 years old to make a booking</p>
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <Label>Country *</Label>
                  <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={countryOpen}
                        className="w-full h-12 justify-between font-normal"
                      >
                        {formData.country
                          ? countryList.find((c) => c.value === formData.country)?.label
                          : "Select your country..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search country..." />
                        <CommandList>
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandGroup>
                            {countryList.map((country) => (
                              <CommandItem
                                key={country.value}
                                value={country.label}
                                onSelect={() => {
                                  handleChange('country', country.value);
                                  setCountryOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.country === country.value ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {country.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
                <h4 className="text-lg font-bold text-body mb-4">Contact Information</h4>

                {/* WhatsApp Number */}
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={formData.whatsappNumber}
                    onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                {/* Saudi Number */}
                <div className="space-y-2">
                  <Label htmlFor="saudiNumber">Local Saudi Number (if available)</Label>
                  <Input
                    id="saudiNumber"
                    type="tel"
                    placeholder="+966 XX XXX XXXX"
                    value={formData.saudiNumber}
                    onChange={(e) => handleChange('saudiNumber', e.target.value)}
                    className="h-12"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
              </div>

              {/* Accommodation */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
                <h4 className="text-lg font-bold text-body mb-4">Accommodation</h4>

                {/* Hotel Selection */}
                <div className="space-y-2">
                  <Label>Hotel</Label>
                  <Popover open={hotelOpen} onOpenChange={setHotelOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={hotelOpen}
                        className="w-full h-12 justify-between font-normal"
                      >
                        {formData.hotel
                          ? POPULAR_HOTELS.find((h) => h.value === formData.hotel)?.label || formData.customHotel
                          : "Select or type your hotel..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput
                          placeholder="Search or type hotel name..."
                          onValueChange={(value) => {
                            // If user types something not in list, store it as custom
                            const matchingHotel = POPULAR_HOTELS.find(
                              h => h.label.toLowerCase().includes(value.toLowerCase())
                            );
                            if (!matchingHotel && value) {
                              handleChange('customHotel', value);
                              handleChange('hotel', 'custom');
                            }
                          }}
                        />
                        <CommandList>
                          <CommandEmpty>
                            <div className="p-2 text-sm text-body-secondary">
                              No hotel found. Your input will be used as the hotel name.
                            </div>
                          </CommandEmpty>
                          <CommandGroup heading="Makkah Hotels">
                            {POPULAR_HOTELS.filter(h => h.city === 'Makkah').map((hotel) => (
                              <CommandItem
                                key={hotel.value}
                                value={hotel.label}
                                onSelect={() => {
                                  handleChange('hotel', hotel.value);
                                  handleChange('customHotel', '');
                                  setHotelOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.hotel === hotel.value ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {hotel.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          <CommandGroup heading="Madinah Hotels">
                            {POPULAR_HOTELS.filter(h => h.city === 'Madinah').map((hotel) => (
                              <CommandItem
                                key={hotel.value}
                                value={hotel.label}
                                onSelect={() => {
                                  handleChange('hotel', hotel.value);
                                  handleChange('customHotel', '');
                                  setHotelOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.hotel === hotel.value ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {hotel.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <p className="text-sm text-body-light">
                    Select from popular hotels or type your own hotel name
                  </p>
                </div>
              </div>

              {/* Group Details */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
                <h4 className="text-lg font-bold text-body mb-4">Group Details</h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Number of Men */}
                  <div className="space-y-2">
                    <Label htmlFor="men">Number of Men *</Label>
                    <Input
                      id="men"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={formData.numberOfMen}
                      onChange={(e) => handleChange('numberOfMen', e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>

                  {/* Number of Women */}
                  <div className="space-y-2">
                    <Label htmlFor="women">Number of Women *</Label>
                    <Input
                      id="women"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={formData.numberOfWomen}
                      onChange={(e) => handleChange('numberOfWomen', e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>

                  {/* Number of Kids */}
                  <div className="space-y-2">
                    <Label htmlFor="kids">Number of Kids</Label>
                    <Input
                      id="kids"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={formData.numberOfKids}
                      onChange={(e) => handleChange('numberOfKids', e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>

                {/* Total People Display */}
                {(formData.numberOfMen || formData.numberOfWomen || formData.numberOfKids) && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-body-secondary">
                      Total Group Size: <span className="font-bold text-primary">
                        {(parseInt(formData.numberOfMen) || 0) +
                         (parseInt(formData.numberOfWomen) || 0) +
                         (parseInt(formData.numberOfKids) || 0)} people
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Service Type */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
                <h4 className="text-lg font-bold text-body mb-4">Service Preference</h4>

                <div className="space-y-2">
                  <Label>Type of Service *</Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) => handleChange('serviceType', value)}
                    required
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select service type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-bold"
                >
                  {isSubmitting ? 'Submitting Enquiry...' : 'Submit Enquiry'}
                </Button>
                <p className="text-center text-sm text-body-light mt-4">
                  By submitting this form, you agree to be contacted by our team regarding your enquiry.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full max-w-[calc(100%-2rem)] 5xl:max-w-[calc(100%-4rem)] h-[1px] bg-wild-sand-200 mx-auto mb-10 lg:mb-20"></div>
    </>
  );
}
