import { useState } from "react";
import { List, Search, Plus, Edit, Trash2, Eye, Filter } from "lucide-react";

interface ListaSegmentada {
  id: number;
  nome: string;
  descricao: string;
  talentos: number;
  ultimaAtualizacao: string;
  status: "Ativa" | "Inativa";
}

const listasData: ListaSegmentada[] = [
  {
    id: 1,
    nome: "Desenvolvedores Full-Stack SP",
    descricao: "Perfis com experiência em React e Node.js, baseados em São Paulo.",
    talentos: 148,
    ultimaAtualizacao: "14/04/2026",
    status: "Ativa",
  },
  {
    id: 2,
    nome: "Designers UX/UI",
    descricao: "Profissionais de design com portfólio aprovado na triagem.",
    talentos: 63,
    ultimaAtualizacao: "12/04/2026",
    status: "Ativa",
  },
  {
    id: 3,
    nome: "Product Managers",
    descricao: "PMs com experiência em squads ágeis e roadmaps estratégicos.",
    talentos: 39,
    ultimaAtualizacao: "10/04/2026",
    status: "Ativa",
  },
  {
    id: 4,
    nome: "Analistas de Dados",
    descricao: "Candidatos com domínio de Python, SQL e ferramentas de BI.",
    talentos: 92,
    ultimaAtualizacao: "09/04/2026",
    status: "Ativa",
  },
  {
    id: 5,
    nome: "Candidatos Triagem 2026",
    descricao: "Pipeline de candidatos que passaram pela triagem inicial em 2026.",
    talentos: 317,
    ultimaAtualizacao: "08/04/2026",
    status: "Inativa",
  },
  {
    id: 6,
    nome: "Leads de Alta Potencial",
    descricao: "Talentos estratégicos identificados para futuras oportunidades.",
    talentos: 27,
    ultimaAtualizacao: "05/04/2026",
    status: "Ativa",
  },
];

const statusStyle: Record<ListaSegmentada["status"], string> = {
  Ativa:   "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Inativa: "bg-slate-100 text-slate-500 border border-blue-300",
};

const statCards = [
  { label: "Total de listas",    value: 12     },
  { label: "Total de talentos",  value: "3.421" },
  { label: "Ativas",             value: 9      },
];

const ListasSegmentadas = () => {
  const [search, setSearch] = useState("");
  const [listas, setListas] = useState<ListaSegmentada[]>(listasData);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtradas = listas.filter(
    (l) =>
      l.nome.toLowerCase().includes(search.toLowerCase()) ||
      l.descricao.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setListas((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Listas Segmentadas</h1>
            <p className="text-sm text-slate-400 mt-1">
              Organize talentos em grupos segmentados para facilitar a comunicação e o recrutamento.
            </p>
          </div>
          <button className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity">
            <Plus size={15} />
            Nova Lista
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="bg-white border border-blue-300 rounded-xl px-5 py-4"
            >
              <p className="text-2xl font-extrabold text-slate-900">{card.value}</p>
              <p className="text-xs text-slate-400 mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Search + filter */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar lista..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-blue-300 bg-white pl-9 pr-4 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setFilterOpen((o) => !o)}
              className="flex items-center gap-1.5 rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Filter size={14} />
              Filtrar
            </button>
            {filterOpen && (
              <div className="absolute right-0 z-10 mt-1 w-40 rounded-xl border border-blue-300 bg-white shadow-lg py-1">
                {["Todas", "Ativas", "Inativas"].map((opt) => (
                  <button
                    key={opt}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                    onClick={() => setFilterOpen(false)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-blue-300 rounded-xl overflow-hidden">

          {/* Header row */}
          <div className="hidden md:grid grid-cols-12 gap-2 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
            <div className="col-span-3">Nome da lista</div>
            <div className="col-span-4">Descrição</div>
            <div className="col-span-1 text-center">Talentos</div>
            <div className="col-span-2 text-center">Última atualização</div>
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-1 text-right">Ações</div>
          </div>

          {/* Empty state */}
          {filtradas.length === 0 && (
            <div className="py-16 flex flex-col items-center gap-3">
              <List size={36} className="text-slate-200" />
              <p className="text-sm font-semibold text-slate-400">Nenhuma lista encontrada</p>
              <p className="text-xs text-slate-300">
                Tente ajustar sua busca ou crie uma nova lista.
              </p>
              <button className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity mt-2">
                <Plus size={14} />
                Nova Lista
              </button>
            </div>
          )}

          {/* Rows */}
          {filtradas.map((lista) => (
            <div
              key={lista.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center border-b border-slate-100 last:border-b-0 px-5 py-4 hover:bg-slate-50/60 transition-colors"
            >
              {/* Nome */}
              <div className="col-span-3 flex items-center gap-2">
                <List size={14} className="text-slate-400 shrink-0" />
                <span className="font-semibold text-sm text-slate-900 leading-snug">
                  {lista.nome}
                </span>
              </div>

              {/* Descrição */}
              <div className="col-span-4 text-xs text-slate-400 leading-relaxed line-clamp-2">
                {lista.descricao}
              </div>

              {/* Talentos badge */}
              <div className="col-span-1 flex justify-center">
                <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-full">
                  {lista.talentos}
                </span>
              </div>

              {/* Data */}
              <div className="col-span-2 text-center text-xs text-slate-400">
                {lista.ultimaAtualizacao}
              </div>

              {/* Status */}
              <div className="col-span-1 flex justify-center">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[lista.status]}`}
                >
                  {lista.status}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-1 flex justify-end items-center gap-1">
                <button
                  title="Visualizar"
                  className="rounded-md p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Eye size={14} />
                </button>
                <button
                  title="Editar"
                  className="rounded-md p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                >
                  <Edit size={14} />
                </button>
                <button
                  title="Excluir"
                  onClick={() => handleDelete(lista.id)}
                  className="rounded-md p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400 text-right">
          {filtradas.length} lista{filtradas.length !== 1 ? "s" : ""} exibida{filtradas.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};

export default ListasSegmentadas;
