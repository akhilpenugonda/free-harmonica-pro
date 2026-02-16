// Standard 10-hole diatonic harmonica in the key of C
export interface HarmonicaNote {
  hole: number;
  action: "blow" | "draw";
  note: string;
  frequency: number;
}

export const HARMONICA_NOTES: HarmonicaNote[] = [
  // Blow notes
  { hole: 1, action: "blow", note: "C4", frequency: 261.63 },
  { hole: 2, action: "blow", note: "E4", frequency: 329.63 },
  { hole: 3, action: "blow", note: "G4", frequency: 392.0 },
  { hole: 4, action: "blow", note: "C5", frequency: 523.25 },
  { hole: 5, action: "blow", note: "E5", frequency: 659.25 },
  { hole: 6, action: "blow", note: "G5", frequency: 783.99 },
  { hole: 7, action: "blow", note: "C6", frequency: 1046.5 },
  { hole: 8, action: "blow", note: "E6", frequency: 1318.51 },
  { hole: 9, action: "blow", note: "G6", frequency: 1567.98 },
  { hole: 10, action: "blow", note: "C7", frequency: 2093.0 },
  // Draw notes
  { hole: 1, action: "draw", note: "D4", frequency: 293.66 },
  { hole: 2, action: "draw", note: "G4", frequency: 392.0 },
  { hole: 3, action: "draw", note: "B4", frequency: 493.88 },
  { hole: 4, action: "draw", note: "D5", frequency: 587.33 },
  { hole: 5, action: "draw", note: "F5", frequency: 698.46 },
  { hole: 6, action: "draw", note: "A5", frequency: 880.0 },
  { hole: 7, action: "draw", note: "B5", frequency: 987.77 },
  { hole: 8, action: "draw", note: "D6", frequency: 1174.66 },
  { hole: 9, action: "draw", note: "F6", frequency: 1396.91 },
  { hole: 10, action: "draw", note: "A6", frequency: 1760.0 },
];

export function getNoteForHole(
  hole: number,
  action: "blow" | "draw"
): HarmonicaNote | undefined {
  return HARMONICA_NOTES.find((n) => n.hole === hole && n.action === action);
}

export function findClosestNote(frequency: number): HarmonicaNote | null {
  if (frequency < 180 || frequency > 2200) return null;

  let closest: HarmonicaNote | null = null;
  let minCents = Infinity;

  for (const note of HARMONICA_NOTES) {
    // Use cents (logarithmic) distance — musically accurate for all octaves
    const cents = Math.abs(1200 * Math.log2(frequency / note.frequency));
    if (cents < minCents) {
      minCents = cents;
      closest = note;
    }
  }

  // Reject if more than 100 cents (~1 semitone) away from any known note
  if (minCents > 100) return null;

  return closest;
}

export function getCentsOff(frequency: number, targetFreq: number): number {
  return Math.round(1200 * Math.log2(frequency / targetFreq));
}

// Tab notation: standard harmonica tab uses the number for blow, minus sign for draw
// e.g. "4" = hole 4 blow, "-4" = hole 4 draw
export function tabNotation(hole: number, action: "blow" | "draw"): string {
  return action === "draw" ? `-${hole}` : `${hole}`;
}

// Note display helpers
export function noteDisplayName(note: string): string {
  return note.replace(/(\d)/, "");
}

export function getBlowNotes(): HarmonicaNote[] {
  return HARMONICA_NOTES.filter((n) => n.action === "blow").sort(
    (a, b) => a.hole - b.hole
  );
}

export function getDrawNotes(): HarmonicaNote[] {
  return HARMONICA_NOTES.filter((n) => n.action === "draw").sort(
    (a, b) => a.hole - b.hole
  );
}
