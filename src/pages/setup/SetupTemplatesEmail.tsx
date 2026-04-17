import { Link } from "react-router-dom";
import { useState } from "react";
import { Plus, Search, Edit, Copy, Trash2, Eye, Mail, ArrowLeft, } from "lucide-react";

const templates = [
  { id: 1, nome: "Convite para Processo Seletivo", assunto: "Oportunidade: {vaga} na {empresa}", tipo: "Convite", atualizado: "10/04/2026" },
  { id: 2, nome: "Confirmação de Inscrição", assunto: "Sua inscrição foi recebida!", tipo: "Automático", atualizado: "08/04/2026" },
  { id: 3, nome: "Agendamento de Entrevista", assunto: "Entrevista agendada — {vaga}", tipo: "Agendamento", atualizado: "12/04/2026" },
  { id: 4, nome: "Feedback — Aprovação", assunto: "Parabéns! Você avançou no processo", tipo: "Feedback", atualizado: "05/04/2026" },
  { id: 5, nome: "Feedback — Reprovação", assunto: "Atualização do seu processo seletivo", tipo: "Feedback", atualizado: "05/04/2026" },
  { id: 6, nome: "Carta Oferta", assunto: "Proposta de trabalho — {empresa}", tipo: "Oferta", atualizado: "01/04/2026" },
  { id: 7, nome: "Lembrete de Documentação", assunto: "Documentação pendente — Admissão", tipo: "Admissão", atualizado: "14/04/2026" },
];

const tipoColor: Record<string, string> = {
  Convite: "bg-blue-50 text-blue-600",
  Automático: "bg-blue-50 text-purple-600",
  Agendamento: "bg-amber-50 text-amber-600",
  Feedback: "bg-green-50 text-green-600",
  Oferta: "bg-[#243c7e]/10 text-[#243c7e]",
  Admissão: "bg-orange-50 text-orange-600",
};

const SetupTemplatesEmail = () => {
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
            <h1 className="text-2xl font-extrabold text-slate-900">Templates de e-mail</h1>
            <p className="text-xs text-slate-400 mt-0.5">Modelos de e-mail para comunicação com candidatos</p>
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
                <Mail size={18} className="text-[#243c7e]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900">{t.nome}</h3>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${tipoColor[t.tipo] || "bg-slate-100 text-slate-500"}`}>{t.tipo}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Assunto: {t.assunto}</p>
                <p className="text-[11px] text-slate-400 mt-1">Atualizado em {t.atualizado}</p>
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

export default SetupTemplatesEmail;
