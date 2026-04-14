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
    <div className="flex flex-col">

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section
        id="inicio"
        className="relative flex items-center overflow-hidden bg-[#0c1d3f]"
      >
        {/* dot-grid overlay */}
        <div className="dot-grid absolute inset-0 pointer-events-none" />
        {/* glow radial */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_65%_50%,rgba(49,84,156,0.30),transparent)] pointer-events-none" />
        {/* red accent line top */}
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg,#ea3839 0%,#31549c 60%,transparent 100%)" }} />

        <div className="relative z-10 container max-w-6xl mx-auto px-4 py-20 sm:py-28 grid lg:grid-cols-2 gap-14 items-center">

          {/* Left column */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              Plataforma líder em recrutamento inteligente
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.1] text-white mb-5">
              A Parada certa para<br />
              o seu <span style={{ color: "#ea3839" }}>Sucesso.</span>
            </h1>

            <p className="text-white/55 text-sm sm:text-base leading-relaxed max-w-md mb-8">
              Na PitStop RH, cada contratação é uma parada estratégica para o sucesso. Conectamos empresas e talentos com propósito, velocidade e precisão.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-7 py-3 text-sm font-bold hover:opacity-90 transition-opacity shadow-lg"
              >
                Solicitar demonstração <ArrowRight size={15} />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 text-white/80 px-7 py-3 text-sm font-semibold hover:bg-white/5 transition-colors"
              >
                Sou Candidato
              </Link>
            </div>

            {/* trust strip */}
            <div className="flex items-center gap-6">
              {[
                { num: "+1000", label: "processos/ano" },
                { num: "+600",  label: "vagas fechadas" },
                { num: "98%",   label: "satisfação" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-lg font-extrabold text-white leading-none">{s.num}</p>
                  <p className="text-[10px] text-white/40 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — recruitment dashboard mockup */}
          <div className="relative flex justify-center lg:justify-end">
            {/* glow blob */}
            <div className="absolute -inset-6 rounded-3xl bg-[#31549c]/20 blur-3xl pointer-events-none" />

            {/* floating notification — top left */}
            <div className="absolute -top-4 -left-2 z-30 flex items-center gap-2.5 rounded-xl border border-white/15 bg-[#0c1d3f]/90 backdrop-blur px-3 py-2 shadow-2xl">
              <div className="h-7 w-7 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                <Users size={13} className="text-green-400" />
              </div>
              <div>
                <p className="text-[9px] text-white/40 leading-none mb-0.5">Nova candidatura</p>
                <p className="text-xs font-bold text-white leading-none">Maria S. se candidatou</p>
              </div>
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse shrink-0" />
            </div>

            {/* floating badge — bottom right */}
            <div className="absolute -bottom-3 -right-2 z-30 flex items-center gap-2 rounded-full border border-white/15 bg-[#ea3839] px-3.5 py-1.5 shadow-xl">
              <Briefcase size={12} className="text-white" />
              <span className="text-xs font-bold text-white">247 vagas ativas</span>
            </div>

            <div className="relative w-full max-w-[350px] space-y-3">

              {/* Job card */}
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-2xl">
                {/* header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-lg bg-[#31549c] flex items-center justify-center font-extrabold text-white text-xs shrink-0">
                      TS
                    </div>
                    <div>
                      <p className="text-[10px] text-white/45 leading-none mb-1">Tech Solutions Brasil</p>
                      <p className="text-sm font-bold text-white leading-tight">Engenheiro de Software Sr.</p>
                      <p className="text-[10px] text-white/35 mt-0.5">São Paulo · CLT · R$ 12k–18k</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 shrink-0">Aberta</span>
                </div>

                {/* pipeline bar */}
                <p className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-2">Pipeline de seleção</p>
                <div className="grid grid-cols-4 gap-1.5 mb-4">
                  {[
                    { label: "Triagem",     count: 24, w: "100%", color: "bg-[#31549c]" },
                    { label: "Entrevista",  count: 8,  w: "33%",  color: "bg-indigo-400" },
                    { label: "Assessment", count: 3,  w: "12%",  color: "bg-violet-400" },
                    { label: "Oferta",     count: 1,  w: "4%",   color: "bg-[#ea3839]" },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-1">
                        <div className={`h-full rounded-full ${s.color} transition-all`} style={{ width: s.w }} />
                      </div>
                      <p className="text-[9px] text-white/35 text-center">{s.label}</p>
                      <p className="text-[10px] font-bold text-white/60 text-center">{s.count}</p>
                    </div>
                  ))}
                </div>

                {/* avatars + count */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[
                      "from-blue-400 to-blue-600",
                      "from-indigo-400 to-indigo-600",
                      "from-violet-400 to-violet-600",
                      "from-pink-400 to-pink-600",
                    ].map((grad, i) => (
                      <div
                        key={i}
                        className={`h-7 w-7 rounded-full border-2 border-[#0c2050] bg-gradient-to-br ${grad} flex items-center justify-center text-white text-[10px] font-bold`}
                      >
                        {["M","J","A","R"][i]}
                      </div>
                    ))}
                    <div className="h-7 w-7 rounded-full border-2 border-[#0c2050] bg-white/10 flex items-center justify-center text-white/50 text-[9px] font-bold">
                      +20
                    </div>
                  </div>
                  <p className="text-xs text-white/45">24 candidatos</p>
                </div>
              </div>

              {/* Two metric cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                  <p className="text-[10px] text-white/35 mb-1">Tempo médio</p>
                  <p className="text-2xl font-extrabold text-white leading-none">12 <span className="text-sm font-normal text-white/45">dias</span></p>
                  <p className="text-[10px] text-green-400 mt-1.5 flex items-center gap-1">
                    <TrendingUp size={10} /> 3 dias a menos
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                  <p className="text-[10px] text-white/35 mb-1">Match médio</p>
                  <p className="text-2xl font-extrabold text-white leading-none">94<span className="text-sm font-normal text-white/45">%</span></p>
                  <p className="text-[10px] text-white/35 mt-1.5">compatibilidade</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. MARQUEE BAR — kept exactly as-is
      ══════════════════════════════════════════ */}
      <section className="border-y bg-card py-5 overflow-hidden">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Empresas que confiam na <span style={{ color: "#31549c" }}>PitStop</span>{" "}
          <span style={{ color: "#ea3839" }}>RH</span>
        </p>
        <div className="relative overflow-hidden">
          {/* Gradientes nas bordas */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-card to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-card to-transparent z-10" />

          <div className="animate-marquee flex items-center gap-16 w-max">
            {/* duplicado para loop perfeito */}
            {[...clientLogos, ...clientLogos].map((logo, i) => (
              <span key={i} className={`whitespace-nowrap ${logo.style}`}>
                {logo.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. SOBRE NÓS
      ══════════════════════════════════════════ */}
      <section id="sobre-nos" className="py-20 sm:py-28 bg-background">
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
                className="rounded-xl border bg-card p-6 flex flex-col gap-1 hover:shadow-md transition-shadow"
              >
                <p className="text-3xl font-extrabold text-primary leading-none">{s.num}</p>
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
              className="inline-flex items-center gap-2 rounded-lg border text-foreground px-6 py-3 text-sm font-semibold hover:bg-muted/50 transition-colors"
            >
              Conheça nossa equipe <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. SOLUÇÕES — Bento grid
      ══════════════════════════════════════════ */}
      <section id="solucoes" className="py-20 sm:py-28 bg-card">
        <div className="container max-w-6xl">
          <div className="text-center mb-14">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-3">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#ea3839" }} />
              Nossas Soluções
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
              Tudo que sua empresa precisa<br className="hidden sm:block" /> em um só lugar
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Do recrutamento estratégico à terceirização operacional, entregamos resultados com metodologia e cuidado.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">

            {/* Large card — Recrutamento e Seleção (spans 2 rows on lg) */}
            <div className="lg:row-span-2 rounded-2xl border bg-background overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              <div className="h-1.5 w-full bg-primary" />
              <div className="p-7 flex flex-col flex-1">
                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <Search size={22} />
                </div>
                <h3 className="text-xl font-extrabold mb-3">Recrutamento e Seleção</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Processos ágeis, assertivos e humanizados. Conectamos sua empresa aos melhores candidatos com nossa metodologia exclusiva P.I.T.
                </p>
                {/* mini pipeline visual */}
                <div className="flex items-center gap-1.5 mt-auto mb-6">
                  {["Triagem", "Entrevista", "Assessment", "Oferta"].map((step, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="rounded-md bg-primary/10 border border-primary/20 px-2.5 py-1 text-[10px] font-semibold text-primary whitespace-nowrap">
                        {step}
                      </div>
                      {i < 3 && <ArrowRight size={10} className="text-muted-foreground shrink-0" />}
                    </div>
                  ))}
                </div>
                <Link to="/login" className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline">
                  Saiba mais <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Card — Mão de Obra Temporária */}
            <div className="rounded-2xl border bg-background overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              <div className="h-1.5 w-full bg-cyan-500" />
              <div className="p-7 flex flex-col flex-1">
                <div className="h-11 w-11 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-5">
                  <CalendarRange size={22} />
                </div>
                <h3 className="text-lg font-extrabold mb-2">Mão de Obra Temporária</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                  Flexibilidade para demandas sazonais, substituições emergenciais e projetos pontuais.
                </p>
                <Link to="/login" className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline mt-auto">
                  Saiba mais <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Card — Terceirização */}
            <div className="rounded-2xl border bg-background overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              <div className="h-1.5 w-full bg-amber-500" />
              <div className="p-7 flex flex-col flex-1">
                <div className="h-11 w-11 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-5">
                  <Building2 size={22} />
                </div>
                <h3 className="text-lg font-extrabold mb-2">Terceirização</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                  Recepção, logística, limpeza e apoio corporativo. Foque no core e deixe a operação conosco.
                </p>
                <Link to="/login" className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline mt-auto">
                  Saiba mais <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Card — Hunting Ativo */}
            <div className="rounded-2xl border bg-background overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              <div className="h-1.5 w-full bg-violet-500" />
              <div className="p-7 flex flex-col flex-1">
                <div className="h-11 w-11 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-5">
                  <Target size={22} />
                </div>
                <h3 className="text-lg font-extrabold mb-2">Hunting Ativo</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                  Busca ativa dos melhores talentos, inclusive os que não estão no mercado aberto.
                </p>
                <Link to="/login" className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline mt-auto">
                  Saiba mais <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Card — Employer Branding */}
            <div className="rounded-2xl border bg-background overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              <div className="h-1.5 w-full bg-rose-500" />
              <div className="p-7 flex flex-col flex-1">
                <div className="h-11 w-11 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-400 mb-5">
                  <Award size={22} />
                </div>
                <h3 className="text-lg font-extrabold mb-2">Employer Branding</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                  Posicione-se como empresa dos sonhos. Atraia e retenha talentos com uma marca empregadora forte.
                </p>
                <Link to="/login" className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline mt-auto">
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
      <section id="pit" className="py-20 sm:py-28 bg-background">
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
              <div key={i} className={`rounded-2xl border ${p.border} bg-card p-8 text-center hover:shadow-md transition-shadow`}>
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
      <section className="py-20 sm:py-24 bg-[#0c1d3f]">
        <div className="container max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { num: "+1000", label: "processos seletivos por ano" },
            { num: "+600",  label: "vagas fechadas com sucesso" },
            { num: "40%",   label: "menos rotação de talento" },
            { num: "98%",   label: "taxa de satisfação" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 rounded-full glow-blue pointer-events-none" />
                <p className="relative text-5xl font-extrabold text-white">{s.num}</p>
              </div>
              <p className="text-white/60 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
              Clientes que confiam na PitStop RH
            </h2>
            <p className="text-muted-foreground text-sm">O que dizem quem já passou pela nossa parada estratégica.</p>
          </div>

          {/* Featured testimonial */}
          <div className="rounded-2xl border bg-card p-8 sm:p-12 mb-6 relative overflow-hidden">
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
              <div className="h-11 w-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-base">
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
              <div key={i} className="rounded-2xl border bg-card p-7">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={13} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
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
          9. CTA FINAL
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="container max-w-4xl">
          <div className="relative rounded-3xl border bg-card p-10 sm:p-16 text-center overflow-hidden">
            {/* decorative blue ring */}
            <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full border-[40px] border-primary/10 pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full border-[30px] border-primary/8 pointer-events-none" />

            <div className="relative z-10">
              <p className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-4">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#ea3839" }} />
                Pronto para começar?
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
                Contrate melhor e mais<br className="hidden sm:block" /> rápido com a PitStop RH
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto mb-10">
                Fale com nossos consultores e descubra como podemos tornar seu recrutamento mais inteligente, ágil e eficiente.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-8 py-3.5 text-sm font-bold hover:opacity-90 transition-opacity shadow-lg"
                >
                  Solicitar demonstração <ArrowRight size={15} />
                </Link>
                <a
                  href="https://wa.me/5511933320173"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border text-foreground px-8 py-3.5 text-sm font-semibold hover:bg-muted/50 transition-colors"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          10. FOOTER
      ══════════════════════════════════════════ */}
      <footer id="contato" className="bg-[#0c1d3f] text-white py-14" style={{ borderTop: "3px solid #ea3839" }}>
        <div className="container max-w-6xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-12">

            {/* Brand */}
            <div>
              <Logo size="md" />
              <p className="text-xs text-white/45 leading-relaxed mt-4 max-w-[220px]">
                Sua parada certa para gestão de talentos. Conectamos empresas e profissionais com agilidade, inteligência e propósito.
              </p>
              <div className="flex items-center gap-4 mt-5">
                <a href="#" aria-label="LinkedIn" className="text-white/40 hover:text-white transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href="#" aria-label="Instagram" className="text-white/40 hover:text-white transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="https://wa.me/5511933320173" aria-label="WhatsApp" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Serviços</p>
              <ul className="space-y-2.5 text-sm text-white/55">
                {["Recrutamento e Seleção", "Mão de Obra Temporária", "Terceirização de Serviços", "Hunting Ativo", "Employer Branding"].map((item) => (
                  <li key={item}>
                    <a href="#solucoes" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Institutional */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Institucional</p>
              <ul className="space-y-2.5 text-sm text-white/55">
                <li><a href="#sobre-nos" className="hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Perguntas Frequentes</a></li>
                <li><Link to="/planos" className="hover:text-white transition-colors">Planos</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
                <li><Link to="/cadastro" className="hover:text-white transition-colors">Trabalhe Conosco</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Contato</p>
              <ul className="space-y-3 text-sm text-white/55">
                <li className="flex items-start gap-2.5">
                  <Mail size={14} className="mt-0.5 shrink-0 text-white/30" />
                  <span>atendimento@pitstoprh.com.br</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone size={14} className="shrink-0 text-white/30" />
                  <span>(11) 93332-0173</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin size={14} className="shrink-0 text-white/30" />
                  <span>Centro, São Paulo – SP</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/30">© 2025 PitStop RH Consultoria. Todos os direitos reservados.</p>
            <p className="text-xs text-white/20">CNPJ: 00.000.000/0001-00</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
