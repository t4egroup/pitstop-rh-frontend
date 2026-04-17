import { useState } from "react";
import { ChevronDown, ChevronUp, MessageSquare, Share2, Eye, Plus, Users } from "lucide-react";
import FeedbackModal from "@/components/FeedbackModal";
import ShareJobModal from "@/components/ShareJobModal";

const jobs = [
  { id: 1, title: "Analista de Marketing Digital", responsible: "Maria Silva",  resumes: 42, status: "Aberta",    pipeline: ["Triagem (42)", "Entrevista RH (18)", "Entrevista Técnica (7)", "Proposta (2)"] },
  { id: 2, title: "Desenvolvedor Front-end Pleno", responsible: "Carlos Souza", resumes: 67, status: "Aberta",    pipeline: ["Triagem (67)", "Teste Técnico (30)", "Entrevista (12)", "Proposta (4)"]    },
  { id: 3, title: "UX Designer Senior",            responsible: "Ana Costa",    resumes: 23, status: "Em Pausa",  pipeline: ["Triagem (23)", "Portfólio (10)", "Entrevista (5)", "Proposta (1)"]         },
  { id: 4, title: "Product Manager",               responsible: "João Lima",    resumes: 55, status: "Aberta",    pipeline: ["Triagem (55)", "Case (20)", "Painel (8)", "Proposta (3)"]                  },
  { id: 5, title: "Analista de Dados Jr.",         responsible: "Fernanda Reis",resumes: 89, status: "Encerrada", pipeline: ["Triagem (89)", "Teste (45)", "Entrevista (15)", "Contratado (1)"]         },
];

const statusStyle: Record<string, string> = {
  Aberta:     "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
  "Em Pausa": "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
  Encerrada:  "bg-muted text-muted-foreground",
};

const EmpresaVagas = () => {
  const [expandedId,   setExpandedId]   = useState<number | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [shareOpen,    setShareOpen]    = useState(false);
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = jobs.filter(j => !statusFilter || j.status === statusFilter);

  return (
    <div className="container max-w-5xl py-8 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">Gestão de Vagas</h1>
          <p className="text-sm text-muted-foreground mt-1">Gerencie suas vagas e acompanhe o pipeline.</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity">
          <Plus size={15} /> Nova Vaga
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {["", "Aberta", "Em Pausa", "Encerrada"].map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              statusFilter === s ? "bg-primary text-white border-primary" : "hover:bg-muted"
            }`}
          >
            {s || "Todas"}
          </button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground self-center">{filtered.length} vagas</span>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-white overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 border-b bg-muted/40 px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          <div className="col-span-4">Vaga</div>
          <div className="col-span-2">Responsável</div>
          <div className="col-span-2 text-center">Candidatos</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-right">Ações</div>
        </div>

        {filtered.map(job => {
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
                <div className="md:col-span-2 hidden md:flex justify-center items-center gap-1.5">
                  <Users size={13} className="text-muted-foreground" />
                  <span className="font-bold text-sm">{job.resumes}</span>
                </div>
                <div className="md:col-span-2 hidden md:flex justify-center">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusStyle[job.status]}`}>
                    {job.status}
                  </span>
                </div>
                <div className="md:col-span-2 hidden md:flex justify-end gap-1" onClick={e => e.stopPropagation()}>
                  <button onClick={() => setFeedbackOpen(true)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted transition-colors" title="Feedback">
                    <MessageSquare size={15} />
                  </button>
                  <button onClick={() => setShareOpen(true)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted transition-colors" title="Divulgar">
                    <Share2 size={15} />
                  </button>
                  <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted transition-colors" title="Visualizar">
                    <Eye size={15} />
                  </button>
                </div>
              </div>

              {expanded && (
                <div className="border-t bg-muted/20 px-5 py-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Pipeline</p>
                  <div className="flex flex-wrap gap-2">
                    {job.pipeline.map((stage, i) => (
                      <div key={i} className="flex items-center">
                        <div className="rounded-lg border bg-white px-4 py-2 text-sm font-medium">{stage}</div>
                        {i < job.pipeline.length - 1 && <span className="mx-1 text-muted-foreground">→</span>}
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
      <ShareJobModal open={shareOpen}    onClose={() => setShareOpen(false)}    />
    </div>
  );
};

export default EmpresaVagas;
