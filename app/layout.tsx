import type { Metadata } from "next";
import { Onest, Space_Grotesk, Roboto, Playfair_Display, Inter } from "next/font/google";
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

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700", "900"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const BASE_URL = "https://airhydra.com";
const OG_IMAGE = "https://ik.imagekit.io/360t0n1jd9/airhydra/Airhydra%20DP%20Logo%20White.png";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "AirHydra — Premium In-Flight Hydrating Gel | Glow All Flight Long",
    template: "%s | AirHydra",
  },
  description:
    "AirHydra is a premium in-flight hydrating gel that keeps your skin fresh, dewy and radiant at altitude. Dermatologist-safe, TSA cabin-friendly, and fast-absorbing. Order now for fast nationwide delivery.",
  keywords: [
    "in-flight hydrating gel",
    "airplane skin care",
    "travel skincare",
    "cabin skin hydration",
    "flight moisturizer",
    "AirHydra",
    "skin care for travellers",
    "anti-puffiness gel",
    "TSA approved skincare",
    "long haul flight skin",
    "altitude skincare",
    "dewy skin on flights",
  ],
  authors: [{ name: "AirHydra", url: BASE_URL }],
  creator: "AirHydra",
  publisher: "AirHydra",
  category: "Beauty & Skincare",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "AirHydra",
    title: "AirHydra — Premium In-Flight Hydrating Gel | Glow All Flight Long",
    description:
      "Keep your skin fresh, dewy and radiant at altitude. AirHydra is the premium in-flight hydrating gel trusted by frequent flyers. TSA-friendly. Fast delivery.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "AirHydra — Glow All Flight Long",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@airhydra",
    creator: "@airhydra",
    title: "AirHydra — Premium In-Flight Hydrating Gel | Glow All Flight Long",
    description:
      "Keep your skin fresh, dewy and radiant at altitude. AirHydra is the premium in-flight hydrating gel trusted by frequent flyers.",
    images: [OG_IMAGE],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${onest.variable} ${spaceGrotesk.variable} ${roboto.variable} ${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#2E6EBB" />
        <link rel="canonical" href={BASE_URL} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
