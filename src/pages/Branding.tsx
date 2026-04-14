import { useState, useRef } from "react";
import { Upload, Youtube, Globe, Info, Eye, Save, ImageIcon, Palette } from "lucide-react";

const Branding = () => {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    dominio: "",
    descricao: "",
    youtube: "",
    corPrincipal: "#1e40af",
    corTitulos: "#111827",
    corLinks: "#1e40af",
    corBotoes: "#1e40af",
    exibirLogo: true,
    exibirNomeNaImagem: false,
    exibirNomeCabecalho: true,
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogoPreview(URL.createObjectURL(file));
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCoverPreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const descLen = form.descricao.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Branding</h1>
            <p className="text-muted-foreground text-sm mt-1">Monte o perfil da empresa e personalize a página de carreiras</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 rounded-lg border px-4 py-2.5 text-sm font-semibold hover:bg-muted transition-colors">
              <Eye size={15} /> Pré-visualizar
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Save size={15} /> {saved ? "Salvo!" : "Publicar"}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── Coluna principal ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Informações gerais */}
            <section className="rounded-xl border bg-card overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="font-bold">Informações gerais</h2>
              </div>
              <div className="p-6 space-y-5">

                {/* Logo */}
                <div className="flex items-start gap-6">
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <div
                      className="h-[80px] w-[160px] rounded-lg border-2 border-dashed bg-muted/40 flex items-center justify-center overflow-hidden cursor-pointer hover:bg-muted/60 transition-colors"
                      onClick={() => logoInputRef.current?.click()}
                    >
                      {logoPreview
                        ? <img src={logoPreview} alt="Logo" className="h-full w-full object-contain p-2" />
                        : <ImageIcon size={28} className="text-muted-foreground/50" />
                      }
                    </div>
                    <button
                      onClick={() => logoInputRef.current?.click()}
                      className="rounded-md border px-3 py-1.5 text-xs font-semibold hover:bg-muted transition-colors"
                    >
                      Editar Logo
                    </button>
                    <p className="text-[10px] text-muted-foreground text-center leading-tight">
                      Tamanho recomendado:<br />224 x 120 px
                    </p>
                    <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Título ou Nome da empresa</label>
                      <input
                        type="text"
                        placeholder="Título ou Nome da empresa"
                        value={form.nome}
                        onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                        className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                        <Globe size={11} /> Domínio da Página de Carreiras
                      </label>
                      <input
                        type="text"
                        placeholder="nome-da-empresa"
                        value={form.dominio}
                        onChange={(e) => setForm((f) => ({ ...f, dominio: e.target.value.toLowerCase().replace(/\s/g, "-") }))}
                        className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                      {form.dominio && (
                        <p className="text-xs font-medium text-primary">
                          https://<span className="font-bold">{form.dominio}</span>.pitstoprh.com.br/carreiras
                        </p>
                      )}
                      <div className="flex items-start gap-2 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 px-3 py-2">
                        <Info size={13} className="text-blue-500 mt-0.5 shrink-0" />
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                          Após realizar uma alteração no domínio e publicá-la, a atualização pode demorar até 1 hora para ser concluída.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Imagem de capa */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Imagem de Capa</label>
                  <div
                    className="w-full h-40 rounded-xl border-2 border-dashed bg-muted/40 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/60 transition-colors overflow-hidden relative"
                    onClick={() => coverInputRef.current?.click()}
                  >
                    {coverPreview ? (
                      <img src={coverPreview} alt="Capa" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <Upload size={24} className="text-muted-foreground/50" />
                        <p className="text-xs text-muted-foreground">Clique para enviar a imagem de capa</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => coverInputRef.current?.click()}
                      className="rounded-md border px-3 py-1.5 text-xs font-semibold hover:bg-muted transition-colors"
                    >
                      Editar imagem
                    </button>
                    {coverPreview && (
                      <button
                        onClick={() => setCoverPreview(null)}
                        className="text-xs text-primary hover:underline"
                      >
                        Restaurar imagem
                      </button>
                    )}
                    <p className="text-[10px] text-muted-foreground">Tamanho recomendado: 1140 x 640 px</p>
                  </div>
                  <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
                </div>

                {/* Descrição */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Descrição da empresa</label>
                  <textarea
                    rows={6}
                    placeholder="Conte a história da sua empresa, valores, cultura e diferenciais..."
                    value={form.descricao}
                    maxLength={4000}
                    onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))}
                    className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                  />
                  <p className="text-right text-xs text-muted-foreground">
                    Caracteres: {descLen.toLocaleString("pt-BR")} de 4.000
                  </p>
                </div>

                {/* YouTube */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                    <Youtube size={12} /> URL do Youtube
                  </label>
                  <div className="relative">
                    <Youtube size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="url"
                      placeholder="Insira a URL do canal da empresa no Youtube"
                      value={form.youtube}
                      onChange={(e) => setForm((f) => ({ ...f, youtube: e.target.value }))}
                      className="w-full rounded-lg border bg-background pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Definição de cores */}
            <section className="rounded-xl border bg-card overflow-hidden">
              <div className="px-6 py-4 border-b flex items-center gap-2">
                <Palette size={15} />
                <h2 className="font-bold">Definição de cores</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Principal", key: "corPrincipal" as const },
                    { label: "Títulos", key: "corTitulos" as const },
                    { label: "Links", key: "corLinks" as const },
                    { label: "Botões", key: "corBotoes" as const },
                  ].map((c) => (
                    <div key={c.key} className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground">{c.label}</label>
                      <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2">
                        <input
                          type="color"
                          value={form[c.key]}
                          onChange={(e) => setForm((f) => ({ ...f, [c.key]: e.target.value }))}
                          className="h-6 w-6 rounded cursor-pointer border-0 bg-transparent p-0"
                        />
                        <span className="text-xs font-mono text-muted-foreground">{form[c.key].toUpperCase()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Opções de exibição */}
            <section className="rounded-xl border bg-card overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="font-bold">Opções de exibição</h2>
              </div>
              <div className="p-6 space-y-3">
                {[
                  { key: "exibirLogo" as const, label: "Exibir o logo da empresa na imagem" },
                  { key: "exibirNomeNaImagem" as const, label: "Exibir o nome da empresa na imagem" },
                  { key: "exibirNomeCabecalho" as const, label: "Exibir o nome da empresa no cabeçalho da página" },
                ].map((opt) => (
                  <label key={opt.key} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => setForm((f) => ({ ...f, [opt.key]: !f[opt.key] }))}
                      className={`h-4 w-4 rounded border-2 flex items-center justify-center transition-colors ${
                        form[opt.key] ? "bg-primary border-primary" : "border-muted-foreground/40 bg-background"
                      }`}
                    >
                      {form[opt.key] && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{opt.label}</span>
                  </label>
                ))}
              </div>
            </section>

          </div>

          {/* ── Preview lateral ── */}
          <div className="space-y-4">
            <div className="rounded-xl border bg-card overflow-hidden sticky top-20">
              <div className="px-4 py-3 border-b">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Pré-visualização</p>
              </div>

              {/* Cover */}
              <div
                className="w-full h-28 relative flex items-end"
                style={{ background: coverPreview ? undefined : form.corPrincipal }}
              >
                {coverPreview && (
                  <img src={coverPreview} alt="Capa" className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-black/20" />
                {form.exibirNomeNaImagem && form.nome && (
                  <p className="relative z-10 px-4 pb-3 font-bold text-white text-sm drop-shadow">{form.nome}</p>
                )}
              </div>

              <div className="p-4 space-y-3">
                {/* Logo + nome */}
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg border bg-white flex items-center justify-center overflow-hidden shadow-sm">
                    {logoPreview
                      ? <img src={logoPreview} alt="Logo" className="h-full w-full object-contain p-1" />
                      : <span className="text-lg font-extrabold" style={{ color: form.corPrincipal }}>
                          {form.nome ? form.nome.charAt(0).toUpperCase() : "P"}
                        </span>
                    }
                  </div>
                  {form.exibirNomeCabecalho && (
                    <p className="font-bold text-sm" style={{ color: form.corTitulos }}>
                      {form.nome || "Nome da empresa"}
                    </p>
                  )}
                </div>

                {/* Descrição */}
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                  {form.descricao || "A descrição da empresa aparecerá aqui..."}
                </p>

                {/* Botão exemplo */}
                <button
                  className="w-full rounded-lg py-2 text-xs font-bold text-white transition-colors"
                  style={{ backgroundColor: form.corBotoes }}
                >
                  Ver vagas abertas
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Branding;
