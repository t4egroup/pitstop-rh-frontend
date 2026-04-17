import { useState } from "react";
import { Search, MapPin, GraduationCap, ChevronDown, ChevronUp, Star } from "lucide-react";

const candidatos = [
  {
    id: 1, nome: "Lucas Ferreira",   cargo: "Desenvolvedor Front-end", cidade: "São Paulo, SP",    formacao: "Ciência da Computação", experiencia: "4 anos", status: "Em processo",
    vagas: [{ titulo: "Desenvolvedor Front-end Pleno", etapa: "Teste Técnico",   data: "08/04/2026" }],
  },
  {
    id: 2, nome: "Beatriz Santos",   cargo: "Analista de Marketing",   cidade: "Remoto",            formacao: "Publicidade e Prop.",   experiencia: "3 anos", status: "Em processo",
    vagas: [{ titulo: "Analista de Marketing Digital", etapa: "Entrevista RH",   data: "09/04/2026" }],
  },
  {
    id: 3, nome: "Rafael Oliveira",  cargo: "Analista de Dados",       cidade: "Belo Horizonte, MG",formacao: "Estatística",           experiencia: "2 anos", status: "Em processo",
    vagas: [{ titulo: "Analista de Dados Jr.",          etapa: "Entrevista Final",data: "07/04/2026" }],
  },
  {
    id: 4, nome: "Camila Torres",    cargo: "UX Designer",             cidade: "Rio de Janeiro, RJ",formacao: "Design Gráfico",        experiencia: "5 anos", status: "Em processo",
    vagas: [{ titulo: "UX Designer Senior",             etapa: "Portfólio",       data: "06/04/2026" }],
  },
  {
    id: 5, nome: "Diego Almeida",    cargo: "Product Manager",         cidade: "São Paulo, SP",    formacao: "Administração",         experiencia: "6 anos", status: "Em processo",
    vagas: [{ titulo: "Product Manager",                etapa: "Painel",           data: "04/04/2026" }],
  },
  {
    id: 6, nome: "Juliana Costa",    cargo: "Desenvolvedora Front-end",cidade: "São Paulo, SP",    formacao: "Eng. de Software",      experiencia: "3 anos", status: "Aprovado",
    vagas: [{ titulo: "Desenvolvedor Front-end Pleno", etapa: "Proposta",         data: "01/04/2026" }],
  },
  {
    id: 7, nome: "Thiago Rodrigues", cargo: "Designer UX/UI",          cidade: "Remoto",            formacao: "Design Digital",        experiencia: "4 anos", status: "Reprovado",
    vagas: [{ titulo: "UX Designer Senior",             etapa: "Reprovado",        data: "10/04/2026" }],
  },
];

const etapaStyle: Record<string, string> = {
  "Triagem":          "bg-blue-500/10 text-blue-600",
  "Entrevista RH":    "bg-blue-500/10 text-purple-600",
  "Teste Técnico":    "bg-amber-500/10 text-amber-600",
  "Portfólio":        "bg-amber-500/10 text-amber-600",
  "Entrevista Final": "bg-orange-500/10 text-orange-600",
  "Painel":           "bg-orange-500/10 text-orange-600",
  "Proposta":         "bg-emerald-500/10 text-emerald-600",
  "Aprovado":         "bg-emerald-600/10 text-emerald-700",
  "Reprovado":        "bg-red-500/10 text-red-600",
};

const statusStyle: Record<string, string> = {
  "Em processo": "bg-blue-500/10 text-blue-600",
  "Aprovado":    "bg-emerald-500/10 text-emerald-600",
  "Reprovado":   "bg-red-500/10 text-red-600",
};

const EmpresaCandidatos = () => {
  const [search,      setSearch]      = useState("");
  const [statusFiltro,setStatusFiltro]= useState("");
  const [expandedId,  setExpandedId]  = useState<number | null>(null);

  const filtrados = candidatos.filter(c => {
    const q = search.toLowerCase();
    if (search && !`${c.nome} ${c.cargo} ${c.cidade}`.toLowerCase().includes(q)) return false;
    if (statusFiltro && c.status !== statusFiltro) return false;
    return true;
  });

  return (
    <div className="container max-w-5xl py-8 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold">Candidatos</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {candidatos.length} candidatos nas suas vagas
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total",        value: candidatos.length,                                              color: "text-foreground"    },
          { label: "Em processo",  value: candidatos.filter(c => c.status === "Em processo").length,      color: "text-blue-500"      },
          { label: "Aprovados",    value: candidatos.filter(c => c.status === "Aprovado").length,         color: "text-emerald-500"   },
          { label: "Reprovados",   value: candidatos.filter(c => c.status === "Reprovado").length,        color: "text-destructive"   },
        ].map(k => (
          <div key={k.label} className="rounded-xl border bg-white p-4 text-center">
            <p className={`text-2xl font-extrabold ${k.color}`}>{k.value}</p>
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
            placeholder="Buscar por nome, cargo ou cidade..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl border bg-white pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <select
          value={statusFiltro}
          onChange={e => setStatusFiltro(e.target.value)}
          className="rounded-xl border bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="">Todos</option>
          <option>Em processo</option>
          <option>Aprovado</option>
          <option>Reprovado</option>
        </select>
      </div>

      {/* List */}
      <div className="rounded-xl border bg-white overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 border-b bg-muted/40 px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          <div className="col-span-3">Candidato</div>
          <div className="col-span-2">Cargo</div>
          <div className="col-span-2">Formação</div>
          <div className="col-span-1 text-center">Exp.</div>
          <div className="col-span-2 text-center">Vaga</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-1" />
        </div>

        {filtrados.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">Nenhum candidato encontrado.</p>
        )}

        {filtrados.map(c => {
          const expanded = expandedId === c.id;
          return (
            <div key={c.id} className="border-b last:border-b-0">
              <div
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center px-5 py-4 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setExpandedId(expanded ? null : c.id)}
              >
                <div className="md:col-span-3 flex items-center gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {c.nome[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{c.nome}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin size={10} />{c.cidade}</p>
                  </div>
                </div>
                <div className="md:col-span-2 hidden md:block text-sm text-muted-foreground">{c.cargo}</div>
                <div className="md:col-span-2 hidden md:flex items-center gap-1 text-xs text-muted-foreground"><GraduationCap size={12} />{c.formacao}</div>
                <div className="md:col-span-1 hidden md:block text-center text-xs text-muted-foreground">{c.experiencia}</div>
                <div className="md:col-span-2 hidden md:block text-center text-xs text-muted-foreground truncate px-1">{c.vagas[0]?.titulo}</div>
                <div className="md:col-span-1 hidden md:flex justify-center">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyle[c.status] ?? ""}`}>{c.status}</span>
                </div>
                <div className="md:col-span-1 hidden md:flex justify-end">
                  {expanded ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                </div>
              </div>

              {expanded && (
                <div className="border-t bg-muted/20 px-6 py-4">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Vagas ({c.vagas.length})</p>
                  <div className="space-y-2">
                    {c.vagas.map((v, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg border bg-white px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Star size={13} className="text-primary shrink-0" />
                          <div>
                            <p className="text-sm font-medium">{v.titulo}</p>
                            <p className="text-xs text-muted-foreground">Aplicado em {v.data}</p>
                          </div>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${etapaStyle[v.etapa] ?? "bg-muted text-muted-foreground"}`}>
                          {v.etapa}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmpresaCandidatos;
