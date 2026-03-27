

import { useParams } from "wouter";
import { useEffect, useState } from "react";
import { posts } from "./posts";
import ReactMarkdown from "react-markdown";
import "../styles/blog-article.css";
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
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-200 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto pt-32 pb-20 px-4 md:px-0">
          {/* Título Premium */}
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary drop-shadow mb-4 leading-tight">
            {post.title}
          </h1>
          {/* Metadados Premium */}
          <div className="flex flex-wrap items-center gap-3 text-base md:text-lg text-muted-foreground mb-6 font-medium">
            <span className="inline-flex items-center gap-1"><svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>{post.date}</span>
            <span className="inline-flex items-center gap-1"><svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 10c-4.418 0-8-1.79-8-4V7a2 2 0 012-2h12a2 2 0 012 2v7c0 2.21-3.582 4-8 4z" /></svg>{post.category}</span>
            <span className="inline-flex items-center gap-1"><svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>{post.readTime}</span>
          </div>
          {/* Imagem de capa */}
          <img src={post.image} alt={post.title} className="w-full rounded-3xl shadow-2xl mb-10 border-4 border-white" />
          {/* Autor Premium */}
          {post.author && (
            <div className="mb-10">
              <div className="pl-4 italic text-lg text-muted-foreground bg-white/60 py-2 rounded-r-xl shadow-sm">
                <span className="font-bold text-primary">Autor:</span> <span className="font-medium">{post.author}</span>
              </div>
            </div>
          )}
          {/* Artigo Markdown Premium */}
          {markdown ? (
            <article className="prose prose-xl max-w-none text-foreground bg-white/90 rounded-3xl shadow-2xl p-8 md:p-12 prose-headings:font-extrabold prose-headings:text-primary prose-headings:tracking-tight prose-h2:mt-12 prose-h2:mb-4 prose-h3:mt-10 prose-h3:mb-3 prose-h4:mt-8 prose-h4:mb-2 prose-p:my-6 prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:font-medium prose-li:my-2 prose-strong:text-primary prose-em:text-secondary prose-img:rounded-2xl prose-img:shadow-lg prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80 prose-code:bg-neutral-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-neutral-900 prose-pre:text-white prose-pre:rounded-xl prose-pre:p-4">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </article>
          ) : (
            <p className="text-lg leading-relaxed text-foreground">{post.excerpt}</p>
          )}
          {/* Botão Voltar */}
          <div className="flex justify-center mt-16">
            <Link
              href="/blog"
              className="px-7 py-3 rounded-full font-bold shadow-lg transition bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg tracking-wide"
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
