import { Shield, MessageCircle, Mail, MapPin } from "lucide-react";
import { Link, useLocation } from "wouter";

export function Footer() {
  const [location] = useLocation();
  const isHomePage = location === "/";
  const isBlogPage = location === "/blog";
  const isServicesPage = location === "/servicos" || location.startsWith("/servicos/");
  const isContactPage = location === "/contato";
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className="bg-secondary text-secondary-foreground pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Logo SST"
                className="h-10 w-10 object-contain mix-blend-screen"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-serif font-bold text-xl text-white">Escudo</span>
                <span className="text-[10px] text-white/50 tracking-wider uppercase">Consultoria Especializada</span>
              </div>
            </Link>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed">
              Especialistas em Segurança e Saúde do Trabalho. Protegendo sua empresa de multas e cuidando da vida dos seus colaboradores.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-accent">
              <Shield className="w-4 h-4" />
              Técnico Registrado MTE
            </div>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-lg text-white mb-6">Links Rápidos</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-secondary-foreground/70 hover:text-primary transition-colors"
                  onClick={e => {
                    if (isHomePage) {
                      console.log('[Footer] Clique em Início: já está na Home, preventDefault acionado');
                      e.preventDefault();
                      scrollToTop();
                    } else {
                      console.log('[Footer] Clique em Início: navegando normalmente');
                    }
                  }}
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos"
                  className="text-secondary-foreground/70 hover:text-primary transition-colors"
                  onClick={e => {
                    if (isServicesPage) {
                      console.log('[Footer] Clique em Serviços: já está na página, preventDefault acionado');
                      e.preventDefault();
                      scrollToTop();
                    } else {
                      console.log('[Footer] Clique em Serviços: navegando normalmente');
                    }
                  }}
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-secondary-foreground/70 hover:text-primary transition-colors"
                  onClick={e => {
                    if (isBlogPage) {
                      console.log('[Footer] Clique em Blog: já está na página, preventDefault acionado');
                      e.preventDefault();
                      scrollToTop();
                    } else {
                      console.log('[Footer] Clique em Blog: navegando normalmente');
                    }
                  }}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-secondary-foreground/70 hover:text-primary transition-colors"
                  onClick={e => {
                    if (isContactPage) {
                      console.log('[Footer] Clique em Contato: já está na página, preventDefault acionado');
                      e.preventDefault();
                      scrollToTop();
                    } else {
                      console.log('[Footer] Clique em Contato: navegando normalmente');
                    }
                  }}
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-lg text-white mb-6">Nossos Serviços</h4>
            <ul className="space-y-4">
              <li className="text-secondary-foreground/70">PGR (Programa de Riscos)</li>
              <li className="text-secondary-foreground/70">APR (Análise Preliminar)</li>
              <li className="text-secondary-foreground/70">Treinamentos NR 35 / NR 33</li>
              <li className="text-secondary-foreground/70">Ordem de Serviço (OSS)</li>
              <li className="text-secondary-foreground/70">Consultoria Mensal</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-lg text-white mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-secondary-foreground/70">
                <MessageCircle className="w-5 h-5 text-primary shrink-0" />
                <span>(71) 99617-1605</span>
              </li>
              <li className="flex items-start gap-3 text-secondary-foreground/70">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>contato@escudo.com.br</span>
              </li>
              <li className="flex items-start gap-3 text-secondary-foreground/70">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Rua Blumenau, S/N FICAN<br/>Camaçari - BA</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-secondary-foreground/50 text-sm">
            © {new Date().getFullYear()} Escudo Consultoria. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
