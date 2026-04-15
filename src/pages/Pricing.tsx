import { Check, Zap, Building, Crown, Mail, Phone, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Linkedin, Instagram } from "lucide-react";

const plans = [
  {
    name: "Head Hunter",
    subtitle: "Autônomo",
    price: "R$ 97",
    period: "/mês",
    icon: Zap,
    highlight: false,
    features: [
      "Até 5 vagas ativas",
      "50 currículos/mês",
      "Pipeline básico",
      "Suporte por e-mail",
      "1 usuário",
    ],
  },
  {
    name: "PME",
    subtitle: "Pequenas Empresas",
    price: "R$ 297",
    period: "/mês",
    icon: Building,
    highlight: true,
    features: [
      "Até 25 vagas ativas",
      "500 currículos/mês",
      "Pipeline avançado",
      "Filtros inteligentes",
      "Feedback em massa",
      "Até 5 usuários",
      "Suporte prioritário",
    ],
  },
  {
    name: "Premium",
    subtitle: "Grandes Empresas",
    price: "R$ 797",
    period: "/mês",
    icon: Crown,
    highlight: false,
    features: [
      "Vagas ilimitadas",
      "Currículos ilimitados",
      "Pipeline personalizado",
      "Relatórios avançados",
      "API de integração",
      "Usuários ilimitados",
      "Gerente de conta dedicado",
      "SLA de suporte 24h",
    ],
  },
];

