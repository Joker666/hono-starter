import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import env from './src/lib/env';

export default {
  schema: './schema/schema.ts',
  out: './schema/migration',
  driver: 'mysql2',
  dbCredentials: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
} satisfies Config;
