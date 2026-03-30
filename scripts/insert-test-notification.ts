// scripts/insert-test-notification.ts
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { notificationQueue } from '../lib/db/src/schema/notification_queue.ts';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema: { notificationQueue } });

async function main() {
  await db.insert(notificationQueue).values({
    type: 'whatsapp',
    payload: {
      to: process.env.TWILIO_WHATSAPP_TO, // ou diretamente: 'whatsapp:+55SEUNUMERO'
      message: 'Olá, este é um teste automatizado via Twilio WhatsApp!'
    },
    status: 'pending'
  });
  console.log('Evento de teste inserido na fila notification_queue!');
  await pool.end();
}

main();
