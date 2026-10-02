# Procédures

- Installation : `npm ci` ou `pnpm install --frozen-lockfile` à la racine `back2mboa/`.
- Développement : `npm run dev` ou `pnpm dev` à la racine `back2mboa/`.
- Production : `npm run build && npm run start` ou `pnpm build && pnpm start`.
- CSS de port HTML : wrapper `.b2m-*` obligatoire autour du markup d’origine.
- Liens : `next/link` vers `/inscription`, `#billets`, `#partenaires`.
- `app/(event)/page.tsx` = assemblage uniquement : importer la section, la poser dans le flux, ne pas y mettre de logique métier.

## Deploy o2switch

1. Secrets : `FTP_HOST`, `FTP_USER`, `FTP_PASSWORD` (FTP chrooté sur `~/back2mboa`).
2. Setup Node.js App : Node 24, Production, racine `back2mboa`, startup `server.js`.
3. **Cron extract** (cPanel → Tâches cron, chaque minute) :
   ```bash
   /bin/bash -lc 'APP=$HOME/back2mboa; cd "$APP" || exit 0; [ -f deploy.tar.gz ] || exit 0; tar -xzf deploy.tar.gz && rm -f deploy.tar.gz && mkdir -p tmp && date -u > tmp/restart.txt'
   ```
4. Push `main` → Actions build → upload `deploy.tar.gz` (barre % dans les logs) → cron dézippe ≤1 min.
5. Extract manuel immédiat (SSH depuis ton PC) :
   ```bash
   ssh tesp3994@oursin.o2switch.net 'cd ~/back2mboa && tar -xzf deploy.tar.gz && rm -f deploy.tar.gz && mkdir -p tmp && touch tmp/restart.txt'
   ```

