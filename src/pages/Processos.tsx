import { useState } from "react";
import {
  Plus, Search, ChevronDown, ChevronUp,
  Users, MapPin, Clock, MoreHorizontal, Circle,
} from "lucide-react";

const processos = [
  {
    id: 1,
    titulo: "Desenvolvedor Front-end Pleno",
    departamento: "Tecnologia",
    local: "São Paulo, SP",
    modelo: "Híbrido",
    abertura: "01/04/2026",
    prazo: "30/04/2026",
    responsavel: "Carlos Souza",
    status: "Aberta",
    prioridade: "Alta",
    candidatos: 67,
    pipeline: [
      { etapa: "Triagem", total: 67, cor: "bg-blue-500" },
      { etapa: "Entrevista RH", total: 30, cor: "bg-blue-500" },
      { etapa: "Teste Técnico", total: 12, cor: "bg-amber-500" },
      { etapa: "Entrevista Final", total: 4, cor: "bg-orange-500" },
      { etapa: "Proposta", total: 1, cor: "bg-green-500" },
    ],
  },
  {
    id: 2,
    titulo: "Analista de Marketing Digital",
    departamento: "Marketing",
    local: "Remoto",
    modelo: "Remoto",
    abertura: "05/04/2026",
    prazo: "25/04/2026",
    responsavel: "Maria Silva",
    status: "Aberta",
    prioridade: "Média",
    candidatos: 42,
    pipeline: [
      { etapa: "Triagem", total: 42, cor: "bg-blue-500" },
      { etapa: "Entrevista RH", total: 18, cor: "bg-blue-500" },
      { etapa: "Case", total: 7, cor: "bg-amber-500" },
      { etapa: "Proposta", total: 2, cor: "bg-green-500" },
    ],
  },
  {
    id: 3,
    titulo: "UX Designer Senior",
    departamento: "Produto",
    local: "Rio de Janeiro, RJ",
    modelo: "Presencial",
    abertura: "28/03/2026",
    prazo: "20/04/2026",
    responsavel: "Ana Costa",
    status: "Em Pausa",
    prioridade: "Baixa",
    candidatos: 23,
    pipeline: [
      { etapa: "Triagem", total: 23, cor: "bg-blue-500" },
      { etapa: "Portfólio", total: 10, cor: "bg-blue-500" },
      { etapa: "Entrevista", total: 5, cor: "bg-amber-500" },
      { etapa: "Proposta", total: 1, cor: "bg-green-500" },
    ],
  },
  {
    id: 4,
    titulo: "Product Manager",
    departamento: "Produto",
    local: "São Paulo, SP",
    modelo: "Híbrido",
    abertura: "10/04/2026",
    prazo: "05/05/2026",
    responsavel: "João Lima",
    status: "Aberta",
    prioridade: "Alta",
    candidatos: 55,
    pipeline: [
      { etapa: "Triagem", total: 55, cor: "bg-blue-500" },
      { etapa: "Entrevista RH", total: 20, cor: "bg-blue-500" },
      { etapa: "Case", total: 8, cor: "bg-amber-500" },
      { etapa: "Painel", total: 3, cor: "bg-orange-500" },
      { etapa: "Proposta", total: 1, cor: "bg-green-500" },
    ],
  },
  {
    id: 5,
    titulo: "Analista de Dados Jr.",
    departamento: "Dados",
    local: "Remoto",
    modelo: "Remoto",
    abertura: "15/03/2026",
    prazo: "10/04/2026",
    responsavel: "Fernanda Reis",
    status: "Encerrada",
    prioridade: "Média",
    candidatos: 89,
    pipeline: [
      { etapa: "Triagem", total: 89, cor: "bg-blue-500" },
      { etapa: "Teste Técnico", total: 45, cor: "bg-blue-500" },
      { etapa: "Entrevista", total: 15, cor: "bg-amber-500" },
      { etapa: "Proposta", total: 2, cor: "bg-orange-500" },
      { etapa: "Contratado", total: 1, cor: "bg-green-500" },
    ],
  },
  {
    id: 6,
    titulo: "Desenvolvedor Back-end Sênior",
    departamento: "Tecnologia",
    local: "São Paulo, SP",
    modelo: "Presencial",
    abertura: "12/04/2026",
    prazo: "10/05/2026",
    responsavel: "Ricardo Mendes",
    status: "Aberta",
    prioridade: "Alta",
    candidatos: 34,
    pipeline: [
      { etapa: "Triagem", total: 34, cor: "bg-blue-500" },
      { etapa: "Entrevista RH", total: 14, cor: "bg-blue-500" },
      { etapa: "Teste Técnico", total: 6, cor: "bg-amber-500" },
      { etapa: "Proposta", total: 0, cor: "bg-green-500" },
    ],
  },
];

const statusStyle: Record<string, string> = {
  Aberta: "bg-green-500/10 text-green-600",
  "Em Pausa": "bg-amber-500/10 text-amber-600",
  Encerrada: "bg-muted text-muted-foreground",
};

const prioridadeStyle: Record<string, string> = {
  Alta: "bg-red-500/10 text-red-600",
  Média: "bg-amber-500/10 text-amber-600",
  Baixa: "bg-blue-500/10 text-blue-600",
};

