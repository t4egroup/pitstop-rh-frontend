import { useState } from "react";
import {
  CheckCircle2, Clock, AlertCircle, FileText,
  User, Mail, Phone, Building2, Calendar,
  ChevronDown, ChevronUp, Plus, Search, MoreHorizontal,
} from "lucide-react";

const admissoes = [
  {
    id: 1,
    candidato: "Juliana Costa",
    cargo: "Desenvolvedora Front-end Pleno",
    departamento: "Tecnologia",
    responsavel: "Carlos Souza",
    dataAdmissao: "01/05/2026",
    dataInicio: "05/05/2026",
    regime: "CLT",
    salario: "R$ 9.200",
    email: "juliana.costa@email.com",
    telefone: "(11) 98765-4321",
    status: "Em andamento",
    etapas: [
      { nome: "Proposta aceita",          feito: true,  data: "10/04/2026" },
      { nome: "Documentação enviada",     feito: true,  data: "12/04/2026" },
      { nome: "Exame médico admissional", feito: true,  data: "14/04/2026" },
      { nome: "Assinatura do contrato",   feito: false, data: null         },
      { nome: "Cadastro no sistema",      feito: false, data: null         },
      { nome: "Onboarding agendado",      feito: false, data: null         },
    ],
  },
  {
    id: 2,
    candidato: "Diego Almeida",
    cargo: "Product Manager",
    departamento: "Produto",
    responsavel: "João Lima",
    dataAdmissao: "15/04/2026",
    dataInicio: "22/04/2026",
    regime: "CLT",
    salario: "R$ 14.500",
    email: "diego.almeida@email.com",
    telefone: "(11) 91234-5678",
    status: "Concluída",
    etapas: [
      { nome: "Proposta aceita",          feito: true, data: "01/04/2026" },
      { nome: "Documentação enviada",     feito: true, data: "03/04/2026" },
      { nome: "Exame médico admissional", feito: true, data: "05/04/2026" },
      { nome: "Assinatura do contrato",   feito: true, data: "08/04/2026" },
      { nome: "Cadastro no sistema",      feito: true, data: "10/04/2026" },
      { nome: "Onboarding agendado",      feito: true, data: "14/04/2026" },
    ],
  },
  {
    id: 3,
    candidato: "Mariana Lima",
    cargo: "Desenvolvedora Back-end Sênior",
    departamento: "Tecnologia",
    responsavel: "Ricardo Mendes",
    dataAdmissao: "20/05/2026",
    dataInicio: "26/05/2026",
    regime: "PJ",
    salario: "R$ 18.000",
    email: "mariana.lima@email.com",
    telefone: "(11) 99988-7766",
    status: "Aguardando documentos",
    etapas: [
      { nome: "Proposta aceita",          feito: true,  data: "12/04/2026" },
      { nome: "Documentação enviada",     feito: false, data: null         },
      { nome: "Exame médico admissional", feito: false, data: null         },
      { nome: "Assinatura do contrato",   feito: false, data: null         },
      { nome: "Cadastro no sistema",      feito: false, data: null         },
      { nome: "Onboarding agendado",      feito: false, data: null         },
    ],
  },
  {
    id: 4,
    candidato: "Rafael Oliveira",
    cargo: "Analista de Dados Jr.",
    departamento: "Dados",
    responsavel: "Fernanda Reis",
    dataAdmissao: "01/05/2026",
    dataInicio: "05/05/2026",
    regime: "CLT",
    salario: "R$ 5.800",
    email: "rafael.oliveira@email.com",
    telefone: "(31) 97654-3210",
    status: "Em andamento",
    etapas: [
      { nome: "Proposta aceita",          feito: true,  data: "11/04/2026" },
      { nome: "Documentação enviada",     feito: true,  data: "13/04/2026" },
      { nome: "Exame médico admissional", feito: false, data: null         },
      { nome: "Assinatura do contrato",   feito: false, data: null         },
      { nome: "Cadastro no sistema",      feito: false, data: null         },
      { nome: "Onboarding agendado",      feito: false, data: null         },
    ],
  },
];

const statusConfig: Record<string, { icon: typeof Clock; badge: string; iconCls: string }> = {
  "Em andamento":          { icon: Clock,        badge: "bg-amber-500/10 text-amber-600",     iconCls: "text-amber-500"    },
  "Concluída":             { icon: CheckCircle2, badge: "bg-green-500/10 text-green-600",     iconCls: "text-green-500"    },
  "Aguardando documentos": { icon: AlertCircle,  badge: "bg-blue-500/10 text-blue-600",       iconCls: "text-blue-500"     },
};

