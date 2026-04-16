import { useState } from "react";
import {
  Briefcase, Users, GitPullRequest, FileText,
  Monitor, Building2, Mail, UserX,
  ArrowLeft, ChevronRight, Info, Download,
} from "lucide-react";

interface CategoriaRelatorio {
  id: string;
  titulo: string;
  descricao: string;
  icon: React.ElementType;
  opcoes: { label: string; descricao?: string }[];
}

const categorias: CategoriaRelatorio[] = [
  {
    id: "vagas",
    titulo: "Vagas",
    descricao: "Informações gerais sobre vagas e campos customizados",
    icon: Briefcase,
    opcoes: [
      { label: "Vagas abertas", descricao: "Lista de vagas atualmente abertas com detalhes" },
      { label: "Vagas encerradas", descricao: "Vagas finalizadas no período selecionado" },
      { label: "Campos customizados", descricao: "Dados dos campos personalizados das vagas" },
    ],
  },
  {
    id: "candidaturas",
    titulo: "Candidaturas",
    descricao: "Informações sobre pessoas candidatas inscritas, contratadas e indicadas",
    icon: Users,
    opcoes: [
      { label: "Candidatos inscritos", descricao: "Todas as inscrições realizadas no período" },
      { label: "Candidatos contratados", descricao: "Pessoas contratadas via plataforma" },
      { label: "Candidatos indicados", descricao: "Candidatos vindos de programa de indicação" },
    ],
  },
  {
    id: "etapas",
    titulo: "Etapas",
    descricao: "Informações sobre o tempo das etapas da vaga e do funil de pessoas candidatas",
    icon: GitPullRequest,
    opcoes: [
      { label: "Tempo por etapa", descricao: "Tempo médio em cada etapa do funil" },
      { label: "Movimentação no funil", descricao: "Transições entre etapas das vagas" },
      { label: "Candidatos por etapa", descricao: "Quantidade de candidatos em cada etapa" },
    ],
  },
  {
    id: "resultado-testes",
    titulo: "Resultado de testes",
    descricao: "Informações sobre os testes realizados pelas pessoas candidatas",
    icon: FileText,
    opcoes: [
      { label: "Resultados gerais", descricao: "Notas e aprovações dos testes aplicados" },
      { label: "Testes por vaga", descricao: "Desempenho nos testes filtrado por vaga" },
    ],
  },
  {
    id: "uso-plataforma",
    titulo: "Uso da plataforma",
    descricao: "Informações sobre interações realizadas nas vagas",
    icon: Monitor,
    opcoes: [
      { label: "Atividade dos recrutadores", descricao: "Ações realizadas pelos recrutadores" },
      { label: "Interações nas vagas", descricao: "Histórico de movimentações e ações" },
    ],
  },
  {
    id: "dados-empresa",
    titulo: "Dados da empresa",
    descricao: "Informações gerais sobre dados da empresa",
    icon: Building2,
    opcoes: [
      { label: "Usuários ativos", descricao: "Lista de recrutadores ativos na plataforma" },
      { label: "Filiais", descricao: "Dados de filiais cadastradas" },
      { label: "Áreas", descricao: "Áreas e departamentos da empresa" },
      { label: "Cargos", descricao: "Cargos cadastrados na estrutura" },
    ],
  },
  {
    id: "carta-oferta",
    titulo: "Carta Oferta",
    descricao: "Informações sobre dados de Carta Oferta",
    icon: Mail,
    opcoes: [
      { label: "Cartas enviadas", descricao: "Cartas oferta enviadas no período" },
      { label: "Cartas aceitas", descricao: "Propostas aceitas pelos candidatos" },
    ],
  },
  {
    id: "exclusao-contas",
    titulo: "Exclusão de contas",
    descricao: "Informações sobre pessoas candidatas que solicitaram a exclusão da conta",
    icon: UserX,
    opcoes: [
      { label: "Solicitações de exclusão", descricao: "Registro de pedidos de exclusão de conta" },
    ],
  },
];

