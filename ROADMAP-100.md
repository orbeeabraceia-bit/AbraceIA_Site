# Roadmap AbraceIA — De ~85% para 100/100

> Documento-mestre das tarefas para levar a aplicação AbraceIA ao critério
> **"100 de 100"** no espírito do Livro-Guia Orbee Labs (30 Critérios 10/10).
>
> Base: revisão linha-a-linha do código (`src/`) + leitura integral do
> Livro-Guia (70 págs) cruzada com a aplicação. Data: 2026-06-20.

---

## Como ler este documento

**Prioridade**
- 🔴 **P0** — Crítico ou quick-win de alto impacto. Fazer primeiro.
- 🟡 **P1** — Importante para a paridade com o guia. Fazer em seguida.
- 🟢 **P2** — Polimento / robustez extra (acima do que o guia exige).

**Esforço** — estimativa grosseira: `XS` (<1h) · `S` (1-3h) · `M` (meio dia) · `L` (1-2 dias).

**Status** — `[ ]` a fazer · `[~]` em andamento · `[x]` concluído.

> ⚠️ **Antes de escrever qualquer código**, ler o guia relevante em
> `node_modules/next/dist/docs/` (este é um Next.js modificado — ver `AGENTS.md`).
> Especialmente para CSP/headers (`next.config.ts`) e route handlers.

---

## Placar atual (linha de base)

| Eixo | Situação | Nota |
|------|----------|------|
| Stack & segurança de versão (CVEs) | Next 16.2.7 / React 19.2.4 — protocolo do guia OK | ✅ 10 |
| TDD / testes | 70 testes em 10 suítes, 100% passando (meta do guia: 54) | ✅ 10 |
| GEO (llms.txt, robots IA, Schema) | Implementação forte; auditoria de IA como lead magnet | ✅ 10 |
| AEO (FAQPage, HowTo) | Schemas + accordion implementados | ✅ 9 |
| LGPD | Banner opt-in, consent server-side, analytics gated | ✅ 9 |
| Compliance setorial | Só CFM; falta CFP/CFO; saída de IA não filtrada | ⚠️ 7 |
| Robustez de backend | Rate-limit só em 1 endpoint; parsing frágil | ⚠️ 6 |
| Lead magnets | Falta a Calculadora ROI prevista no guia | ⚠️ 7 |
| Tooling / CI | Sem Husky/Commitlint/Prettier/CI | ⚠️ 6 |
| Headers de segurança | Falta CSP | ⚠️ 7 |
| **Global estimado** | | **~8,5 / 10** |

---

## 1. Segurança & Robustez de Backend

