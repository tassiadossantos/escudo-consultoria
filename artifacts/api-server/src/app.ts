

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

// Coloca um "capacete" de segurança no site para evitar ataques comuns da internet
app.use(helmet());

// Este é o "diário de bordo". Tudo o que acontece gera um registro.
// O traceId é como um número de protocolo para rastrear uma conversa do início ao fim.
const logger = pino({ level: process.env.LOG_LEVEL || "info" });
app.use((req, res, next) => {
	const traceId = req.headers["x-trace-id"]?.toString() || randomUUID();
	req.traceId = traceId;
	res.setHeader("x-trace-id", traceId);
	req.log = logger.child({ traceId });
	next();
});
app.use(expressPino({ logger, customProps: (req) => ({ traceId: req.traceId }) }));

// "Limitador de velocidade": Impede que alguém tente entrar no site mil vezes por segundo e trave o sistema.
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter);
// Áreas sensíveis (como enviar mensagens) têm segurança extra: apenas 10 tentativas por minuto.
const sensitiveLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Muitas requisições, tente novamente em 1 minuto.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/messages", sensitiveLimiter);
app.use("/api/consent", sensitiveLimiter);

// "Alarme de Incêndio": Se algo quebrar, ele avisa a equipe de engenharia instantaneamente.
if (process.env.SENTRY_DSN) {
	Sentry.init({ dsn: process.env.SENTRY_DSN });
	app.use(Sentry.Handlers.requestHandler());
}

const allowedOrigins = [
	"http://localhost:3000",
	"http://localhost:5173",
	"http://localhost:5174",
	"https://escudo.consultoria.com.br"
];
// "Lista de Convidados": Só aceita pedidos vindos desses endereços específicos para evitar hackers.
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
// Faz o sistema entender textos e formulários enviados pelo site
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Definição de Rotas ---

// Entrega o pequeno ícone que aparece na aba do navegador
app.get("/favicon.ico", (req: Request, res: Response) => {
	const faviconPath = path.join(__dirname, "../public/favicon.ico");
	res.sendFile(faviconPath);
});

// Página de boas-vindas técnica (confirma que o motor está ligado)
app.get("/", (req: Request, res: Response) => {
	res.json({
		status: "ok",
		name: "Escudo Consultoria API",
		version: process.env.npm_package_version || "dev",
		timestamp: new Date().toISOString(),
	});
});

// "Exame de rotina": Outros sistemas usam isso para saber se a API está saudável.
app.get("/health", (_req: Request, res: Response) => {
	res.send("OK");
});

// "Medidores de desempenho": Conta quantos usuários entraram e quantas mensagens foram enviadas.
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

// "Crachá de Segurança": Só quem tem a chave correta pode ver os dados de desempenho.
const JWT_SECRET = process.env.JWT_SECRET || "changeme-in-prod";
app.use("/metrics", jwt({ secret: JWT_SECRET, algorithms: ["HS256"] }));
app.get("/metrics", async (_req: Request, res: Response) => {
  res.set("Content-Type", promClient.register.contentType);
  res.end(await promClient.register.metrics());
});
// Utilitário para geração de token admin (apenas para desenvolvimento)
if (process.env.NODE_ENV !== "production") {
	app.get("/dev/generate-admin-token", (_req, res) => {
		const jsonwebtoken = require("jsonwebtoken");
		const token = jsonwebtoken.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1h" });
		res.json({ token });
	});
}

// Conecta as rotas (os caminhos) da API (Mensagens e Privacidade)
app.use("/api", router);

// Sentry error handler (last)
if (process.env.SENTRY_DSN) {
	app.use(Sentry.Handlers.errorHandler());
}

// O "Departamento de Reclamações": Se qualquer coisa der errado, este código garante 
// que o sistema responda de forma educada e organizada, sem "explodir".
app.use((err: any, req: any, res: Response, _next: NextFunction) => {
	if (err.name === "UnauthorizedError") {
		return res.status(401).json({
			error: "Security Infrastructure Failure",
			message: "Invalid or missing cryptographic token",
			traceId: req.traceId,
		});
	}

	const statusCode = err.status || 500;
	logger.error({ err, traceId: req.traceId }, statusCode === 500 ? "Erro Interno Grave" : "Erro de Requisição");
	
	res.status(statusCode).json({
		error: statusCode === 500 ? "Internal Systems Error" : (err.message || "Request Pipeline Error"),
		traceId: req.traceId,
	});
});

export default app;
