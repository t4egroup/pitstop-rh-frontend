import { useState, useRef } from "react";
import {
  Image, Upload, Trash2, Eye, EyeOff, Plus, CheckCircle2,
  Calendar, Link as LinkIcon, ToggleLeft, ToggleRight, Info,
} from "lucide-react";

interface Banner {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
  active: boolean;
  startDate: string;
  endDate: string;
  position: "topo" | "lateral" | "rodapé";
  impressions: number;
  clicks: number;
}

const mockBanners: Banner[] = [
  {
    id: 1,
    title: "Promoção de Verão – Plano Pro",
    imageUrl: "https://placehold.co/800x200/243c7e/ffffff?text=Banner+Topo",
    link: "https://pitstop.com.br/planos",
    active: true,
    startDate: "2026-04-01",
    endDate: "2026-04-30",
    position: "topo",
    impressions: 1420,
    clicks: 83,
  },
  {
    id: 2,
    title: "Novo Recurso: Carta Oferta Digital",
    imageUrl: "https://placehold.co/300x250/7c3aed/ffffff?text=Banner+Lateral",
    link: "https://pitstop.com.br/recursos",
    active: false,
    startDate: "2026-05-01",
    endDate: "2026-05-31",
    position: "lateral",
    impressions: 0,
    clicks: 0,
  },
];

const positionLabels: Record<Banner["position"], string> = {
  topo:    "Topo da página",
  lateral: "Lateral (sidebar)",
  rodapé:  "Rodapé",
};

const positionColor: Record<Banner["position"], string> = {
  topo:    "bg-blue-50 text-blue-700 border-blue-200",
  lateral: "bg-purple-50 text-purple-700 border-purple-200",
  rodapé:  "bg-slate-50 text-slate-700 border-slate-200",
};

const inputCls = "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

