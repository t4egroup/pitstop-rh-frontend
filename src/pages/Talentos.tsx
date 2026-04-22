import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Eye, UserPlus, SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { talentos } from "@/data/talentos";

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

const areas     = [...new Set(talentos.map(t => t.area))].sort();
const cidades   = [...new Set(talentos.filter(t => !t.remoto).map(t => t.cidade))].sort();
const niveis    = ["Júnior", "Pleno", "Sênior", "Especialista"] as const;
const statusOps = ["Disponível", "Em processo", "Contratado"] as const;
const dispOps   = ["Imediata", "15 dias", "30 dias", "A combinar"] as const;

const kpis = [
  { label: "Total na base",  value: talentos.length },
  { label: "Disponíveis",    value: talentos.filter(t => t.status === "Disponível").length },
  { label: "Em processo",    value: talentos.filter(t => t.status === "Em processo").length },
  { label: "Contratados",    value: talentos.filter(t => t.status === "Contratado").length },
];

const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-slate-100 pb-4 mb-4">
      <button onClick={() => setOpen(o => !o)} className="flex items-center justify-between w-full mb-3 group">
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

const Talentos = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [zoom, setZoom] = useState(() =>
    parseFloat(localStorage.getItem("dashZoom") ?? "1.1")
  );
  useEffect(() => {
    const onStorage = () =>
      setZoom(parseFloat(localStorage.getItem("dashZoom") ?? "1.1"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [filtros, setFiltros] = useState({
    status:         [] as string[],
    areas:          [] as string[],
    niveis:         [] as string[],
    disponibilidade:[] as string[],
    cidades:        [] as string[],
    remoto:         false,
    cnh:            false,
    viagem:         false,
    mudanca:        false,
  });

  const toggle = (key: keyof typeof filtros, val: string) => {
    setFiltros(f => {
      const arr = f[key] as string[];
      return { ...f, [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] };
    });
  };
  const toggleBool = (key: "remoto" | "cnh" | "viagem" | "mudanca") =>
    setFiltros(f => ({ ...f, [key]: !f[key] }));

  const activeCount = Object.values(filtros).flat().filter(Boolean).length;
  const clearAll = () => setFiltros({ status: [], areas: [], niveis: [], disponibilidade: [], cidades: [], remoto: false, cnh: false, viagem: false, mudanca: false });

  const filtrados = talentos.filter(t => {
    if (search && !t.nome.toLowerCase().includes(search.toLowerCase()) &&
        !t.cargo.toLowerCase().includes(search.toLowerCase()) &&
        !t.cidade.toLowerCase().includes(search.toLowerCase()) &&
        !t.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))) return false;
    if (filtros.status.length          && !filtros.status.includes(t.status))           return false;
    if (filtros.areas.length           && !filtros.areas.includes(t.area))              return false;
    if (filtros.niveis.length          && !filtros.niveis.includes(t.nivel))            return false;
    if (filtros.disponibilidade.length && !filtros.disponibilidade.includes(t.disponibilidade)) return false;
    if (filtros.cidades.length         && !filtros.cidades.includes(t.cidade))          return false;
    if (filtros.remoto                 && !t.remoto)                                    return false;
    if (filtros.cnh                    && !t.cnh)                                       return false;
    if (filtros.viagem                 && !t.viagem)                                    return false;
    if (filtros.mudanca                && !t.mudanca)                                   return false;
    return true;
  });

  const getInitial = (nome: string) => nome.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Base Pitstop</h1>
            <p className="text-sm text-slate-400 mt-1">Banco de talentos e candidatos cadastrados na plataforma</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity">
            <UserPlus size={15} /> Adicionar Talento
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

        {/* Search + mobile filter toggle */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome, cargo, cidade ou habilidade..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl border border-blue-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-sm"
            />
          </div>
          <button
            onClick={() => setShowMobileFilters(v => !v)}
            className={`lg:hidden flex items-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
              showMobileFilters ? "bg-primary text-white border-primary" : "bg-white border-blue-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <SlidersHorizontal size={15} />
            Filtros
            {activeCount > 0 && (
              <span className={`h-4 w-4 rounded-full text-[10px] font-bold flex items-center justify-center ${showMobileFilters ? "bg-white text-primary" : "bg-primary text-white"}`}>
                {activeCount}
              </span>
            )}
          </button>
        </div>

        {/* Body: sidebar + list */}
        <div className="flex gap-5 items-start">

          {/* ── Sidebar de filtros ── */}
          <aside
            className={`${showMobileFilters ? "block" : "hidden"} lg:block w-full lg:w-56 shrink-0 bg-white border border-blue-200 rounded-xl p-4 lg:sticky lg:top-4 lg:overflow-y-auto`}
            style={{ maxHeight: window.innerWidth >= 1024 ? `calc((100vh - 3rem) / ${zoom})` : undefined }}
          >
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

            <FilterSection title="Status">
              {statusOps.map(s => (
                <CheckFilter key={s} label={s} checked={filtros.status.includes(s)} onChange={() => toggle("status", s)} />
              ))}
            </FilterSection>

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

            <FilterSection title="Disponibilidade">
              {dispOps.map(d => (
                <CheckFilter key={d} label={d} checked={filtros.disponibilidade.includes(d)} onChange={() => toggle("disponibilidade", d)} />
              ))}
            </FilterSection>

            <FilterSection title="Cidade">
              <div className="max-h-36 overflow-y-auto space-y-0.5 pr-1">
                {cidades.map(c => (
                  <CheckFilter key={c} label={c} checked={filtros.cidades.includes(c)} onChange={() => toggle("cidades", c)} />
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Preferências">
              <CheckFilter label="Aceita remoto"            checked={filtros.remoto}  onChange={() => toggleBool("remoto")}  />
              <CheckFilter label="Possui CNH"               checked={filtros.cnh}     onChange={() => toggleBool("cnh")}     />
              <CheckFilter label="Disponível p/ viagens"    checked={filtros.viagem}  onChange={() => toggleBool("viagem")}  />
              <CheckFilter label="Aceita mudança de cidade" checked={filtros.mudanca} onChange={() => toggleBool("mudanca")} />
            </FilterSection>
          </aside>

          {/* ── Lista de talentos ── */}
          <div className="flex-1 min-w-0 space-y-2">
            <p className="text-xs text-slate-400 text-right mb-1">{filtrados.length} talento{filtrados.length !== 1 ? "s" : ""} encontrado{filtrados.length !== 1 ? "s" : ""}</p>

            {filtrados.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-xl border border-blue-200">
                <Search size={28} className="mx-auto text-slate-300 mb-3" />
                <p className="text-sm text-slate-400">Nenhum talento encontrado com os filtros aplicados.</p>
              </div>
            ) : filtrados.map(t => (
              <div
                key={t.id}
                onClick={() => navigate(`/talentos/${t.id}`)}
                className="bg-white border border-blue-200 rounded-xl px-4 py-3.5 flex items-center gap-3 hover:shadow-md hover:border-primary/30 transition-all duration-150 cursor-pointer"
              >
                {/* Avatar */}
                <div
                  className="h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #243c7e 0%, #3b5fd9 100%)" }}
                >
                  {getInitial(t.nome)}
                </div>

                {/* Nome + cargo — flex-1 para não vazar no mobile */}
                <div className="flex-1 min-w-0">
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
                  {t.skills.length > 3 && (
                    <span className="text-[10px] text-slate-400">+{t.skills.length - 3}</span>
                  )}
                </div>

                {/* Nível */}
                <span className={`hidden lg:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${nivelStyle[t.nivel]}`}>
                  {t.nivel}
                </span>

                {/* Salário */}
                <span className="hidden xl:block text-xs font-semibold text-slate-600 w-20 shrink-0 text-right">{t.salario}</span>

                {/* Status — ml-auto empurra para direita sem forçar overflow */}
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-full shrink-0 ml-auto ${statusStyle[t.status]}`}>
                  {t.status}
                </span>

                {/* Ações */}
                <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
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

export default Talentos;
