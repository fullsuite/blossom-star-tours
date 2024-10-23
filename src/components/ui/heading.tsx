import React from "react";
import clsx from "clsx";

interface HeadingProps {
  variant: "page" | "section";
  level?: 1 | 2 | 3 | 4 | 5 | 6; // Optional level prop, defaults to 2
  className?: string; // To accept additional classes
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  variant,
  level = 2,
  className,
  children,
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements; // Dynamically choose the heading level (h1, h2, etc.)

  const baseClasses = "font-bold text-green-800"; // Common styles for all headings

  // Styles for different variants
  const variantClasses = {
    page: "text-4xl md:text-5xl lg:text-6xl", // Styles for page-level heading
    section: "text-2xl md:text-3xl lg:text-4xl", // Styles for section-level heading
  };

  return (
    <Tag className={clsx(baseClasses, variantClasses[variant], className)}>
      {children}
    </Tag>
  );
};
