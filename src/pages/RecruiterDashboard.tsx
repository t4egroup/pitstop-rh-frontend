import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import {
  Briefcase, Users, CalendarCheck, TrendingUp,
  ArrowUpRight, Clock, CheckCircle2, PauseCircle,
} from "lucide-react";

/* ── mock data ── */
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
  { name: "Abertas", value: 8, color: "#22c55e" },
  { name: "Em Pausa", value: 3, color: "#f59e0b" },
  { name: "Encerradas", value: 5, color: "#94a3b8" },
];

const funil = [
  { etapa: "Triagem", candidatos: 310 },
  { etapa: "Entrevista RH", candidatos: 128 },
  { etapa: "Técnica", candidatos: 52 },
  { etapa: "Proposta", candidatos: 18 },
  { etapa: "Contratados", candidatos: 9 },
];

const kpis = [
  { label: "Vagas Abertas", value: "8", icon: Briefcase, color: "text-primary", bg: "bg-primary/10", delta: "+2 este mês" },
  { label: "Total Candidatos", value: "310", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", delta: "+89 este mês" },
  { label: "Entrevistas Hoje", value: "6", icon: CalendarCheck, color: "text-green-500", bg: "bg-green-500/10", delta: "3 RH · 3 Técnica" },
  { label: "Taxa de Conversão", value: "2,9%", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-500/10", delta: "+0,4% vs mês ant." },
];

const vagas = [
  { title: "Analista de Marketing Digital", responsible: "Maria Silva", candidatos: 42, status: "Aberta" },
  { title: "Desenvolvedor Front-end Pleno", responsible: "Carlos Souza", candidatos: 67, status: "Aberta" },
  { title: "UX Designer Senior", responsible: "Ana Costa", candidatos: 23, status: "Em Pausa" },
  { title: "Product Manager", responsible: "João Lima", candidatos: 55, status: "Aberta" },
  { title: "Analista de Dados Jr.", responsible: "Fernanda Reis", candidatos: 89, status: "Encerrada" },
];

const statusIcon: Record<string, { icon: typeof Clock; cls: string }> = {
  Aberta: { icon: CheckCircle2, cls: "text-green-500" },
  "Em Pausa": { icon: PauseCircle, cls: "text-amber-500" },
  Encerrada: { icon: Clock, cls: "text-muted-foreground" },
};

const RecruiterDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl py-8 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Dashboard do Recrutador</h1>
            <p className="text-muted-foreground text-sm mt-1">Visão geral das vagas e candidatos — Abril 2026</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
            <Briefcase size={15} /> Nova Vaga
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-xl border bg-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{k.label}</span>
                <div className={`rounded-lg p-2 ${k.bg}`}>
                  <k.icon size={16} className={k.color} />
                </div>
              </div>
              <p className="text-3xl font-extrabold mb-1">{k.value}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <ArrowUpRight size={12} className="text-green-500" /> {k.delta}
              </p>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Candidatos por vaga */}
          <div className="lg:col-span-2 rounded-xl border bg-card p-6">
            <h2 className="font-bold mb-1">Candidatos por Vaga</h2>
            <p className="text-xs text-muted-foreground mb-4">Total de currículos recebidos em cada processo aberto</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={candidatosPorVaga} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="vaga" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}
                  cursor={{ fill: "hsl(var(--muted))" }}
                />
                <Bar dataKey="candidatos" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Status das vagas */}
          <div className="rounded-xl border bg-card p-6">
            <h2 className="font-bold mb-1">Status das Vagas</h2>
            <p className="text-xs text-muted-foreground mb-4">Distribuição por situação atual</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={statusVagas}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {statusVagas.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-1.5">
              {statusVagas.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full inline-block" style={{ background: s.color }} />
                    <span className="text-muted-foreground">{s.name}</span>
                  </div>
                  <span className="font-bold">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Candidatos por mês */}
          <div className="rounded-xl border bg-card p-6">
            <h2 className="font-bold mb-1">Candidatos Recebidos</h2>
            <p className="text-xs text-muted-foreground mb-4">Evolução mensal de currículos</p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={candidatosPorMes}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}
                />
                <Line
                  type="monotone"
                  dataKey="candidatos"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "hsl(var(--primary))" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Funil de contratação */}
          <div className="rounded-xl border bg-card p-6">
            <h2 className="font-bold mb-1">Funil de Contratação</h2>
            <p className="text-xs text-muted-foreground mb-4">Pipeline consolidado de todas as vagas</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={funil} layout="vertical" barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="etapa" type="category" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}
                  cursor={{ fill: "hsl(var(--muted))" }}
                />
                <Bar dataKey="candidatos" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent jobs table */}
        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <div>
              <h2 className="font-bold">Vagas Recentes</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Últimas vagas cadastradas na plataforma</p>
            </div>
            <a href="/empresa" className="text-xs font-semibold text-primary hover:underline">Ver todas →</a>
          </div>
          <div className="divide-y">
            {vagas.map((v, i) => {
              const cfg = statusIcon[v.status];
              const Icon = cfg.icon;
              return (
                <div key={i} className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/40 transition-colors">
                  <div className={cfg.cls}>
                    <Icon size={17} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{v.title}</p>
                    <p className="text-xs text-muted-foreground">{v.responsible}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold">{v.candidatos}</p>
                    <p className="text-xs text-muted-foreground">candidatos</p>
                  </div>
                  <span className={`hidden md:inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
                    v.status === "Aberta" ? "bg-green-500/10 text-green-600" :
                    v.status === "Em Pausa" ? "bg-amber-500/10 text-amber-600" :
                    "bg-muted text-muted-foreground"
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
