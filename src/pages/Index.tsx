import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import {
  Search, CalendarRange, ClipboardCheck, Handshake,
  TrendingUp, Lightbulb, Clock, ChevronDown, ChevronUp,
  Mail, Phone, MapPin, Linkedin, Instagram, MessageCircle,
  ArrowRight, ArrowLeft, Users, BarChart3, Shield, Building2,
  Briefcase, Target, Zap, Award, ExternalLink, Plus, Minus,
} from "lucide-react";

/* ───── Testimonials Data ───── */
const testimonials = [
  {
    companyDisplay: "Tech Solutions",
    size: "Mid-Market",
    industry: "Tecnologia",
    quote: "A PitStop RH preencheu 5 vagas técnicas em menos de 3 semanas. A plataforma centraliza tudo: triagem, entrevistas e feedback — o time de RH ganhou horas de produtividade por semana.",
    author: "Ana Paula Rodrigues",
    role: "Coordenadora de RH · Tech Solutions Brasil",
  },
  {
    companyDisplay: "Startup XP",
    size: "Startup",
    industry: "Fintech",
    quote: "Contratamos 3 engenheiros seniores em tempo recorde. A visibilidade do funil e a comunicação automática com candidatos tornaram o processo muito mais ágil e profissional.",
    author: "Ricardo Mendes",
    role: "CEO · StartupXP",
  },
  {
    companyDisplay: "LOG BR",
    size: "Enterprise",
    industry: "Logística",
    quote: "Com a PitStop RH reduzimos o tempo médio de contratação em 40%. O módulo de triagem inteligente filtra os candidatos certos antes mesmo da primeira entrevista.",
    author: "Fernanda Lima",
    role: "Diretora de Operações · LogBR",
  },
  {
    companyDisplay: "GrupoHR",
    size: "Enterprise",
    industry: "Recursos Humanos",
    quote: "A plataforma unificou nossos processos seletivos de ponta a ponta. Hoje gerenciamos mais de 50 vagas simultâneas com total rastreabilidade e relatórios em tempo real.",
    author: "Carlos Souza",
    role: "Head de Talent Acquisition · GrupoHR",
  },
];

/* ───── FAQ Data ───── */
const faqs = [
  { q: "Como a plataforma ajuda minha empresa a contratar mais rápido?", a: "A PitStop RH centraliza todo o funil de recrutamento — publicação de vagas, triagem automática, agendamento de entrevistas e comunicação com candidatos — em um único lugar, reduzindo o tempo médio de contratação em até 40%." },
  { q: "Sou candidato. Como funcionam as candidaturas?", a: "Crie seu perfil gratuitamente, preencha suas informações e se candidate a vagas compatíveis com um clique. Você acompanha o status de cada candidatura em tempo real." },
  { q: "Posso gerenciar múltiplas vagas ao mesmo tempo?", a: "Sim. A plataforma foi projetada para equipes de RH que lidam com dezenas de vagas simultâneas, com visão unificada do pipeline e relatórios por vaga, área ou período." },
  { q: "A PitStop RH cobra alguma taxa dos candidatos?", a: "Não. A plataforma é 100% gratuita para candidatos. Os planos pagos são voltados para empresas e recrutadores que desejam publicar vagas e gerenciar processos seletivos." },
  { q: "O que é a metodologia P.I.T e como ela impacta os resultados?", a: "P.I.T significa Performance, Inteligência e Tempo. É o conjunto de práticas e automações da plataforma que garante processos ágeis, decisões baseadas em dados e contratações de maior qualidade." },
  { q: "Como solicitar uma demonstração ou suporte?", a: "Clique em 'Solicitar demonstração' para falar com um consultor, ou entre em contato pelo WhatsApp ou pelo e-mail atendimento@pitstoprh.com.br." },
];

const clientLogos = [
  { name: "Eximport Lubequip", style: "font-bold text-xs tracking-wide text-slate-600" },
  { name: "ambev",             style: "font-black text-2xl text-[#E30613] italic"       },
  { name: "ODONTO company",    style: "font-bold text-sm text-[#00853F]"                },
  { name: "Studio Carol",      style: "font-bold text-sm tracking-widest text-slate-700 uppercase" },
  { name: "SALOCAR",           style: "font-black text-xl tracking-wider text-[#003087]"},
  { name: "imediato nexway",   style: "font-bold text-sm text-[#00B4A0]"               },
  { name: "Carrefour",         style: "font-black text-lg text-[#003087]"              },
  { name: "KPMG",              style: "font-black text-xl tracking-widest text-[#00338D]" },
  { name: "Sodexo",            style: "font-bold text-lg text-[#0057A8]"               },
  { name: "Nestlé",            style: "font-bold text-lg text-[#009B3A]"               },
  { name: "Teleperformance",   style: "font-bold text-sm tracking-wide text-[#E4002B]" },
];


