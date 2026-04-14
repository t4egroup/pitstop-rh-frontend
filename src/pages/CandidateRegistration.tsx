import { useState } from "react";
import { AlertTriangle, Save, ChevronDown, ChevronUp } from "lucide-react";

const sections = [
  {
    title: "Dados Pessoais",
    fields: [
      { label: "Nome Completo", type: "text", placeholder: "Seu nome completo" },
      { label: "CPF", type: "text", placeholder: "000.000.000-00" },
      { label: "Data de Nascimento", type: "date", placeholder: "" },
      { label: "Telefone", type: "tel", placeholder: "(00) 00000-0000" },
      { label: "E-mail", type: "email", placeholder: "seu@email.com" },
      { label: "Cidade", type: "text", placeholder: "Sua cidade" },
      { label: "Estado", type: "text", placeholder: "UF" },
    ],
  },
  {
    title: "Formação Acadêmica",
    fields: [
      { label: "Nível de Escolaridade", type: "select", options: ["Ensino Médio", "Técnico", "Graduação", "Pós-Graduação", "Mestrado", "Doutorado"] },
      { label: "Instituição de Ensino", type: "text", placeholder: "Nome da instituição" },
      { label: "Curso", type: "text", placeholder: "Nome do curso" },
      { label: "Ano de Conclusão", type: "text", placeholder: "2024" },
    ],
  },
  {
    title: "Experiência Profissional",
    fields: [
      { label: "Empresa", type: "text", placeholder: "Nome da empresa" },
      { label: "Cargo", type: "text", placeholder: "Cargo ocupado" },
      { label: "Período", type: "text", placeholder: "Jan/2020 - Dez/2023" },
      { label: "Descrição das Atividades", type: "textarea", placeholder: "Descreva suas principais atividades..." },
    ],
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
      { label: "Pretensão Salarial", type: "text", placeholder: "R$ 0.000,00" },
      { label: "Disponibilidade", type: "select", options: ["Imediata", "15 dias", "30 dias", "A combinar"] },
      { label: "Sobre Você", type: "textarea", placeholder: "Fale brevemente sobre seus objetivos profissionais..." },
    ],
  },
];

const CandidateRegistration = () => {
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
    <div className="container max-w-3xl py-8">
      <h1 className="text-2xl font-bold mb-1">Cadastro do Candidato</h1>
      <p className="text-muted-foreground text-sm mb-6">Preencha todas as seções para ativar sua conta.</p>

      {/* Alert */}
      <div className="mb-6 flex items-start gap-3 rounded-lg border border-warning/40 bg-warning/10 p-4 text-sm">
        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-warning" />
        <span>Sua conta só será ativada e elegível para vagas após <strong>100% de preenchimento</strong>.</span>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm mb-1.5">
          <span className="font-medium">Progresso do cadastro</span>
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
            <div key={idx} className="rounded-lg border bg-card overflow-hidden">
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

              {open && (
                <div className="border-t px-5 py-5 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {section.fields.map((field, fi) => (
                      <div key={fi} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                        <label className="block text-xs font-medium mb-1.5 text-muted-foreground">{field.label}</label>
                        {field.type === "textarea" ? (
                          <textarea rows={3} placeholder={field.placeholder} className="w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        ) : field.type === "select" ? (
                          <select className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                            <option value="">Selecione...</option>
                            {field.options?.map((o) => (
                              <option key={o} value={o}>{o}</option>
                            ))}
                          </select>
                        ) : (
                          <input type={field.type} placeholder={field.placeholder} className="w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => markFilled(idx)}
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      Confirmar seção
                    </button>
                  </div>
                </div>
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
  );
};

export default CandidateRegistration;
