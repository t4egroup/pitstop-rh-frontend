import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, MapPin, Mail, Phone, Linkedin, Briefcase,
  GraduationCap, Star, Globe, Car, Plane, Home, Clock,
  CheckCircle2, XCircle, UserPlus, MessageSquare, Download,
} from "lucide-react";
import { talentos } from "@/data/talentos";

const statusStyle: Record<string, string> = {
  "Disponível":   "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "Em processo":  "bg-blue-50 text-blue-700 border border-blue-200",
  "Contratado":   "bg-slate-100 text-slate-500 border border-slate-200",
};

const nivelStyle: Record<string, string> = {
  "Júnior":       "bg-sky-100 text-sky-700",
  "Pleno":        "bg-violet-100 text-violet-700",
  "Sênior":       "bg-amber-100 text-amber-700",
  "Especialista": "bg-rose-100 text-rose-700",
};

const idiomaStyle: Record<string, string> = {
  "Nativo":       "bg-emerald-100 text-emerald-700",
  "Fluente":      "bg-blue-100 text-blue-700",
  "Avançado":     "bg-indigo-100 text-indigo-700",
  "Intermediário":"bg-amber-100 text-amber-700",
  "Básico":       "bg-slate-100 text-slate-600",
};

function fmtPeriodo(inicio: string, fim: string | null, atual: boolean) {
  const fmt = (s: string) => {
    const [y, m] = s.split("-");
    const meses = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
    return `${meses[parseInt(m, 10) - 1]} ${y}`;
  };
  return `${fmt(inicio)} — ${atual ? "Presente" : fim ? fmt(fim) : ""}`;
}

const SectionTitle = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="flex items-center gap-2 mb-4">
    <Icon size={16} className="text-[#243c7e]" />
    <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">{label}</h3>
  </div>
);

const BoolBadge = ({ value, label }: { value: boolean; label: string }) => (
  <div className="flex items-center gap-2">
    {value
      ? <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
      : <XCircle size={14} className="text-slate-300 shrink-0" />
    }
    <span className={`text-xs ${value ? "text-slate-700 font-medium" : "text-slate-400"}`}>{label}</span>
  </div>
);

const TalentoProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const talento = talentos.find(t => t.id === Number(id));

  if (!talento) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-4">Talento não encontrado.</p>
          <button
            onClick={() => navigate("/talentos")}
            className="flex items-center gap-2 mx-auto text-sm font-semibold text-[#243c7e] hover:underline"
          >
            <ArrowLeft size={14} /> Voltar para Base Pitstop
          </button>
        </div>
      </div>
    );
  }

  const getInitials = (nome: string) =>
    nome.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">

        {/* Back */}
        <button
          onClick={() => navigate("/talentos")}
          className="flex items-center gap-2 text-sm font-semibold text-[#243c7e] hover:underline"
        >
          <ArrowLeft size={15} /> Voltar para Base Pitstop
        </button>

        {/* ── Header card ── */}
        <div className="bg-white border border-blue-200 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row gap-5">

            {/* Avatar */}
            <div
              className="h-20 w-20 shrink-0 rounded-full flex items-center justify-center text-white text-2xl font-extrabold shadow-md"
              style={{ background: "linear-gradient(135deg, #243c7e 0%, #3b5fd9 100%)" }}
            >
              {getInitials(talento.nome)}
            </div>

            {/* Info principal */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start gap-2 mb-1">
                <h1 className="text-xl font-extrabold text-slate-900">{talento.nome}</h1>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${nivelStyle[talento.nivel]}`}>
                  {talento.nivel}
                </span>
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${statusStyle[talento.status]}`}>
                  {talento.status}
                </span>
              </div>

              <p className="text-sm font-semibold text-[#243c7e] mb-1">{talento.cargo}</p>
              <p className="text-xs text-slate-400 mb-3">{talento.area}</p>

              <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin size={11} />
                  {talento.remoto ? "Remoto" : `${talento.cidade}, ${talento.uf}`}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  Disponível em {talento.disponibilidade}
                </span>
                <span className="font-semibold text-slate-700">
                  Pretensão: {talento.salario}
                </span>
                <span className="text-slate-400">
                  Último: {talento.ultimoSalario}
                </span>
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-col gap-2 shrink-0">
              <button className="flex items-center gap-2 rounded-xl bg-[#243c7e] text-white px-4 py-2.5 text-xs font-bold hover:bg-[#1a2d5e] transition-colors shadow-sm">
                <UserPlus size={13} /> Adicionar ao processo
              </button>
              <button className="flex items-center gap-2 rounded-xl border border-blue-300 text-[#243c7e] px-4 py-2.5 text-xs font-bold hover:bg-blue-50 transition-colors">
                <MessageSquare size={13} /> Entrar em contato
              </button>
              <button className="flex items-center gap-2 rounded-xl border border-slate-200 text-slate-600 px-4 py-2.5 text-xs font-medium hover:bg-slate-50 transition-colors">
                <Download size={13} /> Baixar currículo
              </button>
            </div>
          </div>
        </div>

        {/* ── Body: 2 colunas ── */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">

          {/* ── Coluna esquerda ── */}
          <div className="w-full lg:w-64 shrink-0 space-y-4">

            {/* Contato */}
            <div className="bg-white border border-blue-200 rounded-2xl p-5">
              <SectionTitle icon={Mail} label="Contato" />
              <div className="space-y-2.5">
                <a href={`mailto:${talento.email}`} className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-[#243c7e] group">
                  <Mail size={13} className="text-slate-400 group-hover:text-[#243c7e] shrink-0" />
                  <span className="truncate">{talento.email}</span>
                </a>
                <div className="flex items-center gap-2.5 text-xs text-slate-600">
                  <Phone size={13} className="text-slate-400 shrink-0" />
                  {talento.telefone}
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-400">
                  <span className="font-medium text-slate-500">CPF:</span> {talento.cpf}
                </div>
                {talento.linkedin && (
                  <div className="flex items-center gap-2.5 text-xs text-slate-600">
                    <Linkedin size={13} className="text-slate-400 shrink-0" />
                    <span className="truncate">{talento.linkedin}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Preferências */}
            <div className="bg-white border border-blue-200 rounded-2xl p-5">
              <SectionTitle icon={Star} label="Preferências" />
              <div className="space-y-2">
                <BoolBadge value={talento.remoto}  label="Aceita trabalho remoto" />
                <BoolBadge value={talento.cnh}     label={talento.cnh ? `Possui CNH ${talento.cnhCategoria ?? ""}`.trim() : "Não possui CNH"} />
                <BoolBadge value={talento.viagem}  label="Disponível para viagens" />
                <BoolBadge value={talento.mudanca} label="Aceita mudar de cidade" />
              </div>
            </div>

            {/* Habilidades */}
            <div className="bg-white border border-blue-200 rounded-2xl p-5">
              <SectionTitle icon={Star} label="Habilidades" />
              <div className="flex flex-wrap gap-1.5">
                {talento.skills.map(s => (
                  <span key={s} className="bg-[#243c7e]/8 text-[#243c7e] text-[11px] font-medium px-2.5 py-1 rounded-full border border-[#243c7e]/15">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Idiomas */}
            <div className="bg-white border border-blue-200 rounded-2xl p-5">
              <SectionTitle icon={Globe} label="Idiomas" />
              <div className="space-y-2">
                {talento.idiomas.map(i => (
                  <div key={i.idioma} className="flex items-center justify-between">
                    <span className="text-xs text-slate-700">{i.idioma}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${idiomaStyle[i.nivel] ?? "bg-slate-100 text-slate-500"}`}>
                      {i.nivel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Coluna direita ── */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Sobre */}
            <div className="bg-white border border-blue-200 rounded-2xl p-5">
              <SectionTitle icon={Star} label="Sobre" />
              <p className="text-sm text-slate-600 leading-relaxed">{talento.sobre}</p>
            </div>

            {/* Experiência */}
            <div className="bg-white border border-blue-200 rounded-2xl p-5">
              <SectionTitle icon={Briefcase} label="Experiência Profissional" />
              <div className="space-y-5">
                {talento.experiencias.map((exp, i) => (
                  <div key={i} className={i < talento.experiencias.length - 1 ? "pb-5 border-b border-slate-100" : ""}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{exp.cargo}</p>
                        <p className="text-xs font-semibold text-[#243c7e]">{exp.empresa}</p>
                      </div>
                      {exp.atual && (
                        <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                          Atual
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mb-1">
                      {fmtPeriodo(exp.inicio, exp.fim, exp.atual)}
                    </p>
                    <p className="text-xs text-slate-500 mb-2">{exp.descricao}</p>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">
                      Último salário: {exp.salario}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Formação */}
            <div className="bg-white border border-blue-200 rounded-2xl p-5">
              <SectionTitle icon={GraduationCap} label="Formação Acadêmica" />
              <div className="space-y-4">
                {talento.formacoes.map((f, i) => (
                  <div key={i} className={i < talento.formacoes.length - 1 ? "pb-4 border-b border-slate-100" : ""}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{f.curso}</p>
                        <p className="text-xs font-semibold text-[#243c7e]">{f.instituicao}</p>
                      </div>
                      {f.atual && (
                        <span className="text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full shrink-0">
                          Em andamento
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {fmtPeriodo(f.inicio, f.fim, f.atual)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TalentoProfile;
