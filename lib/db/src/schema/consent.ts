
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";


export const consentRecords = pgTable("consent_records", {
  // Um código único e impossível de adivinhar para cada contrato
  id: uuid("id").defaultRandom().primaryKey(),
  // O código secreto do endereço do usuário
  ipHash: text("ip_hash").notNull(),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull(),
  policyVersion: text("policy_version").notNull(),
  policyText: text("policy_text").notNull(),
  status: text("status").notNull().default("active"),
  // Data de quando o usuário pediu para ser "esquecido"
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
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
  status: z.string().optional(),
});
// export type InsertConsent = z.infer<typeof insertConsentSchema>;
export type ConsentRecord = typeof consentRecords.$inferSelect;
