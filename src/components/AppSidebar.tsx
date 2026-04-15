import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, GitPullRequest, ClipboardList,
  Users, BarChart2, Megaphone, UserCheck,
  LogOut, Settings, Briefcase, Building2, User, Search,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";

const navLinks: Record<UserRole, { to: string; label: string; icon: React.ElementType }[]> = {
  recrutador: [
    { to: "/dashboard",   label: "Dashboard",   icon: LayoutDashboard },
    { to: "/processos",   label: "Processos",   icon: GitPullRequest  },
    { to: "/requisicoes", label: "Requisições", icon: ClipboardList   },
    { to: "/candidatos",  label: "Candidatos",  icon: Users           },
    { to: "/relatorios",  label: "Relatórios",  icon: BarChart2       },
    { to: "/branding",    label: "Branding",    icon: Megaphone       },
    { to: "/admissao",    label: "Admissão",    icon: UserCheck       },
  ],
  candidato: [
    { to: "/candidato/vagas", label: "Vagas",        icon: Search    },
    { to: "/candidato",       label: "Candidaturas", icon: Briefcase },
    { to: "/candidato/perfil",label: "Meu Perfil",   icon: User      },
  ],
  empresa: [
    { to: "/empresa",             label: "Dashboard",  icon: LayoutDashboard },
    { to: "/empresa/vagas",       label: "Vagas",      icon: Briefcase       },
    { to: "/empresa/candidatos",  label: "Candidatos", icon: Users           },
    { to: "/empresa/relatorios",  label: "Relatórios", icon: BarChart2       },
    { to: "/empresa/branding",    label: "Branding",   icon: Megaphone       },
    { to: "/empresa/perfil",      label: "Perfil",     icon: Building2       },
  ],
};

const bottomLinks: Record<UserRole, { to: string; label: string; icon: React.ElementType }[]> = {
  recrutador: [{ to: "/perfil", label: "Configurações", icon: Settings }],
  candidato: [],
  empresa: [],
};

const AppSidebar = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const links = navLinks[user.role];
  const bottom = bottomLinks[user.role];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside
      className={`sticky top-0 h-screen flex flex-col border-r border-slate-200 bg-white transition-all duration-200 shrink-0 ${
        collapsed ? "w-[72px]" : "w-[240px]"
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 border-b border-slate-100 shrink-0 ${collapsed ? "justify-center px-2" : "px-5"}`}>
        {collapsed ? (
          <img src="/logo-colorido.png" alt="PitStop RH" className="h-7 w-auto object-contain" />
        ) : (
          <Logo size="sm" />
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {links.map((l) => {
          const active = pathname === l.to;
          return (
            <Link
              key={l.to}
              to={l.to}
              title={collapsed ? l.label : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-[#243c7e]/10 text-[#243c7e] font-semibold"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <l.icon size={18} className="shrink-0" />
              {!collapsed && <span>{l.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-slate-100 py-3 px-3 space-y-1 shrink-0">
        {bottom.map((l) => {
          const active = pathname === l.to;
          return (
            <Link
              key={l.to}
              to={l.to}
              title={collapsed ? l.label : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-[#243c7e]/10 text-[#243c7e] font-semibold"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <l.icon size={18} className="shrink-0" />
              {!collapsed && <span>{l.label}</span>}
            </Link>
          );
        })}

        {/* User info + logout */}
        <div className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${collapsed ? "justify-center" : ""}`}>
          <div className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ background: "linear-gradient(135deg,#243c7e,#4f6ec0)" }}>
            {user.name?.[0]?.toUpperCase() ?? "?"}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
              <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          title={collapsed ? "Sair" : undefined}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Sair</span>}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors w-full ${
            collapsed ? "justify-center" : ""
          }`}
        >
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Recolher</span></>}
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
