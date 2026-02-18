// Central site configuration — all branding and URLs read from environment variables.
// See .env.example for the full list of variables.

const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN || "localhost:3000";
const protocol = domain.startsWith("localhost") ? "http" : "https";

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Free Harmonica",
  domain,
  url: `${protocol}://${domain}`,
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  description:
    "The first ever completely free harmonica learning platform. Practice single notes with real-time pitch detection, learn famous songs with interactive tabs, and master the 10-hole diatonic harmonica.",
  shortDescription:
    "The first ever completely free harmonica learning platform.",
  ogDescription:
    "The first ever completely free harmonica learning platform. Real-time pitch detection, chromatic tuner, famous song tabs, and interactive practice tools.",
  buyMeACoffee: "https://buymeacoffee.com/akhilp",
  githubUrl: "https://github.com/akhilpenugonda/free-harmonica-pro",
} as const;
