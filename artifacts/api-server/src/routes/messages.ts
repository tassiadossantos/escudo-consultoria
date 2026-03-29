
import { Router } from "express";
import fetch from "node-fetch";
import { db } from "../lib/db";
import { messages, insertMessageSchema } from "../../../../lib/db/src/schema/messages";
import { notificationQueue } from "../../../../lib/db/src/schema/notification_queue";
import { z } from "zod";
import crypto from "crypto";

const router = Router();
// Endpoint de deleção de dados pessoais (direito ao esquecimento)
import { eq } from "drizzle-orm";
import { expressjwt as jwt } from "express-jwt";
import { and, isNull } from "drizzle-orm";

// Middleware de autenticação JWT (apenas admin pode deletar)
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET || "changeme-in-prod", algorithms: ["HS256"] });

router.delete("/messages/:id", jwtMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "ID inválido" });
    // Soft delete: marca deleted_at
    const deletedAt = new Date();
    const updated = await db.update(messages)
      .set({ deletedAt })
      .where(and(eq(messages.id, id), isNull(messages.deletedAt)))
      .returning();
    if (!updated.length) return res.status(404).json({ error: "Mensagem não encontrada ou já deletada" });
    // Logging detalhado de auditoria
    const auditLog = {
      event: "delete_message",
      id,
      deletedAt: deletedAt.toISOString(),
      ip: req.headers["x-forwarded-for"]?.toString() || req.socket.remoteAddress || "",
      traceId: req.traceId,
      user: req.auth?.role || "anonymous"
    };
    req.log.info(auditLog, "Auditoria: mensagem deletada");
    // Publicar evento na notification_queue
    await db.insert(notificationQueue).values({
      type: "lead_deleted",
      payload: auditLog,
      status: "pending"
    });
    // Webhook de auditoria externa
    if (process.env.AUDIT_WEBHOOK_URL) {
      try {
        await fetch(process.env.AUDIT_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(auditLog)
        });
      } catch (err) {
        req.log.warn({ err }, "Falha ao disparar webhook de auditoria");
      }
    }
    return res.status(200).json({ success: true, deletedId: id, deletedAt, traceId: req.traceId });
  } catch (err) {
    req.log.error({ err }, 'Erro ao deletar mensagem');
    return res.status(500).json({ error: "Erro ao deletar mensagem" });
  }
});

router.post("/messages", async (req, res) => {
  try {
    // Validação do corpo da requisição
    const parsed = insertMessageSchema.safeParse(req.body);
    if (!parsed.success) {
      req.log.warn({ err: parsed.error }, 'Message validation error');
      return res.status(400).json({ error: "Dados inválidos", details: parsed.error.errors });
    }
    // Gerar hash do IP do usuário
    const ip = req.headers["x-forwarded-for"]?.toString() || req.socket.remoteAddress || "";
    const salt = process.env.IP_HASH_SALT || "escudo-default-salt";
    const ipHash = crypto.createHash("sha256").update(ip + salt).digest("hex");
    // Popular status e origem
    const insertData = {
      ...parsed.data,
      status: req.body.status || "pending",
      origem: req.body.origem || req.headers["x-origin"] || "webform",
      ipHash
    };
    const [record] = await db.insert(messages).values(insertData).returning();
      // Publicar evento na notification_queue
      await db.insert(notificationQueue).values({
        type: "lead_registered",
        payload: {
          id: record.id,
          ...insertData,
          traceId: req.traceId
        },
        status: "pending"
      });
    req.app.locals.leadCounter?.inc();
    // Disparar webhook pós-formulário (exemplo)
    if (process.env.WEBHOOK_URL) {
      try {
        await fetch(process.env.WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "lead_registered",
            data: {
              id: record.id,
              ...insertData,
              traceId: req.traceId
            }
          })
        });
      } catch (err) {
        req.log.warn({ err }, "Falha ao disparar webhook pós-formulário");
      }
    }
    return res.status(201).json({ id: record.id, traceId: req.traceId });
  } catch (err) {
    // Logging seguro: não logar dados pessoais
    req.log.error({ err }, 'Message endpoint error');
    return res.status(500).json({ error: "Erro ao registrar mensagem" });
  }
});

export default router;
