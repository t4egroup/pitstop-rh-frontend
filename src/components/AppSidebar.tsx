import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, GitPullRequest, ClipboardList,
  Users, BarChart2, Megaphone, UserCheck,
  LogOut, Settings, Briefcase, Building2, User, Search,
  PanelLeftClose, PanelLeftOpen, ChevronDown,
  Globe, List, FileText, MessageSquare, CheckSquare, Handshake,
} from "lucide-react";
import { useState } from "react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";

type NavItem = {
  to: string;
  label: string;
  icon: React.ElementType;
  children?: { to: string; label: string }[];
};

const navLinks: Record<UserRole, NavItem[]> = {
  recrutador: [
    { to: "/inicio",           label: "Início",            icon: LayoutDashboard },
    { to: "/dashboard",        label: "Visão geral",       icon: BarChart2       },
    { to: "/gestao-vagas",     label: "Gestão de vagas",  icon: Briefcase       },
    {
      to: "#",
      label: "Gestão de talentos",
      icon: Users,
      children: [
        { to: "/talentos",           label: "Base Pitstop" },
        { to: "/portal-talentos",    label: "Base Empresa" },
        { to: "/listas-segmentadas", label: "Listas Segmentadas" },
        { to: "/paginas-captacao",   label: "Páginas de Captação" },
        { to: "/comunicacoes",       label: "Comunicações" },
      ],
    },
    { to: "/analisar-dados",   label: "Analisar dados",   icon: BarChart2       },
    { to: "/relatorios",       label: "Relatórios",       icon: FileText        },
    { to: "/gerenciar-tarefas",label: "Gerenciar tarefas", icon: CheckSquare    },
    { to: "/parceiros",        label: "Parceiros",         icon: Handshake       },
    { to: "/setup",              label: "Setup",             icon: Settings        },
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
  recrutador: [],
  candidato: [],
  empresa: [],
};

const AppSidebar = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  if (!user) return null;

  const links = navLinks[user.role];

  const handleToggleCollapse = () => {
    setCollapsed(c => {
      if (!c) {
        // Closing: also close all submenus
        setOpenSubmenus({});
      }
      return !c;
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside
      className={`sticky top-0 h-screen flex flex-col border-r border-[#1b2e63] transition-[width,min-width] duration-200 shrink-0 overflow-hidden whitespace-nowrap ${
        collapsed ? "w-[68px] min-w-[68px]" : "w-[260px] min-w-[260px]"
      }`}
      style={{ background: "linear-gradient(180deg, #243c7e 0%, #1b2e63 100%)" }}
    >
      {/* ── Header: só o logo ── */}
      <div className={`flex items-center h-14 border-b border-white/10 shrink-0 ${collapsed ? "justify-center px-2" : "px-5"}`}>
        {collapsed ? (
          <img src="/logo-branco.png" alt="PitStop RH" className="h-9 w-9 object-contain" draggable={false} />
        ) : (
          <Logo size="sm" white />
        )}
      </div>

      {/* ── Perfil + botão recolher ── */}
      <div className="border-b border-white/10 py-2 px-2 shrink-0">
        <div className={`flex items-center gap-1 ${collapsed ? "justify-center" : ""}`}>

          {!collapsed && (
            <div className="flex items-center gap-2.5 flex-1 min-w-0 px-2 py-2">
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ background: "linear-gradient(135deg,#4f6ec0,#7b9be0)" }}
              >
                {user.name?.[0]?.toUpperCase() ?? "?"}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                <p className="text-[11px] text-white/50 truncate">{user.email}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleToggleCollapse}
            title={collapsed ? "Expandir" : "Recolher"}
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-purple-400/20 transition-colors shrink-0 mx-auto"
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>
      </div>

      {/* ── Nav links ── */}
      <nav className={`flex-1 overflow-y-auto overflow-x-hidden py-4 space-y-1 ${collapsed ? "px-2" : "px-3"}`}>
        {links.map((l) => {
          if (l.children) {
            const isChildActive = l.children.some((c) => pathname === c.to);
            const isOpen = openSubmenus[l.label] ?? isChildActive;
            return (
              <div key={l.label}>
                <button
                  onClick={() => {
                    if (collapsed) {
                      setCollapsed(false);
                      setOpenSubmenus((prev) => ({ ...prev, [l.label]: true }));
                    } else {
                      setOpenSubmenus((prev) => ({ ...prev, [l.label]: !isOpen }));
                    }
                  }}
                  title={collapsed ? l.label : undefined}
                  className={`flex items-center gap-3 rounded-xl py-2.5 text-sm font-medium transition-colors w-full ${
                    isChildActive
                      ? "bg-white/15 text-white font-semibold"
                      : "text-indigo-200 hover:text-white hover:bg-purple-400/20"
                  } ${collapsed ? "justify-center px-2" : "px-3"}`}
                >
                  <l.icon size={22} className="shrink-0 text-indigo-200" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{l.label}</span>
                      <ChevronDown
                        size={14}
                        className={`shrink-0 text-white/40 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </>
                  )}
                </button>
                {!collapsed && isOpen && (
                  <div className="ml-8 mt-1 space-y-0.5 border-l-2 border-white/20 pl-3">
                    {l.children.map((child) => {
                      const childActive = pathname === child.to;
                      return (
                        <Link
                          key={child.to}
                          to={child.to}
                          className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                            childActive
                              ? "bg-white/15 text-white font-semibold"
                              : "text-indigo-200 hover:text-white hover:bg-purple-400/20"
                          }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          const active = pathname === l.to;
          return (
            <Link
              key={l.to}
              to={l.to}
              title={collapsed ? l.label : undefined}
              className={`flex items-center gap-3 rounded-xl py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-white/15 text-white font-semibold"
                  : "text-indigo-200 hover:text-white hover:bg-purple-400/20"
              } ${collapsed ? "justify-center px-2" : "px-3"}`}
            >
              <l.icon size={22} className="shrink-0 text-indigo-200" />
              {!collapsed && <span>{l.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* ── Sair da conta ── */}
      <div className={`border-t border-white/10 py-3 shrink-0 ${collapsed ? "px-2" : "px-3"}`}>
        <button
          onClick={handleLogout}
          title={collapsed ? "Sair da conta" : undefined}
          className={`flex items-center gap-3 rounded-xl py-2.5 text-sm font-medium text-white/50 hover:text-red-300 hover:bg-purple-400/20 transition-colors w-full ${
            collapsed ? "justify-center px-2" : "px-3"
          }`}
        >
          <LogOut size={22} className="shrink-0" />
          {!collapsed && <span>Sair da conta</span>}
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