const Relatorios = () => {
  const [categoriaAberta, setCategoriaAberta] = useState<CategoriaRelatorio | null>(null);
  const [formato, setFormato] = useState<"CSV" | "XLSX" | null>(null);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = () => {
    if (!formato || !opcaoSelecionada) return;
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  const handleVoltar = () => {
    setCategoriaAberta(null);
    setFormato(null);
    setOpcaoSelecionada("");
    setEnviado(false);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-5xl mx-auto px-6 py-8">

        {!categoriaAberta ? (
          <>
            {/* ── Listagem de categorias ── */}
            <div className="mb-6">
              <h1 className="text-2xl font-extrabold text-slate-900">Relatórios</h1>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                Aqui você encontra os relatórios disponíveis em nossa plataforma, agrupados por categorias.
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                Os dados são D-1, o que significa que as informações dos relatórios refletem os dados gerados até às 23:59h do dia anterior e foram atualizadas às 02h16 de 15/04/2026.
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                Selecione um relatório e enviaremos para você por <span className="font-bold text-slate-700">e-mail</span>.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categorias.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoriaAberta(cat)}
                  className="flex items-start gap-3 rounded-xl bg-white border border-blue-300 p-5 text-left hover:shadow-md hover:border-[#243c7e]/30 transition-all group"
                >
                  <cat.icon size={20} className="text-[#243c7e] shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-[#243c7e] group-hover:underline">{cat.titulo}</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{cat.descricao}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-[#243c7e] shrink-0 mt-0.5 transition-colors" />
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* ── Detalhe da categoria ── */}
            <button
              onClick={handleVoltar}
              className="flex items-center gap-2 text-sm font-semibold text-[#243c7e] hover:underline mb-6"
            >
              <ArrowLeft size={16} /> Voltar para relatórios
            </button>

            <div className="rounded-xl bg-white border border-blue-300 p-6">
              <div className="flex items-center gap-3 mb-2">
                <categoriaAberta.icon size={20} className="text-[#243c7e]" />
                <h2 className="text-lg font-extrabold text-slate-900">{categoriaAberta.titulo}</h2>
              </div>

              <p className="text-sm text-slate-600 mb-1">{categoriaAberta.titulo}</p>
              <p className="text-sm text-slate-500 mb-5">
                {categoriaAberta.descricao}. Acesse uma prévia dos relatórios disponíveis.
              </p>

              {/* Info box */}
              <div className="rounded-lg bg-blue-50 px-4 py-3 mb-6 flex items-start gap-2">
                <Info size={14} className="text-blue-500 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-600">
                  Para estes relatórios não é necessário selecionar nenhum filtro.
                </p>
              </div>

              {/* Formato */}
              <p className="text-sm text-slate-600 mb-3">Escolha o formato para gerar seu relatório</p>
              <div className="flex items-center gap-4 mb-6">
                {(["CSV", "XLSX"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFormato(f)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span
                      className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        formato === f ? "border-[#243c7e]" : "border-slate-300"
                      }`}
                    >
                      {formato === f && <span className="h-2.5 w-2.5 rounded-full bg-[#243c7e]" />}
                    </span>
                    <span className="text-sm font-medium text-slate-700">{f}</span>
                  </button>
                ))}
              </div>

              {/* Select opção */}
              <select
                value={opcaoSelecionada}
                onChange={(e) => setOpcaoSelecionada(e.target.value)}
                className="w-full rounded-lg border border-blue-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#243c7e]/20 focus:border-[#243c7e] transition-all mb-6 appearance-none"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 0.75rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.25em 1.25em" }}
              >
                <option value="">Selecione uma opção</option>
                {categoriaAberta.opcoes.map((op) => (
                  <option key={op.label} value={op.label}>{op.label}</option>
                ))}
              </select>

              {/* Botão enviar */}
              <div className="flex justify-end">
                <button
                  onClick={handleEnviar}
                  disabled={!formato || !opcaoSelecionada}
                  className={`flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all ${
                    formato && opcaoSelecionada
                      ? "bg-[#243c7e] text-white hover:bg-[#1a2d5e] shadow-md"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <Download size={14} />
                  Enviar por e-mail
                </button>
              </div>

              {enviado && (
                <div className="mt-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                  Relatório solicitado com sucesso! Você receberá o arquivo por e-mail em alguns minutos.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Relatorios;
