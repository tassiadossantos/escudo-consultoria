// Worker simples para processar notification_queue
// Execute: node scripts/notification-worker.js

const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");
const { notificationQueue } = require("../../lib/db/src/schema/notification_queue");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle(pool, { schema: { notificationQueue } });

async function processQueue() {
  const pending = await db.select().from(notificationQueue).where(notificationQueue.status.eq("pending"));
  for (const notif of pending) {
    try {
      // Exemplo: apenas loga, mas aqui pode enviar e-mail, webhook, etc.
      console.log("Processando notificação:", notif.type, notif.payload);
      // Marcar como sent
      await db.update(notificationQueue)
        .set({ status: "sent", sentAt: new Date() })
        .where(notificationQueue.id.eq(notif.id));
    } catch (err) {
      await db.update(notificationQueue)
        .set({ status: "failed", error: err.message })
        .where(notificationQueue.id.eq(notif.id));
      console.error("Erro ao processar notificação:", notif.id, err);
    }
  }
  await pool.end();
}

processQueue();
