# AbraceIA — Site de Produção

Implementação do **Livro-Guia AbraceIA Saúde BH 2026** (Orbee Labs).

> **Este repositório é a landing da vertical AbraceIA**, servida na raiz do domínio
> (abraceia.com.br). A jornada "/abraceia" descrita no adendo do Livro-Guia corresponde
> à rota `/` deste site — a vertical tem domínio próprio, não uma subrota do site Orbee Labs.

## Stack (Cap. 4.1)

| Camada | Tecnologia |
|--------|------------|
| Front-end | Next.js 16.2 · React 19.2 · App Router |
| Estilo | Tailwind CSS 4 · tokens AbraceIA |
| Banco | PostgreSQL (Neon) · Prisma 7 |
| IA | Vercel AI SDK · Anthropic direto ou AI Gateway (auditoria + triagem) |
| Deploy | Vercel |
| Testes | Jest · React Testing Library |

### Nota de arquitetura — desvios do Cap. 4

O Cap. 4 do Livro-Guia lista FastAPI, AWS e CMS headless como opções da stack Orbee Labs.
Nesta vertical a arquitetura foi **simplificada por decisão de escopo**: tudo roda em
Next.js full-stack na Vercel (route handlers no lugar de FastAPI, Vercel no lugar de AWS,
conteúdo versionado no repositório no lugar de CMS). Nada disso está "faltando" — foi
adotado o subconjunto mínimo que atende a vertical.

## Início rápido (< 30 min — Cap. 4.4)

A raiz deste repositório **é** a aplicação (não existe subpasta `web`):

```bash
cp env.example .env.local   # preencher variáveis
pnpm install
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000).

### Ver o localhost remotamente (cliente / celular)

**Recomendado — Cloudflare Tunnel** (instalado via `brew install cloudflared`):

```bash
pnpm dev          # terminal 1
pnpm run link     # terminal 2 → URL *.trycloudflare.com (sem senha)
```

**Alternativa — localtunnel** (se Cloudflare falhar):

```bash
pnpm run link:lt  # pode pedir IP público na 1ª visita
```

**Tudo em um comando:** `pnpm dev:link`

> **Rede local (sem túnel):** `pnpm dev:host` → `http://SEU_IP:3000` na mesma Wi‑Fi.

## Scripts

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm dev:host` | Dev acessível na rede local (`0.0.0.0:3000`) |
| `pnpm run link` | Túnel Cloudflare (`*.trycloudflare.com`, sem senha) |
| `pnpm run link:lt` | Túnel localtunnel (fallback) |
| `pnpm dev:link` | Sobe dev + túnel em um comando |
| `pnpm build` | Build de produção |
| `pnpm test` | Testes (TDD — Cap. 4.7) |
| `pnpm type-check` | Verificação TypeScript |
| `pnpm lint` | ESLint |

## Páginas (Sitemap — Cap. 5.1)

- `/` — Home (Hero, diferenciais, quiz, FAQ)
- `/servicos/geo-saude` · `/servicos/sites-medicos` · `/servicos/seo-medico`
- `/sobre` · `/metodo` · `/guia/geo-para-saude` · `/blog` · `/cases` · `/auditoria-ia` · `/contato`
- `/faq` · `/compliance` · `/cookies` · `/privacidade` · `/termos`

## Lead magnets (Cap. 5.3)

- **Quiz prontidão IA** — home + persistência via `POST /api/quiz`
- **Auditoria de presença em IA** — `/auditoria-ia` + `POST /api/audit`
- **Chat de triagem** — `/contato` + `POST /api/chat` (guardrails clínicos)
- **Formulário de contato** — `POST /api/contact` (Prisma quando `DATABASE_URL` definida)

## GEO (Cap. 6.3)

- `public/llms.txt` — orientação para LLMs
- `src/app/robots.ts` — bots de IA permitidos
- `src/app/sitemap.ts` — sitemap automático
- Schema.org completo (Organization, Service, FAQ, Article, Physician…)

## Deploy Vercel

1. Conectar repositório GitHub
2. Root directory: raiz do repositório (padrão — não configurar subpasta)
3. Variáveis de ambiente (ver `env.example`)
4. `main` → produção · PRs → preview

## Variáveis principais

| Variável | Uso |
|----------|-----|
| `DATABASE_URL` | Neon Postgres (leads, quiz) |
| `ANTHROPIC_API_KEY` | Auditoria IA e chat de triagem (modo direto) |
| `AI_GATEWAY_API_KEY` | Alternativa via Vercel AI Gateway (usa `AI_MODEL` no formato `provider/modelo`) |
| `AI_MODEL` | Modelo de IA (padrão: `anthropic/claude-sonnet-4-20250514`) |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager (após consentimento) |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 |
| `LEAD_NOTIFICATION_EMAIL` | Destino dos e-mails de lead (Resend) |
| `CRM_WEBHOOK_URL` | Webhook opcional (HubSpot, RD, Zapier) |
| `RESEND_API_KEY` | Envio de e-mail ao receber lead |
| `NEXT_PUBLIC_SITE_URL` | Canonical e OG |

## Compliance

- Banner LGPD (`CookieBanner`) — analytics só após consentimento; botões Aceitar/Rejeitar
  com o mesmo peso visual e revogação em `/cookies` (tão fácil quanto consentir)
- Checkbox de consentimento LGPD (não pré-marcado) em todos os formulários que coletam
  dados pessoais, com validação `consent === true` no servidor
- Verificador de termos proibidos (Cap. 1.6)
- Disclaimer de IA em formulários e auditoria
- Auditoria SEO protegida contra SSRF (bloqueio de IPs privados, redirects revalidados,
  limite de tamanho de resposta); métricas de performance rotuladas como estimativas

## Referência e documentos fora do Git

O Livro-Guia (PDF/HTML) e os materiais do cliente ficam **fora deste repositório**, na
pasta do projeto no workspace (`../` — ex.: `Livro-Guia-AbraceIA-SAUDE-BH-2026.pdf` e
`GUIA_38_CRITERIOS_LIVRO_GUIA.html`). A pasta `docs/` local é ignorada no Git de
propósito (artefatos de trabalho, não fonte de verdade). Não existem `RETOMADA.md`,
`knowledge/` nem `prompts/` neste repositório — a governança documental da vertical é o
próprio Livro-Guia + este README.
