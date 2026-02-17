import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Free Chromatic Tuner - Tune Any Instrument Online",
  description:
    "Full-screen chromatic tuner with real-time pitch detection. See the note you're playing as a large letter with a precision deviation wheel. Supports sharp and flat notation. Free, no downloads required.",
  alternates: {
    canonical: `${siteConfig.url}/tuner`,
  },
};

export default function TunerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
