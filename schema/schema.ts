import { datetime, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const userTable = mysqlTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 65 }).notNull(),
  reset_token: varchar("reset_token", { length: 100 }),
  createdAt: datetime("created_at"),
  updatedAt: datetime("updated_at"),
});
