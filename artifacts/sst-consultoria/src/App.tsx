import React from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";


import Home from "@/pages/Home";
import Checklist from "@/pages/Checklist";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import ServicesPage from "@/pages/ServicesPage";
import ServiceDetails from "@/pages/ServiceDetails";
import NotFound from "@/pages/not-found";
import Orcamento from "@/pages/Orcamento";
import Privacidade from "@/pages/privacidade";
import Termos from "@/pages/termos";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/contato" component={Contact} />
      <Route path="/servicos" component={ServicesPage} />
      <Route path="/servicos/:slug" component={ServiceDetails} />
      <Route path="/orcamento" component={Orcamento} />
      <Route path="/checklist" component={Checklist} />
      <Route path="/privacidade" component={Privacidade} />
      <Route path="/termos" component={Termos} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Hook para detectar mudança de rota
  const [location] = useLocation();
  // Efeito: sempre que a rota mudar, faz scroll para o topo
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}> 
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
