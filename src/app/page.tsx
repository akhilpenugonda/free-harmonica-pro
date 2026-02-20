import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { SONGS } from "@/lib/songs";
import ProgressSummary from "./components/ProgressSummary";

export const metadata: Metadata = {
  title: `${siteConfig.name} - Learn Harmonica for Free | Practice Songs & Notes`,
  description: `${siteConfig.description} No sign-ups, no paywalls.`,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteConfig.name,
    description: siteConfig.ogDescription,
    url: siteConfig.url,
    applicationCategory: "MusicApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Real-time pitch detection",
      "Full-screen chromatic tuner",
      "Interactive harmonica tabs",
      "10 famous songs",
      "Practice sequences and scales",
      "Note reference chart",
      "No sign-up required",
    ],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center animate-slide-up">
            {/* Free badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/30 mb-8">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-medium text-success">
                First Ever Completely Free Harmonica Learning Platform
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Master the{" "}
              <span className="gradient-text">Harmonica</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
              Practice single notes with real-time pitch detection, learn famous songs
              with interactive tabs, and track your progress. No payments, no
              subscriptions &mdash; just pure music.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/practice"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-accent-secondary text-white font-semibold text-lg hover:shadow-lg hover:shadow-accent/30 transition-all hover:scale-105 active:scale-95"
              >
                Start Practicing
              </Link>
              <Link
                href="/songs"
                className="px-8 py-4 rounded-xl border border-card-border text-foreground font-semibold text-lg hover:bg-white/5 transition-all hover:scale-105 active:scale-95"
              >
                Browse Songs
              </Link>
            </div>
          </div>

          {/* Progress summary (only shows if user has completed songs) */}
          <div className="mt-10 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <ProgressSummary totalSongs={SONGS.length} />
          </div>

          {/* Hero harmonica illustration */}
          <div className="mt-12 flex justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <div className="flex gap-1.5 sm:gap-2 p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 shadow-2xl border border-gray-600/30">
                {Array.from({ length: 10 }, (_, i) => (
                  <div
                    key={i}
                    className="w-9 sm:w-12 h-9 sm:h-12 rounded-lg bg-gray-900 border border-gray-700 flex items-center justify-center text-sm sm:text-base font-bold text-gray-500 hover:border-accent hover:text-accent transition-all cursor-default"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-card border border-card-border text-xs text-muted">
                10-Hole Diatonic in C
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Learn</span>
            </h2>
            <p className="text-muted text-lg max-w-xl mx-auto">
              Professional-grade tools, completely free. No catch.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass rounded-2xl p-8 hover:border-accent/30 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-accent/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Pitch Detection</h3>
              <p className="text-muted leading-relaxed">
                Use your microphone to detect the note you&apos;re playing in real-time. See if
                you&apos;re in tune with instant visual feedback.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass rounded-2xl p-8 hover:border-accent-secondary/30 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-accent-secondary/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Famous Songs Library</h3>
              <p className="text-muted leading-relaxed">
                Learn iconic songs from Beatles to Beethoven with interactive harmonica
                tabs. Follow along note by note at your own pace.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass rounded-2xl p-8 hover:border-success/30 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-success/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Structured Practice</h3>
              <p className="text-muted leading-relaxed">
                Practice sequences, scales, and exercises designed for each skill
                level. From your first note to advanced bending techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Grab Your Harmonica", desc: "Any 10-hole diatonic harmonica in C will work perfectly." },
              { step: "02", title: "Allow Microphone", desc: "Grant microphone access so we can detect your notes in real-time." },
              { step: "03", title: "Start with Singles", desc: "Practice individual holes to build clear, clean single notes." },
              { step: "04", title: "Play Songs", desc: "Follow along with interactive tabs to play your favorite songs." },
            ].map((item) => (
              <div key={item.step} className="glass rounded-xl p-6 text-center hover:border-accent/30 transition-all">
                <div className="text-3xl font-bold gradient-text mb-3">{item.step}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card/30">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted text-lg mb-8">
            No sign-ups, no paywalls, no limits. Just grab your harmonica and go.
          </p>
          <Link
            href="/practice"
            className="inline-block px-10 py-4 rounded-xl bg-gradient-to-r from-accent to-accent-secondary text-white font-semibold text-lg hover:shadow-lg hover:shadow-accent/30 transition-all hover:scale-105 active:scale-95"
          >
            Start Playing Now
          </Link>
        </div>
      </section>

    </div>
  );
}
