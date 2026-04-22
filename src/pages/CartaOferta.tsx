import { useState } from "react";
import {
  FileText, Edit3, Send, CheckCircle2, Clock, X, Download,
  User, Briefcase, DollarSign, Calendar, Building2, Pen,
  AlertCircle, ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ── Types ── */
type OfferStatus = "rascunho" | "enviada" | "aceita" | "recusada" | "expirada";

interface OfferLetter {
  id: number;
  candidateName: string;
  candidateEmail: string;
  role: string;
  department: string;
  salary: string;
  benefits: string;
  startDate: string;
  expiryDate: string;
  additionalNotes: string;
  status: OfferStatus;
  signedAt?: string;
  companyName: string;
  companyContact: string;
}

/* ── Mock data ── */
const mockOffers: OfferLetter[] = [
  {
    id: 1,
    candidateName: "Lucas Ferreira",
    candidateEmail: "lucas@email.com",
    role: "Desenvolvedor Front-end Pleno",
    department: "Tecnologia",
    salary: "R$ 8.500,00",
    benefits: "VR R$ 35/dia, VT, Plano de Saúde Bradesco, PLR",
    startDate: "2026-05-05",
    expiryDate: "2026-04-28",
    additionalNotes: "Contratação CLT. Período de experiência de 90 dias.",
    status: "enviada",
    companyName: "Inovatech S.A.",
    companyContact: "ana.oliveira@inovatech.com",
  },
  {
    id: 2,
    candidateName: "Beatriz Santos",
    candidateEmail: "beatriz@email.com",
    role: "Analista de RH Pleno",
    department: "Recursos Humanos",
    salary: "R$ 5.200,00",
    benefits: "VR R$ 30/dia, VT, Plano de Saúde Unimed",
    startDate: "2026-05-12",
    expiryDate: "2026-04-30",
    additionalNotes: "",
    status: "aceita",
    signedAt: "2026-04-20 14:32",
    companyName: "PitStop RH",
    companyContact: "rh@pitstop.com",
  },
];

/* ── Helpers ── */
const statusConfig: Record<OfferStatus, { label: string; color: string; icon: typeof Clock }> = {
  rascunho: { label: "Rascunho",  color: "bg-slate-100 text-slate-700 border-slate-200",   icon: Edit3          },
  enviada:  { label: "Enviada",   color: "bg-blue-50 text-blue-700 border-blue-200",        icon: Send           },
  aceita:   { label: "Aceita",    color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2  },
  recusada: { label: "Recusada",  color: "bg-red-50 text-red-700 border-red-200",           icon: X              },
  expirada: { label: "Expirada",  color: "bg-amber-50 text-amber-700 border-amber-200",     icon: Clock          },
};

const inputCls = "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

const emptyOffer = (): Omit<OfferLetter, "id" | "status" | "signedAt"> => ({
  candidateName: "",
  candidateEmail: "",
  role: "",
  department: "",
  salary: "",
  benefits: "",
  startDate: "",
  expiryDate: "",
  additionalNotes: "",
  companyName: "PitStop RH",
  companyContact: "",
});

/* ── Print helper ── */
const printOffer = (offer: OfferLetter) => {
  const startDateFmt = offer.startDate
    ? new Date(offer.startDate + "T00:00:00").toLocaleDateString("pt-BR")
    : "—";
  const expiryDateFmt = offer.expiryDate
    ? new Date(offer.expiryDate + "T00:00:00").toLocaleDateString("pt-BR")
    : "—";
  const today = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

  const signatureBlock =
    offer.status === "aceita" && offer.signedAt
      ? `<div style="border:1px solid #d1fae5;background:#ecfdf5;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px;">
           <span style="color:#059669;font-size:20px;">✔</span>
           <div>
             <p style="margin:0;font-weight:700;color:#065f46;">Aceita e assinada digitalmente</p>
             <p style="margin:4px 0 0;font-size:12px;color:#047857;">por <strong>${offer.candidateName}</strong> em ${offer.signedAt}</p>
           </div>
         </div>`
      : `<div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;padding-top:16px;">
           <div style="border-top:1px solid #e2e8f0;padding-top:8px;text-align:center;">
             <p style="margin:0;font-size:12px;color:#64748b;">Assinatura do Candidato</p>
             <p style="margin:4px 0 0;font-size:12px;font-weight:600;">${offer.candidateName}</p>
           </div>
           <div style="border-top:1px solid #e2e8f0;padding-top:8px;text-align:center;">
             <p style="margin:0;font-size:12px;color:#64748b;">Assinatura da Empresa</p>
             <p style="margin:4px 0 0;font-size:12px;font-weight:600;">${offer.companyName}</p>
           </div>
         </div>`;

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <title>Carta Oferta — ${offer.candidateName}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #1e293b; padding: 48px; max-width: 720px; margin: 0 auto; }
    .date { text-align: right; font-size: 12px; color: #64748b; margin-bottom: 32px; }
    .company { margin-bottom: 20px; }
    .company p { margin: 2px 0; }
    .to { margin-bottom: 28px; }
    .to p { margin: 2px 0; }
    h1 { font-size: 18px; font-weight: 700; margin-bottom: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
    .intro { margin-bottom: 20px; line-height: 1.6; }
    .details-box { border: 1px solid #e2e8f0; background: #f8fafc; border-radius: 10px; padding: 16px; margin-bottom: 20px; }
    .details-box .label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-bottom: 10px; }
    .details-grid { display: grid; grid-template-columns: 160px 1fr; gap: 6px 0; }
    .details-grid span:nth-child(odd) { color: #64748b; }
    .details-grid span:nth-child(even) { font-weight: 600; }
    .obs { margin-bottom: 20px; }
    .obs .label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-bottom: 6px; }
    .validity { margin-bottom: 28px; line-height: 1.6; }
    .signature { border-top: 1px solid #e2e8f0; padding-top: 20px; }
    @media print { body { padding: 32px; } }
  </style>
</head>
<body>
  <div class="date">${today}</div>
  <div class="company">
    <p><strong>${offer.companyName}</strong></p>
    <p style="font-size:12px;color:#64748b;">Contato: ${offer.companyContact}</p>
  </div>
  <div class="to">
    <p>Para: <strong>${offer.candidateName}</strong></p>
    <p style="font-size:12px;color:#64748b;">${offer.candidateEmail}</p>
  </div>
  <h1>Carta de Oferta de Emprego</h1>
  <p class="intro">
    Temos o prazer de lhe oferecer a posição de <strong>${offer.role}</strong>
    no departamento de <strong>${offer.department}</strong>
    em <strong>${offer.companyName}</strong>.
  </p>
  <div class="details-box">
    <div class="label">Detalhes da oferta</div>
    <div class="details-grid">
      <span>Cargo:</span><span>${offer.role}</span>
      <span>Departamento:</span><span>${offer.department}</span>
      <span>Salário:</span><span>${offer.salary}</span>
      <span>Início previsto:</span><span>${startDateFmt}</span>
      <span>Benefícios:</span><span>${offer.benefits}</span>
    </div>
  </div>
  ${offer.additionalNotes ? `<div class="obs"><div class="label">Observações</div><p style="color:#64748b;line-height:1.6;">${offer.additionalNotes}</p></div>` : ""}
  <p class="validity">
    Esta oferta é válida até <strong>${expiryDateFmt}</strong>.
    Para aceitar, assine digitalmente abaixo.
  </p>
  <div class="signature">${signatureBlock}</div>
</body>
</html>`;

  const win = window.open("", "_blank", "width=800,height=900");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 400);
};

/* ── Offer Preview (printable letter) ── */
const OfferPreview = ({ offer, onClose }: { offer: OfferLetter; onClose: () => void }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-4"
      onClick={e => e.stopPropagation()}
    >
      {/* Modal header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h3 className="text-sm font-bold flex items-center gap-2">
          <FileText size={15} className="text-primary" /> Carta Oferta — {offer.candidateName}
        </h3>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors"
            onClick={() => printOffer(offer)}
          >
            <Download size={12} /> Baixar PDF
          </button>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Letter body */}
      <div className="px-8 py-6 space-y-5 text-sm leading-relaxed" id="carta-oferta-print">
        <div className="text-right text-xs text-muted-foreground">
          {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
        </div>

        <div>
          <p className="font-bold">{offer.companyName}</p>
          <p className="text-muted-foreground text-xs">Contato: {offer.companyContact}</p>
        </div>

        <div>
          <p>Para: <strong>{offer.candidateName}</strong></p>
          <p className="text-muted-foreground text-xs">{offer.candidateEmail}</p>
        </div>

        <div className="border-t pt-4">
          <p className="font-bold text-base mb-3">Carta de Oferta de Emprego</p>
          <p>
            Temos o prazer de lhe oferecer a posição de <strong>{offer.role}</strong> no departamento de <strong>{offer.department}</strong> em <strong>{offer.companyName}</strong>.
          </p>
        </div>

        <div className="rounded-xl border bg-slate-50 p-4 space-y-2">
          <p className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-2">Detalhes da oferta</p>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <span className="text-muted-foreground">Cargo:</span><span className="font-medium">{offer.role}</span>
            <span className="text-muted-foreground">Departamento:</span><span className="font-medium">{offer.department}</span>
            <span className="text-muted-foreground">Salário:</span><span className="font-medium">{offer.salary}</span>
            <span className="text-muted-foreground">Início previsto:</span><span className="font-medium">{offer.startDate ? new Date(offer.startDate + "T00:00:00").toLocaleDateString("pt-BR") : "—"}</span>
            <span className="text-muted-foreground">Benefícios:</span><span className="font-medium">{offer.benefits}</span>
          </div>
        </div>

        {offer.additionalNotes && (
          <div>
            <p className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-1">Observações</p>
            <p className="text-muted-foreground">{offer.additionalNotes}</p>
          </div>
        )}

        <p>
          Esta oferta é válida até <strong>{offer.expiryDate ? new Date(offer.expiryDate + "T00:00:00").toLocaleDateString("pt-BR") : "—"}</strong>.
          Para aceitar, assine digitalmente abaixo.
        </p>

        {/* Signature area */}
        <div className="border-t pt-5 mt-4">
          {offer.status === "aceita" && offer.signedAt ? (
            <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
              <div>
                <p className="text-sm font-bold text-emerald-800">Aceita e assinada digitalmente</p>
                <p className="text-xs text-emerald-700">por <strong>{offer.candidateName}</strong> em {offer.signedAt}</p>
              </div>
            </div>
          ) : offer.status === "enviada" ? (
            <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-primary/30 p-6">
              <Pen size={20} className="text-primary/50" />
              <p className="text-sm text-muted-foreground text-center">Aguardando assinatura digital do candidato</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-8 pt-2">
              <div className="border-t pt-2 text-center">
                <p className="text-xs text-muted-foreground">Assinatura do Candidato</p>
                <p className="text-xs font-medium mt-1">{offer.candidateName}</p>
              </div>
              <div className="border-t pt-2 text-center">
                <p className="text-xs text-muted-foreground">Assinatura da Empresa</p>
                <p className="text-xs font-medium mt-1">{offer.companyName}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

/* ── Page ── */
const CartaOferta = () => {
  const navigate = useNavigate();
  const [offers, setOffers] = useState<OfferLetter[]>(mockOffers);
  const [showForm, setShowForm] = useState(false);
  const [preview, setPreview] = useState<OfferLetter | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyOffer());
  const [saved, setSaved] = useState(false);

  const startCreate = () => {
    setForm(emptyOffer());
    setEditingId(null);
    setShowForm(true);
  };

  const startEdit = (offer: OfferLetter) => {
    setForm({
      candidateName: offer.candidateName,
      candidateEmail: offer.candidateEmail,
      role: offer.role,
      department: offer.department,
      salary: offer.salary,
      benefits: offer.benefits,
      startDate: offer.startDate,
      expiryDate: offer.expiryDate,
      additionalNotes: offer.additionalNotes,
      companyName: offer.companyName,
      companyContact: offer.companyContact,
    });
    setEditingId(offer.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      setOffers(prev => prev.map(o => o.id === editingId ? { ...o, ...form } : o));
    } else {
      setOffers(prev => [{ id: Date.now(), ...form, status: "rascunho" }, ...prev]);
    }
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const sendOffer = (id: number) =>
    setOffers(prev => prev.map(o => o.id === id ? { ...o, status: "enviada" } : o));

  const deleteOffer = (id: number) =>
    setOffers(prev => prev.filter(o => o.id !== id));

  const f = (key: keyof typeof form, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }));

  return (
    <div className="container max-w-5xl py-8 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-2 transition-colors"
          >
            <ChevronLeft size={15} /> Voltar
          </button>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <FileText size={22} className="text-primary" /> Carta Oferta Digital
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Crie, edite e envie cartas oferta com aceite digital pelo candidato.</p>
        </div>
        <button
          onClick={startCreate}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
        >
          <FileText size={15} /> Nova Carta Oferta
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <CheckCircle2 size={15} /> Carta oferta salva com sucesso!
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="rounded-xl border bg-white p-5 space-y-4">
          <h2 className="text-sm font-bold">{editingId ? "Editar Carta Oferta" : "Nova Carta Oferta"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Nome do Candidato</label>
                <input required type="text" value={form.candidateName} onChange={e => f("candidateName", e.target.value)} className={inputCls} placeholder="Nome completo" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">E-mail do Candidato</label>
                <input required type="email" value={form.candidateEmail} onChange={e => f("candidateEmail", e.target.value)} className={inputCls} placeholder="candidato@email.com" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Cargo Ofertado</label>
                <input required type="text" value={form.role} onChange={e => f("role", e.target.value)} className={inputCls} placeholder="Ex: Analista de RH Pleno" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Departamento</label>
                <input type="text" value={form.department} onChange={e => f("department", e.target.value)} className={inputCls} placeholder="Ex: Recursos Humanos" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Salário</label>
                <input required type="text" value={form.salary} onChange={e => f("salary", e.target.value)} className={inputCls} placeholder="Ex: R$ 5.000,00" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Data de Início</label>
                <input type="date" value={form.startDate} onChange={e => f("startDate", e.target.value)} className={inputCls} />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Validade da Oferta</label>
                <input required type="date" value={form.expiryDate} onChange={e => f("expiryDate", e.target.value)} className={inputCls} />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Empresa</label>
                <input type="text" value={form.companyName} onChange={e => f("companyName", e.target.value)} className={inputCls} />
              </div>
              <div className="sm:col-span-2 space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Benefícios</label>
                <input type="text" value={form.benefits} onChange={e => f("benefits", e.target.value)} className={inputCls} placeholder="Ex: VR, VT, Plano de Saúde, PLR" />
              </div>
              <div className="sm:col-span-2 space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Observações adicionais</label>
                <textarea rows={3} value={form.additionalNotes} onChange={e => f("additionalNotes", e.target.value)} className={inputCls} placeholder="Regime de contratação, período de experiência, etc." />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t">
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
                Cancelar
              </button>
              <button type="submit" className="rounded-lg bg-primary px-5 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity">
                {editingId ? "Salvar alterações" : "Criar Carta"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {offers.length === 0 && (
          <div className="rounded-xl border border-dashed py-16 text-center">
            <FileText size={32} className="mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">Nenhuma carta oferta criada</p>
          </div>
        )}

        {offers.map(offer => {
          const cfg = statusConfig[offer.status];
          const StatusIcon = cfg.icon;
          return (
            <div key={offer.id} className="rounded-xl border bg-white p-5">
              <div className="flex items-start gap-4 flex-wrap">
                {/* Avatar */}
                <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {offer.candidateName[0]}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold">{offer.candidateName}</p>
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${cfg.color}`}>
                      <StatusIcon size={10} />{cfg.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Briefcase size={11} />{offer.role}</span>
                    <span className="flex items-center gap-1"><DollarSign size={11} />{offer.salary}</span>
                    <span className="flex items-center gap-1"><Building2 size={11} />{offer.companyName}</span>
                    {offer.startDate && (
                      <span className="flex items-center gap-1"><Calendar size={11} />Início: {new Date(offer.startDate + "T00:00:00").toLocaleDateString("pt-BR")}</span>
                    )}
                  </div>
                  {offer.status === "aceita" && offer.signedAt && (
                    <p className="text-[11px] text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 size={10} /> Assinada em {offer.signedAt}
                    </p>
                  )}
                  {offer.status === "enviada" && (
                    <p className="text-[11px] text-blue-600 flex items-center gap-1">
                      <AlertCircle size={10} /> Aguardando aceite do candidato
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  <button
                    onClick={() => setPreview(offer)}
                    className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors"
                  >
                    <FileText size={12} /> Visualizar
                  </button>
                  {offer.status === "rascunho" && (
                    <>
                      <button
                        onClick={() => startEdit(offer)}
                        className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors"
                      >
                        <Edit3 size={12} /> Editar
                      </button>
                      <button
                        onClick={() => sendOffer(offer.id)}
                        className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white hover:opacity-90 transition-opacity"
                      >
                        <Send size={12} /> Enviar
                      </button>
                    </>
                  )}
                  {(offer.status === "rascunho" || offer.status === "expirada") && (
                    <button
                      onClick={() => deleteOffer(offer.id)}
                      className="flex items-center gap-1.5 rounded-lg border border-red-200 text-red-500 px-3 py-1.5 text-xs font-medium hover:bg-red-50 transition-colors"
                    >
                      <X size={12} /> Excluir
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview modal */}
      {preview && <OfferPreview offer={preview} onClose={() => setPreview(null)} />}
    </div>
  );
};

export default CartaOferta;
