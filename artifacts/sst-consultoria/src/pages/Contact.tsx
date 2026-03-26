import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [assunto, setAssunto] = useState("");

  // Seleciona o assunto automaticamente se vier na query string
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const assuntoParam = params.get("assunto");
    if (assuntoParam) {
      setAssunto(assuntoParam);
      // Scroll suave até o formulário
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Nossa equipe entrará em contato em breve.",
      });
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <header className="bg-secondary pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
            Fale com a Equipe
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Fale Conosco</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Tem dúvidas sobre qual documentação sua empresa precisa? Nossa equipe de especialistas está pronta para ajudar.
          </p>
        </div>
      </header>

      <main className="py-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Entre em Contato</h2>
              <p className="text-lg text-muted-foreground mb-12">
                Tem dúvidas sobre qual documentação sua empresa precisa? Entre em contato conosco. Nossa equipe de especialistas está pronta para ajudar.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">WhatsApp</h3>
                    <p className="text-muted-foreground">(71) 99617-1605</p>
                    <p className="text-sm text-muted-foreground mt-1">Seg-Sex das 8h às 18h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">E-mail</h3>
                    <p className="text-muted-foreground">contato@escudo.com.br</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">Endereço</h3>
                    <p className="text-muted-foreground">
                      Rua Blumenau, S/N FICAN<br />
                      Camaçari - BA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 md:p-10 rounded-3xl border border-border shadow-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-6">Envie uma mensagem</h3>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" id="form-contato">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nome Completo</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Seu nome" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">E-mail</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="seu@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Telefone</label>
                    <input required type="tel" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="(00) 00000-0000" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Assunto</label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none"
                    value={assunto}
                    onChange={e => setAssunto(e.target.value)}
                  >
                    <option value="">Selecione um assunto...</option>
                    <option value="duvida">Dúvida sobre Serviço</option>
                    <option value="parceria">Parcerias</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Mensagem</label>
                  <textarea required rows={4} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none" placeholder="Como podemos ajudar?"></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:transform-none"
                >
                  {isSubmitting ? "Enviando..." : (
                    <>Enviar Mensagem <Send className="w-5 h-5" /></>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
