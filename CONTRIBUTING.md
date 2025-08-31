# Contributing to G6 Nova

Thanks for helping improve G6 Nova! This guide keeps changes small, safe, and fast.

## Ground rules
- Be respectful and constructive.
- **Never include secrets or patient/PHI data** in issues, PRs, screenshots, or sample payloads.
- All changes land via Pull Request to `main` (direct pushes are blocked).

## Quick start (local)
Prereqs: Node 20+ and npm 10+.

```bash
npm ci
npm run dev        # if present
npm run test       # if present
npm run lint       # if present
npm run build      # if present