const modeloStyle: Record<string, string> = {
  Remoto: "bg-green-500/10 text-green-700",
  Híbrido: "bg-blue-500/10 text-blue-700",
  Presencial: "bg-blue-500/10 text-purple-700",
};

const Processos = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");

  const filtrados = processos.filter((p) => {
    const matchSearch = p.titulo.toLowerCase().includes(search.toLowerCase()) ||
      p.departamento.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filtroStatus ? p.status === filtroStatus : true;
    return matchSearch && matchStatus;
  });

  const counts = {
    total: processos.length,
    abertas: processos.filter((p) => p.status === "Aberta").length,
    pausadas: processos.filter((p) => p.status === "Em Pausa").length,
    encerradas: processos.filter((p) => p.status === "Encerrada").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Processos Seletivos</h1>
            <p className="text-muted-foreground text-sm mt-1">Gerencie as vagas abertas e acompanhe cada pipeline</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus size={15} /> Abrir Vaga
          </button>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total de Vagas", value: counts.total, color: "text-foreground" },
            { label: "Abertas", value: counts.abertas, color: "text-green-600" },
            { label: "Em Pausa", value: counts.pausadas, color: "text-amber-600" },
            { label: "Encerradas", value: counts.encerradas, color: "text-muted-foreground" },
          ].map((k) => (
            <div key={k.label} className="rounded-xl border bg-white p-4 text-center">
              <p className={`text-3xl font-extrabold ${k.color}`}>{k.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por cargo ou departamento..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border bg-white pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">Todos os status</option>
            <option>Aberta</option>
            <option>Em Pausa</option>
            <option>Encerrada</option>
          </select>
        </div>

        {/* Table */}
        <div className="rounded-xl border bg-white overflow-hidden">
          <div className="hidden lg:grid grid-cols-12 gap-4 border-b bg-muted/40 px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            <div className="col-span-4">Vaga</div>
            <div className="col-span-2">Responsável</div>
            <div className="col-span-1 text-center">Candidatos</div>
            <div className="col-span-1 text-center">Prazo</div>
            <div className="col-span-1 text-center">Prioridade</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-1" />
          </div>

          {filtrados.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">Nenhum processo encontrado.</div>
          )}

          {filtrados.map((p) => {
            const expanded = expandedId === p.id;
            return (
              <div key={p.id} className="border-b last:border-b-0">
                <div
                  className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 items-center px-5 py-4 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => setExpandedId(expanded ? null : p.id)}
                >
                  {/* Vaga */}
                  <div className="lg:col-span-4 flex items-start gap-3">
                    <div className="mt-0.5">
                      {expanded ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{p.titulo}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs text-muted-foreground">{p.departamento}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${modeloStyle[p.modelo]}`}>{p.modelo}</span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin size={11} />{p.local}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Responsável */}
                  <div className="lg:col-span-2 text-sm text-muted-foreground hidden lg:block">{p.responsavel}</div>

                  {/* Candidatos */}
                  <div className="lg:col-span-1 text-center hidden lg:flex justify-center">
                    <span className="flex items-center gap-1 text-sm font-semibold">
                      <Users size={13} className="text-muted-foreground" />{p.candidatos}
                    </span>
                  </div>

                  {/* Prazo */}
                  <div className="lg:col-span-1 text-center hidden lg:flex justify-center items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={12} />{p.prazo}
                  </div>

                  {/* Prioridade */}
                  <div className="lg:col-span-1 hidden lg:flex justify-center">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${prioridadeStyle[p.prioridade]}`}>
                      {p.prioridade}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="lg:col-span-2 flex lg:justify-center items-center gap-2">
                    <Circle size={8} className={p.status === "Aberta" ? "text-green-500 fill-green-500" : p.status === "Em Pausa" ? "text-amber-500 fill-amber-500" : "text-muted-foreground fill-muted-foreground"} />
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyle[p.status]}`}>
                      {p.status}
                    </span>
                  </div>

                  {/* Ações */}
                  <div className="lg:col-span-1 hidden lg:flex justify-end" onClick={(e) => e.stopPropagation()}>
                    <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>

                {/* Pipeline expandido */}
                {expanded && (
                  <div className="border-t bg-muted/20 px-6 py-5">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-4">Pipeline de Candidatos</p>
                    <div className="flex flex-wrap gap-3 items-center">
                      {p.pipeline.map((etapa, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="rounded-lg border bg-white px-4 py-3 min-w-[110px] text-center shadow-sm">
                            <p className="text-xs text-muted-foreground mb-1">{etapa.etapa}</p>
                            <div className="flex items-center justify-center gap-1.5">
                              <span className={`h-2 w-2 rounded-full ${etapa.cor}`} />
                              <p className="text-lg font-extrabold">{etapa.total}</p>
                            </div>
                          </div>
                          {i < p.pipeline.length - 1 && (
                            <span className="text-muted-foreground text-lg">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock size={12} />
                      Aberta em {p.abertura} · Prazo: {p.prazo} · Responsável: {p.responsavel}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Processos;
