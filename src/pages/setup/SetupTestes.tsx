import { Link } from "react-router-dom";
import { useState } from "react";
import { Plus, Search, Edit, Trash2, ExternalLink, ToggleLeft, ToggleRight, ArrowLeft, } from "lucide-react";

const testes = [
  { id: 1, nome: "Teste de Lógica", tipo: "Parceiro", parceiro: "Mindsight", duracao: "30 min", vagas: 4, ativo: true },
  { id: 2, nome: "Teste de Inglês", tipo: "Parceiro", parceiro: "EF Education", duracao: "25 min", vagas: 2, ativo: true },
  { id: 3, nome: "Avaliação Técnica — Front-end", tipo: "Customizado", parceiro: "—", duracao: "60 min", vagas: 3, ativo: true },
  { id: 4, nome: "Case de Marketing", tipo: "Customizado", parceiro: "—", duracao: "90 min", vagas: 1, ativo: true },
  { id: 5, nome: "Teste de Excel", tipo: "Parceiro", parceiro: "TestGorilla", duracao: "20 min", vagas: 0, ativo: false },
  { id: 6, nome: "Avaliação Comportamental", tipo: "Parceiro", parceiro: "DISC Profile", duracao: "15 min", vagas: 5, ativo: true },
];

const SetupTestes = () => {
  const [search, setSearch] = useState("");
  const filtered = testes.filter((t) => t.nome.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-5">
        <Link to="/setup" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors mb-4">
          <ArrowLeft size={14} /> Voltar para Setup
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Parceiros & Customizados</h1>
            <p className="text-xs text-slate-400 mt-0.5">Gerencie os testes aplicados nos processos seletivos</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus size={14} /> Novo Teste
          </button>
        </div>

        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Buscar teste..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border bg-white pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
        </div>

        <div className="rounded-xl bg-white border border-blue-300 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left">
                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Teste</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Tipo</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Parceiro</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide text-center">Duração</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide text-center">Vagas</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide text-center">Status</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-slate-900">{t.nome}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${t.tipo === "Parceiro" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>{t.tipo}</span>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{t.parceiro}</td>
                  <td className="px-5 py-3 text-slate-600 text-center">{t.duracao}</td>
                  <td className="px-5 py-3 text-center text-slate-600">{t.vagas}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${t.ativo ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-400"}`}>{t.ativo ? "Ativo" : "Inativo"}</span>
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

export default SetupTestes;
