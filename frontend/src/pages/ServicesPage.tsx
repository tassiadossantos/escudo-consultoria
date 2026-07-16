import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import {
  FileText,
  AlertOctagon,
  ShieldCheck,
  Users,
  Clock,
  Check,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { Link } from "wouter";

export const servicesData = [
  {
    slug: "pgr",
    title: "PGR",
    subtitle: "Programa de Gerenciamento de Riscos",
    nr: "NR 1",
    target: "Obrigatório para todas as empresas com empregados CLT",
    deadline: "Entrega em até 48h após a visita",
    price: "A partir de R$ 800",
    icon: FileText,
    description:
      "O PGR substituiu o PPRA e é obrigatório desde janeiro de 2022. Identifica e controla os riscos físicos, químicos, biológicos, ergonômicos e de acidente no ambiente de trabalho — protegendo sua empresa de multas e responsabilizações.",
    includes: [
      "Inventário de Riscos Ocupacionais",
      "Plano de Ação com prazos e responsáveis",
      "Levantamento fotográfico do ambiente",
      "Reconhecimento de perigos por função",
      "Assinatura por Engenheiro de Segurança habilitado",
      "Emissão de ART/TRT",
    ],
    sidebar: {
      prazo: "Até 48h após visita técnica",
      validade: "2 anos (ou antes se houver mudanças)",
      formato: "PDF assinado digitalmente + impresso",
    },
  },
  {
    slug: "apr",
    title: "APR",
    subtitle: "Análise Preliminar de Risco",
    nr: "NR 1 / 35 / 33",
    target: "Para obras, serviços especializados e atividades de risco",
    deadline: "Entrega em até 24h",
    price: "A partir de R$ 400",
    icon: AlertOctagon,
    description:
      "A APR é o documento que antecipa os riscos antes que qualquer trabalho perigoso comece. Obrigatória em atividades de alto risco como trabalho em altura, espaços confinados, eletricidade e operações com equipamentos pesados.",
    includes: [
      "Identificação de todos os riscos da atividade",
      "Medidas de controle para cada risco",
      "Definição dos EPIs necessários",
      "Procedimento de emergência",
      "Assinatura do responsável técnico",
      "Registro e arquivamento digital",
    ],
    sidebar: {
      prazo: "Até 24h após briefing da atividade",
      validade: "Válida por atividade/tarefa específica",
      formato: "PDF assinado + via física para equipe",
    },
  },
  {
    slug: "nr35",
    title: "Treinamento NR 35",
    subtitle: "Trabalho em Altura",
    nr: "NR 35",
    target: "Obrigatório para quem trabalha acima de 2 metros",
    deadline: "Duração: 8 horas",
    price: "A partir de R$ 150/pessoa",
    icon: Users,
    description:
      "A NR 35 exige treinamento específico para todo trabalhador que executa atividades acima de 2 metros de altura. Sem o certificado, a empresa está sujeita a interdição imediata e responsabilização civil em caso de acidentes.",
    includes: [
      "Teoria sobre riscos no trabalho em altura",
      "Inspeção e uso correto dos EPIs",
      "Técnicas de ancoragem e proteção coletiva",
      "Plano de resgate e primeiros socorros",
      "Certificado individual emitido",
      "Reciclagem anual incluída na programação",
    ],
    sidebar: {
      prazo: "Carga horária: 8 horas",
      validade: "Certificado válido por 2 anos",
      formato: "Presencial + certificado digital",
    },
  },
  {
    slug: "nr33",
    title: "Treinamento NR 33",
    subtitle: "Espaços Confinados",
    nr: "NR 33",
    target: "Obrigatório para trabalho em espaços confinados",
    deadline: "Duração: 16 horas",
    price: "A partir de R$ 200/pessoa",
    icon: ShieldCheck,
    description:
      "A NR 33 regulamenta os trabalhos em ambientes como tanques, dutos, silos, galerias e câmaras. A falta de treinamento é responsável por grande parte das mortes nesse tipo de ambiente — a cada acidente, há risco de múltiplas vítimas nos resgates.",
    includes: [
      "Classificação e tipos de espaços confinados",
      "Avaliação de atmosferas perigosas",
      "Uso de detectores de gases",
      "Procedimentos de entrada e saída segura",
      "Comunicação e sistema de vigias",
      "Certificado por função (vigia, supervisor, entrante)",
    ],
    sidebar: {
      prazo: "Carga horária: 16 horas",
      validade: "Certificado válido por 1 ano",
      formato: "Presencial + certificado digital",
    },
  },
  {
    slug: "oss",
    title: "Ordem de Serviço de Segurança",
    subtitle: "OSS — NR 1",
    nr: "NR 1",
    target: "Obrigatório para todos os trabalhadores da empresa",
    deadline: "Entrega em até 24h",
    price: "A partir de R$ 200",
    icon: FileText,
    description:
      "A Ordem de Serviço de Segurança é o documento que instrui cada trabalhador sobre os riscos específicos da sua função e as medidas de proteção que devem ser adotadas. Sem ela, a empresa não tem como comprovar que cumpriu seu dever de informar.",
    includes: [
      "OSS individualizada por função/cargo",
      "Riscos específicos identificados por setor",
      "Medidas preventivas e EPIs por atividade",
      "Cláusula de ciência e assinatura do colaborador",
      "Integração com o PGR existente",
      "Arquivo digital organizado por colaborador",
    ],
    sidebar: {
      prazo: "Até 24h após coleta das funções",
      validade: "Revisada a cada mudança de função ou risco",
      formato: "PDF por colaborador + assinatura digital",
    },
  },
  {
    slug: "consultoria-mensal",
    title: "Consultoria Mensal SST",
    subtitle: "Gestão Contínua de Segurança",
    nr: "Gestão Contínua",
    target: "Empresas que querem conformidade permanente",
    deadline: "Acompanhamento recorrente",
    price: "A partir de R$ 1.200/mês",
    icon: ShieldCheck,
    description:
      "A consultoria mensal garante que sua empresa esteja sempre em conformidade com as NRs, sem depender de apagões de incêndio quando o fiscal aparece. Cuidamos de toda a gestão de SST enquanto você foca no seu negócio.",
    includes: [
      "Visita técnica mensal presencial",
      "Atualização de documentos e registros",
      "Acompanhamento de vencimentos e reciclagens",
      "Suporte prioritário via WhatsApp",
      "Relatório mensal de conformidade",
      "Representação técnica perante o MTE",
    ],
    sidebar: {
      prazo: "Visita mensal + suporte contínuo",
      validade: "Contrato mensal renovável",
      formato: "Presencial + gestão digital",
    },
  },
    {
      slug: "dds",
      title: "Treinamento DDS",
      subtitle: "Diálogo Diário de Segurança",
      nr: "NR 1 / 5 / 6 / 9",
      target: "Recomendado para todos os setores e equipes operacionais",
      deadline: "Duração: 30 minutos a 1 hora",
      price: "A partir de R$ 80/pessoa",
      icon: MessageCircle,
      description:
        "O DDS é uma ferramenta fundamental para reforçar a cultura de prevenção, reduzindo acidentes e promovendo o engajamento diário dos colaboradores. Atende exigências de diversas NRs e é um diferencial em auditorias e fiscalizações.",
      includes: [
        "Conteúdo adaptado ao risco da atividade",
        "Exemplos práticos e dinâmicos",
        "Registro de presença e assinatura",
        "Material digital para multiplicação interna",
        "Instrutor habilitado em SST",
        "Relatório de realização para auditoria",
      ],
      sidebar: {
        prazo: "Agendamento flexível conforme escala",
        validade: "Recomendado semanal ou diário",
        formato: "Presencial ou online + registro digital",
      },
    },
    {
      slug: "cipa",
      title: "Treinamento CIPA",
      subtitle: "Comissão Interna de Prevenção de Acidentes",
      nr: "NR 5",
      target: "Empresas obrigadas a constituir CIPA ou designar responsável",
      deadline: "Duração: 8 horas",
      price: "A partir de R$ 120/pessoa",
      icon: Users,
      description:
        "Capacitação obrigatória para membros da CIPA, abordando prevenção de acidentes, combate ao assédio, SIPAT, análise de riscos e atribuições legais. Essencial para evitar multas e garantir a efetividade da comissão.",
      includes: [
        "Conteúdo atualizado conforme NR 5/2026",
        "Simulações de reuniões e análise de atas",
        "Plano de ação para SIPAT e campanhas",
        "Material didático e certificado válido",
        "Instrutor com experiência em CIPA",
        "Orientação sobre dimensionamento e eleição",
      ],
      sidebar: {
        prazo: "Carga horária: 8 horas",
        validade: "Certificado válido por 1 ano",
        formato: "Presencial ou online + certificado digital",
      },
    },
    {
      slug: "nr12",
      title: "Consultoria NR 12",
      subtitle: "Segurança em Máquinas e Equipamentos",
      nr: "NR 12",
      target: "Indústrias, oficinas e empresas com máquinas/equipamentos",
      deadline: "Prazo conforme escopo e porte",
      price: "Sob consulta",
      icon: ShieldCheck,
      description:
        "Adequação completa à NR 12, incluindo inventário de máquinas, análise de riscos, implementação de proteções, treinamentos e documentação técnica. Reduz riscos de acidentes graves e autuações milionárias.",
      includes: [
        "Inventário e classificação de máquinas",
        "Análise de risco por equipamento",
        "Plano de adequação e cronograma",
        "Treinamento de operadores e manutenção",
        "Laudos e ARTs de conformidade",
        "Acompanhamento de auditorias fiscais",
      ],
      sidebar: {
        prazo: "Conforme escopo e porte da empresa",
        validade: "Revisão anual ou a cada alteração",
        formato: "Relatórios, laudos e treinamentos presenciais",
      },
    },
    {
      slug: "parecer-tecnico",
      title: "Parecer Técnico SST",
      subtitle: "Análise e Solução de Demandas Específicas",
      nr: "Multinormas",
      target: "Empresas com dúvidas técnicas, processos ou exigências fiscais",
      deadline: "Entrega em até 5 dias úteis",
      price: "A partir de R$ 600",
      icon: FileText,
      description:
        "Elaboração de parecer técnico para situações complexas: exigências fiscais, defesa em autuações, dúvidas sobre aplicação de normas, perícias e processos judiciais. Documento assinado por engenheiro de segurança.",
      includes: [
        "Análise documental e vistoria técnica",
        "Estudo de normas aplicáveis",
        "Reunião de alinhamento com cliente",
        "Parecer assinado e fundamentado",
        "Orientação para defesa ou adequação",
        "Entrega digital e física",
      ],
      sidebar: {
        prazo: "Até 5 dias úteis após briefing",
        validade: "Válido para demanda específica",
        formato: "PDF assinado + via impressa se necessário",
      },
    },
    {
      slug: "cat",
      title: "CAT — Comunicação de Acidente de Trabalho",
      subtitle: "Emissão, Orientação e Gestão de Acidentes",
      nr: "NR 7 / NR 4 / INSS",
      target: "Empresas e RHs que precisam emitir CAT",
      deadline: "Emissão em até 24h",
      price: "A partir de R$ 250",
      icon: AlertOctagon,
      description:
        "Assessoria completa para emissão da CAT, orientação sobre procedimentos legais, acompanhamento de afastamentos e suporte em perícias. Reduz riscos de autuações e garante direitos do trabalhador.",
      includes: [
        "Emissão da CAT online ou presencial",
        "Orientação sobre documentação e prazos",
        "Acompanhamento de afastamentos",
        "Suporte em perícias e recursos",
        "Relatório para auditoria interna",
        "Atendimento sigiloso e humanizado",
      ],
      sidebar: {
        prazo: "Em até 24h após solicitação",
        validade: "Por ocorrência/acidente",
        formato: "Digital + presencial se necessário",
      },
    },
    {
      slug: "integracao",
      title: "Treinamento de Integração",
      subtitle: "Ambientação e Segurança para Novos Colaboradores",
      nr: "NR 1 / NR 6 / NR 7 / NR 9",
      target: "Todos os novos colaboradores e terceirizados",
      deadline: "Duração: 2 a 4 horas",
      price: "A partir de R$ 90/pessoa",
      icon: Users,
      description:
        "Treinamento obrigatório para novos colaboradores, abordando riscos gerais, uso de EPIs, procedimentos de emergência e cultura de segurança. Reduz acidentes nos primeiros meses e fortalece o clima organizacional.",
      includes: [
        "Apresentação da empresa e normas internas",
        "Riscos gerais e específicos do ambiente",
        "Uso correto de EPIs e EPCs",
        "Procedimentos de emergência e evacuação",
        "Entrega de materiais e registro de presença",
        "Certificado de participação",
      ],
      sidebar: {
        prazo: "Agendamento conforme admissão",
        validade: "Recomendado a cada admissão",
        formato: "Presencial ou online + certificado",
      },
    },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Header */}
      <header
        className="relative pt-32 pb-20 overflow-hidden"
        style={{ background: "hsl(222 47% 9%)" }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(142 71% 45% / 0.4) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, hsl(222 47% 30%) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, hsl(222 47% 30%) 40px)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary mb-5 border border-primary/30 rounded-full px-4 py-1.5 bg-primary/10">
            <ShieldCheck className="w-3 h-3" /> Soluções em SST
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Nossos Serviços
          </h1>
          <p className="text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">
            Documentação técnica, treinamentos e gestão contínua de Segurança e
            Saúde do Trabalho — elaborados por profissionais habilitados, com
            validade jurídica e entrega rápida.
          </p>
        </div>
      </header>

      {/* Services grid */}
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => (
              <Link key={service.slug} href={`/servicos/${service.slug}`}>
                <article className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer flex flex-col h-full">
                  {/* Icon + NR */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <service.icon className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold">
                      {service.nr}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-5">
                    {service.subtitle}
                  </p>

                  {/* Details */}
                  <div className="space-y-2.5 mb-6 grow">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{service.target}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{service.deadline}</span>
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div className="pt-6 border-t border-border mt-auto">
                    <p className="text-lg font-bold text-foreground mb-4">
                      {service.price}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                        Ver detalhes <ArrowRight className="w-4 h-4" />
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.open("https://wa.me/5571996171605?text=Olá!%20Minha%20empresa%20precisa%20se%20adequar%20às%20NRs.%20Quero%20saber%20como%20vocês%20podem%20me%20ajudar.", "_blank");
                        }}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                      </button>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          {/* Banner/CTA Orçamento */}
          <div className="mt-20 text-center bg-gradient-to-br from-primary/90 to-primary/60 rounded-3xl border-4 border-primary shadow-2xl p-12 flex flex-col items-center justify-center">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
              Solicite um Orçamento Inteligente e Proteja sua Empresa!
            </h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg font-medium">
              Receba uma proposta detalhada, feita sob medida para sua realidade, com todos os documentos e treinamentos obrigatórios para evitar multas e garantir a segurança dos seus colaboradores.
            </p>
            <Link
              href="/orcamento"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-primary font-extrabold text-lg rounded-xl shadow-xl hover:bg-primary hover:text-white border-2 border-white hover:border-primary transition-all duration-200 uppercase tracking-wider group"
            >
              <ShieldCheck className="w-6 h-6 group-hover:text-white text-primary" />
              Solicitar Orçamento Gratuito
              <ArrowRight className="w-5 h-5 group-hover:text-white text-primary" />
            </Link>
            <p className="text-white/70 text-xs mt-4">100% sem compromisso. Resposta rápida por e-mail ou WhatsApp.</p>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
