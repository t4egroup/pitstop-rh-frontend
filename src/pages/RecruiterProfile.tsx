import { useState } from "react";
import { User, Mail, Phone, Building2, Lock, Bell, Eye, EyeOff, Save, Camera } from "lucide-react";

const RecruiterProfile = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);

  const [profile, setProfile] = useState({
    name: "Amanda Silva",
    email: "amanda@empresa.com.br",
    phone: "(11) 99999-0000",
    company: "PitStop RH",
    role: "Recrutadora Sênior",
  });

  const [notifications, setNotifications] = useState({
    newCandidate: true,
    interviewReminder: true,
    weeklyReport: false,
    platformNews: false,
  });

  const handleSave = (section: string) => {
    setSaved(section);
    setTimeout(() => setSaved(null), 2500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl py-10 space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-extrabold">Perfil do Recrutador</h1>
          <p className="text-muted-foreground text-sm mt-1">Gerencie suas informações e preferências de conta</p>
        </div>

        {/* Avatar + name card */}
        <div className="rounded-xl border bg-card p-6 flex items-center gap-5">
          <div className="relative shrink-0">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-extrabold text-2xl">
              {profile.name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
              <Camera size={12} />
            </button>
          </div>
          <div>
            <p className="font-bold text-lg">{profile.name}</p>
            <p className="text-sm text-muted-foreground">{profile.role} · {profile.company}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{profile.email}</p>
          </div>
        </div>

        {/* Dados Pessoais */}
        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="font-bold flex items-center gap-2"><User size={16} /> Dados Pessoais</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Nome completo</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Cargo</label>
                <input
                  type="text"
                  value={profile.role}
                  onChange={(e) => setProfile((p) => ({ ...p, role: e.target.value }))}
                  className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5"><Mail size={12} /> E-mail</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                  className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5"><Phone size={12} /> Telefone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5"><Building2 size={12} /> Empresa</label>
                <input
                  type="text"
                  value={profile.company}
                  onChange={(e) => setProfile((p) => ({ ...p, company: e.target.value }))}
                  className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              {saved === "profile" && (
                <span className="text-xs text-green-600 font-medium">Salvo com sucesso!</span>
              )}
              <div className="ml-auto">
                <button
                  onClick={() => handleSave("profile")}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Save size={14} /> Salvar alterações
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Segurança */}
        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="font-bold flex items-center gap-2"><Lock size={16} /> Segurança</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Senha atual</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-lg border bg-background px-3 pr-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showCurrentPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Nova senha</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full rounded-lg border bg-background px-3 pr-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showNewPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Confirmar nova senha</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              {saved === "password" && (
                <span className="text-xs text-green-600 font-medium">Senha atualizada!</span>
              )}
              <div className="ml-auto">
                <button
                  onClick={() => handleSave("password")}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Save size={14} /> Atualizar senha
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notificações */}
        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="font-bold flex items-center gap-2"><Bell size={16} /> Notificações</h2>
          </div>
          <div className="p-6 space-y-4">
            {[
              { key: "newCandidate", label: "Novo candidato na vaga", desc: "Receba um aviso quando um candidato se inscrever" },
              { key: "interviewReminder", label: "Lembrete de entrevista", desc: "Notificação 1h antes de uma entrevista agendada" },
              { key: "weeklyReport", label: "Relatório semanal", desc: "Resumo de KPIs enviado toda segunda-feira" },
              { key: "platformNews", label: "Novidades da plataforma", desc: "Atualizações e novas funcionalidades do PitStop RH" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <button
                  onClick={() => setNotifications((n) => ({ ...n, [item.key]: !n[item.key as keyof typeof n] }))}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                    notifications[item.key as keyof typeof notifications] ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                      notifications[item.key as keyof typeof notifications] ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
            <div className="flex justify-end pt-2">
              {saved === "notifications" && (
                <span className="text-xs text-green-600 font-medium mr-3 self-center">Salvo!</span>
              )}
              <button
                onClick={() => handleSave("notifications")}
                className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Save size={14} /> Salvar preferências
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RecruiterProfile;
