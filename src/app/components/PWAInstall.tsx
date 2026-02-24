"use client";

import { useState, useEffect, useCallback } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type BannerState =
  | { type: "hidden" }
  | { type: "ios" }
  | { type: "android"; prompt: BeforeInstallPromptEvent };

export default function PWAInstall() {
  const [banner, setBanner] = useState<BannerState>({ type: "hidden" });

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator &&
        (navigator as unknown as { standalone: boolean }).standalone);
    if (isStandalone) return;

    const ua = navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua) && !("MSStream" in window);

    if (ios) {
      if (!sessionStorage.getItem("pwa-ios-dismissed")) {
        requestAnimationFrame(() => setBanner({ type: "ios" }));
      }
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      if (!sessionStorage.getItem("pwa-dismissed")) {
        setBanner({ type: "android", prompt: e as BeforeInstallPromptEvent });
      }
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = useCallback(async () => {
    if (banner.type !== "android") return;
    await banner.prompt.prompt();
    const { outcome } = await banner.prompt.userChoice;
    if (outcome === "accepted") {
      setBanner({ type: "hidden" });
    }
  }, [banner]);

  const dismiss = () => {
    sessionStorage.setItem(
      banner.type === "ios" ? "pwa-ios-dismissed" : "pwa-dismissed",
      "1",
    );
    setBanner({ type: "hidden" });
  };

  if (banner.type === "hidden") return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-40 animate-fade-in">
      <div className="glass rounded-2xl border border-card-border shadow-2xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-accent to-accent-secondary flex items-center justify-center text-white font-bold text-xl shrink-0">
            H
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold mb-1">Install Free Harmonica</h3>
            {banner.type === "ios" ? (
              <p className="text-xs text-muted leading-relaxed">
                Tap the{" "}
                <svg
                  className="inline w-4 h-4 text-accent -mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>{" "}
                Share button, then &ldquo;Add to Home Screen&rdquo; for the
                full app experience.
              </p>
            ) : (
              <p className="text-xs text-muted leading-relaxed">
                Add to your home screen for quick access and an app-like
                experience — even offline.
              </p>
            )}
          </div>
          <button
            onClick={dismiss}
            className="text-muted hover:text-foreground transition-colors shrink-0 -mt-1 -mr-1 p-1"
            aria-label="Dismiss"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {banner.type === "android" && (
          <button
            onClick={install}
            className="mt-4 w-full py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors"
          >
            Install App
          </button>
        )}
      </div>
    </div>
  );
}
