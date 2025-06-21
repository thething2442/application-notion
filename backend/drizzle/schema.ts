import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(), // This will be the Clerk `user.id` (aka `sub`)
  email: text("email").notNull(),
  name: text("name"),
  plan: text("plan", { enum: ["free", "pro", "company"] }).default("free"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// Project data table with Notion-like type system
export const projectData = sqliteTable("project_data", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  projectId: text("project_id").notNull().references(() => projects.id),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type", { 
    enum: ["text", "number", "select", "multi_select", "date", "checkbox", "url", "email", "phone", "formula", "relation", "rollup", "created_time", "created_by", "last_edited_time", "last_edited_by"]
  }).notNull(),
  data: text("data").notNull(), // JSON string containing the actual data
  properties: text("properties").notNull(), // JSON string containing field properties
  isRequired: integer("is_required", { mode: "boolean" }).default(false),
  isUnique: integer("is_unique", { mode: "boolean" }).default(false),
  order: integer("order").default(0),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// Project records table to store actual data entries
export const projectRecords = sqliteTable("project_records", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  projectId: text("project_id").notNull().references(() => projects.id),
  recordData: text("record_data").notNull(), // JSON string containing all field values
  createdBy: text("created_by").notNull().references(() => users.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// Projects table to organize data
export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  icon: text("icon"),
  color: text("color"),
  isPublic: integer("is_public", { mode: "boolean" }).default(false),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});
