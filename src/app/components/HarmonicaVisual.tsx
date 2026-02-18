"use client";

import { getNoteForHole, type HarmonicaKey } from "@/lib/harmonicaData";

interface HarmonicaVisualProps {
  activeHole?: number | null;
  activeAction?: "blow" | "draw" | null;
  onHoleClick?: (hole: number, action: "blow" | "draw") => void;
  interactive?: boolean;
  showLabels?: boolean;
  harpKey?: HarmonicaKey;
}

export default function HarmonicaVisual({
  activeHole = null,
  activeAction = null,
  onHoleClick,
  interactive = false,
  showLabels = true,
  harpKey = "C",
}: HarmonicaVisualProps) {
  const holes = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Blow labels */}
      {showLabels && (
        <div className="flex justify-center gap-1 sm:gap-2 mb-2">
          {holes.map((hole) => {
            const note = getNoteForHole(hole, "blow", harpKey);
            const isActive = activeHole === hole && activeAction === "blow";
            return (
              <div
                key={`blow-label-${hole}`}
                className={`w-10 sm:w-12 text-center text-[10px] sm:text-xs font-medium transition-all ${
                  isActive ? "text-accent font-bold scale-110" : "text-muted"
                }`}
              >
                <span className="text-cyan-400">&#8593;</span>{" "}
                {note?.note.replace(/\d/, "")}
              </div>
            );
          })}
        </div>
      )}

      {/* Harmonica body */}
      <div className="relative rounded-2xl bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 p-3 sm:p-4 shadow-2xl border border-gray-600/50">
        {/* Chrome top plate */}
        <div className="absolute top-0 left-0 right-0 h-3 rounded-t-2xl bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500 opacity-30" />

        {/* Holes */}
        <div className="flex justify-center gap-1 sm:gap-2">
          {holes.map((hole) => {
            const isActive = activeHole === hole;
            const blowActive = isActive && activeAction === "blow";
            const drawActive = isActive && activeAction === "draw";

            return (
              <div key={hole} className="flex flex-col items-center gap-1">
                {/* Blow zone (top) */}
                {interactive && (
                  <button
                    onClick={() => onHoleClick?.(hole, "blow")}
                    className={`w-10 sm:w-12 h-5 rounded-t-lg text-[9px] font-bold transition-all ${
                      blowActive
                        ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/40 scale-105"
                        : "bg-gray-700/50 text-gray-500 hover:bg-cyan-500/20 hover:text-cyan-400"
                    }`}
                  >
                    BLOW
                  </button>
                )}

                {/* The hole itself */}
                <div
                  className={`w-10 sm:w-12 h-10 sm:h-12 rounded-lg flex items-center justify-center text-sm sm:text-base font-bold transition-all ${
                    blowActive
                      ? "hole-blow text-white shadow-lg shadow-cyan-500/40 animate-pulse-glow"
                      : drawActive
                      ? "hole-draw text-white shadow-lg shadow-purple-500/40 animate-pulse-glow"
                      : "bg-gray-900 text-gray-400 border border-gray-700"
                  } ${interactive ? "cursor-pointer hover:border-gray-500" : ""}`}
                  onClick={() =>
                    interactive &&
                    onHoleClick?.(hole, activeAction || "blow")
                  }
                >
                  {hole}
                </div>

                {/* Draw zone (bottom) */}
                {interactive && (
                  <button
                    onClick={() => onHoleClick?.(hole, "draw")}
                    className={`w-10 sm:w-12 h-5 rounded-b-lg text-[9px] font-bold transition-all ${
                      drawActive
                        ? "bg-purple-500 text-white shadow-lg shadow-purple-500/40 scale-105"
                        : "bg-gray-700/50 text-gray-500 hover:bg-purple-500/20 hover:text-purple-400"
                    }`}
                  >
                    DRAW
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Chrome bottom plate */}
        <div className="absolute bottom-0 left-0 right-0 h-3 rounded-b-2xl bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500 opacity-30" />
      </div>

      {/* Draw labels */}
      {showLabels && (
        <div className="flex justify-center gap-1 sm:gap-2 mt-2">
          {holes.map((hole) => {
            const note = getNoteForHole(hole, "draw", harpKey);
            const isActive = activeHole === hole && activeAction === "draw";
            return (
              <div
                key={`draw-label-${hole}`}
                className={`w-10 sm:w-12 text-center text-[10px] sm:text-xs font-medium transition-all ${
                  isActive ? "text-accent-secondary font-bold scale-110" : "text-muted"
                }`}
              >
                <span className="text-purple-400">&#8595;</span>{" "}
                {note?.note.replace(/\d/, "")}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
