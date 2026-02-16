"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import HarmonicaVisual from "../../components/HarmonicaVisual";
import PitchMeter from "../../components/PitchMeter";
import { PitchDetector } from "@/lib/pitchDetection";
import { getSongById } from "@/lib/songs";
import {
  findClosestNote,
  getCentsOff,
  getNoteForHole,
  tabNotation,
  type HarmonicaNote,
} from "@/lib/harmonicaData";

export default function SongPracticePage() {
  const params = useParams();
  const song = getSongById(params.id as string);

  const [currentNote, setCurrentNote] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [listening, setListening] = useState(false);
  const [detectedNote, setDetectedNote] = useState<HarmonicaNote | null>(null);
  const [cents, setCents] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const detectorRef = useRef<PitchDetector | null>(null);
  const animFrameRef = useRef<number>(0);
  const matchTimerRef = useRef<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const targetTab = song?.tabs[currentNote];
  const targetNoteData = targetTab
    ? getNoteForHole(targetTab.hole, targetTab.action)
    : null;

  const analyze = useCallback(() => {
    if (!detectorRef.current?.running) return;

    const freq = detectorRef.current.getFrequency();

    if (freq && song && targetNoteData && autoAdvance) {
      const closest = findClosestNote(freq);
      setDetectedNote(closest);

      if (closest) {
        const c = getCentsOff(freq, closest.frequency);
        setCents(c);

        if (
          closest.hole === targetTab!.hole &&
          closest.action === targetTab!.action &&
          Math.abs(c) < 25
        ) {
          matchTimerRef.current += 1;
          if (matchTimerRef.current > 12) {
            matchTimerRef.current = 0;
            setCurrentNote((prev) => {
              if (prev >= song.tabs.length - 1) {
                setCompleted(true);
                return prev;
              }
              return prev + 1;
            });
          }
        } else {
          matchTimerRef.current = Math.max(0, matchTimerRef.current - 1);
        }
      }
    } else if (freq) {
      const closest = findClosestNote(freq);
      setDetectedNote(closest);
      if (closest) {
        setCents(getCentsOff(freq, closest.frequency));
      }
    } else {
      setDetectedNote(null);
      setCents(0);
      matchTimerRef.current = 0;
    }

    animFrameRef.current = requestAnimationFrame(analyze);
  }, [song, targetNoteData, targetTab, autoAdvance]);

  const toggleListening = async () => {
    if (listening) {
      cancelAnimationFrame(animFrameRef.current);
      detectorRef.current?.stop();
      detectorRef.current = null;
      setListening(false);
      setDetectedNote(null);
      setError(null);
    } else {
      try {
        setError(null);
        const detector = new PitchDetector();
        await detector.start();
        detectorRef.current = detector;
        setListening(true);
        setIsPlaying(true);
        animFrameRef.current = requestAnimationFrame(analyze);
      } catch {
        setError("Could not access microphone. Please allow microphone access.");
      }
    }
  };

  useEffect(() => {
    if (listening && detectorRef.current?.running) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(analyze);
    }
  }, [analyze, listening]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      detectorRef.current?.stop();
    };
  }, []);

  // Auto-scroll to current note
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector(
        `[data-note-idx="${currentNote}"]`
      );
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentNote]);

  const resetSong = () => {
    setCurrentNote(0);
    setCompleted(false);
    matchTimerRef.current = 0;
  };

  if (!song) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Song not found</h1>
          <Link href="/songs" className="text-accent hover:underline">
            Back to Songs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Back link */}
        <Link
          href="/songs"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Songs
        </Link>

        {/* Song Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{song.title}</h1>
          <p className="text-muted text-lg">{song.artist}</p>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                song.difficulty === "Beginner"
                  ? "bg-success/15 text-success border-success/30"
                  : song.difficulty === "Intermediate"
                  ? "bg-warning/15 text-warning border-warning/30"
                  : "bg-danger/15 text-danger border-danger/30"
              }`}
            >
              {song.difficulty}
            </span>
            <span className="text-sm text-muted">{song.genre}</span>
            <span className="text-sm text-muted">{song.bpm} BPM</span>
            <span className="text-sm text-muted">{song.tabs.length} notes</span>
          </div>
        </div>

        {/* Completion message */}
        {completed && (
          <div className="glass rounded-2xl p-8 mb-8 text-center border-success/30 animate-slide-up">
            <div className="text-5xl mb-4">&#127881;</div>
            <h2 className="text-2xl font-bold text-success mb-2">
              Song Complete!
            </h2>
            <p className="text-muted mb-6">
              Great job! You played through the entire song.
            </p>
            <button
              onClick={resetSong}
              className="px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:scale-105 transition-all"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <button
            onClick={toggleListening}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 ${
              listening
                ? "bg-danger/20 text-danger border border-danger/30"
                : "bg-gradient-to-r from-accent to-accent-secondary text-white shadow-lg"
            }`}
          >
            {listening ? (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
                Stop
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                Start with Mic
              </>
            )}
          </button>

          <button
            onClick={resetSong}
            className="px-6 py-3 rounded-xl border border-card-border text-foreground font-semibold hover:bg-white/5 transition-all"
          >
            Reset
          </button>

          <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
            <input
              type="checkbox"
              checked={autoAdvance}
              onChange={(e) => setAutoAdvance(e.target.checked)}
              className="w-4 h-4 rounded accent-accent"
            />
            Auto-advance with mic
          </label>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-danger/10 border border-danger/30 text-danger text-sm text-center">
            {error}
          </div>
        )}

        {/* Current target note */}
        {isPlaying && !completed && targetTab && (
          <div className="glass rounded-2xl p-6 mb-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-36 h-36 rounded-2xl bg-card border border-card-border flex flex-col items-center justify-center">
                <div className="text-sm text-muted mb-1">Play:</div>
                <div
                  className={`text-5xl font-bold font-mono ${
                    targetTab.action === "blow"
                      ? "text-cyan-400"
                      : "text-purple-400"
                  }`}
                >
                  {tabNotation(targetTab.hole, targetTab.action)}
                </div>
                <div className="text-xs text-muted mt-2">
                  Hole {targetTab.hole} &middot;{" "}
                  {targetTab.action === "blow" ? "Blow" : "Draw"}
                </div>
                {targetTab.lyric && (
                  <div className="text-xs text-muted mt-1 italic">
                    &ldquo;{targetTab.lyric}&rdquo;
                  </div>
                )}
              </div>

              <div className="flex-1 w-full">
                <PitchMeter cents={cents} isActive={!!detectedNote && listening} />
                <div className="flex items-center justify-between mt-3 text-sm text-muted">
                  <span>
                    Note {currentNote + 1} of {song.tabs.length}
                  </span>
                  {detectedNote && listening && (
                    <span>
                      Detected:{" "}
                      <span className={`font-mono font-bold ${
                        detectedNote.action === "blow" ? "text-cyan-400" : "text-purple-400"
                      }`}>
                        {tabNotation(detectedNote.hole, detectedNote.action)}
                      </span>{" "}
                      ({detectedNote.note})
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Harmonica visual */}
            <div className="mt-6">
              <HarmonicaVisual
                activeHole={
                  listening && detectedNote ? detectedNote.hole : targetTab.hole
                }
                activeAction={
                  listening && detectedNote
                    ? detectedNote.action
                    : targetTab.action
                }
              />
            </div>
          </div>
        )}

        {/* Tab scroll view */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Song Tabs</h2>

          <div
            ref={scrollContainerRef}
            className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin"
          >
            {song.tabs.map((tab, idx) => {
              const isCurrent = idx === currentNote && isPlaying;
              const isPast = idx < currentNote && isPlaying;

              return (
                <button
                  key={idx}
                  data-note-idx={idx}
                  onClick={() => {
                    setCurrentNote(idx);
                    setIsPlaying(true);
                    setCompleted(false);
                  }}
                  className={`flex-shrink-0 flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all min-w-[65px] ${
                    isCurrent
                      ? "border-accent bg-accent/10 scale-105 shadow-lg shadow-accent/20"
                      : isPast
                      ? "border-success/30 bg-success/5 opacity-50"
                      : "border-card-border bg-card/30 hover:border-muted/50"
                  }`}
                >
                  {tab.lyric && (
                    <span className="text-[10px] text-muted truncate max-w-[50px]">
                      {tab.lyric}
                    </span>
                  )}
                  <span
                    className={`text-xl font-bold font-mono ${
                      isCurrent
                        ? "text-accent"
                        : isPast
                        ? "text-success"
                        : tab.action === "blow"
                        ? "text-cyan-400"
                        : "text-purple-400"
                    }`}
                  >
                    {tabNotation(tab.hole, tab.action)}
                  </span>
                  <span className="text-[10px] text-muted">
                    {tab.action === "blow" ? "Blow" : "Draw"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Manual navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => {
                setCurrentNote(Math.max(0, currentNote - 1));
                setIsPlaying(true);
                setCompleted(false);
              }}
              disabled={currentNote === 0}
              className="px-4 py-2 rounded-lg border border-card-border text-sm font-medium hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>
            <span className="text-sm text-muted">
              {currentNote + 1} / {song.tabs.length}
            </span>
            <button
              onClick={() => {
                if (currentNote < song.tabs.length - 1) {
                  setCurrentNote(currentNote + 1);
                  setIsPlaying(true);
                  setCompleted(false);
                } else {
                  setCompleted(true);
                }
              }}
              className="px-4 py-2 rounded-lg border border-card-border text-sm font-medium hover:bg-white/5 transition-all"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
