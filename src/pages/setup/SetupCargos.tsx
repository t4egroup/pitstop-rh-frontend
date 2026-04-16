import { Link } from "react-router-dom";
import { useState } from "react";
import { Plus, Search, Edit, Trash2, Briefcase, ArrowLeft, } from "lucide-react";

const cargosIniciais = [
  { id: 1, titulo: "Desenvolvedor Front-end", nivel: "Pleno", departamento: "Tecnologia", vagas: 3 },
  { id: 2, titulo: "Analista de Marketing", nivel: "Júnior", departamento: "Marketing", vagas: 1 },
  { id: 3, titulo: "UX Designer", nivel: "Sênior", departamento: "Produto", vagas: 2 },
  { id: 4, titulo: "Product Manager", nivel: "Pleno", departamento: "Produto", vagas: 1 },
  { id: 5, titulo: "Analista de Dados", nivel: "Júnior", departamento: "Tecnologia", vagas: 2 },
  { id: 6, titulo: "Desenvolvedor Back-end", nivel: "Sênior", departamento: "Tecnologia", vagas: 1 },
  { id: 7, titulo: "Coordenador de RH", nivel: "Sênior", departamento: "Recursos Humanos", vagas: 0 },
  { id: 8, titulo: "Analista Financeiro", nivel: "Pleno", departamento: "Financeiro", vagas: 0 },
];

const SetupCargos = () => {
  const [search, setSearch] = useState("");
  const filtered = cargosIniciais.filter((c) =>
    c.titulo.toLowerCase().includes(search.toLowerCase()) ||
    c.departamento.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-5">
        <Link to="/setup" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors mb-4">
          <ArrowLeft size={14} /> Voltar para Setup
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Cargos</h1>
            <p className="text-xs text-slate-400 mt-0.5">Gerencie os cargos cadastrados na estrutura da empresa</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus size={14} /> Novo Cargo
          </button>
        </div>

        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Buscar cargo..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border bg-white pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
        </div>

        <div className="rounded-xl bg-white border border-blue-300 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left">
                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Cargo</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Nível</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Departamento</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide text-center">Vagas ativas</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-slate-900">{c.titulo}</td>
                  <td className="px-5 py-3 text-slate-600">{c.nivel}</td>
                  <td className="px-5 py-3 text-slate-600">{c.departamento}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.vagas > 0 ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-400"}`}>{c.vagas}</span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-[#243c7e] hover:bg-[#243c7e]/10 transition-colors"><Edit size={14} /></button>
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SetupCargos;
