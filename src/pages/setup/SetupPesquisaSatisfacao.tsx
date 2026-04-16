import { Link } from "react-router-dom";
import { useState } from "react";
import { Save, Info, Star, MessageSquare, BarChart2, ArrowLeft, } from "lucide-react";

const SetupPesquisaSatisfacao = () => {
  const [ativa, setAtiva] = useState(true);
  const [momento, setMomento] = useState("encerramento");
  const [saved, setSaved] = useState(false);

  const [perguntas] = useState([
    { id: 1, texto: "Como você avalia a comunicação durante o processo seletivo?", tipo: "Escala 1-5" },
    { id: 2, texto: "O prazo do processo seletivo foi adequado?", tipo: "Sim/Não" },
    { id: 3, texto: "Você se sentiu respeitado(a) durante as entrevistas?", tipo: "Escala 1-5" },
    { id: 4, texto: "Recomendaria nossa empresa para um amigo se candidatar?", tipo: "NPS 0-10" },
    { id: 5, texto: "Deixe um comentário ou sugestão (opcional)", tipo: "Texto livre" },
  ]);

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
          <h1 className="text-2xl font-extrabold text-slate-900">Pesquisa de satisfação</h1>
          <p className="text-xs text-slate-400 mt-0.5">Configure a pesquisa enviada aos candidatos ao final do processo</p>
        </div>

        <div className="rounded-lg bg-blue-50 px-4 py-3 flex items-start gap-2">
          <Info size={14} className="text-blue-500 mt-0.5 shrink-0" />
          <p className="text-sm text-slate-600">
            A pesquisa de satisfação é enviada automaticamente aos candidatos. Os resultados ajudam a melhorar a experiência e contribuem para o Selo de Feedback.
          </p>
        </div>

        {/* Status */}
        <div className="rounded-xl bg-white border border-blue-300 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-sm text-slate-900">Status da pesquisa</h2>
              <p className="text-xs text-slate-400 mt-0.5">Ative ou desative o envio automático</p>
            </div>
            <button
              onClick={() => setAtiva(!ativa)}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${ativa ? "bg-primary" : "bg-slate-200"}`}
            >
              <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${ativa ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        </div>

        {/* Momento de envio */}
        <div className="rounded-xl bg-white border border-blue-300 p-5">
          <h2 className="font-bold text-sm text-slate-900 mb-3">Momento de envio</h2>
          <div className="space-y-2">
            {[
              { value: "encerramento", label: "Ao encerrar a vaga", desc: "Enviada quando a vaga é encerrada para todos os candidatos" },
              { value: "feedback", label: "Após envio de feedback", desc: "Enviada após o candidato receber feedback individual" },
              { value: "reprovacao", label: "Apenas para reprovados", desc: "Enviada somente para candidatos não aprovados" },
            ].map((opt) => (
              <label key={opt.value} className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${momento === opt.value ? "border-[#243c7e] bg-[#243c7e]/5" : "border-blue-300 hover:bg-slate-50"}`}>
                <span className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${momento === opt.value ? "border-[#243c7e]" : "border-slate-300"}`}>
                  {momento === opt.value && <span className="h-2 w-2 rounded-full bg-[#243c7e]" />}
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-900" onClick={() => setMomento(opt.value)}>{opt.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{opt.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Perguntas */}
        <div className="rounded-xl bg-white border border-blue-300 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100">
            <h2 className="font-bold text-sm text-slate-900">Perguntas configuradas</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {perguntas.map((p, i) => (
              <div key={p.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                <span className="text-xs font-bold text-slate-400 w-5 text-center">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900">{p.texto}</p>
                </div>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 shrink-0">{p.tipo}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Salvar */}
        <div className="flex justify-end gap-3">
          {saved && <span className="text-xs text-green-600 font-medium self-center">Salvo com sucesso!</span>}
          <button onClick={handleSave} className="flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
            <Save size={14} /> Salvar configuração
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupPesquisaSatisfacao;
