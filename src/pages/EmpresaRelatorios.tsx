import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { TrendingUp, Users, Briefcase, Clock } from "lucide-react";

const candidatosPorVaga = [
  { vaga: "Mkt Digital",    candidatos: 42 },
  { vaga: "Dev Front-end",  candidatos: 67 },
  { vaga: "UX Designer",    candidatos: 23 },
  { vaga: "Product Mgr",    candidatos: 55 },
  { vaga: "Dados Jr.",      candidatos: 89 },
];

const candidatosPorMes = [
  { mes: "Nov", candidatos: 18 },
  { mes: "Dez", candidatos: 25 },
  { mes: "Jan", candidatos: 31 },
  { mes: "Fev", candidatos: 40 },
  { mes: "Mar", candidatos: 29 },
  { mes: "Abr", candidatos: 47 },
];

const statusVagas = [
  { name: "Abertas",    value: 3, color: "#22c55e" },
  { name: "Em Pausa",   value: 1, color: "#f59e0b" },
  { name: "Encerradas", value: 1, color: "#94a3b8" },
];

const funil = [
  { etapa: "Triagem",        candidatos: 276 },
  { etapa: "Entrevista RH",  candidatos: 98  },
  { etapa: "Técnica",        candidatos: 34  },
  { etapa: "Proposta",       candidatos: 10  },
  { etapa: "Contratados",    candidatos: 3   },
];

const kpis = [
  { label: "Candidatos este mês", value: "47",   delta: "+18 vs mês ant.", icon: Users,      color: "text-blue-500",    bg: "bg-blue-500/10"    },
  { label: "Vagas ativas",        value: "3",    delta: "de 5 criadas",    icon: Briefcase,  color: "text-primary",     bg: "bg-primary/10"     },
  { label: "Taxa de conversão",   value: "1,1%", delta: "triagem → cont.", icon: TrendingUp, color: "text-amber-500",   bg: "bg-amber-500/10"   },
  { label: "Tempo médio/vaga",    value: "22d",  delta: "-3d vs mês ant.", icon: Clock,      color: "text-emerald-500", bg: "bg-emerald-500/10" },
];

const CHART_PRIMARY = "#31549c";

const EmpresaRelatorios = () => (
  <div className="container max-w-6xl py-8 space-y-6">

    {/* Header */}
    <div>
      <h1 className="text-2xl font-extrabold">Relatórios</h1>
      <p className="text-sm text-muted-foreground mt-1">Métricas dos seus processos seletivos.</p>
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

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Candidatos por vaga */}
      <div className="rounded-xl border bg-white p-5">
        <h2 className="text-sm font-semibold mb-4">Candidatos por Vaga</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={candidatosPorVaga} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="vaga" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="candidatos" fill={CHART_PRIMARY} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Candidatos por mês */}
      <div className="rounded-xl border bg-white p-5">
        <h2 className="text-sm font-semibold mb-4">Candidatos por Mês</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={candidatosPorMes}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line type="monotone" dataKey="candidatos" stroke={CHART_PRIMARY} strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Funil de seleção */}
      <div className="rounded-xl border bg-white p-5">
        <h2 className="text-sm font-semibold mb-4">Funil de Seleção</h2>
        <div className="space-y-2">
          {funil.map((f, i) => {
            const pct = Math.round((f.candidatos / funil[0].candidatos) * 100);
            return (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium">{f.etapa}</span>
                  <span className="text-muted-foreground">{f.candidatos} ({pct}%)</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, backgroundColor: CHART_PRIMARY }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status das vagas */}
      <div className="rounded-xl border bg-white p-5">
        <h2 className="text-sm font-semibold mb-4">Status das Vagas</h2>
        <div className="flex items-center justify-between gap-6">
          <ResponsiveContainer width="50%" height={180}>
            <PieChart>
              <Pie data={statusVagas} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {statusVagas.map((s, i) => <Cell key={i} fill={s.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3 flex-1">
            {statusVagas.map(s => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-sm">{s.name}</span>
                </div>
                <span className="font-bold text-sm">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
);

export default EmpresaRelatorios;
