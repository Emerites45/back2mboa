# Décisions

## 2026-08-26 — ImpactSection : Lenis + reveal trop violent

- Cause : `html { scroll-behavior: smooth }` combattait le lerp Lenis (CSS 1.3 sans override). `useScroll` lisait un scroll natif par à-coups. Offsets trop courts (~26–46 vh) + ease Material → stats plus rapides que le scroll.
- Fix : `scroll-behavior: auto` sur `html.lenis` ; RAF Lenis branché sur `frame` Framer Motion ; reveal linéaire `"start end"` → `"start 0.18/0.32"`.

## 2026-08-26 — PreludeSection : 7 tells critiques

- Photos : Unsplash conférence / post-it / loft → assets locaux (`resultat_1`, Douala III, `contraste/homme`).
- Ordre : masterclass octobre en tête, salon décembre ensuite. Plus d’eyebrow tracked, pastilles 01–03, tags 99px, Inter, canvas crème.
- Grille variée (`lead` / `reverse` via `order` / CTA) ; radius 4px ; Bricolage ; paper `#FAFAFA`.

## 2026-08-25 — BilletsSection : accordéon horizontal

- Plus d’éjection « imprimante ». Chaque souche est un ticket : au clic elle s’ouvre (`1fr`), les autres restent à `3.5rem` et sont poussées.
- Défaut : GROWTH (ticket 1). Desktop : push 0,55 s + fade/glisse de la face. Mobile : fade + `translateY` sous les souches (pas de push). Premier rendu sans anim.
- Faces fermées `inert`. Panneau détails : fade `is-swap`.

## 2026-08-25 — AgendaSection : fond SVG + autoplay (DA Figma)

- Fond : SVG cercles forest + pin, pas d’orbes CSS. Onglets : pastille chiffrée (01–04) dans un carré à filet couleur.
- Flèches prev/next (SVG inline, pas Lucide). Barre or de l’onglet actif = timer 6,5 s ; `animationend` → slide suivant. Pause hors viewport / `prefers-reduced-motion` (plus de pause hover).
- Conservé : anti-slop (Bricolage, un CTA, pas de ghost / Inter / fade / `<em>`), desktop `100svh`.

## 2026-08-25 — AgendaSection : anti-slop + 100svh

- Conservé : 4 dates, bandeau d’onglets, forest / jaune.
- Retiré : Inter, orbes, pilules, Lucide, chevrons, compteur, ghost CTA, fade, `<em>`, pastilles couleur.
- Copy 02–04 reprise de Prelude / Before-during-after / écosystème. Desktop `100svh` ; mobile hauteur auto.

## 2026-08-25 — BilletsSection : fold + titre

- Desktop `100svh` (≥900px) ; mobile hauteur auto. Titre centré, sans bandeau `--canvas-2`. Ticket desktop plafonné.

## 2026-08-25 — HeroLandingSection : fold + DA

- Section calée sur `100svh` (plus de `paddingTop: 5rem`). Inter, pilule glass, `em` jaune, unicode, lift, nav CSS morte, lien `#salon` mort retirés.
- Conservé : night/forest, jaune, roue Magnific, bandeau 4 chiffres, CTA invitation + programme.
- SVG hero : version d’origine restaurée (`git checkout` de `lib/scene-svg.ts`).

## 2026-08-25 — BoulevardSection : mix des voies

- Plus de `i % 3` sur la liste groupée par secteur (deux mêmes filières collées).
- Deal cyclique `(colonne + rang) % secteurs` : filière et étape changent à chaque carte, y compris à la jointure du marquee.

## 2026-08-25 — BoulevardSection : légende 3×2 + route

- Légende en grille 3×2 (plus d’orphelin « Santé & Social ») ; 2×3 sous 820px.
- Route plus large, grain, bas-côtés crème ; le cartouche casse les pointillés (fond + halo).

## 2026-08-25 — BoulevardSection : retrait des slops IA

- Conservé : centrage head / légende / pied, métaphore route, marquee.
- Retiré : eyebrow pill, formule-métrique en H2, Inter, `#fff`, chips 999px, overlay forest, lift/glow, consignes souris, `will-change`, `data-motion` mort.
- Cartes : icône inline, reveal opacity au hover **et** au focus, 3 colonnes `minmax(0,1fr)` aussi en mobile. Route : aplat `--road`.

