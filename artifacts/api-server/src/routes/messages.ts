
import { Router } from "express";
import { db } from "../lib/db";
import { messages, insertMessageSchema } from "../../../../lib/db/src/schema/messages";
import { z } from "zod";

const router = Router();
// Endpoint de deleção de dados pessoais (direito ao esquecimento)
import { eq } from "drizzle-orm";
router.delete("/messages/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "ID inválido" });
    const deleted = await db.delete(messages).where(eq(messages.id, id)).returning();
    if (!deleted.length) return res.status(404).json({ error: "Mensagem não encontrada" });
    return res.status(200).json({ success: true });
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
    // Salvar registro
    const insertData = parsed.data;
    const [record] = await db.insert(messages).values(insertData).returning();
    req.app.locals.leadCounter?.inc();
    return res.status(201).json({ id: record.id, traceId: req.traceId });
  } catch (err) {
    // Logging seguro: não logar dados pessoais
    req.log.error({ err }, 'Message endpoint error');
    return res.status(500).json({ error: "Erro ao registrar mensagem" });
  }
});

export default router;
