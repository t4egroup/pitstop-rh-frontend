import { Link } from "react-router-dom";
import { useState } from "react";
import { Plus, Search, Edit, Trash2, Building2, ArrowLeft, } from "lucide-react";

const areasIniciais = [
  { id: 1, nome: "Tecnologia", responsavel: "Ricardo Mendes", colaboradores: 24, vagas: 5 },
  { id: 2, nome: "Marketing", responsavel: "Fernanda Castro", colaboradores: 12, vagas: 2 },
  { id: 3, nome: "Produto", responsavel: "João Lima", colaboradores: 8, vagas: 3 },
  { id: 4, nome: "Recursos Humanos", responsavel: "Amanda Silva", colaboradores: 6, vagas: 1 },
  { id: 5, nome: "Financeiro", responsavel: "Paulo Mendes", colaboradores: 10, vagas: 0 },
  { id: 6, nome: "Comercial", responsavel: "Carla Ortiz", colaboradores: 15, vagas: 1 },
];

const SetupAreas = () => {
  const [search, setSearch] = useState("");
  const filtered = areasIniciais.filter((a) => a.nome.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-5">
        <Link to="/setup" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors mb-4">
          <ArrowLeft size={14} /> Voltar para Setup
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Áreas</h1>
            <p className="text-xs text-slate-400 mt-0.5">Gerencie as áreas e departamentos da empresa</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus size={14} /> Nova Área
          </button>
        </div>

        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Buscar área..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border bg-white pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((a) => (
            <div key={a.id} className="rounded-xl bg-white border border-blue-300 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-lg bg-[#243c7e]/10 flex items-center justify-center">
                    <Building2 size={16} className="text-[#243c7e]" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">{a.nome}</h3>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-[#243c7e] hover:bg-[#243c7e]/10 transition-colors"><Edit size={13} /></button>
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={13} /></button>
                </div>
              </div>
              <p className="text-xs text-slate-500">Responsável: <span className="font-medium text-slate-700">{a.responsavel}</span></p>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
                <span className="text-xs text-slate-400">{a.colaboradores} colaboradores</span>
                <span className={`text-xs font-semibold ${a.vagas > 0 ? "text-green-600" : "text-slate-400"}`}>{a.vagas} vagas ativas</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SetupAreas;
