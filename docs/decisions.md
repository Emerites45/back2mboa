# Décisions

## 2026-08-18 — Architecture landing collaborative

**Contexte** : plusieurs développeurs/designers sur le même dépôt GitHub. Chaque personne possède une section.

**Décision** :
- Pas de dossier `src/` : Next.js 16 est déjà à la racine (`app/`, `components/`).
- Assemblage uniquement dans `app/(event)/page.tsx`.
- Une section = un dossier `components/sections/<nom-kebab>/` (évite les conflits Git).
- Composants complexes d’une section (slider, timer) restent dans `components/hero/` ou dans le dossier de la section si spécifiques.
- Package manager : **npm** (`package-lock.json`). Ne pas lancer `pnpm install` sur ce repo.

**Conséquence** : extraire le Hero actuellement inline dans `page.tsx` vers `components/sections/hero/` au moment de la session Hero.

## 2026-08-18 — Session Contraste

Cadre `.contraste-cards-wrapper` : gouttière `rgba(140,160,162,0.45)` (#8CA0A2), radius 20px, padding 24px. Photo 680px (niveau des mains), fond `#102B24`. Grille 5 × `1fr`. Hover carte : `translateY(-12px) scale(1.02)` + ombre.

## 2026-08-21 — Contraste sans portrait

Portrait `homme.jpeg` retiré. Recalé sur maquette fond vert uni, kicker « Le Contraste », 5 cartes (1re = Le Maire). `id="contraste"`.

## 2026-08-19 — Session Potentialités

Nouvelle arborescence isolée `components/sections/potentialites/` + `data/potentialites/` + `types/potentialites.ts`.  
29 fiches Word + maires Excel, sans invention de données. Carte PNG + overlay SVG 10 régions. Route `/potentialites` et ancre `/#potentialites`.

## 2026-08-19 — Contours carte (Option A)

Les 10 paths SVG ne sont plus des bounding-boxes. Source : GADM 4.1 ADM1 (`cmr-adm1.geojson`), projection UTM 33N + affine calée sur le masque terrestre de `carte_cameroun.png` (`scripts/calibrate_cmr_map.py`).  
LocationIQ reste hors périmètre frontières (fichier `LocationIQ.txt` gitignoré). `object-fit: contain` conservé.

## 2026-08-19 — Filtrage secteurs sur la carte

Clic secteur → pastilles communales (or / aqua si sélection) via `markersForSector` + projection `geo.ts`. Mapping strict sur la colonne Opportunités. Finance sans occurrence dans le corpus = état vide.

## 2026-08-19 — Indicateur régional

Au clic d’une région : overlay `RegionStatsCard` (nom, effectif du corpus, somme des populations Word). Pas de totaux administratifs inventés.

## 2026-08-19 — Session Plateforme (Bonne Porte)

Section `#plateforme` : maquette crème `#F5F0E1`, forest `#1A4A3A`, aujourd’hui `#E05A3C`. Onglets pills + cartes Aujourd’hui / Avec Back2Mboa. Copy Maires uniquement (autres profils : onglets sans fiches inventées).

## 2026-08-19 — Section Écosystème

Nouveau dossier isolé `ecosysteme/` : 3 colonnes (titre serif + phone Digital Twin + Mayor Calls). `id="digital-twin"`. Fraunces via `next/font`.

## 2026-08-19 — Section Nécessité

Nouveau dossier isolé `necessite/` : 4 cartes constats + phrase d’impact + tableau comparatif Salons / Forums / Back2Mboa. `id="necessite"`. Copy figée, pas d’invention.

## 2026-08-19 — Section Le Modèle

Nouveau dossier isolé `modele/` : 6 cartes secteurs, fond `#F9F9F9`, griffes décoratives. Métriques corpus. `id="modele"`. Clic → `#potentialites`.

## 2026-08-19 — Section Open Road

Nouveau dossier isolé `open-road/` : hero full-bleed style streaming, photo `femme.jpg`. `id="open-road"`. Copy maquette, pas d’invention.

## 2026-08-21 — Open Road recalé maquette NG

`open-road/` recréé sur `National Geographic.png` : photo route, wordmark, barre programmes bas-droite, filet or actif. JPEG local `national-geographic.jpg`.

## 2026-08-21 — Open Road recalé maquette NG new

`open-road/` recalé sur `National Geographic new.png` : Monument de la Réunification, horaires 6PM / 8PM / 21 juillet, « View all ». JPEG local mis à jour.

## 2026-08-21 — Section Preuve par les chiffres

Nouveau dossier isolé `preuve-chiffres/` : KPI 2022/2023 + tableau Meet Administrations / Meet Écosystème. Copy extraite de `01_Preuve_Chiffres_2022_2023 1.png`, sans invention. `id="preuve-chiffres"`. Montée après Open Road.

## 2026-08-21 — Section Agenda 2026

Nouveau dossier isolé `agenda/` : carousel 4 rendez-vous. Copy slide 01 issue de `Back2Mboa section Events SVG Grok 1.png`. Onglets 02–04 : titres/dates maquette uniquement. `id="agenda"`. Montée après Preuve.

## 2026-08-21 — Section Mairies Championnes

Nouveau dossier isolé `mairies-championnes/` : carousel 6 territoires (SVG maquette + HTML). `id="mairies-championnes"`. Copy figée. Autoplay 6,2 s.

## 2026-08-20 — Ordre landing (maquette verticale)

Assemblage dans `page.tsx` calé sur le fil narratif de la capture : Hero → Contraste → Modèle → Potentialités → Écosystème → Plateforme → Open Road → Nécessité. Bandeau stats 4 icônes et footer paysage absents du code (non inventés).
