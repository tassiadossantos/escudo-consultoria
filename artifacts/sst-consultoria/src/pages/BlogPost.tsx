

import { useParams } from "wouter";
import { useEffect, useState } from "react";
import { posts } from "./Blog";
import ReactMarkdown from "react-markdown";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Link } from "wouter";

// Importa todos os arquivos .md da pasta posts (Vite 4+)
const markdownFiles = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default' });

export default function BlogPost() {
  const { id } = useParams();
  const post = posts.find((p: { id: number }) => String(p.id) === id);
  const [markdown, setMarkdown] = useState<string | null>(null);


  useEffect(() => {
    if (post && post.id) {
      const filePath = `../posts/${post.id}.md`;
      const loader = markdownFiles[filePath];
      if (loader) {
        loader().then((content: string) => setMarkdown(content)).catch(() => setMarkdown(null));
      } else {
        setMarkdown(null);
      }
    }
  }, [post]);

  if (!post) return <div className="p-8 text-center">Artigo não encontrado.</div>;

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto pt-32 pb-16 px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">{post.title}</h1>
          <img src={post.image} alt={post.title} className="w-full rounded-xl mb-8" />
          <div className="flex gap-4 text-muted-foreground text-sm mb-6">
            <span>{post.date}</span>
            <span>{post.category}</span>
            <span>{post.readTime} de leitura</span>
          </div>
          {markdown ? (
            <article className="prose prose-lg max-w-none text-foreground">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </article>
          ) : (
            <p className="text-lg leading-relaxed text-foreground">{post.excerpt}</p>
          )}
          <div className="flex justify-center mt-12">
            <Link
              href="/blog"
              className="px-6 py-3 rounded-full font-semibold shadow transition bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              ← Voltar para o Blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
