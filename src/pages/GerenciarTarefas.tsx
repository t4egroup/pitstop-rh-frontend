import { useState } from "react";
import {
  Plus, Search, CheckCircle2, Circle, Clock,
  Calendar, User, Tag, MoreHorizontal,
  AlertCircle, ChevronDown,
} from "lucide-react";

interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  responsavel: string;
  prioridade: "Alta" | "Média" | "Baixa";
  status: "Pendente" | "Em andamento" | "Concluída" | "Atrasada";
  prazo: string;
  vaga?: string;
  categoria: string;
}

const tarefas: Tarefa[] = [
  {
    id: 1,
    titulo: "Agendar entrevista técnica — Lucas Ferreira",
    descricao: "Alinhar disponibilidade com o Tech Lead para entrevista técnica do candidato.",
    responsavel: "Amanda Silva",
    prioridade: "Alta",
    status: "Pendente",
    prazo: "17/04/2026",
    vaga: "Desenvolvedor Front-end Pleno",
    categoria: "Entrevista",
  },
  {
    id: 2,
    titulo: "Enviar feedback — Analista de Marketing",
    descricao: "Enviar feedback para os 18 candidatos não aprovados na triagem.",
    responsavel: "Amanda Silva",
    prioridade: "Média",
    status: "Em andamento",
    prazo: "18/04/2026",
    vaga: "Analista de Marketing Digital",
    categoria: "Feedback",
  },
  {
    id: 3,
    titulo: "Revisar descrição de vaga — UX Designer",
    descricao: "Ajustar requisitos e benefícios conforme alinhamento com o gestor.",
    responsavel: "Carlos Souza",
    prioridade: "Baixa",
    status: "Concluída",
    prazo: "15/04/2026",
    vaga: "UX Designer Senior",
    categoria: "Vaga",
  },
  {
    id: 4,
    titulo: "Coletar documentação — Diego Almeida",
    descricao: "Solicitar documentos pendentes para processo admissional.",
    responsavel: "Amanda Silva",
    prioridade: "Alta",
    status: "Atrasada",
    prazo: "14/04/2026",
    vaga: "Product Manager",
    categoria: "Admissão",
  },
  {
    id: 5,
    titulo: "Alinhar faixa salarial com financeiro",
    descricao: "Validar budget para nova requisição de Dev Back-end.",
    responsavel: "Maria Silva",
    prioridade: "Média",
    status: "Pendente",
    prazo: "20/04/2026",
    categoria: "Requisição",
  },
  {
    id: 6,
    titulo: "Publicar vaga no LinkedIn",
    descricao: "Criar post e publicar vaga de Analista de Dados no LinkedIn.",
    responsavel: "Amanda Silva",
    prioridade: "Baixa",
    status: "Em andamento",
    prazo: "16/04/2026",
    vaga: "Analista de Dados Jr.",
    categoria: "Divulgação",
  },
];

const prioridadeColor: Record<string, string> = {
  Alta:  "bg-red-500/10 text-red-600",
  Média: "bg-amber-500/10 text-amber-600",
  Baixa: "bg-slate-100 text-slate-500",
};

const statusConfig: Record<string, { icon: typeof Clock; color: string; badge: string }> = {
  Pendente:        { icon: Circle,       color: "text-slate-400",  badge: "bg-slate-100 text-slate-500" },
  "Em andamento":  { icon: Clock,        color: "text-blue-500",   badge: "bg-blue-500/10 text-blue-600" },
  "Concluída":     { icon: CheckCircle2, color: "text-green-500",  badge: "bg-green-500/10 text-green-600" },
  Atrasada:        { icon: AlertCircle,  color: "text-red-500",    badge: "bg-red-500/10 text-red-600" },
};

const GerenciarTarefas = () => {
  const [search, setSearch] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");

  const filtered = tarefas.filter((t) => {
    const matchSearch = t.titulo.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filtroStatus === "Todos" || t.status === filtroStatus;
    return matchSearch && matchStatus;
  });

  const countByStatus = (s: string) => tarefas.filter((t) => t.status === s).length;

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Gerenciar Tarefas</h1>
            <p className="text-muted-foreground text-xs mt-0.5">
              Acompanhe e organize as tarefas do seu dia a dia de recrutamento
            </p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus size={14} /> Nova Tarefa
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Pendentes",      value: countByStatus("Pendente"),       color: "text-slate-700" },
            { label: "Em andamento",   value: countByStatus("Em andamento"),   color: "text-blue-600" },
            { label: "Atrasadas",      value: countByStatus("Atrasada"),       color: "text-red-600" },
            { label: "Concluídas",     value: countByStatus("Concluída"),      color: "text-green-600" },
          ].map((k) => (
            <div key={k.label} className="rounded-xl bg-white border border-blue-300 p-4">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">{k.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${k.color}`}>{k.value}</p>
            </div>
          ))}
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar tarefa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border bg-white pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <div className="flex gap-1.5">
            {["Todos", "Pendente", "Em andamento", "Atrasada", "Concluída"].map((s) => (
              <button
                key={s}
                onClick={() => setFiltroStatus(s)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  filtroStatus === s
                    ? "bg-[#243c7e] text-white"
                    : "bg-white border border-blue-300 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de tarefas */}
        <div className="space-y-3">
          {filtered.map((t) => {
            const cfg = statusConfig[t.status];
            const StatusIcon = cfg.icon;
            return (
              <div key={t.id} className="rounded-xl bg-white border border-blue-300 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <StatusIcon size={18} className={`mt-0.5 shrink-0 ${cfg.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className={`text-sm font-semibold ${t.status === "Concluída" ? "text-slate-400 line-through" : "text-slate-900"}`}>
                          {t.titulo}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">{t.descricao}</p>
                      </div>
                      <button className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors shrink-0">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.badge}`}>
                        {t.status}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${prioridadeColor[t.prioridade]}`}>
                        {t.prioridade}
                      </span>
                      {t.vaga && (
                        <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Tag size={9} /> {t.vaga}
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <User size={9} /> {t.responsavel}
                      </span>
                      <span className={`text-[10px] flex items-center gap-1 ${t.status === "Atrasada" ? "text-red-500 font-semibold" : "text-slate-400"}`}>
                        <Calendar size={9} /> {t.prazo}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <CheckCircle2 size={40} className="mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-500">Nenhuma tarefa encontrada</p>
            <p className="text-xs text-slate-400 mt-1">Tente buscar por outro termo ou filtro</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GerenciarTarefas;
