<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Back2Mboa — conventions équipe

- npm uniquement (`npm run dev`). Ne pas utiliser pnpm sur ce repo.
- `app/(event)/page.tsx` = assemblage des sections, rien d’autre.
- Chaque section vit dans `components/sections/<nom>/` (un dossier par développeur).
- Mocks dans `data/`, types partagés dans `types/`, UI dans `components/ui/`.
- Pas de dossier `src/` : le projet est à la racine.
- Docs : `docs/mvp.md`, `docs/decisions.md`, `docs/procedures.md`.

