
import { Router } from "express";
import { db } from "../lib/db";
import { insertConsentSchema, consentRecords } from "../../../../lib/db/src/schema";
import { z } from "zod";
import crypto from "crypto";

const router = Router();

// Endpoint de deleção de consentimento (direito ao esquecimento)
import { eq } from "drizzle-orm";
router.delete("/consent/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "ID inválido" });
    const deleted = await db.delete(consentRecords).where(eq(consentRecords.id, id)).returning();
    if (!deleted.length) return res.status(404).json({ error: "Consentimento não encontrado" });
    return res.status(200).json({ success: true });
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
    // Inserção usando Drizzle ORM corretamente
    const [record] = await db.insert(consentRecords).values({
      ipHash,
      timestamp,
      policyVersion,
      policyText
    }).returning();
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
