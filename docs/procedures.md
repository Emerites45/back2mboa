# Procédures

- Installation : `npm ci` ou `pnpm install --frozen-lockfile` à la racine `back2mboa/`.
- Développement : `npm run dev` ou `pnpm dev` à la racine `back2mboa/`.
- Production : `npm run build && npm run start` ou `pnpm build && pnpm start`.
- CSS de port HTML : wrapper `.b2m-*` obligatoire autour du markup d’origine.
- Liens : `next/link` vers `/inscription`, `#billets`, `#partenaires`.
- `app/(event)/page.tsx` = assemblage uniquement : importer la section, la poser dans le flux, ne pas y mettre de logique métier.

## Deploy o2switch

1. Secrets repo (`gh secret list`) : `SSH_HOST`, `SSH_USER`, `SSH_PORT`, `SSH_PRIVATE_KEY`, `DEPLOY_PATH`.
2. o2switch → Setup Node.js App : Node ≥ 20, Production, racine `back2mboa`, startup `server.js`.
3. Push sur `main` ou Actions → **Deploy o2switch** → Run workflow.
4. Après deploy : ouvrir l’URL de l’app ; si 503, Restart dans Setup Node.js App.
