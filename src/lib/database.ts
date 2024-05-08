import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../../schema/schema';
import { userTable } from '../../schema/schema';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export type User = typeof userTable.$inferSelect;
export type NewUser = typeof userTable.$inferInsert;

const db = drizzle(connection, { schema: schema, mode: 'default' });
export { connection, db };
