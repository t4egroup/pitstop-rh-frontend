import { useState } from "react";
import { ChevronDown, ChevronUp, Filter, MessageSquare, Share2, Users, Eye } from "lucide-react";
import FeedbackModal from "@/components/FeedbackModal";
import ShareJobModal from "@/components/ShareJobModal";

const jobs = [
  { id: 1, title: "Analista de Marketing Digital", responsible: "Maria Silva", resumes: 42, status: "Aberta", pipeline: ["Triagem (42)", "Entrevista RH (18)", "Entrevista Técnica (7)", "Proposta (2)"] },
  { id: 2, title: "Desenvolvedor Front-end Pleno", responsible: "Carlos Souza", resumes: 67, status: "Aberta", pipeline: ["Triagem (67)", "Teste Técnico (30)", "Entrevista (12)", "Proposta (4)"] },
  { id: 3, title: "UX Designer Senior", responsible: "Ana Costa", resumes: 23, status: "Em Pausa", pipeline: ["Triagem (23)", "Portfólio (10)", "Entrevista (5)", "Proposta (1)"] },
  { id: 4, title: "Product Manager", responsible: "João Lima", resumes: 55, status: "Aberta", pipeline: ["Triagem (55)", "Case (20)", "Painel (8)", "Proposta (3)"] },
  { id: 5, title: "Analista de Dados Jr.", responsible: "Fernanda Reis", resumes: 89, status: "Encerrada", pipeline: ["Triagem (89)", "Teste (45)", "Entrevista (15)", "Contratado (1)"] },
];

const statusColors: Record<string, string> = {
  Aberta: "bg-success/15 text-success",
  "Em Pausa": "bg-warning/15 text-warning",
  Encerrada: "bg-muted text-muted-foreground",
};

const CompanyDashboard = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [filters, setFilters] = useState({ formacao: "", local: "", status: "" });

  const filtered = jobs.filter((j) => {
    if (filters.status && j.status !== filters.status) return false;
    return true;
  });

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-1">Gestão de Vagas</h1>
      <p className="text-muted-foreground text-sm mb-6">Gerencie suas vagas abertas e acompanhe o pipeline de candidatos.</p>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-end gap-3 rounded-lg border bg-card p-4">
        <Filter size={16} className="text-muted-foreground mb-2" />
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Formação</label>
          <select className="rounded-md border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="">Todas</option>
            <option>Graduação</option>
            <option>Pós-Graduação</option>
            <option>Mestrado</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Especialidade</label>
          <select className="rounded-md border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="">Todas</option>
            <option>Tecnologia</option>
            <option>Marketing</option>
            <option>Design</option>
            <option>Gestão</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Localização</label>
          <select className="rounded-md border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="">Todas</option>
            <option>São Paulo</option>
            <option>Rio de Janeiro</option>
            <option>Remoto</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
            className="rounded-md border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">Todos</option>
            <option>Aberta</option>
            <option>Em Pausa</option>
            <option>Encerrada</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card overflow-hidden">
        {/* Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 border-b bg-muted/50 px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          <div className="col-span-4">Vaga</div>
          <div className="col-span-2">Responsável</div>
          <div className="col-span-2 text-center">Currículos</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-right">Ações</div>
        </div>

        {/* Rows */}
        {filtered.map((job) => {
          const expanded = expandedId === job.id;
          return (
            <div key={job.id} className="border-b last:border-b-0">
              <div
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center px-5 py-4 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setExpandedId(expanded ? null : job.id)}
              >
                <div className="md:col-span-4 flex items-center gap-2">
                  {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  <span className="font-medium text-sm">{job.title}</span>
                </div>
                <div className="md:col-span-2 text-sm text-muted-foreground">{job.responsible}</div>
                <div className="md:col-span-2 text-center">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold">
                    <Users size={14} className="text-muted-foreground" /> {job.resumes}
                  </span>
                </div>
                <div className="md:col-span-2 text-center">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[job.status]}`}>
                    {job.status}
                  </span>
                </div>
                <div className="md:col-span-2 flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => setFeedbackOpen(true)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="Feedback">
                    <MessageSquare size={15} />
                  </button>
                  <button onClick={() => setShareOpen(true)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="Divulgar">
                    <Share2 size={15} />
                  </button>
                  <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="Visualizar">
                    <Eye size={15} />
                  </button>
                </div>
              </div>

              {/* Pipeline */}
              {expanded && (
                <div className="border-t bg-muted/20 px-5 py-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Macro Pipeline</p>
                  <div className="flex flex-wrap gap-2">
                    {job.pipeline.map((stage, i) => (
                      <div key={i} className="flex items-center">
                        <div className="rounded-lg border bg-card px-4 py-2 text-sm font-medium">
                          {stage}
                        </div>
                        {i < job.pipeline.length - 1 && (
                          <div className="mx-1 text-muted-foreground">→</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
      <ShareJobModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  );
};

export default CompanyDashboard;
