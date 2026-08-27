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
- Polices : Bricolage Grotesque, Inter, IBM Plex Mono, Fraunces (`layout.tsx`)
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

`page.tsx` importe et empile les sections. Hero extrait dans `HeroSection` (main).

Sections HTML Back2Mboa montées dans `app/(event)/page.tsx` (wrappers `.b2m-*`) :
- Hero landing (`.b2m-hero`) + roue client
- Comparatif (`.b2m-cmp`)
- Bonne porte (`.b2m-porte`, tabs)
- Boulevard (`.b2m-blvd`)
- Before / During / After (`.b2m-bda`)
- Prélude (`.b2m-prelude`)
- Salon diaspora (`.b2m-salon`)
- Preuves pilotes (`.b2m-pilotes`, carousels 3 s)
- Bâtisseurs (`.b2m-bat`)
- Partenaires (`.b2m-part`)
- Billets (`.b2m-billets`) + TicketDesign (`.b2m-ticket`)
- Ressources FAQ / médias / guides (`.b2m-res`)

Session figée : **Contraste**, **Potentialités**. Plateforme + Écosystème montés. Écosystème : grille resserrée + orbit CSS 48s (`#digital-twin`).

## État
Branche `feat/section_paul_alain` synchronisée avec `origin/main` + `feat/section_williams` + `feat/parcours-liaison-musee` (sans `vue-globale`).

Landing : Hero → Contraste → Pourquoi → Open Road → Mairies → Modèle → Potentialités → Nécessité → Plateforme → Impact → Méthode → Parcours → Résultats / Preuve → Prélude → Liaison → Musée → Écosystème → Stories / Ticker → Boulevard → Hero landing → Agenda → Partenaires → Billets. Ports HTML `.b2m-*` disponibles (certains commentés). `ActorsSection` existe encore à la racine `sections/` (non isolé, non monté). Pas de backend.

Sections Paul-Alain récentes : Pourquoi (`#pourquoi`), Partenaires (carte Cameroun / `cameroon-path.ts`), photos Modèle `secteurs/`.
