import { pgTable, uuid, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

// Tabela messages (ajuste o nome se necessário)
export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  message: text("message"),
  created_at: timestamp("created_at", { withTimezone: true }),
  consent_id: uuid("consent_id"),
  topic: text("topic"),
  extension: text("extension"),
  payload: jsonb("payload"),
  event: text("event"),
  private: boolean("private"),
  updated_at: timestamp("updated_at"),
  inserted_at: timestamp("inserted_at"),
});