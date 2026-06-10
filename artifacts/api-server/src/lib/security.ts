import crypto from "crypto";
import { Request } from "express";

export function getClientIp(req: Request): string {
  return req.headers["x-forwarded-for"]?.toString() || req.socket.remoteAddress || "";
}

export function getIpHash(req: Request): string {
  const ip = getClientIp(req);
  // Resiliência: Usa o salt do env ou fallback para testes se estiver no ambiente Vitest
  const salt = process.env.IP_HASH_SALT || (process.env.VITEST ? 'test-salt-stark' : undefined);
  if (!salt) {
    throw new Error("IP_HASH_SALT environment variable is not defined");
  }
  return crypto.createHash("sha256").update(ip + salt).digest("hex");
}