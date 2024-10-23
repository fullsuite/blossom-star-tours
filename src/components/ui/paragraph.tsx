import React from "react";
import clsx from "clsx";

interface ParagraphProps {
  variant?: "default" | "eyebrow"; // Make variant optional, as it will have a default value
  className?: string; // To accept additional classes
  children: React.ReactNode;
}

export const Paragraph: React.FC<ParagraphProps> = ({
  variant = "default",
  className,
  children,
}) => {
  const baseClasses = "text-gray-600"; // Common styles for all paragraphs

  // Styles for different variants
  const variantClasses = {
    default: "text-base md:text-lg lg:text-xl", // Regular paragraph text
    eyebrow: "text-sm uppercase tracking-wider text-green-600 mb-2", // Special eyebrow styling
  };

  return (
    <p className={clsx(baseClasses, variantClasses[variant], className)}>
      {children}
    </p>
  );
};
