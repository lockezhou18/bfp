import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stairway Invest — 8% Fixed Savings Account",
  description:
    "Invest in real estate at scale. Fixed 8% interest savings-style account with daily accrual.",
  openGraph: {
    title: "Stairway Invest — 8% Fixed Savings Account",
    description:
      "Invest in real estate at scale. Fixed 8% interest savings-style account with daily accrual.",
    url: "https://stairway-invest.local",
    siteName: "Stairway Invest",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
