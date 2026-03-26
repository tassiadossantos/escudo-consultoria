import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export const posts = [
  {
    id: 1,
    title: "CIPA em 2026: Guia Completo sobre NR-5, Eleição, Treinamento e o que Mudou com o Combate ao Assédio",
    excerpt: "CIPA mal estruturada ou apenas no papel gera multas de R$ 6.708,08 e responsabilização em acidentes. Veja o que a NR-5 atualizada exige, como dimensionar e eleger corretamente e as novas obrigações de combate ao assédio.",
    date: "19 Mar 2026",
    category: "Cultura Organizacional",
    readTime: "12 min",
    image: "/blog/treinamento-cipa.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Riscos Psicossociais na NR-1: O que a sua Empresa tem a ver com isso?",
    excerpt: "Burnout, ansiedade e riscos psicossociais estão no topo dos afastamentos no Brasil. Veja o que a NR-1 atualizada exige e como implementar programas de saúde mental no trabalho.",
    date: "19 Mar 2026",
    category: "Saúde e Bem-Estar",
    readTime: "7 min",
    image: "/blog/saude-mental.jpg",
    featured: false,
  },
  {
    id: 3,
    title: "Tecnologia na Segurança do Trabalho: Como a SST 4.0 está Prevenindo Acidentes e Salvando Vidas",
    excerpt: "Descubra como IoT, Inteligência Artificial, wearables e softwares de gestão estão transformando a SST no Brasil. Guia completo com casos reais, checklist de implementação e tendências para 2026.",
    date: "19 Mar 2026",
    category: "Inovação e Tecnologia",
    readTime: "10 min",
    image: "/blog/tecnologia-sst.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Ergonomia no Trabalho: Guia Completo sobre NR-17, LER/DORT e como Implementar a AET na sua Empresa",
    excerpt: "LER e DORT são responsáveis por mais de 30% dos afastamentos no Brasil. Entenda o que a NR-17 exige, quando a AET é obrigatória e como estruturar um programa que previne lesões e reduz afastamentos.",
    date: "19 Mar 2026",
    category: "Ergonomia e Saúde",
    readTime: "6 min",
    image: "/blog/ergonomia-escritorio.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "Gestão de Riscos Ocupacionais: Como o GRO e o PGR Protegem sua Empresa com a NR-1 em 2026",
    excerpt: "Entenda como estruturar a gestão de riscos ocupacionais com GRO e PGR conforme a NR-1 atualizada. Guia completo com os 5 grupos de riscos, metodologia de priorização e integração com PCMSO.",
    date: "19 Mar 2026",
    category: "Gestão e Conformidade",
    readTime: "8 min",
    image: "/blog/gestao-riscos.jpg",
    featured: false,
  },
  {
    id: 6,
    title: "Gestão de EPI: Guia Completo sobre NR-6, Certificado de Aprovação e o que Muda em 2026",
    excerpt: "Mais de 570 mil acidentes de trabalho por ano têm relação direta com a gestão inadequada de EPIs. Veja o que a NR-6 atualizada exige e como estruturar o controle de entrega para evitar autuações.",
    date: "19 Mar 2026",
    category: "Equipamentos de Proteção",
    readTime: "11 min",
    image: "/blog/epi-worker.jpg",
    featured: false,
  },
  {
    id: 7,
    title: "Cultura de Segurança: Como Engajar Colaboradores na Prevenção de Acidentes de Forma Duradoura",
    excerpt: "Campanhas isoladas não constroem cultura de segurança. Descubra como engajar colaboradores na prevenção com estratégias baseadas em liderança, CIPA, DDS, reconhecimento e participação real.",
    date: "19 Mar 2026",
    category: "Cultura Organizacional",
    readTime: "12 min",
    image: "/blog/engajar-colaboradores.jpg",
    featured: false,
  },
  {
    id: 8,
    title: "Inspeção Periódica em SST: Como Estruturar um Cronograma que Previne Acidentes e Passa em Qualquer Fiscalização",
    excerpt: "Descubra como implementar inspeções periódicas eficazes em máquinas, equipamentos e ambientes conforme NR-1, NR-12 e NR-35. Checklist completo e passo a passo para transformar inspeção em cultura de prevenção.",
    date: "19 Mar 2026",
    category: "Fiscalização",
    readTime: "11 min",
    image: "/blog/inspecao-periodica.jpg",
    featured: false,
  },
  {
    id: 9,
    title: "Comunicação em SST: Como Falhas de Comunicação Geram Acidentes e o que a NR-1 Exige",
    excerpt: "Estudos mostram que falhas de comunicação estão entre as principais causas de acidentes de trabalho. Descubra o que a NR-1 exige e como estruturar canais eficazes de comunicação preventiva.",
    date: "19 Mar 2026",
    category: "Cultura Organizacional",
    readTime: "12 min",
    image: "/blog/comunicacao-sst.jpg",
    featured: false,
  },
  {
    id: 10,
    title: "Fiscalização do MTE: Checklist Completo para sua Empresa Estar Pronta Antes do Auditor Chegar",
    excerpt: "O auditor fiscal não avisa quando vai chegar. Veja o checklist completo com todos os documentos, condições e procedimentos que o MTE verifica em 2026 e como transformar cada visita em confirmação.",
    date: "02 Fev 2024",
    category: "Fiscalização",
    readTime: "13 min",
    image: "/blog/checklist-fiscalizacao.jpg",
    featured: false,
  },
  {
    id: 11,
    title: "Documentação de SST: O Guia Completo dos Registros que Protegem sua Empresa e o que Muda com o eSocial",
    excerpt: "Sem documentação de SST, o ônus da prova recai sobre a empresa. Veja quais registros são obrigatórios, como o eSocial transforma silêncio em confissão de culpa e os valores das multas atualizados.",
    date: "18 Jan 2024",
    category: "Gestão Documental",
    readTime: "12 min",
    image: "/blog/documentacao-acidente.jpg",
    featured: false,
  },
  {
    id: 12,
    title: "Cronograma Anual de SST: Como Planejar a Segurança do Trabalho para o Ano Inteiro",
    excerpt: "Sem cronograma de SST, a empresa reage a crises em vez de preveni-las. Veja como estruturar um planejamento anual por mês, o que não pode faltar em 2026 e como integrar treinamentos, documentos e eSocial.",
    date: "05 Jan 2024",
    category: "Gestão e Planejamento",
    readTime: "12 min",
    image: "/blog/cronograma-sst.jpg",
    featured: false,
  },
  {
    id: 13,
    title: "Treinamento NR 35: Guia Completo sobre Trabalho em Altura, Obrigações e Conformidade Legal",
    excerpt: "Tudo o que sua empresa precisa saber sobre o treinamento NR 35: quem é obrigado, carga horária, reciclagem, certificados, EPIs e consequências do descumprimento.",
    date: "20 Nov 2023",
    category: "Treinamentos e NRs",
    readTime: "9 min",
    image: "/blog/treinamento-nr35.jpg",
    featured: false,
  },
  {
    id: 14,
    title: "Fiscalização do MTE em 2026: Os 5 Erros que Geram Multa e Como Evitar Autuação na sua Empresa",
    excerpt: "O MTE intensificou as fiscalizações e os valores das multas por descumprimento das NRs subiram. Veja os erros mais comuns que geram autuação e como blindar sua empresa antes que o fiscal chegue.",
    date: "02 Nov 2023",
    category: "Fiscalização",
    readTime: "11 min",
    image: "/blog/multas-mte.jpg",
    featured: false,
  },
  {
    id: 15,
    title: "PGR: O Guia Completo para Substituir o PPRA e Estar em Conformidade com a NR-1 em 2026",
    excerpt: "Entenda o que é o PGR, como ele substituiu o PPRA, o que a NR-1 atualizada exige e como implementar o Programa de Gerenciamento de Riscos na sua empresa antes que a fiscalização punitiva comece.",
    date: "15 Out 2023",
    category: "Legislação",
    readTime: "11 min",
    image: "/blog/pgr-ppra.jpg",
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  "Cultura Organizacional": "bg-purple-500/90",
  "Saúde e Bem-Estar": "bg-rose-500/90",
  "Inovação e Tecnologia": "bg-blue-500/90",
  "Ergonomia e Saúde": "bg-teal-500/90",
  "Gestão e Conformidade": "bg-amber-500/90",
  "Equipamentos de Proteção": "bg-orange-500/90",
  "Gestão Documental": "bg-cyan-500/90",
  "Gestão e Planejamento": "bg-indigo-500/90",
  "Treinamentos e NRs": "bg-sky-500/90",
  "Fiscalização": "bg-red-500/90",
  "Legislação": "bg-violet-500/90",
};


const allCategories = ["Todos", ...Array.from(new Set(posts.map((p) => p.category)))];

export default function Blog() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");

  const featured = posts[0];
  const filtered = posts
    .slice(1)
    .filter((p) => activeCategory === "Todos" || p.category === activeCategory);

  const featuredVisible = activeCategory === "Todos" || featured.category === activeCategory;

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
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, hsl(222 47% 30%) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, hsl(222 47% 30%) 40px)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary mb-5 border border-primary/30 rounded-full px-4 py-1.5 bg-primary/10">
            <Tag className="w-3 h-3" /> Conteúdo SST
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Blog &amp; Artigos
          </h1>
          <p className="text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">
            Conhecimento especializado em Segurança e Saúde do Trabalho para manter sua
            empresa protegida, em conformidade e à frente das fiscalizações.
          </p>
        </div>
      </header>

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ...restante do código permanece igual... */}

          {/* Featured article */}
          {featuredVisible && (
            <Link href={`/blog/${featured.id}`} className="block group relative rounded-3xl overflow-hidden mb-12 cursor-pointer border border-border hover:border-primary/40 transition-all duration-500 shadow-2xl">
              <article>
                <div className="relative aspect-21/9 md:aspect-21/8 overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="absolute inset-0 flex items-end p-8 md:p-12">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xs font-bold text-white px-3 py-1 rounded-full ${categoryColors[featured.category] ?? "bg-primary/90"}`}>
                        {featured.category}
                      </span>
                      <span className="text-white/60 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {featured.readTime} de leitura
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 line-clamp-2 max-w-xl">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-6">
                      <span className="text-white/50 text-xs flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {featured.date}
                      </span>
                      <span className="text-primary font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                        Ler artigo completo <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-6 right-6 bg-primary/10 border border-primary/30 text-primary text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  Destaque
                </div>
              </article>
            </Link>
          )}

          {/* Article grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-400 cursor-pointer flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                  <span
                    className={`absolute top-3 left-3 text-xs font-bold text-white px-3 py-1 rounded-full ${categoryColors[post.category] ?? "bg-primary/90"}`}
                  >
                    {post.category}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white/90 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-muted-foreground text-xs flex items-center gap-1.5 mb-3">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </span>
                  <h2 className="text-base font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-3 leading-snug flex-1">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-5 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <span className="text-primary font-semibold flex items-center gap-2 text-sm group-hover:gap-3 transition-all mt-auto">
                    Ler artigo <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && !featuredVisible && (
            <div className="text-center py-24 text-muted-foreground">
              Nenhum artigo nesta categoria ainda.
            </div>
          )}
        </div>
      </main>

      {/* Banner/CTA Orçamento Blog */}
      <div className="mt-24 mb-10 text-center bg-linear-to-br from-primary/90 to-primary/60 rounded-3xl border-4 border-primary shadow-2xl p-12 flex flex-col items-center justify-center">
        <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
          Quer saber quanto custa proteger sua empresa?
        </h3>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg font-medium">
          Solicite um orçamento gratuito e receba uma proposta personalizada para adequar sua empresa às NRs, evitar multas e garantir a segurança dos seus colaboradores.
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

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
