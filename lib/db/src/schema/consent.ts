import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const consentRecords = pgTable("consent_records", {
  id: serial("id").primaryKey(),
  ipHash: text("ip_hash").notNull(),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull(),
  policyVersion: text("policy_version").notNull(),
  policyText: text("policy_text").notNull(),
});

export const insertConsentSchema = createInsertSchema(consentRecords).omit({ id: true });
// export type InsertConsent = z.infer<typeof insertConsentSchema>;
export type ConsentRecord = typeof consentRecords.$inferSelect;
