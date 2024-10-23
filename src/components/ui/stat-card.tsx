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
  const baseClasses = "p-6 rounded-lg h-fit flex flex-col text-left"; // Align text left and keep flexible size

  // Define variant-specific styles for light and dark modes
  const variantClasses = {
    light: "bg-white text-eucalyptus-600", // Light variant
    dark: "bg-eucalyptus-600 text-white", // Dark variant
  };

  return (
    <div className={clsx(baseClasses, variantClasses[variant], className)}>
      <p className="text-5xl font-bold mt-12">{value}</p>
      <p className="text-base">{label}</p>
    </div>
  );
};
