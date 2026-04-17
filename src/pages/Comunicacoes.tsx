import { useState } from "react";
import {
  Plus, Search, Send, Mail, MessageSquare,
  Calendar, Users, Eye, Edit, Trash2,
  Clock, CheckCircle2, AlertCircle,
} from "lucide-react";

interface Comunicacao {
  id: number;
  titulo: string;
  tipo: "E-mail" | "SMS" | "WhatsApp" | "Notificação";
  destinatarios: string;
  qtdDestinatarios: number;
  dataEnvio: string;
  status: "Enviada" | "Agendada" | "Rascunho" | "Falha";
  taxaAbertura?: string;
  conteudoPreview: string;
}

const comunicacoes: Comunicacao[] = [
  {
    id: 1,
    titulo: "Convite para Processo Seletivo — Desenvolvedores",
    tipo: "E-mail",
    destinatarios: "Lista: Desenvolvedores Full-stack",
    qtdDestinatarios: 45,
    dataEnvio: "14/04/2026 09:00",
    status: "Enviada",
    taxaAbertura: "62%",
    conteudoPreview: "Olá! Temos uma oportunidade exclusiva para desenvolvedores...",
  },
  {
    id: 2,
    titulo: "Lembrete de Entrevista",
    tipo: "WhatsApp",
    destinatarios: "Candidatos com entrevista amanhã",
    qtdDestinatarios: 8,
    dataEnvio: "16/04/2026 18:00",
    status: "Agendada",
    conteudoPreview: "Oi, {nome}! Lembrando da sua entrevista amanhã às {hora}...",
  },
  {
    id: 3,
    titulo: "Feedback — Processo Analista de Marketing",
    tipo: "E-mail",
    destinatarios: "Candidatos não aprovados — Analista de Marketing",
    qtdDestinatarios: 24,
    dataEnvio: "12/04/2026 14:00",
    status: "Enviada",
    taxaAbertura: "78%",
    conteudoPreview: "Prezado(a), agradecemos sua participação no nosso processo...",
  },
  {
    id: 4,
    titulo: "Nova vaga — UX Designer Senior",
    tipo: "E-mail",
    destinatarios: "Lista: Designers UX/UI",
    qtdDestinatarios: 32,
    dataEnvio: "",
    status: "Rascunho",
    conteudoPreview: "Estamos com uma nova oportunidade para UX Designers...",
  },
  {
    id: 5,
    titulo: "Confirmação de inscrição",
    tipo: "SMS",
    destinatarios: "Candidatos — Programa de estágio",
    qtdDestinatarios: 120,
    dataEnvio: "10/04/2026 10:30",
    status: "Enviada",
    taxaAbertura: "95%",
    conteudoPreview: "Sua inscrição foi recebida! Acompanhe pelo portal...",
  },
];

const statusConfig: Record<string, { icon: typeof Clock; color: string }> = {
  Enviada:  { icon: CheckCircle2, color: "text-green-500" },
  Agendada: { icon: Clock,        color: "text-blue-500"  },
  Rascunho: { icon: Edit,         color: "text-amber-500" },
  Falha:    { icon: AlertCircle,   color: "text-red-500"   },
};

const tipoIcon: Record<string, typeof Mail> = {
  "E-mail": Mail,
  SMS: MessageSquare,
  WhatsApp: MessageSquare,
  "Notificação": Send,
};

const statusBadge: Record<string, string> = {
  Enviada:  "bg-green-500/10 text-green-600",
  Agendada: "bg-blue-500/10 text-blue-600",
  Rascunho: "bg-amber-500/10 text-amber-600",
  Falha:    "bg-red-500/10 text-red-600",
};

const Comunicacoes = () => {
  const [search, setSearch] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("Todos");

  const filtered = comunicacoes.filter((c) => {
    const matchSearch = c.titulo.toLowerCase().includes(search.toLowerCase());
    const matchTipo = filtroTipo === "Todos" || c.tipo === filtroTipo;
    return matchSearch && matchTipo;
  });

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Comunicações</h1>
            <p className="text-muted-foreground text-xs mt-0.5">
              Envie mensagens e gerencie a comunicação com seus candidatos
            </p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus size={14} /> Nova Comunicação
          </button>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar comunicação..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border bg-white pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <div className="flex gap-1.5">
            {["Todos", "E-mail", "WhatsApp", "SMS"].map((t) => (
              <button
                key={t}
                onClick={() => setFiltroTipo(t)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  filtroTipo === t
                    ? "bg-[#243c7e] text-white"
                    : "bg-white border border-blue-300 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-xl bg-white border border-blue-300 p-4">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Total Enviadas</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">189</p>
            <p className="text-[11px] text-slate-400 mt-1">este mês</p>
          </div>
          <div className="rounded-xl bg-white border border-blue-300 p-4">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Taxa de Abertura</p>
            <p className="text-2xl font-extrabold text-[#243c7e] mt-1">72%</p>
            <p className="text-[11px] text-slate-400 mt-1">média geral</p>
          </div>
          <div className="rounded-xl bg-white border border-blue-300 p-4">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Agendadas</p>
            <p className="text-2xl font-extrabold text-blue-600 mt-1">3</p>
            <p className="text-[11px] text-slate-400 mt-1">próximos 7 dias</p>
          </div>
          <div className="rounded-xl bg-white border border-blue-300 p-4">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Rascunhos</p>
            <p className="text-2xl font-extrabold text-amber-600 mt-1">1</p>
            <p className="text-[11px] text-slate-400 mt-1">pendentes</p>
          </div>
        </div>

        {/* Lista */}
        <div className="rounded-xl bg-white border border-blue-300 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filtered.map((c) => {
              const TipoIcon = tipoIcon[c.tipo] || Send;
              const cfg = statusConfig[c.status];
              const StatusIcon = cfg.icon;
              return (
                <div key={c.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-[#243c7e]/10 flex items-center justify-center shrink-0">
                    <TipoIcon size={18} className="text-[#243c7e]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-slate-900 truncate">{c.titulo}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Users size={10} /> {c.qtdDestinatarios} destinatários
                      </span>
                      {c.dataEnvio && (
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Calendar size={10} /> {c.dataEnvio}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {c.taxaAbertura && (
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-900">{c.taxaAbertura}</p>
                        <p className="text-[10px] text-slate-400">abertura</p>
                      </div>
                    )}
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusBadge[c.status]}`}>
                      {c.status}
                    </span>
                    <div className="flex items-center gap-0.5">
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-[#243c7e] hover:bg-[#243c7e]/10 transition-colors" title="Visualizar">
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-[#243c7e] hover:bg-[#243c7e]/10 transition-colors" title="Editar">
                        <Edit size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Send size={40} className="mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-500">Nenhuma comunicação encontrada</p>
            <p className="text-xs text-slate-400 mt-1">Tente buscar por outro termo ou filtro</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comunicacoes;
