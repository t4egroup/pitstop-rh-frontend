import { useState } from "react";
import {
  Plus, Users, Search, MoreVertical, Sparkles,
  Code2, Megaphone, BarChart3, UserCog, Briefcase,
  ShieldCheck, Palette, HeadphonesIcon, X,
} from "lucide-react";

interface Banco {
  id: number;
  categoria: string;
  descricao: string;
  total: number;
  disponiveis: number;
  emProcesso: number;
  atualizadoEm: string;
  icon: React.ElementType;
  cor: string;
  corBg: string;
}

const bancos: Banco[] = [
  {
    id: 1,
    categoria: "Tecnologia",
    descricao: "Desenvolvedores, engenheiros, QA, DevOps e dados",
    total: 42,
    disponiveis: 18,
    emProcesso: 7,
    atualizadoEm: "há 2 dias",
    icon: Code2,
    cor: "#243c7e",
    corBg: "bg-[#243c7e]/10",
  },
  {
    id: 2,
    categoria: "Produto & Design",
    descricao: "Product managers, UX/UI designers e pesquisadores",
    total: 21,
    disponiveis: 9,
    emProcesso: 3,
    atualizadoEm: "há 3 dias",
    icon: Palette,
    cor: "#7c3aed",
    corBg: "bg-purple-100",
  },
  {
    id: 3,
    categoria: "Marketing",
    descricao: "Growth, conteúdo, performance e branding",
    total: 17,
    disponiveis: 11,
    emProcesso: 2,
    atualizadoEm: "há 1 semana",
    icon: Megaphone,
    cor: "#d04870",
    corBg: "bg-pink-100",
  },
  {
    id: 4,
    categoria: "Comercial & Vendas",
    descricao: "Executivos de contas, SDRs e gerentes comerciais",
    total: 29,
    disponiveis: 14,
    emProcesso: 5,
    atualizadoEm: "há 4 dias",
    icon: BarChart3,
    cor: "#0891b2",
    corBg: "bg-cyan-100",
  },
  {
    id: 5,
    categoria: "Administrativo",
    descricao: "Financeiro, jurídico, compras e operações",
    total: 15,
    disponiveis: 8,
    emProcesso: 1,
    atualizadoEm: "há 5 dias",
    icon: Briefcase,
    cor: "#64748b",
    corBg: "bg-slate-100",
  },
  {
    id: 6,
    categoria: "Recursos Humanos",
    descricao: "Recrutadores, BPs, T&D e cultura",
    total: 11,
    disponiveis: 6,
    emProcesso: 2,
    atualizadoEm: "há 6 dias",
    icon: UserCog,
    cor: "#059669",
    corBg: "bg-emerald-100",
  },
  {
    id: 7,
    categoria: "Atendimento & Suporte",
    descricao: "Customer success, suporte técnico e SAC",
    total: 23,
    disponiveis: 13,
    emProcesso: 4,
    atualizadoEm: "há 2 dias",
    icon: HeadphonesIcon,
    cor: "#f59e0b",
    corBg: "bg-amber-100",
  },
  {
    id: 8,
    categoria: "Liderança & Gestão",
    descricao: "C-levels, diretores, coordenadores e gerentes",
    total: 9,
    disponiveis: 4,
    emProcesso: 2,
    atualizadoEm: "há 1 semana",
    icon: ShieldCheck,
    cor: "#b45309",
    corBg: "bg-orange-100",
  },
];

