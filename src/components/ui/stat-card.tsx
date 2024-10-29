import React from "react";
import clsx from "clsx";

interface StatCardProps {
  value: string;
  label: string;
  variant?: "light" | "dark";
  className?: string; // Accept custom className for overrides
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  variant = "light",
  className, // Allow passing custom className
}) => {
  const baseClasses = "p-5 md:p-6  rounded-lg flex flex-col text-left min-h-full"; // Align text left and keep flexible size

  // Define variant-specific styles for light and dark modes
  const variantClasses = {
    light: "bg-white text-primary", // Light variant
    dark: "bg-primary text-white", // Dark variant
  };

  return (
    <div className={clsx(baseClasses, variantClasses[variant], className)}>
      <p className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-0 lg:mt-12 mb-1">{value}</p>
      <p className="text-sm sm:text-base sm:mb-2 w-max lg:w-36">{label}</p>
    </div>
  );
};
