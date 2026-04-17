import {
  AlertCircle, Briefcase, Clock, CheckCircle2,
  XCircle, CalendarClock, ChevronRight,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const processes = [
  { id: 1, title: "Analista de Marketing Digital",  company: "Tech Corp",  status: "Em análise",          date: "10/04/2026", next: null },
  { id: 2, title: "Desenvolvedor Front-end Pleno",  company: "Inovatech",  status: "Entrevista agendada",  date: "08/04/2026", next: "Entrevista 15/04 às 14h" },
  { id: 3, title: "UX Designer Senior",             company: "DesignLab",  status: "Aprovado",             date: "02/04/2026", next: "Aguarde contato de RH" },
  { id: 4, title: "Product Manager",                company: "StartupX",   status: "Reprovado",            date: "28/03/2026", next: null },
  { id: 5, title: "Analista de Dados Jr.",          company: "DataCo",     status: "Em análise",           date: "12/04/2026", next: null },
];

type StatusKey = "Em análise" | "Entrevista agendada" | "Aprovado" | "Reprovado";

const statusConfig: Record<StatusKey, { icon: React.ElementType; className: string; badge: string }> = {
  "Em análise":         { icon: Clock,         className: "text-amber-500",   badge: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800" },
  "Entrevista agendada":{ icon: CalendarClock,  className: "text-primary",     badge: "bg-primary/5 text-primary border-primary/20" },
  "Aprovado":           { icon: CheckCircle2,   className: "text-emerald-500", badge: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800" },
  "Reprovado":          { icon: XCircle,        className: "text-destructive", badge: "bg-destructive/5 text-destructive border-destructive/20" },
};

const CandidateDashboard = () => {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] ?? "Candidato";

  const stats = [
    { label: "Total",               value: processes.length,                                         color: "text-foreground"   },
    { label: "Em análise",          value: processes.filter(p => p.status === "Em análise").length,          color: "text-amber-500"    },
    { label: "Entrevista agendada", value: processes.filter(p => p.status === "Entrevista agendada").length, color: "text-primary"      },
    { label: "Aprovado",            value: processes.filter(p => p.status === "Aprovado").length,            color: "text-emerald-500"  },
  ];

  return (
    <div className="container max-w-3xl py-8 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold">Olá, {firstName} 👋</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Acompanhe suas candidaturas e próximas etapas.
        </p>
      </div>

      {/* Profile alert */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800/50 p-4 text-sm">
        <AlertCircle size={17} className="mt-0.5 shrink-0 text-amber-500" />
        <div>
          <p className="font-semibold text-foreground">Atualize seu currículo</p>
          <p className="text-muted-foreground mt-0.5">
            Faz 6 meses que seu perfil não é revisado.{" "}
            <span className="font-medium text-foreground">Perfis atualizados têm 3× mais chances</span> de serem encontrados.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl border bg-white p-4 text-center">
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-tight">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Process list */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Minhas candidaturas</h2>
          <span className="text-xs text-muted-foreground">{processes.length} no total</span>
        </div>

        <div className="space-y-2">
          {processes.map(p => {
            const cfg = statusConfig[p.status as StatusKey];
            const Icon = cfg.icon;
            return (
              <div
                key={p.id}
                className="flex items-center gap-4 rounded-xl border bg-white px-4 py-3.5 transition-colors hover:bg-muted/40"
              >
                <div className={`shrink-0 ${cfg.className}`}>
                  <Icon size={20} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{p.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-muted-foreground">{p.company}</p>
                    {p.next && (
                      <>
                        <span className="text-muted-foreground/40 text-xs">·</span>
                        <p className="text-xs text-primary font-medium truncate">{p.next}</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`hidden sm:inline text-[11px] font-semibold px-2 py-0.5 rounded-full border ${cfg.badge}`}>
                    {p.status}
                  </span>
                  <span className="hidden sm:block text-xs text-muted-foreground">{p.date}</span>
                  <ChevronRight size={14} className="text-muted-foreground/40" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty state hint */}
      <div className="rounded-xl border border-dashed p-6 text-center">
        <Briefcase size={28} className="mx-auto text-muted-foreground/40 mb-2" />
        <p className="text-sm font-medium text-muted-foreground">Quer se candidatar a mais vagas?</p>
        <p className="text-xs text-muted-foreground/70 mt-1">Em breve você poderá explorar vagas abertas diretamente aqui.</p>
      </div>

    </div>
  );
};

export default CandidateDashboard;
