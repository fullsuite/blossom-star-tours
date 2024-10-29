"use client";

import clsx from "clsx";
import React from "react";

interface ContentBlockProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string; // Optional className prop
}

export default function ContentBlock({
  title,
  description,
  icon,
  className,
}: ContentBlockProps) {
  return (
    <div
      className={clsx(
        "bg-white shadow-md rounded-lg p-6 mb-6 flex items-start space-x-4",
        className
      )}
    >
      <div className="flex items-center justify-center p-2 bg-primary rounded-full">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-bold text-primary mb-2">{title}</h4>
        <p className="text-body-light">{description}</p>
      </div>
    </div>
  );
}
