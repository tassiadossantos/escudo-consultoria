import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Termos() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold mb-8 text-foreground">Política de Privacidade</h1>
          <div className="prose prose-lg text-muted-foreground">
            <p>
              A Escudo Consultoria preza pela privacidade e pela proteção dos dados pessoais de seus clientes, parceiros e usuários. Esta Política de Privacidade tem como objetivo apresentar, de forma clara e objetiva, as diretrizes adotadas para coleta, uso, armazenamento, tratamento e proteção das informações pessoais, em conformidade com a legislação vigente.
            </p>
            <h2>1. Coleta e Utilização de Dados Pessoais</h2>
            <ul>
              <li>Coletamos exclusivamente os dados pessoais necessários para viabilizar o atendimento, responder solicitações e executar nossos serviços de maneira eficiente e segura.</li>
              <li>As informações fornecidas por meio de formulários eletrônicos ou outros canais de contato são utilizadas unicamente para fins institucionais, sendo vedado o compartilhamento com terceiros sem o consentimento expresso do titular, salvo por obrigação legal.</li>
            </ul>
            <h2>2. Consentimento e Direitos do Titular</h2>
            <ul>
              <li>O fornecimento de dados pessoais pressupõe o consentimento livre, informado e inequívoco do titular, conforme determina a Lei Geral de Proteção de Dados (LGPD).</li>
              <li>O titular poderá, a qualquer tempo, exercer seus direitos de acesso, retificação, atualização ou exclusão de seus dados pessoais, mediante solicitação encaminhada para <a href="mailto:contato@escudo.com.br">contato@escudo.com.br</a>.</li>
            </ul>
            <h2>3. Segurança da Informação</h2>
            <p>
              Empregamos medidas técnicas, administrativas e organizacionais rigorosas para assegurar a confidencialidade, integridade e disponibilidade das informações pessoais, prevenindo acessos não autorizados, incidentes de segurança, vazamentos ou qualquer forma de uso indevido.
            </p>
            <h2>4. Retenção e Eliminação de Dados</h2>
            <p>
              Os dados pessoais são armazenados apenas pelo período necessário ao cumprimento das finalidades informadas nesta política ou conforme exigido por obrigações legais e regulatórias. Findo esse prazo, os dados serão eliminados de maneira segura e definitiva.
            </p>
            <h2>5. Atualizações desta Política</h2>
            <p>
              Esta Política de Privacidade poderá ser revisada e atualizada periodicamente para refletir aprimoramentos, alterações normativas ou tecnológicas. A versão vigente estará sempre disponível nesta página para consulta.
            </p>
            <h2>6. Canal de Comunicação</h2>
            <p>
              Em caso de dúvidas, solicitações relacionadas à privacidade ou para o exercício de direitos previstos na LGPD, entre em contato pelo e-mail: <a href="mailto:contato@escudo.com.br">contato@escudo.com.br</a>.
            </p>
          </div>
      </main>
      <Footer />
    </div>
  );
}
