import { useState } from "react";
import {
  Building2, Users, Link, Bell, Settings, Shield,
  ArrowLeft, Check, X, Plus, Edit, Upload, ChevronRight,
} from "lucide-react";

const tabs = [
  { id: "empresa",       label: "Empresa",                icon: Building2 },
  { id: "usuarios",      label: "Usuários & Permissões",  icon: Users     },
  { id: "integracoes",   label: "Integrações",            icon: Link      },
  { id: "notificacoes",  label: "Notificações",           icon: Bell      },
  { id: "campos",        label: "Campos Personalizados",  icon: Settings  },
  { id: "seguranca",     label: "Segurança",              icon: Shield    },
];

const usuarios = [
  { name: "Ana Paula Rodrigues", email: "ana@pitstop.com.br",   role: "Admin",       ativo: true  },
  { name: "Carlos Souza",        email: "carlos@pitstop.com.br", role: "Recrutador",  ativo: true  },
  { name: "Fernanda Lima",       email: "fe@pitstop.com.br",    role: "Recrutador",  ativo: true  },
  { name: "João Mendes",         email: "joao@pitstop.com.br",  role: "Visualizador", ativo: false },
  { name: "Marina Costa",        email: "marina@pitstop.com.br", role: "Recrutador", ativo: true  },
];

const integracoes = [
  { name: "LinkedIn",          desc: "Publique vagas e importe candidatos",  conectado: true  },
  { name: "Indeed",            desc: "Distribua vagas automaticamente",       conectado: false },
  { name: "Slack",             desc: "Receba notificações no Slack",          conectado: true  },
  { name: "Zapier",            desc: "Automatize fluxos com qualquer app",    conectado: false },
  { name: "Google Workspace",  desc: "Sincronize calendário e e-mails",       conectado: false },
  { name: "Gupy",              desc: "Importe dados da plataforma Gupy",      conectado: false },
];

const notificacoes = [
  { label: "Nova candidatura recebida",          ativo: true  },
  { label: "Prazo de vaga a expirar (7 dias)",   ativo: true  },
  { label: "Entrevista agendada",                ativo: true  },
  { label: "Candidato aprovado na triagem",      ativo: false },
  { label: "Proposta enviada ao candidato",      ativo: true  },
  { label: "Vaga encerrada sem contratação",     ativo: false },
  { label: "Relatório semanal de recrutamento",  ativo: true  },
];

const inputCls = "w-full rounded-lg border border-blue-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#243c7e]/20 focus:border-[#243c7e]/40 transition";

