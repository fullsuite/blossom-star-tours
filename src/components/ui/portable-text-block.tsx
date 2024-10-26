// src/components/PortableTextComponent.tsx
import { PortableText } from "@portabletext/react";

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-body-secondary text-sm sm:text-base">{children}</p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mb-4 text-primary">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl lg:text-5xl leading-snug lg:leading-snug font-semibold text-primary">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-medium mb-2 text-primary">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-medium mb-2 text-primary">{children}</h4>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 text-body-secondary">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 text-body-secondary">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => (
      <a href={value.href} className="text-blue-500 underline">
        {children}
      </a>
    ),
  },
};

interface PortableTextComponentProps {
  value: any;
  className?: string;
}

export default function PortableTextBlock({
  value,
  className = "",
}: PortableTextComponentProps) {
  return (
    <div className={className}>
      <PortableText value={value} components={portableTextComponents} />
    </div>
  );
}
