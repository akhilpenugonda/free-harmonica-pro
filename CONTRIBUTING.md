# Contributing to Free Harmonica

Thanks for your interest in contributing! This guide covers the conventions and process for making changes.

## Getting Started

```bash
# Fork the repo on GitHub, then clone your fork
git clone https://github.com/<your-username>/free-harmonica-pro.git
cd free-harmonica-pro

# Install dependencies
npm install

# Copy environment config
cp .env.example .env.local

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Branch Naming

All branches must follow this naming convention (enforced by GitHub rulesets):

| Prefix | Purpose | Example |
|---|---|---|
| `feature/` | New features | `feature/song-search` |
| `fix/` | Bug fixes | `fix/ios-mic-permission` |
| `chore/` | Maintenance, deps, config | `chore/update-next` |
| `docs/` | Documentation changes | `docs/add-api-guide` |
| `refactor/` | Code restructuring | `refactor/pitch-detection` |

Use lowercase with hyphens: `feature/my-new-feature`, not `Feature/MyNewFeature`.

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/). Every commit message should be structured as:

```
<type>: <description>

[optional body]
```

### Types

| Type | When to Use |
|---|---|
| `feat` | Adding a new feature |
| `fix` | Fixing a bug |
| `chore` | Maintenance (deps, config, CI) |
| `docs` | Documentation only |
| `refactor` | Restructuring code (no behavior change) |
| `style` | Formatting, whitespace |
| `test` | Adding or updating tests |
| `perf` | Performance improvements |
| `ci` | CI/CD changes |
| `build` | Build system changes |
| `revert` | Reverting a previous commit |

### Examples

```
feat: add chromatic tuner page
fix: resolve overlapping buttons on mobile
chore: update tailwind to v4.1
docs: add contributing guide
refactor: extract pitch detection into hook
```

## Pull Request Process

1. **Create a branch** from `main` following the naming convention above
2. **Make your changes** with clear, conventional commit messages
3. **Test locally** — run `npm run lint` and `npm run build` before pushing
4. **Push your branch** and open a PR against `main`
5. **Fill out the PR template** — describe what changed and why
6. **PR title must follow Conventional Commits** (e.g. `feat: add song search`) — this is enforced by CI
7. **Wait for review** — at least one approval is required before merging

## Code Style

- **TypeScript** — all new code should be in TypeScript
- **ESLint** — run `npm run lint` to check; follows Next.js recommended rules
- **Tailwind CSS** — use utility classes; avoid custom CSS unless necessary
- **Components** — place shared components in `src/app/components/`
- **Libraries** — place utility functions and data in `src/lib/`
- **Environment variables** — never hardcode domains, API keys, or brand names; use `src/lib/siteConfig.ts`

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── components/         # Shared UI components
│   ├── practice/           # Practice mode
│   ├── songs/              # Song library
│   ├── tuner/              # Chromatic tuner
│   └── reference/          # Note chart
├── lib/
│   ├── siteConfig.ts       # Central config (reads env vars)
│   ├── pitchDetection.ts   # YIN algorithm
│   ├── chromaticTuner.ts   # Chromatic note detection
│   ├── harmonicaData.ts    # Harmonica note mappings
│   └── songs.ts            # Song data
```

## Reporting Issues

- Use the **Bug Report** template for bugs
- Use the **Feature Request** template for ideas
- Check existing issues before creating a new one

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
