# Décisions

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
