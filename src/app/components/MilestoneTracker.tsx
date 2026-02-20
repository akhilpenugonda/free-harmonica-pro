"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { MILESTONES, type Milestone } from "@/lib/milestones";
import { getSongsCompleted } from "@/lib/progress";

const subscribe = () => () => {};
import {
  drawAchievementCard,
  downloadAchievementCard,
  shareAchievementCard,
} from "@/lib/achievementCard";

function AchievementPreview({
  milestone,
  songsCount,
  onClose,
}: {
  milestone: Milestone;
  songsCount: number;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = drawAchievementCard(milestone, songsCount);
    canvasRef.current = canvas;
    const container = containerRef.current;
    if (container) {
      container.innerHTML = "";
      canvas.style.width = "100%";
      canvas.style.height = "auto";
      canvas.style.borderRadius = "12px";
      container.appendChild(canvas);
    }
  }, [milestone, songsCount]);

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg rounded-2xl bg-card border border-card-border shadow-2xl p-6 animate-fade-in">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-muted hover:text-foreground transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Canvas preview */}
        <div ref={containerRef} className="mb-5 rounded-xl overflow-hidden" />

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => downloadAchievementCard(milestone, songsCount)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-semibold hover:bg-accent/20 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download
          </button>
          <button
            onClick={() => shareAchievementCard(milestone, songsCount)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors"
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
      </div>
    </div>
  );
}

export default function MilestoneTracker() {
  const [open, setOpen] = useState(false);
  const count = useSyncExternalStore(subscribe, getSongsCompleted, () => 0);
  const [previewMilestone, setPreviewMilestone] = useState<Milestone | null>(null);

  const unlocked = MILESTONES.filter((m) => count >= m.threshold).length;

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-2xl bg-card border border-card-border shadow-lg hover:border-accent/40 hover:shadow-accent/10 transition-all group"
      >
        <span className="text-xl">🏆</span>
        <span className="text-sm font-semibold">
          {unlocked}/{MILESTONES.length}
        </span>
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Slide-over panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-background border-l border-card-border shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-card-border">
            <div>
              <h2 className="text-lg font-bold">Milestones</h2>
              <p className="text-xs text-muted mt-0.5">
                {unlocked} of {MILESTONES.length} unlocked
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-muted hover:text-foreground transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between text-xs text-muted mb-2">
              <span>{count} songs completed</span>
              <span>{Math.round((unlocked / MILESTONES.length) * 100)}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full bg-linear-to-r from-accent to-accent-secondary transition-all duration-500"
                style={{ width: `${(unlocked / MILESTONES.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Milestone list */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-3">
            {MILESTONES.map((m) => {
              const isUnlocked = count >= m.threshold;
              return (
                <button
                  key={m.id}
                  onClick={() => isUnlocked && setPreviewMilestone(m)}
                  disabled={!isUnlocked}
                  className={`w-full text-left flex items-center gap-3 rounded-xl p-4 transition-all ${
                    isUnlocked
                      ? "bg-accent/10 border border-accent/20 hover:bg-accent/15 cursor-pointer"
                      : "bg-white/2 border border-card-border cursor-default"
                  }`}
                >
                  <div
                    className={`text-2xl shrink-0 transition-all ${
                      isUnlocked ? "" : "grayscale opacity-40"
                    }`}
                  >
                    {m.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className={`text-sm font-semibold leading-tight ${
                        isUnlocked ? "text-foreground" : "text-muted"
                      }`}
                    >
                      {m.title}
                    </div>
                    <div className="text-xs text-muted mt-0.5">
                      {isUnlocked ? m.message : `Complete ${m.threshold} songs`}
                    </div>
                  </div>
                  {isUnlocked ? (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                      </svg>
                    </div>
                  ) : (
                    <span className="text-xs text-muted shrink-0 tabular-nums">
                      {m.threshold - count} to go
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Achievement preview modal */}
      {previewMilestone && (
        <AchievementPreview
          milestone={previewMilestone}
          songsCount={count}
          onClose={() => setPreviewMilestone(null)}
        />
      )}
    </>
  );
}
