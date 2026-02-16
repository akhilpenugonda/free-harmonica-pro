import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Harmonica Note Chart - Complete Reference for Key of C",
  description:
    "Interactive note chart for 10-hole diatonic harmonica in the key of C. See all blow and draw notes, frequencies, and hole positions. Click any hole to hear details. Free reference guide for beginners.",
  alternates: {
    canonical: "https://harmonica-pro-iota.vercel.app/reference",
  },
};

export default function ReferenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
