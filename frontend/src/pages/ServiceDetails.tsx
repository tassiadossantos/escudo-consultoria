import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ShieldCheck, CheckCircle2, Clock, FileText, ArrowRight, ArrowLeft, MessageCircle } from "lucide-react";
import { Link, useParams } from "wouter";
import { servicesData } from "./ServicesPage";

export default function ServiceDetails() {
  const params = useParams<{ slug: string }>();
  const service = servicesData.find((s) => s.slug === params.slug) ?? servicesData[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section
        className="pt-32 pb-20 relative overflow-hidden"
        style={{ background: "hsl(222 47% 9%)" }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 60% at 20% 50%, hsl(142 71% 45% / 0.35) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, hsl(222 47% 30%) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, hsl(222 47% 30%) 40px)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/servicos" className="inline-flex items-center gap-2 text-white/50 hover:text-primary text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Todos os serviços
          </Link>
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-bold mb-6">
              {service.nr} — Habilitado pelo MTE
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {service.title}
            </h1>
            <p className="text-xl text-white/70 mb-4 font-medium">{service.subtitle}</p>
            <p className="text-lg text-white/55 mb-10 leading-relaxed max-w-2xl">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/orcamento"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> Solicitar Orçamento
              </Link>
              <Link href="/servicos" className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white/80 font-semibold rounded-xl hover:border-primary/50 hover:text-primary transition-all">
                Ver outros serviços
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">O que está incluso</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.includes.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-card p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="font-medium text-foreground text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other services */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Outros serviços</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {servicesData
                    .filter((s) => s.slug !== service.slug)
                    .slice(0, 4)
                    .map((s) => (
                      <Link
                        key={s.slug}
                        href={`/servicos/${s.slug}`}
                        className="group flex items-center gap-4 bg-card p-4 rounded-xl border border-border hover:border-primary/40 transition-all"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                          <s.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                            {s.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">{s.subtitle}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      </Link>
                    ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-card p-8 rounded-3xl border border-border sticky top-32">
                <h3 className="text-xl font-bold text-foreground mb-6">Resumo do Serviço</h3>

                <ul className="space-y-6 mb-8">
                  <li className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-foreground text-sm">Prazo / Duração</p>
                      <p className="text-sm text-muted-foreground">{service.sidebar.prazo}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-foreground text-sm">Validade</p>
                      <p className="text-sm text-muted-foreground">{service.sidebar.validade}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-foreground text-sm">Formato de Entrega</p>
                      <p className="text-sm text-muted-foreground">{service.sidebar.formato}</p>
                    </div>
                  </li>
                </ul>

                <div className="border-t border-border pt-6 mb-6">
                  <p className="text-2xl font-bold text-foreground">{service.price}</p>
                  <p className="text-xs text-muted-foreground mt-1">Orçamento gratuito e sem compromisso</p>
                </div>

                <button
                  onClick={() => window.open("https://wa.me/5571996171605?text=Olá!%20Minha%20empresa%20precisa%20se%20adequar%20às%20NRs.%20Quero%20saber%20como%20vocês%20podem%20me%20ajudar.", "_blank")}
                  className="w-full py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" /> Falar com Especialista
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
