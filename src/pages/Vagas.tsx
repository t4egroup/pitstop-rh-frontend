import { useState, useMemo } from "react";
import {
  Search, MapPin, Briefcase, Clock, DollarSign,
  SlidersHorizontal, X, Building2, BookmarkPlus, ChevronDown,
} from "lucide-react";

/* ── Types ── */
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  modality: "Remoto" | "Híbrido" | "Presencial";
  type: "CLT" | "PJ" | "Estágio" | "Temporário";
  area: string;
  salary: string;
  salaryMin: number;
  tags: string[];
  posted: string;
  description: string;
}

/* ── Mock data ── */
const allJobs: Job[] = [
  {
    id: 1, title: "Desenvolvedor Front-end Pleno", company: "Inovatech",
    location: "São Paulo, SP", modality: "Híbrido", type: "CLT", area: "TI",
    salary: "R$ 6.000 – 9.000", salaryMin: 6000,
    tags: ["React", "TypeScript", "Tailwind"],
    posted: "Há 2 dias",
    description: "Buscamos um desenvolvedor front-end para compor nosso time de produto, trabalhando em features de alto impacto para nossos clientes.",
  },
  {
    id: 2, title: "Analista de Marketing Digital", company: "Tech Corp",
    location: "São Paulo, SP", modality: "Presencial", type: "CLT", area: "Marketing",
    salary: "R$ 4.000 – 6.000", salaryMin: 4000,
    tags: ["SEO", "Google Ads", "Meta Ads"],
    posted: "Há 3 dias",
    description: "Responsável por planejamento e execução de campanhas digitais, análise de métricas e otimização de ROI.",
  },
  {
    id: 3, title: "UX Designer Sênior", company: "DesignLab",
    location: "Remoto", modality: "Remoto", type: "PJ", area: "Design",
    salary: "R$ 8.000 – 12.000", salaryMin: 8000,
    tags: ["Figma", "Design System", "Pesquisa"],
    posted: "Há 1 dia",
    description: "Procuramos um UX Designer experiente para liderar iniciativas de design centrado no usuário em produtos B2B.",
  },
  {
    id: 4, title: "Analista de RH Pleno", company: "PitStop RH",
    location: "São Paulo, SP", modality: "Híbrido", type: "CLT", area: "RH",
    salary: "R$ 4.500 – 6.500", salaryMin: 4500,
    tags: ["Recrutamento", "People Analytics", "DHO"],
    posted: "Há 5 dias",
    description: "Atuação em processos de recrutamento e seleção, desenvolvimento organizacional e projetos de cultura.",
  },
  {
    id: 5, title: "Desenvolvedor Back-end Node.js", company: "StartupX",
    location: "Remoto", modality: "Remoto", type: "PJ", area: "TI",
    salary: "R$ 9.000 – 14.000", salaryMin: 9000,
    tags: ["Node.js", "PostgreSQL", "AWS"],
    posted: "Há 1 dia",
    description: "Desenvolvimento de microsserviços e APIs REST escaláveis para uma plataforma de pagamentos em crescimento.",
  },
  {
    id: 6, title: "Assistente Financeiro", company: "Grupo Alfa",
    location: "Rio de Janeiro, RJ", modality: "Presencial", type: "CLT", area: "Financeiro",
    salary: "R$ 2.500 – 3.500", salaryMin: 2500,
    tags: ["Excel", "Conciliação", "ERP"],
    posted: "Há 4 dias",
    description: "Suporte às rotinas financeiras, lançamentos contábeis e conciliação bancária.",
  },
  {
    id: 7, title: "Estágio em Desenvolvimento Web", company: "Agência Z",
    location: "São Paulo, SP", modality: "Híbrido", type: "Estágio", area: "TI",
    salary: "R$ 1.500 – 2.000", salaryMin: 1500,
    tags: ["HTML", "CSS", "JavaScript"],
    posted: "Há 6 dias",
    description: "Oportunidade para estudantes de cursos de TI. Atuação no desenvolvimento de sites e landing pages.",
  },
  {
    id: 8, title: "Gerente de Produto (PM)", company: "DataCo",
    location: "Remoto", modality: "Remoto", type: "CLT", area: "Produto",
    salary: "R$ 12.000 – 18.000", salaryMin: 12000,
    tags: ["Product Discovery", "OKR", "Roadmap"],
    posted: "Há 2 dias",
    description: "Responsável por definir e executar a visão de produto de uma plataforma de analytics utilizada por grandes empresas.",
  },
  {
    id: 9, title: "Representante Comercial", company: "VendeMais",
    location: "Curitiba, PR", modality: "Presencial", type: "CLT", area: "Comercial",
    salary: "R$ 3.000 + comissão", salaryMin: 3000,
    tags: ["Vendas", "B2B", "CRM"],
    posted: "Há 3 dias",
    description: "Prospecção e gestão de clientes B2B, atingimento de metas mensais e manutenção de carteira.",
  },
  {
    id: 10, title: "Analista de Dados Jr.", company: "DataCo",
    location: "São Paulo, SP", modality: "Híbrido", type: "CLT", area: "TI",
    salary: "R$ 4.000 – 6.000", salaryMin: 4000,
    tags: ["Python", "SQL", "Power BI"],
    posted: "Há 7 dias",
    description: "Análise e visualização de dados, criação de dashboards e apoio às áreas de negócio com insights acionáveis.",
  },
  {
    id: 11, title: "Designer Gráfico Pleno", company: "Agência Z",
    location: "São Paulo, SP", modality: "Presencial", type: "CLT", area: "Design",
    salary: "R$ 3.500 – 5.000", salaryMin: 3500,
    tags: ["Illustrator", "Photoshop", "Branding"],
    posted: "Há 5 dias",
    description: "Criação de materiais gráficos para campanhas digitais e offline, identidade visual e peças institucionais.",
  },
  {
    id: 12, title: "DevOps Engineer", company: "Inovatech",
    location: "Remoto", modality: "Remoto", type: "PJ", area: "TI",
    salary: "R$ 11.000 – 16.000", salaryMin: 11000,
    tags: ["Docker", "Kubernetes", "CI/CD"],
    posted: "Há 1 dia",
    description: "Gestão de infraestrutura cloud, pipelines de CI/CD e observabilidade para sistemas de alta disponibilidade.",
  },
];

