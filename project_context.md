# Back2Mboa — contexte projet

## Quoi
Landing page événement **Back2Mboa** : mise en relation mairies camerounaises, diaspora (solutionneurs) et investisseurs.

## Où / quand
- Musée National du Cameroun, Yaoundé
- 16–17–18 décembre 2026
- 40 mairies, 10 régions

## Stack
- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4, shadcn/ui, Framer Motion
- Polices : Manrope + Oswald
- Package manager : **npm** (`package-lock.json`)

## Architecture (équipe)
Pas de `src/`. Racine Next.js actuelle :

```text
app/(event)/page.tsx          # Assemblage des sections uniquement
components/
  hero/                       # Widgets complexes du hero (slider, countdown)
  sections/<nom>/             # 1 dossier = 1 développeur / 1 section
  ui/                         # shadcn (Button, Dialog…)
  layout/                     # Navbar, etc.
data/                         # Mocks
types/                        # Interfaces partagées
lib/                          # Utils / constantes
```

`page.tsx` importe et empile les sections. Le Hero est encore inline (à extraire en session Hero).

Session figée : **Contraste**, **Potentialités**. Plateforme + Écosystème montés. Écosystème : grille resserrée + orbit CSS 48s (`#digital-twin`).

## État
Landing : Hero → Contraste → Modèle → Potentialités → Écosystème → Plateforme → Open Road → Nécessité. `ActorsSection` existe encore à la racine `sections/` (non isolé, non monté). Pas de backend.
