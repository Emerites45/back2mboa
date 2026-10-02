#!/bin/bash
# Cron o2switch — Mode A (statique), docroot domaine :
#   /bin/bash -lc 'APP=$HOME/back2mboa.com; cd "$APP" || exit 0; [ -f deploy.tar.gz ] || exit 0; tar -xzf deploy.tar.gz && rm -f deploy.tar.gz'
set -euo pipefail
APP="${HOME}/back2mboa.com"
cd "$APP" || exit 0
[[ -f deploy.tar.gz ]] || exit 0

LOG="$APP/.extract.log"
{
  echo "=== $(date -u +%Y-%m-%dT%H:%M:%SZ) extract deploy.tar.gz ==="
  tar -xzf deploy.tar.gz
  rm -f deploy.tar.gz
  echo "OK"
} >>"$LOG" 2>&1
