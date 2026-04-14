import { useState } from "react";
import {
  Plus, Search, ChevronDown, ChevronUp,
  CheckCircle2, XCircle, Clock, AlertCircle,
  User, Building2, Calendar, DollarSign, MoreHorizontal,
} from "lucide-react";

const requisicoes = [
  {
    id: 1,
    cargo: "Desenvolvedor Front-end Pleno",
    departamento: "Tecnologia",
    solicitante: "Ricardo Mendes",
    cargo_solicitante: "Tech Lead",
    motivo: "Nova posição",
    descricao: "Necessitamos de um desenvolvedor front-end para reforçar o time de produto. A demanda de squads aumentou e a equipe atual não consegue cobrir todos os projetos em paralelo.",
    requisitos: ["React", "TypeScript", "3+ anos de experiência", "Inglês intermediário"],
    faixaSalarial: "R$ 7.000 – R$ 10.000",
    regime: "CLT",
    modelo: "Híbrido",
    local: "São Paulo, SP",
    prazoInicio: "01/05/2026",
    dataSolicitacao: "05/04/2026",
    status: "Aprovada",
    prioridade: "Alta",
    observacaoRH: "Aprovado. Processo seletivo já iniciado.",
  },
  {
    id: 2,
    cargo: "Analista de Marketing Digital",
    departamento: "Marketing",
    solicitante: "Fernanda Castro",
    cargo_solicitante: "Gerente de Marketing",
    motivo: "Substituição",
    descricao: "O colaborador atual pediu demissão. Precisamos de um substituto com experiência em campanhas pagas (Google Ads e Meta) e análise de métricas.",
    requisitos: ["Google Ads", "Meta Ads", "Google Analytics", "Graduação em Marketing ou Publicidade"],
    faixaSalarial: "R$ 4.500 – R$ 6.000",
    regime: "CLT",
    modelo: "Remoto",
    local: "Remoto",
    prazoInicio: "20/04/2026",
    dataSolicitacao: "07/04/2026",
    status: "Em análise",
    prioridade: "Alta",
    observacaoRH: "",
  },
  {
    id: 3,
    cargo: "Designer UX/UI",
    departamento: "Produto",
    solicitante: "Bruno Lima",
    cargo_solicitante: "Product Manager",
    motivo: "Nova posição",
    descricao: "Com o crescimento do produto, precisamos de um designer dedicado para conduzir pesquisas de usuário e criar protótipos. Atualmente o design está sendo feito pelo time de dev.",
    requisitos: ["Figma", "Pesquisa com usuários", "Design System", "Portfólio obrigatório"],
    faixaSalarial: "R$ 6.000 – R$ 8.500",
    regime: "PJ",
    modelo: "Híbrido",
    local: "São Paulo, SP",
    prazoInicio: "15/05/2026",
    dataSolicitacao: "09/04/2026",
    status: "Em análise",
    prioridade: "Média",
    observacaoRH: "",
  },
  {
    id: 4,
    cargo: "Analista Financeiro Jr.",
    departamento: "Financeiro",
    solicitante: "Carla Souza",
    cargo_solicitante: "Gerente Financeiro",
    motivo: "Expansão do time",
    descricao: "O volume de conciliações e relatórios financeiros aumentou com a abertura de novas unidades. Precisamos de um analista para apoiar nas rotinas do setor.",
    requisitos: ["Excel avançado", "Rotinas de conciliação", "Formação em Contabilidade ou Finanças"],
    faixaSalarial: "R$ 3.000 – R$ 4.500",
    regime: "CLT",
    modelo: "Presencial",
    local: "São Paulo, SP",
    prazoInicio: "01/06/2026",
    dataSolicitacao: "10/04/2026",
    status: "Pendente",
    prioridade: "Baixa",
    observacaoRH: "",
  },
  {
    id: 5,
    cargo: "Suporte Técnico N1",
    departamento: "Tecnologia",
    solicitante: "Ricardo Mendes",
    cargo_solicitante: "Tech Lead",
    motivo: "Nova posição",
    descricao: "Com o aumento da base de clientes, o time atual de suporte não consegue dar conta dos chamados. Buscamos alguém com boa comunicação e conhecimentos básicos de TI.",
    requisitos: ["Atendimento ao cliente", "Windows / Linux básico", "Pacote Office"],
    faixaSalarial: "R$ 2.000 – R$ 3.000",
    regime: "CLT",
    modelo: "Presencial",
    local: "São Paulo, SP",
    prazoInicio: "10/05/2026",
    dataSolicitacao: "11/04/2026",
    status: "Reprovada",
    prioridade: "Média",
    observacaoRH: "Orçamento não aprovado para este trimestre. Reavaliar em julho.",
  },
  {
    id: 6,
    cargo: "Coordenador de RH",
    departamento: "Recursos Humanos",
    solicitante: "Amanda Silva",
    cargo_solicitante: "Diretora de Pessoas",
    motivo: "Nova posição",
    descricao: "Precisamos de um coordenador para gerir os processos de onboarding, benefícios e clima organizacional, liberando a diretoria para projetos estratégicos.",
    requisitos: ["Gestão de pessoas", "DP e legislação trabalhista", "Ferramentas HRIS", "5+ anos de experiência"],
    faixaSalarial: "R$ 8.000 – R$ 11.000",
    regime: "CLT",
    modelo: "Híbrido",
    local: "São Paulo, SP",
    prazoInicio: "01/06/2026",
    dataSolicitacao: "12/04/2026",
    status: "Aprovada",
    prioridade: "Alta",
    observacaoRH: "Aprovado pela diretoria. Aguardando abertura do processo.",
  },
];

