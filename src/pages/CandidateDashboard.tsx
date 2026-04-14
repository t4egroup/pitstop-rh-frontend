import { AlertCircle, Briefcase, Clock, CheckCircle2, XCircle } from "lucide-react";

const processes = [
  { id: 1, title: "Analista de Marketing Digital", company: "Tech Corp", status: "Em análise", date: "10/04/2026" },
  { id: 2, title: "Desenvolvedor Front-end Pleno", company: "Inovatech", status: "Entrevista agendada", date: "08/04/2026" },
  { id: 3, title: "UX Designer Senior", company: "DesignLab", status: "Aprovado", date: "02/04/2026" },
  { id: 4, title: "Product Manager", company: "StartupX", status: "Reprovado", date: "28/03/2026" },
  { id: 5, title: "Analista de Dados Jr.", company: "DataCo", status: "Em análise", date: "12/04/2026" },
];

const statusConfig: Record<string, { icon: typeof Clock; className: string }> = {
  "Em análise": { icon: Clock, className: "text-warning" },
  "Entrevista agendada": { icon: Briefcase, className: "text-primary" },
  "Aprovado": { icon: CheckCircle2, className: "text-success" },
  "Reprovado": { icon: XCircle, className: "text-destructive" },
};

const CandidateDashboard = () => {
  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-2xl font-bold mb-1">Meus Processos Seletivos</h1>
      <p className="text-muted-foreground text-sm mb-6">Acompanhe o status das suas candidaturas.</p>

      {/* Engagement Banner */}
      <div className="mb-6 flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm">
        <AlertCircle size={18} className="mt-0.5 shrink-0 text-primary" />
        <div>
          <p className="font-semibold text-foreground">Atualize seus dados!</p>
          <p className="text-muted-foreground">Faz 6 meses que seu currículo não é revisado. Perfis atualizados têm <strong>3x mais chances</strong> de serem encontrados.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", value: processes.length, color: "text-foreground" },
          { label: "Em análise", value: processes.filter((p) => p.status === "Em análise").length, color: "text-warning" },
          { label: "Aprovado", value: processes.filter((p) => p.status === "Aprovado").length, color: "text-success" },
          { label: "Reprovado", value: processes.filter((p) => p.status === "Reprovado").length, color: "text-destructive" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border bg-card p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Process List */}
      <div className="space-y-3">
        {processes.map((p) => {
          const cfg = statusConfig[p.status] || statusConfig["Em análise"];
          const Icon = cfg.icon;
          return (
            <div key={p.id} className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50">
              <div className={`shrink-0 ${cfg.className}`}>
                <Icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.company}</p>
              </div>
              <div className="hidden sm:block text-right">
                <span className={`text-xs font-medium ${cfg.className}`}>{p.status}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{p.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CandidateDashboard;
