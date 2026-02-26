# Basecamp Coffee — Quiz Project

## What this is
A 5-question "What's Your Coffee Personality?" quiz for Basecamp Coffee.

**Live site:** https://cc4e-coffee-personality-quiz.vercel.app
**GitHub:** https://github.com/SergioRoldanV/CC4E-Coffee-Personality-Quiz

## Tech Stack
- Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- Deployed on Vercel — auto-deploys on every push to `master`

## Key Files
- `app/page.tsx` — entire quiz (single client component, all logic and UI)
- `app/layout.tsx` — metadata, Google Fonts (Bebas Neue + Inter)
- `app/globals.css` — base styles, background #f0ece6
- `REQUIREMENTS.md` — quiz questions, personality types, and design spec

## Design Decisions
- **Single file** — all quiz logic and UI lives in `page.tsx`, no separate components
- **Auto-advance** — selecting an answer immediately moves to the next question (no Next button)
- **Tie-breaking** — ties resolved by favoring the answer to the first question
- **Inline styles** — styles are written as inline React style objects, not Tailwind classes

## Visual Style
- Background: #f0ece6 (warm beige)
- Header: #2a1f14 (dark brown)
- Accent/gold: #e8b86d
- Fonts: Bebas Neue (headings), Inter (body)

## Workflow
- Always run `npm run build` before pushing — Vercel runs the same check and will fail if it doesn't pass locally
- To save changes: commit and push to GitHub, Vercel auto-deploys
