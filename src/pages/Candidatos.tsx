import { useState } from "react";
import { Search, Briefcase, MapPin, GraduationCap, Star, ChevronDown, ChevronUp } from "lucide-react";

const candidatos = [
  {
    id: 1,
    nome: "Lucas Ferreira",
    cargo: "Desenvolvedor Front-end",
    cidade: "São Paulo, SP",
    formacao: "Ciência da Computação",
    experiencia: "4 anos",
    status: "Ativo",
    aplicacoes: 3,
    vagas: [
      { titulo: "Desenvolvedor Front-end Pleno", etapa: "Teste Técnico", data: "08/04/2026" },
      { titulo: "Desenvolvedor Full-stack", etapa: "Triagem", data: "10/04/2026" },
      { titulo: "Engenheiro de Software", etapa: "Entrevista RH", data: "05/04/2026" },
    ],
  },
  {
    id: 2,
    nome: "Beatriz Santos",
    cargo: "Analista de Marketing",
    cidade: "Remoto",
    formacao: "Publicidade e Propaganda",
    experiencia: "3 anos",
    status: "Ativo",
    aplicacoes: 2,
    vagas: [
      { titulo: "Analista de Marketing Digital", etapa: "Entrevista RH", data: "09/04/2026" },
      { titulo: "Coordenador de Conteúdo", etapa: "Triagem", data: "11/04/2026" },
    ],
  },
  {
    id: 3,
    nome: "Rafael Oliveira",
    cargo: "Analista de Dados",
    cidade: "Belo Horizonte, MG",
    formacao: "Estatística",
    experiencia: "2 anos",
    status: "Ativo",
    aplicacoes: 1,
    vagas: [
      { titulo: "Analista de Dados Jr.", etapa: "Entrevista Final", data: "07/04/2026" },
    ],
  },
  {
    id: 4,
    nome: "Camila Torres",
    cargo: "UX Designer",
    cidade: "Rio de Janeiro, RJ",
    formacao: "Design Gráfico",
    experiencia: "5 anos",
    status: "Ativo",
    aplicacoes: 2,
    vagas: [
      { titulo: "UX Designer Senior", etapa: "Portfólio", data: "06/04/2026" },
      { titulo: "Product Designer", etapa: "Triagem", data: "12/04/2026" },
    ],
  },
  {
    id: 5,
    nome: "Diego Almeida",
    cargo: "Product Manager",
    cidade: "São Paulo, SP",
    formacao: "Administração",
    experiencia: "6 anos",
    status: "Ativo",
    aplicacoes: 1,
    vagas: [
      { titulo: "Product Manager", etapa: "Painel", data: "04/04/2026" },
    ],
  },
  {
    id: 6,
    nome: "Mariana Lima",
    cargo: "Desenvolvedora Back-end",
    cidade: "Remoto",
    formacao: "Sistemas de Informação",
    experiencia: "7 anos",
    status: "Ativo",
    aplicacoes: 2,
    vagas: [
      { titulo: "Desenvolvedor Back-end Sênior", etapa: "Entrevista RH", data: "11/04/2026" },
      { titulo: "Tech Lead", etapa: "Triagem", data: "13/04/2026" },
    ],
  },
  {
    id: 7,
    nome: "Pedro Nascimento",
    cargo: "Analista de Marketing",
    cidade: "Curitiba, PR",
    formacao: "Marketing",
    experiencia: "1 ano",
    status: "Inativo",
    aplicacoes: 1,
    vagas: [
      { titulo: "Analista de Marketing Digital", etapa: "Triagem", data: "03/04/2026" },
    ],
  },
  {
    id: 8,
    nome: "Juliana Costa",
    cargo: "Desenvolvedora Front-end",
    cidade: "São Paulo, SP",
    formacao: "Engenharia de Software",
    experiencia: "3 anos",
    status: "Ativo",
    aplicacoes: 3,
    vagas: [
      { titulo: "Desenvolvedor Front-end Pleno", etapa: "Proposta", data: "01/04/2026" },
      { titulo: "Desenvolvedor Full-stack", etapa: "Entrevista Final", data: "08/04/2026" },
      { titulo: "Analista de Sistemas", etapa: "Triagem", data: "12/04/2026" },
    ],
  },
  {
    id: 9,
    nome: "Thiago Rodrigues",
    cargo: "Designer UX/UI",
    cidade: "Remoto",
    formacao: "Design Digital",
    experiencia: "4 anos",
    status: "Ativo",
    aplicacoes: 1,
    vagas: [
      { titulo: "UX Designer Senior", etapa: "Entrevista", data: "10/04/2026" },
    ],
  },
  {
    id: 10,
    nome: "Aline Pereira",
    cargo: "Analista de Dados",
    cidade: "Porto Alegre, RS",
    formacao: "Ciência de Dados",
    experiencia: "3 anos",
    status: "Inativo",
    aplicacoes: 2,
    vagas: [
      { titulo: "Analista de Dados Jr.", etapa: "Reprovado", data: "20/03/2026" },
      { titulo: "Cientista de Dados", etapa: "Triagem", data: "09/04/2026" },
    ],
  },
];