const PortalTalentos = () => {
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [showNovo, setShowNovo] = useState(false);

  const filtered = bancos.filter((b) =>
    b.categoria.toLowerCase().includes(search.toLowerCase()) ||
    b.descricao.toLowerCase().includes(search.toLowerCase())
  );

  const totalGeral = bancos.reduce((s, b) => s + b.total, 0);
  const disponiveisGeral = bancos.reduce((s, b) => s + b.disponiveis, 0);

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles size={18} className="text-[#243c7e]" />
              Banco de Talentos
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {totalGeral} talentos cadastrados · {disponiveisGeral} disponíveis
            </p>
          </div>
          <button
            onClick={() => setShowNovo(true)}
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#5b21b6,#8b5cf6)" }}
          >
            <Plus size={13} /> Novo banco
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar categoria..."
            className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#243c7e]/20 focus:border-[#243c7e]/40 placeholder:text-slate-400 transition"
          />
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.id}
                className="relative rounded-xl bg-white border border-blue-300 p-5 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group"
              >
                {/* Menu */}
                <button
                  onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === b.id ? null : b.id); }}
                  className="absolute top-3.5 right-3.5 p-1 rounded-lg text-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <MoreVertical size={14} />
                </button>
                {openMenu === b.id && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
                    <div className="absolute top-9 right-3.5 z-20 w-40 rounded-xl border border-blue-300 bg-white shadow-lg py-1 text-sm">
                      <button className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-700 text-xs">Ver talentos</button>
                      <button className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-700 text-xs">Adicionar talento</button>
                      <button className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-700 text-xs">Editar banco</button>
                      <div className="my-1 border-t border-slate-100" />
                      <button className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-500 text-xs">Excluir banco</button>
                    </div>
                  </>
                )}

                {/* Icon + title */}
                <div className="flex items-start gap-3 mb-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${b.corBg}`}>
                    <Icon size={18} style={{ color: b.cor }} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 text-sm">{b.categoria}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{b.descricao}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 rounded-lg bg-slate-50 px-3 py-2 text-center">
                    <p className="text-xl font-extrabold text-slate-900">{b.total}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Total</p>
                  </div>
                  <div className="flex-1 rounded-lg bg-green-50 px-3 py-2 text-center">
                    <p className="text-xl font-extrabold text-green-600">{b.disponiveis}</p>
                    <p className="text-[10px] text-green-500 mt-0.5">Disponíveis</p>
                  </div>
                  <div className="flex-1 rounded-lg bg-blue-50 px-3 py-2 text-center">
                    <p className="text-xl font-extrabold text-blue-600">{b.emProcesso}</p>
                    <p className="text-[10px] text-blue-500 mt-0.5">Em processo</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-3.5">
                  <div className="flex items-center gap-1">
                    <Users size={11} className="text-slate-400" />
                    <span className="text-[11px] text-slate-400">Atualizado {b.atualizadoEm}</span>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ color: b.cor, background: `${b.cor}18` }}
                  >
                    Ver talentos →
                  </span>
                </div>
              </div>
            );
          })}

          {/* Add new card */}
          <button
            onClick={() => setShowNovo(true)}
            className="rounded-xl border-2 border-dashed border-blue-300 p-5 flex flex-col items-center justify-center gap-2 hover:border-[#243c7e]/40 hover:bg-[#243c7e]/5 transition-all group min-h-[180px]"
          >
            <div className="h-10 w-10 rounded-xl bg-slate-100 group-hover:bg-[#243c7e]/10 flex items-center justify-center transition-colors">
              <Plus size={18} className="text-slate-400 group-hover:text-[#243c7e] transition-colors" />
            </div>
            <p className="text-xs font-medium text-slate-400 group-hover:text-[#243c7e] transition-colors">Criar novo banco</p>
          </button>
        </div>

        {/* Modal — Novo banco */}
        {showNovo && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowNovo(false)} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                <div className="flex items-center justify-between mb-5">
                  <p className="font-extrabold text-slate-900">Criar banco de talentos</p>
                  <button onClick={() => setShowNovo(false)} className="text-slate-400 hover:text-slate-700">
                    <X size={18} />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Nome da categoria</label>
                    <input
                      placeholder="Ex: Tecnologia, Marketing, Financeiro..."
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#243c7e]/20 focus:border-[#243c7e]/40 placeholder:text-slate-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Descrição</label>
                    <textarea
                      rows={2}
                      placeholder="Descreva os perfis incluídos neste banco..."
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#243c7e]/20 placeholder:text-slate-400 resize-none transition"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() => setShowNovo(false)}
                    className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => setShowNovo(false)}
                    className="flex-1 rounded-lg py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                    style={{ background: "linear-gradient(135deg,#5b21b6,#8b5cf6)" }}
                  >
                    Criar banco
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default PortalTalentos;