const Setup = () => {
  const [activeTab, setActiveTab] = useState("empresa");
  const [notifs, setNotifs] = useState(notificacoes.map((n) => n.ativo));

  const goBack = () => setActiveTab("empresa");
  const isFirstTab = activeTab === "empresa";

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900">Setup</h1>
          <p className="text-xs text-slate-400 mt-0.5">Configurações do sistema e da conta</p>
        </div>

        <div className="flex gap-5">

          {/* Sidebar tabs */}
          <aside className="w-56 shrink-0">
            <nav className="space-y-0.5">
              {tabs.map((t) => {
                const active = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`flex items-center gap-2.5 w-full rounded-xl px-3 py-2.5 text-sm font-medium transition-colors text-left ${
                      active
                        ? "bg-[#243c7e]/10 text-[#243c7e] font-semibold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <t.icon size={16} className="shrink-0" />
                    {t.label}
                    {active && <ChevronRight size={13} className="ml-auto text-[#243c7e]" />}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">

            {/* Back button — aparece em todas as abas exceto a primeira */}
            {!isFirstTab && (
              <button
                onClick={goBack}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors mb-4"
              >
                <ArrowLeft size={14} /> Voltar para Empresa
              </button>
            )}

            {/* ── EMPRESA ── */}
            {activeTab === "empresa" && (
              <div className="rounded-xl bg-white border border-blue-300 p-6">
                <p className="font-bold text-slate-900 mb-1">Dados da Empresa</p>
                <p className="text-xs text-slate-400 mb-5">Informações gerais da sua organização</p>

                {/* Logo upload */}
                <div className="mb-5">
                  <p className="text-xs font-medium text-slate-600 mb-2">Logotipo</p>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-xl border-2 border-dashed border-blue-300 flex items-center justify-center bg-slate-50 text-slate-300">
                      <Building2 size={24} />
                    </div>
                    <button className="flex items-center gap-2 rounded-lg border border-blue-300 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                      <Upload size={13} /> Enviar logo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Razão Social</label>
                    <input className={inputCls} defaultValue="PitStop RH" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">CNPJ</label>
                    <input className={inputCls} placeholder="00.000.000/0001-00" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Segmento</label>
                    <select className={inputCls}>
                      <option>Recursos Humanos</option>
                      <option>Tecnologia</option>
                      <option>Varejo</option>
                      <option>Indústria</option>
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Porte</label>
                    <select className={inputCls}>
                      <option>Startup</option>
                      <option>PME</option>
                      <option>Mid-Market</option>
                      <option>Enterprise</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Site</label>
                    <input className={inputCls} defaultValue="https://pitstoprh.com.br" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Endereço</label>
                    <input className={inputCls} placeholder="Rua, número, bairro, cidade - UF" />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button className="rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                    style={{ background: "linear-gradient(135deg,#243c7e,#3b6fd4)" }}>
                    Salvar alterações
                  </button>
                </div>
              </div>
            )}

            {/* ── USUÁRIOS ── */}
            {activeTab === "usuarios" && (
              <div className="rounded-xl bg-white border border-blue-300 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">Usuários & Permissões</p>
                    <p className="text-xs text-slate-400 mt-0.5">Gerencie quem tem acesso à plataforma</p>
                  </div>
                  <button className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg,#243c7e,#3b6fd4)" }}>
                    <Plus size={13} /> Convidar usuário
                  </button>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/60">
                      <th className="text-left px-6 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Usuário</th>
                      <th className="text-left px-3 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Perfil</th>
                      <th className="text-left px-3 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                      <th className="px-3 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {usuarios.map((u, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                              style={{ background: "linear-gradient(135deg,#243c7e,#4f6ec0)" }}>
                              {u.name[0]}
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 text-sm">{u.name}</p>
                              <p className="text-[11px] text-slate-400">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3.5">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            u.role === "Admin" ? "bg-purple-100 text-purple-700" :
                            u.role === "Recrutador" ? "bg-blue-100 text-blue-700" :
                            "bg-slate-100 text-slate-500"
                          }`}>{u.role}</span>
                        </td>
                        <td className="px-3 py-3.5">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${u.ativo ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-400"}`}>
                            {u.ativo ? "Ativo" : "Inativo"}
                          </span>
                        </td>
                        <td className="px-3 py-3.5 text-right">
                          <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                            <Edit size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── INTEGRAÇÕES ── */}
            {activeTab === "integracoes" && (
              <div className="rounded-xl bg-white border border-blue-300 p-6">
                <p className="font-bold text-slate-900 mb-1">Integrações</p>
                <p className="text-xs text-slate-400 mb-5">Conecte a PitStop RH com outras ferramentas</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {integracoes.map((intg) => (
                    <div key={intg.name} className="flex items-center justify-between rounded-xl border border-blue-300 px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-extrabold text-slate-600">
                          {intg.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{intg.name}</p>
                          <p className="text-[11px] text-slate-400">{intg.desc}</p>
                        </div>
                      </div>
                      <button className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                        intg.conectado
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-[#243c7e]/10 text-[#243c7e] hover:bg-[#243c7e]/20"
                      }`}>
                        {intg.conectado ? <span className="flex items-center gap-1"><Check size={11} /> Conectado</span> : "Conectar"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── NOTIFICAÇÕES ── */}
            {activeTab === "notificacoes" && (
              <div className="rounded-xl bg-white border border-blue-300 p-6">
                <p className="font-bold text-slate-900 mb-1">Notificações</p>
                <p className="text-xs text-slate-400 mb-5">Escolha quais alertas deseja receber por e-mail</p>
                <div className="divide-y divide-slate-100">
                  {notificacoes.map((n, i) => (
                    <div key={i} className="flex items-center justify-between py-3.5">
                      <span className="text-sm text-slate-700">{n.label}</span>
                      <button
                        onClick={() => setNotifs((prev) => { const next = [...prev]; next[i] = !next[i]; return next; })}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${notifs[i] ? "bg-[#243c7e]" : "bg-slate-200"}`}
                      >
                        <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${notifs[i] ? "translate-x-4" : "translate-x-0.5"}`} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <button className="rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                    style={{ background: "linear-gradient(135deg,#243c7e,#3b6fd4)" }}>
                    Salvar preferências
                  </button>
                </div>
              </div>
            )}

            {/* ── CAMPOS / SEGURANÇA ── */}
            {(activeTab === "campos" || activeTab === "seguranca") && (
              <div className="rounded-xl bg-white border border-blue-300 p-12 flex flex-col items-center justify-center text-center">
                <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                  {activeTab === "campos" ? <Settings size={22} className="text-slate-400" /> : <Shield size={22} className="text-slate-400" />}
                </div>
                <p className="font-semibold text-slate-900 mb-1">Em breve</p>
                <p className="text-xs text-slate-400 max-w-xs">
                  {activeTab === "campos"
                    ? "A configuração de campos personalizados estará disponível em breve."
                    : "As configurações de segurança avançadas estão sendo implementadas."}
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;