const Admissao = () => {
  const [search, setSearch] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtradas = admissoes.filter((a) => {
    const matchSearch =
      a.candidato.toLowerCase().includes(search.toLowerCase()) ||
      a.cargo.toLowerCase().includes(search.toLowerCase()) ||
      a.departamento.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filtroStatus ? a.status === filtroStatus : true;
    return matchSearch && matchStatus;
  });

  const counts = {
    total: admissoes.length,
    andamento: admissoes.filter((a) => a.status === "Em andamento").length,
    aguardando: admissoes.filter((a) => a.status === "Aguardando documentos").length,
    concluidas: admissoes.filter((a) => a.status === "Concluída").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Admissão</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Acompanhe o processo de admissão dos candidatos aprovados até o início na empresa
            </p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus size={15} /> Nova Admissão
          </button>
        </div>

        {/* Fluxo */}
        <div className="rounded-xl border bg-card p-4">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Etapas do processo</p>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {[
              "Proposta aceita",
              "Documentação",
              "Exame médico",
              "Assinatura do contrato",
              "Cadastro no sistema",
              "Onboarding",
            ].map((etapa, i, arr) => (
              <span key={etapa} className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary font-semibold">{etapa}</span>
                {i < arr.length - 1 && <span className="text-muted-foreground font-bold">→</span>}
              </span>
            ))}
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total",                   value: counts.total,      color: "text-foreground"      },
            { label: "Em andamento",             value: counts.andamento,  color: "text-amber-600"       },
            { label: "Aguardando documentos",    value: counts.aguardando, color: "text-blue-600"        },
            { label: "Concluídas",               value: counts.concluidas, color: "text-green-600"       },
          ].map((k) => (
            <div key={k.label} className="rounded-xl border bg-card p-4 text-center">
              <p className={`text-3xl font-extrabold ${k.color}`}>{k.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por candidato, cargo ou departamento..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border bg-card pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="rounded-lg border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">Todos os status</option>
            <option>Em andamento</option>
            <option>Aguardando documentos</option>
            <option>Concluída</option>
          </select>
        </div>

        {/* Lista */}
        <div className="space-y-3">
          {filtradas.length === 0 && (
            <div className="rounded-xl border bg-card py-12 text-center text-sm text-muted-foreground">
              Nenhuma admissão encontrada.
            </div>
          )}

          {filtradas.map((a) => {
            const cfg = statusConfig[a.status];
            const Icon = cfg.icon;
            const expanded = expandedId === a.id;
            const feitas = a.etapas.filter((e) => e.feito).length;
            const progresso = Math.round((feitas / a.etapas.length) * 100);

            return (
              <div key={a.id} className="rounded-xl border bg-card overflow-hidden">
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => setExpandedId(expanded ? null : a.id)}
                >
                  <Icon size={18} className={`shrink-0 ${cfg.iconCls}`} />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="font-semibold text-sm">{a.candidato}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.badge}`}>{a.status}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1"><FileText size={11} />{a.cargo}</span>
                      <span className="flex items-center gap-1"><Building2 size={11} />{a.departamento}</span>
                      <span className="flex items-center gap-1"><Calendar size={11} />Início: {a.dataInicio}</span>
                      <span className="font-medium text-foreground">{a.regime} · {a.salario}</span>
                    </div>
                    {/* Progress bar */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden max-w-[200px]">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${progresso}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{feitas}/{a.etapas.length} etapas</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal size={15} />
                    </button>
                    {expanded ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                  </div>
                </div>

                {/* Detalhe expandido */}
                {expanded && (
                  <div className="border-t bg-muted/10 px-5 py-5 space-y-5">

                    {/* Info do candidato */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User size={13} className="shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Responsável RH</p>
                          <p className="font-medium text-foreground">{a.responsavel}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail size={13} className="shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">E-mail</p>
                          <p className="font-medium text-foreground">{a.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone size={13} className="shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Telefone</p>
                          <p className="font-medium text-foreground">{a.telefone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar size={13} className="shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Data admissão</p>
                          <p className="font-medium text-foreground">{a.dataAdmissao}</p>
                        </div>
                      </div>
                    </div>

                    {/* Checklist de etapas */}
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Checklist de Admissão</p>
                      <div className="space-y-2">
                        {a.etapas.map((etapa, i) => (
                          <div key={i} className="flex items-center justify-between rounded-lg border bg-card px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${etapa.feito ? "bg-green-500" : "border-2 border-muted-foreground/30"}`}>
                                {etapa.feito && (
                                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                              </div>
                              <span className={`text-sm font-medium ${etapa.feito ? "line-through text-muted-foreground" : ""}`}>
                                {etapa.nome}
                              </span>
                            </div>
                            {etapa.data
                              ? <span className="text-xs text-muted-foreground">{etapa.data}</span>
                              : <span className="text-xs text-muted-foreground">Pendente</span>
                            }
                          </div>
                        ))}
                      </div>
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

export default Admissao;
