import type { MetadataRoute } from "next";
import { SONGS } from "@/lib/songs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://harmonica-pro-iota.vercel.app";

  const songPages = SONGS.map((song) => ({
    url: `${baseUrl}/songs/${song.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/practice`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/songs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reference`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...songPages,
  ];
}