const etapaStyle: Record<string, string> = {
  Triagem: "bg-blue-500/10 text-blue-600",
  "Entrevista RH": "bg-purple-500/10 text-purple-600",
  "Teste Técnico": "bg-amber-500/10 text-amber-600",
  Portfólio: "bg-amber-500/10 text-amber-600",
  Case: "bg-amber-500/10 text-amber-600",
  "Entrevista Final": "bg-orange-500/10 text-orange-600",
  "Entrevista": "bg-orange-500/10 text-orange-600",
  Painel: "bg-orange-500/10 text-orange-600",
  Proposta: "bg-green-500/10 text-green-600",
  Contratado: "bg-green-600/10 text-green-700",
  Reprovado: "bg-red-500/10 text-red-600",
};

const Candidatos = () => {
  const [search, setSearch] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtrados = candidatos.filter((c) => {
    const matchSearch =
      c.nome.toLowerCase().includes(search.toLowerCase()) ||
      c.cargo.toLowerCase().includes(search.toLowerCase()) ||
      c.cidade.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filtroStatus ? c.status === filtroStatus : true;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Candidatos</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {candidatos.length} candidatos cadastrados · {candidatos.reduce((a, c) => a + c.aplicacoes, 0)} aplicações no total
            </p>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Candidatos", value: candidatos.length, color: "text-foreground" },
            { label: "Ativos", value: candidatos.filter((c) => c.status === "Ativo").length, color: "text-green-600" },
            { label: "Inativos", value: candidatos.filter((c) => c.status === "Inativo").length, color: "text-muted-foreground" },
            { label: "Média de Aplicações", value: (candidatos.reduce((a, c) => a + c.aplicacoes, 0) / candidatos.length).toFixed(1), color: "text-primary" },
          ].map((k) => (
            <div key={k.label} className="rounded-xl border bg-card p-4 text-center">
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
              placeholder="Buscar por nome, cargo ou cidade..."
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
            <option value="">Todos</option>
            <option>Ativo</option>
            <option>Inativo</option>
          </select>
        </div>

        {/* List */}
        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 border-b bg-muted/40 px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            <div className="col-span-3">Candidato</div>
            <div className="col-span-2">Cargo pretendido</div>
            <div className="col-span-2">Formação</div>
            <div className="col-span-1 text-center">Exp.</div>
            <div className="col-span-2 text-center">Aplicações</div>
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-1" />
          </div>

          {filtrados.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">Nenhum candidato encontrado.</div>
          )}

          {filtrados.map((c) => {
            const expanded = expandedId === c.id;
            return (
              <div key={c.id} className="border-b last:border-b-0">
                <div
                  className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center px-5 py-4 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => setExpandedId(expanded ? null : c.id)}
                >
                  {/* Candidato */}
                  <div className="md:col-span-3 flex items-center gap-3">
                    <div className="h-9 w-9 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {c.nome.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{c.nome}</p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin size={10} />{c.cidade}
                      </p>
                    </div>
                  </div>

                  {/* Cargo */}
                  <div className="md:col-span-2 text-sm text-muted-foreground hidden md:block">{c.cargo}</div>

                  {/* Formação */}
                  <div className="md:col-span-2 hidden md:flex items-center gap-1 text-xs text-muted-foreground">
                    <GraduationCap size={12} />{c.formacao}
                  </div>

                  {/* Experiência */}
                  <div className="md:col-span-1 text-center hidden md:block text-xs text-muted-foreground">{c.experiencia}</div>

                  {/* Aplicações */}
                  <div className="md:col-span-2 hidden md:flex justify-center items-center gap-1.5">
                    <Briefcase size={13} className="text-muted-foreground" />
                    <span className="font-bold text-sm">{c.aplicacoes}</span>
                    <span className="text-xs text-muted-foreground">{c.aplicacoes === 1 ? "vaga" : "vagas"}</span>
                  </div>

                  {/* Status */}
                  <div className="md:col-span-1 hidden md:flex justify-center">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      c.status === "Ativo" ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"
                    }`}>
                      {c.status}
                    </span>
                  </div>

                  {/* Expand */}
                  <div className="md:col-span-1 hidden md:flex justify-end">
                    {expanded
                      ? <ChevronUp size={14} className="text-muted-foreground" />
                      : <ChevronDown size={14} className="text-muted-foreground" />}
                  </div>
                </div>

                {/* Vagas aplicadas */}
                {expanded && (
                  <div className="border-t bg-muted/20 px-6 py-4">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
                      Vagas Aplicadas ({c.vagas.length})
                    </p>
                    <div className="space-y-2">
                      {c.vagas.map((v, i) => (
                        <div key={i} className="flex items-center justify-between rounded-lg border bg-card px-4 py-3">
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
    </div>
  );
};

export default Candidatos;
