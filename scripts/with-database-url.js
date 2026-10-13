/**
 * Preload for Prisma CLI so DATABASE_URL is built from DB_* vars in .env.
 * Usage: node -r ./scripts/with-database-url.js ./node_modules/prisma/build/index.js <command>
 */
const fs = require('fs');
const path = require('path');

function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) {
    return;
  }

  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const eq = trimmed.indexOf('=');
    if (eq === -1) {
      continue;
    }

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function buildDatabaseUrl() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const user = encodeURIComponent(process.env.DB_USER || '');
  const password = encodeURIComponent(process.env.DB_PASSWORD || '');
  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT || '5432';
  const name = process.env.DB_NAME || '';
  const schema = process.env.DB_SCHEMA || 'public';

  if (!user || !name) {
    throw new Error(
      'Database config missing: set DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME (and optional DB_SCHEMA), or provide DATABASE_URL',
    );
  }

  return `postgresql://${user}:${password}@${host}:${port}/${name}?schema=${schema}`;
}

loadEnvFile();
process.env.DATABASE_URL = buildDatabaseUrl();
