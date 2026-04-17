import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, MapPin, Eye, UserPlus, Star, StarOff,
  ChevronDown, ChevronUp, SlidersHorizontal, X,
} from "lucide-react";

interface TalentoEmpresa {
  id: number;
  nome: string;
  cargo: string;
  area: string;
  cidade: string;
  uf: string;
  remoto: boolean;
  nivel: "Júnior" | "Pleno" | "Sênior" | "Especialista";
  status: "Disponível" | "Em processo" | "Contratado";
  skills: string[];
  salario: string;
  fonte: string;
  adicionadoEm: string;
  favorito: boolean;
}

const exemplos: TalentoEmpresa[] = [
  {
    id: 1,  nome: "Lucas Ferreira",    cargo: "Desenvolvedor Front-end",    area: "Tecnologia",  cidade: "São Paulo",      uf: "SP", remoto: false,
    nivel: "Pleno",       status: "Disponível",  skills: ["React", "TypeScript", "Tailwind"],
    salario: "R$ 7.000",  fonte: "Candidatura espontânea",  adicionadoEm: "10/01/2026", favorito: true,
  },
  {
    id: 3,  nome: "Rafael Oliveira",   cargo: "Analista de Dados",          area: "Tecnologia",  cidade: "Belo Horizonte", uf: "MG", remoto: false,
    nivel: "Sênior",      status: "Disponível",  skills: ["Python", "SQL", "Power BI"],
    salario: "R$ 9.000",  fonte: "Processo seletivo Dados 2025",  adicionadoEm: "15/02/2026", favorito: false,
  },
  {
    id: 5,  nome: "Diego Almeida",     cargo: "Product Manager",            area: "Produto",     cidade: "São Paulo",      uf: "SP", remoto: false,
    nivel: "Sênior",      status: "Em processo", skills: ["Roadmapping", "OKRs", "Agile"],
    salario: "R$ 12.000", fonte: "Indicação interna",           adicionadoEm: "03/03/2026", favorito: true,
  },
  {
    id: 7,  nome: "Felipe Cardoso",    cargo: "Analista de RH",             area: "RH",          cidade: "Curitiba",       uf: "PR", remoto: false,
    nivel: "Júnior",      status: "Disponível",  skills: ["Recrutamento", "HRBP", "Excel"],
    salario: "R$ 3.500",  fonte: "Candidatura espontânea",      adicionadoEm: "20/03/2026", favorito: false,
  },
  {
    id: 11, nome: "Bruno Nascimento",  cargo: "DevOps Engineer",            area: "Tecnologia",  cidade: "Remoto",         uf: "",   remoto: true,
    nivel: "Sênior",      status: "Disponível",  skills: ["AWS", "Kubernetes", "Terraform"],
    salario: "R$ 15.000", fonte: "LinkedIn Recruiter",          adicionadoEm: "28/03/2026", favorito: true,
  },
  {
    id: 22, nome: "Mônica Vieira",     cargo: "HRBP",                       area: "RH",          cidade: "São Paulo",      uf: "SP", remoto: false,
    nivel: "Pleno",       status: "Disponível",  skills: ["HRBP", "People Analytics", "Cultura"],
    salario: "R$ 8.000",  fonte: "Processo seletivo RH 2025",   adicionadoEm: "01/04/2026", favorito: false,
  },
  {
    id: 29, nome: "Gabriel Pinto",     cargo: "Dev Full Stack",             area: "Tecnologia",  cidade: "Porto Alegre",   uf: "RS", remoto: false,
    nivel: "Sênior",      status: "Disponível",  skills: ["React", "Node.js", "TypeScript"],
    salario: "R$ 13.000", fonte: "Indicação externa",           adicionadoEm: "05/04/2026", favorito: false,
  },
  {
    id: 32, nome: "Simone Alves",      cargo: "Gerente de Marketing",       area: "Marketing",   cidade: "São Paulo",      uf: "SP", remoto: false,
    nivel: "Especialista",status: "Em processo", skills: ["Brand Strategy", "Growth", "P&L"],
    salario: "R$ 15.000", fonte: "LinkedIn Recruiter",          adicionadoEm: "08/04/2026", favorito: true,
  },
  {
    id: 40, nome: "Helena Moura",      cargo: "Coordenadora Financeira",    area: "Financeiro",  cidade: "Florianópolis",  uf: "SC", remoto: false,
    nivel: "Sênior",      status: "Disponível",  skills: ["Tesouraria", "FP&A", "SAP"],
    salario: "R$ 12.000", fonte: "Candidatura espontânea",      adicionadoEm: "10/04/2026", favorito: false,
  },
  {
    id: 47, nome: "Victor Andrade",    cargo: "Growth Hacker",              area: "Marketing",   cidade: "São Paulo",      uf: "SP", remoto: false,
    nivel: "Pleno",       status: "Em processo", skills: ["Growth", "CRO", "SQL"],
    salario: "R$ 8.000",  fonte: "Candidatura espontânea",      adicionadoEm: "12/04/2026", favorito: false,
  },
];

