PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_bug_reports` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`steps_to_reproduce` text,
	`expected_behavior` text,
	`actual_behavior` text,
	`severity` text DEFAULT 'medium' NOT NULL,
	`status` text DEFAULT 'open' NOT NULL,
	`browser` text,
	`operating_system` text,
	`screenshot_url` text,
	`tags` text,
	`project_id` text,
	`page_url` text,
	`assigned_to` text,
	`resolution` text,
	`reported_by` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`resolved_at` text,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`assigned_to`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`reported_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_bug_reports`("id", "title", "description", "steps_to_reproduce", "expected_behavior", "actual_behavior", "severity", "status", "browser", "operating_system", "screenshot_url", "tags", "project_id", "page_url", "assigned_to", "resolution", "reported_by", "created_at", "updated_at", "resolved_at") SELECT "id", "title", "description", "steps_to_reproduce", "expected_behavior", "actual_behavior", "severity", "status", "browser", "operating_system", "screenshot_url", "tags", "project_id", "page_url", "assigned_to", "resolution", "reported_by", "created_at", "updated_at", "resolved_at" FROM `bug_reports`;--> statement-breakpoint
DROP TABLE `bug_reports`;--> statement-breakpoint
ALTER TABLE `__new_bug_reports` RENAME TO `bug_reports`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `bug_reports_reported_by_idx` ON `bug_reports` (`reported_by`);--> statement-breakpoint
CREATE INDEX `bug_reports_assigned_to_idx` ON `bug_reports` (`assigned_to`);--> statement-breakpoint
CREATE INDEX `bug_reports_project_id_idx` ON `bug_reports` (`project_id`);--> statement-breakpoint
CREATE INDEX `bug_reports_status_idx` ON `bug_reports` (`status`);--> statement-breakpoint
CREATE INDEX `bug_reports_severity_idx` ON `bug_reports` (`severity`);--> statement-breakpoint
CREATE TABLE `__new_dynamic_content` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`type` text NOT NULL,
	`content` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`version` text,
	`is_active` integer DEFAULT true,
	`language` text DEFAULT 'en',
	`tags` text,
	`published_by` text,
	`notes` text,
	`created_by` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`published_at` text,
	FOREIGN KEY (`published_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_dynamic_content`("id", "title", "description", "type", "content", "status", "version", "is_active", "language", "tags", "published_by", "notes", "created_by", "created_at", "updated_at", "published_at") SELECT "id", "title", "description", "type", "content", "status", "version", "is_active", "language", "tags", "published_by", "notes", "created_by", "created_at", "updated_at", "published_at" FROM `dynamic_content`;--> statement-breakpoint
DROP TABLE `dynamic_content`;--> statement-breakpoint
ALTER TABLE `__new_dynamic_content` RENAME TO `dynamic_content`;--> statement-breakpoint
CREATE INDEX `dynamic_content_created_by_idx` ON `dynamic_content` (`created_by`);--> statement-breakpoint
CREATE INDEX `dynamic_content_published_by_idx` ON `dynamic_content` (`published_by`);--> statement-breakpoint
CREATE INDEX `dynamic_content_type_idx` ON `dynamic_content` (`type`);--> statement-breakpoint
CREATE INDEX `dynamic_content_status_idx` ON `dynamic_content` (`status`);--> statement-breakpoint
CREATE INDEX `dynamic_content_language_idx` ON `dynamic_content` (`language`);--> statement-breakpoint
CREATE TABLE `__new_project_data` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`project_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`type` text NOT NULL,
	`data` text NOT NULL,
	`properties` text NOT NULL,
	`is_required` integer DEFAULT false,
	`is_unique` integer DEFAULT false,
	`order` integer DEFAULT 0,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_project_data`("id", "user_id", "project_id", "title", "description", "type", "data", "properties", "is_required", "is_unique", "order", "created_at", "updated_at") SELECT "id", "user_id", "project_id", "title", "description", "type", "data", "properties", "is_required", "is_unique", "order", "created_at", "updated_at" FROM `project_data`;--> statement-breakpoint
DROP TABLE `project_data`;--> statement-breakpoint
ALTER TABLE `__new_project_data` RENAME TO `project_data`;--> statement-breakpoint
CREATE INDEX `project_data_user_id_idx` ON `project_data` (`user_id`);--> statement-breakpoint
CREATE INDEX `project_data_project_id_idx` ON `project_data` (`project_id`);--> statement-breakpoint
CREATE INDEX `project_data_user_project_idx` ON `project_data` (`user_id`,`project_id`);--> statement-breakpoint
CREATE TABLE `__new_project_records` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`project_id` text NOT NULL,
	`record_data` text NOT NULL,
	`created_by` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_project_records`("id", "user_id", "project_id", "record_data", "created_by", "created_at", "updated_at") SELECT "id", "user_id", "project_id", "record_data", "created_by", "created_at", "updated_at" FROM `project_records`;--> statement-breakpoint
DROP TABLE `project_records`;--> statement-breakpoint
ALTER TABLE `__new_project_records` RENAME TO `project_records`;--> statement-breakpoint
CREATE INDEX `project_records_user_id_idx` ON `project_records` (`user_id`);--> statement-breakpoint
CREATE INDEX `project_records_project_id_idx` ON `project_records` (`project_id`);--> statement-breakpoint
CREATE INDEX `project_records_created_by_idx` ON `project_records` (`created_by`);--> statement-breakpoint
CREATE INDEX `project_records_user_project_idx` ON `project_records` (`user_id`,`project_id`);--> statement-breakpoint
CREATE TABLE `__new_projects` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`icon` text,
	`color` text,
	`is_public` integer DEFAULT false,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_projects`("id", "user_id", "name", "description", "icon", "color", "is_public", "created_at", "updated_at") SELECT "id", "user_id", "name", "description", "icon", "color", "is_public", "created_at", "updated_at" FROM `projects`;--> statement-breakpoint
DROP TABLE `projects`;--> statement-breakpoint
ALTER TABLE `__new_projects` RENAME TO `projects`;--> statement-breakpoint
CREATE INDEX `projects_user_id_idx` ON `projects` (`user_id`);