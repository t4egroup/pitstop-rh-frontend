import { useState } from "react";
import {
  ExternalLink, CheckCircle2, XCircle, RefreshCw,
  Briefcase, Globe, Megaphone, Users, TrendingUp, Plus,
} from "lucide-react";

interface Parceiro {
  id: number;
  nome: string;
  categoria: "Plataforma de vagas" | "Redes sociais" | "Marketing" | "Avaliações";
  descricao: string;
  logo: string;
  conectado: boolean;
  vagasPublicadas?: number;
  candidatosGerados?: number;
  cor: string;
}

const parceiros: Parceiro[] = [
  {
    id: 1,
    nome: "LinkedIn",
    categoria: "Plataforma de vagas",
    descricao: "Publique vagas e alcance profissionais qualificados na maior rede profissional do mundo.",
    logo: "in",
    conectado: true,
    vagasPublicadas: 12,
    candidatosGerados: 148,
    cor: "#0A66C2",
  },
  {
    id: 2,
    nome: "Indeed",
    categoria: "Plataforma de vagas",
    descricao: "Anuncie vagas e atraia candidatos com o maior site de empregos do mundo.",
    logo: "IN",
    conectado: true,
    vagasPublicadas: 8,
    candidatosGerados: 94,
    cor: "#003A9B",
  },
  {
    id: 3,
    nome: "Catho",
    categoria: "Plataforma de vagas",
    descricao: "Conecte-se a candidatos brasileiros qualificados na principal plataforma nacional.",
    logo: "Ca",
    conectado: false,
    cor: "#E3000B",
  },
  {
    id: 4,
    nome: "InfoJobs",
    categoria: "Plataforma de vagas",
    descricao: "Publique vagas e encontre talentos em um dos maiores portais de empregos do Brasil.",
    logo: "IJ",
    conectado: false,
    cor: "#FF6600",
  },
  {
    id: 5,
    nome: "Instagram",
    categoria: "Redes sociais",
    descricao: "Divulgue vagas e fortaleça o employer branding nas redes sociais.",
    logo: "IG",
    conectado: true,
    vagasPublicadas: 5,
    candidatosGerados: 31,
    cor: "#E1306C",
  },
  {
    id: 6,
    nome: "Google for Jobs",
    categoria: "Plataforma de vagas",
    descricao: "Exiba suas vagas diretamente nos resultados de busca do Google.",
    logo: "G",
    conectado: false,
    cor: "#4285F4",
  },
  {
    id: 7,
    nome: "Meta Ads",
    categoria: "Marketing",
    descricao: "Crie campanhas de anúncios segmentados para atrair candidatos via Facebook e Instagram.",
    logo: "M",
    conectado: false,
    cor: "#1877F2",
  },
  {
    id: 8,
    nome: "Gupy",
    categoria: "Plataforma de vagas",
    descricao: "Integre seu processo seletivo com a plataforma de recrutamento mais usada no Brasil.",
    logo: "Gu",
    conectado: false,
    cor: "#7C3AED",
  },
];

const categorias = ["Todos", "Plataforma de vagas", "Redes sociais", "Marketing", "Avaliações"];

const categoriasIcons: Record<string, React.ElementType> = {
  "Plataforma de vagas": Briefcase,
  "Redes sociais": Globe,
  "Marketing": Megaphone,
  "Avaliações": Users,
};

const Parceiros = () => {
  const [filtro, setFiltro] = useState("Todos");
  const [parceirosState, setParceirosState] = useState(parceiros);

  const toggleConexao = (id: number) => {
    setParceirosState(prev =>
      prev.map(p => p.id === id ? { ...p, conectado: !p.conectado } : p)
    );
  };

  const filtrados = filtro === "Todos"
    ? parceirosState
    : parceirosState.filter(p => p.categoria === filtro);

  const totalConectados = parceirosState.filter(p => p.conectado).length;
  const totalCandidatos = parceirosState.reduce((acc, p) => acc + (p.candidatosGerados ?? 0), 0);
  const totalVagas = parceirosState.reduce((acc, p) => acc + (p.vagasPublicadas ?? 0), 0);

  return (
    <div className="container max-w-6xl py-8 space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">Parceiros</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie integrações com plataformas de anúncio, redes sociais e ferramentas de marketing.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity">
          <Plus size={15} />
          Solicitar parceiro
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Integrações ativas", value: totalConectados, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Vagas publicadas", value: totalVagas, icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Candidatos gerados", value: totalCandidatos, icon: TrendingUp, color: "text-violet-500", bg: "bg-violet-500/10" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="rounded-xl border bg-white p-5 flex items-center gap-4 shadow-sm">
            <div className={`h-11 w-11 rounded-full ${bg} flex items-center justify-center shrink-0`}>
              <Icon size={20} className={color} />
            </div>
            <div>
              <p className="text-2xl font-extrabold">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => setFiltro(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all border ${
              filtro === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-white text-slate-600 border-slate-200 hover:border-primary/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de parceiros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtrados.map(parceiro => {
          const CatIcon = categoriasIcons[parceiro.categoria] ?? Globe;
          return (
            <div
              key={parceiro.id}
              className={`rounded-xl border bg-white p-5 flex flex-col gap-4 shadow-sm transition-shadow hover:shadow-md ${
                parceiro.conectado ? "border-emerald-200" : ""
              }`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Logo placeholder */}
                  <div
                    className="h-11 w-11 rounded-xl flex items-center justify-center text-white text-sm font-extrabold shrink-0"
                    style={{ backgroundColor: parceiro.cor }}
                  >
                    {parceiro.logo}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{parceiro.nome}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <CatIcon size={10} className="text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">{parceiro.categoria}</span>
                    </div>
                  </div>
                </div>

                {/* Status badge */}
                {parceiro.conectado ? (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 shrink-0">
                    <CheckCircle2 size={10} /> Conectado
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[10px] font-bold text-slate-400 shrink-0">
                    <XCircle size={10} /> Desconectado
                  </span>
                )}
              </div>

              {/* Descrição */}
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                {parceiro.descricao}
              </p>

              {/* Stats (só se conectado) */}
              {parceiro.conectado && (
                <div className="flex gap-4 rounded-lg bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-base font-extrabold">{parceiro.vagasPublicadas}</p>
                    <p className="text-[10px] text-muted-foreground">Vagas publicadas</p>
                  </div>
                  <div className="w-px bg-slate-200" />
                  <div>
                    <p className="text-base font-extrabold">{parceiro.candidatosGerados}</p>
                    <p className="text-[10px] text-muted-foreground">Candidatos gerados</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => toggleConexao(parceiro.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-colors ${
                    parceiro.conectado
                      ? "bg-red-50 text-red-500 hover:bg-red-100 border border-red-200"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                >
                  {parceiro.conectado ? (
                    <><XCircle size={13} /> Desconectar</>
                  ) : (
                    <><RefreshCw size={13} /> Conectar</>
                  )}
                </button>
                <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-colors">
                  <ExternalLink size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Parceiros;