## 2026-08-25 — BilletsSection : souches hauteur fixe

- Les 4 talons ont la même hauteur : plus de `margin` différentiel, `min-height: 0` + overflow, nom court (`GROWTH` pas `GROWTH PARTNER`).
- Desktop `min-height: 20rem` sur souches/press ; mobile rangée `6.25rem`.
- Réalisme : feuilles empilées (filet intérieur), perforation sur la souche active.

## 2026-08-25 — BilletsSection : coupon imprimé

- Carnet : souches inactives en retrait, souche active flush (c’est le talon du billet).
- Perforation en demi-cercles + encoches coupon. Cachet « Choisir » (double filet, légère rotation). Cases type boarding-pass. Grain papier léger.
- DA inchangée : papier `#f7f4ec`, forest, Bricolage + IBM Mono, couleurs de pack.

## 2026-08-25 — BilletsSection : feed d’impression

- Changement d’offre : le face du ticket sort de la souche (`translateX/Y`, overflow clip), cylindre (`::before`) en linear. Pas de fade.
- Panneau détails : pressage letterpress (`scaleY` 0.92 → 1). Premier rendu statique (`data-print` après le 1er clic).
- `prefers-reduced-motion` : swap instantané.

## 2026-08-25 — BilletsSection : retrait des slops IA

- Souche active visible (`aria-pressed`), plus de `i === sel ? null`.
- `TicketDesign` démonté de la page (fichiers conservés hors flux).
- Watermark BACK2MBOA, flèches/unicode, stripe 5px, pills, « scannez », chips preuve retirés.
- Interdit Inter ici : Bricolage seul. QR conservé comme motif de souche, code `B2M-2026-{ID}`.

## 2026-08-25 — ImpactSection : émergence réelle derrière les montagnes

- Pas de fade opacity sur les stats : occlusion uniquement via l’alpha des `mount_*.webp` (ciel transparent, relief opaque).
- `TEXT_Y_HIDDEN_1/2` calés sous la crête opaque la plus basse de chaque calque pour que la rangée parte vraiment derrière l’image.

## 2026-08-25 — Sections natives : Tailwind first

- AGENTS.md : Tailwind obligatoire pour sections TSX natives ; CSS fichier réservé aux ports HTML `.b2m-*`.
- `MethodeSection` : hover en Tailwind (`group-hover` / `motion-reduce`), sans scale image ; tuning via `HOVER` + vars `--methode-*`.

## 2026-08-25 — Section Méthode (CAP)

- Nouvelle section `components/sections/methode/` avant `ParcoursSection`.
- Copy + piliers dans `data/methode/`, types dans `types/methode.ts`.
- Images Unsplash (placeholders) ; à remplacer par assets brand quand dispo.

## 2026-08-24 — Port HTML boulevard / partenaires / billets / ressources

- Données extraits JS → `data/boulevard.ts`, `data/partenaires/`, `data/billets/packs.ts`.
- QR billets : `data/billets/qr-paths.ts` (`BILLET_QR_PATHS`), pas de régénération.
- Wrappers CSS obligatoires : `.b2m-blvd`, `.b2m-part`, `.b2m-billets`, `.b2m-ticket`, `.b2m-res`.
- Carte Afrique partenaires : PRNG mulberry32 seed `2026` (SSR = client). `Math.random` interdit.
- TicketDesign hors de `.b2m-billets` pour éviter collision `.ticket` / `.stub`.
- FAQ : lucide-react dans `<i>` pour conserver les sélecteurs CSS (rotation plus, couleur).
- `page.tsx` non modifié : sections exportées, assemblage ultérieur.

## 2026-08-24 — Assemblage HTML dans page.tsx

- Tous les ports HTML sont montés dans `app/(event)/page.tsx` sans retirer les sections déjà en production.
- `OpenRoadSection` n’apparaît qu’une fois (après Plateforme), pour éviter le doublon d’ancrage.
- Liens HTML `#inscrire` / `#partenariat` → `/inscription` et `#partenaires` / `#billets`.
- Logo comparatif : wordmark texte (PNG absent du repo).
