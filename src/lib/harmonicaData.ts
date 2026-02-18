export interface HarmonicaNote {
  hole: number;
  action: "blow" | "draw";
  note: string;
  frequency: number;
}

export type HarmonicaKey = "C" | "G";

export const HARMONICA_KEYS: HarmonicaKey[] = ["C", "G"];

const NOTES_C: HarmonicaNote[] = [
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

const NOTES_G: HarmonicaNote[] = [
  { hole: 1, action: "blow", note: "G3", frequency: 196.0 },
  { hole: 2, action: "blow", note: "B3", frequency: 246.94 },
  { hole: 3, action: "blow", note: "D4", frequency: 293.66 },
  { hole: 4, action: "blow", note: "G4", frequency: 392.0 },
  { hole: 5, action: "blow", note: "B4", frequency: 493.88 },
  { hole: 6, action: "blow", note: "D5", frequency: 587.33 },
  { hole: 7, action: "blow", note: "G5", frequency: 783.99 },
  { hole: 8, action: "blow", note: "B5", frequency: 987.77 },
  { hole: 9, action: "blow", note: "D6", frequency: 1174.66 },
  { hole: 10, action: "blow", note: "G6", frequency: 1567.98 },
  { hole: 1, action: "draw", note: "A3", frequency: 220.0 },
  { hole: 2, action: "draw", note: "D4", frequency: 293.66 },
  { hole: 3, action: "draw", note: "F#4", frequency: 369.99 },
  { hole: 4, action: "draw", note: "A4", frequency: 440.0 },
  { hole: 5, action: "draw", note: "C5", frequency: 523.25 },
  { hole: 6, action: "draw", note: "E5", frequency: 659.25 },
  { hole: 7, action: "draw", note: "F#5", frequency: 739.99 },
  { hole: 8, action: "draw", note: "A5", frequency: 880.0 },
  { hole: 9, action: "draw", note: "C6", frequency: 1046.5 },
  { hole: 10, action: "draw", note: "E6", frequency: 1318.51 },
];

const NOTES_BY_KEY: Record<HarmonicaKey, HarmonicaNote[]> = {
  C: NOTES_C,
  G: NOTES_G,
};

/** Backward-compatible alias — default C key */
export const HARMONICA_NOTES = NOTES_C;

export function getNotesForKey(key: HarmonicaKey): HarmonicaNote[] {
  return NOTES_BY_KEY[key];
}

export function getNoteForHole(
  hole: number,
  action: "blow" | "draw",
  key: HarmonicaKey = "C"
): HarmonicaNote | undefined {
  return NOTES_BY_KEY[key].find((n) => n.hole === hole && n.action === action);
}

export function findClosestNote(
  frequency: number,
  key: HarmonicaKey = "C"
): HarmonicaNote | null {
  if (frequency < 150 || frequency > 2200) return null;

  const notes = NOTES_BY_KEY[key];
  let closest: HarmonicaNote | null = null;
  let minCents = Infinity;

  for (const note of notes) {
    const cents = Math.abs(1200 * Math.log2(frequency / note.frequency));
    if (cents < minCents) {
      minCents = cents;
      closest = note;
    }
  }

  if (minCents > 100) return null;

  return closest;
}

export function getCentsOff(frequency: number, targetFreq: number): number {
  return Math.round(1200 * Math.log2(frequency / targetFreq));
}

export function tabNotation(hole: number, action: "blow" | "draw"): string {
  return action === "draw" ? `-${hole}` : `${hole}`;
}

export function getBlowNotes(key: HarmonicaKey = "C"): HarmonicaNote[] {
  return NOTES_BY_KEY[key]
    .filter((n) => n.action === "blow")
    .sort((a, b) => a.hole - b.hole);
}

export function getDrawNotes(key: HarmonicaKey = "C"): HarmonicaNote[] {
  return NOTES_BY_KEY[key]
    .filter((n) => n.action === "draw")
    .sort((a, b) => a.hole - b.hole);
}
