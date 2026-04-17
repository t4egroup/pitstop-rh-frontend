import { useState } from "react";
import { Plus, Search, Eye, Edit, Trash2, Globe, ExternalLink, Copy, MoreHorizontal } from "lucide-react";

interface PaginaCaptacao {
  id: number;
  titulo: string;
  url: string;
  vagasVinculadas: number;
  visualizacoes: number;
  conversoes: number;
  taxaConversao: string;
  status: "Ativa" | "Inativa" | "Rascunho";
  ultimaAtualizacao: string;
}

const paginas: PaginaCaptacao[] = [
  {
    id: 1,
    titulo: "Venha trabalhar conosco — Tecnologia",
    url: "pitstop.rh/carreiras/tecnologia",
    vagasVinculadas: 5,
    visualizacoes: 1240,
    conversoes: 89,
    taxaConversao: "7,2%",
    status: "Ativa",
    ultimaAtualizacao: "10/04/2026",
  },
  {
    id: 2,
    titulo: "Programa de Estágio 2026",
    url: "pitstop.rh/carreiras/estagio-2026",
    vagasVinculadas: 3,
    visualizacoes: 2380,
    conversoes: 215,
    taxaConversao: "9,0%",
    status: "Ativa",
    ultimaAtualizacao: "08/04/2026",
  },
  {
    id: 3,
    titulo: "Vagas Operacionais — Logística",
    url: "pitstop.rh/carreiras/logistica",
    vagasVinculadas: 8,
    visualizacoes: 560,
    conversoes: 42,
    taxaConversao: "7,5%",
    status: "Inativa",
    ultimaAtualizacao: "01/04/2026",
  },
  {
    id: 4,
    titulo: "Diversidade e Inclusão",
    url: "pitstop.rh/carreiras/diversidade",
    vagasVinculadas: 0,
    visualizacoes: 0,
    conversoes: 0,
    taxaConversao: "0%",
    status: "Rascunho",
    ultimaAtualizacao: "14/04/2026",
  },
];

const statusColor: Record<string, string> = {
  Ativa: "bg-green-500/10 text-green-600",
  Inativa: "bg-slate-100 text-slate-500",
  Rascunho: "bg-amber-500/10 text-amber-600",
};

const PaginasCaptacao = () => {
  const [search, setSearch] = useState("");

  const filtered = paginas.filter((p) =>
    p.titulo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Páginas de Captação</h1>
            <p className="text-muted-foreground text-xs mt-0.5">
              Crie landing pages personalizadas para atrair candidatos às suas vagas
            </p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus size={14} /> Nova Página
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar página..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border bg-white pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((p) => (
            <div key={p.id} className="rounded-xl bg-white border border-blue-300 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-slate-900 truncate">{p.titulo}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Globe size={12} className="text-slate-400 shrink-0" />
                      <span className="text-[11px] text-slate-400 truncate">{p.url}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0 ml-3 ${statusColor[p.status]}`}>
                    {p.status}
                  </span>
                </div>

                {/* Métricas */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="text-center">
                    <p className="text-lg font-extrabold text-slate-900">{p.visualizacoes.toLocaleString("pt-BR")}</p>
                    <p className="text-[10px] text-slate-400">Visualizações</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-extrabold text-slate-900">{p.conversoes}</p>
                    <p className="text-[10px] text-slate-400">Conversões</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-extrabold text-[#243c7e]">{p.taxaConversao}</p>
                    <p className="text-[10px] text-slate-400">Taxa Conv.</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span>{p.vagasVinculadas} vagas vinculadas</span>
                    <span>Atualizada em {p.ultimaAtualizacao}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-[#243c7e] hover:bg-[#243c7e]/10 transition-colors" title="Visualizar">
                      <Eye size={14} />
                    </button>
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-[#243c7e] hover:bg-[#243c7e]/10 transition-colors" title="Copiar link">
                      <Copy size={14} />
                    </button>
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-[#243c7e] hover:bg-[#243c7e]/10 transition-colors" title="Editar">
                      <Edit size={14} />
                    </button>
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Excluir">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Globe size={40} className="mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-500">Nenhuma página encontrada</p>
            <p className="text-xs text-slate-400 mt-1">Tente buscar por outro termo</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaginasCaptacao;
