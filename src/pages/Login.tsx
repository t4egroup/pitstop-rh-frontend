import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Users, TrendingUp, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate("/dashboard");
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden">

      {/* ── Left panel – form (40%) ── */}
      <div className="w-full lg:w-[40%] flex flex-col bg-background px-10 overflow-y-auto">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-[340px] py-8">

            {/* Mobile logo */}
            <div className="mb-8 lg:hidden">
              <Logo size="md" showTagline />
            </div>

            <h1 className="text-2xl font-extrabold mb-1">Bem-vindo de volta</h1>
            <p className="text-sm text-muted-foreground mb-7">
              Entre na sua conta para continuar
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold">E-mail</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full rounded-xl border bg-background pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold">Senha</label>
                  <a href="#" className="text-xs text-primary hover:underline">Esqueci minha senha</a>
                </div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full rounded-xl border bg-background pl-10 pr-11 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#31549c" }}
              >
                Entrar <ArrowRight size={15} />
              </button>
            </form>

            <div className="mt-5 text-center text-sm text-muted-foreground">
              Não tem conta?{" "}
              <Link to="/cadastro" className="font-bold hover:underline" style={{ color: "#31549c" }}>
                Cadastre-se
              </Link>
            </div>

          </div>
        </div>

        {/* Copyright at bottom */}
        <p className="text-xs text-muted-foreground text-center py-4">
          © 2025 PitStop RH Consultoria
        </p>
      </div>

      {/* ── Right panel – branding (60%) ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[60%] p-14 relative overflow-hidden"
        style={{ backgroundColor: "#31549c" }}
      >
        {/* dot grid */}
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-40" />
        {/* glow blobs */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-12 h-80 w-80 rounded-full bg-[#ea3839]/15 blur-3xl pointer-events-none" />
        {/* red left border */}
        <div className="absolute top-0 left-0 bottom-0 w-[3px]" style={{ background: "linear-gradient(180deg,#ea3839,rgba(234,56,57,0))" }} />

        {/* Logo */}
        <div className="relative z-10">
          <Logo size="md" white />
        </div>

        {/* Center copy */}
        <div className="relative z-10">
          <p className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: "#ea3839" }}>
            Plataforma de recrutamento
          </p>
          <h2 className="text-5xl font-extrabold text-white leading-[1.1] mb-6">
            A parada certa<br />para o seu{" "}
            <span style={{ color: "#ea3839" }}>sucesso.</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-md">
            Gerencie processos seletivos, candidatos e admissões em um só lugar — com inteligência e agilidade.
          </p>

          {/* Stats */}
          <div className="flex gap-10 mt-10">
            {[
              { icon: Users,      num: "+1000", label: "processos/ano"  },
              { icon: TrendingUp, num: "98%",   label: "satisfação"     },
              { icon: Shield,     num: "+600",  label: "vagas fechadas" },
            ].map(({ icon: Icon, num, label }, i) => (
              <div key={i}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={14} className="text-white/50" />
                  <p className="text-xl font-extrabold text-white leading-none">{num}</p>
                </div>
                <p className="text-xs text-white/45">{label}</p>
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
