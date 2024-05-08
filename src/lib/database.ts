import { Logger as drizzleLogger } from 'drizzle-orm/logger';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../../schema/schema';
import { userTable } from '../../schema/schema';
import { logger } from './logger';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export interface DatabaseError {
  type: string;
  message: string;
  stack?: string;
  code: string;
  errno: number;
  sql: string;
  sqlState: string;
  sqlMessage: string;
}

export type User = typeof userTable.$inferSelect;
export type NewUser = typeof userTable.$inferInsert;

class DBLogger implements drizzleLogger {
  logQuery(query: string, params: unknown[]): void {
    logger.debug({ query, params });
  }
}

const db = drizzle(connection, { schema: schema, mode: 'default', logger: new DBLogger() });
export { connection, db };
