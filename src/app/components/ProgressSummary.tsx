"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { getSongsCompleted } from "@/lib/progress";
import { MILESTONES } from "@/lib/milestones";

const subscribe = () => () => {};

export default function ProgressSummary({ totalSongs }: { totalSongs: number }) {
  const count = useSyncExternalStore(subscribe, getSongsCompleted, () => 0);

  if (count === 0) return null;

  const pct = Math.round((count / totalSongs) * 100);
  const currentMilestone = [...MILESTONES]
    .reverse()
    .find((m) => count >= m.threshold);
  const nextMilestone = MILESTONES.find((m) => m.threshold > count);

  return (
    <Link
      href="/songs"
      className="glass rounded-2xl p-5 hover:border-accent/30 transition-all group block"
    >
      <div className="flex items-center gap-4">
        <div className="text-3xl">
          {currentMilestone?.emoji ?? "🎵"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-semibold">
              {count} {count === 1 ? "song" : "songs"} completed
            </span>
            <span className="text-xs text-muted">{pct}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-linear-to-r from-accent to-accent-secondary transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          {nextMilestone && (
            <p className="text-xs text-muted mt-1.5">
              {nextMilestone.threshold - count} more to unlock{" "}
              <span className="text-accent font-medium">
                {nextMilestone.emoji} {nextMilestone.title}
              </span>
            </p>
          )}
        </div>
        <svg
          className="w-5 h-5 text-muted group-hover:text-accent shrink-0 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
