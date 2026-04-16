import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
} from "recharts";
import {
  Briefcase, Users, CalendarCheck, TrendingUp,
  ArrowUpRight, Clock, CheckCircle2, PauseCircle,
} from "lucide-react";

/* ── mock data ── */
const CHART_COLORS = ["#7c3aed", "#8b5cf6", "#a78bfa", "#243c7e", "#4f6ec0", "#06b6d4"];

const candidatosPorVaga = [
  { vaga: "Analista Mkt", candidatos: 42 },
  { vaga: "Dev Front-end", candidatos: 67 },
  { vaga: "UX Designer", candidatos: 23 },
  { vaga: "Product Mgr", candidatos: 55 },
  { vaga: "Analista Dados", candidatos: 89 },
  { vaga: "Dev Back-end", candidatos: 34 },
];

const candidatosPorMes = [
  { mes: "Nov", candidatos: 38 },
  { mes: "Dez", candidatos: 52 },
  { mes: "Jan", candidatos: 61 },
  { mes: "Fev", candidatos: 74 },
  { mes: "Mar", candidatos: 58 },
  { mes: "Abr", candidatos: 89 },
];

const statusVagas = [
  { name: "Abertas",    value: 8, color: "#7c3aed" },
  { name: "Em Pausa",   value: 3, color: "#f59e0b" },
  { name: "Encerradas", value: 5, color: "#cbd5e1" },
];

const funil = [
  { etapa: "Triagem",       candidatos: 310, fill: "#7c3aed" },
  { etapa: "Entrevista RH", candidatos: 128, fill: "#8b5cf6" },
  { etapa: "Técnica",       candidatos: 52,  fill: "#a78bfa" },
  { etapa: "Proposta",      candidatos: 18,  fill: "#06b6d4" },
  { etapa: "Contratados",   candidatos: 9,   fill: "#22c55e" },
];

const kpis = [
  { label: "Vagas Abertas",    value: "8",    icon: Briefcase,     color: "#7c3aed", delta: "+2 este mês"         },
  { label: "Total Candidatos", value: "310",  icon: Users,         color: "#243c7e", delta: "+89 este mês"        },
  { label: "Entrevistas Hoje", value: "6",    icon: CalendarCheck,  color: "#06b6d4", delta: "3 RH · 3 Técnica" },
  { label: "Taxa de Conversão",value: "2,9%", icon: TrendingUp,    color: "#f59e0b", delta: "+0,4% vs mês ant."  },
];

const vagas = [
  { title: "Analista de Marketing Digital",   responsible: "Maria Silva",    candidatos: 42, status: "Aberta"   },
  { title: "Desenvolvedor Front-end Pleno",   responsible: "Carlos Souza",   candidatos: 67, status: "Aberta"   },
  { title: "UX Designer Senior",              responsible: "Ana Costa",      candidatos: 23, status: "Em Pausa" },
  { title: "Product Manager",                 responsible: "João Lima",      candidatos: 55, status: "Aberta"   },
  { title: "Analista de Dados Jr.",           responsible: "Fernanda Reis",  candidatos: 89, status: "Encerrada"},
];

const statusIcon: Record<string, { icon: typeof Clock; cls: string }> = {
  Aberta:     { icon: CheckCircle2, cls: "text-green-500" },
  "Em Pausa": { icon: PauseCircle,  cls: "text-amber-500" },
  Encerrada:  { icon: Clock,        cls: "text-slate-400"  },
};

const tooltip = {
  contentStyle: { borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: 12 },
};

const RecruiterDashboard = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Dashboard do Recrutador</h1>
            <p className="text-muted-foreground text-xs mt-0.5">Visão geral das vagas e candidatos — Abril 2026</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
            <Briefcase size={14} /> Nova Vaga
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-xl bg-white border border-blue-300 p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">{k.label}</span>
                <div className="rounded-lg p-1.5" style={{ background: k.color + "18" }}>
                  <k.icon size={14} style={{ color: k.color }} />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-slate-900 leading-none">{k.value}</p>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <ArrowUpRight size={11} className="text-green-500" />{k.delta}
              </p>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid lg:grid-cols-3 gap-3">

          {/* Candidatos por vaga */}
          <div className="lg:col-span-2 rounded-xl bg-white border border-blue-300 p-5">
            <p className="font-bold text-sm text-slate-900">Candidatos por Vaga</p>
            <p className="text-[11px] text-slate-400 mb-4">Total de currículos por processo aberto</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={candidatosPorVaga} barSize={26}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="vaga" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltip} cursor={{ fill: "hsl(var(--muted))" }} />
                <Bar dataKey="candidatos" radius={[4, 4, 0, 0]}>
                  {candidatosPorVaga.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Status das vagas */}
          <div className="rounded-xl bg-white border border-blue-300 p-5">
            <p className="font-bold text-sm text-slate-900">Status das Vagas</p>
            <p className="text-[11px] text-slate-400 mb-3">Distribuição por situação atual</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={statusVagas} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value">
                  {statusVagas.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip {...tooltip} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-3 space-y-2">
              {statusVagas.map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ background: s.color }} />
                    <span className="text-xs text-slate-500">{s.name}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid lg:grid-cols-2 gap-3">

          {/* Candidatos por mês — área */}
          <div className="rounded-xl bg-white border border-blue-300 p-5">
            <p className="font-bold text-sm text-slate-900">Candidatos Recebidos</p>
            <p className="text-[11px] text-slate-400 mb-4">Evolução mensal de currículos</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={candidatosPorMes}>
                <defs>
                  <linearGradient id="gradLine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#7c3aed" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltip} />
                <Area type="monotone" dataKey="candidatos" stroke="#7c3aed" strokeWidth={2.5} fill="url(#gradLine)" dot={{ r: 4, fill: "#7c3aed" }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Funil de contratação */}
          <div className="rounded-xl bg-white border border-blue-300 p-5">
            <p className="font-bold text-sm text-slate-900">Funil de Contratação</p>
            <p className="text-[11px] text-slate-400 mb-4">Pipeline consolidado de todas as vagas</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={funil} layout="vertical" barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="etapa" type="category" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={82} />
                <Tooltip {...tooltip} cursor={{ fill: "hsl(var(--muted))" }} />
                <Bar dataKey="candidatos" radius={[0, 4, 4, 0]}>
                  {funil.map((f, i) => <Cell key={i} fill={f.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent jobs table */}
        <div className="rounded-xl bg-white border border-blue-300 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <p className="font-bold text-sm text-slate-900">Vagas Recentes</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Últimas vagas cadastradas na plataforma</p>
            </div>
            <a href="/empresa" className="text-xs font-semibold text-primary hover:underline">Ver todas →</a>
          </div>
          <div className="divide-y divide-slate-100">
            {vagas.map((v, i) => {
              const cfg = statusIcon[v.status];
              const Icon = cfg.icon;
              return (
                <div key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50 transition-colors">
                  <Icon size={16} className={cfg.cls} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-slate-900 truncate">{v.title}</p>
                    <p className="text-[11px] text-slate-400">{v.responsible}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-900">{v.candidatos}</p>
                    <p className="text-[11px] text-slate-400">candidatos</p>
                  </div>
                  <span className={`hidden md:inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
                    v.status === "Aberta"    ? "bg-green-500/10 text-green-600" :
                    v.status === "Em Pausa" ? "bg-amber-500/10 text-amber-600" :
                    "bg-slate-100 text-slate-500"
                  }`}>
                    {v.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RecruiterDashboard;