type Status = "Aprovada" | "Em análise" | "Pendente" | "Reprovada";

const statusConfig: Record<Status, { icon: typeof Clock; cls: string; badge: string }> = {
  Aprovada:   { icon: CheckCircle2, cls: "text-green-600",          badge: "bg-green-500/10 text-green-600" },
  "Em análise": { icon: Clock,       cls: "text-amber-600",          badge: "bg-amber-500/10 text-amber-600" },
  Pendente:   { icon: AlertCircle,  cls: "text-muted-foreground",   badge: "bg-muted text-muted-foreground" },
  Reprovada:  { icon: XCircle,      cls: "text-destructive",        badge: "bg-destructive/10 text-destructive" },
};

const prioridadeBadge: Record<string, string> = {
  Alta:  "bg-red-500/10 text-red-600",
  Média: "bg-amber-500/10 text-amber-600",
  Baixa: "bg-blue-500/10 text-blue-600",
};

const motivoBadge: Record<string, string> = {
  "Nova posição":     "bg-primary/10 text-primary",
  "Substituição":     "bg-purple-500/10 text-purple-600",
  "Expansão do time": "bg-teal-500/10 text-teal-600",
};

const Requisicoes = () => {
  const [search, setSearch] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [novaRequisicao, setNovaRequisicao] = useState(false);

  const filtradas = requisicoes.filter((r) => {
    const matchSearch =
      r.cargo.toLowerCase().includes(search.toLowerCase()) ||
      r.departamento.toLowerCase().includes(search.toLowerCase()) ||
      r.solicitante.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filtroStatus ? r.status === filtroStatus : true;
    return matchSearch && matchStatus;
  });

  const counts = {
    total: requisicoes.length,
    aprovadas: requisicoes.filter((r) => r.status === "Aprovada").length,
    analise: requisicoes.filter((r) => r.status === "Em análise").length,
    pendentes: requisicoes.filter((r) => r.status === "Pendente").length,
    reprovadas: requisicoes.filter((r) => r.status === "Reprovada").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Requisições de Vaga</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Solicitações formais de abertura de vaga feitas pelos gestores — revise e aprove para iniciar o processo seletivo
            </p>
          </div>
          <button
            onClick={() => setNovaRequisicao(true)}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus size={15} /> Nova Requisição
          </button>
        </div>

        {/* Fluxo explicativo */}
        <div className="rounded-xl border bg-card p-4">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Como funciona</p>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {[
              { step: "1", label: "Gestor solicita", color: "bg-primary/10 text-primary" },
              { step: "→", label: "", color: "" },
              { step: "2", label: "RH analisa", color: "bg-amber-500/10 text-amber-600" },
              { step: "→", label: "", color: "" },
              { step: "3", label: "Aprovação", color: "bg-green-500/10 text-green-600" },
              { step: "→", label: "", color: "" },
              { step: "4", label: "Processo seletivo aberto", color: "bg-purple-500/10 text-purple-600" },
            ].map((s, i) =>
              s.label ? (
                <span key={i} className={`px-3 py-1.5 rounded-full font-semibold ${s.color}`}>
                  {s.step} · {s.label}
                </span>
              ) : (
                <span key={i} className="text-muted-foreground font-bold">{s.step}</span>
              )
            )}
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { label: "Total", value: counts.total, color: "text-foreground" },
            { label: "Aprovadas", value: counts.aprovadas, color: "text-green-600" },
            { label: "Em análise", value: counts.analise, color: "text-amber-600" },
            { label: "Pendentes", value: counts.pendentes, color: "text-muted-foreground" },
            { label: "Reprovadas", value: counts.reprovadas, color: "text-destructive" },
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
              placeholder="Buscar por cargo, departamento ou solicitante..."
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
            <option>Aprovada</option>
            <option>Em análise</option>
            <option>Pendente</option>
            <option>Reprovada</option>
          </select>
        </div>

        {/* Lista */}
        <div className="space-y-3">
          {filtradas.length === 0 && (
            <div className="rounded-xl border bg-card py-12 text-center text-sm text-muted-foreground">
              Nenhuma requisição encontrada.
            </div>
          )}

          {filtradas.map((r) => {
            const cfg = statusConfig[r.status as Status];
            const Icon = cfg.icon;
            const expanded = expandedId === r.id;

            return (
              <div key={r.id} className="rounded-xl border bg-card overflow-hidden">
                {/* Row */}
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => setExpandedId(expanded ? null : r.id)}
                >
                  <Icon size={18} className={`shrink-0 ${cfg.cls}`} />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="font-semibold text-sm">{r.cargo}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${motivoBadge[r.motivo]}`}>
                        {r.motivo}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${prioridadeBadge[r.prioridade]}`}>
                        {r.prioridade}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Building2 size={11} />{r.departamento}</span>
                      <span className="flex items-center gap-1"><User size={11} />{r.solicitante} · {r.cargo_solicitante}</span>
                      <span className="flex items-center gap-1"><Calendar size={11} />Solicitado em {r.dataSolicitacao}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`hidden sm:inline-block text-xs px-2.5 py-1 rounded-full font-medium ${cfg.badge}`}>
                      {r.status}
                    </span>
                    <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted transition-colors" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal size={15} />
                    </button>
                    {expanded ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                  </div>
                </div>

                {/* Detalhe expandido */}
                {expanded && (
                  <div className="border-t bg-muted/10 px-5 py-5 space-y-5">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Regime</p>
                        <p className="text-sm font-medium">{r.regime}</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Modelo</p>
                        <p className="text-sm font-medium">{r.modelo}</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                          <DollarSign size={11} /> Faixa Salarial
                        </p>
                        <p className="text-sm font-medium">{r.faixaSalarial}</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Início desejado</p>
                        <p className="text-sm font-medium">{r.prazoInicio}</p>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Justificativa</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{r.descricao}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Requisitos solicitados</p>
                      <div className="flex flex-wrap gap-2">
                        {r.requisitos.map((req) => (
                          <span key={req} className="rounded-full border bg-background px-3 py-1 text-xs font-medium">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>

                    {r.observacaoRH && (
                      <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                        <p className="text-xs font-bold text-primary mb-1">Observação do RH</p>
                        <p className="text-sm text-muted-foreground">{r.observacaoRH}</p>
                      </div>
                    )}

                    {/* Ações do RH */}
                    {(r.status === "Em análise" || r.status === "Pendente") && (
                      <div className="flex gap-2 pt-1">
                        <button className="flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700 transition-colors">
                          <CheckCircle2 size={14} /> Aprovar
                        </button>
                        <button className="flex items-center gap-1.5 rounded-lg border border-destructive px-4 py-2 text-sm font-bold text-destructive hover:bg-destructive/10 transition-colors">
                          <XCircle size={14} /> Reprovar
                        </button>
                      </div>
                    )}

                    {r.status === "Aprovada" && (
                      <div className="flex gap-2 pt-1">
                        <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
                          <Plus size={14} /> Abrir Processo Seletivo
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal nova requisição (simplificado) */}
      {novaRequisicao && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-2xl border bg-card shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-bold">Nova Requisição de Vaga</h2>
              <button onClick={() => setNovaRequisicao(false)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Cargo</label>
                  <input type="text" placeholder="Ex: Desenvolvedor Front-end" className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Departamento</label>
                  <input type="text" placeholder="Ex: Tecnologia" className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Motivo</label>
                  <select className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                    <option>Nova posição</option>
                    <option>Substituição</option>
                    <option>Expansão do time</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Prioridade</label>
                  <select className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                    <option>Alta</option>
                    <option>Média</option>
                    <option>Baixa</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Faixa Salarial</label>
                  <input type="text" placeholder="Ex: R$ 5.000 – R$ 7.000" className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Início desejado</label>
                  <input type="date" className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Justificativa</label>
                <textarea rows={3} placeholder="Descreva o motivo da abertura desta vaga..." className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t">
              <button onClick={() => setNovaRequisicao(false)} className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors">
                Cancelar
              </button>
              <button onClick={() => setNovaRequisicao(false)} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
                Enviar Requisição
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requisicoes;
