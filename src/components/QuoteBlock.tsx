"use client";

import React from "react";

interface Quote {
  content: string; // This will be the HTML string with possible bold content
  author: string;
}

interface QuoteProps {
  quote: Quote;
}

export default function QuoteBlock({ quote }: QuoteProps) {
  return (
    <div className="text-center py-10 px-4 lg:py-20 lg:px-0 bg-white container max-w-2xl">
      {/* Render content with HTML, ensuring styling */}
      <div
        className="text-3xl lg:text-5xl font-medium text-eucalyptus-600 leading-snug mb-4 lg:leading-snug"
        dangerouslySetInnerHTML={{ __html: quote.content }}
      />
      {/* Render author */}
      <p className="text-lg text-gray-600 mt-4">{quote.author}</p>
    </div>
  );
}
