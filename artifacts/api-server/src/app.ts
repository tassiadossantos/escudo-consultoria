

import express, { type Express, Request, Response, NextFunction } from "express";
import path from "path";
import cors from "cors";
import router from "./routes";
import pino from "pino";
import expressPino from "pino-http";
import * as Sentry from "@sentry/node";
import promClient from "prom-client";
import { expressjwt as jwt } from "express-jwt";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { randomUUID } from "crypto";


const app: Express = express();
app.set('trust proxy', 1); // Confia no primeiro proxy (ngrok, Vercel, etc)

// Servir favicon.ico
app.get("/favicon.ico", (req: Request, res: Response) => {
	const faviconPath = path.join(__dirname, "../public/favicon.ico");
	res.sendFile(faviconPath);
});

// Endpoint institucional na raiz
app.get("/", (req: Request, res: Response) => {
	res.json({
		status: "ok",
		name: "Escudo Consultoria API",
		version: process.env.npm_package_version || "dev",
		timestamp: new Date().toISOString(),
	});
});

// Endpoint técnico para health check
app.get("/health", (_req: Request, res: Response) => {
	res.send("OK");
});

// Helmet para headers de segurança
app.use(helmet());
// Rate limiting global (100 req/min por IP)
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter);

// Rate limiting mais restrito para endpoints sensíveis
const sensitiveLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Muitas requisições, tente novamente em 1 minuto.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/messages", sensitiveLimiter);
app.use("/api/consent", sensitiveLimiter);

// Sentry init (configure DSN via env var SENTRY_DSN)
if (process.env.SENTRY_DSN) {
	Sentry.init({ dsn: process.env.SENTRY_DSN });
	app.use(Sentry.Handlers.requestHandler());
}


// Pino logger com traceId
const logger = pino({ level: process.env.LOG_LEVEL || "info" });
app.use((req, res, next) => {
	// Gera ou propaga traceId
	const traceId = req.headers["x-trace-id"]?.toString() || randomUUID();
	req.traceId = traceId;
	res.setHeader("x-trace-id", traceId);
	// Injeta traceId no logger
	req.log = logger.child({ traceId });
	next();
});
app.use(expressPino({ logger, customProps: (req) => ({ traceId: req.traceId }) }));

const allowedOrigins = [
	"http://localhost:3000",
	"http://localhost:5173",
	"http://localhost:5174",
	"https://escudo.consultoria.com.br"
];
app.use(cors({
	origin: (origin, callback) => {
		// Permite requests sem origin (ex: curl, mobile)
		if (!origin) return callback(null, true);
		// Normaliza origin para comparação robusta
		const normalizedOrigin = origin.replace(/\/$/, '').toLowerCase();
		const isAllowed = allowedOrigins.some(o => normalizedOrigin === o.replace(/\/$/, '').toLowerCase());
		if (isAllowed) return callback(null, true);
		// Retorna erro 403 explícito para origem não permitida
		const corsError = new Error("Not allowed by CORS");
		corsError.status = 403;
		return callback(corsError);
	},
	credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Prometheus metrics
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();
const consentCounter = new promClient.Counter({
  name: "consent_registrations_total",
  help: "Total de consentimentos registrados"
});
const leadCounter = new promClient.Counter({
  name: "lead_registrations_total",
  help: "Total de leads/mensagens registrados"
});
app.locals.consentCounter = consentCounter;
app.locals.leadCounter = leadCounter;

// JWT middleware (protege /metrics)
const JWT_SECRET = process.env.JWT_SECRET || "changeme-in-prod";
app.use("/metrics", jwt({ secret: JWT_SECRET, algorithms: ["HS256"] }));
app.get("/metrics", async (_req: Request, res: Response) => {
  res.set("Content-Type", promClient.register.contentType);
  res.end(await promClient.register.metrics());
});
// Utilitário para geração de token admin (apenas para desenvolvimento)
if (process.env.NODE_ENV !== "production") {
	app.get("/dev/generate-admin-token", (_req, res) => {
		const jwt = require("jsonwebtoken");
		const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1h" });
		res.json({ token });
	});
}

app.use("/api", router);

// Sentry error handler (last)
if (process.env.SENTRY_DSN) {
	app.use(Sentry.Handlers.errorHandler());
}

// Fallback error logger
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
	logger.error({ err }, "Unhandled error");
	res.status(500).json({ error: "Internal server error" });
});

export default app;