const EmpresaBanners = () => {
  const [banners, setBanners] = useState<Banner[]>(mockBanners);
  const [showForm, setShowForm] = useState(false);
  const [preview, setPreview] = useState<Banner | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    link: "",
    startDate: "",
    endDate: "",
    position: "topo" as Banner["position"],
    imageFile: null as File | null,
    imagePreview: "",
  });

  const toggleActive = (id: number) =>
    setBanners(prev => prev.map(b => b.id === id ? { ...b, active: !b.active } : b));

  const deleteBanner = (id: number) =>
    setBanners(prev => prev.filter(b => b.id !== id));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm(f => ({ ...f, imageFile: file, imagePreview: URL.createObjectURL(file) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBanner: Banner = {
      id: Date.now(),
      title: form.title,
      imageUrl: form.imagePreview || "https://placehold.co/800x200/243c7e/ffffff?text=Novo+Banner",
      link: form.link,
      active: false,
      startDate: form.startDate,
      endDate: form.endDate,
      position: form.position,
      impressions: 0,
      clicks: 0,
    };
    setBanners(prev => [newBanner, ...prev]);
    setForm({ title: "", link: "", startDate: "", endDate: "", position: "topo", imageFile: null, imagePreview: "" });
    setShowForm(false);
  };

  const ctr = (b: Banner) =>
    b.impressions > 0 ? ((b.clicks / b.impressions) * 100).toFixed(1) + "%" : "—";

  return (
    <div className="container max-w-5xl py-8 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <Image size={22} className="text-primary" /> Banners & Propagandas
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie os banners publicitários exibidos na plataforma para os candidatos.
          </p>
        </div>
        <button
          onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
        >
          <Plus size={16} /> Novo Banner
        </button>
      </div>

      {/* Info box */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
        <Info size={16} className="shrink-0 mt-0.5" />
        <span>
          Os banners ficam visíveis para candidatos na plataforma de vagas. Ative ou pause cada banner conforme sua campanha.
          Formatos aceitos: JPG, PNG, WebP. Tamanhos recomendados: <strong>800×200px</strong> (topo), <strong>300×250px</strong> (lateral).
        </span>
      </div>

      {/* Formulário de novo banner */}
      {showForm && (
        <div className="rounded-xl border bg-white p-5 space-y-4">
          <h2 className="text-sm font-bold">Novo Banner</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Título do Banner</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Promoção de Lançamento"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className={inputCls}
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Link de destino</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={form.link}
                  onChange={e => setForm(f => ({ ...f, link: e.target.value }))}
                  className={inputCls}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Data de início</label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
                  className={inputCls}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Data de término</label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
                  className={inputCls}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Posição</label>
                <select
                  value={form.position}
                  onChange={e => setForm(f => ({ ...f, position: e.target.value as Banner["position"] }))}
                  className={inputCls}
                >
                  <option value="topo">Topo da página</option>
                  <option value="lateral">Lateral (sidebar)</option>
                  <option value="rodapé">Rodapé</option>
                </select>
              </div>

              <div className="sm:col-span-2 space-y-2">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Imagem do Banner</label>
                {form.imagePreview ? (
                  <div className="relative">
                    <img src={form.imagePreview} alt="Preview" className="w-full max-h-40 object-cover rounded-lg border" />
                    <button
                      type="button"
                      onClick={() => setForm(f => ({ ...f, imageFile: null, imagePreview: "" }))}
                      className="absolute top-2 right-2 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="w-full flex flex-col items-center gap-2 rounded-xl border-2 border-dashed py-8 text-muted-foreground hover:bg-muted/30 transition-colors"
                  >
                    <Upload size={22} />
                    <span className="text-sm font-medium">Clique para enviar a imagem</span>
                    <span className="text-xs">JPG, PNG ou WebP · até 2 MB</span>
                  </button>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-lg bg-primary px-5 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity"
              >
                Criar Banner
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de banners */}
      <div className="space-y-3">
        {banners.length === 0 && (
          <div className="rounded-xl border border-dashed py-16 text-center">
            <Image size={32} className="mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">Nenhum banner cadastrado</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Clique em "Novo Banner" para criar o primeiro.</p>
          </div>
        )}

        {banners.map(banner => (
          <div key={banner.id} className={`rounded-xl border bg-white overflow-hidden ${!banner.active ? "opacity-60" : ""}`}>
            <div className="flex items-center gap-4 p-4">
              {/* Thumbnail */}
              <div className="shrink-0 h-16 w-28 rounded-lg border overflow-hidden bg-muted">
                <img src={banner.imageUrl} alt={banner.title} className="h-full w-full object-cover" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold truncate">{banner.title}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${positionColor[banner.position]}`}>
                    {positionLabels[banner.position]}
                  </span>
                  {banner.active ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 size={9} /> Ativo
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border">
                      Pausado
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted-foreground">
                  {banner.link && (
                    <span className="flex items-center gap-1 truncate max-w-[200px]">
                      <LinkIcon size={10} />{banner.link}
                    </span>
                  )}
                  {banner.startDate && (
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />{banner.startDate} → {banner.endDate || "—"}
                    </span>
                  )}
                </div>
                {/* Stats */}
                <div className="flex gap-4 text-xs">
                  <span className="text-muted-foreground"><strong className="text-foreground">{banner.impressions.toLocaleString("pt-BR")}</strong> impressões</span>
                  <span className="text-muted-foreground"><strong className="text-foreground">{banner.clicks}</strong> cliques</span>
                  <span className="text-muted-foreground">CTR: <strong className="text-foreground">{ctr(banner)}</strong></span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setPreview(banner)}
                  className="h-8 w-8 rounded-lg border flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  title="Visualizar"
                >
                  <Eye size={14} />
                </button>
                <button
                  onClick={() => toggleActive(banner.id)}
                  className={`h-8 w-8 rounded-lg border flex items-center justify-center transition-colors ${
                    banner.active
                      ? "text-emerald-600 hover:bg-emerald-50 border-emerald-200"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                  title={banner.active ? "Pausar" : "Ativar"}
                >
                  {banner.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                </button>
                <button
                  onClick={() => deleteBanner(banner.id)}
                  className="h-8 w-8 rounded-lg border flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors"
                  title="Excluir"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview modal */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-5 space-y-3"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">{preview.title}</h3>
              <button onClick={() => setPreview(null)} className="text-muted-foreground hover:text-foreground">
                <EyeOff size={16} />
              </button>
            </div>
            <img src={preview.imageUrl} alt={preview.title} className="w-full rounded-lg border object-cover" />
            <p className="text-xs text-muted-foreground">Posição: <strong>{positionLabels[preview.position]}</strong></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpresaBanners;
