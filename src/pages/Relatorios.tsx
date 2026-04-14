import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Download, TrendingUp, TrendingDown, Users, Briefcase, Clock, CheckCircle2 } from "lucide-react";

const candidatosPorMes = [
  { mes: "Out", candidatos: 45, contratados: 3 },
  { mes: "Nov", candidatos: 62, contratados: 5 },
  { mes: "Dez", candidatos: 38, contratados: 2 },
  { mes: "Jan", candidatos: 71, contratados: 6 },
  { mes: "Fev", candidatos: 89, contratados: 7 },
  { mes: "Mar", candidatos: 74, contratados: 5 },
  { mes: "Abr", candidatos: 95, contratados: 9 },
];

const tempoMedioPorVaga = [
  { vaga: "Analista Mkt", dias: 22 },
  { vaga: "Dev Front-end", dias: 35 },
  { vaga: "UX Designer", dias: 28 },
  { vaga: "Product Mgr", dias: 40 },
  { vaga: "Analista Dados", dias: 18 },
  { vaga: "Dev Back-end", dias: 32 },
];

const origemCandidatos = [
  { name: "LinkedIn",      value: 42, color: "#0A66C2" },
  { name: "Indeed",        value: 25, color: "#003A9B" },
  { name: "Indicação",     value: 18, color: "#22c55e" },
  { name: "Site próprio",  value: 10, color: "#f59e0b" },
  { name: "Outros",        value: 5,  color: "#94a3b8" },
];

const motivoReprovacao = [
  { motivo: "Habilidades técnicas", qtd: 38 },
  { motivo: "Pretensão salarial",   qtd: 24 },
  { motivo: "Fit cultural",         qtd: 19 },
  { motivo: "Disponibilidade",      qtd: 12 },
  { motivo: "Outros",               qtd: 7  },
];

const kpis = [
  { label: "Candidatos recebidos",   value: "474",  delta: "+18%", up: true,  icon: Users,        color: "text-primary",   bg: "bg-primary/10"   },
  { label: "Vagas fechadas",         value: "37",   delta: "+8%",  up: true,  icon: CheckCircle2, color: "text-green-600", bg: "bg-green-500/10" },
  { label: "Tempo médio de seleção", value: "29d",  delta: "-3d",  up: true,  icon: Clock,        color: "text-amber-600", bg: "bg-amber-500/10" },
  { label: "Taxa de conversão",      value: "7,8%", delta: "+1,2%",up: true,  icon: TrendingUp,   color: "text-teal-600",  bg: "bg-teal-500/10"  },
  { label: "Vagas abertas",          value: "8",    delta: "+2",   up: true,  icon: Briefcase,    color: "text-blue-600",  bg: "bg-blue-500/10"  },
  { label: "Custo por contratação",  value: "R$1.2k", delta: "-5%", up: true, icon: TrendingDown, color: "text-purple-600",bg: "bg-purple-500/10"},
];

const relatorios = [
  { nome: "Relatório Mensal de Recrutamento — Abril 2026",     tipo: "PDF",  data: "14/04/2026" },
  { nome: "Funil de Candidatos — 1º Trimestre 2026",           tipo: "XLSX", data: "01/04/2026" },
  { nome: "Análise de Origem de Candidatos — Mar 2026",        tipo: "PDF",  data: "31/03/2026" },
  { nome: "Relatório de Tempo de Seleção por Vaga — Fev 2026", tipo: "PDF",  data: "28/02/2026" },
  { nome: "KPIs de RH — 4º Trimestre 2025",                    tipo: "XLSX", data: "05/01/2026" },
];

