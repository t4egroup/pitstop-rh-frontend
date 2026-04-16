import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUp, Users, Clock, Star, BarChart2, Download } from "lucide-react";

/* ── Mock data ── */
const fluxoCandidatos = [
  { mes: "Set", candidatos: 58,  contratados: 4  },
  { mes: "Out", candidatos: 72,  contratados: 5  },
  { mes: "Nov", candidatos: 65,  contratados: 4  },
  { mes: "Dez", candidatos: 44,  contratados: 3  },
  { mes: "Jan", candidatos: 81,  contratados: 7  },
  { mes: "Fev", candidatos: 93,  contratados: 8  },
  { mes: "Mar", candidatos: 78,  contratados: 6  },
  { mes: "Abr", candidatos: 105, contratados: 10 },
];

const performanceVaga = [
  { vaga: "Dev Front-end",  candidatos: 87 },
  { vaga: "UX Designer",    candidatos: 63 },
  { vaga: "Product Mgr",    candidatos: 54 },
  { vaga: "Analista Dados", candidatos: 49 },
  { vaga: "Dev Back-end",   candidatos: 72 },
  { vaga: "Analista RH",    candidatos: 41 },
];

const etapaProcesso = [
  { name: "Triagem",      value: 38, color: "#243c7e" },
  { name: "Entrevista RH", value: 25, color: "#3b6fd4" },
  { name: "Técnica",      value: 18, color: "#f59e0b" },
  { name: "Proposta",     value: 11, color: "#22c55e" },
  { name: "Contratado",   value: 8,  color: "#0d9488" },
];

const fontesAtracao = [
  { fonte: "LinkedIn",     candidatos: 185 },
  { fonte: "Indeed",       candidatos: 112 },
  { fonte: "Indicação",    candidatos: 78  },
  { fonte: "Site próprio", candidatos: 54  },
  { fonte: "Outros",       candidatos: 45  },
];

const tempoResposta = [
  { mes: "Nov", dias: 4.2 },
  { mes: "Dez", dias: 5.1 },
  { mes: "Jan", dias: 3.8 },
  { mes: "Fev", dias: 3.2 },
  { mes: "Mar", dias: 2.9 },
  { mes: "Abr", dias: 2.5 },
];

/* ── Dados demográficos ── */
const genero = [
  { name: "Masculino",  value: 54, color: "#243c7e" },
  { name: "Feminino",   value: 41, color: "#d04870" },
  { name: "Outro",      value: 3,  color: "#94a3b8" },
  { name: "N/D",        value: 2,  color: "#e2e8f0" },
];

const faixaEtaria = [
  { faixa: "18–24", candidatos: 78  },
  { faixa: "25–30", candidatos: 142 },
  { faixa: "31–35", candidatos: 105 },
  { faixa: "36–40", candidatos: 72  },
  { faixa: "41–50", candidatos: 48  },
  { faixa: "50+",   candidatos: 29  },
];

const regiao = [
  { name: "Sudeste",      value: 58, color: "#243c7e" },
  { name: "Sul",          value: 18, color: "#3b6fd4" },
  { name: "Nordeste",     value: 12, color: "#f59e0b" },
  { name: "Centro-Oeste", value: 8,  color: "#22c55e" },
  { name: "Norte",        value: 4,  color: "#94a3b8" },
];

const cidadesTop = [
  { cidade: "São Paulo",      candidatos: 156 },
  { cidade: "Rio de Janeiro", candidatos: 72  },
  { cidade: "Belo Horizonte", candidatos: 45  },
  { cidade: "Curitiba",       candidatos: 38  },
  { cidade: "Porto Alegre",   candidatos: 32  },
  { cidade: "Brasília",       candidatos: 28  },
];

const diversidade = [
  { label: "PcD",         valor: 8,  total: 474, color: "#0d9488" },
  { label: "Pretos/Pardos", valor: 42, total: 474, color: "#7c3aed" },
  { label: "LGBTQIA+",    valor: 14, total: 474, color: "#d04870" },
  { label: "50+",         valor: 6,  total: 474, color: "#f59e0b" },
];

