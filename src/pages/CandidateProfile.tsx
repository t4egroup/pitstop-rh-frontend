import {
  User, Mail, Phone, MapPin, Calendar, GraduationCap,
  Briefcase, Wrench, Languages, FileText, DollarSign,
  Clock, Pencil, Upload, CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

/* ── Mock data (replace with API later) ── */
const mockProfile = {
  name:       "João Silva",
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
    { name: "Português", level: "Nativo" },
    { name: "Inglês",    level: "Avançado" },
    { name: "Espanhol",  level: "Básico" },
  ],
  salary:       "R$ 8.000,00",
  availability: "Imediata",
  cvUploaded:   true,
};

/* ── Sub-components ── */

const SectionCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl border bg-white">
    <div className="flex items-center gap-2.5 px-5 py-4 border-b">
      <Icon size={16} className="text-primary" />
      <h2 className="text-sm font-semibold">{title}</h2>
    </div>
    <div className="px-5 py-4">{children}</div>
  </div>
);

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
    <p className="text-sm font-medium">{value}</p>
  </div>
);

/* ── Page ── */

const CandidateProfile = () => {
  const { user } = useAuth();
  const p = { ...mockProfile, name: user?.name ?? mockProfile.name, email: user?.email ?? mockProfile.email };

  return (
    <div className="container max-w-3xl py-8 space-y-5">

      {/* Header card */}
      <div className="rounded-xl border bg-white px-6 py-5 flex items-start gap-5">
        {/* Avatar */}
        <div className="shrink-0 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-extrabold text-primary">
          {p.name[0]}
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-extrabold truncate">{p.name}</h1>
          <p className="text-sm text-muted-foreground">{p.headline}</p>
          <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Mail size={12} />{p.email}</span>
            <span className="flex items-center gap-1"><Phone size={12} />{p.phone}</span>
            <span className="flex items-center gap-1"><MapPin size={12} />{p.city}, {p.state}</span>
          </div>
        </div>

        <button className="shrink-0 flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors">
          <Pencil size={12} />
          Editar
        </button>
      </div>

      {/* Dados Pessoais */}
      <SectionCard icon={User} title="Dados Pessoais">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Field label="Nome"            value={p.name} />
          <Field label="Data de Nasc."   value={p.birthDate} />
          <Field label="Telefone"        value={p.phone} />
          <Field label="E-mail"          value={p.email} />
          <Field label="Cidade"          value={p.city} />
          <Field label="Estado"          value={p.state} />
        </div>
      </SectionCard>

      {/* Sobre */}
      <SectionCard icon={FileText} title="Sobre Mim">
        <p className="text-sm text-muted-foreground leading-relaxed">{p.about}</p>
      </SectionCard>

      {/* Formação */}
      <SectionCard icon={GraduationCap} title="Formação Acadêmica">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Field label="Nível"       value={p.education.level} />
          <Field label="Curso"       value={p.education.course} />
          <Field label="Instituição" value={p.education.institution} />
          <Field label="Conclusão"   value={p.education.year} />
        </div>
      </SectionCard>

      {/* Experiência */}
      <SectionCard icon={Briefcase} title="Experiência Profissional">
        <div className="space-y-5">
          {p.experiences.map((exp, i) => (
            <div key={i} className="relative pl-4 border-l-2 border-primary/20">
              <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-primary" />
              <p className="text-sm font-semibold">{exp.role}</p>
              <div className="flex items-center gap-2 mt-0.5 mb-1.5">
                <p className="text-xs font-medium text-primary">{exp.company}</p>
                <span className="text-muted-foreground/40 text-xs">·</span>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar size={11} />{exp.period}
                </p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Habilidades */}
      <SectionCard icon={Wrench} title="Habilidades Técnicas">
        <div className="flex flex-wrap gap-2">
          {p.skills.map(skill => (
            <span
              key={skill}
              className="rounded-full border bg-primary/5 text-primary px-3 py-1 text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </SectionCard>

      {/* Idiomas */}
      <SectionCard icon={Languages} title="Idiomas">
        <div className="flex flex-wrap gap-3">
          {p.languages.map(lang => (
            <div key={lang.name} className="rounded-xl border bg-muted/30 px-4 py-2.5 text-center min-w-[90px]">
              <p className="text-sm font-semibold">{lang.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{lang.level}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Informações Complementares */}
      <SectionCard icon={DollarSign} title="Informações Complementares">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">Pretensão Salarial</p>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{p.salary}</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">Disponibilidade</p>
            <p className="text-sm font-medium flex items-center gap-1">
              <Clock size={12} className="text-muted-foreground" />
              {p.availability}
            </p>
          </div>
        </div>
      </SectionCard>

      {/* Currículo */}
      <SectionCard icon={FileText} title="Currículo (CV)">
        {p.cvUploaded ? (
          <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800/40 p-3">
            <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">curriculo_joao_silva.pdf</p>
              <p className="text-xs text-muted-foreground">Enviado em 10/04/2026</p>
            </div>
            <button className="text-xs text-primary font-medium hover:underline shrink-0">Substituir</button>
          </div>
        ) : (
          <button className="w-full flex flex-col items-center gap-2 rounded-xl border-2 border-dashed py-8 text-muted-foreground hover:bg-muted/30 transition-colors">
            <Upload size={24} />
            <span className="text-sm font-medium">Clique para enviar seu currículo</span>
            <span className="text-xs">PDF, DOC ou DOCX · até 5 MB</span>
          </button>
        )}
      </SectionCard>

    </div>
  );
};

export default CandidateProfile;