const Relatorios = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl py-8 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Relatórios</h1>
            <p className="text-muted-foreground text-sm mt-1">Indicadores e análises dos processos seletivos</p>
          </div>
          <div className="flex gap-2">
            <select className="rounded-lg border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30">
              <option>Últimos 7 meses</option>
              <option>Últimos 3 meses</option>
              <option>Este ano</option>
            </select>
            <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
              <Download size={15} /> Exportar
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-xl border bg-card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`rounded-lg p-1.5 ${k.bg}`}>
                  <k.icon size={14} className={k.color} />
                </div>
                <span className={`text-xs font-semibold flex items-center gap-0.5 ${k.up ? "text-green-600" : "text-destructive"}`}>
                  {k.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}{k.delta}
                </span>
              </div>
              <p className="text-2xl font-extrabold">{k.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Gráficos row 1 */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Candidatos e contratados por mês */}
          <div className="lg:col-span-2 rounded-xl border bg-card p-6">
            <h2 className="font-bold mb-1">Candidatos × Contratados por Mês</h2>
            <p className="text-xs text-muted-foreground mb-4">Volume recebido e conversões mensais</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={candidatosPorMes} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} cursor={{ fill: "hsl(var(--muted))" }} />
                <Bar dataKey="candidatos" fill="hsl(var(--primary))" radius={[4,4,0,0]} barSize={18} name="Candidatos" />
                <Bar dataKey="contratados" fill="#22c55e" radius={[4,4,0,0]} barSize={18} name="Contratados" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Origem dos candidatos */}
          <div className="rounded-xl border bg-card p-6">
            <h2 className="font-bold mb-1">Origem dos Candidatos</h2>
            <p className="text-xs text-muted-foreground mb-4">De onde vêm os candidatos</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={origemCandidatos} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {origemCandidatos.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-1.5">
              {origemCandidatos.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground">{s.name}</span>
                  </div>
                  <span className="font-bold">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gráficos row 2 */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Tempo médio por vaga */}
          <div className="rounded-xl border bg-card p-6">
            <h2 className="font-bold mb-1">Tempo Médio de Seleção por Vaga</h2>
            <p className="text-xs text-muted-foreground mb-4">Em dias — do anúncio à contratação</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={tempoMedioPorVaga} layout="vertical" barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} unit="d" />
                <YAxis dataKey="vaga" type="category" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} cursor={{ fill: "hsl(var(--muted))" }} formatter={(v) => [`${v} dias`]} />
                <Bar dataKey="dias" fill="hsl(var(--primary))" radius={[0,4,4,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Motivo de reprovação */}
          <div className="rounded-xl border bg-card p-6">
            <h2 className="font-bold mb-1">Principais Motivos de Reprovação</h2>
            <p className="text-xs text-muted-foreground mb-4">Por que candidatos saem do processo</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={motivoReprovacao} layout="vertical" barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="motivo" type="category" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={130} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} cursor={{ fill: "hsl(var(--muted))" }} />
                <Bar dataKey="qtd" fill="#f59e0b" radius={[0,4,4,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Evolução da taxa de conversão */}
        <div className="rounded-xl border bg-card p-6">
          <h2 className="font-bold mb-1">Evolução Mensal de Candidatos</h2>
          <p className="text-xs text-muted-foreground mb-4">Tendência dos últimos 7 meses</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={candidatosPorMes}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
              <Line type="monotone" dataKey="candidatos" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(var(--primary))" }} activeDot={{ r: 6 }} name="Candidatos" />
              <Line type="monotone" dataKey="contratados" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 4, fill: "#22c55e" }} activeDot={{ r: 6 }} name="Contratados" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Relatórios gerados */}
        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="font-bold">Relatórios Gerados</h2>
            <button className="text-xs font-semibold text-primary hover:underline">Ver todos</button>
          </div>
          <div className="divide-y">
            {relatorios.map((r, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-3.5 hover:bg-muted/40 transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${r.tipo === "PDF" ? "bg-red-500/10 text-red-600" : "bg-green-500/10 text-green-700"}`}>
                    {r.tipo}
                  </span>
                  <p className="text-sm font-medium">{r.nome}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs text-muted-foreground hidden sm:block">{r.data}</span>
                  <button className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                    <Download size={13} /> Baixar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Relatorios;
