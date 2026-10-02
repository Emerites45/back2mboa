# Procédures

- Installation : `npm ci` ou `pnpm install --frozen-lockfile` à la racine `back2mboa/`.
- Développement : `npm run dev` ou `pnpm dev` à la racine `back2mboa/`.
- Production : `npm run build && npm run start` ou `pnpm build && pnpm start`.
- CSS de port HTML : wrapper `.b2m-*` obligatoire autour du markup d’origine.
- Liens : `next/link` vers `/inscription`, `#billets`, `#partenaires`.
- `app/(event)/page.tsx` = assemblage uniquement : importer la section, la poser dans le flux, ne pas y mettre de logique métier.

## Deploy o2switch (Mode A — statique)

1. Secrets : `FTP_HOST`, `FTP_USER`, `FTP_PASSWORD`.
2. **o2switch — une fois** :
   - Setup Node.js App → **Arrêter** puis **Détruire** l’app `back2mboa` (sinon Passenger garde le 500).
   - Compte FTP `williams@back2mboa.com` : répertoire = `back2mboa.com` (docroot), **pas** `back2mboa`.
   - Cron (chaque minute), cible docroot :
     ```bash
     /bin/bash -lc 'APP=$HOME/back2mboa.com; cd "$APP" || exit 0; [ -f deploy.tar.gz ] || exit 0; tar -xzf deploy.tar.gz && rm -f deploy.tar.gz'
     ```
3. Push `main` → Actions build `out/` → upload `deploy.tar.gz` (logs % via `pv`).
4. Vérifier https://back2mboa.com/ (doit servir `index.html`, plus d’erreur Passenger).

