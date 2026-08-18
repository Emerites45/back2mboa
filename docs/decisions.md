# Décisions

## 2026-08-18 - Fusion parcours / liaison / musée

- Branche `feat/parcours-liaison-musee`
- Hero extrait dans `components/sections/HeroSection.tsx`
- `app/(event)/page.tsx` assemble uniquement les sections
- Sections LandingPage_ ajoutées sous le hero : Parcours, Liaison, Musée (+ ticker collé)
- Tokens brand (`brand-*`, display M3) ajoutés sans écraser la palette shadcn du hero
- Roboto limité au bloc clair via `--font-roboto`
- Lenis non porté : scroll CSS déjà en place dans back2mboa
