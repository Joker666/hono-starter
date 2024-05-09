import { mysqlTable, serial, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const userSchema = mysqlTable('user', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
    email: varchar('email', { length: 100 }).notNull().unique(),
    password: varchar('password', { length: 65 }).notNull(),
    reset_token: varchar('reset_token', { length: 100 }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});
