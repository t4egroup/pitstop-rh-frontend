import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Printer } from "lucide-react";

/* ────────────────────────────────────────────────────────────
   Mock — em produção substituir pelos dados reais do candidato
   ──────────────────────────────────────────────────────────── */
const mockProfile = {
  name:       "João Silva",
  cpf:        "123.456.789-00",
  email:      "joao@email.com",
  phone:      "(11) 98765-4321",
  city:       "São Paulo",
  state:      "SP",
  birthDate:  "15/03/1995",
  headline:   "Desenvolvedor Front-end",
  about:      "Profissional apaixonado por tecnologia com 4 anos de experiência em desenvolvimento web. Busco oportunidades onde possa contribuir com soluções de impacto e continuar crescendo.",
  education: {
    level:       "Graduação",
    institution: "Universidade Mackenzie",
    course:      "Ciência da Computação",
    year:        "2017",
  },
  experiences: [
    {
      company:     "Inovatech",
      role:        "Desenvolvedor Front-end Pleno",
      period:      "Mar/2022 – Atual",
      description: "Desenvolvimento de interfaces React, integração com APIs REST e liderança técnica de pequenas entregas.",
    },
    {
      company:     "Agência Digital X",
      role:        "Desenvolvedor Front-end Jr.",
      period:      "Jan/2019 – Fev/2022",
      description: "Criação de landing pages, manutenção de e-commerces e suporte a designers no processo de handoff.",
    },
  ],
  skills:    ["React", "TypeScript", "Tailwind CSS", "Node.js", "Git", "Figma"],
  languages: [
    { name: "Português", level: "Nativo"   },
    { name: "Inglês",    level: "Avançado" },
    { name: "Espanhol",  level: "Básico"   },
  ],
  salary:       "R$ 8.000,00",
  availability: "Imediata",
};

/* ──────────────────────────────────────────────────────────── */

const Section = ({ title }: { title: string }) => (
  <div className="print:mt-4 mt-6 mb-2 border-b-2 border-[#243c7e] pb-1">
    <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#243c7e]">{title}</h2>
  </div>
);

const CurriculoGerado = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const cvRef = useRef<HTMLDivElement>(null);

  const p = { ...mockProfile, name: user?.name ?? mockProfile.name, email: user?.email ?? mockProfile.email };

  const handlePrint = () => window.print();

  return (
    <>
      {/* ── Barra de ações — oculta na impressão ── */}
      <div className="print:hidden sticky top-0 z-10 flex items-center gap-3 bg-white border-b px-6 py-3 shadow-sm">
        <button
          onClick={() => navigate("/candidato/perfil")}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={15} /> Voltar ao perfil
        </button>
        <span className="text-slate-200">|</span>
        <span className="text-sm font-semibold text-slate-700">Pré-visualização do Currículo</span>
        <button
          onClick={handlePrint}
          className="ml-auto flex items-center gap-2 rounded-full bg-[#243c7e] text-white px-5 py-2 text-sm font-bold hover:opacity-90 transition-opacity shadow"
        >
          <Printer size={15} /> Imprimir / Salvar PDF
        </button>
      </div>

      {/* ── Área de impressão ── */}
      <div className="print:m-0 print:p-0 flex justify-center bg-slate-100 min-h-screen py-10 px-4">
        <div
          ref={cvRef}
          className="print:shadow-none print:w-full bg-white shadow-xl w-full max-w-[794px] min-h-[1123px] p-[56px] text-slate-800"
          style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
        >
          {/* ── Cabeçalho ── */}
          <div className="flex items-start justify-between mb-1">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#243c7e]">{p.name}</h1>
              <p className="text-base font-semibold text-slate-500 mt-0.5">{p.headline}</p>
            </div>
            <div className="text-right text-xs text-slate-500 space-y-0.5 mt-1">
              <p>{p.email}</p>
              <p>{p.phone}</p>
              <p>{p.city}, {p.state}</p>
              <p>Nascimento: {p.birthDate}</p>
            </div>
          </div>
          <div className="h-[3px] rounded-full mt-4 mb-1"
            style={{ background: "linear-gradient(90deg,#ea3839,#243c7e)" }} />

          {/* ── Sobre ── */}
          <Section title="Sobre mim" />
          <p className="text-sm text-slate-600 leading-relaxed">{p.about}</p>

          {/* ── Experiências ── */}
          <Section title="Experiência Profissional" />
          <div className="space-y-4">
            {p.experiences.map((exp, i) => (
              <div key={i}>
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-bold text-slate-800">{exp.role}</p>
                  <p className="text-xs text-slate-400 shrink-0 ml-2">{exp.period}</p>
                </div>
                <p className="text-xs font-semibold text-[#243c7e] mb-0.5">{exp.company}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* ── Formação ── */}
          <Section title="Formação Acadêmica" />
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-sm font-bold text-slate-800">{p.education.course}</p>
              <p className="text-xs text-slate-500">{p.education.institution} — {p.education.level}</p>
            </div>
            <p className="text-xs text-slate-400 shrink-0 ml-2">Conclusão: {p.education.year}</p>
          </div>

          {/* ── Habilidades ── */}
          <Section title="Habilidades Técnicas" />
          <div className="flex flex-wrap gap-2">
            {p.skills.map(skill => (
              <span
                key={skill}
                className="rounded-full border border-[#243c7e]/30 bg-[#243c7e]/5 text-[#243c7e] px-3 py-0.5 text-xs font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* ── Idiomas ── */}
          <Section title="Idiomas" />
          <div className="flex gap-6">
            {p.languages.map(lang => (
              <div key={lang.name}>
                <p className="text-sm font-semibold text-slate-800">{lang.name}</p>
                <p className="text-xs text-slate-400">{lang.level}</p>
              </div>
            ))}
          </div>

          {/* ── Complementar ── */}
          <Section title="Informações Complementares" />
          <div className="flex gap-10">
            <div>
              <p className="text-[11px] text-slate-400 uppercase tracking-wide font-medium">Pretensão Salarial</p>
              <p className="text-sm font-semibold text-emerald-600">{p.salary}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 uppercase tracking-wide font-medium">Disponibilidade</p>
              <p className="text-sm font-semibold text-slate-700">{p.availability}</p>
            </div>
          </div>

          {/* ── Rodapé ── */}
          <div className="mt-10 pt-4 border-t border-slate-100 text-center text-[10px] text-slate-300">
            Gerado pelo PitStop RH · pitstop.com.br
          </div>
        </div>
      </div>

      {/* ── Estilos de impressão ── */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #root > * { visibility: hidden; }
          .print\\:shadow-none, .print\\:shadow-none * { visibility: visible; }
          .print\\:shadow-none { position: absolute; top: 0; left: 0; }
        }
      `}</style>
    </>
  );
};

export default CurriculoGerado;
