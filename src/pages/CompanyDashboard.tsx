import {
  Briefcase, Users, CalendarCheck, TrendingUp,
  Clock, CheckCircle2, PauseCircle, ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const kpis = [
  { label: "Vagas Abertas",      value: "5",    delta: "+1 este mês",        icon: Briefcase,     color: "text-primary",      bg: "bg-primary/10"      },
  { label: "Candidatos Ativos",  value: "276",  delta: "+48 esta semana",    icon: Users,         color: "text-blue-500",     bg: "bg-blue-500/10"     },
  { label: "Entrevistas Hoje",   value: "4",    delta: "2 RH · 2 Técnica",  icon: CalendarCheck, color: "text-emerald-500",  bg: "bg-emerald-500/10"  },
  { label: "Taxa de Conversão",  value: "3,1%", delta: "+0,3% vs mês ant.", icon: TrendingUp,    color: "text-amber-500",    bg: "bg-amber-500/10"    },
];

const recentJobs = [
  { title: "Analista de Marketing Digital", candidatos: 42, status: "Aberta"   },
  { title: "Desenvolvedor Front-end Pleno", candidatos: 67, status: "Aberta"   },
  { title: "UX Designer Senior",            candidatos: 23, status: "Em Pausa" },
  { title: "Product Manager",               candidatos: 55, status: "Aberta"   },
  { title: "Analista de Dados Jr.",         candidatos: 89, status: "Encerrada"},
];

const activity = [
  { text: "Lucas Ferreira avançou para Entrevista Técnica",   time: "Há 20 min",  dot: "bg-primary"      },
  { text: "Nova candidatura para Dev Front-end Pleno",         time: "Há 45 min",  dot: "bg-blue-500"     },
  { text: "Beatriz Santos agendou entrevista de RH",           time: "Há 1 hora",  dot: "bg-emerald-500"  },
  { text: "Vaga UX Designer colocada em pausa",                time: "Há 3 horas", dot: "bg-amber-500"    },
  { text: "Rafael Oliveira aprovado na etapa final",           time: "Há 5 horas", dot: "bg-emerald-500"  },
];

const statusIcon: Record<string, { icon: typeof Clock; cls: string }> = {
  Aberta:     { icon: CheckCircle2, cls: "text-emerald-500" },
  "Em Pausa": { icon: PauseCircle,  cls: "text-amber-500"   },
  Encerrada:  { icon: Clock,        cls: "text-muted-foreground" },
};

const CompanyDashboard = () => {
  const { user } = useAuth();
  const company = user?.name ?? "Empresa";

  return (
    <div className="container max-w-6xl py-8 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold">Olá, {company} 👋</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Visão geral dos seus processos seletivos.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(k => (
          <div key={k.label} className="rounded-xl border bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-muted-foreground">{k.label}</p>
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${k.bg}`}>
                <k.icon size={16} className={k.color} />
              </div>
            </div>
            <p className={`text-3xl font-extrabold ${k.color}`}>{k.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{k.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Vagas recentes */}
        <div className="lg:col-span-2 rounded-xl border bg-white">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h2 className="text-sm font-semibold">Suas Vagas</h2>
            <Link to="/empresa/vagas" className="flex items-center gap-1 text-xs text-primary hover:underline font-medium">
              Ver todas <ChevronRight size={13} />
            </Link>
          </div>
          <div className="divide-y">
            {recentJobs.map((job, i) => {
              const cfg = statusIcon[job.status];
              const Icon = cfg.icon;
              return (
                <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/30 transition-colors">
                  <Icon size={16} className={cfg.cls} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{job.title}</p>
                    <p className="text-xs text-muted-foreground">{job.candidatos} candidatos</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    job.status === "Aberta"     ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" :
                    job.status === "Em Pausa"   ? "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"         :
                                                  "bg-muted text-muted-foreground"
                  }`}>{job.status}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Atividade recente */}
        <div className="rounded-xl border bg-white">
          <div className="px-5 py-4 border-b">
            <h2 className="text-sm font-semibold">Atividade Recente</h2>
          </div>
          <div className="px-5 py-4 space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className="relative flex flex-col items-center">
                  <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${a.dot}`} />
                  {i < activity.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                </div>
                <div className="pb-3">
                  <p className="text-xs leading-relaxed">{a.text}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Gerenciar Vagas",  to: "/empresa/vagas",      icon: Briefcase,    color: "text-primary"      },
          { label: "Ver Candidatos",   to: "/empresa/candidatos", icon: Users,        color: "text-blue-500"     },
          { label: "Relatórios",       to: "/empresa/relatorios", icon: TrendingUp,   color: "text-amber-500"    },
          { label: "Perfil da Empresa",to: "/empresa/perfil",     icon: CalendarCheck,color: "text-emerald-500"  },
        ].map(l => (
          <Link
            key={l.to}
            to={l.to}
            className="flex items-center gap-2 rounded-xl border bg-white px-4 py-3 text-sm font-medium hover:bg-muted/40 transition-colors"
          >
            <l.icon size={16} className={l.color} />
            {l.label}
          </Link>
        ))}
      </div>

    </div>
  );
};

export default CompanyDashboard;
