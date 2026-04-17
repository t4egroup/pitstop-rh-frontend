import { Link } from "react-router-dom";
import { useState } from "react";
import { Plus, Search, Edit, MoreHorizontal, User, Mail, Shield, ArrowLeft, } from "lucide-react";

const colaboradores = [
  { id: 1, nome: "Amanda Silva", email: "amanda@empresa.com.br", cargo: "Recrutadora Sênior", area: "Recursos Humanos", perfil: "Administrador", status: "Ativo" },
  { id: 2, nome: "Carlos Souza", email: "carlos@empresa.com.br", cargo: "Tech Lead", area: "Tecnologia", perfil: "Gestor", status: "Ativo" },
  { id: 3, nome: "Maria Silva", email: "maria@empresa.com.br", cargo: "Recrutadora", area: "Recursos Humanos", perfil: "Recrutador", status: "Ativo" },
  { id: 4, nome: "João Lima", email: "joao@empresa.com.br", cargo: "Head de Produto", area: "Produto", perfil: "Gestor", status: "Ativo" },
  { id: 5, nome: "Fernanda Castro", email: "fernanda@empresa.com.br", cargo: "Gerente de Marketing", area: "Marketing", perfil: "Gestor", status: "Ativo" },
  { id: 6, nome: "Ricardo Mendes", email: "ricardo@empresa.com.br", cargo: "CTO", area: "Tecnologia", perfil: "Administrador", status: "Ativo" },
  { id: 7, nome: "Ana Costa", email: "ana@empresa.com.br", cargo: "Recrutadora Jr.", area: "Recursos Humanos", perfil: "Recrutador", status: "Inativo" },
];

const perfilColor: Record<string, string> = {
  Administrador: "bg-blue-50 text-purple-600",
  Gestor: "bg-blue-50 text-blue-600",
  Recrutador: "bg-green-50 text-green-600",
};

const SetupColaboradores = () => {
  const [search, setSearch] = useState("");
  const filtered = colaboradores.filter((c) =>
    c.nome.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-5">
        <Link to="/setup" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors mb-4">
          <ArrowLeft size={14} /> Voltar para Setup
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Pessoas colaboradoras</h1>
            <p className="text-xs text-slate-400 mt-0.5">Gerencie os usuários com acesso à plataforma</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus size={14} /> Convidar pessoa
          </button>
        </div>

        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Buscar por nome ou e-mail..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border bg-white pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
        </div>

        <div className="rounded-xl bg-white border border-blue-300 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filtered.map((c) => (
              <div key={c.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                <div className="h-10 w-10 rounded-full bg-[#243c7e]/10 flex items-center justify-center shrink-0">
                  <User size={18} className="text-[#243c7e]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-slate-900">{c.nome}</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1"><Mail size={10} /> {c.email}</p>
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-xs text-slate-600">{c.cargo}</p>
                  <p className="text-[11px] text-slate-400">{c.area}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full hidden md:inline-block ${perfilColor[c.perfil] || "bg-slate-100 text-slate-500"}`}>
                  {c.perfil}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.status === "Ativo" ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-400"}`}>
                  {c.status}
                </span>
                <button className="p-1.5 rounded-lg text-slate-400 hover:text-[#243c7e] hover:bg-[#243c7e]/10 transition-colors"><Edit size={14} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupColaboradores;
