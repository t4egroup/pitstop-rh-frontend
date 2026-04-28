import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { Info, CheckCircle2, XCircle, ClipboardList, Target, Zap, Check, Users, ChevronDown, ChevronUp, CheckSquare, Square, ChevronLeft, ChevronRight, CalendarDays, Plus, Trash2, Shield, User, CreditCard, Phone, Mail, MapPin, FileText, Briefcase, BookOpen, Rocket } from "lucide-react";

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
];

const inputCls = "w-full border border-gray-100 rounded-lg bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 hover:border-blue-200 hover:shadow-sm transition-all duration-250 focus:outline-none focus:bg-white focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(70,104,179,0.08)]";

/* ── FieldWrapper ── */
const FieldWrapper = ({
  id, label, required = false, error, valid, extraIcon, children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error: string;
  valid: boolean;
  extraIcon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="relative">
    <label htmlFor={id} className="block text-xs font-semibold mb-2 text-slate-700 uppercase tracking-wide">
      {label}{required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="relative">
      {children}
      {valid
        ? <CheckCircle2 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none" />
        : error
        ? <XCircle size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 pointer-events-none" />
        : (extraIcon ?? null)
      }
    </div>
    {error && <p className="text-[10px] text-red-500 absolute -bottom-5 left-0 leading-tight">{error}</p>}
  </div>
);

/* ── DadosPessoaisForm ── */
const DadosPessoaisForm = ({ onConfirm }: { onConfirm: () => void }) => {
  const [values, setValues] = useState({
    nome: "", cpf: "", dataNascimento: "", telefone: "", email: "", cidade: "", estado: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (field: string, val: string): string => {
    switch (field) {
      case "nome":           return val.trim().length < 3 ? "Mínimo 3 caracteres" : "";
      case "cpf":            return !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(val) ? "Formato: 000.000.000-00" : "";
      case "dataNascimento": return !val ? "Campo obrigatório" : "";
      case "telefone":       return val.replace(/\D/g, "").length < 10 ? "Mínimo 10 dígitos" : "";
      case "email":          return !val.includes("@") ? "E-mail inválido" : "";
      case "cidade":         return val.trim().length < 2 ? "Mínimo 2 caracteres" : "";
      case "estado":         return val.trim().length !== 2 ? "Digite a UF (2 letras)" : "";
      default:               return "";
    }
  };

  const handleChange = (field: string, raw: string) => {
    let v = raw;
    if (field === "cpf") {
      v = raw
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        .slice(0, 14);
    }
    setValues(prev => ({ ...prev, [field]: v }));
  };

  const handleBlur = (field: string) =>
    setTouched(prev => ({ ...prev, [field]: true }));

  const err = (f: string) =>
    touched[f] ? validate(f, values[f as keyof typeof values]) : "";
  const ok  = (f: string) =>
    !!touched[f] && validate(f, values[f as keyof typeof values]) === "";

  const cls = (f: string) =>
    `${inputCls} pr-10 ${err(f) ? "border-red-400 focus:border-red-400 focus:ring-red-400/10" : ""}`;

  return (
    <form onSubmit={e => { e.preventDefault(); onConfirm(); }}>
      <div className="space-y-7">

        <FieldWrapper id="nome" label="Nome Completo" required error={err("nome")} valid={ok("nome")}>
          <input id="nome" type="text" placeholder="Seu nome completo" value={values.nome}
            onChange={e => handleChange("nome", e.target.value)}
            onBlur={() => handleBlur("nome")}
            className={cls("nome")} />
        </FieldWrapper>

        <FieldWrapper id="email" label="E-mail" required error={err("email")} valid={ok("email")}>
          <input id="email" type="email" placeholder="seu@email.com" value={values.email}
            onChange={e => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={cls("email")} />
        </FieldWrapper>

        <div className="grid grid-cols-2 gap-5">
          <FieldWrapper id="cpf" label="CPF" required error={err("cpf")} valid={ok("cpf")}>
            <input id="cpf" type="text" placeholder="000.000.000-00" value={values.cpf}
              onChange={e => handleChange("cpf", e.target.value)}
              onBlur={() => handleBlur("cpf")}
              className={cls("cpf")} />
          </FieldWrapper>

          <FieldWrapper id="telefone" label="Telefone" required error={err("telefone")} valid={ok("telefone")}>
            <input id="telefone" type="tel" placeholder="(00) 00000-0000" value={values.telefone}
              onChange={e => handleChange("telefone", e.target.value)}
              onBlur={() => handleBlur("telefone")}
              className={cls("telefone")} />
          </FieldWrapper>
        </div>

        <div className="grid" style={{ gridTemplateColumns: "40% 1fr", gap: "1.25rem" }}>
          <div>
            <FieldWrapper id="dataNascimento" label="Data de Nascimento" required
              error={err("dataNascimento")} valid={ok("dataNascimento")}>
              <input id="dataNascimento" type="date" value={values.dataNascimento}
                onChange={e => handleChange("dataNascimento", e.target.value)}
                onBlur={() => handleBlur("dataNascimento")}
                className={cls("dataNascimento")} />
            </FieldWrapper>
          </div>

          <div className="grid" style={{ gridTemplateColumns: "75% 25%", gap: "1.25rem" }}>
            <div>
              <FieldWrapper id="cidade" label="Cidade" required error={err("cidade")} valid={ok("cidade")}>
                <input id="cidade" type="text" placeholder="Sua cidade" value={values.cidade}
                  onChange={e => handleChange("cidade", e.target.value)}
                  onBlur={() => handleBlur("cidade")}
                  className={cls("cidade")} />
              </FieldWrapper>
            </div>

            <div>
              <FieldWrapper id="estado" label="Estado (UF)" required error={err("estado")} valid={ok("estado")}>
                <input id="estado" type="text" placeholder="UF" maxLength={2} value={values.estado}
                  onChange={e => handleChange("estado", e.target.value.toUpperCase())}
                  onBlur={() => handleBlur("estado")}
                  className={cls("estado")} />
              </FieldWrapper>
            </div>
          </div>
        </div>

      </div>
    </form>
  );
};

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

  const toggleSection = (i: number) =>
    setOpenSections((prev) => ({ ...prev, [i]: !prev[i] }));

  const markFilled = (i: number) =>
    setFilledSections((prev) => ({ ...prev, [i]: true }));

  const stepperSteps = [
    { n: "1", label: "Dados Básicos",      sub: "Nome, contato e localização",   filled: !!filledSections[0], active: !filledSections[0] },
    { n: "2", label: "Perfil Completo",    sub: "Formação e experiências",        filled: false,               active: false },
    { n: "3", label: "Pronto para vagas!", sub: "Candidate-se a qualquer vaga",   filled: false,               active: false },
  ];

  const metricCards = [
    { Icon: Zap,          color: "text-yellow-400", text: "Cadastro em 2 min" },
    { Icon: CheckCircle2, color: "text-green-400",  text: "100% gratuito" },
    { Icon: Users,        color: "text-blue-300",   text: "+600 vagas" },
  ];

  const darkPanelStyle = { background: "#1a1b2e" };

  const StepCircle = ({ step, size = "md" }: { step: typeof stepperSteps[0]; size?: "sm" | "md" }) => {
    const dim = size === "sm" ? "h-8 w-8" : "h-10 w-10";
    const textSize = size === "sm" ? 14 : 16;
    if (step.filled) {
      return (
        <div className={`${dim} rounded-full bg-green-500 flex items-center justify-center shrink-0`}>
          <Check size={size === "sm" ? 14 : 18} className="text-white" strokeWidth={3} />
        </div>
      );
    }
    if (step.active) {
      return (
        <div className={`${dim} rounded-full bg-yellow-500 flex items-center justify-center shrink-0 ring-4 ring-yellow-500/30 shadow-lg`}>
          <span className="text-white font-black" style={{ fontSize: `${textSize}px` }}>{step.n}</span>
        </div>
      );
    }
    return (
      <div className={`${dim} rounded-full border-2 border-white/20 flex items-center justify-center shrink-0`}>
        <span className="text-white/30 font-bold" style={{ fontSize: `${textSize}px` }}>{step.n}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2" style={{ background: "#1a1b2e" }}>

      {/* ══ Left column — form ══ */}
      <div className="flex flex-col h-screen relative bg-slate-50 order-2 lg:order-1">
        {/* Content wrapper - direto no fundo branco */}
        <div className="flex flex-col justify-center items-center flex-1 px-6 py-12">

          {/* Formulário em card flutuante */}
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-14" style={{
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.04)"
          }}>
            <div className="space-y-9">
              <div>
                <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
                  Criar sua conta
                </h1>
                <p className="text-lg text-slate-500 font-normal">
                  Preencha seus dados básicos para começar.
                </p>
              </div>

              <div className="flex items-start gap-2 rounded-lg p-3" style={{
                background: "rgba(70, 104, 179, 0.04)",
                borderLeft: "2px solid rgba(70, 104, 179, 0.2)"
              }}>
                <Info size={12} className="shrink-0 mt-0.5" style={{ color: "rgba(70, 104, 179, 0.6)" }} />
                <p className="text-xs leading-relaxed text-slate-600">
                  Só o essencial agora — complete seu perfil após o login.
                </p>
              </div>

              <div className="pt-4">
                <DadosPessoaisForm onConfirm={() => markFilled(0)} />
              </div>

              <button
                className="w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-md hover:scale-[1.01] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #4668B3 0%, #E1596B 100%)",
                  boxShadow: "0 12px 32px rgba(70, 104, 179, 0.25), 0 4px 12px rgba(225, 89, 107, 0.15), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                Criar conta e acessar plataforma
              </button>

              <p className="text-center text-xs text-slate-600 mt-2">
                Já tem uma conta?{" "}
                <a href="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  Entrar
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden relative overflow-hidden order-1" style={darkPanelStyle}>
        <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-20"
          style={{ background: "linear-gradient(160deg,#1e3a7a,#243c7e)", clipPath: "polygon(100% 0%,30% 0%,100% 70%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative z-10 px-6 py-6">
          <Logo white />
          <h2 className="text-2xl font-black text-white mt-4 mb-1">Sua carreira começa aqui.</h2>
          <p className="text-white/55 text-xs mb-5">Cadastro rápido. Perfil completo depois do login.</p>
          <div className="flex items-start">
            {stepperSteps.map((step, i, arr) => (
              <div key={i} className="flex items-start flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <StepCircle step={step} size="sm" />
                  <span className={`text-[10px] text-center leading-tight ${step.active || step.filled ? "font-semibold text-white" : "text-white/40"}`}>
                    {step.label.split(" ")[0]}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className="flex-1 h-px bg-white/20 mt-3.5 mx-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ Desktop right panel (lg+) - Blue Sidebar ══ */}
      <div className="hidden lg:flex relative overflow-hidden flex-col sticky top-0 h-screen order-1 shadow-[-4px_0_16px_rgba(0,0,0,0.08)]" style={{
        ...darkPanelStyle,
        borderRadius: "60px 0 0 60px"
      }}>
        <div className="relative z-10 flex flex-col h-full px-12 py-16 justify-center items-end text-right">

          {/* Conteúdo Principal */}
          <div className="max-w-md">
            {/* Tag Superior */}
            <div className="inline-block mb-6">
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ backgroundColor: "rgba(225, 89, 107, 0.15)", color: "#E1596B" }}>
                PASSO A PASSO
              </span>
            </div>

            {/* Título Principal */}
            <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
              A sua{" "}
              <span style={{ color: "#FFD700" }}>
                carreira
              </span>
              {" "}começa com este clique.
            </h1>

            {/* Subtítulo */}
            <p className="text-base text-white/70 leading-relaxed mb-16">
              Complete seu perfil para acessar as melhores oportunidades do mercado.
            </p>

            {/* Blocos de Progresso */}
            <div className="space-y-8">
              {/* Bloco 1 - Ativo */}
              <div className="flex gap-5 items-start justify-end">
                <div className="text-right flex-1">
                  <p className="text-lg font-bold text-yellow-400 leading-tight">
                    Dados Pessoais
                  </p>
                  <p className="text-sm text-white/60 mt-1 leading-tight">
                    Identificação e contato básico
                  </p>
                </div>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(255, 215, 0, 0.15)" }}>
                  <User size={28} color="#FFD700" strokeWidth={1.5} />
                </div>
              </div>

              {/* Bloco 2 - Inativo */}
              <div className="flex gap-5 items-start justify-end opacity-60">
                <div className="text-right flex-1">
                  <p className="text-lg font-bold text-white/70 leading-tight">
                    Experiência
                  </p>
                  <p className="text-sm text-white/50 mt-1 leading-tight">
                    Seu histórico profissional e acadêmico
                  </p>
                </div>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(59, 130, 246, 0.15)" }}>
                  <BookOpen size={28} color="#93c5fd" strokeWidth={1.5} />
                </div>
              </div>

              {/* Bloco 3 - Inativo */}
              <div className="flex gap-5 items-start justify-end opacity-60">
                <div className="text-right flex-1">
                  <p className="text-lg font-bold text-white/70 leading-tight">
                    Finalização
                  </p>
                  <p className="text-sm text-white/50 mt-1 leading-tight">
                    Perfil pronto para as vagas
                  </p>
                </div>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(59, 130, 246, 0.15)" }}>
                  <Rocket size={28} color="#93c5fd" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>

          {/* Logo no Rodapé */}
          <div className="absolute bottom-12 right-12 opacity-50">
            <Logo white />
          </div>

        </div>
      </div>

    </div>
  );
};

export default CandidateRegistration;
