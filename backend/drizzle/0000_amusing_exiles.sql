CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`plan` text DEFAULT 'free',
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
