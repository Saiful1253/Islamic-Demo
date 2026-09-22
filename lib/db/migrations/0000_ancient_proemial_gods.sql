CREATE TABLE `dua_blocks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`dua_id` integer NOT NULL,
	`position` integer DEFAULT 0 NOT NULL,
	`kind` text NOT NULL,
	`text` text NOT NULL,
	FOREIGN KEY (`dua_id`) REFERENCES `duas`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `duas` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`intro` text,
	`arabic` text NOT NULL,
	`translit` text NOT NULL,
	`reference` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `languages` (
	`code` text PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`position` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sidebar_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`section_id` integer NOT NULL,
	`label` text NOT NULL,
	`child` integer DEFAULT false NOT NULL,
	`position` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`section_id`) REFERENCES `sidebar_sections`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `sidebar_sections` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`meta` text NOT NULL,
	`img` text NOT NULL,
	`open` integer DEFAULT false NOT NULL,
	`position` integer DEFAULT 0 NOT NULL
);
