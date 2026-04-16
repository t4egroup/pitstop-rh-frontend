import { useState } from "react";
import { Search, MapPin, Star, UserPlus, Eye } from "lucide-react";

interface Talento {
  id: number;
  nome: string;
  cargo: string;
  cidade: string;
  skills: string[];
  status: "Disponível" | "Em processo" | "Contratado";
}

const talentos: Talento[] = [
  {
    id: 1,
    nome: "Lucas Ferreira",
    cargo: "Desenvolvedor Front-end",
    cidade: "São Paulo, SP",
    skills: ["React", "TypeScript", "Tailwind"],
    status: "Disponível",
  },
  {
    id: 2,
    nome: "Beatriz Santos",
    cargo: "Analista de Marketing",
    cidade: "Remoto",
    skills: ["SEO", "Google Ads", "Analytics"],
    status: "Em processo",
  },
  {
    id: 3,
    nome: "Rafael Oliveira",
    cargo: "Analista de Dados",
    cidade: "Belo Horizonte, MG",
    skills: ["Python", "SQL", "Power BI"],
    status: "Disponível",
  },
  {
    id: 4,
    nome: "Camila Torres",
    cargo: "UX Designer",
    cidade: "Rio de Janeiro, RJ",
    skills: ["Figma", "Pesquisa", "Prototipagem"],
    status: "Contratado",
  },
  {
    id: 5,
    nome: "Diego Almeida",
    cargo: "Product Manager",
    cidade: "São Paulo, SP",
    skills: ["Roadmapping", "OKRs", "Agile"],
    status: "Disponível",
  },
  {
    id: 6,
    nome: "Mariana Lima",
    cargo: "Desenvolvedora Back-end",
    cidade: "Remoto",
    skills: ["Node.js", "PostgreSQL", "Docker"],
    status: "Em processo",
  },
];

const statusStyle: Record<Talento["status"], string> = {
  Disponível:   "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "Em processo": "bg-blue-50 text-blue-700 border border-blue-300",
  Contratado:   "bg-slate-100 text-slate-500 border border-blue-300",
};

const filterButtons = ["Área", "Cidade", "Experiência", "Disponibilidade"];

const kpis = [
  { label: "Total de talentos",  value: "1.248" },
  { label: "Novos este mês",     value: 87      },
  { label: "Disponíveis",        value: 934     },
];

const getInitial = (nome: string) => nome.charAt(0).toUpperCase();

const Talentos = () => {
  const [search, setSearch]       = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtrados = talentos.filter((t) =>
    t.nome.toLowerCase().includes(search.toLowerCase()) ||
    t.cargo.toLowerCase().includes(search.toLowerCase()) ||
    t.cidade.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Talentos</h1>
            <p className="text-sm text-slate-400 mt-1">
              Banco de talentos e candidatos do pipeline
            </p>
          </div>
          <button className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity">
            <UserPlus size={15} />
            Adicionar Talento
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {kpis.map((k) => (
            <div
              key={k.label}
              className="bg-white border border-blue-300 rounded-xl px-5 py-4"
            >
              <p className="text-2xl font-extrabold text-slate-900">{k.value}</p>
              <p className="text-xs text-slate-400 mt-1">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Search + filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome, cargo ou cidade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-blue-300 bg-white pl-9 pr-4 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          {filterButtons.map((fb) => (
            <button
              key={fb}
              onClick={() => setActiveFilter(activeFilter === fb ? null : fb)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                activeFilter === fb
                  ? "bg-primary text-white border-primary"
                  : "border-blue-300 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {fb}
            </button>
          ))}
        </div>

        {/* Talent grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtrados.map((talento) => (
            <div
              key={talento.id}
              className="bg-white border border-blue-300 rounded-xl p-5 flex flex-col gap-4 hover:shadow-sm transition-shadow"
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-3">
                <div
                  className="h-11 w-11 shrink-0 rounded-full flex items-center justify-center text-white font-bold text-base"
                  style={{ background: "linear-gradient(135deg, #243c7e 0%, #3b5fd9 100%)" }}
                >
                  {getInitial(talento.nome)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-sm truncate">{talento.nome}</p>
                  <p className="text-xs text-slate-400 truncate">{talento.cargo}</p>
                </div>
                <Star size={14} className="text-amber-400 shrink-0" />
              </div>

              {/* City */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin size={12} />
                <span>{talento.cidade}</span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {talento.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Status badge */}
              <div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[talento.status]}`}
                >
                  {talento.status}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1 border-t border-slate-100">
                <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-blue-300 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                  <Eye size={13} />
                  Ver perfil
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-primary/10 text-primary py-2 text-xs font-semibold hover:bg-primary/20 transition-colors">
                  <UserPlus size={13} />
                  Adicionar à lista
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtrados.length === 0 && (
          <div className="py-14 text-center">
            <Search size={32} className="mx-auto text-slate-300 mb-3" />
            <p className="text-sm text-slate-400">Nenhum talento encontrado.</p>
          </div>
        )}

        <p className="text-xs text-slate-400 text-right">
          {filtrados.length} talento{filtrados.length !== 1 ? "s" : ""} exibido{filtrados.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};

export default Talentos;
