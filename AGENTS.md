<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Back2Mboa — conventions équipe

## Stack & outillage
- Pas de dossier `src/` : le projet est à la racine.
- Docs : `docs/mvp.md`, `docs/decisions.md`, `docs/procedures.md`.

## Architecture des sections
- `app/(event)/page.tsx` = assemblage des sections, rien d’autre.
- Chaque section : `components/sections/<nom-kebab>/` (ex. `methode/`, `open-road/`).
- Export nommé PascalCase aligné sur le dossier : `MethodeSection`, `OpenRoadSection`.
- Mocks : `data/<nom-kebab>/` (ou fichier plat si petit).
- Types partagés : `types/<nom-kebab>.ts`.
- UI primitive : `components/ui/` (shadcn).
- Consts de tuning en tête de section : `TYPE`, `SECTION`, `CARD`, `HOVER`, `WATERMARK` (comme `ResultatsSection` / `MethodeSection`).

## Styles — Tailwind d’abord
- **Sections natives (TSX)** : Tailwind CSS obligatoire (`className` + `cn()`). Pas de fichier `.css` dédié.
- Tokens / couleurs brand : `app/globals.css` (`@theme`, `:root`, utilitaires globaux type `.text-grad-result`).
- Valeurs tuning (tailles, ombres, hover) : objet `const` en tête + `style={{}}` / CSS variables `--methode-*` si besoin ; les états (`hover:`, `group-hover:`, `motion-reduce:`) restent en classes Tailwind.
- Motion : `transform` / `opacity` uniquement ; toujours prévoir `motion-reduce:`.
- **Exception — ports HTML** (`.b2m-*`) : CSS co-localisé autorisé ; sections client si interactives ; `className` uniquement (pas de `class`).

## Nommage
| Élément | Convention | Exemple |
|---|---|---|
| Dossier section | kebab-case | `methode/`, `mairies-championnes/` |
| Composant | PascalCase + `Section` | `MethodeSection.tsx` |
| Data | `data/<kebab>/` | `data/methode/index.ts` |
| Types | `types/<kebab>.ts` | `types/methode.ts` |
| Id ancre | kebab | `id="methode"` |
| CSS vars section | `--<section>-*` | `--methode-lift` |
| Ports HTML wrapper | `.b2m-*` | `.b2m-blvd` |
