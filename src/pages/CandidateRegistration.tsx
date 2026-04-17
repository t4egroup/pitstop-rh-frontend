import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Save, ChevronDown, ChevronUp, ArrowLeft, CheckSquare, Square, ChevronLeft, ChevronRight, CalendarDays, Plus, Trash2 } from "lucide-react";

/* ── MonthYearPicker ── */
const MESES = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
const MESES_FULL = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

const MonthYearPicker = ({
  value, onChange, placeholder = "MM/AAAA",
}: {
  value: { month: number | null; year: number | null };
  onChange: (v: { month: number | null; year: number | null }) => void;
  placeholder?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(value.year ?? new Date().getFullYear());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const label = value.month !== null && value.year !== null
    ? `${MESES_FULL[value.month]} ${value.year}`
    : placeholder;

  const selectMonth = (m: number) => {
    onChange({ month: m, year: viewYear });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 hover:border-primary/50 transition-colors"
      >
        <span className={value.month !== null ? "text-foreground" : "text-muted-foreground"}>
          {label}
        </span>
        <CalendarDays size={14} className="text-muted-foreground shrink-0" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-64 rounded-xl border bg-white shadow-xl p-4">
          {/* Navegação de ano */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => setViewYear(y => y - 1)}
              className="h-7 w-7 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-sm font-bold">{viewYear}</span>
            <button
              type="button"
              onClick={() => setViewYear(y => y + 1)}
              disabled={viewYear >= new Date().getFullYear()}
              className="h-7 w-7 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Grid de meses */}
          <div className="grid grid-cols-3 gap-1.5">
            {MESES.map((m, i) => {
              const selected = value.month === i && value.year === viewYear;
              const futuro = viewYear === new Date().getFullYear() && i > new Date().getMonth();
              return (
                <button
                  key={m}
                  type="button"
                  disabled={futuro}
                  onClick={() => selectMonth(i)}
                  className={`rounded-lg py-1.5 text-xs font-semibold transition-colors ${
                    selected
                      ? "bg-primary text-primary-foreground"
                      : futuro
                      ? "text-muted-foreground/40 cursor-not-allowed"
                      : "hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const sections = [
  {
    title: "Dados Pessoais",
    fields: [
      { label: "Nome Completo", type: "text", placeholder: "Seu nome completo", required: true },
      { label: "CPF", type: "text", placeholder: "000.000.000-00", required: true },
      { label: "Data de Nascimento", type: "date", placeholder: "", required: true },
      { label: "Telefone", type: "tel", placeholder: "(00) 00000-0000", required: true },
      { label: "E-mail", type: "email", placeholder: "seu@email.com", required: true },
      { label: "Cidade", type: "text", placeholder: "Sua cidade", required: true },
      { label: "Estado", type: "text", placeholder: "UF", required: true },
    ],
  },
  {
    title: "Formação Acadêmica",
    fields: [],
    custom: "formacao",
  },
  {
    title: "Experiência Profissional",
    fields: [],
    custom: "experiencia",
  },
  {
    title: "Habilidades e Idiomas",
    fields: [
      { label: "Habilidades Técnicas", type: "textarea", placeholder: "Ex: Excel avançado, Power BI, SAP..." },
      { label: "Idiomas", type: "text", placeholder: "Ex: Inglês (Avançado), Espanhol (Básico)" },
    ],
  },
  {
    title: "Informações Complementares",
    fields: [
      { label: "Disponibilidade", type: "select", options: ["Imediata", "15 dias", "30 dias", "A combinar"] },
      { label: "Tipo de CNH", type: "select", options: ["Não possui CNH", "A", "B", "C", "D", "E", "AB", "AC", "AD", "AE"] },
      { label: "Disponibilidade para mudar de residência", type: "select", options: ["Sim", "Não", "A negociar"] },
      { label: "Disponibilidade para viagens", type: "select", options: ["Sim", "Não", "A negociar"] },
    ],
  },
];

const inputCls = "w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30";

/* ── tipos ── */
type MonthYear = { month: number | null; year: number | null };
interface ExpEntry { id: number; empresa: string; cargo: string; inicio: MonthYear; fim: MonthYear; empregoAtual: boolean; ultimoSalario: string; descricao: string; }
interface FormacaoEntry { id: number; nivel: string; instituicao: string; curso: string; ano: string; }

const emptyExp = (id: number): ExpEntry => ({ id, empresa: "", cargo: "", inicio: { month: null, year: null }, fim: { month: null, year: null }, empregoAtual: false, ultimoSalario: "", descricao: "" });
const emptyFormacao = (id: number): FormacaoEntry => ({ id, nivel: "", instituicao: "", curso: "", ano: "" });

/* ── Experiência Profissional ── */
const ExperienciaProfissional = ({ onConfirm }: { onConfirm: () => void }) => {
  const [entries, setEntries] = useState<ExpEntry[]>([emptyExp(1)]);

  const update = (id: number, patch: Partial<ExpEntry>) =>
    setEntries(prev => prev.map(e => e.id === id ? { ...e, ...patch } : e));

  const addEntry = () => setEntries(prev => [...prev, emptyExp(Date.now())]);
  const removeEntry = (id: number) => setEntries(prev => prev.filter(e => e.id !== id));

  return (
    <form className="border-t px-5 py-5 space-y-5" onSubmit={(e) => { e.preventDefault(); onConfirm(); }}>
      {entries.map((entry, idx) => (
        <div key={entry.id} className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">

          {/* Header da entrada */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
              Experiência {idx + 1}
            </span>
            {entries.length > 1 && (
              <button
                type="button"
                onClick={() => removeEntry(entry.id)}
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors"
              >
                <Trash2 size={12} /> Remover
              </button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Empresa</label>
              <input type="text" placeholder="Nome da empresa" value={entry.empresa}
                onChange={e => update(entry.id, { empresa: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Cargo</label>
              <input type="text" placeholder="Cargo ocupado" value={entry.cargo}
                onChange={e => update(entry.id, { cargo: e.target.value })} className={inputCls} />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Início</label>
              <MonthYearPicker value={entry.inicio} onChange={v => update(entry.id, { inicio: v })} placeholder="Mês / Ano" />
            </div>

            <div className="flex items-end pb-0.5">
              <button
                type="button"
                onClick={() => update(entry.id, { empregoAtual: !entry.empregoAtual })}
                className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-primary transition-colors"
              >
                {entry.empregoAtual
                  ? <CheckSquare size={16} className="text-primary" />
                  : <Square size={16} className="text-slate-400" />}
                Emprego atual
              </button>
            </div>

            {!entry.empregoAtual && (
              <div>
                <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Fim</label>
                <MonthYearPicker value={entry.fim} onChange={v => update(entry.id, { fim: v })} placeholder="Mês / Ano" />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Último Salário</label>
              <input type="text" placeholder="R$ 0.000,00" value={entry.ultimoSalario}
                onChange={e => update(entry.id, { ultimoSalario: e.target.value })} className={inputCls} />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Descrição das Atividades</label>
              <textarea rows={3} placeholder="Descreva suas principais atividades..." value={entry.descricao}
                onChange={e => update(entry.id, { descricao: e.target.value })} className={inputCls} />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEntry}
        className="flex items-center gap-2 rounded-lg border border-dashed border-primary/40 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 transition-colors w-full justify-center"
      >
        <Plus size={14} /> Adicionar outra experiência
      </button>

      <div className="flex justify-end pt-1">
        <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
          Confirmar seção
        </button>
      </div>
    </form>
  );
};

/* ── Formação Acadêmica ── */
const FormacaoAcademica = ({ onConfirm }: { onConfirm: () => void }) => {
  const [entries, setEntries] = useState<FormacaoEntry[]>([emptyFormacao(1)]);

  const update = (id: number, patch: Partial<FormacaoEntry>) =>
    setEntries(prev => prev.map(e => e.id === id ? { ...e, ...patch } : e));

  const addEntry = () => setEntries(prev => [...prev, emptyFormacao(Date.now())]);
  const removeEntry = (id: number) => setEntries(prev => prev.filter(e => e.id !== id));

  return (
    <form className="border-t px-5 py-5 space-y-5" onSubmit={(e) => { e.preventDefault(); onConfirm(); }}>
      {entries.map((entry, idx) => (
        <div key={entry.id} className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
              Formação {idx + 1}
            </span>
            {entries.length > 1 && (
              <button
                type="button"
                onClick={() => removeEntry(entry.id)}
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors"
              >
                <Trash2 size={12} /> Remover
              </button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Nível de Escolaridade</label>
              <select value={entry.nivel} onChange={e => update(entry.id, { nivel: e.target.value })} className={inputCls}>
                <option value="">Selecione...</option>
                {["Ensino Médio","Técnico","Graduação","Pós-Graduação","Mestrado","Doutorado"].map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Instituição de Ensino</label>
              <input type="text" placeholder="Nome da instituição" value={entry.instituicao}
                onChange={e => update(entry.id, { instituicao: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Curso</label>
              <input type="text" placeholder="Nome do curso" value={entry.curso}
                onChange={e => update(entry.id, { curso: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Ano de Conclusão</label>
              <input type="text" placeholder="2024" value={entry.ano}
                onChange={e => update(entry.id, { ano: e.target.value })} className={inputCls} />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEntry}
        className="flex items-center gap-2 rounded-lg border border-dashed border-primary/40 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 transition-colors w-full justify-center"
      >
        <Plus size={14} /> Adicionar outra formação
      </button>

      <div className="flex justify-end pt-1">
        <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
          Confirmar seção
        </button>
      </div>
    </form>
  );
};

const CandidateRegistration = () => {
  const navigate = useNavigate();
  const [filledSections, setFilledSections] = useState<Record<number, boolean>>({});
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({ 0: true });

  const totalSections = sections.length;
  const filledCount = Object.values(filledSections).filter(Boolean).length;
  const progress = Math.round((filledCount / totalSections) * 100);

  const toggleSection = (i: number) =>
    setOpenSections((prev) => ({ ...prev, [i]: !prev[i] }));

  const markFilled = (i: number) =>
    setFilledSections((prev) => ({ ...prev, [i]: true }));

  return (
    <div className="min-h-screen bg-slate-50">
    <div className="container max-w-3xl py-10">
      <button
        onClick={() => navigate("/login")}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Voltar para o login
      </button>
      <h1 className="text-2xl font-bold mb-1 text-slate-900">Cadastro do Candidato</h1>
      <p className="text-slate-500 text-sm mb-6">Preencha todas as seções para ativar sua conta.</p>

      {/* Alert */}
      <div className="mb-6 flex items-start gap-3 rounded-lg border border-warning/40 bg-warning/10 p-4 text-sm">
        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-warning" />
        <span>Sua conta só será ativada e elegível para vagas após <strong>100% de preenchimento</strong>.</span>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm mb-1.5">
          <span className="font-medium text-slate-700">Progresso do cadastro</span>
          <span className="font-semibold text-primary">{progress}%</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section, idx) => {
          const open = openSections[idx];
          const filled = filledSections[idx];
          return (
            <div key={idx} className="rounded-lg border bg-white overflow-hidden">
              <button
                onClick={() => toggleSection(idx)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${filled ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}`}>
                    {idx + 1}
                  </div>
                  <span className="font-semibold text-sm">{section.title}</span>
                </div>
                {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {open && (section as any).custom === "formacao" && (
                <FormacaoAcademica onConfirm={() => markFilled(idx)} />
              )}

              {open && (section as any).custom === "experiencia" && (
                <ExperienciaProfissional onConfirm={() => markFilled(idx)} />
              )}

              {open && !(section as any).custom && (
                <form
                  className="border-t px-5 py-5 space-y-4"
                  onSubmit={(e) => { e.preventDefault(); markFilled(idx); }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    {section.fields.map((field, fi) => (
                      <div key={fi} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                        <label className="block text-xs font-medium mb-1.5 text-muted-foreground">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-0.5">*</span>}
                        </label>
                        {field.type === "textarea" ? (
                          <textarea rows={3} placeholder={field.placeholder} required={field.required} className="w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        ) : field.type === "select" ? (
                          <select required={field.required} className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                            <option value="">Selecione...</option>
                            {field.options?.map((o) => (
                              <option key={o} value={o}>{o}</option>
                            ))}
                          </select>
                        ) : (
                          <input type={field.type} placeholder={field.placeholder} required={field.required} className="w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      Confirmar seção
                    </button>
                  </div>
                </form>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
        <button className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
          <Save size={16} />
          Salvar Rascunho
        </button>
        <button
          disabled={progress < 100}
          className="w-full sm:w-auto rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Finalizar Cadastro
        </button>
      </div>
    </div>
    </div>
  );
};

export default CandidateRegistration;
