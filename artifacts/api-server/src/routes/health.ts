import { Router } from "express";

const router = Router();

// Responde na raiz do path montado (ex: /health)
router.get("/", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "escudo-api",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;