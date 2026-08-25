# Procédures

- `npm run dev` à la racine `back2mboa/`.
- CSS de port HTML : wrapper `.b2m-*` obligatoire autour du markup d’origine.
- Liens : `next/link` vers `/inscription`, `#billets`, `#partenaires`.
- `app/(event)/page.tsx` = assemblage uniquement : importer la section, la poser dans le flux, ne pas y mettre de logique métier.
