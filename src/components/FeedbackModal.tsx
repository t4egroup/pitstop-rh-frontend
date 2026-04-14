import { X } from "lucide-react";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const template = `Prezado(a) candidato(a),

Agradecemos seu interesse e participação em nosso processo seletivo para a vaga de [Nome da Vaga].

Após análise criteriosa, informamos que [seu perfil foi aprovado para a próxima etapa / optamos por seguir com outros candidatos neste momento].

Desejamos sucesso em sua trajetória profissional.

Atenciosamente,
Equipe de Recrutamento`;

const FeedbackModal = ({ open, onClose }: Props) => {
  const [message, setMessage] = useState(template);
  const [notify, setNotify] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-xl bg-card p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Enviar Feedback</h2>
          <button onClick={onClose} className="rounded-md p-1 hover:bg-muted transition-colors">
            <X size={18} />
          </button>
        </div>

        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Mensagem para o candidato</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={10}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 mb-4"
        />

        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setNotify(!notify)}
            className={`relative h-5 w-9 rounded-full transition-colors ${notify ? "bg-primary" : "bg-muted"}`}
          >
            <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-primary-foreground transition-transform ${notify ? "translate-x-4" : ""}`} />
          </button>
          <span className="text-sm">Notificar candidato por e-mail</span>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
            Cancelar
          </button>
          <button onClick={onClose} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
            Enviar Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
