import { Link } from "react-router-dom";
import { useState } from "react";
import { Save, Info, Plus, Trash2, ArrowLeft, } from "lucide-react";

const dimensoesIniciais = [
  { id: 1, nome: "Trabalho em equipe", peso: 25, perguntas: 5 },
  { id: 2, nome: "Inovação", peso: 20, perguntas: 4 },
  { id: 3, nome: "Comunicação", peso: 20, perguntas: 5 },
  { id: 4, nome: "Liderança", peso: 15, perguntas: 4 },
  { id: 5, nome: "Adaptabilidade", peso: 20, perguntas: 3 },
];

const SetupFitCultural = () => {
  const [dimensoes] = useState(dimensoesIniciais);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-5">
        <Link to="/setup" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft size={14} /> Voltar para Setup
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Fit Cultural</h1>
          <p className="text-xs text-slate-400 mt-0.5">Configure as dimensões culturais e seus pesos no teste de fit cultural</p>
        </div>

        <div className="rounded-lg bg-blue-50 px-4 py-3 flex items-start gap-2">
          <Info size={14} className="text-blue-500 mt-0.5 shrink-0" />
          <p className="text-sm text-slate-600">
            O teste de Fit Cultural avalia o alinhamento dos candidatos com os valores da empresa. Defina as dimensões e seus pesos para calcular a compatibilidade.
          </p>
        </div>

        <div className="rounded-xl bg-white border border-blue-300 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-sm text-slate-900">Dimensões culturais</h2>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-[#243c7e] hover:underline">
              <Plus size={13} /> Adicionar dimensão
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left">
                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Dimensão</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide text-center">Peso (%)</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide text-center">Perguntas</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dimensoes.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-slate-900">{d.nome}</td>
                  <td className="px-5 py-3 text-center">
                    <span className="inline-block w-12 text-center rounded-lg border bg-slate-50 px-2 py-1 text-sm font-semibold text-slate-700">{d.peso}</span>
                  </td>
                  <td className="px-5 py-3 text-center text-slate-600">{d.perguntas}</td>
                  <td className="px-5 py-3 text-right">
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">Total: {dimensoes.reduce((a, d) => a + d.peso, 0)}%</span>
            <div className="flex items-center gap-3">
              {saved && <span className="text-xs text-green-600 font-medium">Salvo com sucesso!</span>}
              <button onClick={handleSave} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
                <Save size={14} /> Salvar configuração
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupFitCultural;
