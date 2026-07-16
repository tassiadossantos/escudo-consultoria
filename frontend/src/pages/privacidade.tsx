import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Privacidade() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold mb-8 text-foreground">Política de Privacidade</h1>
          <div className="prose prose-lg text-muted-foreground">
            <p>
              A Escudo Consultoria valoriza a sua privacidade e está comprometida com a proteção dos seus dados pessoais. Esta política descreve de forma clara e transparente como coletamos, utilizamos, armazenamos e protegemos suas informações.
            </p>
            <h2>1. Coleta e Uso de Dados</h2>
            <ul>
              <li>Coletamos apenas os dados estritamente necessários para viabilizar o contato, responder solicitações e prestar nossos serviços.</li>
              <li>As informações fornecidas por meio do formulário de contato são utilizadas exclusivamente para retorno e atendimento, não sendo compartilhadas com terceiros sem seu consentimento explícito.</li>
            </ul>
            <h2>2. Consentimento e Direitos do Titular</h2>
            <ul>
              <li>O envio de dados pelo site pressupõe o seu consentimento livre, informado e inequívoco, conforme exigido pela LGPD.</li>
              <li>Você pode, a qualquer momento, solicitar acesso, correção, atualização ou exclusão dos seus dados pessoais, bastando enviar um e-mail para <a href="mailto:contato@escudo.com.br">contato@escudo.com.br</a>.</li>
            </ul>
            <h2>3. Segurança da Informação</h2>
            <p>
              Adotamos medidas técnicas, administrativas e organizacionais robustas para garantir a confidencialidade, integridade e disponibilidade dos seus dados, prevenindo acessos não autorizados, vazamentos ou incidentes.
            </p>
            <h2>4. Retenção e Exclusão</h2>
            <p>
              Os dados são armazenados pelo tempo necessário para cumprir as finalidades informadas ou conforme exigido por obrigações legais e regulatórias. Após esse período, serão eliminados de forma segura.
            </p>
            <h2>5. Atualizações desta Política</h2>
            <p>
              Esta Política de Privacidade pode ser revisada periodicamente para refletir melhorias, mudanças legais ou tecnológicas. A versão mais recente estará sempre disponível nesta página.
            </p>
            <h2>6. Fale Conosco</h2>
            <p>
              Para dúvidas sobre privacidade, proteção de dados ou para exercer seus direitos, entre em contato: <a href="mailto:contato@escudo.com.br">contato@escudo.com.br</a>.
            </p>
          </div>
      </main>
      <Footer />
    </div>
  );
}
