import { Router } from "express";
import { db } from "../lib/db";
import { insertConsentSchema, consentRecords } from "@/lib/db/src/schema";
import { z } from "zod";

const router = Router();

router.post("/consent", async (req, res) => {
  try {
    // Validação do corpo da requisição
    const parsed = insertConsentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Dados inválidos", details: parsed.error.errors });
    }
    // Salvar registro
    const [record] = await db.insert(consentRecords).values(parsed.data).returning();
    return res.status(201).json({ id: record.id });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao registrar consentimento" });
  }
});

export default router;
