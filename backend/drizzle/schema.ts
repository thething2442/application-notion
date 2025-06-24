import { sqliteTable, text, integer, real, index } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(), // This will be the Clerk `user.id` (aka `sub`)
  email: text("email").notNull(),
  name: text("name"),
  plan: text("plan", { enum: ["free", "pro", "company"] }).default("free"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});
export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  icon: text("icon"),
  color: text("color"),
  isPublic: integer("is_public", { mode: "boolean" }).default(false),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
  userIdIdx: index("projects_user_id_idx").on(table.userId),
}));

// Project data table with Notion-like type system
export const projectData = sqliteTable("project_data", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  projectId: text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
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
}, (table) => ({
  userIdIdx: index("project_data_user_id_idx").on(table.userId),
  projectIdIdx: index("project_data_project_id_idx").on(table.projectId),
  userProjectIdx: index("project_data_user_project_idx").on(table.userId, table.projectId),
}));

// Project records table to store actual data entries
export const projectRecords = sqliteTable("project_records", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  projectId: text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  recordData: text("record_data").notNull(), // JSON string containing all field values
  createdBy: text("created_by").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
  userIdIdx: index("project_records_user_id_idx").on(table.userId),
  projectIdIdx: index("project_records_project_id_idx").on(table.projectId),
  createdByIdx: index("project_records_created_by_idx").on(table.createdBy),
  userProjectIdx: index("project_records_user_project_idx").on(table.userId, table.projectId),
}));

// Bug reports table for tracking application bugs
export const bugReports = sqliteTable("bug_reports", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  stepsToReproduce: text("steps_to_reproduce"),
  expectedBehavior: text("expected_behavior"),
  actualBehavior: text("actual_behavior"),
  severity: text("severity", { 
    enum: ["low", "medium", "high", "critical"] 
  }).default("medium").notNull(),
  status: text("status", { 
    enum: ["open", "in_progress", "resolved", "closed", "duplicate"] 
  }).default("open").notNull(),
  browser: text("browser"),
  operatingSystem: text("operating_system"),
  screenshotUrl: text("screenshot_url"),
  tags: text("tags"), // JSON string array
  projectId: text("project_id").references(() => projects.id, { onDelete: "set null" }),
  pageUrl: text("page_url"),
  assignedTo: text("assigned_to").references(() => users.id, { onDelete: "set null" }),
  resolution: text("resolution"),
  reportedBy: text("reported_by").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  resolvedAt: text("resolved_at"),
}, (table) => ({
  reportedByIdx: index("bug_reports_reported_by_idx").on(table.reportedBy),
  assignedToIdx: index("bug_reports_assigned_to_idx").on(table.assignedTo),
  projectIdIdx: index("bug_reports_project_id_idx").on(table.projectId),
  statusIdx: index("bug_reports_status_idx").on(table.status),
  severityIdx: index("bug_reports_severity_idx").on(table.severity),
}));

// Dynamic content table for managing website content
export const dynamicContent = sqliteTable("dynamic_content", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type", { 
    enum: ["pricing", "navbar", "hero", "rules", "regulations", "footer", "terms", "privacy"] 
  }).notNull(),
  content: text("content").notNull(), // JSON string containing the content data
  status: text("status", { 
    enum: ["draft", "published", "archived"] 
  }).default("draft").notNull(),
  version: text("version"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  language: text("language").default("en"),
  tags: text("tags"), // JSON string array
  publishedBy: text("published_by").references(() => users.id, { onDelete: "set null" }),
  notes: text("notes"),
  createdBy: text("created_by").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  publishedAt: text("published_at"),
}, (table) => ({
  createdByIdx: index("dynamic_content_created_by_idx").on(table.createdBy),
  publishedByIdx: index("dynamic_content_published_by_idx").on(table.publishedBy),
  typeIdx: index("dynamic_content_type_idx").on(table.type),
  statusIdx: index("dynamic_content_status_idx").on(table.status),
  languageIdx: index("dynamic_content_language_idx").on(table.language),
}));

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
  projectData: many(projectData),
  projectRecords: many(projectRecords),
  bugReports: many(bugReports, { relationName: "reportedBugs" }),
  assignedBugs: many(bugReports, { relationName: "assignedBugs" }),
  dynamicContent: many(dynamicContent, { relationName: "createdContent" }),
  publishedContent: many(dynamicContent, { relationName: "publishedContent" }),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
  projectData: many(projectData),
  projectRecords: many(projectRecords),
  bugReports: many(bugReports),
}));

export const projectDataRelations = relations(projectData, ({ one }) => ({
  user: one(users, {
    fields: [projectData.userId],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [projectData.projectId],
    references: [projects.id],
  }),
}));

export const projectRecordsRelations = relations(projectRecords, ({ one }) => ({
  user: one(users, {
    fields: [projectRecords.userId],
    references: [users.id],
    relationName: "projectOwner",
  }),
  project: one(projects, {
    fields: [projectRecords.projectId],
    references: [projects.id],
  }),
  createdBy: one(users, {
    fields: [projectRecords.createdBy],
    references: [users.id],
    relationName: "recordCreator",
  }),
}));

export const bugReportsRelations = relations(bugReports, ({ one }) => ({
  project: one(projects, {
    fields: [bugReports.projectId],
    references: [projects.id],
  }),
  reportedBy: one(users, {
    fields: [bugReports.reportedBy],
    references: [users.id],
    relationName: "reportedBugs",
  }),
  assignedTo: one(users, {
    fields: [bugReports.assignedTo],
    references: [users.id],
    relationName: "assignedBugs",
  }),
}));

export const dynamicContentRelations = relations(dynamicContent, ({ one }) => ({
  createdBy: one(users, {
    fields: [dynamicContent.createdBy],
    references: [users.id],
    relationName: "createdContent",
  }),
  publishedBy: one(users, {
    fields: [dynamicContent.publishedBy],
    references: [users.id],
    relationName: "publishedContent",
  }),
}));
