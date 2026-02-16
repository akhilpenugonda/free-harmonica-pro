"use client";

interface PitchMeterProps {
  cents: number; // -50 to +50
  isActive: boolean;
}

export default function PitchMeter({ cents, isActive }: PitchMeterProps) {
  const clampedCents = Math.max(-50, Math.min(50, cents));
  const percentage = ((clampedCents + 50) / 100) * 100;
  const isInTune = Math.abs(cents) < 10;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative h-8 rounded-full bg-gray-800 overflow-hidden border border-card-border">
        {/* Background gradient */}
        <div className="absolute inset-0 flex">
          <div className="flex-1 bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-transparent" />
          <div className="w-8 bg-green-500/20" />
          <div className="flex-1 bg-gradient-to-l from-red-500/20 via-yellow-500/20 to-transparent" />
        </div>

        {/* Center marker */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-green-500/50 -translate-x-1/2" />

        {/* Indicator needle */}
        {isActive && (
          <div
            className="absolute top-1 bottom-1 w-1 rounded-full transition-all duration-150"
            style={{
              left: `${percentage}%`,
              transform: "translateX(-50%)",
              backgroundColor: isInTune ? "#10b981" : Math.abs(cents) < 25 ? "#f59e0b" : "#ef4444",
              boxShadow: isInTune
                ? "0 0 10px rgba(16, 185, 129, 0.6)"
                : "0 0 10px rgba(239, 68, 68, 0.4)",
            }}
          />
        )}
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-1 text-xs text-muted">
        <span>-50&#162;</span>
        <span className={isInTune && isActive ? "text-success font-bold" : ""}>
          In Tune
        </span>
        <span>+50&#162;</span>
      </div>
    </div>
  );
}
