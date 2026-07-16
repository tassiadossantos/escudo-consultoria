import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { consentRecords } from "./consent";


export const messages = pgTable("messages", {
  // O 'id' é um RG único e aleatório para cada mensagem, impossível de adivinhar.
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  consentId: uuid("consent_id").references(() => consentRecords.id), // Garantia de integridade
  status: text("status").notNull().default("pending"),
  origem: text("origem"),
  ipHash: text("ip_hash"),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const insertMessageSchema = createInsertSchema(messages)
  .omit({ id: true, createdAt: true, ipHash: true });
export type Message = typeof messages.$inferSelect;
