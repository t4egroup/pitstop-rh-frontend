import { Link } from "react-router-dom";
import { useState } from "react";
import { Plus, Search, Edit, Copy, Trash2, Eye, ClipboardList, ArrowLeft, } from "lucide-react";

const roteiros = [
  { id: 1, nome: "Entrevista RH — Padrão", tipo: "RH", perguntas: 12, duracao: "30 min", vagas: 6, atualizado: "10/04/2026" },
  { id: 2, nome: "Entrevista Técnica — Desenvolvimento", tipo: "Técnica", perguntas: 15, duracao: "45 min", vagas: 4, atualizado: "08/04/2026" },
  { id: 3, nome: "Entrevista Comportamental", tipo: "RH", perguntas: 10, duracao: "25 min", vagas: 3, atualizado: "05/04/2026" },
  { id: 4, nome: "Case de Produto", tipo: "Técnica", perguntas: 5, duracao: "60 min", vagas: 2, atualizado: "12/04/2026" },
  { id: 5, nome: "Entrevista Final — Gestor", tipo: "Final", perguntas: 8, duracao: "30 min", vagas: 5, atualizado: "14/04/2026" },
  { id: 6, nome: "Entrevista de Fit Cultural", tipo: "RH", perguntas: 8, duracao: "20 min", vagas: 7, atualizado: "01/04/2026" },
];

const tipoColor: Record<string, string> = {
  "RH": "bg-blue-50 text-purple-600",
  "Técnica": "bg-amber-50 text-amber-600",
  "Final": "bg-blue-50 text-blue-600",
};

const SetupRoteiros = () => {
  const [search, setSearch] = useState("");
  const filtered = roteiros.filter((r) => r.nome.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-5">
        <Link to="/setup" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors mb-4">
          <ArrowLeft size={14} /> Voltar para Setup
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Roteiros de entrevista</h1>
            <p className="text-xs text-slate-400 mt-0.5">Guias estruturados para conduzir entrevistas padronizadas</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus size={14} /> Novo Roteiro
          </button>
        </div>

        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Buscar roteiro..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border bg-white pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
        </div>

        <div className="space-y-3">
          {filtered.map((r) => (
            <div key={r.id} className="rounded-xl bg-white border border-blue-300 p-5 hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-[#243c7e]/10 flex items-center justify-center shrink-0">
                <ClipboardList size={18} className="text-[#243c7e]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900">{r.nome}</h3>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${tipoColor[r.tipo] || "bg-slate-100 text-slate-500"}`}>{r.tipo}</span>
                </div>
                <div className="flex items-center gap-4 mt-1.5 text-[11px] text-slate-400">
                  <span>{r.perguntas} perguntas</span>
                  <span>{r.duracao}</span>
                  <span>Usado em {r.vagas} vagas</span>
                  <span>Atualizado em {r.atualizado}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button className="p-1.5 rounded-lg text-slate-400 hover:text-[#243c7e] hover:bg-[#243c7e]/10 transition-colors" title="Visualizar"><Eye size={14} /></button>
                <button className="p-1.5 rounded-lg text-slate-400 hover:text-[#243c7e] hover:bg-[#243c7e]/10 transition-colors" title="Duplicar"><Copy size={14} /></button>
                <button className="p-1.5 rounded-lg text-slate-400 hover:text-[#243c7e] hover:bg-[#243c7e]/10 transition-colors" title="Editar"><Edit size={14} /></button>
                <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Excluir"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SetupRoteiros;