/* ── KPIs ── */
const kpis = [
  {
    label: "Candidatos ativos",
    value: "474",
    icon: Users,
    color: "#243c7e",
    delta: "+12%",
  },
  {
    label: "Taxa de conversão",
    value: "7,8%",
    icon: TrendingUp,
    color: "#22c55e",
    delta: "+1,2%",
  },
  {
    label: "Tempo médio seleção",
    value: "23d",
    icon: Clock,
    color: "#f59e0b",
    delta: "-4d",
  },
  {
    label: "NPS candidatos",
    value: "87",
    icon: Star,
    color: "#0d9488",
    delta: "+5pts",
  },
];

/* ── Tooltip style ── */
const tooltipStyle = {
  contentStyle: {
    borderRadius: 8,
    border: "1px solid hsl(var(--border))",
    background: "hsl(var(--card))",
    fontSize: 12,
  },
};

/* ── Section title helper ── */
const ChartTitle = ({ title, sub }: { title: string; sub?: string }) => (
  <div className="mb-3">
    <p className="font-bold text-sm text-slate-900">{title}</p>
    {sub && <p className="text-[11px] text-slate-400">{sub}</p>}
  </div>
);

/* ── Page ── */
const AnalisarDados = () => {
  const [period, setPeriod] = useState("30");

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <BarChart2 size={20} className="text-[#243c7e]" />
              Analisar Dados
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Visualize métricas e indicadores dos processos seletivos
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={period}
              onChange={e => setPeriod(e.target.value)}
              className="rounded-lg border border-blue-300 bg-white px-3 py-2 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-[#243c7e]/30"
            >
              <option value="30">Últimos 30 dias</option>
              <option value="60">Últimos 60 dias</option>
              <option value="90">Últimos 90 dias</option>
            </select>
            <button className="flex items-center gap-1.5 rounded-lg bg-[#243c7e] px-4 py-2 text-xs font-bold text-white hover:opacity-90 transition-opacity">
              <Download size={13} />
              Exportar
            </button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {kpis.map(k => (
            <div
              key={k.label}
              className="bg-white border border-blue-300 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="h-9 w-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: k.color + "18" }}
                >
                  <k.icon size={16} style={{ color: k.color }} />
                </div>
                <span className="text-[11px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  {k.delta}
                </span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900">{k.value}</p>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Full-width: Fluxo de Candidatos AreaChart */}
        <div className="bg-white border border-blue-300 rounded-xl p-5">
          <div className="flex items-start justify-between flex-wrap gap-2 mb-4">
            <ChartTitle
              title="Fluxo de Candidatos"
              sub="Volume mensal de candidatos e contratações"
            />
            <div className="flex items-center gap-4 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#243c7e] inline-block" />
                Candidatos
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e] inline-block" />
                Contratados
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={fluxoCandidatos}>
              <defs>
                <linearGradient id="gradCandidatos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#243c7e" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#243c7e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradContratados" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />
              <XAxis
                dataKey="mes"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip {...tooltipStyle} />
              <Area
                type="monotone"
                dataKey="candidatos"
                stroke="#243c7e"
                strokeWidth={2}
                fill="url(#gradCandidatos)"
                dot={{ r: 3, fill: "#243c7e" }}
                name="Candidatos"
              />
              <Area
                type="monotone"
                dataKey="contratados"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#gradContratados)"
                dot={{ r: 3, fill: "#22c55e" }}
                name="Contratados"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 2-col row: BarChart performance + PieChart donut */}
        <div className="grid lg:grid-cols-3 gap-4">

          {/* Performance por Vaga */}
          <div className="lg:col-span-2 bg-white border border-blue-300 rounded-xl p-5">
            <ChartTitle
              title="Performance por Vaga"
              sub="Candidatos recebidos por posição aberta"
            />
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={performanceVaga} barSize={28}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  vertical={false}
                />
                <XAxis
                  dataKey="vaga"
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  {...tooltipStyle}
                  cursor={{ fill: "#f1f5f9" }}
                />
                <Bar
                  dataKey="candidatos"
                  fill="#243c7e"
                  radius={[4, 4, 0, 0]}
                  name="Candidatos"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Etapa do Processo PieChart donut */}
          <div className="bg-white border border-blue-300 rounded-xl p-5">
            <ChartTitle
              title="Etapa do Processo"
              sub="Distribuição atual de candidatos"
            />
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={etapaProcesso}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={72}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {etapaProcesso.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-1.5">
              {etapaProcesso.map(e => (
                <div key={e.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ background: e.color }}
                    />
                    <span className="text-[11px] text-slate-500">{e.name}</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-900">{e.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2-col row: Fontes de Atração + Tempo de Resposta */}
        <div className="grid lg:grid-cols-2 gap-4">

          {/* Fontes de Atração — horizontal BarChart */}
          <div className="bg-white border border-blue-300 rounded-xl p-5">
            <ChartTitle
              title="Fontes de Atração"
              sub="De onde chegam os candidatos"
            />
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={fontesAtracao}
                layout="vertical"
                barSize={14}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  dataKey="fonte"
                  type="category"
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  width={80}
                />
                <Tooltip
                  {...tooltipStyle}
                  cursor={{ fill: "#f1f5f9" }}
                />
                <Bar
                  dataKey="candidatos"
                  fill="#243c7e"
                  radius={[0, 4, 4, 0]}
                  name="Candidatos"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tempo de Resposta — LineChart */}
          <div className="bg-white border border-blue-300 rounded-xl p-5">
            <ChartTitle
              title="Tempo de Resposta"
              sub="Média de dias para retorno ao candidato"
            />
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={tempoResposta}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  vertical={false}
                />
                <XAxis
                  dataKey="mes"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  unit="d"
                />
                <Tooltip
                  {...tooltipStyle}
                  formatter={(v: number) => [`${v} dias`, "Tempo médio"]}
                />
                <Line
                  type="monotone"
                  dataKey="dias"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#f59e0b", strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                  name="Tempo de resposta"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Seção Demográfica ── */}
        <div className="pt-2">
          <h2 className="text-lg font-extrabold text-slate-900 mb-1">Diversidade & Demografia</h2>
          <p className="text-xs text-slate-400 mb-4">Perfil dos candidatos nos processos seletivos</p>
        </div>

        {/* Gênero + Região */}
        <div className="grid lg:grid-cols-2 gap-4">

          {/* Gênero */}
          <div className="bg-white border border-blue-300 rounded-xl p-5">
            <ChartTitle title="Gênero" sub="Distribuição por gênero dos candidatos" />
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={genero} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="value">
                  {genero.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-1.5">
              {genero.map((g) => (
                <div key={g.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ background: g.color }} />
                    <span className="text-[11px] text-slate-500">{g.name}</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-900">{g.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Região */}
          <div className="bg-white border border-blue-300 rounded-xl p-5">
            <ChartTitle title="Região" sub="Distribuição geográfica por região" />
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={regiao} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="value">
                  {regiao.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-1.5">
              {regiao.map((r) => (
                <div key={r.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ background: r.color }} />
                    <span className="text-[11px] text-slate-500">{r.name}</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-900">{r.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Faixa Etária + Top Cidades */}
        <div className="grid lg:grid-cols-2 gap-4">

          {/* Faixa Etária */}
          <div className="bg-white border border-blue-300 rounded-xl p-5">
            <ChartTitle title="Faixa Etária" sub="Idade dos candidatos nos processos" />
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={faixaEtaria} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="faixa" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} cursor={{ fill: "#f1f5f9" }} />
                <Bar dataKey="candidatos" fill="#243c7e" radius={[4, 4, 0, 0]} name="Candidatos" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Cidades */}
          <div className="bg-white border border-blue-300 rounded-xl p-5">
            <ChartTitle title="Top Cidades" sub="Cidades com mais candidatos" />
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={cidadesTop} layout="vertical" barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="cidade" type="category" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={100} />
                <Tooltip {...tooltipStyle} cursor={{ fill: "#f1f5f9" }} />
                <Bar dataKey="candidatos" fill="#3b6fd4" radius={[0, 4, 4, 0]} name="Candidatos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Indicadores de Diversidade */}
        <div className="bg-white border border-blue-300 rounded-xl p-5">
          <ChartTitle title="Indicadores de Diversidade" sub="Representatividade nos processos seletivos" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            {diversidade.map((d) => {
              const pct = Math.round((d.valor / d.total) * 100);
              return (
                <div key={d.label} className="text-center">
                  <div className="relative mx-auto h-20 w-20 mb-2">
                    <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="15.5" fill="none"
                        stroke={d.color} strokeWidth="3"
                        strokeDasharray={`${pct} ${100 - pct}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-slate-900">
                      {pct}%
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-700">{d.label}</p>
                  <p className="text-[10px] text-slate-400">{d.valor} de {d.total}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalisarDados;
