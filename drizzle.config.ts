import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './schema/schema.ts',
  out: './schema/migration',
  driver: 'mysql2',
  dbCredentials: {
    host: process.env.DB_HOST!,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME!,
  },
} satisfies Config;
