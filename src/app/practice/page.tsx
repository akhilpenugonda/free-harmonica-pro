"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import HarmonicaVisual from "../components/HarmonicaVisual";
import PitchMeter from "../components/PitchMeter";
import { PitchDetector } from "@/lib/pitchDetection";
import {
  findClosestNote,
  getCentsOff,
  getNoteForHole,
  tabNotation,
  type HarmonicaNote,
} from "@/lib/harmonicaData";

type PracticeMode = "free" | "sequence";

interface Sequence {
  name: string;
  notes: { hole: number; action: "blow" | "draw" }[];
}

const SEQUENCES: Sequence[] = [
  {
    name: "Easy Scale (Blow Only)",
    notes: [
      { hole: 4, action: "blow" },
      { hole: 5, action: "blow" },
      { hole: 6, action: "blow" },
      { hole: 7, action: "blow" },
    ],
  },
  {
    name: "C Major Scale",
    notes: [
      { hole: 4, action: "blow" },
      { hole: 4, action: "draw" },
      { hole: 5, action: "blow" },
      { hole: 5, action: "draw" },
      { hole: 6, action: "blow" },
      { hole: 6, action: "draw" },
      { hole: 7, action: "draw" },
      { hole: 7, action: "blow" },
    ],
  },
  {
    name: "Low Notes",
    notes: [
      { hole: 1, action: "blow" },
      { hole: 1, action: "draw" },
      { hole: 2, action: "blow" },
      { hole: 2, action: "draw" },
      { hole: 3, action: "blow" },
      { hole: 3, action: "draw" },
    ],
  },
  {
    name: "Alternating Blow-Draw",
    notes: [
      { hole: 4, action: "blow" },
      { hole: 4, action: "draw" },
      { hole: 5, action: "blow" },
      { hole: 5, action: "draw" },
      { hole: 6, action: "blow" },
      { hole: 6, action: "draw" },
    ],
  },
  {
    name: "High Notes",
    notes: [
      { hole: 7, action: "blow" },
      { hole: 7, action: "draw" },
      { hole: 8, action: "blow" },
      { hole: 8, action: "draw" },
      { hole: 9, action: "blow" },
      { hole: 9, action: "draw" },
      { hole: 10, action: "blow" },
      { hole: 10, action: "draw" },
    ],
  },
  {
    name: "Zig-Zag Pattern",
    notes: [
      { hole: 4, action: "blow" },
      { hole: 5, action: "draw" },
      { hole: 4, action: "draw" },
      { hole: 5, action: "blow" },
      { hole: 6, action: "blow" },
      { hole: 5, action: "draw" },
      { hole: 6, action: "draw" },
      { hole: 7, action: "blow" },
    ],
  },
];

