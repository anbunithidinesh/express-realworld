#!/usr/bin/env bash
# Production deploy: install, generate Prisma client, build, migrate, start with PM2.
# Usage:
#   chmod +x scripts/deploy.sh
#   ./scripts/deploy.sh
# Optional: PM2_APP_NAME=my-api ./scripts/deploy.sh
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

APP_NAME="${PM2_APP_NAME:-conduit-api}"

if [[ ! -f .env ]]; then
  echo "Error: .env not found at $ROOT_DIR/.env" >&2
  echo "Create it with DB_*, JWT_SECRET, PORT, NODE_ENV, etc. before deploying." >&2
  exit 1
fi

# Load .env into the environment (node does not auto-load it in production)
set -a
# shellcheck disable=SC1091
source .env
set +a

export NODE_ENV="${NODE_ENV:-production}"

if ! command -v pm2 >/dev/null 2>&1; then
  echo "==> Installing pm2 globally"
  npm install -g pm2
fi

echo "==> Installing dependencies"
npm ci

echo "==> Generating Prisma client"
npm run prisma:generate

echo "==> Building app"
npm run build

echo "==> Applying database migrations"
npm run prisma:migrate

echo "==> Starting / reloading with PM2 ($APP_NAME, PORT=${PORT:-3000})"
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  # Delete + start so updated .env values are applied cleanly
  pm2 delete "$APP_NAME"
fi
pm2 start ecosystem.config.cjs --only "$APP_NAME" --update-env
pm2 save

echo "==> Deploy complete. Useful commands:"
echo "    pm2 status"
echo "    pm2 logs $APP_NAME"
echo "    pm2 restart $APP_NAME"
