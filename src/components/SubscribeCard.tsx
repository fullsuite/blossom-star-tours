"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SubscribeCard() {
  return (
    <div className="bg-gray-100 p-8 rounded-lg flex flex-col justify-center h-full">
      <h3 className="text-3xl lg:text-4xl font-bold text-green-800 mb-4">
        Don't Miss out on our Exclusive Offers
      </h3>
      <p className="text-lg text-gray-600 mb-6">
        Stay up to date with our latest information, offers, and more.
      </p>
      <div className="flex items-center space-x-2">
        <Input
          type="email"
          placeholder="Your email address"
          className="w-full p-3 rounded-md"
        />
        <Button
          variant="default"
          className="bg-green-700 text-white px-6 py-3 rounded-md"
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
}