export default function PracticePage() {
  const [mode, setMode] = useState<PracticeMode>("free");
  const [listening, setListening] = useState(false);
  const [detectedNote, setDetectedNote] = useState<HarmonicaNote | null>(null);
  const [detectedFreq, setDetectedFreq] = useState<number | null>(null);
  const [cents, setCents] = useState(0);
  const [volume, setVolume] = useState(0);
  const [selectedSequence, setSelectedSequence] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const detectorRef = useRef<PitchDetector | null>(null);
  const animFrameRef = useRef<number>(0);
  const matchTimerRef = useRef<number>(0);

  const currentSequence = SEQUENCES[selectedSequence];
  const targetNote =
    mode === "sequence"
      ? getNoteForHole(
          currentSequence.notes[currentStep].hole,
          currentSequence.notes[currentStep].action
        )
      : null;

  const analyze = useCallback(() => {
    if (!detectorRef.current?.running) return;

    const freq = detectorRef.current.getFrequency();
    const vol = detectorRef.current.getVolume();
    setVolume(vol);

    if (freq) {
      setDetectedFreq(freq);
      const closest = findClosestNote(freq);
      setDetectedNote(closest);

      if (closest) {
        const c = getCentsOff(freq, closest.frequency);
        setCents(c);

        // In sequence mode, check if the detected note matches target
        if (mode === "sequence" && targetNote) {
          if (
            closest.hole === targetNote.hole &&
            closest.action === targetNote.action &&
            Math.abs(c) < 20
          ) {
            matchTimerRef.current += 1;
            if (matchTimerRef.current > 15) {
              // Held note for ~0.5s
              setScore((prev) => prev + 1);
              matchTimerRef.current = 0;
              setCurrentStep((prev) => {
                if (prev >= currentSequence.notes.length - 1) {
                  return 0; // Loop back
                }
                return prev + 1;
              });
            }
          } else {
            matchTimerRef.current = 0;
          }
        }
      }
    } else {
      setDetectedNote(null);
      setDetectedFreq(null);
      setCents(0);
      matchTimerRef.current = 0;
    }

    animFrameRef.current = requestAnimationFrame(analyze);
  }, [mode, targetNote, currentSequence.notes.length]);

  const toggleListening = async () => {
    if (listening) {
      cancelAnimationFrame(animFrameRef.current);
      detectorRef.current?.stop();
      detectorRef.current = null;
      setListening(false);
      setDetectedNote(null);
      setDetectedFreq(null);
      setVolume(0);
      setError(null);
    } else {
      try {
        setError(null);
        const detector = new PitchDetector();
        await detector.start();
        detectorRef.current = detector;
        setListening(true);
        animFrameRef.current = requestAnimationFrame(analyze);
      } catch {
        setError(
          "Could not access microphone. Please allow microphone access in your browser settings."
        );
      }
    }
  };

  // Restart analysis loop when analyze callback changes
  useEffect(() => {
    if (listening && detectorRef.current?.running) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(analyze);
    }
  }, [analyze, listening]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      detectorRef.current?.stop();
    };
  }, []);

  // Reset step when sequence changes
  useEffect(() => {
    setCurrentStep(0);
    setScore(0);
    matchTimerRef.current = 0;
  }, [selectedSequence]);

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Title */}
        <div className="text-center mb-10 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="gradient-text">Practice</span> Mode
          </h1>
          <p className="text-muted">
            Use your microphone to practice single notes and sequences
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="inline-flex rounded-xl p-1 bg-card border border-card-border">
            <button
              onClick={() => setMode("free")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === "free"
                  ? "bg-accent text-white shadow-lg"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Free Play
            </button>
            <button
              onClick={() => setMode("sequence")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === "sequence"
                  ? "bg-accent text-white shadow-lg"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Sequences
            </button>
          </div>
        </div>

        {/* Main practice area */}
        <div className="glass rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in">
          {/* Detected Note Display */}
          <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
            {/* Note display */}
            <div className="flex-shrink-0 w-48 h-48 rounded-2xl bg-card border border-card-border flex flex-col items-center justify-center">
              {detectedNote && listening ? (
                <>
                  <div
                    className={`text-5xl font-bold font-mono ${
                      detectedNote.action === "blow"
                        ? "text-cyan-400"
                        : "text-purple-400"
                    }`}
                  >
                    {tabNotation(detectedNote.hole, detectedNote.action)}
                  </div>
                  <div className="text-sm text-muted mt-2">
                    {detectedNote.note.replace(/\d/, "")}
                    <span className="text-muted/60">
                      {detectedNote.note.match(/\d/)?.[0]}
                    </span>
                    {" "}&middot;{" "}
                    {detectedNote.action === "blow" ? "Blow" : "Draw"}
                  </div>
                  <div
                    className={`text-xs font-medium mt-1 px-3 py-0.5 rounded-full ${
                      detectedNote.action === "blow"
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "bg-purple-500/20 text-purple-400"
                    }`}
                  >
                    Hole {detectedNote.hole}
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="text-2xl font-bold text-muted/50">
                    {listening ? "Listening..." : "Paused"}
                  </div>
                  <div className="text-sm text-muted/40 mt-1">
                    {listening ? "Play a note" : "Click Start"}
                  </div>
                </div>
              )}
            </div>

            {/* Pitch meter and controls */}
            <div className="flex-1 w-full">
              <PitchMeter cents={cents} isActive={!!detectedNote && listening} />

              {/* Volume meter */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs text-muted mb-1">
                  <span>Volume</span>
                  <span>{Math.round(volume * 100)}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accent-secondary transition-all duration-100"
                    style={{ width: `${volume * 100}%` }}
                  />
                </div>
              </div>

              {detectedFreq && listening && (
                <p className="text-xs text-muted mt-3 text-center">
                  Detected: {detectedFreq.toFixed(1)} Hz
                </p>
              )}
            </div>
          </div>

          {/* Harmonica Visual */}
          <HarmonicaVisual
            activeHole={detectedNote?.hole}
            activeAction={detectedNote?.action}
          />

          {/* Mic button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={toggleListening}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 active:scale-95 ${
                listening
                  ? "bg-danger/20 text-danger border border-danger/30 hover:bg-danger/30"
                  : "bg-gradient-to-r from-accent to-accent-secondary text-white shadow-lg shadow-accent/20"
              }`}
            >
              {listening ? (
                <>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="6" width="12" height="12" rx="2" />
                  </svg>
                  Stop Listening
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Start Listening
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-danger/10 border border-danger/30 text-danger text-sm text-center">
              {error}
            </div>
          )}
        </div>

        {/* Sequence Practice Panel */}
        {mode === "sequence" && (
          <div className="glass rounded-2xl p-6 sm:p-8 animate-slide-up">
            <h2 className="text-xl font-bold gradient-text mb-6 text-center">
              Sequence Practice
            </h2>

            {/* Sequence selector */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <label className="text-sm text-muted">Choose a sequence:</label>
              <select
                value={selectedSequence}
                onChange={(e) => setSelectedSequence(Number(e.target.value))}
                className="bg-card border border-card-border rounded-lg px-4 py-2 text-foreground text-sm focus:outline-none focus:border-accent"
              >
                {SEQUENCES.map((seq, i) => (
                  <option key={i} value={i}>
                    {seq.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Score */}
            <div className="text-center mb-6">
              <span className="text-sm text-muted">Score: </span>
              <span className="text-2xl font-bold text-accent">{score}</span>
            </div>

            {/* Sequence notes display */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {currentSequence.notes.map((note, idx) => {
                const noteData = getNoteForHole(note.hole, note.action);
                const isCurrent = idx === currentStep;
                const isPast = idx < currentStep;

                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all min-w-[70px] ${
                      isCurrent
                        ? "border-accent bg-accent/10 scale-110 shadow-lg shadow-accent/20"
                        : isPast
                        ? "border-success/30 bg-success/5 opacity-60"
                        : "border-card-border bg-card/50"
                    }`}
                  >
                    <div className="text-xs text-muted">
                      {isPast ? "✓" : `#${idx + 1}`}
                    </div>
                    <div
                      className={`text-2xl font-bold font-mono ${
                        isCurrent
                          ? "text-accent"
                          : isPast
                          ? "text-success"
                          : note.action === "blow"
                          ? "text-cyan-400"
                          : "text-purple-400"
                      }`}
                    >
                      {tabNotation(note.hole, note.action)}
                    </div>
                    <div className="text-[10px] text-muted">
                      {noteData?.note} &middot; {note.action === "blow" ? "Blow" : "Draw"}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Target note callout */}
            {targetNote && (
              <div className="mt-8 text-center">
                <p className="text-sm text-muted mb-2">Target Note:</p>
                <p
                  className={`text-5xl font-bold font-mono ${
                    currentSequence.notes[currentStep].action === "blow"
                      ? "text-cyan-400"
                      : "text-purple-400"
                  }`}
                >
                  {tabNotation(
                    currentSequence.notes[currentStep].hole,
                    currentSequence.notes[currentStep].action
                  )}
                </p>
                <p className="text-sm text-muted mt-1">
                  Hole {currentSequence.notes[currentStep].hole} &middot;{" "}
                  {currentSequence.notes[currentStep].action === "blow"
                    ? "Blow"
                    : "Draw"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
