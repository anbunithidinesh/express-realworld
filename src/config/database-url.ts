/**
 * Builds DATABASE_URL from individual DB_* env vars for Prisma.
 * If DATABASE_URL is already set, it is left unchanged.
 */
export function buildDatabaseUrl(): string {
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

export function ensureDatabaseUrl(): string {
  const url = buildDatabaseUrl();
  process.env.DATABASE_URL = url;
  return url;
}
