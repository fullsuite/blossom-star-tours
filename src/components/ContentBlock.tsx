"use client";

interface ContentBlockProps {
  title: string;
  description: string;
  icon: string;
}

export default function ContentBlock({
  title,
  description,
  icon,
}: ContentBlockProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex items-start space-x-4">
      <div className="text-green-800 text-3xl">{icon}</div>
      <div>
        <h4 className="text-lg font-bold text-green-800 mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
