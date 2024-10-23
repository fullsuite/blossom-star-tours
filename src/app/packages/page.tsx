import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import PackageCard from "@/components/PackageCard";

// Define the Package type
interface Package {
  imageUrl: string;
  title: string;
  description: string;
  price: string;
  rating: number;
  duration: string;
}

// Define an array of packages
const packages: Package[] = [
  {
    imageUrl: "https://picsum.photos/400/300",
    title: "Umrah and Hotel Package",
    description:
      "Experience a spiritually fulfilling Umrah journey with our comprehensive package, including premium accommodations and guided tours.",
    price: "$9,999",
    rating: 4.4,
    duration: "10 days",
  },
  {
    imageUrl: "https://picsum.photos/400/300?random=1",
    title: "Full Package",
    description:
      "Immerse yourself in the heart of Islamic history with our full package, offering a balanced mix of spiritual and cultural experiences.",
    price: "$4,999",
    rating: 4.4,
    duration: "4 days",
  },
  {
    imageUrl: "https://picsum.photos/400/300?random=2",
    title: "Extreme Tour",
    description:
      "Embark on an adventurous journey with our Extreme Tour, featuring thrilling activities that blend excitement with cultural discovery.",
    price: "$4,999",
    rating: 4.4,
    duration: "2 days",
  },
];

export default function PackagesPage() {
  return (
    <div className="">
      <PageHeader title="Our Packages" />
      <section className="py-10 lg:py-20 bg-white">
        <div className="container mx-auto text-center">
          {/* Section Heading */}
          <h2 className="text-3xl lg:text-5xl font-bold text-green-800 mb-6">
            Choose Your Unique Experience
          </h2>
          <p className="text-gray-600 text-lg mb-10">Our Featured Packages</p>

          {/* Package Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <PackageCard
                key={index}
                imageUrl={pkg.imageUrl}
                title={pkg.title}
                description={pkg.description}
                price={pkg.price}
                rating={pkg.rating}
                duration={pkg.duration}
              />
            ))}
          </div>

          {/* View All Packages Button */}
          <Button className="mt-8 bg-green-700 text-white px-6 py-2 rounded-md shadow hover:bg-green-800">
            View all our Packages
          </Button>
        </div>
      </section>
    </div>
  );
}
