import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Harmonica Pro - Learn Harmonica for Free",
    template: "%s | Harmonica Pro",
  },
  description:
    "The first ever completely free harmonica learning platform. Practice single notes with real-time pitch detection, learn famous songs with interactive tabs, and master the 10-hole diatonic harmonica.",
  keywords: [
    "harmonica",
    "learn harmonica",
    "free harmonica lessons",
    "harmonica tabs",
    "harmonica practice",
    "harmonica songs",
    "diatonic harmonica",
    "harmonica tuner",
    "harmonica pitch detection",
    "10 hole harmonica",
    "harmonica for beginners",
    "harmonica notes",
    "harmonica note chart",
    "play harmonica online",
    "harmonica key of C",
    "blow draw harmonica",
    "harmonica exercises",
    "learn harmonica free",
    "harmonica app",
    "harmonica scales",
  ],
  authors: [{ name: "Harmonica Pro" }],
  creator: "Harmonica Pro",
  publisher: "Harmonica Pro",
  metadataBase: new URL("https://harmonica-pro-iota.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Harmonica Pro",
    title: "Harmonica Pro - Learn Harmonica for Free",
    description:
      "The first ever completely free harmonica learning platform. Real-time pitch detection, famous song tabs, and interactive practice tools.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Harmonica Pro - Learn Harmonica for Free",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harmonica Pro - Learn Harmonica for Free",
    description:
      "The first ever completely free harmonica learning platform. Real-time pitch detection, famous song tabs, and interactive practice tools.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://harmonica-pro-iota.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0b1120" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Header />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
