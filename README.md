# Free Harmonica

The first completely free harmonica learning platform. Real-time pitch detection, a full-screen chromatic tuner, interactive song tabs, and structured practice tools — all in the browser.

**Live:** [freeharmonica.com](https://freeharmonica.com)

## Features

- **Chromatic Tuner** — Full-screen note display with a precision deviation wheel. Supports sharp and flat notation. Works for any instrument.
- **Real-Time Pitch Detection** — YIN algorithm running in-browser via the Web Audio API. Detects which harmonica hole and action (blow/draw) you're playing.
- **Song Library** — 10 songs from beginner to advanced with interactive tab playback. Auto-advances as you play the correct notes.
- **Practice Mode** — Free play and guided sequences (scales, patterns, exercises) with scoring.
- **Note Reference Chart** — Interactive chart for the 10-hole diatonic harmonica in C.
- **Mobile Friendly** — Responsive design that works on phones and tablets. iOS microphone support included.
- **No Sign-Up** — No accounts, no paywalls, no tracking beyond optional analytics.

## Tech Stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) 5
- [Tailwind CSS](https://tailwindcss.com/) 4
- Web Audio API (YIN pitch detection — no external audio libraries)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Setup

```bash
# Clone the repo
git clone https://github.com/AkhilKumar-Git/free-harmonica.git
cd free-harmonica

# Install dependencies
npm install

# Copy the example env file and edit as needed
cp .env.example .env.local

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

All branding and external services are configured via environment variables. Copy `.env.example` to `.env.local` and adjust:

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_NAME` | Brand name shown in header, metadata, footer | `Free Harmonica` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Domain for canonical URLs, sitemap, robots.txt | `localhost:3000` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID (optional) | *(empty — disabled)* |

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout, metadata, analytics
│   ├── practice/             # Practice mode (free play + sequences)
│   ├── songs/                # Song library + individual song pages
│   ├── tuner/                # Full-screen chromatic tuner
│   ├── reference/            # Note reference chart
│   └── components/
│       ├── Header.tsx        # Navigation
│       ├── HarmonicaVisual.tsx
│       └── PitchMeter.tsx
├── lib/
│   ├── siteConfig.ts         # Central config from env vars
│   ├── pitchDetection.ts     # YIN pitch detection algorithm
│   ├── chromaticTuner.ts     # Chromatic note matching
│   ├── harmonicaData.ts      # Note mappings for 10-hole C harmonica
│   └── songs.ts              # Song library data
```

## Deployment

Deploy to [Vercel](https://vercel.com) with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AkhilKumar-Git/free-harmonica)

Set the environment variables in your Vercel project settings (Settings > Environment Variables).

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT — see [LICENSE](LICENSE) for details.
<!-- test -->
