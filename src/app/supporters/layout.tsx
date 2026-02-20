import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Supporters - Free Harmonica",
  description:
    "Meet the amazing people who keep Free Harmonica free for everyone. Join our supporters and help us add more songs and features.",
  alternates: {
    canonical: `${siteConfig.url}/supporters`,
  },
};

export default function SupportersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
