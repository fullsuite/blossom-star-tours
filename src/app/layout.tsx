import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

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
        <Navbar />
        <div className="pt-24">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
