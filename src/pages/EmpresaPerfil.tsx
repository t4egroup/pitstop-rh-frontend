import {
  Building2, Mail, Phone, MapPin, Globe,
  Users, Briefcase, Pencil, Upload, CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const mockPerfil = {
  name:        "Tech Corp",
  cnpj:        "12.345.678/0001-99",
  setor:       "Tecnologia da Informação",
  porte:       "Médio (51–200 funcionários)",
  fundacao:    "2015",
  site:        "www.techcorp.com.br",
  email:       "rh@techcorp.com.br",
  phone:       "(11) 3456-7890",
  city:        "São Paulo",
  state:       "SP",
  address:     "Av. Paulista, 1234 – Bela Vista",
  about:       "A Tech Corp é uma empresa de tecnologia focada em soluções de software para o setor financeiro. Valorizamos inovação, diversidade e crescimento contínuo dos nossos colaboradores.",
  logoUploaded: true,
  vagas:       5,
  colaboradores: 120,
};

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
    <p className="text-sm font-medium">{value}</p>
  </div>
);

const SectionCard = ({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) => (
  <div className="rounded-xl border bg-card">
    <div className="flex items-center gap-2.5 px-5 py-4 border-b">
      <Icon size={16} className="text-primary" />
      <h2 className="text-sm font-semibold">{title}</h2>
    </div>
    <div className="px-5 py-4">{children}</div>
  </div>
);

const EmpresaPerfil = () => {
  const { user } = useAuth();
  const p = { ...mockPerfil, name: user?.name ?? mockPerfil.name, email: user?.email ?? mockPerfil.email };

  return (
    <div className="container max-w-3xl py-8 space-y-5">

      {/* Header */}
      <div className="rounded-xl border bg-card px-6 py-5 flex items-start gap-5">
        {/* Logo placeholder */}
        <div className="shrink-0 h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center text-2xl font-extrabold text-primary border">
          {p.name[0]}
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-extrabold truncate">{p.name}</h1>
          <p className="text-sm text-muted-foreground">{p.setor}</p>
          <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin size={12} />{p.city}, {p.state}</span>
            <span className="flex items-center gap-1"><Mail size={12} />{p.email}</span>
            <span className="flex items-center gap-1"><Globe size={12} />{p.site}</span>
          </div>
        </div>

        <button className="shrink-0 flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors">
          <Pencil size={12} />
          Editar
        </button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border bg-card p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Briefcase size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-2xl font-extrabold">{p.vagas}</p>
            <p className="text-xs text-muted-foreground">Vagas ativas</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Users size={18} className="text-blue-500" />
          </div>
          <div>
            <p className="text-2xl font-extrabold">{p.colaboradores}</p>
            <p className="text-xs text-muted-foreground">Colaboradores</p>
          </div>
        </div>
      </div>

      {/* Sobre */}
      <SectionCard icon={Building2} title="Sobre a Empresa">
        <p className="text-sm text-muted-foreground leading-relaxed">{p.about}</p>
      </SectionCard>

      {/* Dados cadastrais */}
      <SectionCard icon={Briefcase} title="Dados Cadastrais">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Field label="CNPJ"      value={p.cnpj}      />
          <Field label="Setor"     value={p.setor}     />
          <Field label="Porte"     value={p.porte}     />
          <Field label="Fundação"  value={p.fundacao}  />
          <Field label="Site"      value={p.site}      />
        </div>
      </SectionCard>

      {/* Contato */}
      <SectionCard icon={Phone} title="Contato">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Field label="E-mail"  value={p.email}   />
          <Field label="Telefone"value={p.phone}   />
          <Field label="Cidade"  value={p.city}    />
          <Field label="Estado"  value={p.state}   />
          <Field label="Endereço"value={p.address} />
        </div>
      </SectionCard>

      {/* Logo */}
      <SectionCard icon={Upload} title="Logotipo">
        {p.logoUploaded ? (
          <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800/40 p-3">
            <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">logo_techcorp.png</p>
              <p className="text-xs text-muted-foreground">Enviado em 01/04/2026</p>
            </div>
            <button className="text-xs text-primary font-medium hover:underline shrink-0">Substituir</button>
          </div>
        ) : (
          <button className="w-full flex flex-col items-center gap-2 rounded-xl border-2 border-dashed py-8 text-muted-foreground hover:bg-muted/30 transition-colors">
            <Upload size={24} />
            <span className="text-sm font-medium">Clique para enviar o logotipo</span>
            <span className="text-xs">PNG, JPG ou SVG · até 2 MB</span>
          </button>
        )}
      </SectionCard>

    </div>
  );
};

export default EmpresaPerfil;
