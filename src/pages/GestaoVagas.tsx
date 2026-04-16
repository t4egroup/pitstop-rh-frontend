import { useState } from "react";
import {
  Search, SlidersHorizontal, ChevronDown, Plus,
  Filter, AlertCircle, Calendar, Clock, ExternalLink,
  MoreVertical, CheckSquare, Square, X, Check,
  ChevronRight, Megaphone,
} from "lucide-react";

/* ── Plataformas de distribuição ── */
interface Plataforma {
  id: string;
  nome: string;
  desc: string;
  conectada: boolean;
  gratuita: boolean;
  cor: string;
}

const plataformas: Plataforma[] = [
  { id: "pitstop",    nome: "PitStop RH",       desc: "Portal interno da empresa",           conectada: true,  gratuita: true,  cor: "#243c7e" },
  { id: "linkedin",   nome: "LinkedIn",          desc: "Maior rede profissional do mundo",    conectada: true,  gratuita: false, cor: "#0a66c2" },
  { id: "indeed",     nome: "Indeed",            desc: "Maior site de empregos do mundo",     conectada: false, gratuita: true,  cor: "#003a9b" },
  { id: "catho",      nome: "Catho",             desc: "Plataforma líder no Brasil",          conectada: false, gratuita: false, cor: "#e10000" },
  { id: "infojobs",   nome: "InfoJobs",          desc: "Portal de empregos e currículos",     conectada: false, gratuita: false, cor: "#00b24b" },
  { id: "vagas",      nome: "Vagas.com",         desc: "Conecta candidatos e empresas",       conectada: false, gratuita: true,  cor: "#f97316" },
  { id: "sine",       nome: "Sine",              desc: "Plataforma gratuita do governo",      conectada: false, gratuita: true,  cor: "#0284c7" },
  { id: "empregliga", nome: "Emprego Ligado",    desc: "Agregador de vagas nacional",         conectada: false, gratuita: true,  cor: "#7c3aed" },
  { id: "trampos",    nome: "Trampos",           desc: "Foco em vagas de tecnologia e marketing", conectada: false, gratuita: false, cor: "#0f172a" },
];

const STEPS = ["Dados da vaga", "Publicação"] as const;

interface Vaga {
  id: number;
  nome: string;
  empresa: string;
  prazoExpirado: boolean;
  posicoes: number;
  contratacoes: number;
  inscricoes: number;
  publicadaHa: string;
  prazo: string;
  status: "Publicada" | "Em Pausa" | "Encerrada" | "Rascunho";
  publicadaEm: string[]; // ids de plataformas
}

