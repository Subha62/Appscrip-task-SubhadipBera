import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),

  title: {
    default: "Discover Our Products | Appscrip",
    template: "%s | Appscrip",
  },

  description:
    "Explore our collection of thoughtfully designed products with easy search, filtering, sorting, and pagination.",

  keywords: [
    "products",
    "ecommerce",
    "online shopping",
    "Appscrip",
    "product listing",
  ],

  alternates: {
    canonical: "/products",
  },

  openGraph: {
    title: "Discover Our Products | Appscrip",
    description:
      "Explore our collection of thoughtfully designed products with easy search, filtering, and sorting.",
    type: "website",
    url: "/products",
    siteName: "Appscrip",
  },

  twitter: {
    card: "summary_large_image",
    title: "Discover Our Products | Appscrip",
    description:
      "Explore our collection of thoughtfully designed products.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}