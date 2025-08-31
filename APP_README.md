# G6 Nova — Web Starter

This is a minimal **Next.js (App Router) + TypeScript + Tailwind** starter.

## Local (optional)
If you run locally:
```bash
npm ci
npm run dev
```
Open http://localhost:3000

## Health check
`/api/health` returns `{ ok: true }`

## Environment variables
Copy `.env.example` → `.env.local` and fill:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
