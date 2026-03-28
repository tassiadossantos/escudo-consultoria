

import express, { type Express, Request, Response, NextFunction } from "express";
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
	"https://escudo.consultoria.com.br"
];
app.use(cors({
	origin: (origin, callback) => {
		// Permite requests sem origin (ex: curl, mobile)
		if (!origin) return callback(null, true);
		if (allowedOrigins.includes(origin)) return callback(null, true);
		return callback(new Error("Not allowed by CORS"));
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
