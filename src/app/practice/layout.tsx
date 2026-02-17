import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Practice Harmonica - Free Pitch Detection & Exercises",
  description:
    "Practice harmonica with real-time pitch detection using your microphone. Free play mode, scales, sequences, and exercises for all skill levels. Instant visual feedback on your tuning.",
  alternates: {
    canonical: `${siteConfig.url}/practice`,
  },
};

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
