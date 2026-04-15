import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, GitPullRequest, ClipboardList,
  Users, BarChart2, Megaphone, UserCheck,
  LogIn, LogOut, Settings, Briefcase, Building2, User, Search,
} from "lucide-react";
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
    { to: "/candidato/vagas", label: "Vagas", icon: Search },
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

const homeLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre-nos", label: "Sobre Nós" },
  { href: "#solucoes", label: "Soluções em RH" },
  { href: "#pit", label: "P.I.T" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
  { href: "/planos", label: "Planos", isRoute: true },
];

const AppNav = () => {
  const { pathname } = useLocation();
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isPublicPage = pathname === "/" || pathname === "/planos";
  const isLoginPage = pathname === "/login" || pathname === "/cadastro";

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (isLoginPage || isLoggedIn) return null;

  return (
    <header className="sticky top-0 z-40 px-4 sm:px-8 pt-4 bg-transparent">
      <div className="max-w-5xl mx-auto mb-3 flex h-[80px] items-center justify-between rounded-2xl border-2 border-slate-300/80 bg-white/95 px-8 shadow-md backdrop-blur-xl dark:border-white/20 dark:bg-slate-900/96">
        {isLoggedIn ? (
          <div><Logo size="sm" /></div>
        ) : (
          <Link to="/"><Logo size="sm" /></Link>
        )}

        {/* Desktop nav — usuários logados (centrado, tem muitos itens) */}
        {isLoggedIn && user ? (
          <nav className="hidden md:flex items-center gap-1">
            {navLinks[user.role].map((l) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <l.icon size={15} />
                  {l.label}
                </Link>
              );
            })}
          </nav>
        ) : null}

        {/* Right side */}
        <div className="flex items-center gap-1">
          {/* Nav pública — junto ao botão de login */}
          {isPublicPage && !isLoggedIn && (
            <nav className="hidden md:flex items-center gap-0.5 mr-2">
              {homeLinks.map((l) => {
                const isOnHome = pathname === "/";
                const href = l.isRoute ? l.href : isOnHome ? l.href : `/${l.href}`;
                return l.isRoute ? (
                  <Link
                    key={l.href}
                    to={href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.href}
                    href={href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
                  >
                    {l.label}
                  </a>
                );
              })}
            </nav>
          )}
          {isLoggedIn ? (
            <>
              {/* Mobile nav icons */}
              {user && (
                <nav className="flex md:hidden items-center gap-1">
                  {navLinks[user.role].map((l) => {
                    const active = pathname === l.to;
                    return (
                      <Link
                        key={l.to}
                        to={l.to}
                        className={`flex items-center justify-center rounded-lg p-2 transition-colors ${
                          active ? "bg-primary/10 text-primary" : "text-muted-foreground"
                        }`}
                      >
                        <l.icon size={18} />
                      </Link>
                    );
                  })}
                </nav>
              )}

              {/* Avatar dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center justify-center h-9 w-9 rounded-full font-bold text-sm transition-colors ${
                    pathname === "/perfil"
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  {user?.name?.[0]?.toUpperCase() ?? "?"}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border bg-card shadow-lg overflow-hidden z-50">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-semibold">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    {user?.role === "candidato" && (
                      <>
                        <Link
                          to="/candidato"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                        >
                          <Briefcase size={15} className="text-muted-foreground" />
                          Minhas Candidaturas
                        </Link>
                        <Link
                          to="/candidato/perfil"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                        >
                          <User size={15} className="text-muted-foreground" />
                          Meu Perfil
                        </Link>
                      </>
                    )}
                    {user?.role === "recrutador" && (
                      <Link
                        to="/perfil"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                      >
                        <Settings size={15} className="text-muted-foreground" />
                        Configurações
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut size={15} />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity shadow-md"
              style={{ background: "linear-gradient(135deg,#ea3839 0%,#c0124a 15%,#3b6fd4 50%,#243c7e 100%)" }}
            >
              <LogIn size={15} />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppNav;
