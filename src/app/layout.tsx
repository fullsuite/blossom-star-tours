import type { Metadata } from "next";
import "./globals.css";

import { Nunito } from "next/font/google";
const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blossom Star | Embark on a Journey of Faith, Experience, and Discovery",
  description: "Embark on a Journey of Faith, Experience, and Discovery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
