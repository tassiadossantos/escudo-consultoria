// Worker para processar notification_queue e enviar WhatsApp via Twilio (ES Modules)
// Execute: node scripts/notification-worker.js

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import twilio from 'twilio';
import { notificationQueue } from '../lib/db/src/schema/notification_queue.ts';
import { eq } from 'drizzle-orm';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema: { notificationQueue } });
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function sendWhatsApp(to, body) {
  return client.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM,
    to,
    body,
  });
}

async function processQueue() {
  const pending = await db.select().from(notificationQueue).where(eq(notificationQueue.status, 'pending'));
  for (const notif of pending) {
    try {
      if (notif.type === 'whatsapp') {
        await sendWhatsApp(
          notif.payload.to || process.env.TWILIO_WHATSAPP_TO,
          notif.payload.message || JSON.stringify(notif.payload)
        );
      }
      await db.update(notificationQueue)
        .set({ status: 'sent', sentAt: new Date() })
        .where(eq(notificationQueue.id, notif.id));
      console.log(`Notificação enviada: ${notif.id}`);
    } catch (err) {
      await db.update(notificationQueue)
        .set({ status: 'failed', error: err.message })
        .where(eq(notificationQueue.id, notif.id));
      console.error('Erro ao processar notificação:', notif.id, err);
    }
  }
  await pool.end();
}

processQueue();
