import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const notificationQueue = pgTable("notification_queue", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // ex: 'email', 'whatsapp', 'webhook'
  payload: jsonb("payload").notNull(), // dados da notificação
  status: text("status").notNull().default("pending"), // pending, sent, failed
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  sentAt: timestamp("sent_at", { withTimezone: true }),
  error: text("error"),
});

export const insertNotificationSchema = createInsertSchema(notificationQueue).omit({ id: true });
export type NotificationQueue = typeof notificationQueue.$inferSelect;
