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
  title: "BFP Invest — AI-Powered Real Estate Opportunities",
  description:
    "Simple, stable, fast platform for smart decision and process",
  openGraph: {
    title: "BFP Invest — AI-Powered Real Estate Opportunities",
    description:
      "Simple, stable, fast platform for smart decision and process",
    url: "https://bfp-invest.local",
    siteName: "BFP Invest",
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
