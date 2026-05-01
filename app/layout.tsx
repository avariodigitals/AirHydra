import type { Metadata } from "next";
import { Onest, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "AirHydra — Glow All Flight Long",
  description: "Premium In-Flight Hydrating Gel Designed To Keep Your Skin Fresh, Dewy & Radiant At Altitude.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${onest.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
