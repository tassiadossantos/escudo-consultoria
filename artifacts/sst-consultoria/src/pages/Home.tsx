import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, Clock, FileText, CheckCircle2, 
  Users, AlertTriangle, AlertOctagon, Phone,
  ChevronDown, ChevronUp, Check, Star, MessageCircle, Mail
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { Link } from "wouter";

// Components
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <section className="py-16 bg-accent/10 border-y border-accent/20 flex justify-center items-center">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-accent-foreground mb-2 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-7 h-7 text-accent" />
              Checklist de Conformidade Gratuito
            </h2>
            <p className="text-lg text-accent-foreground/80">Descubra em minutos se sua empresa está em dia com as exigências do Ministério do Trabalho. Faça o checklist e receba um diagnóstico instantâneo.</p>
            <Link
              href="/checklist"
              className="inline-block px-8 py-3 bg-accent text-accent-foreground text-lg font-semibold rounded-xl shadow hover:bg-accent/90 hover:text-white transition-all duration-300 mt-2"
            >
              Acessar Checklist Agora
            </Link>
          </div>
        </section>
        <CalculatorSection />
        <TestimonialsSection />
        <WhyUsSection />
        <FaqSection />
        <FinalCtaSection />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function HeroSection() {
  const scrollToCalc = () => document.getElementById("calculadora")?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-secondary overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-200 h-200 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-accent">
              <span>Fiscalização MTE intensificada em 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
              SUA EMPRESA ESTÁ EM <span className="text-primary relative inline-block">
                CONFORMIDADE
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent" />
                </svg>
              </span> COM A NR 1?
            </h1>
            
            <p className="text-lg text-secondary-foreground/80 leading-relaxed max-w-xl">
              Evite multas de até <strong className="text-white">R$ 250 mil</strong>. PGR, APR, e Treinamentos NR 35/33 entregues em até 48h com validade jurídica garantida.
            </p>


            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/orcamento"
                className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg shadow-[0_0_24px_rgba(34,197,94,0.3)] hover:shadow-[0_0_32px_rgba(34,197,94,0.5)] hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center gap-2"
              >
                Solicitar Orçamento Gratuito
              </Link>
              <button onClick={scrollToCalc} className="px-5 py-2.5 bg-transparent border border-white/25 text-white text-sm font-medium rounded-lg hover:bg-white/5 hover:border-white/40 transition-all duration-300 flex justify-center items-center gap-2">
                Calcular Multa Potencial <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t border-white/10">
              {['Técnico Registrado MTE', '150+ Empresas Atendidas', 'Entrega em 48h', 'Suporte Contínuo'].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-sm text-secondary-foreground/70">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  {badge}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Image & Floating Cards */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative lg:ml-10"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-video lg:aspect-auto lg:h-120 glow-effect border border-white/10">
              <img 
                src={`${import.meta.env.BASE_URL}hero-sst.png`} 
                alt="Técnico de Segurança do Trabalho em campo" 
                className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-secondary/80 via-transparent to-transparent"></div>
            </div>

            {/* Floating Card 1 */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -left-6 sm:-left-12 top-24 bg-white rounded-2xl p-4 shadow-2xl border border-border flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-green-100 text-primary rounded-full flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">150+</p>
                <p className="text-xs text-muted-foreground font-medium">Empresas Atendidas</p>
              </div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -right-6 sm:-right-8 bottom-32 bg-secondary border border-white/20 rounded-2xl p-4 shadow-2xl flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">48h</p>
                <p className="text-xs text-secondary-foreground/70 font-medium">Prazo de Entrega</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "150+", label: "Empresas Atendidas" },
    { value: "5+", label: "Anos de Experiência" },
    { value: "0", label: "Autuações em Clientes" },
    { value: "R$ 50M+", label: "Em Multas Evitadas" },
  ];

  return (
    <section className="py-12 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center px-4"
            >
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-primary-foreground/80 font-medium text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    {
      slug: "pgr",
      title: "PGR — Programa de Gerenciamento de Riscos",
      nr: "NR 1",
      target: "Obrigatório para todas empresas",
      deadline: "48h",
      price: "A partir de R$ 800",
      icon: FileText
    },
    {
      slug: "apr",
      title: "APR — Análise Preliminar de Risco",
      nr: "NR 1/35/33",
      target: "Para obras e atividades de risco",
      deadline: "24h",
      price: "A partir de R$ 400",
      icon: AlertOctagon
    },
    {
      slug: "nr35",
      title: "Treinamento NR 35",
      nr: "NR 35",
      target: "Obrigatório p/ trabalho acima 2m",
      deadline: "Duração: 8h",
      price: "A partir de R$ 150/pessoa",
      icon: Users
    },
    {
      slug: "nr33",
      title: "Treinamento NR 33",
      nr: "NR 33",
      target: "Para espaços confinados",
      deadline: "Duração: 16h",
      price: "A partir de R$ 200/pessoa",
      icon: ShieldCheck
    },
    {
      slug: "oss",
      title: "Ordem de Serviço (OSS)",
      nr: "NR 1",
      target: "Obrigatório para todos os trabalhadores",
      deadline: "24h",
      price: "A partir de R$ 200",
      icon: FileText
    },
    {
      slug: "consultoria-mensal",
      title: "Consultoria Mensal SST",
      nr: "Gestão Contínua",
      target: "Acompanhamento completo",
      deadline: "Recorrente",
      price: "A partir de R$ 1.200/mês",
      icon: ShieldCheck
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Soluções Completas em SST</h2>
          <p className="text-muted-foreground text-lg">Documentação técnica elaborada por profissionais habilitados, com rapidez e validade jurídica para proteger seu negócio.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border premium-card-hover flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <service.icon className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold">
                  {service.nr}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              
              <div className="space-y-3 mb-8 grow">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">Para quem:</span> {service.target}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">Prazo:</span> {service.deadline}
                </div>
              </div>

              <div className="pt-6 border-t border-border mt-auto">
                <p className="text-lg font-bold text-foreground mb-4">{service.price}</p>
                <Link
                  href={`/servicos/${service.slug}`}
                  className="block w-full py-3 text-center bg-secondary text-secondary-foreground hover:bg-primary hover:text-white rounded-xl font-semibold transition-colors duration-300"
                >
                  Ver detalhes
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <a href="/servicos" className="px-6 py-3 bg-primary text-white rounded-xl font-semibold shadow hover:bg-primary/90 transition text-lg">
            Ver todos os serviços
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Fine tables ── NR-28 Anexo IA + Portaria 66/2024 (SST - Segurança do Trabalho) ───────
// Values in R$: [min, max] per infraction level per employee bracket
const sstTable: { max: number; I1: [number,number]; I2: [number,number]; I3: [number,number]; I4: [number,number] }[] = [
  { max: 10,   I1:[575,665],    I2:[1030,1271],  I3:[1543,1908],  I4:[2055,2548]  },
  { max: 25,   I1:[666,757],    I2:[1272,1518],  I3:[1909,2277],  I4:[2549,3042]  },
  { max: 50,   I1:[758,878],    I2:[1519,1766],  I3:[2278,2645],  I4:[3043,3537]  },
  { max: 100,  I1:[879,1007],   I2:[1766,2007],  I3:[2645,3013],  I4:[3538,4032]  },
  { max: 250,  I1:[1008,1132],  I2:[2008,2255],  I3:[3014,3393],  I4:[4033,4515]  },
  { max: 500,  I1:[1133,1254],  I2:[2256,2508],  I3:[3394,3761],  I4:[4516,5010]  },
  { max: 1000, I1:[1254,1375],  I2:[2509,2756],  I3:[3762,4129],  I4:[5011,5506]  },
  { max: Infinity, I1:[1376,1502], I2:[2757,2997], I3:[4130,4498], I4:[5507,5750] },
];

function getFineRange(emp: number, level: "I1"|"I2"|"I3"|"I4"): [number, number] {
  const row = sstTable.find(r => emp <= r.max) ?? sstTable[sstTable.length - 1];
  return row[level];
}

// Constants from Portaria 1.131/2025 and 66/2024
const ESOCIAL_PER_WORKER = 104.31;   // acréscimo eSocial por trabalhador (Portaria 1.131/2025 Art. 81)
const PCMSO_PER_WORKER   = 402.53;   // por trabalhador sem ASO/treinamento (usado em NR33/NR35)
const MAX_FINE           = 44396.84; // teto por infração (Portaria 1.131/2025)

type CalcResult = {
  min: number; max: number; risk: "BAIXO"|"MÉDIO"|"ALTO"|"GRAVÍSSIMO";
  breakdown: { label: string; value: string; show?: boolean }[];
  legal: string;
};



function calcFine(
  service: string, emp: number, situation: string,
  affectedWorkers: number, recidiva: boolean
): CalcResult {
  let base = 0;
  let acrescimo = 0;
  let legal = "";
  let affectedCount = affectedWorkers;
  let breakdown: { label: string; value: string; show?: boolean }[] = [];

  if (service === "pgr") {
    const level = situation === "ausente" ? "I4" : "I3";
    base = getFineRange(emp, level)[1];
    acrescimo = emp * ESOCIAL_PER_WORKER;
    legal = "NR-1 + Portaria 1.131/2025 Art. 81";
    breakdown = [
      { label: `Infração NR-1 (${level} — PGR ${situation})`, value: formatCurrency(base) },
      { label: `Acréscimo eSocial (${emp} trab. × R$ 104,31)`, value: formatCurrency(acrescimo) }
    ];
  } else if (service === "apr") {
    const level = situation === "ausente" ? "I3" : "I2";
    base = getFineRange(emp, level)[1];
    acrescimo = situation === "ausente" ? emp * ESOCIAL_PER_WORKER : 0;
    legal = "NR-1 / NR-35 + Portaria 66/2024";
    breakdown = [
      { label: `Infração NR-1 (${level} — APR ${situation})`, value: formatCurrency(base) }
    ];
    if (acrescimo > 0) breakdown.push({ label: `Acréscimo eSocial (${emp} trab. × R$ 104,31)`, value: formatCurrency(acrescimo) });
  } else if (service === "nr35") {
    base = getFineRange(emp, "I3")[1];
    acrescimo = affectedCount * PCMSO_PER_WORKER;
    legal = "NR-35 + Portaria 66/2024 (I3 — Segurança)";
    breakdown = [
      { label: "Infração NR-35 (I3 — sem treinamento)", value: formatCurrency(base) },
      { label: `Por trabalhador s/ treinamento (${affectedCount} × R$ 402,53)`, value: formatCurrency(acrescimo) }
    ];
  } else if (service === "nr33") {
    base = getFineRange(emp, "I4")[1];
    acrescimo = affectedCount * PCMSO_PER_WORKER;
    legal = "NR-33 + Portaria 66/2024 (I4 — risco de morte)";
    breakdown = [
      { label: "Infração NR-33 (I4 — espaço confinado sem treinamento)", value: formatCurrency(base) },
      { label: `Por trabalhador s/ treinamento (${affectedCount} × R$ 402,53)`, value: formatCurrency(acrescimo) }
    ];
  } else if (service === "oss") {
    const level = situation === "ausente" ? "I2" : "I1";
    base = getFineRange(emp, level)[1];
    acrescimo = 0;
    legal = "NR-1 + Portaria 66/2024";
    breakdown = [
      { label: `Infração NR-1 (${level} — OSS ${situation})`, value: formatCurrency(base) }
    ];
  }

  // Valor bruto antes de tetos e reincidência
  const totalBruto = base + acrescimo;
  let total = totalBruto;
  let tetoAplicado = false;

  if (recidiva) {
    total = totalBruto * 2;
  } else {
    if (totalBruto > MAX_FINE) {
      total = MAX_FINE;
      tetoAplicado = true;
    } else {
      total = totalBruto;
    }
  }

  // Ajusta breakdown para refletir o teto
  let breakdownFinal = [...breakdown];
  if (recidiva) {
    breakdownFinal.push({ label: "Reincidência (dobro do valor — Portaria 1.131/2025)", value: "× 2", show: true });
  }
  if (tetoAplicado) {
    breakdownFinal.push({ label: `Teto legal aplicado (${recidiva ? "reincidência" : "infração única"})`, value: formatCurrency(total), show: true });
  }

  // O breakdown só mostra o teto se ele for aplicado, e o valor total sempre bate com o breakdown
  const risk: CalcResult["risk"] =
    total > 20000 ? "GRAVÍSSIMO" : total > 8000 ? "ALTO" : total > 3000 ? "MÉDIO" : "BAIXO";

  return { min: total, max: total, risk, breakdown: breakdownFinal, legal };
}

function CalculatorSection() {
  const [service, setService]               = useState("pgr");
  const [employees, setEmployees]           = useState("");
  const [sector, setSector]                 = useState("Servicos");
  const [situation, setSituation]           = useState("ausente");
  const [affectedWorkers, setAffectedWorkers] = useState("");
  const [recidiva, setRecidiva]             = useState(false);
  const [result, setResult]                 = useState<CalcResult | null>(null);
  const [isCalculating, setIsCalculating]   = useState(false);

  const needsAffected = service === "nr35" || service === "nr33";
  const needsSituation = service === "pgr" || service === "apr" || service === "oss";

  const serviceLabel: Record<string, string> = {
    pgr: "PGR — Programa de Gerenciamento de Riscos",
    apr: "APR — Análise Preliminar de Risco",
    nr35: "Treinamento NR 35 — Trabalho em Altura",
    nr33: "Treinamento NR 33 — Espaços Confinados",
    oss: "Ordem de Serviço de Segurança (OSS)",
  };

  const situationLabel: Record<string, { a: string; b: string }> = {
    pgr:  { a: "PGR completamente ausente", b: "PGR existente, mas desatualizado" },
    apr:  { a: "APR não foi elaborada", b: "APR elaborada, mas incompleta" },
    oss:  { a: "OSS não emitida para os trabalhadores", b: "OSS emitida, mas incompleta/desatualizada" },
  };

  const affectedLabel: Record<string, string> = {
    nr35: "Quantos trabalhadores fazem altura sem treinamento NR 35?",
    nr33: "Quantos trabalhadores entram em espaços confinados sem treinamento NR 33?",
  };

  const riskColors: Record<string, string> = {
    BAIXO: "text-primary border-primary bg-primary/10",
    MÉDIO: "text-yellow-400 border-yellow-400 bg-yellow-400/10",
    ALTO: "text-orange-400 border-orange-400 bg-orange-400/10",
    GRAVÍSSIMO: "text-destructive border-destructive bg-destructive/10",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = parseInt(employees) || 0;
    if (emp <= 0) return;
    const affected = parseInt(affectedWorkers) || (needsAffected ? 1 : 0);
    setIsCalculating(true);
    setResult(null);
    setTimeout(() => {
      setResult(calcFine(service, emp, situation, affected, recidiva));
      setIsCalculating(false);
    }, 700);
  };

  const inputCls = "w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all";
  const radioCls = (active: boolean, danger = false) => cn(
    "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border cursor-pointer transition-all text-sm font-medium text-center",
    active
      ? danger ? "bg-destructive/20 border-destructive text-white" : "bg-primary/20 border-primary text-white"
      : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
  );

  return (
    <section id="calculadora" className="py-24 bg-secondary text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-150 h-150 bg-red-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">

          {/* Left — form */}
          <div className="flex flex-col h-full min-h-[540px] justify-stretch lg:mt-0">


            <div className="mb-1 mt-0 lg:mt-[-32px]">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-destructive-foreground">Simulador de Risco Trabalhista</h2>
              <p className="text-lg text-white/55 mb-2">
                Descubra em segundos o valor estimado de autuação que sua empresa pode sofrer em caso de fiscalização do MTE hoje.
              </p>
              <p className="text-base text-white/60 mb-6 mt-2">
                Valores baseados na Portaria MTE 66/2024 e Portaria 1.131/2025.
              </p>
            </div>

            {/* <h3 className="text-base md:text-2xl font-bold mb-1 text-destructive-foreground">Calcule sua Multa Potencial</h3> */}
            {/* <p className="text-white/55 text-base mb-2 leading-relaxed">
              Valores baseados na <strong className="font-bold">Portaria MTE 66/2024</strong> e <strong className="font-bold">Portaria 1.131/2025</strong> — as tabelas oficiais vigentes de gradação de multas do MTE.
            </p> */}


            <form onSubmit={handleSubmit} className="space-y-5 bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 backdrop-blur-sm">

              {/* Service selector (custom select) */}
              <div>
                <label className="block text-sm font-medium mb-2">Qual irregularidade deseja simular?</label>
                <Select value={service} onValueChange={v => { setService(v); setResult(null); }}>
                  <SelectTrigger className={inputCls + ' py-3 h-auto min-h-12'}>
                    <SelectValue placeholder="Selecione a irregularidade" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#23272f] text-white border-white/20">
                    {Object.entries(serviceLabel).map(([v, l]) => (
                      <SelectItem key={v} value={v} className="data-[state=checked]:bg-primary data-[state=checked]:text-white data-highlighted:bg-[#374151] data-highlighted:text-white">{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sector selector (custom select) */}
              <div>
                <label className="block text-sm font-medium mb-2">Setor de Atuação</label>
                <Select value={sector} onValueChange={setSector}>
                  <SelectTrigger className={inputCls + ' py-3 h-auto min-h-12'}>
                    <SelectValue placeholder="Selecione o setor" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#23272f] text-white border-white/20">
                    <SelectItem value="Servicos" className="data-[state=checked]:bg-primary data-[state=checked]:text-white data-highlighted:bg-[#374151] data-highlighted:text-white">Serviços</SelectItem>
                    <SelectItem value="Comercio" className="data-[state=checked]:bg-primary data-[state=checked]:text-white data-highlighted:bg-[#374151] data-highlighted:text-white">Comércio</SelectItem>
                    <SelectItem value="Industria" className="data-[state=checked]:bg-primary data-[state=checked]:text-white data-highlighted:bg-[#374151] data-highlighted:text-white">Indústria</SelectItem>
                    <SelectItem value="Construcao Civil" className="data-[state=checked]:bg-primary data-[state=checked]:text-white data-highlighted:bg-[#374151] data-highlighted:text-white">Construção Civil</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Employee count */}
              <div>
                <label className="block text-sm font-medium mb-2">Total de funcionários da empresa</label>
                <input
                  type="number" min="1" required value={employees}
                  onChange={e => setEmployees(e.target.value)}
                  className={inputCls} placeholder="Ex: 25"
                />
              </div>

              {/* Situation — only for PGR / APR / OSS */}
              {needsSituation && (
                <div>
                  <label className="block text-sm font-medium mb-3">Qual é a situação atual?</label>
                  <div className="flex gap-3">
                    <label className={radioCls(situation === "ausente", true)}>
                      <input type="radio" className="hidden" checked={situation === "ausente"} onChange={() => setSituation("ausente")} />
                      {situationLabel[service]?.a ?? "Ausente"}
                    </label>
                    <label className={radioCls(situation === "desatualizado")}>
                      <input type="radio" className="hidden" checked={situation === "desatualizado"} onChange={() => setSituation("desatualizado")} />
                      {situationLabel[service]?.b ?? "Desatualizado"}
                    </label>
                  </div>
                </div>
              )}

              {/* Affected workers — NR35 / NR33 / PCMSO */}
              {needsAffected && (
                <div>
                  <label className="block text-sm font-medium mb-2">{affectedLabel[service]}</label>
                  <input
                    type="number" min="1" required={needsAffected} value={affectedWorkers}
                    onChange={e => setAffectedWorkers(e.target.value)}
                    className={inputCls} placeholder="Ex: 8"
                  />
                </div>
              )}

              {/* Recidiva */}
              <label className={cn("flex items-center gap-3 cursor-pointer select-none group p-2 rounded-lg transition-all", recidiva ? "bg-destructive/10 border border-destructive/40" : "")}
                title="Se marcado, o valor da multa será dobrado conforme Portaria 1.131/2025 (reincidência).">
                <div
                  onClick={() => setRecidiva(!recidiva)}
                  className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all",
                    recidiva ? "bg-destructive border-destructive" : "border-white/30 group-hover:border-white/60"
                  )}
                >
                  {recidiva && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className={cn("text-sm", recidiva ? "text-destructive font-bold" : "text-white/70")}>Empresa já foi autuada antes por esta mesma irregularidade <span className="text-destructive font-semibold">(reincidência — multa dobrada)</span></span>
              </label>

              <button
                type="submit" disabled={isCalculating}
                className="w-full py-3 bg-primary text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:transform-none"
              >
                {isCalculating ? "Calculando..." : "SIMULAR MULTA →"}
              </button>

              <p className="text-xs text-white/30 text-center">
                Simulação educativa baseada nas tabelas oficiais do MTE. Valores reais variam conforme a fiscalização.
              </p>
            </form>
          </div>

          {/* Right — result */}
          <div className="flex flex-col h-full min-h-[540px] justify-stretch">
            <AnimatePresence mode="wait">
              {!result && !isCalculating && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center backdrop-blur-sm min-h-95"
                >
                  <ShieldCheck className="w-16 h-16 text-white/15 mb-5" />
                  <h3 className="text-xl font-bold text-white/50 mb-2">Aguardando dados</h3>
                  <p className="text-white/30 text-sm">Preencha o formulário ao lado para ver a simulação de multa com valores reais do MTE.</p>
                </motion.div>
              )}

              {isCalculating && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center backdrop-blur-sm min-h-95"
                >
                  <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin mb-5" />
                  <h3 className="text-xl font-bold text-white mb-1">Consultando tabelas do MTE...</h3>
                  <p className="text-white/40 text-sm">Portaria 66/2024 · Portaria 1.131/2025</p>
                </motion.div>
              )}

              {result && !isCalculating && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-2xl relative overflow-hidden"
                >
                  <div className={cn("h-1.5 w-full", {
                    "bg-primary": result.risk === "BAIXO",
                    "bg-yellow-400": result.risk === "MÉDIO",
                    "bg-orange-400": result.risk === "ALTO",
                    "bg-destructive": result.risk === "GRAVÍSSIMO",
                  })} />

                  <div className="p-8 space-y-5">
                    {/* Risk badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className={cn("px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest", riskColors[result.risk])}>
                        RISCO {result.risk}
                      </span>
                      <span className="text-xs text-secondary-foreground/50">{serviceLabel[service]?.split(" — ")[0]}</span>
                    </div>

                    {/* Valor Total em destaque */}
                    <div className="text-center py-3">
                      <span className="block text-black text-base md:text-lg font-extrabold mb-2 uppercase tracking-wide font-bold">Valor Total</span>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-4xl font-extrabold text-green-700">
                          {result ? formatCurrency(result.max) : "—"}
                        </span>
                      </div>
                      {recidiva && (
                        <p className="text-xs text-destructive font-semibold mt-1">⚠ Valor já dobrado por reincidência</p>
                      )}
                      {result && result.breakdown.some(b => b.label.startsWith("Teto legal aplicado")) && (
                        <p className="text-xs text-yellow-700 font-semibold mt-1">⚠ Teto legal aplicado: o valor bruto ultrapassou o limite máximo permitido pela legislação.</p>
                      )}
                    </div>

                    {/* Breakdown */}
                    <div className="bg-secondary/5 rounded-xl border border-secondary/10 divide-y divide-secondary/10">
                      {result.breakdown.filter(item => item.show === undefined || item.show).map((item, i) => (
                        <div key={i} className="flex items-start justify-between gap-3 px-4 py-3">
                          <span className="text-xs text-neutral-800 leading-snug font-semibold">{item.label}</span>
                          <span className="text-xs font-bold text-neutral-900 whitespace-nowrap min-w-20 text-right block">{item.value || '—'}</span>
                        </div>
                      ))}
                    </div>

                    {/* Legal basis */}
                    <p className="text-xs text-secondary-foreground/40 text-center">
                      Base legal: {result.legal}
                    </p>

                    {/* CTAs */}
                    <div className="space-y-2 pt-1">
                      <button
                        onClick={() => window.open("https://wa.me/5571996171605?text=Olá!%20Minha%20empresa%20precisa%20se%20adequar%20às%20NRs.%20Quero%20saber%20como%20vocês%20podem%20me%20ajudar.", "_blank")}
                        className="w-full py-2.5 bg-primary text-white text-sm font-bold rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
                      >
                        Regularizar Agora — Falar com Especialista
                      </button>
                      <button
                        onClick={() => setResult(null)}
                        className="w-full py-2 bg-transparent border border-secondary/15 text-secondary-foreground text-xs rounded-lg hover:bg-secondary/5 transition-colors disabled:opacity-80 disabled:text-secondary-foreground/80"
                        style={{ color: 'rgba(55,65,81,0.85)' }}
                        disabled={false}
                      >
                        Nova simulação
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const base = import.meta.env.BASE_URL;
  const testimonials = [
    {
      name: "João Paulo Almeida",
      role: "Diretor Industrial",
      company: "Metalúrgica Kiron",
      emp: "489 funcionários",
      text: "Precisávamos regularizar urgente para uma auditoria. O PGR foi entregue em 2 dias e salvou nossa operação. Profissionalismo impecável.",
      img: `${base}client1.png`
    },
    {
      name: "Qiáo Zhì",
      role: "Diretor Executivo",
      company: "TM Group Brasil",
      emp: "1479 funcionários",
      text: "Treinamento NR 35 com qualidade excepcional. Equipe totalmente capacitada e dentro do prazo. Recomendo sem hesitar.",
      img: `${base}client2.png`
    },
    {
      name: "Marcela Franco",
      role: "Gerente de Produção",
      company: "Indústria Vork",
      emp: "127 funcionários",
      text: "A consultoria mensal transformou nossa gestão de riscos. Zero autuações nos últimos 18 meses. Parceria indispensável. Profissionais de altíssimo nível.",
      img: `${base}client3.png`
    },
    {
      name: "Maria Fernanda Costa",
      role: "Diretora de RH",
      company: "Rede SINTER",
      emp: "219 funcionários",
      text: "Atendimento ágil, documentação completa e suporte pós-entrega. Exatamente o que precisávamos para manter nossa conformidade.",
      img: `${base}client4.png`
    },
    {
      name: "Acácio Mendes",
      role: "Proprietário",
      company: "Supermercados Mendes",
      emp: "43 funcionários",
      text: "Após anos com problemas com fiscalização, finalmente temos tudo regularizado. Custo-benefício excelente e equipe muito atenciosa.",
      img: `${base}client5.png`
    },
    {
      name: "Ricardo Ferreira",
      role: "Sócio-Diretor",
      company: "Construtora Ferreira & Filhos",
      emp: "197 funcionários",
      text: "Contratamos para o PGR e APR e ficamos tão satisfeitos que migramos para consultoria mensal. Hoje dormimos tranquilos com a legislação.",
      img: `${base}client6.png`
    }
  ];

  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-muted/30 overflow-hidden">
      <style>{`
        @keyframes marquee-rtl {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-rtl 32s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .testimonial-card:hover ~ .testimonial-card,
        .testimonial-card:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Empresas que Confiam na Escudo</h2>
          <p className="text-muted-foreground text-lg">
            Resultados reais de quem já protegeu seu negócio e seus colaboradores conosco.
          </p>
        </motion.div>
      </div>

      <div
        className="relative"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)"
        }}
      >
        <div className="marquee-track">
          {doubled.map((t, i) => (
            <div
              key={i}
              className="testimonial-card shrink-0 w-80 md:w-96 mx-4 bg-card border border-border rounded-2xl p-7 shadow-md relative group cursor-default select-none"
              style={{ isolation: "isolate" }}
              onMouseEnter={e => {
                const track = e.currentTarget.closest(".marquee-track") as HTMLElement | null;
                if (track) track.style.animationPlayState = "paused";
              }}
              onMouseLeave={e => {
                const track = e.currentTarget.closest(".marquee-track") as HTMLElement | null;
                if (track) track.style.animationPlayState = "running";
              }}
            >
              <div className="absolute top-5 right-6 text-primary/15 font-serif text-7xl leading-none select-none pointer-events-none">"</div>
              <div className="flex gap-0.5 mb-4">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-foreground/80 text-base leading-relaxed italic mb-6 relative z-10 min-h-24 flex items-end">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 border-t border-border pt-5" style={{alignItems: 'flex-end', minHeight: 0}}>
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover object-top border-2 border-primary/30 shrink-0"
                />
                <div>
                  <h4 className="font-bold text-foreground text-sm">{t.name}</h4>
                  <p className="text-xs text-muted-foreground">{t.role} — {t.company}</p>
                  <p className="text-xs text-primary font-semibold mt-0.5">{t.emp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  const features = [
    {
      title: "Técnico Registrado MTE",
      desc: "Todos os documentos assinados por profissional habilitado, com validade jurídica garantida.",
      icon: ShieldCheck
    },
    {
      title: "Entrega Express em 48h",
      desc: "Urgência? Regularize sua empresa antes da próxima fiscalização com agilidade sem igual.",
      icon: Clock
    },
    {
      title: "Documentação 100% Digital",
      desc: "Documentos em PDF assinados digitalmente, válidos juridicamente em todo território nacional.",
      icon: FileText
    },
    {
      title: "Suporte Pós-Entrega",
      desc: "Acompanhamento contínuo para implementação das ações e esclarecimento de dúvidas.",
      icon: Phone
    }
  ];

  return (
    <section className="py-24 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-20 h-20 mx-auto bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:-translate-y-2 transition-all duration-300">
                <f.icon className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    {
      q: "PGR é obrigatório para minha empresa?",
      a: "Sim. Desde janeiro de 2022, o PGR é obrigatório para TODAS as empresas com funcionários, independente do porte (NR 1). Substituiu o antigo PPRA. Empresas sem PGR podem ser multadas em até R$ 250 mil."
    },
    {
      q: "Qual o prazo de entrega dos documentos?",
      a: "Nosso prazo padrão é 48 horas para PGR e APR após a visita técnica. Documentos menores como OSS e DDS são entregues em 24 horas. Em casos de urgência, podemos negociar prazos ainda menores."
    },
    {
      q: "Os treinamentos têm validade legal?",
      a: "Sim. Todos os treinamentos são ministrados por técnico registrado no MTE (Ministério do Trabalho), com certificados que têm validade jurídica. NR 35 tem validade de 2 anos, NR 33 de 1 ano."
    },
    {
      q: "Atende empresas de qual porte?",
      a: "Atendemos desde MEIs com funcionários até grandes empresas com centenas de colaboradores. O investimento é proporcional ao porte e às necessidades de cada empresa."
    },
    {
      q: "Como funciona a consultoria mensal?",
      a: "A consultoria mensal inclui: visita técnica mensal, atualização de documentos, acompanhamento de indicadores de segurança, DDS mensais, suporte ilimitado por WhatsApp e preparação para fiscalizações."
    },
    {
      q: "O que acontece se minha empresa for fiscalizada sem documentação?",
      a: "As multas variam de R$ 402,53 a R$ 250.000 dependendo da gravidade e do número de funcionários (Art. 201 da CLT). Além das multas, a empresa pode ter atividades embargadas e o responsável pode responder criminalmente em casos de acidentes."
    }
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Perguntas Frequentes</h2>
          <p className="text-muted-foreground text-lg">Tire suas dúvidas sobre a regularização em SST.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={false}
              className={cn(
                "border rounded-2xl overflow-hidden transition-colors",
                open === i ? "bg-white border-primary/30 shadow-md" : "bg-card border-border hover:border-primary/30"
              )}
            >
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left font-medium text-base"
              >
                <span>{faq.q}</span>
                {open === i ? (
                  <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
              </button>
              
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-muted-foreground pt-2">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="py-24 bg-secondary text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Não Espere a Fiscalização Chegar</h2>
        <p className="text-xl text-secondary-foreground/80 mb-10 max-w-2xl mx-auto">
          Regularize sua empresa hoje e durma tranquilo. Nossa equipe está pronta para elaborar sua documentação em até 48 horas.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.open("https://wa.me/5571996171605?text=Olá!%20Minha%20empresa%20precisa%20se%20adequar%20às%20NRs.%20Quero%20saber%20como%20vocês%20podem%20me%20ajudar.", "_blank")}
            className="px-5 py-2.5 bg-[#25D366] text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-[#25D366]/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Falar no WhatsApp Agora
          </button>
          <a
            href="/orcamento"
            className="px-5 py-2.5 bg-transparent border border-white/25 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
          >
            Solicitar Orçamento por Email
          </a>
        </div>
        <p className="mt-6 text-sm text-secondary-foreground/60">
          Resposta em até 2 horas | Atendimento de segunda a sexta-feira, 8h-18h  
        </p>
      </div>
    </section>
  );
}
