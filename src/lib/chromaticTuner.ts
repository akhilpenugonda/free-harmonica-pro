// Chromatic tuner utilities
// Detects any note in the chromatic scale (A440 standard tuning)

const NOTE_NAMES_SHARP = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
] as const;

const NOTE_NAMES_FLAT = [
  "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B",
] as const;

export type NoteNameSharp = (typeof NOTE_NAMES_SHARP)[number];
export type NoteNameFlat = (typeof NOTE_NAMES_FLAT)[number];
export type NoteName = NoteNameSharp | NoteNameFlat;
export type AccidentalMode = "sharps" | "flats";

export interface ChromaticNote {
  nameSharp: NoteNameSharp;
  nameFlat: NoteNameFlat;
  octave: number;
  frequency: number;
  midi: number;
}

/**
 * Convert a MIDI note number to a frequency (A4 = 440 Hz, MIDI 69).
 */
function midiToFrequency(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

/**
 * Find the closest chromatic note to the given frequency.
 * Returns the note info and how many cents sharp/flat the input is.
 */
export function findClosestChromaticNote(frequency: number): {
  note: ChromaticNote;
  cents: number;
} {
  // Calculate the MIDI note number (can be fractional)
  const midiFloat = 69 + 12 * Math.log2(frequency / 440);
  const midiRounded = Math.round(midiFloat);

  // Cents deviation: positive = sharp, negative = flat
  const cents = Math.round((midiFloat - midiRounded) * 100);

  // Derive note name and octave from MIDI number
  // MIDI 0 = C-1, MIDI 12 = C0, MIDI 60 = C4
  const noteIndex = ((midiRounded % 12) + 12) % 12;
  const octave = Math.floor(midiRounded / 12) - 1;

  const note: ChromaticNote = {
    nameSharp: NOTE_NAMES_SHARP[noteIndex],
    nameFlat: NOTE_NAMES_FLAT[noteIndex],
    octave,
    frequency: midiToFrequency(midiRounded),
    midi: midiRounded,
  };

  return { note, cents };
}

/**
 * Get the display name for a note based on the accidental preference.
 */
export function getNoteName(
  note: ChromaticNote,
  mode: AccidentalMode = "sharps"
): string {
  return mode === "flats" ? note.nameFlat : note.nameSharp;
}

/**
 * Check if a note has an accidental (sharp or flat).
 */
export function hasAccidental(
  note: ChromaticNote,
  mode: AccidentalMode = "sharps"
): boolean {
  const name = getNoteName(note, mode);
  return name.includes("#") || name.includes("b");
}

/**
 * Get the base letter and accidental symbol separately.
 */
export function splitNoteName(
  note: ChromaticNote,
  mode: AccidentalMode = "sharps"
): { letter: string; accidental: string } {
  const name = getNoteName(note, mode);
  if (name.length === 1) return { letter: name, accidental: "" };
  return { letter: name[0], accidental: name.slice(1) };
}

/**
 * Determine tuning accuracy label based on cents deviation.
 */
export function tuningAccuracy(cents: number): "in-tune" | "close" | "off" {
  const absCents = Math.abs(cents);
  if (absCents <= 5) return "in-tune";
  if (absCents <= 15) return "close";
  return "off";
}
