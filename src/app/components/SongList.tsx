"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Song } from "@/lib/songs";
import { siteConfig } from "@/lib/siteConfig";

const difficultyColors: Record<Song["difficulty"], string> = {
  Beginner: "bg-success/15 text-success border-success/30",
  Intermediate: "bg-warning/15 text-warning border-warning/30",
  Advanced: "bg-danger/15 text-danger border-danger/30",
};

const difficultyLabel: Record<Song["difficulty"], { label: string; color: string }> = {
  Beginner: { label: "Beginner", color: "text-success" },
  Intermediate: { label: "Intermediate", color: "text-warning" },
  Advanced: { label: "Advanced", color: "text-danger" },
};

const SONG_REQUEST_URL = `${siteConfig.githubUrl}/issues/new?template=song_request.md&title=%5BSong+Request%5D+`;

export default function SongList({ songs }: { songs: Song[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return songs;
    const q = query.toLowerCase();
    return songs.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q) ||
        s.genre.toLowerCase().includes(q)
    );
  }, [songs, query]);

  const grouped = useMemo(() => {
    const order: Song["difficulty"][] = ["Beginner", "Intermediate", "Advanced"];
    return order
      .map((d) => ({
        ...difficultyLabel[d],
        songs: filtered.filter((s) => s.difficulty === d),
      }))
      .filter((g) => g.songs.length > 0);
  }, [filtered]);

  return (
    <>
      {/* Search */}
      <div className="max-w-md mx-auto mb-10 animate-fade-in">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by song, artist, or genre..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-card-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-muted hover:text-foreground transition-colors"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {grouped.length > 0 ? (
        grouped.map((section) => (
          <div key={section.label} className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 ${section.color}`}>
              {section.label}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.songs.map((song) => (
                <Link
                  key={song.id}
                  href={`/songs/${song.id}`}
                  className="glass rounded-xl p-6 hover:border-accent/30 transition-all group hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold group-hover:text-accent transition-colors leading-tight">
                      {song.title}
                    </h3>
                    <span
                      className={`shrink-0 ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                        difficultyColors[song.difficulty]
                      }`}
                    >
                      {song.difficulty}
                    </span>
                  </div>

                  <p className="text-sm text-muted mb-3">{song.artist}</p>
                  <p className="text-xs text-muted/70 leading-relaxed line-clamp-2">
                    {song.description}
                  </p>

                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-card-border">
                    <span className="text-xs text-muted">
                      {song.tabs.length} notes
                    </span>
                    <span className="text-xs text-muted">{song.bpm} BPM</span>
                    <span className="text-xs text-muted/60 px-2 py-0.5 bg-card rounded-full">
                      {song.genre}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="glass rounded-2xl p-10 text-center animate-fade-in">
          <div className="text-4xl mb-4">&#127925;</div>
          <h2 className="text-xl font-bold mb-2">
            No songs found for &ldquo;{query}&rdquo;
          </h2>
          <p className="text-muted mb-6 max-w-md mx-auto">
            This song might come soon &mdash; stay tuned! Or let us know what
            you&apos;d like to play and we&apos;ll add it.
          </p>
          <a
            href={`${SONG_REQUEST_URL}${encodeURIComponent(query)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:scale-105 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            Request This Song on GitHub
          </a>
        </div>
      )}
    </>
  );
}
