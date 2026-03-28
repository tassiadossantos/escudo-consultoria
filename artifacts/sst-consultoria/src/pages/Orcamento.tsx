import { useState } from "react";
// TODO: Substituir por client gerado quando disponível
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, ChevronLeft, Building2, HardHat, Clock, Send, Check } from "lucide-react";
import { services } from "@/lib/data";

export default function Orcamento() {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    cnpj: "",
    employees: "",
    sector: "servicos",
    selectedServices: [] as string[],
    urgency: "medium",
    name: "",
    email: "",
    phone: "",
    bestTime: "manha",
  });

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleService = (serviceId: string) => {
    setFormData(prev => {
      const current = prev.selectedServices;
      if (current.includes(serviceId)) {
        return { ...prev, selectedServices: current.filter(id => id !== serviceId) };
      }
      return { ...prev, selectedServices: [...current, serviceId] };
    });
  };

  const nextStep = () => {
    if (step === 1 && (!formData.companyName || !formData.employees)) {
      setError("Preencha o nome da empresa e quantidade de funcionários.");
      return;
    }
    if (step === 2 && formData.selectedServices.length === 0) {
      setError("Selecione pelo menos um serviço.");
      return;
    }
    setError("");
    setStep(s => s + 1);
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setError("Preencha todos os campos de contato.");
      return;
    }
    if (!consent) {
      setError("É necessário aceitar o consentimento LGPD para prosseguir.");
      return;
    }
    setError("");

    // Registrar consentimento LGPD no backend
    try {
      const consentRes = await fetch("/api/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ipHash: "mocked_ip_hash", // TODO: calcular hash real do IP do usuário
          timestamp: new Date().toISOString(),
          policyVersion: "v1.0",
          policyText: "Li e aceito a política de privacidade."
        })
      });
      if (!consentRes.ok) {
        const err = await consentRes.json();
        setError("Erro ao registrar consentimento: " + (err.error || consentRes.status));
        return;
      }
      const consentData = await consentRes.json();
      // Enviar dados do lead/mensagem para backend, incluindo consentId
      const messageRes = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Empresa: ${formData.companyName}\nCNPJ: ${formData.cnpj}\nFuncionários: ${formData.employees}\nSetor: ${formData.sector}\nServiços: ${formData.selectedServices.join(", ")}\nUrgência: ${formData.urgency}\nMelhor horário: ${formData.bestTime}`,
          consentId: consentData.id
        })
      });
      if (!messageRes.ok) {
        const err = await messageRes.json();
        setError("Erro ao registrar lead: " + (err.error || messageRes.status));
        return;
      }
      setIsSuccess(true);
    } catch (err) {
      setError("Erro inesperado ao registrar consentimento.");
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-gray-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full hero-pattern opacity-50 pointer-events-none"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 md:p-14 rounded-[2rem] shadow-2xl max-w-xl w-full text-center border border-border relative z-10 mx-4"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <CheckCircle2 size={48} className="text-green-600" />
            </motion.div>
            <div className="absolute inset-0 border-4 border-green-500 rounded-full animate-ping opacity-20"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-secondary mb-4">Solicitação Recebida!</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Seu orçamento está sendo preparado pelos nossos especialistas e será enviado para o email <strong className="text-secondary">{formData.email}</strong> em até 2 horas.
          </p>
          <div className="space-y-4">
            <a 
              href="https://wa.me/5571999999999" 
              target="_blank" rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-xl font-bold hover:bg-[#20b858] transition-colors shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:-translate-y-1 text-lg"
            >
              Falar no WhatsApp Agora
            </a>
            <a href="/" className="w-full block text-secondary font-bold hover:underline py-4">
              Voltar para página inicial
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-black text-secondary mb-4">Orçamento <span className="text-primary">Inteligente</span></h1>
          <p className="text-muted-foreground text-xl">Responda algumas perguntas rápidas para receber uma proposta exata para sua necessidade.</p>
        </div>

        {/* Visual Progress Bar */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="flex justify-between relative mb-2">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
            <div className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-500 ease-out" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
            
            {[1, 2, 3, 4].map(num => (
              <div key={num} className={`relative z-10 flex flex-col items-center gap-2`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                  step > num ? 'bg-primary text-white' : 
                  step === num ? 'bg-primary text-white ring-4 ring-primary/20' : 
                  'bg-gray-200 text-gray-500'
                }`}>
                  {step > num ? <Check size={16} /> : num}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mt-2 px-1">
            <span>Empresa</span>
            <span>Serviços</span>
            <span>Urgência</span>
            <span>Contato</span>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl border border-border p-6 md:p-12 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-[100px] pointer-events-none"></div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 font-semibold border border-red-200 flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-primary/10 p-3 rounded-2xl">
                    <Building2 className="text-primary" size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-secondary">Sobre sua empresa</h2>
                    <p className="text-muted-foreground font-medium">Informações básicas para calcularmos o escopo.</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-secondary mb-3 uppercase tracking-wide">Razão Social / Nome Fantasia *</label>
                    <input 
                      type="text" 
                      value={formData.companyName}
                      onChange={e => updateForm('companyName', e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-border bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all text-lg"
                      placeholder="Sua Empresa Ltda"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-secondary mb-3 uppercase tracking-wide">CNPJ (Opcional)</label>
                    <input 
                      type="text" 
                      value={formData.cnpj}
                      onChange={e => updateForm('cnpj', e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-border bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all text-lg"
                      placeholder="00.000.000/0001-00"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-secondary mb-3 uppercase tracking-wide">Nº de Funcionários *</label>
                      <input 
                        type="number" 
                        min="1"
                        value={formData.employees}
                        onChange={e => updateForm('employees', e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl border-2 border-border bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all text-lg"
                        placeholder="Ex: 15"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-secondary mb-3 uppercase tracking-wide">Setor</label>
                      <div className="relative">
                        <select 
                          value={formData.sector}
                          onChange={e => updateForm('sector', e.target.value)}
                          className="w-full px-5 py-4 rounded-2xl border-2 border-border bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all text-lg appearance-none"
                        >
                          <option value="servicos">Serviços</option>
                          <option value="comercio">Comércio</option>
                          <option value="industria">Indústria</option>
                          <option value="construcao">Construção Civil</option>
                        </select>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 flex justify-end">
                  <button onClick={nextStep} className="bg-secondary text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-secondary/90 transition-all hover:pr-8 group shadow-lg">
                    Próximo Passo <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-primary/10 p-3 rounded-2xl">
                    <HardHat className="text-primary" size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-secondary">Do que você precisa?</h2>
                    <p className="text-muted-foreground font-medium">Selecione um ou mais serviços.</p>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {services.map(s => (
                    <label 
                      key={s.id} 
                      className={`flex items-start gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${
                        formData.selectedServices.includes(s.id) 
                        ? 'border-primary bg-primary/5 shadow-md scale-[1.02]' 
                        : 'border-border hover:border-primary/40 bg-gray-50 hover:bg-white'
                      }`}
                    >
                      <div className="pt-1">
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                          formData.selectedServices.includes(s.id) ? 'bg-primary border-primary text-white' : 'border-gray-300 bg-white'
                        }`}>
                          {formData.selectedServices.includes(s.id) && <Check size={16} />}
                        </div>
                      </div>
                      <div>
                        <span className="font-bold text-secondary text-lg block mb-1">{s.title}</span>
                        <span className="text-sm text-muted-foreground leading-snug line-clamp-2">{s.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-10 pt-6 border-t border-border">
                  <button onClick={() => setStep(1)} className="px-6 py-4 rounded-xl font-bold flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-secondary transition-colors">
                    <ChevronLeft size={20} /> Voltar
                  </button>
                  <button onClick={nextStep} className="bg-secondary text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-secondary/90 transition-all hover:pr-8 group shadow-lg">
                    Próximo Passo <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-primary/10 p-3 rounded-2xl">
                    <Clock className="text-primary" size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-secondary">Qual sua urgência?</h2>
                    <p className="text-muted-foreground font-medium">Nos ajuda a priorizar seu atendimento.</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { id: 'urgent', title: 'Urgente (Até 7 dias)', desc: 'Preciso resolver para ontem. Risco de multa ou obra parada.', color: 'border-red-500', bg: 'bg-red-50' },
                    { id: 'medium', title: 'Médio Prazo (Até 30 dias)', desc: 'Estou me planejando para regularizar este mês.', color: 'border-primary', bg: 'bg-primary/5' },
                    { id: 'low', title: 'Sem Urgência (Mais de 30 dias)', desc: 'Apenas cotando para planejamento futuro.', color: 'border-gray-400', bg: 'bg-gray-50' }
                  ].map(urg => (
                    <label 
                      key={urg.id}
                      className={`flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                        formData.urgency === urg.id 
                        ? `${urg.color} ${urg.bg} shadow-md scale-[1.01]` 
                        : 'border-border bg-gray-50 hover:bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-5 transition-colors ${
                        formData.urgency === urg.id ? `${urg.color.replace('border', 'bg')} border-transparent text-white` : 'border-gray-300 bg-white'
                      }`}>
                        {formData.urgency === urg.id && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                      </div>
                      <div>
                        <span className="font-bold text-secondary text-xl block mb-1">{urg.title}</span>
                        <span className="text-muted-foreground font-medium">{urg.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-10 pt-6 border-t border-border">
                  <button onClick={() => setStep(2)} className="px-6 py-4 rounded-xl font-bold flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-secondary transition-colors">
                    <ChevronLeft size={20} /> Voltar
                  </button>
                  <button onClick={nextStep} className="bg-secondary text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-secondary/90 transition-all hover:pr-8 group shadow-lg">
                    Próximo Passo <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-primary/10 p-3 rounded-2xl">
                    <Send className="text-primary" size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-secondary">Último passo!</h2>
                    <p className="text-muted-foreground font-medium">Para onde enviamos a proposta?</p>
                  </div>
                </div>
                <form onSubmit={submitForm} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-secondary mb-3 uppercase tracking-wide">Seu Nome Completo *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => updateForm('name', e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-border bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all text-lg"
                      placeholder="Ex: João da Silva"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-secondary mb-3 uppercase tracking-wide">Email Corporativo *</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => updateForm('email', e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl border-2 border-border bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all text-lg"
                        placeholder="joao@empresa.com.br"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-secondary mb-3 uppercase tracking-wide">WhatsApp *</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={e => updateForm('phone', e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl border-2 border-border bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all text-lg"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-secondary mb-3 uppercase tracking-wide">Melhor horário para contato</label>
                    <div className="relative">
                      <select 
                        value={formData.bestTime}
                        onChange={e => updateForm('bestTime', e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl border-2 border-border bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all text-lg appearance-none"
                      >
                        <option value="manha">Manhã (08h às 12h)</option>
                        <option value="tarde">Tarde (14h às 18h)</option>
                        <option value="qualquer">Qualquer horário</option>
                      </select>
                      <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" />
                    </div>
                  </div>
                  {/* Consentimento LGPD */}
                  <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <input
                      id="consent-lgpd"
                      type="checkbox"
                      checked={consent}
                      onChange={e => setConsent(e.target.checked)}
                      className="mt-1 accent-primary w-5 h-5"
                      required
                    />
                    <label htmlFor="consent-lgpd" className="text-sm text-gray-700 select-none">
                      Li e concordo com a <a href="/privacidade" target="_blank" rel="noopener noreferrer" className="underline text-primary font-semibold">Política de Privacidade e Consentimento LGPD</a>.<br/>
                      Autorizo o uso dos dados para contato e envio de proposta, conforme descrito.
                    </label>
                  </div>
                  <div className="flex justify-between items-center mt-10 pt-6 border-t border-border">
                    <button type="button" onClick={() => setStep(3)} className="px-6 py-4 rounded-xl font-bold flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-secondary transition-colors">
                      <ChevronLeft size={20} /> Voltar
                    </button>
                    <button type="submit" className="bg-primary text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(22,163,74,0.4)] text-lg hover:-translate-y-1">
                      Finalizar Solicitação
                      <Send size={20} />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