const Pricing = () => {
  return (
    <div className="flex flex-col" style={{ background: "#0f1f45" }}>

      {/* ── Hero header ── */}
      <section className="relative pb-20 sm:pb-28 -mt-[8.75rem] pt-[calc(6.75rem+4.75rem)] overflow-hidden" style={{ background: "linear-gradient(145deg, #0a1628 0%, #0f2044 40%, #162952 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
          style={{ background: "linear-gradient(90deg, #ea3839 0%, #243c7e 40%, transparent)" }} />
        <div className="container max-w-5xl text-center relative z-10">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#ea3839" }} />
            Planos e Preços
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white">Escolha o plano ideal</h1>
          <p className="text-white/55 text-sm sm:text-base max-w-md mx-auto">
            Escale seu recrutamento com a PitStop RH. Sem fidelidade — cancele quando quiser.
          </p>
        </div>
      </section>

      {/* ── Plans cards ── */}
      <section className="relative -mt-4 pb-20" style={{ background: "linear-gradient(160deg, #f8faff 0%, #eef3ff 100%)" }}>
        <div className="container max-w-5xl pt-12">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border p-7 flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl duration-200 ${
                    plan.highlight
                      ? "border-[#243c7e] bg-white shadow-lg ring-2 ring-[#243c7e]/20"
                      : "bg-white border-slate-200"
                  }`}
                >
                  {plan.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white"
                      style={{ background: "linear-gradient(135deg,#ea3839 0%,#c0124a 15%,#3b6fd4 50%,#243c7e 100%)" }}>
                      Mais Popular
                    </span>
                  )}

                  <div className="flex items-center gap-3 mb-5">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      plan.highlight ? "text-white" : "bg-slate-100 text-slate-600"
                    }`}
                      style={plan.highlight ? { background: "linear-gradient(135deg,#243c7e,#4f6ec0)" } : {}}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-900">{plan.name}</p>
                      <p className="text-xs text-slate-500">{plan.subtitle}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                    <span className="text-sm text-slate-500">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                        <Check size={16} className="mt-0.5 shrink-0 text-green-500" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/login"
                    className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-opacity hover:opacity-90 ${
                      plan.highlight
                        ? "text-white"
                        : "border-2 border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                    style={plan.highlight ? { background: "linear-gradient(135deg,#ea3839 0%,#c0124a 15%,#3b6fd4 50%,#243c7e 100%)" } : {}}
                  >
                    Começar agora {plan.highlight && <ArrowRight size={15} />}
                  </Link>
                </div>
              );
            })}
          </div>

          <p className="text-center text-sm text-slate-500 mt-10">
            Ficou com dúvidas?{" "}
            <a href="#contato" className="font-bold text-[#243c7e] hover:underline">Fale com nossa equipe</a>
            {" "}— respondemos em até 1 hora útil.
          </p>
        </div>
      </section>

      {/* ── Contact section ── */}
      <section id="contato" className="py-16 sm:py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#243c7e] mb-3">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#ea3839" }} />
              Fale Conosco
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 text-slate-900">Tem alguma dúvida?</h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Nossa equipe está pronta para te ajudar a escolher o plano certo e tirar todas as suas dúvidas.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Mail, title: "E-mail", info: "atendimento@pitstoprh.com.br", action: "Enviar e-mail", href: "mailto:atendimento@pitstoprh.com.br" },
              { icon: Phone, title: "Telefone", info: "(11) 93332-0173", action: "Ligar agora", href: "tel:+5511933320173" },
              { icon: MessageCircle, title: "WhatsApp", info: "Resposta em até 1h útil", action: "Abrir WhatsApp", href: "https://wa.me/5511933320173" },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-slate-200 bg-white p-7 flex flex-col items-center text-center gap-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center text-white" style={{ background: "linear-gradient(135deg,#243c7e,#4f6ec0)" }}>
                  <c.icon size={22} />
                </div>
                <p className="font-extrabold text-sm text-slate-900">{c.title}</p>
                <p className="text-xs text-slate-500">{c.info}</p>
                <a href={c.href} target={c.title === "WhatsApp" ? "_blank" : undefined} rel={c.title === "WhatsApp" ? "noreferrer" : undefined}
                  className="mt-auto text-xs font-bold text-[#243c7e] hover:underline">
                  {c.action}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer (same as Index) ── */}
      <footer className="relative overflow-hidden" style={{ background: "linear-gradient(145deg, #07101e 0%, #0c1d3f 50%, #0f2654 100%)" }}>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30"
          style={{ background: "radial-gradient(circle, rgba(36,60,126,0.5), transparent)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, rgba(234,56,57,0.4), transparent)", transform: "translate(-30%, 30%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
          style={{ background: "linear-gradient(90deg, #ea3839 0%, #243c7e 40%, transparent)" }} />

        <div className="relative z-10 container max-w-6xl py-14">
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-20">
            <div>
              <h3 className="text-lg font-extrabold text-white mb-4">Conecte-se</h3>
              <div className="flex items-center gap-3">
                <a href="#" aria-label="LinkedIn" className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"><Linkedin size={17} /></a>
                <a href="#" aria-label="Instagram" className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"><Instagram size={17} /></a>
                <a href="https://wa.me/5511933320173" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"><MessageCircle size={17} /></a>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/80 mb-4">Soluções</h3>
              <ul className="space-y-2.5 text-sm text-white/60">
                {["Recrutamento e Seleção", "Mão de Obra Temporária", "Terceirização", "Hunting Ativo", "Employer Branding"].map((item) => (
                  <li key={item}><a href="/#solucoes" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/80 mb-4">Empresa</h3>
              <ul className="space-y-2.5 text-sm text-white/60">
                <li><a href="/#sobre-nos" className="hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="/#pit" className="hover:text-white transition-colors">Metodologia P.I.T</a></li>
                <li><a href="/#faq" className="hover:text-white transition-colors">Perguntas Frequentes</a></li>
                <li><Link to="/planos" className="hover:text-white transition-colors">Planos</Link></li>
                <li><Link to="/cadastro" className="hover:text-white transition-colors">Trabalhe Conosco</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/80 mb-4">Contato</h3>
              <ul className="space-y-2.5 text-sm text-white/60">
                <li className="flex items-start gap-2"><Mail size={14} className="mt-0.5 shrink-0 text-white/45" /><span>atendimento@pitstoprh.com.br</span></li>
                <li className="flex items-center gap-2"><Phone size={14} className="shrink-0 text-white/45" /><span>(11) 93332-0173</span></li>
                <li className="flex items-center gap-2"><MapPin size={14} className="shrink-0 text-white/45" /><span>Centro, São Paulo – SP</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="container max-w-6xl flex justify-center py-8">
            <img src="/logo-branco.png" alt="" aria-hidden className="w-full max-w-4xl h-auto opacity-[0.04] select-none pointer-events-none" draggable={false} />
          </div>
        </div>

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

export default Pricing;
