# Procédures

- Installation : `npm ci` ou `pnpm install --frozen-lockfile` à la racine `back2mboa/`.
- Développement : `npm run dev` ou `pnpm dev` à la racine `back2mboa/`.
- Production : `npm run build && npm run start` ou `pnpm build && pnpm start`.
- CSS de port HTML : wrapper `.b2m-*` obligatoire autour du markup d’origine.
- Liens : `next/link` vers `/inscription`, `#billets`, `#partenaires`.
- `app/(event)/page.tsx` = assemblage uniquement : importer la section, la poser dans le flux, ne pas y mettre de logique métier.
