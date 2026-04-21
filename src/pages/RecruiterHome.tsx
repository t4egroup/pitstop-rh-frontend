import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronRight, Bell, CheckCircle2, AlertCircle,
  Clock, Circle, Briefcase, Users, CalendarCheck, TrendingUp,
  ArrowUpRight, ArrowRight, Megaphone, Sparkles, Zap,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

/* ─── Anúncios do carrossel ─── */
const anuncios = [
  {
    id: 1,
    tag: "Novidade",
    tagColor: "#7c3aed",
    titulo: "Integração com LinkedIn Recruiter disponível",
    descricao: "Publique vagas e gerencie candidatos direto do LinkedIn sem sair da plataforma.",
    cta: "Configurar agora",
    ctaLink: "/parceiros",
    bg: "linear-gradient(135deg, #1e3a7a 0%, #243c7e 60%, #7c3aed 100%)",
    icon: Zap,
  },
  {
    id: 2,
    tag: "Dica",
    tagColor: "#059669",
    titulo: "Use listas segmentadas para agilizar o contato",
    descricao: "Agrupe candidatos por perfil e envie comunicações personalizadas em segundos.",
    cta: "Ver listas",
    ctaLink: "/listas-segmentadas",
    bg: "linear-gradient(135deg, #064e3b 0%, #065f46 60%, #059669 100%)",
    icon: Megaphone,
  },
  {
    id: 3,
    tag: "Atualização",
    tagColor: "#d97706",
    titulo: "Relatórios com novos filtros por período",
    descricao: "Analise o desempenho dos processos seletivos com mais precisão e granularidade.",
    cta: "Ver relatórios",
    ctaLink: "/relatorios",
    bg: "linear-gradient(135deg, #78350f 0%, #92400e 60%, #d97706 100%)",
    icon: Sparkles,
  },
];

/* ─── Tarefas (mesmos dados do GerenciarTarefas) ─── */
interface Tarefa {
  id: number;
  titulo: string;
  prioridade: "Alta" | "Média" | "Baixa";
  status: "Pendente" | "Em andamento" | "Concluída" | "Atrasada";
  prazo: string;
  vaga?: string;
}

const tarefas: Tarefa[] = [
  { id: 1, titulo: "Agendar entrevista técnica — Lucas Ferreira", prioridade: "Alta", status: "Pendente", prazo: "17/04/2026", vaga: "Desenvolvedor Front-end Pleno" },
  { id: 2, titulo: "Enviar feedback — Analista de Marketing", prioridade: "Média", status: "Em andamento", prazo: "18/04/2026", vaga: "Analista de Marketing Digital" },
  { id: 4, titulo: "Coletar documentação — Diego Almeida", prioridade: "Alta", status: "Atrasada", prazo: "14/04/2026", vaga: "Product Manager" },
  { id: 5, titulo: "Alinhar faixa salarial com financeiro", prioridade: "Média", status: "Pendente", prazo: "20/04/2026" },
  { id: 6, titulo: "Publicar vaga no LinkedIn", prioridade: "Baixa", status: "Em andamento", prazo: "16/04/2026", vaga: "Analista de Dados Jr." },
];

/* ─── KPIs ─── */
const kpis = [
  { label: "Vagas Abertas",     value: "8",    icon: Briefcase,    color: "#7c3aed", delta: "+2 este mês"      },
  { label: "Total Candidatos",  value: "310",  icon: Users,        color: "#243c7e", delta: "+89 este mês"     },
  { label: "Entrevistas Hoje",  value: "6",    icon: CalendarCheck, color: "#06b6d4", delta: "3 RH · 3 Técnica" },
  { label: "Taxa de Conversão", value: "2,9%", icon: TrendingUp,   color: "#f59e0b", delta: "+0,4% vs mês ant." },
];

const statusVagas = [
  { name: "Abertas",    value: 8, color: "#7c3aed" },
  { name: "Em Pausa",  value: 3, color: "#f59e0b" },
  { name: "Encerradas",value: 5, color: "#cbd5e1" },
];

