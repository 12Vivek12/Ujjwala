import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Ujjwala Makeover | Gorakhpur ki Best Home Services",
  description: "Ujjwala Makeover - Gorakhpur mein Salon aur Beauty services ab aapke doorstep par. Bharosemand aur asaan booking.",
};

import { SEOHandler } from "@/components/layout/SEOHandler";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        <SEOHandler />
        <Navbar />
        <main className="flex-grow pb-24 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