const vagas: Vaga[] = [
  {
    id: 1,
    nome: "BANCO DE TALENTOS - CONSULTOR DE VENDAS RENAULT SÃO PAULO",
    empresa: "RNBR / RENAULT",
    prazoExpirado: true,
    posicoes: 1, contratacoes: 0, inscricoes: 54,
    publicadaHa: "há 14 dias",
    prazo: "06/08/2024",
    status: "Publicada",
    publicadaEm: ["pitstop", "linkedin", "indeed"],
  },
  {
    id: 2,
    nome: "BANCO DE TALENTOS - CONSULTOR DE VENDAS TOYOTA SP",
    empresa: "KBRS / TOYOTA",
    prazoExpirado: true,
    posicoes: 1, contratacoes: 0, inscricoes: 124,
    publicadaHa: "há 21 dias",
    prazo: "01/08/2024",
    status: "Publicada",
    publicadaEm: ["pitstop", "catho", "vagas"],
  },
  {
    id: 3,
    nome: "VENDEDOR DE AUTOS SEMINOVOS - CONCESSIONÁRIA VOLVO - VILA OLÍMPIA",
    empresa: "ZAN",
    prazoExpirado: false,
    posicoes: 1, contratacoes: 0, inscricoes: 38,
    publicadaHa: "há 5 dias",
    prazo: "30/08/2024",
    status: "Publicada",
    publicadaEm: ["pitstop", "linkedin"],
  },
  {
    id: 4,
    nome: "BANCO DE TALENTOS PREPARADOR DE AUTOS - SÃO PAULO",
    empresa: "PASA / PREPARADOR",
    prazoExpirado: true,
    posicoes: 1, contratacoes: 0, inscricoes: 29,
    publicadaHa: "há 30 dias",
    prazo: "10/07/2024",
    status: "Publicada",
    publicadaEm: ["pitstop"],
  },
  {
    id: 5,
    nome: "ANALISTA CONTÁBIL PLENO - BUTANTÃ",
    empresa: "GPAR / GRUPO PARÁ",
    prazoExpirado: false,
    posicoes: 1, contratacoes: 0, inscricoes: 41,
    publicadaHa: "há 3 dias",
    prazo: "15/09/2024",
    status: "Publicada",
    publicadaEm: ["pitstop", "linkedin", "indeed", "infojobs"],
  },
  {
    id: 6,
    nome: "DESENVOLVEDOR FRONT-END PLENO - REMOTO",
    empresa: "TECH / PITSTOP DIGITAL",
    prazoExpirado: false,
    posicoes: 2, contratacoes: 0, inscricoes: 67,
    publicadaHa: "há 7 dias",
    prazo: "25/08/2024",
    status: "Publicada",
    publicadaEm: ["pitstop", "linkedin", "indeed", "trampos", "vagas"],
  },
  {
    id: 7,
    nome: "UX DESIGNER SENIOR - HÍBRIDO SP",
    empresa: "DESIGN / STUDIO X",
    prazoExpirado: false,
    posicoes: 1, contratacoes: 0, inscricoes: 23,
    publicadaHa: "há 10 dias",
    prazo: "20/08/2024",
    status: "Em Pausa",
    publicadaEm: ["pitstop", "linkedin"],
  },
  {
    id: 8,
    nome: "PRODUCT MANAGER SR - SÃO PAULO",
    empresa: "PROD / PITSTOP RH",
    prazoExpirado: false,
    posicoes: 1, contratacoes: 0, inscricoes: 55,
    publicadaHa: "há 2 dias",
    prazo: "10/09/2024",
    status: "Rascunho",
    publicadaEm: [],
  },
];

const statusStyle: Record<string, string> = {
  Publicada:  "bg-green-100 text-green-700",
  "Em Pausa": "bg-amber-100 text-amber-700",
  Encerrada:  "bg-slate-100 text-slate-500",
  Rascunho:   "bg-blue-100 text-blue-700",
};

