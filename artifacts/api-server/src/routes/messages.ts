
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

// "Direito ao Esquecimento": Apaga os dados de uma pessoa se ela pedir (LGPD)
router.delete("/messages/:id", jwtMiddleware, async (req, res) => {
  try {
    // Verifica se o ID enviado é um código válido (como um CPF de dados)
    const idParam = z.string().uuid().safeParse(req.params.id);
    if (!idParam.success) return res.status(400).json({ error: "ID inválido" });
    const id = idParam.data;

    // "Apagando com lápis": Não removemos do banco, mas marcamos como 'deletado' para auditoria.
    const deletedAt = new Date();
    const updated = await db.update(messages)
      .set({ deletedAt })
      .where(and(eq(messages.id, id), isNull(messages.deletedAt)))
      .returning();
    if (!updated.length) return res.status(404).json({ error: "Mensagem não encontrada ou já deletada" });
    // Registra quem apagou, quando e de onde veio o pedido.
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
    // Avisa outros sistemas que um dado foi apagado.
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

// "Recebendo Mensagem": Quando alguém preenche o formulário no site.
router.post("/messages", async (req, res) => {
  try {
    // Checa se o nome, e-mail e mensagem estão escritos corretamente.
    const parsed = insertMessageSchema.safeParse(req.body);
    if (!parsed.success) {
      req.log.warn({ err: parsed.error }, 'Message validation error');
      return res.status(400).json({ error: "Dados inválidos", details: parsed.error.errors });
    }
    // "Disfarce de endereço": Transformamos o endereço de internet do usuário em um código secreto para privacidade.
    const ip = req.headers["x-forwarded-for"]?.toString() || req.socket.remoteAddress || "";
    const salt = process.env.IP_HASH_SALT || "escudo-default-salt";
    const ipHash = crypto.createHash("sha256").update(ip + salt).digest("hex");
    // Prepara os dados para guardar na gaveta
    const insertData = {
      ...parsed.data,
      status: req.body.status || "pending",
      origem: req.body.origem || req.headers["x-origin"] || "webform",
      ipHash
    };
    // Salva efetivamente no Banco de Dados
    const [record] = await db.insert(messages).values(insertData).returning();
      // Coloca na fila para avisar a equipe que chegou um novo cliente.
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
