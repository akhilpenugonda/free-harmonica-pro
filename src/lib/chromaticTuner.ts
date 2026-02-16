// Chromatic tuner utilities
// Detects any note in the chromatic scale (A440 standard tuning)

const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

export type NoteName = (typeof NOTE_NAMES)[number];

export interface ChromaticNote {
  name: NoteName;
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
    name: NOTE_NAMES[noteIndex],
    octave,
    frequency: midiToFrequency(midiRounded),
    midi: midiRounded,
  };

  return { note, cents };
}

/**
 * Get the display name for a note (e.g., "A" or "C#").
 * Optionally includes the octave number.
 */
export function noteDisplay(
  note: ChromaticNote,
  includeOctave = false
): string {
  return includeOctave ? `${note.name}${note.octave}` : note.name;
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