const GestaoVagas = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [selected, setSelected] = useState<number[]>([]);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  /* modal nova vaga */
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(0);
  const [pubPlats, setPubPlats] = useState<string[]>(["pitstop"]);

  const togglePlat = (id: string) => {
    if (id === "pitstop") return; // sempre selecionado
    setPubPlats((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  };

  const closeModal = () => { setShowModal(false); setStep(0); setPubPlats(["pitstop"]); };

  const filtered = vagas.filter((v) => {
    const matchSearch = v.nome.toLowerCase().includes(search.toLowerCase()) || v.empresa.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "Todos" || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleSelect = (id: number) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const toggleAll = () =>
    setSelected(selected.length === filtered.length ? [] : filtered.map((v) => v.id));

  const expirados = vagas.filter((v) => v.prazoExpirado).length;

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Gestão de vagas</h1>
            <p className="text-xs text-slate-400 mt-0.5">Gerencie todas as vagas abertas e em andamento</p>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Prazo de contratação expirado", value: expirados,  link: "Ver vagas" },
            { label: "Prazo de contratação a expirar", value: 2,         link: "Ver vagas" },
            { label: "Pendentes de aprovação",         value: 0,         link: "Ver vagas" },
            { label: "Tempo médio fechamento vaga",    value: "12 dias", link: "↗ Ver mais" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-white border border-blue-300 px-4 py-3">
              <p className="text-[11px] text-slate-500 font-medium">{s.label}</p>
              <div className="flex items-end justify-between mt-1.5">
                <p className="text-2xl font-extrabold text-slate-900">{s.value}</p>
                <span className="text-xs font-semibold text-[#243c7e] hover:underline cursor-pointer">{s.link}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div className="rounded-xl bg-white border border-blue-300 overflow-hidden">

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-slate-100">
            {/* Search */}
            <div className="flex items-center gap-2 flex-1 min-w-[200px] rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <Search size={13} className="text-slate-400 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar vaga por nome ou código"
                className="bg-transparent text-xs outline-none flex-1 text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Actions */}
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              Ações em massa <ChevronDown size={12} />
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <SlidersHorizontal size={12} /> Ordenar
            </button>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-7 py-2 text-xs font-medium text-slate-600 outline-none cursor-pointer hover:bg-slate-50"
              >
                <option value="Todos">Status</option>
                <option>Publicada</option>
                <option>Em Pausa</option>
                <option>Encerrada</option>
                <option>Rascunho</option>
              </select>
              <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter size={12} /> Filtros
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90 ml-auto"
              style={{ background: "linear-gradient(135deg,#5b21b6,#8b5cf6)" }}>
              <Plus size={13} /> Nova vaga
            </button>
          </div>

          {/* Table */}
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="w-10 px-4 py-3">
                  <button onClick={toggleAll}>
                    {selected.length === filtered.length && filtered.length > 0
                      ? <CheckSquare size={15} className="text-[#243c7e]" />
                      : <Square size={15} className="text-slate-300" />}
                  </button>
                </th>
                <th className="text-left px-3 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Nome da vaga</th>
                <th className="text-center px-3 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Posições</th>
                <th className="text-center px-3 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Contratações</th>
                <th className="text-center px-3 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Inscrições</th>
                <th className="px-3 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Informações</th>
                <th className="px-3 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((v) => (
                <tr
                  key={v.id}
                  className={`hover:bg-slate-50/60 transition-colors ${selected.includes(v.id) ? "bg-blue-50/40" : ""}`}
                >
                  {/* Checkbox */}
                  <td className="px-4 py-3.5">
                    <button onClick={() => toggleSelect(v.id)}>
                      {selected.includes(v.id)
                        ? <CheckSquare size={15} className="text-[#243c7e]" />
                        : <Square size={15} className="text-slate-300" />}
                    </button>
                  </td>

                  {/* Nome */}
                  <td className="px-3 py-3.5 max-w-[300px]">
                    <p className="font-semibold text-[13px] text-slate-900 leading-tight truncate">{v.nome}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{v.empresa}</p>

                    {/* Plataformas */}
                    {v.publicadaEm.length > 0 && (
                      <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                        {v.publicadaEm.slice(0, 4).map((pid) => {
                          const plat = plataformas.find((p) => p.id === pid);
                          if (!plat) return null;
                          return (
                            <span
                              key={pid}
                              title={plat.nome}
                              className="inline-flex items-center justify-center h-4 w-4 rounded text-white text-[8px] font-extrabold shrink-0"
                              style={{ background: plat.cor }}
                            >
                              {plat.nome[0]}
                            </span>
                          );
                        })}
                        {v.publicadaEm.length > 4 && (
                          <span className="text-[10px] text-slate-400 font-medium">+{v.publicadaEm.length - 4}</span>
                        )}
                      </div>
                    )}
                    {v.publicadaEm.length === 0 && (
                      <span className="text-[10px] text-slate-400 mt-1 inline-block">Não publicada</span>
                    )}

                    {v.prazoExpirado && (
                      <div className="flex items-center gap-1 mt-1">
                        <AlertCircle size={11} className="text-red-500 shrink-0" />
                        <span className="text-[10px] text-red-500 font-medium">Prazo de contratação de vaga expirou.</span>
                      </div>
                    )}
                  </td>

                  {/* Posições */}
                  <td className="px-3 py-3.5 text-center">
                    <span className="text-sm font-bold text-slate-900">{String(v.posicoes).padStart(2, "0")}</span>
                  </td>

                  {/* Contratações */}
                  <td className="px-3 py-3.5 text-center">
                    <span className="text-sm font-bold text-slate-900">{String(v.contratacoes).padStart(2, "0")}</span>
                  </td>

                  {/* Inscrições */}
                  <td className="px-3 py-3.5 text-center">
                    <span className="text-sm font-bold text-slate-900">{v.inscricoes}</span>
                  </td>

                  {/* Informações */}
                  <td className="px-3 py-3.5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <Calendar size={11} className="shrink-0 text-slate-400" />
                        Publicada {v.publicadaHa}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <Clock size={11} className="shrink-0 text-slate-400" />
                        Prazo: {v.prazo}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#243c7e] cursor-pointer hover:underline">
                        <ExternalLink size={11} className="shrink-0" />
                        Ver processo seletivo
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyle[v.status]}`}>
                        {v.status}
                      </span>
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === v.id ? null : v.id)}
                          className="p-1 rounded-lg hover:bg-slate-100 transition-colors text-slate-400"
                        >
                          <MoreVertical size={14} />
                        </button>
                        {openMenu === v.id && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />
                            <div className="absolute right-0 top-full mt-1 w-44 rounded-xl border border-blue-300 bg-white shadow-lg z-50 py-1 overflow-hidden">
                              {["Editar vaga", "Pausar vaga", "Duplicar", "Encerrar vaga"].map((action) => (
                                <button
                                  key={action}
                                  onClick={() => setOpenMenu(null)}
                                  className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors hover:bg-slate-50 ${action === "Encerrar vaga" ? "text-red-500 hover:bg-red-50" : "text-slate-700"}`}
                                >
                                  {action}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400">{filtered.length} vagas encontradas{selected.length > 0 ? ` · ${selected.length} selecionadas` : ""}</p>
            <div className="flex items-center gap-1">
              {["1", "2", "3"].map((p) => (
                <button key={p} className={`h-7 w-7 rounded-lg text-xs font-medium transition-colors ${p === "1" ? "bg-[#243c7e] text-white" : "text-slate-500 hover:bg-slate-100"}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ── Modal Nova Vaga ── */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={closeModal} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">

              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 shrink-0">
                <div>
                  <p className="font-extrabold text-slate-900 text-base">Nova vaga</p>
                  <p className="text-xs text-slate-400 mt-0.5">{STEPS[step]} · passo {step + 1} de {STEPS.length}</p>
                </div>
                <button onClick={closeModal} className="text-slate-400 hover:text-slate-700 transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-0 px-6 py-3 border-b border-slate-100 shrink-0">
                {STEPS.map((s, i) => (
                  <div key={s} className="flex items-center gap-0">
                    <div className="flex items-center gap-2">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${
                        i < step ? "bg-green-500 text-white" : i === step ? "bg-[#243c7e] text-white" : "bg-slate-100 text-slate-400"
                      }`}>
                        {i < step ? <Check size={11} /> : i + 1}
                      </div>
                      <span className={`text-xs font-medium ${i === step ? "text-slate-900" : "text-slate-400"}`}>{s}</span>
                    </div>
                    {i < STEPS.length - 1 && <ChevronRight size={13} className="text-slate-300 mx-3" />}
                  </div>
                ))}
              </div>

              {/* Body */}
              <div className="overflow-y-auto flex-1 px-6 py-5">

                {/* ─ Step 1: Dados da vaga ─ */}
                {step === 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Título da vaga *</label>
                        <input placeholder="Ex: Desenvolvedor Front-end Pleno"
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#243c7e]/20 focus:border-[#243c7e]/40 placeholder:text-slate-400 transition" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Departamento</label>
                        <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#243c7e]/20">
                          <option>Tecnologia</option><option>Marketing</option><option>Comercial</option>
                          <option>Administrativo</option><option>Recursos Humanos</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Tipo de contrato</label>
                        <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#243c7e]/20">
                          <option>CLT</option><option>PJ</option><option>Estágio</option>
                          <option>Temporário</option><option>Freelancer</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Modalidade</label>
                        <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#243c7e]/20">
                          <option>Presencial</option><option>Remoto</option><option>Híbrido</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Localização</label>
                        <input placeholder="Ex: São Paulo, SP"
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#243c7e]/20 placeholder:text-slate-400 transition" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Nº de vagas</label>
                        <input type="number" min={1} defaultValue={1}
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#243c7e]/20 transition" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Prazo de encerramento</label>
                        <input type="date"
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#243c7e]/20 transition" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Descrição da vaga</label>
                        <textarea rows={4} placeholder="Descreva as responsabilidades, requisitos e benefícios..."
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#243c7e]/20 placeholder:text-slate-400 resize-none transition" />
                      </div>
                    </div>
                  </div>
                )}

                {/* ─ Step 2: Plataformas de publicação ─ */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-2 rounded-lg bg-blue-50 px-4 py-3">
                      <Megaphone size={14} className="text-blue-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-600">
                        Selecione onde deseja divulgar esta vaga. Plataformas não conectadas precisam ser configuradas em <span className="font-semibold text-[#243c7e]">Setup → Integrações</span>.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {plataformas.map((p) => {
                        const selecionada = pubPlats.includes(p.id);
                        const obrigatoria = p.id === "pitstop";
                        return (
                          <button
                            key={p.id}
                            onClick={() => togglePlat(p.id)}
                            disabled={!p.conectada && !selecionada}
                            className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${
                              selecionada
                                ? "border-[#243c7e] bg-[#243c7e]/5"
                                : p.conectada
                                  ? "border-blue-300 hover:border-slate-300 hover:bg-slate-50"
                                  : "border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed"
                            }`}
                          >
                            {/* Avatar da plataforma */}
                            <div
                              className="h-9 w-9 rounded-lg flex items-center justify-center text-white text-sm font-extrabold shrink-0"
                              style={{ background: p.cor }}
                            >
                              {p.nome[0]}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-semibold text-slate-900">{p.nome}</span>
                                {p.gratuita && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">GRÁTIS</span>
                                )}
                                {obrigatoria && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#243c7e]/10 text-[#243c7e]">PADRÃO</span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 mt-0.5 truncate">{p.desc}</p>
                            </div>

                            {/* Estado */}
                            <div className="shrink-0">
                              {selecionada ? (
                                <div className="h-5 w-5 rounded-full bg-[#243c7e] flex items-center justify-center">
                                  <Check size={11} className="text-white" />
                                </div>
                              ) : p.conectada ? (
                                <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
                              ) : (
                                <span className="text-[10px] font-semibold text-slate-400">Conectar</span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <p className="text-xs text-slate-400 text-center">
                      {pubPlats.length} plataforma{pubPlats.length !== 1 ? "s" : ""} selecionada{pubPlats.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between shrink-0">
                <button
                  onClick={step === 0 ? closeModal : () => setStep(s => s - 1)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  {step === 0 ? "Cancelar" : "Voltar"}
                </button>
                <button
                  onClick={step < STEPS.length - 1 ? () => setStep(s => s + 1) : closeModal}
                  className="flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(135deg,#5b21b6,#8b5cf6)" }}
                >
                  {step < STEPS.length - 1 ? <>Próximo <ChevronRight size={14} /></> : <>Publicar vaga <Megaphone size={14} /></>}
                </button>
              </div>

            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default GestaoVagas;
