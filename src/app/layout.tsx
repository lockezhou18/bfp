import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
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
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