/* ── Filter options ── */
const areas      = ["Todas", "TI", "Marketing", "Design", "RH", "Financeiro", "Produto", "Comercial"];
const modalities = ["Todas", "Remoto", "Híbrido", "Presencial"];
const types      = ["Todos", "CLT", "PJ", "Estágio", "Temporário"];
const salaryRanges = [
  { label: "Qualquer faixa", min: 0 },
  { label: "A partir de R$ 3.000", min: 3000 },
  { label: "A partir de R$ 6.000", min: 6000 },
  { label: "A partir de R$ 9.000", min: 9000 },
  { label: "A partir de R$ 12.000", min: 12000 },
];

/* ── Filter pill ── */
const Pill = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <span className="inline-flex items-center gap-1 rounded-full border bg-primary/5 text-primary px-2.5 py-0.5 text-xs font-medium">
    {label}
    <button onClick={onRemove} className="hover:text-destructive transition-colors">
      <X size={11} />
    </button>
  </span>
);

/* ── Job card ── */
const modalityColor: Record<string, string> = {
  Remoto:     "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
  Híbrido:    "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800",
  Presencial: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
};

const JobCard = ({ job }: { job: Job }) => (
  <div className="group rounded-xl border bg-card p-5 flex flex-col gap-3 hover:shadow-md hover:border-primary/30 transition-all">
    {/* Header */}
    <div className="flex items-start gap-3">
      <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
        {job.company[0]}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors">{job.title}</h3>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
          <Building2 size={11} />{job.company}
        </p>
      </div>
      <button className="shrink-0 text-muted-foreground hover:text-primary transition-colors">
        <BookmarkPlus size={16} />
      </button>
    </div>

    {/* Description */}
    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{job.description}</p>

    {/* Tags */}
    <div className="flex flex-wrap gap-1.5">
      {job.tags.map(tag => (
        <span key={tag} className="rounded-md border bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          {tag}
        </span>
      ))}
    </div>

    {/* Meta */}
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground pt-1 border-t">
      <span className="flex items-center gap-1"><MapPin size={11} />{job.location}</span>
      <span className="flex items-center gap-1"><DollarSign size={11} />{job.salary}</span>
      <span className="flex items-center gap-1"><Briefcase size={11} />{job.type}</span>
      <span className="flex items-center gap-1 ml-auto"><Clock size={11} />{job.posted}</span>
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between pt-1">
      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${modalityColor[job.modality]}`}>
        {job.modality}
      </span>
      <button className="rounded-lg bg-primary px-4 py-1.5 text-xs font-bold text-white hover:opacity-90 transition-opacity">
        Candidatar-se
      </button>
    </div>
  </div>
);

/* ── Select helper ── */
const FilterSelect = ({
  label, value, options, onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) => (
  <div className="relative">
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full appearance-none rounded-xl border bg-card px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
    <span className="sr-only">{label}</span>
  </div>
);

/* ── Page ── */
const Vagas = () => {
  const [search,      setSearch]      = useState("");
  const [area,        setArea]        = useState("Todas");
  const [modality,    setModality]    = useState("Todas");
  const [type,        setType]        = useState("Todos");
  const [salaryMin,   setSalaryMin]   = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return allJobs.filter(j => {
      if (search && !`${j.title} ${j.company} ${j.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (area     !== "Todas" && j.area     !== area)     return false;
      if (modality !== "Todas" && j.modality !== modality) return false;
      if (type     !== "Todos" && j.type     !== type)     return false;
      if (j.salaryMin < salaryMin) return false;
      return true;
    });
  }, [search, area, modality, type, salaryMin]);

  /* active filter pills */
  const activePills: { label: string; clear: () => void }[] = [
    ...(area     !== "Todas"  ? [{ label: area,     clear: () => setArea("Todas")      }] : []),
    ...(modality !== "Todas"  ? [{ label: modality, clear: () => setModality("Todas")  }] : []),
    ...(type     !== "Todos"  ? [{ label: type,     clear: () => setType("Todos")      }] : []),
    ...(salaryMin > 0         ? [{ label: `≥ R$ ${salaryMin.toLocaleString("pt-BR")}`, clear: () => setSalaryMin(0) }] : []),
  ];

  const clearAll = () => {
    setSearch(""); setArea("Todas"); setModality("Todas");
    setType("Todos"); setSalaryMin(0);
  };

  return (
    <div className="container max-w-6xl py-8 space-y-6">

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-extrabold">Vagas disponíveis</h1>
        <p className="text-sm text-muted-foreground mt-1">Encontre oportunidades alinhadas com o seu perfil.</p>
      </div>

      {/* Search bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por cargo, empresa ou habilidade..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl border bg-card pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowFilters(v => !v)}
          className={`lg:hidden flex items-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${showFilters ? "bg-primary text-white border-primary" : "hover:bg-muted"}`}
        >
          <SlidersHorizontal size={15} />
          Filtros
          {activePills.length > 0 && (
            <span className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-primary text-[10px] font-bold">
              {activePills.length}
            </span>
          )}
        </button>
      </div>

      <div className="flex gap-6 items-start">

        {/* ── Sidebar filters ── */}
        <aside className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-56 shrink-0 space-y-4`}>
          <div className="rounded-xl border bg-card p-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold flex items-center gap-1.5">
                <SlidersHorizontal size={14} className="text-primary" />
                Filtros
              </p>
              {activePills.length > 0 && (
                <button onClick={clearAll} className="text-xs text-destructive hover:underline">
                  Limpar
                </button>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Área</label>
              <FilterSelect label="Área" value={area} options={areas} onChange={setArea} />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Modalidade</label>
              <FilterSelect label="Modalidade" value={modality} options={modalities} onChange={setModality} />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Tipo de contrato</label>
              <FilterSelect label="Tipo" value={type} options={types} onChange={setType} />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Faixa Salarial</label>
              <FilterSelect
                label="Salário"
                value={salaryRanges.find(r => r.min === salaryMin)?.label ?? "Qualquer faixa"}
                options={salaryRanges.map(r => r.label)}
                onChange={v => setSalaryMin(salaryRanges.find(r => r.label === v)?.min ?? 0)}
              />
            </div>
          </div>
        </aside>

        {/* ── Results ── */}
        <div className="flex-1 min-w-0 space-y-4">

          {/* Results header */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "vaga encontrada" : "vagas encontradas"}
              </p>
              {activePills.map(p => (
                <Pill key={p.label} label={p.label} onRemove={p.clear} />
              ))}
            </div>
          </div>

          {/* Cards */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {filtered.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed py-16 text-center">
              <Search size={32} className="mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">Nenhuma vaga encontrada</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Tente ajustar os filtros ou o termo de busca.</p>
              <button onClick={clearAll} className="mt-4 text-xs text-primary hover:underline font-medium">
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vagas;
