import { Link } from "react-router-dom";
import {
  Briefcase, Building2, Users, FileText,
  ClipboardList, Mail, Star, MessageSquare, DollarSign,
} from "lucide-react";

const sections = [
  {
    titulo: "Estrutura da empresa",
    items: [
      { to: "/setup/cargos",        label: "Cargos",                 desc: "Gerencie os cargos cadastrados na estrutura",        icon: Briefcase },
      { to: "/setup/areas",         label: "Áreas",                  desc: "Departamentos e áreas da empresa",                   icon: Building2 },
      { to: "/setup/colaboradores", label: "Pessoas colaboradoras",  desc: "Usuários com acesso à plataforma",                   icon: Users },
    ],
  },
  {
    titulo: "Testes",
    items: [
      { to: "/setup/testes",        label: "Parceiros & Customizados", desc: "Testes aplicados nos processos seletivos",         icon: ClipboardList },
      { to: "/setup/fit-cultural",  label: "Fit Cultural",             desc: "Dimensões culturais e pesos de avaliação",         icon: Star },
    ],
  },
  {
    titulo: "Templates",
    items: [
      { to: "/setup/templates-vaga",  label: "Templates de vaga",      desc: "Modelos para agilizar a criação de vagas",         icon: FileText },
      { to: "/setup/templates-email", label: "Templates de e-mail",    desc: "Modelos de comunicação com candidatos",            icon: Mail },
      { to: "/setup/roteiros",        label: "Roteiros de entrevista", desc: "Guias estruturados para entrevistas",              icon: ClipboardList },
    ],
  },
  {
    titulo: "Configurações avançadas",
    items: [
      { to: "/setup/pesquisa-satisfacao",    label: "Pesquisa de satisfação",      desc: "Pesquisa enviada ao final do processo",                    icon: MessageSquare },
      { to: "/setup/controle-financeiro",    label: "Controle Financeiro",         desc: "Defina quais dados financeiros cada recrutador visualiza",  icon: DollarSign    },
    ],
  },
];

const Setup = () => (
  <div className="min-h-screen bg-blue-50">
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Setup da Empresa</h1>
        <p className="text-sm text-slate-500 mt-1">Configure todas as informações e dados referentes à sua empresa aqui</p>
      </div>

      {/* Página Inicial */}
      <Link
        to="/perfil"
        className="block rounded-xl bg-[#e8edf8] border border-[#243c7e]/20 px-5 py-3.5 mb-6 text-sm font-semibold text-[#243c7e] hover:bg-[#dce4f4] transition-colors"
      >
        Página Inicial
      </Link>

      {/* Seções */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.titulo}>
            <h2 className="text-sm font-extrabold text-slate-900 mb-2">{section.titulo}</h2>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-700 hover:bg-purple-100 hover:text-purple-900 transition-colors group"
                >
                  <item.icon size={16} className="text-slate-400 group-hover:text-purple-600 shrink-0 transition-colors" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Setup;