const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setActiveTestimonial(i => (i + 1) % testimonials.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoplay();
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, []);

  const prevTestimonial = () => { setActiveTestimonial(i => (i - 1 + testimonials.length) % testimonials.length); startAutoplay(); };
  const nextTestimonial = () => { setActiveTestimonial(i => (i + 1) % testimonials.length); startAutoplay(); };

  return (
    <div className="flex flex-col" style={{ background: "#0f1f45" }}>

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section id="inicio" className="relative z-10 flex flex-col justify-center gap-8 pb-16 overflow-x-hidden min-h-screen -mt-[6.75rem] pt-[6.75rem]" style={{ background: "linear-gradient(145deg, #0a1628 0%, #0f2044 40%, #162952 100%)" }}>

        {/* ── Geometric shapes ── */}
        <div className="absolute top-0 right-0 w-[520px] h-[520px] pointer-events-none opacity-50"
          style={{ background: "linear-gradient(160deg,#1e3a7a,#243c7e)", clipPath: "polygon(100% 0%,30% 0%,100% 70%)" }} />
        <div className="absolute top-0 right-0 w-[320px] h-[320px] pointer-events-none opacity-30"
          style={{ background: "#31549c", clipPath: "polygon(100% 0%,55% 0%,100% 45%)" }} />
        <div className="absolute bottom-0 left-0 w-[380px] h-[380px] pointer-events-none opacity-30"
          style={{ background: "linear-gradient(45deg,#c0392b,#ea3839)", clipPath: "polygon(0% 100%,0% 35%,65% 100%)" }} />
        <div className="absolute bottom-0 right-0 w-[220px] h-[220px] pointer-events-none opacity-20"
          style={{ background: "#f59e0b", clipPath: "polygon(100% 100%,30% 100%,100% 30%)" }} />
        <div className="absolute top-1/2 -translate-y-1/2 -left-8 w-[160px] h-[300px] pointer-events-none opacity-10"
          style={{ background: "#22c55e", clipPath: "polygon(0% 20%,100% 0%,100% 100%,0% 80%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.07 }} aria-hidden>
          <circle cx="72%" cy="46%" r="180" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="72%" cy="46%" r="280" fill="none" stroke="white" strokeWidth="0.8" />
          <circle cx="72%" cy="46%" r="380" fill="none" stroke="white" strokeWidth="0.5" />
          <line x1="0" y1="100%" x2="40%" y2="0" stroke="white" strokeWidth="0.6" />
          <line x1="100%" y1="0" x2="60%" y2="100%" stroke="white" strokeWidth="0.6" />
        </svg>
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-15" />
        <div className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none"
          style={{ background: "linear-gradient(90deg,#ea3839 0%,#243c7e 50%,transparent 100%)" }} />

        <div className="relative z-10 container max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">

          {/* ── Left ── */}
          <div className="space-y-7">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              Plataforma completa de recrutamento e seleção
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-white">
                A Parada<br />
                certa para<br />
                o seu{" "}
                <span style={{ color: "#FFD700" }}>Sucesso.</span>
              </h1>
            </div>

            <p className="text-white/55 text-base leading-relaxed max-w-sm">
              Publique vagas, gerencie candidatos e feche contratações mais rápido — tudo em uma plataforma criada para equipes de RH e recrutadores.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-bold text-white hover:opacity-90 transition-opacity shadow-2xl"
                style={{ background: "linear-gradient(135deg,#4060aa 0%,#638cdc 50%,#d04870 85%,#f06868 100%)", boxShadow: "0 8px 30px rgba(234,56,57,0.35)" }}
              >
                Começar gratuitamente <ArrowRight size={15} />
              </Link>
              <Link
                to="/cadastro"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 text-white/85 px-8 py-4 text-sm font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                Sou Candidato
              </Link>
            </div>

            {/* Stat row */}
            <div className="flex items-stretch gap-0 pt-2">
              {[
                { num: "+1000", label: "processos/ano",  accent: "#60a5fa", border: "border-r border-white/10" },
                { num: "+600",  label: "vagas fechadas", accent: "#fbbf24", border: "border-r border-white/10" },
                { num: "98%",   label: "satisfação",     accent: "#4ade80", border: "" },
              ].map((s, i) => (
                <div key={i} className={`px-5 first:pl-0 ${s.border}`}>
                  <p className="text-2xl font-extrabold leading-none" style={{ color: s.accent }}>{s.num}</p>
                  <p className="text-[11px] text-white/40 mt-1.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

          </div>

          {/* ── Right — cards layout ── */}
          <div className="relative h-[580px] lg:-ml-16 hidden lg:block">

            {/* Glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 70% 60% at 55% 45%, rgba(49,84,156,0.22), transparent)" }} />

            {/* ── Foto — grande, quase full height ── */}
            <div
              className="absolute top-0 bottom-0 rounded-2xl overflow-hidden"
              style={{
                left: "42%",
                transform: "translateX(-50%)",
                width: "370px",
                zIndex: 5,
                boxShadow: "0 28px 70px rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <img src="/personhero.png" alt="" className="h-full w-full object-cover object-top" draggable={false} />
              <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(8,18,36,0.55))" }} />
            </div>

            {/* ── Card 2 — topo esquerdo ── */}
            <div className="absolute top-6 left-0 w-44 rounded-2xl bg-white p-4 z-20 border border-blue-300"
              style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.18)" }}>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-2">Tempo de fechamento</p>
              <p className="text-3xl font-extrabold leading-none" style={{ color: "#f59e0b" }}>12<span className="text-base font-normal text-slate-500 ml-1">dias</span></p>
              <p className="text-[10px] text-green-600 mt-2 flex items-center gap-1"><TrendingUp size={10} />–3 dias vs. mês ant.</p>
            </div>

            {/* ── Card 3 — topo, sobre a foto ── */}
            <div className="absolute top-4 right-[14%] w-36 rounded-2xl bg-white p-4 z-20 border border-blue-300"
              style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.18)" }}>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-2">Match médio</p>
              <p className="text-3xl font-extrabold leading-none text-slate-900">94<span className="text-base font-normal text-slate-500">%</span></p>
              <p className="text-[10px] text-slate-600 mt-2">compatibilidade</p>
            </div>

            {/* ── Card 4 — esquerdo, mais para baixo ── */}
            <div className="absolute left-0 z-20 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 border border-blue-300"
              style={{ top: "62%", transform: "translateY(-50%)", boxShadow: "0 10px 40px rgba(0,0,0,0.18)" }}>
              <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <Users size={13} className="text-green-600" />
              </div>
              <div>
                <p className="text-[9px] text-slate-500">Nova candidatura</p>
                <p className="text-xs font-bold text-slate-900">Maria S. se candidatou</p>
              </div>
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse shrink-0" />
            </div>

            {/* ── Card 1 (main) — canto inferior direito, vaza para baixo ── */}
            <div className="absolute -bottom-10 right-0 w-72 rounded-2xl bg-white p-5 z-30 border border-blue-300"
              style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.28)" }}>
              {/* company */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl flex items-center justify-center font-extrabold text-white text-xs shrink-0"
                    style={{ background: "linear-gradient(135deg,#243c7e,#4f6ec0)" }}>TC</div>
                  <div>
                    <p className="text-[10px] text-slate-500">Tech Corp Brasil</p>
                    <p className="text-sm font-bold text-slate-900">Dev Front-end Sr.</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">SP · CLT · R$ 12–18k</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-600">Aberta</span>
              </div>
              {/* pipeline */}
              <div className="space-y-1.5 mb-3">
                {[
                  { label: "Triagem",    n: 24, pct: 100, c: "#31549c" },
                  { label: "Entrevista", n: 9,  pct: 38,  c: "#a78bfa" },
                  { label: "Oferta",     n: 2,  pct: 8,   c: "#ea3839" },
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[9px] text-slate-600 w-16 shrink-0">{p.label}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${p.pct}%`, backgroundColor: p.c }} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 w-4 text-right">{p.n}</span>
                  </div>
                ))}
              </div>
              {/* avatars */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex -space-x-1.5">
                  {["from-blue-400 to-blue-600","from-amber-400 to-amber-500","from-green-400 to-green-600","from-pink-400 to-pink-600"].map((g, i) => (
                    <div key={i} className={`h-6 w-6 rounded-full border-[1.5px] border-white bg-gradient-to-br ${g} text-white text-[9px] font-bold flex items-center justify-center`}>
                      {["M","J","A","R"][i]}
                    </div>
                  ))}
                  <div className="h-6 w-6 rounded-full border-[1.5px] border-white bg-slate-100 text-slate-600 text-[8px] font-bold flex items-center justify-center">+20</div>
                </div>
                <span className="text-[10px] text-slate-600">24 candidatos</span>
              </div>
            </div>

            {/* ── Card 5 — sobre a foto, mais para cima ── */}
            <div className="absolute z-20 flex items-center gap-2 rounded-full px-4 py-2 shadow-xl"
              style={{ top: "24%", right: "10%", transform: "translateY(-50%)", background: "linear-gradient(135deg,#22c55e,#15803d)", boxShadow: "0 4px 20px rgba(34,197,94,0.4)" }}>
              <Briefcase size={13} className="text-white" />
              <span className="text-xs font-bold text-white">247 vagas ativas</span>
            </div>

          </div>
        </div>

        {/* ── Floating marquee bar ── */}
        <div className="relative z-30 container max-w-5xl mx-auto px-4 -mb-14">
          <div className="rounded-2xl bg-white border overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
            <div className="px-8 pt-5 pb-1">
              <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Empresas que confiam na{" "}
                <span style={{ color: "#243c7e" }}>PitStop</span>{" "}
                <span style={{ color: "#ea3839" }}>RH</span>
              </p>
            </div>
            <div className="relative overflow-hidden py-4">
              <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-card to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-card to-transparent z-10" />
              <div className="animate-marquee flex items-center gap-16 w-max">
                {[...clientLogos, ...clientLogos].map((logo, i) => (
                  <span key={i} className={`whitespace-nowrap ${logo.style}`}>{logo.name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. SOBRE NÓS
      ══════════════════════════════════════════ */}
      <section id="sobre-nos" className="pt-28 pb-20 sm:pb-28 relative rounded-[3rem]" style={{ background: "linear-gradient(160deg, #f8faff 0%, #eef3ff 100%)" }}>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #243c7e, transparent)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #ea3839, transparent)", transform: "translate(-30%, 30%)" }} />
        <div className="container max-w-6xl grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: stat grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "+1000", label: "processos por ano" },
              { num: "+600",  label: "vagas fechadas" },
              { num: "40%",   label: "menos rotação" },
              { num: "98%",   label: "satisfação" },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-xl border bg-white p-6 flex flex-col gap-1 hover:shadow-lg transition-all hover:-translate-y-0.5 duration-200"
                style={{ borderLeft: "4px solid #243c7e" }}
              >
                <p className="text-3xl font-extrabold leading-none" style={{ color: "#243c7e" }}>{s.num}</p>
                <p className="text-xs text-muted-foreground font-medium mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Right: copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary mb-5">
              <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: "#ea3839" }} />
              Nossa história
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-5">
              Recrutamento mais inteligente, do anúncio à contratação
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
              A PitStop RH é uma plataforma de recrutamento e seleção que automatiza as etapas repetitivas, organiza o funil de candidatos e entrega visibilidade total do processo — para você contratar as pessoas certas, no tempo certo.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Usada por PMEs e grandes corporações em todo o Brasil, a plataforma foi construída com base na metodologia P.I.T: Performance, Inteligência e Tempo.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-md"
              style={{ background: "linear-gradient(135deg,#4060aa 0%,#638cdc 50%,#d04870 85%,#f06868 100%)", boxShadow: "0 8px 30px rgba(234,56,57,0.35)" }}
            >
              Ver como funciona <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. SOLUÇÕES — Bento grid
      ══════════════════════════════════════════ */}
      <section id="solucoes" className="py-20 sm:py-28 relative overflow-hidden" style={{ background: "#0f1f45" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="container max-w-6xl">
          <div className="text-center mb-14">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-300 mb-3">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#ea3839" }} />
              Nossas Soluções
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4 text-white">
              Uma plataforma para cada etapa<br className="hidden sm:block" /> do seu recrutamento
            </h2>
            <p className="text-white/60 text-sm max-w-xl mx-auto">
              Do anúncio da vaga ao onboarding do novo colaborador, a PitStop RH centraliza tudo para equipes de RH e recrutadores.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">

            {/* Large card — Recrutamento e Seleção (spans 2 rows on lg) */}
            <div className="lg:row-span-2 rounded-2xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 duration-200 flex flex-col" style={{ background: "linear-gradient(145deg, #1a3a8a, #243c7e)" }}>
              <div className="h-1 w-full" style={{ background: "linear-gradient(90deg,#ea3839,#ff6b6b)" }} />
              <div className="p-7 flex flex-col flex-1">
                <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center text-white mb-5">
                  <Search size={22} />
                </div>
                <h3 className="text-xl font-extrabold mb-3 text-white">Gestão de Vagas e Funil</h3>
                <p className="text-white/65 text-sm leading-relaxed mb-6">
                  Publique vagas, visualize o funil completo de candidatos e mova perfis entre etapas com um clique. Controle total do processo seletivo em um único painel.
                </p>
                {/* mini pipeline visual */}
                <div className="mt-auto space-y-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {["Triagem", "Entrevista", "Assessment", "Oferta"].map((step, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <div className="rounded-md bg-white/10 border border-white/20 px-2.5 py-1 text-[10px] font-semibold text-white whitespace-nowrap">
                          {step}
                        </div>
                        {i < 3 && <ArrowRight size={10} className="text-white/40 shrink-0" />}
                      </div>
                    ))}
                  </div>
                  <Link to="/login" className="inline-flex items-center gap-1 text-blue-300 font-semibold text-sm hover:underline">
                    Saiba mais <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card — Mão de Obra Temporária */}
            <div className="rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-0.5 duration-200 flex flex-col" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="h-1.5 w-full bg-cyan-500" />
              <div className="p-7 flex flex-col flex-1">
                <div className="h-11 w-11 rounded-xl bg-cyan-400/15 flex items-center justify-center text-cyan-300 mb-5">
                  <CalendarRange size={22} />
                </div>
                <h3 className="text-lg font-extrabold mb-2 text-white">Triagem Inteligente</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">
                  Filtre candidatos automaticamente por habilidades, experiência e fit cultural antes mesmo da primeira entrevista.
                </p>
                <Link to="/login" className="inline-flex items-center gap-1 text-blue-300 font-semibold text-sm hover:underline mt-auto">
                  Saiba mais <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Card — Terceirização */}
            <div className="rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-0.5 duration-200 flex flex-col" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="h-1.5 w-full bg-amber-500" />
              <div className="p-7 flex flex-col flex-1">
                <div className="h-11 w-11 rounded-xl bg-amber-400/15 flex items-center justify-center text-amber-300 mb-5">
                  <Building2 size={22} />
                </div>
                <h3 className="text-lg font-extrabold mb-2 text-white">Comunicação Automática</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">
                  Envie atualizações, convites para entrevistas e feedbacks para candidatos de forma automatizada e personalizada.
                </p>
                <Link to="/login" className="inline-flex items-center gap-1 text-blue-300 font-semibold text-sm hover:underline mt-auto">
                  Saiba mais <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Card — Banco de Talentos */}
            <div className="rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-0.5 duration-200 flex flex-col" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="h-1.5 w-full bg-violet-500" />
              <div className="p-7 flex flex-col flex-1">
                <div className="h-11 w-11 rounded-xl bg-violet-400/15 flex items-center justify-center text-violet-300 mb-5">
                  <Target size={22} />
                </div>
                <h3 className="text-lg font-extrabold mb-2 text-white">Banco de Talentos</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">
                  Crie e gerencie sua base de talentos. Encontre o candidato certo para uma nova vaga antes mesmo de publicá-la.
                </p>
                <Link to="/login" className="inline-flex items-center gap-1 text-blue-300 font-semibold text-sm hover:underline mt-auto">
                  Saiba mais <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Card — Relatórios e Analytics */}
            <div className="rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-0.5 duration-200 flex flex-col" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="h-1.5 w-full bg-rose-500" />
              <div className="p-7 flex flex-col flex-1">
                <div className="h-11 w-11 rounded-xl bg-rose-400/15 flex items-center justify-center text-rose-300 mb-5">
                  <Award size={22} />
                </div>
                <h3 className="text-lg font-extrabold mb-2 text-white">Relatórios e Analytics</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">
                  Acompanhe métricas de tempo de contratação, taxa de conversão e desempenho por vaga com dashboards em tempo real.
                </p>
                <Link to="/login" className="inline-flex items-center gap-1 text-blue-300 font-semibold text-sm hover:underline mt-auto">
                  Saiba mais <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. P.I.T
      ══════════════════════════════════════════ */}
      <section id="pit" className="py-20 sm:py-28 relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #f8faff 0%, #eef3ff 100%)",
          borderRadius: "2rem 2rem 0 0",
          marginTop: "-2rem",
          position: "relative",
          zIndex: 2,
        }}>

        {/* Soft glow top-right */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
          style={{ background: "radial-gradient(circle, #dce8ff, transparent)", transform: "translate(30%, -30%)" }} />

        <div className="container max-w-6xl relative z-10">

          {/* Header */}
          <div className="text-center mb-16">
            <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#ea3839" }}>
              <span className="h-px w-10 rounded-full" style={{ background: "#ea3839" }} />
              Metodologia
              <span className="h-px w-10 rounded-full" style={{ background: "#ea3839" }} />
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
              A metodologia{" "}
              <span style={{ background: "linear-gradient(135deg, #ea3839 0%, #3b6fd4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                P.I.T
              </span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Três pilares que orientam cada funcionalidade da plataforma e cada decisão de recrutamento.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid sm:grid-cols-3 gap-5 mb-5">
            {[
              {
                letter: "P", title: "Performance",
                desc: "Cada vaga tem métricas claras: tempo médio de fechamento, taxa de conversão por etapa e qualidade dos candidatos indicados.",
                icon: TrendingUp,
                accent: "#3b6fd4",
                gradient: "linear-gradient(135deg, #3b6fd4, #243c7e)",
                bg: "rgba(59,111,212,0.06)",
                borderColor: "rgba(59,111,212,0.18)",
              },
              {
                letter: "I", title: "Inteligência",
                desc: "Triagem por IA, matching automático de perfis e avaliações comportamentais para decisões de contratação mais precisas.",
                icon: Lightbulb,
                accent: "#8b5cf6",
                gradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                bg: "rgba(139,92,246,0.06)",
                borderColor: "rgba(139,92,246,0.18)",
              },
              {
                letter: "T", title: "Tempo",
                desc: "Automações que eliminam tarefas manuais repetitivas, encurtando o ciclo de contratação sem sacrificar a qualidade.",
                icon: Clock,
                accent: "#0284c7",
                gradient: "linear-gradient(135deg, #06b6d4, #0284c7)",
                bg: "rgba(2,132,199,0.06)",
                borderColor: "rgba(2,132,199,0.18)",
              },
            ].map((p, i) => (
              <div key={i}
                className="relative rounded-2xl overflow-hidden p-8 group hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 bg-white"
                style={{
                  border: `1px solid ${p.borderColor}`,
                  borderTop: `3px solid ${p.accent}`,
                }}>

                {/* Faded background letter */}
                <div className="absolute bottom-0 right-1 text-[8rem] font-black leading-none select-none pointer-events-none"
                  style={{ color: p.accent, opacity: 0.05 }}>
                  {p.letter}
                </div>

                {/* Icon badge */}
                <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-6 shadow-md"
                  style={{ background: p.gradient }}>
                  <p.icon size={22} className="text-white" />
                </div>

                {/* Large letter accent */}
                <div className="text-5xl font-black leading-none mb-3" style={{ color: p.accent }}>
                  {p.letter}
                </div>

                <h3 className="font-extrabold text-slate-800 text-lg mb-2">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* S.T.O.P steps */}
          <div className="rounded-2xl p-8 sm:p-10 bg-white shadow-sm"
            style={{ border: "1px solid rgba(36,60,126,0.1)" }}>

            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] mb-10 text-muted-foreground">
              Processo S.T.O.P — A Parada Estratégica
            </p>

            <div className="grid sm:grid-cols-4 gap-6 relative">
              {/* Gradient connector line */}
              <div className="hidden sm:block absolute top-5 left-[12.5%] right-[12.5%] h-px z-0"
                style={{ background: "linear-gradient(90deg, #ea3839 0%, #f97316 33%, #3b6fd4 66%, #243c7e 100%)", opacity: 0.4 }} />

              {[
                { letter: "S", icon: Search,        title: "Sinergia",   desc: "Diagnóstico da vaga e cultura da empresa.", color: "#ea3839" },
                { letter: "T", icon: CalendarRange,  title: "Triagem",    desc: "Mapeamento e busca ativa de candidatos qualificados.",  color: "#f97316" },
                { letter: "O", icon: ClipboardCheck, title: "Observação", desc: "Entrevistas e avaliações personalizadas.",   color: "#3b6fd4" },
                { letter: "P", icon: Handshake,      title: "Parceria",   desc: "Acompanhamento pós-contratação.",            color: "#243c7e" },
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center font-extrabold text-sm mb-3 shadow-md"
                    style={{ background: step.color, color: "#fff" }}>
                    {step.letter}
                  </div>
                  <step.icon size={14} className="mb-2 text-muted-foreground" />
                  <p className="font-bold text-slate-800 text-sm mb-1">{step.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. KPIs — Dark bg
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #07101e 0%, #0c1d3f 50%, #0f2654 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, #243c7e 30%, #ea3839 70%, transparent)" }} />
        <div className="container max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { num: "+1000", label: "processos seletivos por ano", color: "#60a5fa" },
            { num: "+600",  label: "vagas fechadas com sucesso",  color: "#fbbf24" },
            { num: "40%",   label: "menos rotação de talento",    color: "#4ade80" },
            { num: "98%",   label: "taxa de satisfação",          color: "#f472b6" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-3 group">
              <p className="text-5xl font-extrabold transition-transform group-hover:scale-105 duration-200" style={{ color: s.color }}>{s.num}</p>
              <div className="h-px w-8 rounded-full" style={{ backgroundColor: s.color, opacity: 0.5 }} />
              <p className="text-white/55 text-sm text-center leading-snug">
                {s.label.includes("sucesso")
                  ? <>{s.label.split("sucesso")[0]}<span style={{ color: "#FFD700" }}>sucesso</span>{s.label.split("sucesso")[1]}</>
                  : s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #243c7e, transparent)", transform: "translate(30%, -30%)" }} />
        <div className="container max-w-5xl">

          {/* Section header */}
          <div className="text-center mb-12">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-3">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#ea3839" }} />
              Depoimentos
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
              Empresas que recrutam melhor com a PitStop RH
            </h2>
            <p className="text-muted-foreground text-sm">Resultados reais de quem usa a plataforma no dia a dia.</p>
          </div>

          {/* Carousel controls row */}
          <div className="flex items-center justify-between mb-5">
            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveTestimonial(i); startAutoplay(); }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === activeTestimonial ? "24px" : "10px",
                    height: "10px",
                    backgroundColor: i === activeTestimonial ? "#ea3839" : "#cbd5e1",
                  }}
                  aria-label={`Depoimento ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevTestimonial}
                className="h-10 w-10 rounded-full border border-blue-300 bg-background flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                aria-label="Anterior"
              >
                <ArrowLeft size={15} className="text-slate-600" />
              </button>
              <button
                onClick={nextTestimonial}
                className="h-10 w-10 rounded-full border border-blue-300 bg-background flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                aria-label="Próximo"
              >
                <ArrowRight size={15} className="text-slate-600" />
              </button>
            </div>
          </div>

          {/* Carousel card */}
          <div className="rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-[2fr_3fr]">

            {/* Left panel — company info */}
            <div className="flex flex-col p-8 lg:p-10 min-h-[260px] lg:min-h-[360px]" style={{ backgroundColor: "#f5f4f0" }}>
              {/* Company name */}
              <div className="flex-1 flex items-center">
                <span className="text-2xl font-black tracking-wider uppercase" style={{ color: "#243c7e" }}>
                  {testimonials[activeTestimonial].companyDisplay}
                </span>
              </div>

              {/* Metadata */}
              <div className="border-t border-blue-300 pt-5 space-y-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-0.5">Tamanho da Empresa</p>
                  <p className="font-semibold text-slate-800 text-sm">{testimonials[activeTestimonial].size}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-0.5">Indústria</p>
                  <p className="font-semibold text-slate-800 text-sm">{testimonials[activeTestimonial].industry}</p>
                </div>
              </div>
            </div>

            {/* Right panel — quote */}
            <div className="flex flex-col p-8 lg:p-12" style={{ backgroundColor: "#0f1f45" }}>
              {/* Opening quote mark */}
              <div className="text-5xl font-bold leading-none mb-3 select-none" style={{ color: "#ea3839" }}>"</div>

              {/* Quote text */}
              <blockquote className="text-base sm:text-lg leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.88)" }}>
                {testimonials[activeTestimonial].quote}
              </blockquote>

              {/* Author */}
              <div className="mt-8 pt-5 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="font-bold text-white text-sm">{testimonials[activeTestimonial].author}</p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{testimonials[activeTestimonial].role}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. FAQ
      ══════════════════════════════════════════ */}
      <section id="faq" className="py-20 sm:py-28 bg-white">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-3">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#ea3839" }} />
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">Perguntas Frequentes</h2>
            <p className="text-muted-foreground text-sm">Tudo que você precisa saber sobre a plataforma de recrutamento da PitStop RH.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={`rounded-xl border bg-background overflow-hidden transition-shadow ${isOpen ? "shadow-md" : "hover:shadow-sm"}`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-semibold hover:bg-muted/30 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="ml-4 shrink-0 text-muted-foreground">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40" : "max-h-0"}`}
                  >
                    <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          9 + 10. CTA + FOOTER (merged, dark)
      ══════════════════════════════════════════ */}
      <footer id="contato" className="relative overflow-hidden" style={{ background: "linear-gradient(145deg, #07101e 0%, #0c1d3f 50%, #0f2654 100%)" }}>

        {/* ── Decorative elements ── */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30"
          style={{ background: "radial-gradient(circle, rgba(36,60,126,0.5), transparent)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, rgba(234,56,57,0.4), transparent)", transform: "translate(-30%, 30%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
          style={{ background: "linear-gradient(90deg, #ea3839 0%, #243c7e 40%, transparent)" }} />

        {/* ── CTA area ── */}
        <div className="relative z-10 container max-w-6xl pt-20 sm:pt-28 pb-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#ea3839" }} />
                Pronto para começar?
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-white max-w-lg">
                Pronto para transformar seu recrutamento?
              </h2>
              <p className="text-white/65 text-sm sm:text-base max-w-md mt-4">
                Crie sua conta gratuitamente e veja como a PitStop RH pode reduzir seu tempo de contratação em até 40%.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-bold text-white hover:opacity-90 transition-opacity shadow-2xl"
                style={{ background: "linear-gradient(135deg,#4060aa 0%,#638cdc 50%,#d04870 85%,#f06868 100%)", boxShadow: "0 8px 30px rgba(234,56,57,0.35)" }}
              >
                Solicitar demonstração <ArrowRight size={15} />
              </Link>
              <a
                href="https://wa.me/5511933320173"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 text-white/85 px-8 py-3.5 text-sm font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="relative z-10 container max-w-6xl"><div className="h-px bg-white/10" /></div>

        {/* ── Links area ── */}
        <div className="relative z-10 container max-w-6xl py-14">
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-20">

            {/* Conecte-se + social */}
            <div>
              <h3 className="text-lg font-extrabold text-white mb-4">Conecte-se</h3>
              <div className="flex items-center gap-3">
                <a href="#" aria-label="LinkedIn" className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors">
                  <Linkedin size={17} />
                </a>
                <a href="#" aria-label="Instagram" className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors">
                  <Instagram size={17} />
                </a>
                <a href="https://wa.me/5511933320173" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors">
                  <MessageCircle size={17} />
                </a>
              </div>
            </div>

            {/* Soluções */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/80 mb-4">Soluções</h3>
              <ul className="space-y-2.5 text-sm text-white/60">
                {["Gestão de Vagas e Funil", "Triagem Inteligente", "Comunicação Automática", "Banco de Talentos", "Relatórios e Analytics"].map((item) => (
                  <li key={item}>
                    <a href="#solucoes" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/80 mb-4">Empresa</h3>
              <ul className="space-y-2.5 text-sm text-white/60">
                <li><a href="#sobre-nos" className="hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#pit" className="hover:text-white transition-colors">Metodologia P.I.T</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Perguntas Frequentes</a></li>
                <li><Link to="/planos" className="hover:text-white transition-colors">Planos</Link></li>
                <li><Link to="/cadastro" className="hover:text-white transition-colors">Trabalhe Conosco</Link></li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/80 mb-4">Contato</h3>
              <ul className="space-y-2.5 text-sm text-white/60">
                <li className="flex items-start gap-2">
                  <Mail size={14} className="mt-0.5 shrink-0 text-white/45" />
                  <span>atendimento@pitstoprh.com.br</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={14} className="shrink-0 text-white/45" />
                  <span>(11) 93332-0173</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={14} className="shrink-0 text-white/45" />
                  <span>Centro, São Paulo – SP</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* ── Big watermark logo ── */}
        <div className="relative overflow-hidden">
          <div className="container max-w-6xl flex justify-center py-8">
            <img
              src="/logo-branco.png"
              alt=""
              aria-hidden
              className="w-full max-w-4xl h-auto opacity-[0.04] select-none pointer-events-none"
              draggable={false}
            />
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="relative z-10 border-t border-white/10">
          <div className="container max-w-6xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/50">© 2025 PitStop RH Consultoria. Todos os direitos reservados.</p>
            <div className="flex items-center gap-6 text-xs text-white/50">
              <a href="#" className="hover:text-white/60 transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-white/60 transition-colors">Política de Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── WhatsApp floating button ── */}
      <a
        href="https://wa.me/5511933320173"
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-14 w-14 rounded-full shadow-2xl transition-transform hover:scale-110 duration-200"
        style={{ background: "#25D366", boxShadow: "0 4px 24px rgba(37,211,102,0.45)" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" className="h-8 w-8">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.492.655 4.829 1.8 6.854L2 30l7.338-1.773A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.838-1.602l-.418-.248-4.353 1.052 1.082-4.23-.272-.435A11.47 11.47 0 0 1 4.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.617c-.344-.172-2.037-1.004-2.352-1.118-.316-.115-.547-.172-.777.172-.23.344-.892 1.118-1.094 1.349-.2.23-.402.258-.746.086-.344-.172-1.454-.535-2.77-1.71-1.023-.913-1.713-2.04-1.914-2.384-.2-.344-.021-.53.15-.701.155-.155.344-.402.516-.603.172-.2.23-.344.344-.574.115-.23.058-.43-.029-.603-.086-.172-.777-1.872-1.064-2.563-.28-.673-.564-.582-.777-.593l-.66-.011c-.23 0-.603.086-.918.43-.316.344-1.204 1.176-1.204 2.868s1.233 3.327 1.405 3.557c.172.23 2.427 3.706 5.88 5.196.822.354 1.463.566 1.963.724.824.263 1.574.226 2.167.137.661-.099 2.037-.832 2.323-1.636.287-.803.287-1.492.2-1.636-.086-.143-.316-.23-.66-.402z"/>
        </svg>
      </a>

    </div>
  );
};

export default Index;
