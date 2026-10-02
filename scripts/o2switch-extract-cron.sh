#!/bin/bash
# Cron o2switch (toutes les minutes) :
#   * * * * * /bin/bash /home/tesp3994/back2mboa/scripts/o2switch-extract-cron.sh
# Ou coller le corps dans « Tâches cron » cPanel en une ligne.
set -euo pipefail
APP="${HOME}/back2mboa"
cd "$APP" || exit 0
[[ -f deploy.tar.gz ]] || exit 0

LOG="$APP/tmp/extract.log"
mkdir -p "$APP/tmp"
{
  echo "=== $(date -u +%Y-%m-%dT%H:%M:%SZ) extract deploy.tar.gz ==="
  tar -xzf deploy.tar.gz
  rm -f deploy.tar.gz
  date -u +%Y-%m-%dT%H:%M:%SZ > tmp/restart.txt
  rm -f tmp/DEPLOY_EXTRACT
  echo "OK"
} >>"$LOG" 2>&1
