# What's Your Coffee Personality? — Basecamp Coffee Quiz

A 5-question personality quiz that recommends a coffee based on who you are.

**Live site:** https://cc4e-coffee-personality-quiz.vercel.app

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [Tailwind CSS v4](https://tailwindcss.com)
- TypeScript
- Deployed on [Vercel](https://vercel.com)

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying

Push to the `master` branch on GitHub — Vercel auto-deploys on every push.

To verify the build passes before pushing:

```bash
npm run build
```

## Project Structure

```
app/
  layout.tsx   # Metadata, Google Fonts (Bebas Neue + Inter)
  globals.css  # Base styles, color variables
  page.tsx     # Full quiz app (single client component)
```

## Quiz Logic

- 5 questions, 4 options each
- Each option maps to one of 4 personality types
- Result = personality with the most answers
- Tie-breaking: favors the answer given to the first question