const statusStyle: Record<string, string> = {
  "Disponível":   "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "Em processo":  "bg-blue-50 text-blue-700 border border-blue-200",
  "Contratado":   "bg-slate-100 text-slate-500 border border-slate-200",
};

const nivelStyle: Record<string, string> = {
  "Júnior":       "bg-sky-50 text-sky-600",
  "Pleno":        "bg-violet-50 text-violet-600",
  "Sênior":       "bg-amber-50 text-amber-600",
  "Especialista": "bg-rose-50 text-rose-600",
};

const fontes = [...new Set(exemplos.map(t => t.fonte))].sort();
const areas  = [...new Set(exemplos.map(t => t.area))].sort();
const niveis = ["Júnior", "Pleno", "Sênior", "Especialista"] as const;

const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-slate-100 pb-4 mb-4">
      <button onClick={() => setOpen(o => !o)} className="flex items-center justify-between w-full mb-3">
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">{title}</span>
        {open ? <ChevronUp size={13} className="text-slate-400" /> : <ChevronDown size={13} className="text-slate-400" />}
      </button>
      {open && children}
    </div>
  );
};

const CheckFilter = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
  <label className="flex items-center gap-2 cursor-pointer py-0.5 group">
    <div
      onClick={onChange}
      className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-colors ${checked ? "bg-primary border-primary" : "border-slate-300 group-hover:border-primary/50"}`}
    >
      {checked && <svg viewBox="0 0 10 8" className="w-2.5 h-2.5"><path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
    <span className="text-xs text-slate-600 group-hover:text-slate-900 transition-colors">{label}</span>
  </label>
);

const PortalTalentos = () => {
  const navigate = useNavigate();
  const [talentos, setTalentos] = useState(exemplos);
  const [search, setSearch] = useState("");
  const [filtros, setFiltros] = useState({
    areas:  [] as string[],
    niveis: [] as string[],
    fontes: [] as string[],
    soFavoritos: false,
  });

  const toggle = (key: "areas" | "niveis" | "fontes", val: string) =>
    setFiltros(f => {
      const arr = f[key];
      return { ...f, [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] };
    });

  const activeCount =
    filtros.areas.length + filtros.niveis.length + filtros.fontes.length + (filtros.soFavoritos ? 1 : 0);

  const clearAll = () => setFiltros({ areas: [], niveis: [], fontes: [], soFavoritos: false });

  const filtrados = talentos.filter(t => {
    if (search &&
      !t.nome.toLowerCase().includes(search.toLowerCase()) &&
      !t.cargo.toLowerCase().includes(search.toLowerCase()) &&
      !t.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))) return false;
    if (filtros.areas.length  && !filtros.areas.includes(t.area))   return false;
    if (filtros.niveis.length && !filtros.niveis.includes(t.nivel)) return false;
    if (filtros.fontes.length && !filtros.fontes.includes(t.fonte)) return false;
    if (filtros.soFavoritos   && !t.favorito)                       return false;
    return true;
  });

  const toggleFav = (id: number) =>
    setTalentos(ts => ts.map(t => t.id === id ? { ...t, favorito: !t.favorito } : t));

  const getInitial = (nome: string) => nome.charAt(0).toUpperCase();

  const kpis = [
    { label: "Na base empresa",  value: talentos.length },
    { label: "Disponíveis",      value: talentos.filter(t => t.status === "Disponível").length },
    { label: "Em processo",      value: talentos.filter(t => t.status === "Em processo").length },
    { label: "Favoritos",        value: talentos.filter(t => t.favorito).length },
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Base Empresa</h1>
            <p className="text-sm text-slate-400 mt-1">Talentos salvos e acompanhados pela sua empresa</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity">
            <UserPlus size={15} /> Adicionar talento
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {kpis.map(k => (
            <div key={k.label} className="bg-white border border-blue-200 rounded-xl px-5 py-4">
              <p className="text-2xl font-extrabold text-slate-900">{k.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome, cargo ou habilidade..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl border border-blue-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-sm"
          />
        </div>

        {/* Body */}
        <div className="flex gap-5 items-start">

          {/* Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0 bg-white border border-blue-200 rounded-xl p-4 sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal size={14} className="text-slate-500" />
                <span className="text-sm font-bold text-slate-800">Filtros</span>
                {activeCount > 0 && (
                  <span className="h-4 w-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">{activeCount}</span>
                )}
              </div>
              {activeCount > 0 && (
                <button onClick={clearAll} className="text-[10px] text-red-400 hover:text-red-600 font-medium flex items-center gap-0.5">
                  <X size={10} /> Limpar
                </button>
              )}
            </div>

            <FilterSection title="Área">
              {areas.map(a => (
                <CheckFilter key={a} label={a} checked={filtros.areas.includes(a)} onChange={() => toggle("areas", a)} />
              ))}
            </FilterSection>

            <FilterSection title="Nível">
              {niveis.map(n => (
                <CheckFilter key={n} label={n} checked={filtros.niveis.includes(n)} onChange={() => toggle("niveis", n)} />
              ))}
            </FilterSection>

            <FilterSection title="Origem">
              {fontes.map(f => (
                <CheckFilter key={f} label={f} checked={filtros.fontes.includes(f)} onChange={() => toggle("fontes", f)} />
              ))}
            </FilterSection>

            <div className="pt-1">
              <CheckFilter
                label="Somente favoritos"
                checked={filtros.soFavoritos}
                onChange={() => setFiltros(f => ({ ...f, soFavoritos: !f.soFavoritos }))}
              />
            </div>
          </aside>

          {/* Lista */}
          <div className="flex-1 min-w-0 space-y-2">
            <p className="text-xs text-slate-400 text-right mb-1">
              {filtrados.length} talento{filtrados.length !== 1 ? "s" : ""}
            </p>

            {filtrados.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-xl border border-blue-200">
                <Search size={28} className="mx-auto text-slate-300 mb-3" />
                <p className="text-sm text-slate-400">Nenhum talento encontrado.</p>
              </div>
            ) : filtrados.map(t => (
              <div
                key={t.id}
                className="bg-white border border-blue-200 rounded-xl px-5 py-3.5 flex items-center gap-4 hover:shadow-md hover:border-primary/30 transition-all duration-150"
              >
                {/* Avatar */}
                <div
                  className="h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #243c7e 0%, #3b5fd9 100%)" }}
                >
                  {getInitial(t.nome)}
                </div>

                {/* Nome + cargo */}
                <div className="w-44 shrink-0">
                  <p className="font-semibold text-sm text-slate-900 truncate">{t.nome}</p>
                  <p className="text-xs text-slate-400 truncate">{t.cargo}</p>
                </div>

                {/* Localização */}
                <div className="hidden sm:flex items-center gap-1 text-xs text-slate-400 w-32 shrink-0">
                  <MapPin size={11} className="shrink-0" />
                  <span className="truncate">{t.remoto ? "Remoto" : `${t.cidade}, ${t.uf}`}</span>
                </div>

                {/* Skills */}
                <div className="hidden md:flex flex-wrap gap-1 flex-1 min-w-0">
                  {t.skills.slice(0, 3).map(s => (
                    <span key={s} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap">{s}</span>
                  ))}
                </div>

                {/* Nível */}
                <span className={`hidden lg:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${nivelStyle[t.nivel]}`}>
                  {t.nivel}
                </span>

                {/* Origem */}
                <span className="hidden xl:block text-[10px] text-slate-400 w-36 shrink-0 truncate">{t.fonte}</span>

                {/* Status */}
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${statusStyle[t.status]}`}>
                  {t.status}
                </span>

                {/* Ações */}
                <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                  <button
                    onClick={() => toggleFav(t.id)}
                    title={t.favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    className="p-1.5 rounded-lg hover:bg-amber-50 transition-colors"
                  >
                    {t.favorito
                      ? <Star size={14} className="text-amber-400 fill-amber-400" />
                      : <StarOff size={14} className="text-slate-300 hover:text-amber-400" />
                    }
                  </button>
                  <button
                    onClick={() => navigate(`/talentos/${t.id}`)}
                    className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <Eye size={12} /> Ver
                  </button>
                  <button className="flex items-center gap-1 rounded-lg bg-primary/10 text-primary px-2.5 py-1.5 text-xs font-medium hover:bg-primary/20 transition-colors">
                    <UserPlus size={12} /> Adicionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PortalTalentos;
