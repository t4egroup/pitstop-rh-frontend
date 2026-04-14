import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import AppNav from "@/components/AppNav";
import ScrollToTop from "@/components/ScrollToTop";
import ThemeToggle from "@/components/ThemeToggle";
import Index from "./pages/Index";
import CandidateRegistration from "./pages/CandidateRegistration";
import CandidateDashboard from "./pages/CandidateDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import RecruiterProfile from "./pages/RecruiterProfile";
import Processos from "./pages/Processos";
import Candidatos from "./pages/Candidatos";
import Branding from "./pages/Branding";
import Requisicoes from "./pages/Requisicoes";
import Relatorios from "./pages/Relatorios";
import Admissao from "./pages/Admissao";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <AppNav />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cadastro" element={<CandidateRegistration />} />
          <Route path="/candidato" element={<CandidateDashboard />} />
          <Route path="/empresa" element={<CompanyDashboard />} />
          <Route path="/planos" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<RecruiterDashboard />} />
          <Route path="/perfil" element={<RecruiterProfile />} />
          <Route path="/processos" element={<Processos />} />
          <Route path="/candidatos" element={<Candidatos />} />
          <Route path="/branding" element={<Branding />} />
          <Route path="/requisicoes" element={<Requisicoes />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/admissao" element={<Admissao />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ThemeToggle />
      </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
