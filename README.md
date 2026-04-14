# PitStop RH — Plataforma de Recrutamento

> A parada certa para o seu sucesso. Conectamos empresas e talentos com propósito, velocidade e precisão.

---

## Sobre o Projeto

**PitStop RH** é uma plataforma web de consultoria e serviços de Recrutamento & Seleção. A aplicação oferece uma landing page institucional para atrair empresas e candidatos, além de um sistema interno completo para recrutadores gerenciarem todo o ciclo de contratação — de requisições à admissão.

---

## Stack

| Camada        | Tecnologia                                    |
|---------------|-----------------------------------------------|
| Framework     | React 18 + TypeScript                         |
| Build         | Vite                                          |
| Estilização   | Tailwind CSS + shadcn/ui (Radix UI)           |
| Roteamento    | React Router v6                               |
| Estado global | Context API (Auth) + TanStack React Query     |
| Gráficos      | Recharts                                      |
| Formulários   | React Hook Form + Zod                         |
| Testes        | Vitest + React Testing Library                |

---

## Funcionalidades

### Público (sem login)
- **Landing page** com seções: Hero, Sobre Nós, Soluções, Metodologia P.I.T, KPIs, Depoimentos, FAQ e Contato
- **Planos** com tabela de preços e seção de contato
- **Login / Cadastro** de candidatos e empresas

### Área do Recrutador (após login)
- **Dashboard** — KPIs e gráficos de vagas, candidatos e funil de seleção
- **Processos** — abertura e acompanhamento de vagas com pipeline visual
- **Candidatos** — listagem de candidatos e vagas em que aplicaram
- **Requisições** — solicitações formais de abertura de vaga com aprovação/rejeição
- **Relatórios** — análises e downloads de relatórios por período
- **Branding** — montagem do perfil de marca empregadora da empresa
- **Admissão** — checklist de onboarding com progresso por candidato
- **Perfil** — configurações de conta, senha e notificações

---

## Estrutura de Rotas

```
/               → Home (landing page)
/login          → Login
/cadastro       → Cadastro de candidato
/planos         → Planos e preços
/dashboard      → Dashboard do recrutador
/processos      → Gestão de processos seletivos
/candidatos     → Lista de candidatos
/requisicoes    → Requisições de vagas
/relatorios     → Relatórios e análises
/branding       → Perfil de marca empregadora
/admissao       → Onboarding e admissão
/perfil         → Configurações do recrutador
```

---

## Como rodar localmente

### Pré-requisitos
- Node.js 18+
- npm

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd pitstop-recruta-hub

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:8080](http://localhost:8080)

### Scripts disponíveis

```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Build de produção
npm run preview    # Preview do build de produção
npm run lint       # Análise de código com ESLint
npm run test       # Executa os testes
npm run test:watch # Testes em modo watch
```

---

## Identidade Visual

| Elemento        | Valor     |
|-----------------|-----------|
| Azul primário   | `#31549c` |
| Vermelho acento | `#ea3839` |
| Fundo hero/dark | `#0c1d3f` |
| Fonte           | Inter     |

O projeto suporta **modo claro e escuro** via `next-themes` com variáveis CSS definidas em `src/index.css`.

---

## Licença

Uso interno — PitStop RH Consultoria e Serviços © 2025
