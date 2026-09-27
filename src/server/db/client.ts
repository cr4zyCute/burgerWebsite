import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '../../db/schema';

// Turso client with fallback to local file or in-memory sqlite
const url = process.env.TURSO_DATABASE_URL || 'file:local.db';
const authToken = process.env.TURSO_AUTH_TOKEN || undefined;

export const rawDbClient = createClient({
  url,
  authToken,
});

export const db = drizzle(rawDbClient, { schema });
