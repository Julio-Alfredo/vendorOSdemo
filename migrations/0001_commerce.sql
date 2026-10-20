CREATE TABLE `commerce_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`bucket` integer NOT NULL,
	`count` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `purchases` (
	`session_id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`created_at` integer NOT NULL,
	`email_sent` integer DEFAULT 0 NOT NULL
);
