
import { Router } from "express";
import { db } from "../lib/db";
import { insertConsentSchema, consentRecords } from "../../../../lib/db/src/schema";
import { notificationQueue } from "../../../../lib/db/src/schema/notification_queue";
import { z } from "zod";
import crypto from "crypto";

const router = Router();

// Endpoint de deleção de consentimento (direito ao esquecimento)
import { eq, and, isNull } from "drizzle-orm";
import { expressjwt as jwt } from "express-jwt";

const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET || "changeme-in-prod", algorithms: ["HS256"] });

router.delete("/consent/:id", jwtMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "ID inválido" });
    // Soft delete: marca deleted_at
    const deletedAt = new Date();
    const updated = await db.update(consentRecords)
      .set({ deletedAt })
      .where(and(eq(consentRecords.id, id), isNull(consentRecords.deletedAt)))
      .returning();
    if (!updated.length) return res.status(404).json({ error: "Consentimento não encontrado ou já deletado" });
    // Logging detalhado de auditoria
    const auditLog = {
      event: "delete_consent",
      id,
      deletedAt: deletedAt.toISOString(),
      ip: req.headers["x-forwarded-for"]?.toString() || req.socket.remoteAddress || "",
      traceId: req.traceId,
      user: req.auth?.role || "anonymous"
    };
    req.log.info(auditLog, "Auditoria: consentimento deletado");
    // Publicar evento na notification_queue
    await db.insert(notificationQueue).values({
      type: "consent_deleted",
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
    req.log.error({ err }, 'Erro ao deletar consentimento');
    return res.status(500).json({ error: "Erro ao deletar consentimento" });
  }
});

router.post("/consent", async (req, res) => {
  try {
    // Validação do corpo da requisição
    const parsed = insertConsentSchema.safeParse(req.body);
    if (!parsed.success) {
      req.log.warn({ err: parsed.error }, 'Consent validation error');
      return res.status(400).json({ error: "Dados inválidos", details: parsed.error.errors });
    }
    // Mascarar IP do usuário (hash SHA-256 do IP + salt)
    const ip = req.headers["x-forwarded-for"]?.toString() || req.socket.remoteAddress || "";
    const salt = process.env.IP_HASH_SALT || "escudo-default-salt";
    const ipHash = crypto.createHash("sha256").update(ip + salt).digest("hex");
    const { timestamp, policyVersion, policyText } = parsed.data;
    // Popular status
    const status = req.body.status || "active";
    // Inserção usando Drizzle ORM corretamente
    const [record] = await db.insert(consentRecords).values({
      ipHash,
      timestamp,
      policyVersion,
      policyText,
      status
    }).returning();
      // Publicar evento na notification_queue
      await db.insert(notificationQueue).values({
        type: "consent_registered",
        payload: {
          id: record.id,
          ipHash,
          timestamp,
          policyVersion,
          policyText,
          status,
          traceId: req.traceId
        },
        status: "pending"
      });
    if (!record?.id) throw new Error("Falha ao inserir consentimento");
    // Incrementa métrica Prometheus
    req.app.locals.consentCounter?.inc();
    return res.status(201).json({ id: record.id, traceId: req.traceId });
  } catch (err) {
    req.log.error({ err }, 'Consent endpoint error');
    return res.status(500).json({ error: "Erro ao registrar consentimento" });
  }
});

export default router;
