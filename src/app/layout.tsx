import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PWAInstall from "./components/PWAInstall";
import { siteConfig } from "@/lib/siteConfig";

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
    default: `${siteConfig.name} - Learn Harmonica for Free`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "harmonica",
    "learn harmonica",
    "free harmonica",
    "free harmonica lessons",
    "harmonica tabs",
    "harmonica practice",
    "harmonica songs",
    "diatonic harmonica",
    "harmonica tuner",
    "chromatic tuner",
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
    "free harmonica app",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: `${siteConfig.name} - Learn Harmonica for Free`,
    description: siteConfig.ogDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Learn Harmonica for Free`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Learn Harmonica for Free`,
    description: siteConfig.ogDescription,
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
    canonical: siteConfig.url,
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
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <meta name="theme-color" content="#0b1120" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={siteConfig.name} />
        {siteConfig.gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${siteConfig.gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <PWAInstall />
        <Analytics />
      </body>
    </html>
  );
}
