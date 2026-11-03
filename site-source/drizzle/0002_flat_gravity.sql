CREATE TABLE `tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`goal` text DEFAULT '' NOT NULL,
	`progress` integer DEFAULT 0 NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `entries` ADD `ratings` text DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE `entries` ADD `task_ids` text DEFAULT '[]' NOT NULL;