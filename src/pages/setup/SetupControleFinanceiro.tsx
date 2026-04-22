import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, DollarSign, Eye, EyeOff, Shield, Users,
  CheckCircle2, Save, Info,
} from "lucide-react";

/* ── Types ── */
type AccessLevel = "total" | "parcial" | "nenhum";

interface Recruiter {
  id: number;
  name: string;
  email: string;
  role: "gestor" | "recrutador" | "trainee";
  access: {
    salarios:        AccessLevel;
    custosPorVaga:   AccessLevel;
    orcamento:       AccessLevel;
    relatorioFinanceiro: AccessLevel;
    proposta:        AccessLevel;
  };
}

/* ── Mock data ── */
const initialRecruiters: Recruiter[] = [
  {
    id: 1, name: "Ana Oliveira", email: "ana@pitstop.com", role: "gestor",
    access: { salarios: "total", custosPorVaga: "total", orcamento: "total", relatorioFinanceiro: "total", proposta: "total" },
  },
  {
    id: 2, name: "Carlos Mendes", email: "carlos@pitstop.com", role: "recrutador",
    access: { salarios: "parcial", custosPorVaga: "parcial", orcamento: "nenhum", relatorioFinanceiro: "nenhum", proposta: "parcial" },
  },
  {
    id: 3, name: "Fernanda Lima", email: "fernanda@pitstop.com", role: "recrutador",
    access: { salarios: "nenhum", custosPorVaga: "nenhum", orcamento: "nenhum", relatorioFinanceiro: "nenhum", proposta: "nenhum" },
  },
  {
    id: 4, name: "Gabriel Costa", email: "gabriel@pitstop.com", role: "trainee",
    access: { salarios: "nenhum", custosPorVaga: "nenhum", orcamento: "nenhum", relatorioFinanceiro: "nenhum", proposta: "nenhum" },
  },
];

const financialCategories = [
  { key: "salarios"           as const, label: "Faixas Salariais",         desc: "Visualização das faixas salariais das vagas"         },
  { key: "custosPorVaga"      as const, label: "Custos por Vaga",           desc: "Custos de processos seletivos por vaga"              },
  { key: "orcamento"          as const, label: "Orçamento de RH",           desc: "Orçamento total e consumo do departamento de RH"     },
  { key: "relatorioFinanceiro"as const, label: "Relatórios Financeiros",    desc: "Relatórios detalhados de receita e despesas"         },
  { key: "proposta"           as const, label: "Proposta Salarial",         desc: "Valores propostos e aprovados em ofertas"            },
];

const accessConfig: Record<AccessLevel, { label: string; color: string; icon: typeof Eye }> = {
  total:   { label: "Total",   color: "text-emerald-700 bg-emerald-50 border-emerald-200", icon: Eye      },
  parcial: { label: "Parcial", color: "text-amber-700 bg-amber-50 border-amber-200",       icon: Eye      },
  nenhum:  { label: "Nenhum",  color: "text-red-700 bg-red-50 border-red-200",             icon: EyeOff   },
};

const roleLabel: Record<Recruiter["role"], string> = {
  gestor:     "Gestor",
  recrutador: "Recrutador",
  trainee:    "Trainee",
};

const roleColor: Record<Recruiter["role"], string> = {
  gestor:     "bg-primary/10 text-primary border-primary/20",
  recrutador: "bg-blue-50 text-blue-700 border-blue-200",
  trainee:    "bg-slate-50 text-slate-700 border-slate-200",
};

const SetupControleFinanceiro = () => {
  const [recruiters, setRecruiters] = useState<Recruiter[]>(initialRecruiters);
  const [saved, setSaved] = useState(false);

  const updateAccess = (
    recruiterId: number,
    category: keyof Recruiter["access"],
    value: AccessLevel,
  ) => {
    setRecruiters(prev =>
      prev.map(r =>
        r.id === recruiterId
          ? { ...r, access: { ...r.access, [category]: value } }
          : r
      )
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* Header */}
        <div>
          <Link
            to="/setup"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-4"
          >
            <ArrowLeft size={16} /> Voltar para Setup
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <DollarSign size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Controle de Acesso Financeiro</h1>
              <p className="text-sm text-slate-500 mt-0.5">Defina quais dados financeiros cada recrutador pode visualizar.</p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-white p-4 text-sm text-slate-700">
          <Info size={16} className="shrink-0 mt-0.5 text-blue-500" />
          <div>
            <strong>Níveis de acesso:</strong>
            <span className="ml-1"><strong className="text-emerald-700">Total</strong> – visualiza todos os valores; </span>
            <span><strong className="text-amber-700">Parcial</strong> – visualiza apenas faixas/ranges, sem valores exatos; </span>
            <span><strong className="text-red-700">Nenhum</strong> – não visualiza esta informação.</span>
          </div>
        </div>

        {/* Legenda de permissões */}
        <div className="rounded-xl border bg-white p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={16} className="text-primary" />
            <h2 className="text-sm font-bold">Categorias Financeiras</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {financialCategories.map(cat => (
              <div key={cat.key} className="rounded-lg border bg-slate-50 px-3 py-2">
                <p className="text-xs font-semibold">{cat.label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabela de permissões */}
        <div className="rounded-xl border bg-white overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b">
            <Users size={16} className="text-primary" />
            <h2 className="text-sm font-bold">Permissões por Recrutador</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="text-left px-5 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wide w-52">
                    Recrutador
                  </th>
                  {financialCategories.map(cat => (
                    <th key={cat.key} className="text-center px-3 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                      {cat.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {recruiters.map(recruiter => (
                  <tr key={recruiter.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold">{recruiter.name}</p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${roleColor[recruiter.role]}`}>
                            {roleLabel[recruiter.role]}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">{recruiter.email}</p>
                      </div>
                    </td>
                    {financialCategories.map(cat => {
                      const current = recruiter.access[cat.key];
                      const cfg = accessConfig[current];
                      const isGestor = recruiter.role === "gestor";
                      return (
                        <td key={cat.key} className="px-3 py-3 text-center">
                          {isGestor ? (
                            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${accessConfig.total.color}`}>
                              <Eye size={10} /> Total
                            </span>
                          ) : (
                            <select
                              value={current}
                              onChange={e => updateAccess(recruiter.id, cat.key, e.target.value as AccessLevel)}
                              className={`text-[11px] font-bold rounded-full border px-2.5 py-1 cursor-pointer outline-none focus:ring-2 focus:ring-primary/20 ${cfg.color}`}
                            >
                              <option value="total">Total</option>
                              <option value="parcial">Parcial</option>
                              <option value="nenhum">Nenhum</option>
                            </select>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center justify-end gap-3">
          {saved && (
            <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 size={14} /> Permissões salvas com sucesso!
            </span>
          )}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
          >
            <Save size={15} /> Salvar Permissões
          </button>
        </div>

      </div>
    </div>
  );
};

export default SetupControleFinanceiro;
