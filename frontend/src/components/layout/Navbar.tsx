import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const isHomePage = location === "/";
  const isBlogPage = location === "/blog";
  const [isScrolled, setIsScrolled] = useState(!isHomePage);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Serviços", path: "/servicos" },
    { name: "Blog", path: "/blog" },
    { name: "Contato", path: "/contato" },
  ];

  // Função para rolar ao topo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "glass-nav py-3" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={e => {
              if (isHomePage) {
                console.log('[Navbar] Clique em Home: já está na Home, preventDefault acionado');
                e.preventDefault();
                scrollToTop();
              } else {
                console.log('[Navbar] Clique em Home: navegando normalmente');
              }
            }}
          >
            <img
              src="/logo.png"
              alt="Logo SST"
              className="h-10 w-10 object-contain group-hover:scale-105 transition-transform mix-blend-screen"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-serif font-bold text-lg tracking-tight text-white">Escudo</span>
              <span className="text-[10px] text-white/50 tracking-wider uppercase">Consultoria Especializada</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location === link.path ? "text-primary" : "text-white/80"
                  )}
                  onClick={e => {
                    if ((link.path === "/" && isHomePage) || (link.path === "/blog" && isBlogPage)) {
                      console.log(`[Navbar] Clique em ${link.name}: já está na página, preventDefault acionado`);
                      e.preventDefault();
                      scrollToTop();
                    } else {
                      console.log(`[Navbar] Clique em ${link.name}: navegando normalmente`);
                    }
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link
              href="/orcamento"
              className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
            >
              Orçamento Gratuito
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 border-t border-white/10 shadow-xl py-4 px-4 flex flex-col gap-4" style={{ background: 'hsl(222 47% 9% / 0.98)' }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={e => {
                setIsMobileMenuOpen(false);
                if ((link.path === "/" && isHomePage) || (link.path === "/blog" && isBlogPage)) {
                  console.log(`[Navbar Mobile] Clique em ${link.name}: já está na página, preventDefault acionado`);
                  e.preventDefault();
                  scrollToTop();
                } else {
                  console.log(`[Navbar Mobile] Clique em ${link.name}: navegando normalmente`);
                }
              }}
              className={cn(
                "block py-2 text-base font-medium",
                location === link.path ? "text-primary" : "text-white/80"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/orcamento"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full mt-2 px-6 py-3 bg-primary text-white text-center font-semibold rounded-xl shadow-lg flex items-center justify-center"
          >
            Orçamento Gratuito
          </Link>
        </div>
      )}
    </nav>
  );
}
