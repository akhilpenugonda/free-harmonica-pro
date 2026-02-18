import type { Metadata } from "next";
import { SONGS } from "@/lib/songs";
import { siteConfig } from "@/lib/siteConfig";
import SongList from "../components/SongList";

export const metadata: Metadata = {
  title: "Harmonica Songs - Free Interactive Tabs",
  description:
    "Learn famous songs on harmonica with free interactive tabs. Includes Twinkle Twinkle, Happy Birthday, Oh Susanna, Amazing Grace, Love Me Do, Piano Man and more. Beginner to advanced difficulty.",
  alternates: {
    canonical: `${siteConfig.url}/songs`,
  },
};

export default function SongsPage() {
  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Title */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="gradient-text">Song</span> Library
          </h1>
          <p className="text-muted max-w-lg mx-auto">
            Learn famous songs with interactive harmonica tabs. Follow along note
            by note at your own pace.
          </p>
        </div>

        <SongList songs={SONGS} />
      </div>
    </div>
  );
}