| ID | Tarefa | Por quê (ref. guia) | Como / Critério de aceite | Prio | Esf | Status |
|----|--------|---------------------|---------------------------|------|-----|--------|
| SEG-01 | **Adicionar CSP** (Content-Security-Policy) aos headers | Cap. 8.1 / 9 — checklist pede "headers CSP". Hoje só HSTS/X-Frame/etc. | Definir CSP em `next.config.ts` cobrindo GTM/GA4, fonts Google, Microlink, `unsafe-inline` controlado (ou nonce). Validar no securityheaders.com e garantir que GTM/imagens ainda funcionam. | 🔴 P0 | M | [x] |
| SEG-02 | **Rate-limit nos endpoints de IA** (`/api/chat`, `/api/audit`) e demais (`/api/quiz`, `/api/analyze-seo`) | Endpoints de IA custam tokens e estão expostos. `rate-limit.ts` já existe, usado só em `/api/contact`. | Aplicar `rateLimit(\`chat:\${ip}\`)` etc. com limites adequados por rota. Retornar 429 + `Retry-After`. Teste cobrindo o 429. | 🔴 P0 | S | [x] |
| SEG-03 | **Parsing robusto da resposta da IA** em `/api/audit` | `JSON.parse(text)` quebra se o modelo devolver cercas ```` ```json ````; cai no fallback à toa. | Extrair JSON com regex/stripping de cercas antes do parse. Teste com resposta cercada. | 🟡 P1 | XS | [x] |
| SEG-04 | **Rate-limit multi-instância (Upstash Redis)** | `rate-limit.ts` é em memória (por instância serverless) — o próprio comentário aponta isso. Guia (4.2) lista Upstash no free tier. | Migrar store para Upstash Redis quando `UPSTASH_*` definidas; manter fallback em memória. | 🟢 P2 | M | [ ] |
| SEG-05 | **Monitoramento de CVEs / Dependabot** | Cap. 4.2.1 — "monitorar advisories semanalmente". | Habilitar Dependabot (`.github/dependabot.yml`) + alertas de segurança no GitHub. | 🟢 P2 | XS | [x] |

---

## 2. Compliance (LGPD / CFM / CFP / CFO)

| ID | Tarefa | Por quê (ref. guia) | Como / Critério de aceite | Prio | Esf | Status |
|----|--------|---------------------|---------------------------|------|-----|--------|
| CMP-01 | **Filtrar a saída da IA** pelo `checkComplianceText` | Cap. 9.2 — todo material publicado deve passar pelo checklist; respostas de IA podem conter termo proibido. | No `/api/chat` e `/api/audit`, rodar `checkComplianceText` na resposta; se violar, sanitizar/substituir por fallback seguro. Teste com termo proibido injetado. | 🔴 P0 | S | [x] |
| CMP-02 | **Estender termos proibidos para CFP e CFO** | Cap. 9.2 — CFP proíbe "preço social", "desconto", "pacote promocional", "valor acessível"; app atende psicólogo (case Eric Moreira) e odonto. | Ampliar `forbiddenTerms` em `compliance.ts` com termos CFP/CFO. Atualizar `compliance.test.ts`. | 🟡 P1 | S | [x] |
| CMP-03 | **Processo de exclusão de dados (LGPD, 15 dias)** | Cap. 9.1 — exclusão documentada e funcional, atender em ≤15 dias. | Confirmar/escrever na `/privacidade` o canal e prazo; idealmente endpoint/rotina de exclusão por e-mail. | 🟡 P1 | M | [ ] |
| CMP-04 | **Consentimentos separados por finalidade** (analytics vs marketing) | Cap. 9.1 — "consentimentos separados para cada finalidade". Hoje o banner é único (aceitar/rejeitar tudo). | Evoluir `CookieBanner` para toggles por finalidade (analytics / marketing). | 🟢 P2 | M | [x] |
| CMP-05 | **Revisão das páginas legais** (privacidade/termos/cookies/compliance) | Cap. 9.1 — política completa (dados coletados, finalidade, retenção, direitos). | Auditar as 4 páginas contra o checklist do Cap. 9 e completar lacunas. | 🟡 P1 | M | [ ] |

---

## 3. Lead Magnets (paridade com o guia)

| ID | Tarefa | Por quê (ref. guia) | Como / Critério de aceite | Prio | Esf | Status |
|----|--------|---------------------|---------------------------|------|-----|--------|
| LM-01 | **Calculadora ROI** (`/calculadora-roi`) | Cap. 2.4 / 6.6 / sitemap do guia — é um dos 2 lead magnets centrais; hoje ausente. | Página + componente interativo (estimativa de tráfego/leads/ROI a partir de inputs), com Schema `WebApplication`, evento GA4, disclaimer e CTA. TDD. Adicionar ao sitemap e ao nav. | 🟡 P1 | L | [x] |
| LM-02 | **Schema + tracking nos lead magnets existentes** | Cap. 8 — eventos GA4 padronizados. | Garantir `webApplicationSchema` no Quiz/Auditorias e eventos consistentes (`generate_lead`, `view_item`). | 🟢 P2 | S | [x] |

---

## 4. Qualidade de Código & Tooling (TDD / CI)

| ID | Tarefa | Por quê (ref. guia) | Como / Critério de aceite | Prio | Esf | Status |
|----|--------|---------------------|---------------------------|------|-----|--------|
| QA-01 | **Prettier** | Cap. 4.3 — "Prettier configurado para formatação automática". | `.prettierrc` + script `format`; rodar no projeto. | 🟡 P1 | XS | [x] |
| QA-02 | **Husky + lint-staged** (pre-commit) | Cap. 4.3 — "Husky: git hooks para testes e lint antes de commits". | Hook `pre-commit` rodando lint+test nos arquivos staged. | 🟡 P1 | S | [x] |
| QA-03 | **Commitlint (Conventional Commits)** | Cap. 4.3. | `commitlint.config` + hook `commit-msg`. | 🟢 P2 | XS | [x] |
| QA-04 | **CI no GitHub Actions** (lint + type-check + test + build) | Cap. 8.1 — verificação final antes de produção; PRs → preview. | `.github/workflows/ci.yml` rodando `pnpm lint`, `type-check`, `test`, `build` em cada PR. | 🔴 P0 | S | [x] |
| QA-05 | **Threshold de cobertura de testes** | Cap. 6.2 — TDD rigoroso. Hoje sem `coverageThreshold`. | Definir limites mínimos em `jest.config.ts` (ex.: 70% global, 90% em `lib/`). | 🟢 P2 | XS | [x] |
| QA-06 | **Subir cobertura de testes** | Reforçar o diferencial D3/D4 ("nosso site tem N testes"). | Cobrir componentes/rotas ainda sem teste (ex.: `seo-audit-form`, `auditoria-form`, páginas de serviço). | 🟢 P2 | M | [x] |

---

## 5. SEO / AEO / GEO (refinamentos)

| ID | Tarefa | Por quê (ref. guia) | Como / Critério de aceite | Prio | Esf | Status |
|----|--------|---------------------|---------------------------|------|-----|--------|
| GEO-01 | **`llms-full.txt`** além do `llms.txt` | Cap. 2.3 — "implementar llms.txt + llms-full.txt para não perder a vantagem". | Gerar versão completa (todo o conteúdo enciclopédico) na raiz. | 🟡 P1 | S | [x] |
| GEO-02 | **Validar todos os Schemas** (Rich Results Test) | Cap. 6.8 / A.3 — Schema completo é fator de citação por IA. | Rodar cada página no validador do Google; corrigir warnings. **Parcial:** 78 JSON-LD validados estruturalmente no servidor (0 inválidos); `Article` ganhou `image`/`dateModified`. Falta o Rich Results Test (semântico) no preview. | 🟡 P1 | M | [~] |
| AEO-01 | **"Definição em caixa" + respostas em 40-60 palavras** nos artigos | Cap. 6.7 — táticas AEO para Featured Snippets. | Revisar `content/blog.ts`: 1ª resposta logo após o H2, em 40-60 palavras; bloco de definição destacado. | 🟢 P2 | M | [ ] |
| AEO-02 | **Conteúdo Hub & Spoke no blog** | Cap. 7 — clusters (hub: Guia GEO; spokes: artigos). | Mapear e completar a estrutura de clusters do blog. | 🟢 P2 | L | [ ] |
| GEO-03 | **Rotina de baseline de citação em IA** | Cap. 6.8 — testar perguntas no ChatGPT/Perplexity/AI Overview e registrar evolução. | Documentar perguntas-baseline e cadência de reteste (operacional + possível dashboard). | 🟢 P2 | M | [ ] |

---

## 6. Performance & Acessibilidade (prova mensurável)

| ID | Tarefa | Por quê (ref. guia) | Como / Critério de aceite | Prio | Esf | Status |
|----|--------|---------------------|---------------------------|------|-----|--------|
| PERF-01 | **Medir Core Web Vitals reais** (Lighthouse/PSI) | Cap. 6.5 / 8.2 — metas LCP < 0,8s, INP < 200ms, CLS < 0,05; "Lighthouse > 95". | Rodar PageSpeed nas páginas-chave; registrar baseline; corrigir o que ficar fora da meta (peso do hero PNG é suspeito — ver pendência do diário). | 🔴 P0 | M | [ ] |
| PERF-02 | **Otimizar imagem do hero** | Diário 2026-06-09 já lista "otimizar hero PNG" como pendência. | Converter para WebP/AVIF, dimensionar corretamente; confirmar ganho de LCP. | 🟡 P1 | S | [x] |
| A11Y-01 | **Auditoria de acessibilidade WCAG AA** | Cap. 8.1 — contraste AA, alt text, navegação por teclado, ARIA. | Lighthouse/axe (Chrome local) → home **a11y 100**, SEO 100, best-practices 100. Corrigidos: labels (`useId`), `<select>`/`<textarea>` rotulados, semântica de lista, e contraste AA (teal/pêssego de texto escurecidos). | 🟡 P1 | M | [x] |
| PERF-03 | **`prefers-reduced-motion`** nas animações | Boa prática a11y; o `CrossParticles` (1600 partículas) e Framer Motion são pesados em motion. | Respeitar `prefers-reduced-motion` (desligar/atenuar animações). FadeIn já respeitava; faltava o CrossParticles. | 🟢 P2 | S | [x] |

---

## 7. Consistência / Conteúdo / Polish

| ID | Tarefa | Por quê | Como / Critério de aceite | Prio | Esf | Status |
|----|--------|---------|---------------------------|------|-----|--------|
| POL-01 | **Corrigir URL inconsistente** do autor | `cases.ts`: `defaultAuthor.url = "https://orbee.com.br"` diverge de `orbeelabs.com` usado no resto. | Padronizar para `orbeelabs.com`. | 🔴 P0 | XS | [x] |
| POL-02 | **Atualizar modelo de IA padrão** | `ai-model.ts`: default `claude-sonnet-4-20250514` (antigo). Atuais: Sonnet 4.6 / Opus 4.8. | Atualizar `DEFAULT_MODEL`/`AI_MODEL` e `env.example` para o modelo atual recomendado. | 🟡 P1 | XS | [x] |
| POL-03 | **Alinhar estrutura de pastas ao guia** (opcional) | Cap. 5/6 — guia usa `components/sections/` e `__tests__/`; app usa `home/` e testes co-localizados. | Decisão de estilo: manter (documentar desvio) ou renomear. Baixa prioridade. | 🟢 P2 | S | [ ] |
| POL-04 | **Revisar conteúdo vs tom de voz Mago+Rebelde** | Cap. 1.7/1.8 — data-driven, sem promessa, com prova. | Passar o copy das páginas pelo checklist FAZER/NÃO-FAZER do guia. | 🟢 P2 | M | [ ] |

---

## Ordem de execução sugerida (sprints)

### 🔴 Sprint 1 — Crítico & quick-wins (1 dia)
`POL-01` (URL) · `SEG-02` (rate-limit IA) · `CMP-01` (filtrar saída IA) · `SEG-03` (parse robusto) · `POL-02` (modelo IA) · `QA-04` (CI) · `SEG-01` (CSP)

### 🟡 Sprint 2 — Paridade com o guia (2-3 dias)
`CMP-02` (CFP/CFO) · `CMP-05` (páginas legais) · `CMP-03` (exclusão dados) · `QA-01`/`QA-02` (Prettier/Husky) · `GEO-01` (llms-full) · `GEO-02` (validar Schema) · `PERF-01`/`PERF-02` (CWV + hero) · `A11Y-01`

### 🟡 Sprint 3 — Lead magnet & robustez (2-3 dias)
`LM-01` (Calculadora ROI) · `SEG-04` (Upstash) · `QA-05`/`QA-06` (cobertura)

### 🟢 Sprint 4 — Polimento final (contínuo)
`AEO-01`/`AEO-02` · `GEO-03` · `CMP-04` · `PERF-03` · `POL-03`/`POL-04` · `SEG-05` · `LM-02` · `QA-03`

---

## Definição de "100%"

A aplicação será considerada **100/100** quando:

1. ✅ Todos os itens 🔴 P0 e 🟡 P1 estiverem `[x]`.
2. ✅ Lighthouse ≥ 95 (Performance/SEO/A11y/Best Practices) nas páginas-chave.
3. ✅ Core Web Vitals dentro das metas do guia (LCP < 0,8s, INP < 200ms, CLS < 0,05) em mobile.
4. ✅ CI verde (lint + type-check + test + build) em todo PR.
5. ✅ Todos os Schemas validados sem erro no Rich Results Test.
6. ✅ Checklist de compliance (LGPD + CFM/CFP/CFO) 100% atendido, incluindo filtragem da saída de IA.
7. ✅ Paridade de lead magnets com o guia (Calculadora ROI entregue).

---

> **Total de itens:** 30 · **P0:** 7 · **P1:** 13 · **P2:** 10
> Este documento é vivo — atualizar status conforme avançamos.
