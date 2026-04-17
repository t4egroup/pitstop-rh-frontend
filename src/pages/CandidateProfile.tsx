import { useState } from "react";
import {
  User, Mail, Phone, MapPin, Calendar, GraduationCap,
  Briefcase, Wrench, Languages, FileText, DollarSign,
  Clock, Pencil, Upload, CheckCircle2, X, Save, CreditCard,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

/* ── Mock data ── */
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
  cvUploaded:   true,
};

/* ── Helpers ── */
const SectionCard = ({
  icon: Icon, title, editing, onEdit, children,
}: {
  icon: React.ElementType;
  title: string;
  editing?: boolean;
  onEdit?: () => void;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl border bg-white">
    <div className="flex items-center justify-between px-5 py-4 border-b">
      <div className="flex items-center gap-2.5">
        <Icon size={16} className="text-primary" />
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
            editing
              ? "border-red-200 text-red-500 hover:bg-red-50"
              : "hover:bg-muted"
          }`}
        >
          {editing ? <><X size={11} /> Cancelar</> : <><Pencil size={11} /> Editar</>}
        </button>
      )}
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

const inputCls = "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

/* ── Page ── */
const CandidateProfile = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    ...mockProfile,
    name:  user?.name  ?? mockProfile.name,
    email: user?.email ?? mockProfile.email,
  });

  // per-section edit flags
  const [editing, setEditing] = useState({
    pessoal: false,
    sobre:   false,
    formacao: false,
    experiencias: false,
    habilidades: false,
    idiomas: false,
    complementar: false,
  });

  // draft states
  const [draft, setDraft] = useState(profile);

  const [saved, setSaved] = useState<string | null>(null);

  const startEdit = (section: keyof typeof editing) => {
    setDraft(profile);
    setEditing(e => ({ ...e, [section]: true }));
  };

  const cancelEdit = (section: keyof typeof editing) => {
    setDraft(profile);
    setEditing(e => ({ ...e, [section]: false }));
  };

  const saveSection = (section: keyof typeof editing) => {
    setProfile(draft);
    setEditing(e => ({ ...e, [section]: false }));
    setSaved(section);
    setTimeout(() => setSaved(null), 2500);
  };

  const SaveBar = ({ section }: { section: keyof typeof editing }) => (
    <div className="flex items-center justify-end gap-2 pt-3 border-t mt-3">
      {saved === section && (
        <span className="text-xs text-green-600 font-medium mr-auto flex items-center gap-1">
          <CheckCircle2 size={12} /> Salvo com sucesso!
        </span>
      )}
      <button
        onClick={() => cancelEdit(section)}
        className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors"
      >
        Cancelar
      </button>
      <button
        onClick={() => saveSection(section)}
        className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity"
      >
        <Save size={12} /> Salvar
      </button>
    </div>
  );

  return (
    <div className="container max-w-3xl py-8 space-y-5">

      {/* Header card */}
      <div className="rounded-xl border bg-white px-6 py-5 flex items-start gap-5">
        <div className="shrink-0 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-extrabold text-primary">
          {profile.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-extrabold truncate">{profile.name}</h1>
          <p className="text-sm text-muted-foreground">{profile.headline}</p>
          <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Mail size={12} />{profile.email}</span>
            <span className="flex items-center gap-1"><Phone size={12} />{profile.phone}</span>
            <span className="flex items-center gap-1"><MapPin size={12} />{profile.city}, {profile.state}</span>
          </div>
        </div>
      </div>

      {/* Dados Pessoais */}
      <SectionCard
        icon={User} title="Dados Pessoais"
        editing={editing.pessoal}
        onEdit={() => editing.pessoal ? cancelEdit("pessoal") : startEdit("pessoal")}
      >
        {editing.pessoal ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "Nome",           key: "name",      type: "text"  },
                { label: "CPF",            key: "cpf",       type: "text"  },
                { label: "Data de Nasc.",  key: "birthDate", type: "text"  },
                { label: "Telefone",       key: "phone",     type: "tel"   },
                { label: "E-mail",         key: "email",     type: "email" },
                { label: "Cidade",         key: "city",      type: "text"  },
                { label: "Estado",         key: "state",     type: "text"  },
              ].map(({ label, key, type }) => (
                <div key={key} className="space-y-1">
                  <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{label}</label>
                  <input
                    type={type}
                    value={draft[key as keyof typeof draft] as string}
                    onChange={e => setDraft(d => ({ ...d, [key]: e.target.value }))}
                    className={inputCls}
                  />
                </div>
              ))}
            </div>
            <SaveBar section="pessoal" />
          </>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Field label="Nome"           value={profile.name} />
            <Field label="CPF"            value={profile.cpf} />
            <Field label="Data de Nasc."  value={profile.birthDate} />
            <Field label="Telefone"       value={profile.phone} />
            <Field label="E-mail"         value={profile.email} />
            <Field label="Cidade"         value={profile.city} />
            <Field label="Estado"         value={profile.state} />
          </div>
        )}
      </SectionCard>

      {/* Sobre */}
      <SectionCard
        icon={FileText} title="Sobre Mim"
        editing={editing.sobre}
        onEdit={() => editing.sobre ? cancelEdit("sobre") : startEdit("sobre")}
      >
        {editing.sobre ? (
          <>
            <textarea
              rows={4}
              value={draft.about}
              onChange={e => setDraft(d => ({ ...d, about: e.target.value }))}
              className={inputCls}
            />
            <SaveBar section="sobre" />
          </>
        ) : (
          <p className="text-sm text-muted-foreground leading-relaxed">{profile.about}</p>
        )}
      </SectionCard>

      {/* Formação */}
      <SectionCard
        icon={GraduationCap} title="Formação Acadêmica"
        editing={editing.formacao}
        onEdit={() => editing.formacao ? cancelEdit("formacao") : startEdit("formacao")}
      >
        {editing.formacao ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Nível",       key: "level"       },
                { label: "Curso",       key: "course"      },
                { label: "Instituição", key: "institution" },
                { label: "Conclusão",   key: "year"        },
              ].map(({ label, key }) => (
                <div key={key} className="space-y-1">
                  <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{label}</label>
                  <input
                    type="text"
                    value={draft.education[key as keyof typeof draft.education]}
                    onChange={e => setDraft(d => ({ ...d, education: { ...d.education, [key]: e.target.value } }))}
                    className={inputCls}
                  />
                </div>
              ))}
            </div>
            <SaveBar section="formacao" />
          </>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Field label="Nível"       value={profile.education.level} />
            <Field label="Curso"       value={profile.education.course} />
            <Field label="Instituição" value={profile.education.institution} />
            <Field label="Conclusão"   value={profile.education.year} />
          </div>
        )}
      </SectionCard>

      {/* Experiência */}
      <SectionCard
        icon={Briefcase} title="Experiência Profissional"
        editing={editing.experiencias}
        onEdit={() => editing.experiencias ? cancelEdit("experiencias") : startEdit("experiencias")}
      >
        {editing.experiencias ? (
          <>
            <div className="space-y-5">
              {draft.experiences.map((exp, i) => (
                <div key={i} className="space-y-3 rounded-lg border p-4 bg-slate-50">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Experiência {i + 1}</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { label: "Cargo",   key: "role"    },
                      { label: "Empresa", key: "company" },
                      { label: "Período", key: "period"  },
                    ].map(({ label, key }) => (
                      <div key={key} className="space-y-1">
                        <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{label}</label>
                        <input
                          type="text"
                          value={exp[key as keyof typeof exp]}
                          onChange={e => setDraft(d => {
                            const exps = [...d.experiences];
                            exps[i] = { ...exps[i], [key]: e.target.value };
                            return { ...d, experiences: exps };
                          })}
                          className={inputCls}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Descrição</label>
                    <textarea
                      rows={2}
                      value={exp.description}
                      onChange={e => setDraft(d => {
                        const exps = [...d.experiences];
                        exps[i] = { ...exps[i], description: e.target.value };
                        return { ...d, experiences: exps };
                      })}
                      className={inputCls}
                    />
                  </div>
                </div>
              ))}
            </div>
            <SaveBar section="experiencias" />
          </>
        ) : (
          <div className="space-y-5">
            {profile.experiences.map((exp, i) => (
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
        )}
      </SectionCard>

      {/* Habilidades */}
      <SectionCard
        icon={Wrench} title="Habilidades Técnicas"
        editing={editing.habilidades}
        onEdit={() => editing.habilidades ? cancelEdit("habilidades") : startEdit("habilidades")}
      >
        {editing.habilidades ? (
          <>
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Habilidades (separadas por vírgula)</label>
              <input
                type="text"
                value={draft.skills.join(", ")}
                onChange={e => setDraft(d => ({ ...d, skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean) }))}
                className={inputCls}
              />
            </div>
            <SaveBar section="habilidades" />
          </>
        ) : (
          <div className="flex flex-wrap gap-2">
            {profile.skills.map(skill => (
              <span key={skill} className="rounded-full border bg-primary/5 text-primary px-3 py-1 text-xs font-medium">
                {skill}
              </span>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Idiomas */}
      <SectionCard
        icon={Languages} title="Idiomas"
        editing={editing.idiomas}
        onEdit={() => editing.idiomas ? cancelEdit("idiomas") : startEdit("idiomas")}
      >
        {editing.idiomas ? (
          <>
            <div className="space-y-3">
              {draft.languages.map((lang, i) => (
                <div key={i} className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Idioma</label>
                    <input
                      type="text"
                      value={lang.name}
                      onChange={e => setDraft(d => {
                        const langs = [...d.languages];
                        langs[i] = { ...langs[i], name: e.target.value };
                        return { ...d, languages: langs };
                      })}
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Nível</label>
                    <input
                      type="text"
                      value={lang.level}
                      onChange={e => setDraft(d => {
                        const langs = [...d.languages];
                        langs[i] = { ...langs[i], level: e.target.value };
                        return { ...d, languages: langs };
                      })}
                      className={inputCls}
                    />
                  </div>
                </div>
              ))}
            </div>
            <SaveBar section="idiomas" />
          </>
        ) : (
          <div className="flex flex-wrap gap-3">
            {profile.languages.map(lang => (
              <div key={lang.name} className="rounded-xl border bg-muted/30 px-4 py-2.5 text-center min-w-[90px]">
                <p className="text-sm font-semibold">{lang.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{lang.level}</p>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Informações Complementares */}
      <SectionCard
        icon={DollarSign} title="Informações Complementares"
        editing={editing.complementar}
        onEdit={() => editing.complementar ? cancelEdit("complementar") : startEdit("complementar")}
      >
        {editing.complementar ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Pretensão Salarial</label>
                <input
                  type="text"
                  value={draft.salary}
                  onChange={e => setDraft(d => ({ ...d, salary: e.target.value }))}
                  className={inputCls}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Disponibilidade</label>
                <select
                  value={draft.availability}
                  onChange={e => setDraft(d => ({ ...d, availability: e.target.value }))}
                  className={inputCls}
                >
                  {["Imediata", "15 dias", "30 dias", "A combinar"].map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
            <SaveBar section="complementar" />
          </>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">Pretensão Salarial</p>
              <p className="text-sm font-semibold text-emerald-600">{profile.salary}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">Disponibilidade</p>
              <p className="text-sm font-medium flex items-center gap-1">
                <Clock size={12} className="text-muted-foreground" />{profile.availability}
              </p>
            </div>
          </div>
        )}
      </SectionCard>

      {/* Currículo */}
      <SectionCard icon={FileText} title="Currículo (CV)">
        {profile.cvUploaded ? (
          <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
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
