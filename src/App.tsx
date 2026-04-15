import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import AppNav from "@/components/AppNav";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import ScrollToTop from "@/components/ScrollToTop";
import ThemeToggle from "@/components/ThemeToggle";
import Index from "./pages/Index";
import CandidateRegistration from "./pages/CandidateRegistration";
import CandidateDashboard from "./pages/CandidateDashboard";
import CandidateProfile from "./pages/CandidateProfile";
import Vagas from "./pages/Vagas";
import EmpresaVagas from "./pages/EmpresaVagas";
import EmpresaCandidatos from "./pages/EmpresaCandidatos";
import EmpresaRelatorios from "./pages/EmpresaRelatorios";
import EmpresaPerfil from "./pages/EmpresaPerfil";
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
          <Route path="/planos" element={<Pricing />} />
          <Route path="/login" element={<Login />} />

          <Route path="/candidato" element={
            <ProtectedRoute roles={["candidato"]}>
              <DashboardLayout><CandidateDashboard /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/candidato/perfil" element={
            <ProtectedRoute roles={["candidato"]}>
              <DashboardLayout><CandidateProfile /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/candidato/vagas" element={
            <ProtectedRoute roles={["candidato"]}>
              <DashboardLayout><Vagas /></DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/empresa" element={
            <ProtectedRoute roles={["empresa"]}>
              <DashboardLayout><CompanyDashboard /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/empresa/vagas" element={
            <ProtectedRoute roles={["empresa"]}>
              <DashboardLayout><EmpresaVagas /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/empresa/candidatos" element={
            <ProtectedRoute roles={["empresa"]}>
              <DashboardLayout><EmpresaCandidatos /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/empresa/relatorios" element={
            <ProtectedRoute roles={["empresa"]}>
              <DashboardLayout><EmpresaRelatorios /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/empresa/branding" element={
            <ProtectedRoute roles={["empresa"]}>
              <DashboardLayout><Branding /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/empresa/perfil" element={
            <ProtectedRoute roles={["empresa"]}>
              <DashboardLayout><EmpresaPerfil /></DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute roles={["recrutador"]}>
              <DashboardLayout><RecruiterDashboard /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/perfil" element={
            <ProtectedRoute roles={["recrutador"]}>
              <DashboardLayout><RecruiterProfile /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/processos" element={
            <ProtectedRoute roles={["recrutador"]}>
              <DashboardLayout><Processos /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/candidatos" element={
            <ProtectedRoute roles={["recrutador"]}>
              <DashboardLayout><Candidatos /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/branding" element={
            <ProtectedRoute roles={["recrutador"]}>
              <DashboardLayout><Branding /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/requisicoes" element={
            <ProtectedRoute roles={["recrutador"]}>
              <DashboardLayout><Requisicoes /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/relatorios" element={
            <ProtectedRoute roles={["recrutador"]}>
              <DashboardLayout><Relatorios /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/admissao" element={
            <ProtectedRoute roles={["recrutador"]}>
              <DashboardLayout><Admissao /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ThemeToggle />
      </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
