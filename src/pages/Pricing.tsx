import { Check, Zap, Building, Crown, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Linkedin, Instagram } from "lucide-react";
import Logo from "@/components/Logo";

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
    <div className="flex flex-col">

      {/* Plans */}
      <div className="container max-w-5xl py-16">
        <div className="text-center mb-10">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-3">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#ea3839" }} />
            Planos e Preços
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Escolha o plano ideal</h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">Escale seu recrutamento com a PitStop RH. Sem fidelidade — cancele quando quiser.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative rounded-xl border p-6 flex flex-col ${
                  plan.highlight
                    ? "border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20"
                    : "bg-card"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                    Mais Popular
                  </span>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${plan.highlight ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-bold">{plan.name}</p>
                    <p className="text-xs text-muted-foreground">{plan.subtitle}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-extrabold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="mt-0.5 shrink-0 text-success" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full rounded-lg py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 ${
                    plan.highlight
                      ? "bg-primary text-primary-foreground"
                      : "border text-foreground hover:bg-muted"
                  }`}
                >
                  Começar agora
                </button>
              </div>
            );
          })}
        </div>

        {/* FAQ hint */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Ficou com dúvidas?{" "}
          <a href="#contato" className="text-primary font-semibold hover:underline">Fale com nossa equipe</a>
          {" "}— respondemos em até 1 hora útil.
        </p>
      </div>

      {/* Contact section */}
      <section id="contato" className="py-16 sm:py-20 bg-card border-t">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-3">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#ea3839" }} />
              Fale Conosco
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Tem alguma dúvida?</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Nossa equipe está pronta para te ajudar a escolher o plano certo e tirar todas as suas dúvidas.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {/* Email */}
            <div className="rounded-xl border bg-background p-6 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Mail size={22} />
              </div>
              <p className="font-bold text-sm">E-mail</p>
              <p className="text-xs text-muted-foreground">atendimento@pitstoprh.com.br</p>
              <a
                href="mailto:atendimento@pitstoprh.com.br"
                className="mt-auto text-xs font-semibold text-primary hover:underline"
              >
                Enviar e-mail
              </a>
            </div>

            {/* Phone */}
            <div className="rounded-xl border bg-background p-6 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Phone size={22} />
              </div>
              <p className="font-bold text-sm">Telefone</p>
              <p className="text-xs text-muted-foreground">(11) 93332-0173</p>
              <a
                href="tel:+5511933320173"
                className="mt-auto text-xs font-semibold text-primary hover:underline"
              >
                Ligar agora
              </a>
            </div>

            {/* WhatsApp */}
            <div className="rounded-xl border bg-background p-6 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MessageCircle size={22} />
              </div>
              <p className="font-bold text-sm">WhatsApp</p>
              <p className="text-xs text-muted-foreground">Resposta em até 1h útil</p>
              <a
                href="https://wa.me/5511933320173"
                target="_blank"
                rel="noreferrer"
                className="mt-auto text-xs font-semibold text-primary hover:underline"
              >
                Abrir WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-14" style={{ backgroundColor: "#0c1d3f", borderTop: "3px solid #ea3839" }}>
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
                    <a href="/#solucoes" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Institutional */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Institucional</p>
              <ul className="space-y-2.5 text-sm text-white/55">
                <li><a href="/#sobre-nos" className="hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="/#faq" className="hover:text-white transition-colors">Perguntas Frequentes</a></li>
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

export default Pricing;
