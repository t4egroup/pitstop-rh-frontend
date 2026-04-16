import { Link } from "react-router-dom";
import { useState } from "react";
import { Plus, Search, Edit, Copy, Trash2, Eye, FileText, ArrowLeft, } from "lucide-react";

const templates = [
  { id: 1, nome: "Vaga de Tecnologia — Padrão", descricao: "Template padrão para vagas de TI com seções de requisitos técnicos e benefícios", vagas: 8, atualizado: "10/04/2026" },
  { id: 2, nome: "Vaga Operacional", descricao: "Template para vagas operacionais com foco em requisitos práticos e escalas", vagas: 3, atualizado: "05/04/2026" },
  { id: 3, nome: "Programa de Estágio", descricao: "Template voltado para vagas de estágio com seção de benefícios para estudantes", vagas: 2, atualizado: "01/04/2026" },
  { id: 4, nome: "Posição Executiva", descricao: "Template para cargos de liderança com seção de desafios estratégicos", vagas: 1, atualizado: "08/04/2026" },
  { id: 5, nome: "Vaga Remota", descricao: "Modelo otimizado para posições 100% remotas com info de ferramentas e fuso", vagas: 4, atualizado: "12/04/2026" },
];

const SetupTemplatesVaga = () => {
  const [search, setSearch] = useState("");
  const filtered = templates.filter((t) => t.nome.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-5">
        <Link to="/setup" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors mb-4">
          <ArrowLeft size={14} /> Voltar para Setup
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Templates de vaga</h1>
            <p className="text-xs text-slate-400 mt-0.5">Modelos pré-configurados para agilizar a criação de vagas</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus size={14} /> Novo Template
          </button>
        </div>

        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Buscar template..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border bg-white pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
        </div>

        <div className="space-y-3">
          {filtered.map((t) => (
            <div key={t.id} className="rounded-xl bg-white border border-blue-300 p-5 hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-[#243c7e]/10 flex items-center justify-center shrink-0">
                <FileText size={18} className="text-[#243c7e]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-slate-900">{t.nome}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{t.descricao}</p>
                <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-400">
                  <span>Usado em {t.vagas} vagas</span>
                  <span>Atualizado em {t.atualizado}</span>
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

export default SetupTemplatesVaga;
