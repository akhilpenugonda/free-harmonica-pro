"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { PitchDetector } from "@/lib/pitchDetection";
import {
  findClosestChromaticNote,
  tuningAccuracy,
  type ChromaticNote,
} from "@/lib/chromaticTuner";

export default function TunerPage() {
  const [listening, setListening] = useState(false);
  const [note, setNote] = useState<ChromaticNote | null>(null);
  const [cents, setCents] = useState(0);
  const [frequency, setFrequency] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const detectorRef = useRef<PitchDetector | null>(null);
  const animFrameRef = useRef<number>(0);
  const analyzeRef = useRef<() => void>(() => {});

  // Smoothing: keep a short history of cents for visual stability
  const centsHistoryRef = useRef<number[]>([]);
  const noteHoldRef = useRef<{ note: ChromaticNote; timeout: number } | null>(
    null
  );

  useEffect(() => {
    analyzeRef.current = () => {
      if (!detectorRef.current?.running) return;

      const freq = detectorRef.current.getFrequency();

      if (freq) {
        const { note: detectedNote, cents: detectedCents } =
          findClosestChromaticNote(freq);

        setFrequency(freq);

        // Smooth cents with a short moving average (last 4 readings)
        const history = centsHistoryRef.current;
        history.push(detectedCents);
        if (history.length > 4) history.shift();
        const smoothedCents = Math.round(
          history.reduce((a, b) => a + b, 0) / history.length
        );

        setCents(smoothedCents);
        setNote(detectedNote);

        // Reset hold timer
        if (noteHoldRef.current) {
          clearTimeout(noteHoldRef.current.timeout);
        }
        noteHoldRef.current = {
          note: detectedNote,
          timeout: window.setTimeout(() => {
            // Note decays after 1.5s of silence
          }, 1500),
        };
      } else {
        // No pitch detected — after a brief hold, clear
        if (!noteHoldRef.current) {
          setNote(null);
          setFrequency(null);
          setCents(0);
          centsHistoryRef.current = [];
        }
      }
    };
  }, []);

  const startLoop = useCallback(() => {
    const tick = () => {
      analyzeRef.current();
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  const stopLoop = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
  }, []);

  const toggleListening = async () => {
    if (listening) {
      stopLoop();
      detectorRef.current?.stop();
      detectorRef.current = null;
      setListening(false);
      setNote(null);
      setFrequency(null);
      setCents(0);
      setError(null);
      centsHistoryRef.current = [];
    } else {
      try {
        setError(null);
        const detector = new PitchDetector({
          minFrequency: 60,
          maxFrequency: 4200,
        });
        await detector.start();
        detectorRef.current = detector;
        setListening(true);
        startLoop();
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        setError(
          isIOS
            ? `Could not access microphone. On iOS, go to Settings → Safari → Microphone and make sure it is enabled. Then reload this page. (${msg})`
            : `Could not access microphone. Please allow microphone access in your browser settings. (${msg})`
        );
      }
    }
  };

  useEffect(() => {
    return () => {
      stopLoop();
      detectorRef.current?.stop();
    };
  }, [stopLoop]);

  const accuracy = tuningAccuracy(cents);
  const isActive = !!note && listening;

  // Deviation wheel rotation: map cents (-50..+50) to degrees (-135..+135)
  const wheelRotation = isActive ? (cents / 50) * 135 : 0;

  // Color based on tuning accuracy
  const accuracyColor =
    accuracy === "in-tune"
      ? "#10b981"
      : accuracy === "close"
        ? "#f59e0b"
        : "#ef4444";

  const accuracyGlow =
    accuracy === "in-tune"
      ? "0 0 80px rgba(16, 185, 129, 0.4), 0 0 160px rgba(16, 185, 129, 0.1)"
      : accuracy === "close"
        ? "0 0 60px rgba(245, 158, 11, 0.2)"
        : "0 0 60px rgba(239, 68, 68, 0.2)";

  return (
    <div className="tuner-fullscreen">
      {/* Background glow effect */}
      {isActive && (
        <div
          className="tuner-bg-glow"
          style={{
            background: `radial-gradient(ellipse at center, ${accuracyColor}08 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Main content */}
      <div className="tuner-content">
        {/* Sharp/Flat indicators */}
        <div className="tuner-indicators">
          <div
            className={`tuner-flat-indicator ${isActive && cents < -5 ? "active" : ""}`}
            style={
              isActive && cents < -5
                ? { color: accuracyColor, opacity: Math.min(1, Math.abs(cents) / 30) }
                : {}
            }
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
            <span className="text-xs font-medium tracking-wider uppercase mt-1">Flat</span>
          </div>

          {/* Note display */}
          <div className="tuner-note-container">
            {isActive ? (
              <>
                <div
                  className="tuner-note-letter"
                  style={{
                    color: accuracyColor,
                    textShadow: accuracyGlow,
                    transition: "color 0.3s ease, text-shadow 0.5s ease",
                  }}
                >
                  {note.name.replace("#", "")}
                  {note.name.includes("#") && (
                    <span className="tuner-sharp-symbol">#</span>
                  )}
                </div>
                <div className="tuner-octave-label">
                  {note.octave}
                </div>
              </>
            ) : (
              <div className="tuner-idle-state">
                {listening ? (
                  <>
                    <div className="tuner-idle-icon listening-pulse">
                      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <p className="text-muted text-lg mt-4">Play a note...</p>
                  </>
                ) : (
                  <>
                    <div className="tuner-idle-icon">
                      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <p className="text-muted text-lg mt-4">Tap to start</p>
                  </>
                )}
              </div>
            )}
          </div>

          <div
            className={`tuner-sharp-indicator ${isActive && cents > 5 ? "active" : ""}`}
            style={
              isActive && cents > 5
                ? { color: accuracyColor, opacity: Math.min(1, Math.abs(cents) / 30) }
                : {}
            }
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            <span className="text-xs font-medium tracking-wider uppercase mt-1">Sharp</span>
          </div>
        </div>

        {/* Deviation wheel */}
        <div className="tuner-wheel-section">
          <div className="tuner-wheel-container">
            {/* Outer ring with tick marks */}
            <svg
              className="tuner-wheel-svg"
              viewBox="0 0 200 200"
              fill="none"
            >
              {/* Background arc */}
              <circle
                cx="100"
                cy="100"
                r="88"
                stroke="rgba(30, 41, 59, 0.5)"
                strokeWidth="2"
                fill="none"
              />

              {/* Tick marks around the arc */}
              {Array.from({ length: 41 }, (_, i) => {
                const angle = -135 + (i / 40) * 270;
                const rad = (angle * Math.PI) / 180;
                const isMajor = i % 10 === 0;
                const isMid = i % 5 === 0;
                const innerR = isMajor ? 74 : isMid ? 78 : 81;
                const outerR = 86;
                const x1 = 100 + innerR * Math.cos(rad);
                const y1 = 100 + innerR * Math.sin(rad);
                const x2 = 100 + outerR * Math.cos(rad);
                const y2 = 100 + outerR * Math.sin(rad);

                let tickColor = "rgba(100, 116, 139, 0.3)";
                if (isActive) {
                  const tickCents = -50 + (i / 40) * 100;
                  const distFromNeedle = Math.abs(tickCents - cents);
                  if (distFromNeedle < 8) {
                    tickColor = accuracyColor;
                  } else if (distFromNeedle < 18) {
                    tickColor = `${accuracyColor}66`;
                  }
                }

                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={tickColor}
                    strokeWidth={isMajor ? 2.5 : isMid ? 1.5 : 1}
                    strokeLinecap="round"
                    style={{ transition: "stroke 0.2s ease" }}
                  />
                );
              })}

              {/* Cent labels */}
              {[-50, -25, 0, 25, 50].map((val, i) => {
                const angle = -135 + ((val + 50) / 100) * 270;
                const rad = (angle * Math.PI) / 180;
                const r = 66;
                const x = 100 + r * Math.cos(rad);
                const y = 100 + r * Math.sin(rad);
                const isCenter = val === 0;
                return (
                  <text
                    key={i}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isCenter && isActive && accuracy === "in-tune" ? accuracyColor : "rgba(100, 116, 139, 0.6)"}
                    fontSize={isCenter ? "11" : "9"}
                    fontWeight={isCenter ? "600" : "400"}
                    style={{ transition: "fill 0.3s ease" }}
                  >
                    {val === 0 ? "0" : val > 0 ? `+${val}` : val}
                  </text>
                );
              })}

              {/* Needle */}
              {isActive && (
                <g
                  style={{
                    transform: `rotate(${wheelRotation}deg)`,
                    transformOrigin: "100px 100px",
                    transition: "transform 0.15s ease-out",
                  }}
                >
                  {/* Needle shadow */}
                  <line
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="22"
                    stroke={`${accuracyColor}33`}
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  {/* Needle body */}
                  <line
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="26"
                    stroke={accuracyColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Needle center dot */}
                  <circle
                    cx="100"
                    cy="100"
                    r="5"
                    fill={accuracyColor}
                    style={{
                      filter: `drop-shadow(0 0 6px ${accuracyColor})`,
                    }}
                  />
                </g>
              )}

              {/* Center resting dot (when inactive) */}
              {!isActive && (
                <circle
                  cx="100"
                  cy="100"
                  r="4"
                  fill="rgba(100, 116, 139, 0.4)"
                />
              )}
            </svg>

            {/* Cents readout in center of wheel */}
            <div className="tuner-wheel-center-text">
              {isActive ? (
                <>
                  <span
                    className="tuner-cents-value"
                    style={{ color: accuracyColor }}
                  >
                    {cents > 0 ? "+" : ""}
                    {cents}
                  </span>
                  <span className="tuner-cents-label">cents</span>
                </>
              ) : (
                <span className="tuner-cents-label">
                  {listening ? "..." : ""}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Frequency readout */}
        <div className="tuner-freq-readout">
          {isActive && frequency && (
            <span>{frequency.toFixed(1)} Hz</span>
          )}
        </div>

        {/* In-tune badge */}
        {isActive && accuracy === "in-tune" && (
          <div className="tuner-in-tune-badge">IN TUNE</div>
        )}
      </div>

      {/* Start/stop button */}
      <button
        onClick={toggleListening}
        className={`tuner-mic-button ${listening ? "active" : ""}`}
        aria-label={listening ? "Stop tuner" : "Start tuner"}
      >
        {listening ? (
          <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="6" width="12" height="12" rx="2" />
          </svg>
        ) : (
          <svg
            width="28"
            height="28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        )}
      </button>

      {/* Error display */}
      {error && (
        <div className="tuner-error">
          {error}
        </div>
      )}
    </div>
  );
}