const prioridadeBadge: Record<string, string> = {
  Alta:  "bg-red-500/10 text-red-600",
  Média: "bg-amber-500/10 text-amber-600",
  Baixa: "bg-slate-100 text-slate-500",
};

const statusCfg: Record<string, { icon: typeof Clock; color: string }> = {
  Pendente:       { icon: Circle,       color: "text-slate-400" },
  "Em andamento": { icon: Clock,        color: "text-blue-500"  },
  Concluída:      { icon: CheckCircle2, color: "text-green-500" },
  Atrasada:       { icon: AlertCircle,  color: "text-red-500"   },
};

const tooltip = {
  contentStyle: { borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: 12 },
};

/* ─── Component ─── */
const RecruiterHome = () => {
  const [slide, setSlide] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => setSlide(s => (s + 1) % anuncios.length), 5000);
  };

  useEffect(() => {
    startAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, []);

  const prev = () => { setSlide(s => (s - 1 + anuncios.length) % anuncios.length); startAuto(); };
  const next = () => { setSlide(s => (s + 1) % anuncios.length); startAuto(); };
  const goTo = (i: number) => { setSlide(i); startAuto(); };

  const hoje = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const tarefasAtivas = tarefas.filter(t => t.status !== "Concluída");
  const atrasadas = tarefas.filter(t => t.status === "Atrasada").length;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-5">

        {/* ── Greeting ── */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground capitalize">{hoje}</p>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-0.5">Bom dia, recrutador! 👋</h1>
          </div>
          {atrasadas > 0 && (
            <Link to="/gerenciar-tarefas" className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors">
              <AlertCircle size={13} />
              {atrasadas} tarefa{atrasadas > 1 ? "s" : ""} atrasada{atrasadas > 1 ? "s" : ""}
            </Link>
          )}
        </div>

        {/* ── Carousel ── */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg select-none">
          {/* slides empilhados — apenas o ativo é visível e ocupa espaço */}
          {anuncios.map((a, i) => {
            const Icon = a.icon;
            return (
              <div
                key={a.id}
                className={`transition-opacity duration-500 ${i === slide ? "opacity-100 relative z-10" : "opacity-0 absolute inset-0 z-0 pointer-events-none"}`}
                style={{ background: a.bg }}
              >
                <div className="flex items-center gap-4 px-5 sm:px-10 pt-6 pb-10">
                  {/* Icon decorativo */}
                  <div className="hidden sm:flex h-14 w-14 rounded-2xl bg-white/10 items-center justify-center shrink-0">
                    <Icon size={26} className="text-white/80" />
                  </div>

                  {/* Texto */}
                  <div className="flex-1 min-w-0">
                    <span className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest mb-2" style={{ background: a.tagColor + "40", color: "white" }}>
                      {a.tag}
                    </span>
                    <h2 className="text-base sm:text-xl font-extrabold text-white leading-snug mb-1.5">{a.titulo}</h2>
                    <p className="text-white/65 text-xs sm:text-sm leading-relaxed">{a.descricao}</p>
                  </div>

                  {/* CTA — apenas desktop */}
                  <Link
                    to={a.ctaLink}
                    className="hidden md:flex items-center gap-2 rounded-xl bg-white/15 hover:bg-white/25 transition-colors px-5 py-2.5 text-sm font-bold text-white shrink-0 border border-white/20"
                  >
                    {a.cta} <ArrowRight size={14} />
                  </Link>
                </div>

                {/* CTA mobile — dentro do slide para não ser cortado */}
                <div className="px-5 pb-10 md:hidden">
                  <Link
                    to={a.ctaLink}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 hover:bg-white/25 transition-colors px-4 py-2 text-xs font-bold text-white border border-white/20"
                  >
                    {a.cta} <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* Setas */}
          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-black/25 hover:bg-black/40 flex items-center justify-center text-white transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-black/25 hover:bg-black/40 flex items-center justify-center text-white transition-colors">
            <ChevronRight size={16} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {anuncios.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{ width: i === slide ? 20 : 6, height: 6, background: i === slide ? "white" : "rgba(255,255,255,0.4)" }}
              />
            ))}
          </div>
        </div>

        {/* ── Main grid: lembretes + dashboard ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">

          {/* ── Lembretes / Tarefas ── */}
          <div className="rounded-xl bg-white border border-blue-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-slate-900">Lembretes e Tarefas</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{tarefasAtivas.length} tarefas pendentes ou em andamento</p>
              </div>
              <Link to="/gerenciar-tarefas" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                Ver todas <ArrowRight size={11} />
              </Link>
            </div>

            <div className="divide-y divide-slate-50">
              {tarefasAtivas.map(t => {
                const cfg = statusCfg[t.status];
                const Icon = cfg.icon;
                return (
                  <div key={t.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                    <Icon size={16} className={`${cfg.color} mt-0.5 shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 leading-snug">{t.titulo}</p>
                      {t.vaga && (
                        <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{t.vaga}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${prioridadeBadge[t.prioridade]}`}>
                        {t.prioridade}
                      </span>
                      <span className={`text-[10px] flex items-center gap-0.5 ${t.status === "Atrasada" ? "text-red-500 font-semibold" : "text-muted-foreground"}`}>
                        <Clock size={9} /> {t.prazo}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {tarefasAtivas.length === 0 && (
              <div className="flex flex-col items-center py-10 text-muted-foreground">
                <CheckCircle2 size={28} className="text-green-400 mb-2" />
                <p className="text-sm font-medium">Tudo em dia!</p>
                <p className="text-xs">Nenhuma tarefa pendente.</p>
              </div>
            )}
          </div>

          {/* ── Dashboard lateral ── */}
          <div className="space-y-4">

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-3">
              {kpis.map(k => (
                <div key={k.label} className="rounded-xl bg-white border border-blue-200 shadow-sm p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide leading-tight">{k.label}</span>
                    <div className="rounded-lg p-1.5" style={{ background: k.color + "18" }}>
                      <k.icon size={12} style={{ color: k.color }} />
                    </div>
                  </div>
                  <p className="text-2xl font-extrabold text-slate-900 leading-none">{k.value}</p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-0.5">
                    <ArrowUpRight size={10} className="text-green-500" />{k.delta}
                  </p>
                </div>
              ))}
            </div>

            {/* Donut: Status das Vagas */}
            <div className="rounded-xl bg-white border border-blue-200 shadow-sm p-5">
              <p className="font-bold text-sm text-slate-900">Status das Vagas</p>
              <p className="text-[11px] text-slate-400 mb-1">Distribuição atual</p>
              <ResponsiveContainer width="100%" height={130}>
                <PieChart>
                  <Pie data={statusVagas} cx="50%" cy="50%" innerRadius={38} outerRadius={58} paddingAngle={3} dataKey="value">
                    {statusVagas.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip {...tooltip} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-1">
                {statusVagas.map(s => (
                  <div key={s.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full shrink-0" style={{ background: s.color }} />
                      <span className="text-xs text-slate-500">{s.name}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-900">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Atalhos rápidos */}
            <div className="rounded-xl bg-white border border-blue-200 shadow-sm p-4">
              <p className="font-bold text-sm text-slate-900 mb-3">Atalhos rápidos</p>
              <div className="space-y-1.5">
                {[
                  { label: "Nova vaga",           to: "/gestao-vagas"     },
                  { label: "Ver candidatos",       to: "/talentos"         },
                  { label: "Dashboard completo",   to: "/dashboard"        },
                  { label: "Analisar dados",       to: "/analisar-dados"   },
                ].map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors"
                  >
                    {label}
                    <ArrowRight size={11} className="text-slate-300" />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default RecruiterHome;
