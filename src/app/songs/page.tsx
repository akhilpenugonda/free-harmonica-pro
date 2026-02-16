import Link from "next/link";
import { SONGS } from "@/lib/songs";

const difficultyColors = {
  Beginner: "bg-success/15 text-success border-success/30",
  Intermediate: "bg-warning/15 text-warning border-warning/30",
  Advanced: "bg-danger/15 text-danger border-danger/30",
};

export default function SongsPage() {
  const beginnerSongs = SONGS.filter((s) => s.difficulty === "Beginner");
  const intermediateSongs = SONGS.filter((s) => s.difficulty === "Intermediate");
  const advancedSongs = SONGS.filter((s) => s.difficulty === "Advanced");

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

        {/* Song sections by difficulty */}
        {[
          { label: "Beginner", songs: beginnerSongs, color: "text-success" },
          { label: "Intermediate", songs: intermediateSongs, color: "text-warning" },
          { label: "Advanced", songs: advancedSongs, color: "text-danger" },
        ].map((section) => (
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
                      className={`flex-shrink-0 ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
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
                    <span className="text-xs text-muted">
                      {song.bpm} BPM
                    </span>
                    <span className="text-xs text-muted/60 px-2 py-0.5 bg-card rounded-full">
                      {song.genre}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
