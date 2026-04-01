CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"phone" text,
	"message" text,
	"created_at" timestamp with time zone,
	"consent_id" integer,
	"topic" text,
	"extension" text,
	"payload" jsonb,
	"event" text,
	"private" boolean,
	"updated_at" timestamp,
	"inserted_at" timestamp
);
