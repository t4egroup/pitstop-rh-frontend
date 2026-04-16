import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Users, TrendingUp, Shield } from "lucide-react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";

const ROLE_REDIRECT: Record<UserRole, string> = {
  candidato: "/candidato/vagas",
  empresa: "/empresa",
  recrutador: "/dashboard",
};

const MOCK_USERS: Record<UserRole, { id: string; name: string; email: string }> = {
  candidato:  { id: "1", name: "João Silva",    email: "joao@email.com"        },
  empresa:    { id: "2", name: "Tech Corp",      email: "rh@techcorp.com.br"    },
  recrutador: { id: "3", name: "Amanda Mayumi",  email: "amanda@pitstop.com.br" },
};

const roles: { value: UserRole; label: string }[] = [
  { value: "candidato",  label: "Candidato"  },
  { value: "empresa",    label: "Empresa"    },
  { value: "recrutador", label: "Recrutador" },
];

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("candidato");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ ...MOCK_USERS[selectedRole], role: selectedRole });
    navigate(ROLE_REDIRECT[selectedRole]);
  };

  return (
    <div className="h-screen flex overflow-hidden">

      {/* ── Left panel – formulário ── */}
      <div
        className="w-full lg:w-[42%] flex flex-col px-10 overflow-y-auto"
        style={{ background: "linear-gradient(160deg, #f8faff 0%, #eef3ff 100%)" }}
      >
        <div className="sticky top-0 pt-5 pb-2">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                <ArrowLeft size={14} /> Voltar ao início
              </Link>
            </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-[360px] py-8">

            {/* Mobile logo */}
            <div className="mb-8 lg:hidden">
              <Logo size="md" />
            </div>

            {/* Header */}
            <div className="mb-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#243c7e]/20 bg-[#243c7e]/5 px-3.5 py-1.5 text-xs font-semibold text-[#243c7e] mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ea3839]" />
                Acesse sua conta
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Bem-vindo de volta</h1>
              <p className="text-sm text-slate-500">Entre na sua conta para continuar</p>
            </div>

            {/* Role selector */}
            <div className="flex rounded-full border border-blue-300 bg-white p-1 mb-6 shadow-sm">
              {roles.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSelectedRole(value)}
                  className="flex-1 py-1.5 text-xs font-semibold transition-all rounded-full"
                  style={
                    selectedRole === value
                      ? { background: "linear-gradient(135deg,#4060aa 0%,#638cdc 50%,#d04870 85%,#f06868 100%)", color: "#fff" }
                      : { color: "#64748b" }
                  }
                >
                  {label}
                </button>
              ))}
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">E-mail</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full rounded-xl border border-blue-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-[#243c7e]/25 focus:border-[#243c7e] transition-all shadow-sm placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700">Senha</label>
                  <a href="#" className="text-xs font-medium text-[#243c7e] hover:underline">Esqueci minha senha</a>
                </div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-blue-300 bg-white pl-10 pr-11 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-[#243c7e]/25 focus:border-[#243c7e] transition-all shadow-sm placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-full py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 shadow-md mt-2"
                style={{ background: "linear-gradient(135deg,#4060aa 0%,#638cdc 50%,#d04870 85%,#f06868 100%)" }}
              >
                Entrar <ArrowRight size={15} />
              </button>
            </form>

            <div className="mt-5 text-center text-sm text-slate-500">
              Não tem conta?{" "}
              <Link to="/cadastro" className="font-bold text-[#243c7e] hover:underline">
                Cadastre-se
              </Link>
            </div>

          </div>
        </div>

        <p className="text-xs text-slate-400 text-center py-4">
          © 2025 PitStop RH Consultoria
        </p>
      </div>

      {/* ── Right panel – branding (hero-style) ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[58%] p-14 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #0a1628 0%, #0f2044 40%, #162952 100%)" }}
      >
        {/* ── Geometric shapes ── */}
        <div className="absolute top-0 right-0 w-[420px] h-[420px] pointer-events-none opacity-50"
          style={{ background: "linear-gradient(160deg,#1e3a7a,#243c7e)", clipPath: "polygon(100% 0%,30% 0%,100% 70%)" }} />
        <div className="absolute top-0 right-0 w-[260px] h-[260px] pointer-events-none opacity-30"
          style={{ background: "#31549c", clipPath: "polygon(100% 0%,55% 0%,100% 45%)" }} />
        <div className="absolute bottom-0 left-0 w-[320px] h-[320px] pointer-events-none opacity-25"
          style={{ background: "linear-gradient(45deg,#c0392b,#ea3839)", clipPath: "polygon(0% 100%,0% 35%,65% 100%)" }} />
        <div className="absolute bottom-0 right-0 w-[180px] h-[180px] pointer-events-none opacity-15"
          style={{ background: "#f59e0b", clipPath: "polygon(100% 100%,30% 100%,100% 30%)" }} />

        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* SVG circles */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.07 }} aria-hidden>
          <circle cx="75%" cy="50%" r="160" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="75%" cy="50%" r="260" fill="none" stroke="white" strokeWidth="0.7" />
          <circle cx="75%" cy="50%" r="360" fill="none" stroke="white" strokeWidth="0.4" />
        </svg>

        {/* Dot grid */}
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-15" />

        {/* Top stripe */}
        <div className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none"
          style={{ background: "linear-gradient(90deg,#ea3839 0%,#3b6fd4 45%,#243c7e 70%,transparent 100%)" }} />
        {/* Left stripe */}
        <div className="absolute top-0 left-0 bottom-0 w-[3px] pointer-events-none"
          style={{ background: "linear-gradient(180deg,#ea3839,rgba(59,111,212,0.4),transparent)" }} />

        {/* Logo */}
        <div className="relative z-10">
          <Logo size="md" white />
        </div>

        {/* Copy */}
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#ea3839" }}>
            Plataforma de recrutamento
          </p>
          <h2 className="text-5xl font-extrabold text-white leading-[1.05] mb-6">
            A parada certa<br />para o seu{" "}
            <span style={{ color: "#ea3839" }}>sucesso.</span>
          </h2>
          <p className="text-white/55 text-base leading-relaxed max-w-md">
            Gerencie processos seletivos, candidatos e admissões em um só lugar — com inteligência e agilidade.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mt-10">
            {[
              { icon: Users,      num: "+1000", label: "processos/ano",  accent: "#60a5fa" },
              { icon: TrendingUp, num: "98%",   label: "satisfação",     accent: "#4ade80" },
              { icon: Shield,     num: "+600",  label: "vagas fechadas", accent: "#fbbf24" },
            ].map(({ icon: Icon, num, label, accent }, i) => (
              <div key={i}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={13} style={{ color: accent }} />
                  <p className="text-xl font-extrabold leading-none" style={{ color: accent }}>{num}</p>
                </div>
                <p className="text-xs text-white/40">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div />
      </div>

    </div>
  );
};

export default Login;
