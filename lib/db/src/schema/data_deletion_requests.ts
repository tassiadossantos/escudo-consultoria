import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const dataDeletionRequests = pgTable("data_deletion_requests", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  reason: text("reason"),
  status: text("status").notNull().default("pending"), // pending, completed, rejected
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const insertDataDeletionRequestSchema = createInsertSchema(dataDeletionRequests).omit({ id: true });
export type DataDeletionRequest = typeof dataDeletionRequests.$inferSelect;
