import { X, QrCode, Link2, Download } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ShareJobModal = ({ open, onClose }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl bg-card p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Divulgar Vaga</h2>
          <button onClick={onClose} className="rounded-md p-1 hover:bg-muted transition-colors">
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-5">Escolha como deseja compartilhar esta vaga.</p>

        <div className="space-y-3">
          <button className="flex w-full items-center gap-3 rounded-lg border p-4 text-left hover:bg-muted/50 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <QrCode size={20} />
            </div>
            <div>
              <p className="font-medium text-sm">Gerar QR Code</p>
              <p className="text-xs text-muted-foreground">Crie um código QR para compartilhar impresso ou digital</p>
            </div>
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg border p-4 text-left hover:bg-muted/50 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Link2 size={20} />
            </div>
            <div>
              <p className="font-medium text-sm">Copiar Link Direto</p>
              <p className="text-xs text-muted-foreground">pitstop.rh/vaga/analista-marketing-digital</p>
            </div>
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg border p-4 text-left hover:bg-muted/50 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Download size={20} />
            </div>
            <div>
              <p className="font-medium text-sm">Baixar Post Corporativo</p>
              <p className="text-xs text-muted-foreground">Modelo pronto para redes sociais</p>
            </div>
          </button>
        </div>

        <div className="mt-5 flex justify-end">
          <button onClick={onClose} className="rounded-lg border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareJobModal;
