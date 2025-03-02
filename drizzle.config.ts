import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import env from './src/lib/env.js';

export default defineConfig({
  schema: '.src/db/schema/schema.ts',
  out: '.src/db/schema/migration',
  dialect: 'mysql',
  dbCredentials: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
  verbose: true,
  strict: true,
});
