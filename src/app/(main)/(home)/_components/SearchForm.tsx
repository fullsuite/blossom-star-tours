"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, Clock, Sparkles, UsersRound, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

const DURATION_OPTIONS = [
  { value: "half-day", label: "Half Day" },
  { value: "full-day", label: "Full Day" },
  { value: "multi-day", label: "Multi-Day" },
];

const CATEGORY_OPTIONS = [
  { value: "spiritual", label: "Spiritual" },
  { value: "historical", label: "Historical" },
  { value: "adventure", label: "Adventure" },
  { value: "relaxing", label: "Relaxing" },
  { value: "cultural", label: "Cultural" },
  { value: "nature", label: "Nature" },
  { value: "family", label: "Family-Friendly" },
];

const GUEST_OPTIONS = [
  { value: "1-2", label: "1-2 Guests" },
  { value: "3-5", label: "3-5 Guests" },
  { value: "6-10", label: "6-10 Guests" },
  { value: "11+", label: "11+ Guests" },
];

export default function SearchForm() {
  const router = useRouter();
  const [duration, setDuration] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [guests, setGuests] = useState("");

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build query params
    const params = new URLSearchParams();
    if (duration && duration !== "any") params.set("duration", duration);
    if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","));
    if (guests && guests !== "any") params.set("guests", guests);

    // Navigate to packages page with filters
    const queryString = params.toString();
    router.push(`/packages${queryString ? `?${queryString}` : ""}`);
  };

  const getCategoryButtonLabel = () => {
    if (selectedCategories.length === 0) return "Any type";
    if (selectedCategories.length === 1) {
      return CATEGORY_OPTIONS.find((c) => c.value === selectedCategories[0])?.label || "1 selected";
    }
    return `${selectedCategories.length} selected`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg flex flex-1 flex-col lg:flex-row items-stretch lg:items-center space-y-0 overflow-hidden"
    >
      <div className="py-6 px-6 lg:py-4 flex flex-col lg:flex-row items-center gap-5 flex-1">
        {/* Duration Dropdown */}
        <div className="flex-1 w-full flex flex-col gap-y-1">
          <div className="flex gap-1">
            <Clock
              width={16}
              height={16}
              strokeWidth={1.5}
              className="text-accent-pink"
            />
            <label className="block text-sm font-bold text-body">
              Duration
            </label>
          </div>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger className="w-full border-none shadow-none p-0 h-auto py-2 text-sm focus:ring-0">
              <SelectValue placeholder="Any duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any duration</SelectItem>
              {DURATION_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Multi-Select Dropdown */}
        <div className="flex-1 w-full flex flex-col gap-y-1">
          <div className="flex gap-1">
            <Sparkles
              width={16}
              height={16}
              strokeWidth={1.5}
              className="text-accent-pink"
            />
            <label className="block text-sm font-bold text-body">
              Experience Type
            </label>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between border-none shadow-none p-0 h-auto py-2 text-sm font-normal hover:bg-transparent"
              >
                <span>{getCategoryButtonLabel()}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="start">
              <div className="flex flex-col gap-1">
                {CATEGORY_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedCategories.includes(option.value)}
                      onCheckedChange={() => toggleCategory(option.value)}
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests Dropdown */}
        <div className="flex-1 w-full flex flex-col gap-y-1">
          <div className="flex gap-1">
            <UsersRound
              width={16}
              height={16}
              strokeWidth={1.5}
              className="text-accent-pink"
            />
            <label className="block text-sm font-bold text-body">
              Group Size
            </label>
          </div>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="w-full border-none shadow-none p-0 h-auto py-2 text-sm focus:ring-0">
              <SelectValue placeholder="Any size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any size</SelectItem>
              {GUEST_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <button
        type="submit"
        className="bg-eucalyptus-600 text-white px-6 py-4 lg:px-12 lg:py-4 shadow hover:bg-eucalyptus-700 transition h-full flex flex-col justify-center space-y-2 items-center w-full lg:w-auto"
      >
        <SearchIcon className="h-4 aspect-square" />
        <p className="text-base tracking-tight font-bold">Search now</p>
      </button>
    </form>
  );
}
