import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="text-center bg-card p-12 rounded-2xl border border-border shadow-xl max-w-md w-full mx-4">
        <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
        <p className="text-lg text-muted-foreground mb-8">
          A página que você está procurando não foi encontrada.
        </p>
        <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors w-full">
          Voltar para o Início
        </Link>
      </div>
    </div>
  );
}
