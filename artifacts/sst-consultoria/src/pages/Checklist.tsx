
import React, { useState } from "react";
import { Link } from "wouter";
import { CheckSquare, RefreshCcw, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Checklist() {
  const questions = [
    "Sua empresa possui o PGR (Programa de Gerenciamento de Riscos) atualizado e assinado por engenheiro habilitado?",
    "Para atividades de risco, é feita a APR (Análise Preliminar de Risco) antes do início dos trabalhos?",
    "Funcionários que trabalham em altura possuem certificado NR 35 válido?",
    "Funcionários que atuam em espaços confinados possuem treinamento NR 33 válido?",
    "Todos os trabalhadores receberam e assinaram a Ordem de Serviço de Segurança (OSS) referente à sua função?",
    "Sua empresa realiza DDS (Diálogo Diário de Segurança) regularmente com registro de presença?",
    "A CIPA está constituída e os membros receberam treinamento conforme NR 5, se aplicável?",
    "As máquinas e equipamentos estão adequados à NR 12, com inventário e laudos atualizados?",
    "Em caso de acidente, a CAT é emitida corretamente e no prazo legal?",
    "Novos colaboradores passam por treinamento de integração em SST ao serem admitidos?",
    "Quando há dúvidas técnicas ou exigências fiscais, é solicitado parecer técnico de SST?",
    "Sua empresa conta com acompanhamento mensal de consultoria para manter a conformidade contínua?"
  ];

  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const score = Object.values(answers).filter(v => v).length;
  const percentage = (score / questions.length) * 100;
  const percentageDisplay = Math.round(percentage);
  
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  const handleFinish = () => {
    if (answeredCount < questions.length) {
      alert("Por favor, responda todas as perguntas para ver o resultado exato.");
      return;
    }
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-secondary/10">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl pt-28 pb-16">
        <h1 className="text-4xl md:text-5xl font-display font-black text-secondary mb-4 text-center">Diagnóstico de Conformidade em <span className="text-primary">SST</span></h1>
        {!showResult && (
          <div className="text-center text-muted-foreground text-lg mb-6 font-medium">
            Responda o checklist abaixo para avaliar o nível de conformidade da sua empresa com as normas de Segurança e Saúde do Trabalho.
          </div>
        )}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <div className="w-full bg-muted rounded-full h-4 premium-shadow">
              <div
                className="bg-primary h-4 rounded-full transition-all duration-300 premium-shadow"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <span className="text-secondary text-base font-semibold min-w-max">{answeredCount} de {questions.length} respondidas</span>
        </div>
        {!showResult ? (
          <form
            onSubmit={e => {
              e.preventDefault();
              handleFinish();
            }}
            className="space-y-8"
          >
            {questions.map((q, idx) => (
              <Card
                key={idx}
                className={cn(
                  "premium-card-hover border-border bg-card/90 shadow-lg flex flex-col gap-3",
                  answers[idx] === true ? "ring-2 ring-primary/60" : answers[idx] === false ? "ring-2 ring-destructive/60" : ""
                )}
              >
                <CardHeader className="pb-2">
                  <span className="font-bold flex items-center gap-2 text-lg text-secondary">
                    <ShieldCheck className="text-primary w-5 h-5" />
                    {q}
                  </span>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-4 mt-2">
                    <Button
                      type="button"
                      variant={answers[idx] === true ? "default" : "outline"}
                      className={cn(
                        "font-bold text-base px-8 py-2 rounded-lg transition-all duration-150",
                        answers[idx] === true ? "shadow-lg" : ""
                      )}
                      onClick={() => setAnswers(a => ({ ...a, [idx]: true }))}
                    >
                      Sim
                    </Button>
                    <Button
                      type="button"
                      variant={answers[idx] === false ? "destructive" : "outline"}
                      className={cn(
                        "font-bold text-base px-8 py-2 rounded-lg transition-all duration-150",
                        answers[idx] === false ? "shadow-lg" : ""
                      )}
                      onClick={() => setAnswers(a => ({ ...a, [idx]: false }))}
                    >
                      Não
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="flex justify-end items-center mt-10">
              <Button
                type="submit"
                size="lg"
                className="flex items-center gap-2 font-bold text-lg shadow-lg px-10"
                disabled={answeredCount < questions.length}
              >
                <CheckSquare className="w-5 h-5" /> Finalizar Checklist
              </Button>
            </div>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-10 flex flex-col items-center gap-6 shadow-lg border border-border mt-10 bg-card premium-shadow"
          >
            <h2 className="text-2xl font-bold flex items-center gap-2 text-secondary">
              <ShieldCheck className="w-7 h-7 text-primary" /> Resultado do Checklist
            </h2>
            <div className="text-6xl font-extrabold text-primary">{percentageDisplay}%</div>
            <div className="text-muted-foreground text-center text-lg">
              {percentageDisplay === 100 && (
                <span>🎉 Parabéns! Sua empresa está em total conformidade com as melhores práticas de SST.</span>
              )}
              {percentageDisplay >= 80 && percentageDisplay < 100 && (
                <span>👏 Ótimo! Poucos ajustes para atingir a excelência em SST.</span>
              )}
              {percentageDisplay >= 60 && percentageDisplay < 80 && (
                <span>⚠️ Bom, mas há pontos importantes a melhorar para evitar riscos e multas.</span>
              )}
              {percentageDisplay < 60 && (
                <span className="text-yellow-500 font-bold">🚨 Atenção! Sua empresa está exposta a riscos e possíveis autuações. Reforce a gestão de SST.</span>
              )}
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2 px-8 py-2 rounded-lg mt-2 font-semibold"
              onClick={() => {
                setAnswers({});
                setShowResult(false);
              }}
            >
              <RefreshCcw className="w-4 h-4" /> Refazer Checklist
            </Button>
            <Link href="/orcamento" className="mt-2 w-full">
              <Button className="w-full flex items-center gap-2 font-bold text-base py-3">
                <CheckSquare className="w-4 h-4" /> Solicitar Consultoria
              </Button>
            </Link>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}