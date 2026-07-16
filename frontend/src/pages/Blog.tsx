import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Calendar, Clock, ArrowRight, Tag, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { getAllBlogPosts, type BlogPostMeta } from "@/lib/blog";
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

export default function Blog() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(9); // Quantos artigos mostrar inicialmente
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const loadedPosts = await getAllBlogPosts();
      setPosts(loadedPosts);
    }
    loadPosts();
  }, []);

  const allCategories = [
    "Todos",
    ...Array.from(new Set(posts.map((p) => p.category))).filter(Boolean),
  ];

  const sortedPosts = posts;
  const featured = sortedPosts[0];
  // Remove o destaque da lista de artigos da grade
  const filtered = sortedPosts.filter(
    (p) => (activeCategory === "Todos" || p.category === activeCategory) && p.slug !== featured?.slug,
  );
  const visiblePosts = filtered.slice(0, visibleCount);

  const featuredVisible = featured && (activeCategory === "Todos" || featured.category === activeCategory);

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
            <Link href={`/blog/${featured.slug}`} className="block group relative rounded-3xl overflow-hidden mb-12 cursor-pointer border border-border hover:border-primary/40 transition-all duration-500 shadow-2xl">
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
            {visiblePosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
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

          {/* Carregar mais button */}
          {visibleCount < filtered.length && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setVisibleCount((c) => c + 9)}
                className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/80 transition-all duration-200"
              >
                Carregar mais
              </button>
            </div>
          )}

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
