"use client";

import { useState } from "react";
import HarmonicaVisual from "../components/HarmonicaVisual";
import { getNoteForHole, getBlowNotes, getDrawNotes } from "@/lib/harmonicaData";

export default function ReferencePage() {
  const [activeHole, setActiveHole] = useState<number | null>(null);
  const [activeAction, setActiveAction] = useState<"blow" | "draw" | null>(null);

  const blowNotes = getBlowNotes();
  const drawNotes = getDrawNotes();

  const handleHoleClick = (hole: number, action: "blow" | "draw") => {
    if (activeHole === hole && activeAction === action) {
      setActiveHole(null);
      setActiveAction(null);
    } else {
      setActiveHole(hole);
      setActiveAction(action);
    }
  };

  const selectedNote =
    activeHole && activeAction
      ? getNoteForHole(activeHole, activeAction)
      : null;

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Title */}
        <div className="text-center mb-10 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="gradient-text">Note</span> Reference Chart
          </h1>
          <p className="text-muted max-w-lg mx-auto">
            Complete note layout for a standard 10-hole diatonic harmonica in the
            key of C. Click any hole to see its details.
          </p>
        </div>

        {/* Interactive Harmonica */}
        <div className="glass rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in">
          <h2 className="text-lg font-semibold mb-6 text-center">
            Click a hole to explore
          </h2>
          <HarmonicaVisual
            activeHole={activeHole}
            activeAction={activeAction}
            onHoleClick={handleHoleClick}
            interactive
          />

          {selectedNote && (
            <div className="mt-8 text-center animate-fade-in">
              <div className="inline-flex flex-col items-center gap-2 p-6 rounded-2xl bg-card border border-card-border">
                <div
                  className={`text-5xl font-bold ${
                    selectedNote.action === "blow"
                      ? "text-cyan-400"
                      : "text-purple-400"
                  }`}
                >
                  {selectedNote.note.replace(/\d/, "")}
                  <span className="text-2xl text-muted">
                    {selectedNote.note.match(/\d/)?.[0]}
                  </span>
                </div>
                <div className="text-muted">
                  Hole {selectedNote.hole} &middot;{" "}
                  {selectedNote.action === "blow" ? "Blow ↑" : "Draw ↓"}
                </div>
                <div className="text-sm text-muted">
                  {selectedNote.frequency.toFixed(2)} Hz
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Note Chart Table */}
        <div className="glass rounded-2xl p-6 sm:p-8 mb-8">
          <h2 className="text-lg font-semibold mb-6">Complete Note Chart</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-card-border">
                  <th className="text-left py-3 px-2 text-muted font-medium">Hole</th>
                  {Array.from({ length: 10 }, (_, i) => (
                    <th
                      key={i}
                      className="py-3 px-2 text-center font-bold text-foreground"
                    >
                      {i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-card-border/50">
                  <td className="py-3 px-2 text-cyan-400 font-medium">
                    Blow ↑
                  </td>
                  {blowNotes.map((n) => (
                    <td
                      key={n.hole}
                      className="py-3 px-2 text-center font-semibold text-cyan-400 cursor-pointer hover:bg-cyan-500/10 rounded transition-colors"
                      onClick={() => handleHoleClick(n.hole, "blow")}
                    >
                      {n.note.replace(/\d/, "")}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-2 text-purple-400 font-medium">
                    Draw ↓
                  </td>
                  {drawNotes.map((n) => (
                    <td
                      key={n.hole}
                      className="py-3 px-2 text-center font-semibold text-purple-400 cursor-pointer hover:bg-purple-500/10 rounded transition-colors"
                      onClick={() => handleHoleClick(n.hole, "draw")}
                    >
                      {n.note.replace(/\d/, "")}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tips Section */}
        <div className="glass rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold mb-6">
            Beginner Tips
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-400 text-sm font-bold">
                  ↑
                </div>
                <div>
                  <h3 className="font-medium mb-1">Blow Notes</h3>
                  <p className="text-sm text-muted">
                    Exhale gently through the harmonica. Start with holes 4-7 for
                    the clearest sound.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400 text-sm font-bold">
                  ↓
                </div>
                <div>
                  <h3 className="font-medium mb-1">Draw Notes</h3>
                  <p className="text-sm text-muted">
                    Inhale gently through the harmonica. Keep your mouth relaxed
                    and your throat open.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent text-sm font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-medium mb-1">Single Notes</h3>
                  <p className="text-sm text-muted">
                    Pucker your lips or use tongue blocking to isolate a single
                    hole. This is the most important skill.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-success/15 flex items-center justify-center text-success text-sm font-bold">
                  C
                </div>
                <div>
                  <h3 className="font-medium mb-1">Key of C</h3>
                  <p className="text-sm text-muted">
                    This chart is for a standard diatonic harmonica in C. Most
                    beginner songs use this key.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
