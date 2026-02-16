import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Harmonica Pro - Learn Harmonica for Free",
  description:
    "The first ever completely free harmonica learning platform. Practice single notes, learn famous songs, and master the harmonica with interactive tools.",
  keywords: [
    "harmonica",
    "learn harmonica",
    "free",
    "practice",
    "songs",
    "tabs",
    "diatonic",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
