CREATE TABLE `public_profiles` (
	`user_id` text PRIMARY KEY NOT NULL,
	`draft` text NOT NULL,
	`public_payload` text,
	`version` integer DEFAULT 1 NOT NULL,
	`published` integer DEFAULT 0 NOT NULL,
	`updated_at` text NOT NULL
);
