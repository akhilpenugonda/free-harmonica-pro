"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";
import type { Milestone } from "@/lib/milestones";
import {
  getNewMilestone,
  markMilestoneShown,
  getSongsCompleted,
} from "@/lib/progress";
import {
  downloadAchievementCard,
  shareAchievementCard,
} from "@/lib/achievementCard";

export default function MilestoneBanner() {
  const [milestone, setMilestone] = useState<Milestone | null>(() =>
    getNewMilestone(),
  );
  const [songsCount] = useState(() => getSongsCompleted());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (milestone) {
      requestAnimationFrame(() => setVisible(true));
    }
  }, [milestone]);

  const dismiss = () => {
    setVisible(false);
    if (milestone) {
      markMilestoneShown(milestone.id);
    }
    setTimeout(() => setMilestone(null), 300);
  };

  const saveAsImage = useCallback(() => {
    if (!milestone) return;
    downloadAchievementCard(milestone, songsCount);
  }, [milestone, songsCount]);

  const share = useCallback(() => {
    if (!milestone) return;
    shareAchievementCard(milestone, songsCount);
  }, [milestone, songsCount]);

  if (!milestone) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Card */}
      <div
        className={`relative w-full max-w-md rounded-2xl bg-card border border-card-border shadow-2xl p-8 text-center transition-all duration-300 ${
          visible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Decorative dots */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-accent animate-bounce"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>

        {/* Emoji */}
        <div className="text-6xl mb-4">{milestone.emoji}</div>

        {/* Title */}
        <h2 className="text-2xl font-bold gradient-text mb-2">
          {milestone.title}
        </h2>

        {/* Message */}
        <p className="text-muted mb-2">{milestone.message}</p>

        {/* Stats */}
        <p className="text-sm text-accent font-semibold mb-6">
          {songsCount} {songsCount === 1 ? "song" : "songs"} completed
        </p>

        {/* Save / Share */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <button
            onClick={saveAsImage}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-semibold hover:bg-accent/20 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Save
          </button>
          <button
            onClick={share}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-semibold hover:bg-accent/20 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-card-border pt-5 mb-5">
          <p className="text-sm text-muted mb-4">
            Enjoying {siteConfig.name}? A small coffee helps us add more songs
            and keep everything free.
          </p>
          <a
            href={siteConfig.buyMeACoffee}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-3"
          >
            <Image
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
              width={217}
              height={60}
              className="h-11 w-auto"
              unoptimized
            />
          </a>
        </div>

        {/* Dismiss */}
        <button
          onClick={dismiss}
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          Continue Playing
        </button>
      </div>
    </div>
  );
}
