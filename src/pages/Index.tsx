import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import {
  Search, CalendarRange, ClipboardCheck, Handshake,
  TrendingUp, Lightbulb, Clock, ChevronDown, ChevronUp,
  Mail, Phone, MapPin, Linkedin, Instagram, MessageCircle,
  ArrowRight, Users, BarChart3, Shield, Building2, Star,
  Briefcase, Target, Zap, Award, ExternalLink, Plus, Minus,
} from "lucide-react";

/* ───── FAQ Data ───── */
const faqs = [
  { q: "Quais tipos de empresa a PitStop RH atende?", a: "Atendemos desde startups e PMEs até grandes corporações de todos os segmentos, com soluções personalizadas para cada porte e necessidade." },
  { q: "Sou candidato. Como me candidato às vagas?", a: "Basta criar seu cadastro na plataforma, preencher 100% do perfil e você estará elegível para todas as vagas compatíveis com seu perfil." },
  { q: "Qual o diferencial da PitStop RH em Recrutamento e Seleção?", a: "Nossa metodologia P.I.T (Performance, Inteligência e Tempo) garante processos ágeis, humanizados e assertivos, do operacional ao estratégico." },
  { q: "A PitStop RH cobra alguma taxa dos candidatos?", a: "Não. Nossos serviços são 100% gratuitos para candidatos. A cobrança é feita apenas para as empresas contratantes." },
  { q: "Como posso solicitar um orçamento?", a: "Você pode preencher o formulário de contato, enviar um e-mail para atendimento@pitstoprh.com.br ou chamar no WhatsApp." },
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

  return (
    <div className="flex flex-col" style={{ background: "#0f1f45" }}>

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section id="inicio" className="relative flex flex-col justify-center gap-8 pb-16 overflow-x-hidden h-screen -mt-[6.75rem] pt-[6.75rem]" style={{ background: "linear-gradient(145deg, #0a1628 0%, #0f2044 40%, #162952 100%)" }}>

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
              Plataforma líder em recrutamento inteligente
            </div>

            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.0] tracking-tight text-white">
                A Parada<br />
                certa para<br />
                o seu{" "}
                <span style={{ color: "#ea3839" }}>Sucesso.</span>
              </h1>
            </div>

            <p className="text-white/55 text-base leading-relaxed max-w-sm">
              Conectamos empresas e talentos com propósito, velocidade e precisão. Do operacional ao estratégico.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-bold text-white hover:opacity-90 transition-opacity shadow-2xl"
                style={{ background: "linear-gradient(135deg,#ea3839 0%,#c0124a 15%,#3b6fd4 50%,#243c7e 100%)", boxShadow: "0 8px 30px rgba(234,56,57,0.35)" }}
              >
                Solicitar demonstração <ArrowRight size={15} />
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
          <div className="relative h-[420px]">

            {/* Glow behind cards */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 70% 60% at 60% 50%, rgba(49,84,156,0.25), transparent)" }} />

            {/* ── Card 1 (main) — center ── */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 rounded-2xl bg-white p-5 z-20 border border-slate-200" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>
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

            {/* ── Card 2 — top left ── */}
            <div className="absolute top-4 left-0 w-44 rounded-2xl bg-white p-4 z-10 border border-slate-200" style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.18)" }}>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-2">Tempo de fechamento</p>
              <p className="text-3xl font-extrabold leading-none" style={{ color: "#f59e0b" }}>12<span className="text-base font-normal text-slate-500 ml-1">dias</span></p>
              <p className="text-[10px] text-green-600 mt-2 flex items-center gap-1"><TrendingUp size={10} />–3 dias vs. mês ant.</p>
            </div>

            {/* ── Card 3 — top right ── */}
            <div className="absolute top-8 right-0 w-36 rounded-2xl bg-white p-4 z-10 border border-slate-200" style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.18)" }}>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-2">Match médio</p>
              <p className="text-3xl font-extrabold leading-none text-slate-900">94<span className="text-base font-normal text-slate-500">%</span></p>
              <p className="text-[10px] text-slate-600 mt-2">compatibilidade</p>
            </div>

            {/* ── Card 4 — bottom left — nova candidatura ── */}
            <div className="absolute bottom-10 left-0 z-30 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 border border-slate-200" style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.18)" }}>
              <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <Users size={13} className="text-green-600" />
              </div>
              <div>
                <p className="text-[9px] text-slate-500">Nova candidatura</p>
                <p className="text-xs font-bold text-slate-900">Maria S. se candidatou</p>
              </div>
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse shrink-0" />
            </div>

            {/* ── Card 5 — bottom right — vagas ── */}
            <div className="absolute bottom-8 right-0 z-30 flex items-center gap-2 rounded-full px-4 py-2 shadow-xl"
              style={{ background: "linear-gradient(135deg,#ea3839,#c0392b)", boxShadow: "0 4px 20px rgba(234,56,57,0.4)" }}>
              <Briefcase size={13} className="text-white" />
              <span className="text-xs font-bold text-white">247 vagas ativas</span>
            </div>

          </div>
        </div>

        {/* ── Floating marquee bar ── */}
        <div className="relative z-30 container max-w-5xl mx-auto px-4 -mb-14">
          <div className="rounded-2xl bg-card border overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
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
              Gestão de talentos que move seu negócio
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
              A PitStop RH nasceu da convicção de que contratar bem é uma vantagem competitiva. Desde nossa fundação, combinamos tecnologia, metodologia e um atendimento genuinamente humano para garantir que cada posição seja preenchida com o profissional certo.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Atendemos PMEs e grandes corporações em todo o Brasil, com soluções que vão do operacional ao estratégico — sempre guiados pela nossa metodologia P.I.T.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-md"
              style={{ background: "linear-gradient(135deg,#ea3839 0%,#c0124a 15%,#3b6fd4 50%,#243c7e 100%)", boxShadow: "0 8px 30px rgba(234,56,57,0.35)" }}
            >
              Conheça nossa equipe <ArrowRight size={15} />
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
              Tudo que sua empresa precisa<br className="hidden sm:block" /> em um só lugar
            </h2>
            <p className="text-white/60 text-sm max-w-xl mx-auto">
              Do recrutamento estratégico à terceirização operacional, entregamos resultados com metodologia e cuidado.
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
                <h3 className="text-xl font-extrabold mb-3 text-white">Recrutamento e Seleção</h3>
                <p className="text-white/65 text-sm leading-relaxed mb-6">
                  Processos ágeis, assertivos e humanizados. Conectamos sua empresa aos melhores candidatos com nossa metodologia exclusiva P.I.T.
                </p>
                {/* mini pipeline visual */}
                <div className="flex items-center gap-1.5 mt-auto mb-6">
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

            {/* Card — Mão de Obra Temporária */}
            <div className="rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-0.5 duration-200 flex flex-col" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="h-1.5 w-full bg-cyan-500" />
              <div className="p-7 flex flex-col flex-1">
                <div className="h-11 w-11 rounded-xl bg-cyan-400/15 flex items-center justify-center text-cyan-300 mb-5">
                  <CalendarRange size={22} />
                </div>
                <h3 className="text-lg font-extrabold mb-2 text-white">Mão de Obra Temporária</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">
                  Flexibilidade para demandas sazonais, substituições emergenciais e projetos pontuais.
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
                <h3 className="text-lg font-extrabold mb-2 text-white">Terceirização</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">
                  Recepção, logística, limpeza e apoio corporativo. Foque no core e deixe a operação conosco.
                </p>
                <Link to="/login" className="inline-flex items-center gap-1 text-blue-300 font-semibold text-sm hover:underline mt-auto">
                  Saiba mais <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Card — Hunting Ativo */}
            <div className="rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-0.5 duration-200 flex flex-col" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="h-1.5 w-full bg-violet-500" />
              <div className="p-7 flex flex-col flex-1">
                <div className="h-11 w-11 rounded-xl bg-violet-400/15 flex items-center justify-center text-violet-300 mb-5">
                  <Target size={22} />
                </div>
                <h3 className="text-lg font-extrabold mb-2 text-white">Hunting Ativo</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">
                  Busca ativa dos melhores talentos, inclusive os que não estão no mercado aberto.
                </p>
                <Link to="/login" className="inline-flex items-center gap-1 text-blue-300 font-semibold text-sm hover:underline mt-auto">
                  Saiba mais <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Card — Employer Branding */}
            <div className="rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-0.5 duration-200 flex flex-col" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="h-1.5 w-full bg-rose-500" />
              <div className="p-7 flex flex-col flex-1">
                <div className="h-11 w-11 rounded-xl bg-rose-400/15 flex items-center justify-center text-rose-300 mb-5">
                  <Award size={22} />
                </div>
                <h3 className="text-lg font-extrabold mb-2 text-white">Employer Branding</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">
                  Posicione-se como empresa dos sonhos. Atraia e retenha talentos com uma marca empregadora forte.
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
      <section id="pit" className="py-20 sm:py-28 relative overflow-hidden bg-background">
        <div className="absolute left-0 top-0 bottom-0 w-1 pointer-events-none"
          style={{ background: "linear-gradient(180deg, #ea3839, #243c7e, transparent)" }} />
        <div className="container max-w-6xl">

          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 relative inline-block">
              A metodologia{" "}
              <span className="relative">
                P.I.T
                <span
                  className="absolute bottom-0 left-0 w-full h-1 rounded-full"
                  style={{ bottom: "-6px", backgroundColor: "#ea3839" }}
                />
              </span>
            </h2>
            <p className="text-muted-foreground text-sm mt-5 max-w-xl mx-auto">
              Três pilares que sustentam cada processo da PitStop RH — do diagnóstico à entrega.
            </p>
          </div>

          {/* 3 pillars */}
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {[
              {
                letter: "P",
                title: "Performance",
                desc: "Entregamos resultados mensuráveis com KPIs claros e relatórios em tempo real para cada processo seletivo.",
                icon: TrendingUp,
                color: "text-blue-500",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20",
                ring: "bg-blue-500",
              },
              {
                letter: "I",
                title: "Inteligência",
                desc: "Análise de dados, mapeamento de mercado e avaliação comportamental para decisões mais assertivas.",
                icon: Lightbulb,
                color: "text-indigo-500",
                bg: "bg-indigo-500/10",
                border: "border-indigo-500/20",
                ring: "bg-indigo-500",
              },
              {
                letter: "T",
                title: "Tempo",
                desc: "Agilidade sem abrir mão da qualidade. Processos estruturados que respeitam os prazos do seu negócio.",
                icon: Clock,
                color: "text-cyan-500",
                bg: "bg-cyan-500/10",
                border: "border-cyan-500/20",
                ring: "bg-cyan-500",
              },
            ].map((p, i) => (
              <div key={i} className={`rounded-2xl border ${p.border} bg-card p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200`}>
                <div className={`mx-auto mb-4 h-16 w-16 rounded-full ${p.ring} flex items-center justify-center text-white text-2xl font-extrabold shadow-lg`}>
                  {p.letter}
                </div>
                <p.icon size={22} className={`${p.color} mx-auto mb-3`} />
                <h3 className="font-extrabold text-lg mb-3">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* S.T.O.P process bar */}
          <div className="rounded-2xl border bg-card p-8 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-widest text-primary text-center mb-8">
              Processo S.T.O.P — A Parada Estratégica
            </p>
            <div className="grid sm:grid-cols-4 gap-4 relative">
              {/* connector line (desktop only) */}
              <div className="hidden sm:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-border z-0" />

              {[
                { letter: "S", icon: Search,        title: "Sinergia",    desc: "Diagnóstico da vaga e cultura da empresa." },
                { letter: "T", icon: CalendarRange,  title: "Triagem",     desc: "Hunting ativo e mapeamento de candidatos." },
                { letter: "O", icon: ClipboardCheck, title: "Observação",  desc: "Entrevistas e avaliações personalizadas." },
                { letter: "P", icon: Handshake,      title: "Parceria",    desc: "Acompanhamento pós-contratação." },
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-extrabold text-lg mb-3 shadow-md">
                    {step.letter}
                  </div>
                  <step.icon size={15} className="text-muted-foreground mb-2" />
                  <p className="font-bold text-sm mb-1">{step.title}</p>
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
              <p className="text-white/55 text-sm text-center leading-snug">{s.label}</p>
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
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
              Clientes que confiam na PitStop RH
            </h2>
            <p className="text-muted-foreground text-sm">O que dizem quem já passou pela nossa parada estratégica.</p>
          </div>

          {/* Featured testimonial */}
          <div className="rounded-2xl border bg-card p-8 sm:p-12 mb-6 relative overflow-hidden hover:shadow-xl transition-shadow duration-300" style={{ borderLeft: "4px solid #243c7e" }}>
            <span className="absolute top-4 left-6 text-8xl font-serif text-primary/10 leading-none select-none">"</span>
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <blockquote className="text-base sm:text-xl font-medium leading-relaxed mb-8 max-w-3xl relative z-10">
              "Conseguimos otimizar em 40% nossos processos de seleção com a PitStop RH. A metodologia P.I.T realmente faz diferença na qualidade das contratações — os profissionais chegam mais alinhados com a cultura e entregam resultados mais rápido."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-full flex items-center justify-center text-white font-bold text-base" style={{ background: "linear-gradient(135deg,#243c7e,#4f6ec0)" }}>
                A
              </div>
              <div>
                <p className="font-bold text-sm">Ana Paula Rodrigues</p>
                <p className="text-xs text-muted-foreground">Coordenadora de RH · Tech Solutions Brasil</p>
              </div>
            </div>
          </div>

          {/* 2 smaller testimonials */}
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                initial: "R",
                name: "Ricardo Mendes",
                role: "CEO · StartupXP",
                quote: "A equipe da PitStop entendeu o perfil técnico que precisávamos em poucos dias. Contratamos 3 engenheiros em tempo recorde.",
              },
              {
                initial: "F",
                name: "Fernanda Lima",
                role: "Diretora de Operações · LogBR",
                quote: "A terceirização com a PitStop transformou nossa operação. Reduzimos custos e ganhamos foco no que realmente importa.",
              },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border bg-card p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={13} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: "linear-gradient(135deg,#243c7e,#4f6ec0)" }}>
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. FAQ
      ══════════════════════════════════════════ */}
      <section id="faq" className="py-20 sm:py-28 bg-card">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-3">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#ea3839" }} />
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">Perguntas Frequentes</h2>
            <p className="text-muted-foreground text-sm">Respostas rápidas sobre nossos serviços, metodologia e processos.</p>
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
                Contrate melhor e mais rápido com a PitStop RH
              </h2>
              <p className="text-white/65 text-sm sm:text-base max-w-md mt-4">
                Fale com nossos consultores e descubra como podemos tornar seu recrutamento mais inteligente, ágil e eficiente.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-bold text-white hover:opacity-90 transition-opacity shadow-2xl"
                style={{ background: "linear-gradient(135deg,#ea3839 0%,#c0124a 15%,#3b6fd4 50%,#243c7e 100%)", boxShadow: "0 8px 30px rgba(234,56,57,0.35)" }}
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
                {["Recrutamento e Seleção", "Mão de Obra Temporária", "Terceirização", "Hunting Ativo", "Employer Branding"].map((item) => (
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

    </div>
  );
};

export default Index;
