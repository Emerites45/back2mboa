# MVP — Landing Back2Mboa

## Objectif
Landing page de l’événement **Back2Mboa** (16–17–18 décembre 2026, Musée National, Yaoundé) : présenter l’événement, les acteurs, et convertir vers l’inscription.

## Périmètre
- Page unique assemblée dans `app/(event)/page.tsx`
- Sections isolées sous `components/sections/<nom>/`
- Données mock dans `data/` (pas de backend métier)
- UI bas niveau via `components/ui/` (shadcn)

## Hors périmètre (pour l’instant)
- Auth, CMS, paiement
- Route `/inscription` fonctionnelle (lien prévu, flux non livré)

## Critère de done d’une section
1. Dossier dédié sous `components/sections/`
2. Export nommé `XxxSection`
3. Données dans `data/` si besoin
4. Types partagés dans `types/` si réutilisés
5. Import unique dans `app/(event)/page.tsx` — aucun markup de section dans la page
