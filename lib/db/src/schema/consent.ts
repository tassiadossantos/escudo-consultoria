
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

// Permitir string ISO ou Date para timestamp
export const insertConsentSchema = z.object({
  timestamp: z.preprocess((val) => {
    if (typeof val === 'string' || val instanceof Date) {
      return new Date(val);
    }
    return val;
  }, z.date()),
  policyVersion: z.string(),
  policyText: z.string(),
});
// export type InsertConsent = z.infer<typeof insertConsentSchema>;
export type ConsentRecord = typeof consentRecords.$inferSelect;
