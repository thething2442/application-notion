import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";


export const users = sqliteTable("users", {
  id: text("id").primaryKey(), // This will be the Clerk `user.id` (aka `sub`)
  email: text("email").notNull(),
  name: text("name"),
  plan: text("plan", { enum: ["free", "pro", "company"] }).default("free"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});
