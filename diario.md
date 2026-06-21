# Diário — AbraceIA

Documentação local em `docs/` (ignorada pelo Git).

## Entradas

| Data | Arquivo | Resumo |
|------|---------|--------|
| 2026-06-20 | [ROADMAP-100.md](../ROADMAP-100.md) | Rumo ao 100/100: segurança (CSP, rate-limit IA), compliance (CFP/CFO, consent por finalidade, filtro de saída IA), tooling (Prettier/Husky/Commitlint/CI), Calculadora ROI, hero WebP, a11y 100, perf 53→89, box AEO, llms-full.txt. 22/30 itens. |
| 2026-06-09 | [2026-06-09.md](./2026-06-09.md) | Auditoria SEO, layout ampliado, paleta de cores, UI/UX, compliance, GitHub PR #1, branch `feat/seo-aeo-geo`, Antigravity CLI |

---

## 2026-06-20 (resumo)

Execução do **ROADMAP-100** (plano para o "100/100" do Livro-Guia). Tudo
commitado **direto na `main`** com Conventional Commits.

**Entregue (22/30 itens):**
- **Segurança:** CSP por header, rate-limit em IA/quiz/SEO, parse robusto da
  auditoria, Dependabot.
- **Compliance:** filtro de saída da IA (CFM), termos CFP/CFO, consentimento de
  cookies por finalidade (analytics × marketing).
- **Qualidade:** Prettier, Husky + lint-staged, Commitlint, CI (GitHub Actions),
  threshold de cobertura. Testes 70 → **106**.
- **Feature:** **Calculadora de ROI** (`/calculadora-roi`).
- **GEO/AEO:** `llms-full.txt`, `image`/`dateModified` no Article, box
  "Em resumo" (40–60 palavras) nos 11 posts.
- **Performance:** hero PNG→WebP (670K→48K), `CrossParticles` otimizado
  → **TBT 9050ms→20ms**, perf prod **53→89**.
- **Acessibilidade:** **Lighthouse a11y 100** (labels, semântica de lista,
  contraste AA).

**Pendências (decisão/infra):** medir LCP e validar Schemas no preview Vercel
(PERF-01/GEO-02); páginas legais + DPO (CMP-03/05); opcionais AEO-02, GEO-03,
SEG-04, POL-03/04.

---

## 2026-06-09 (resumo)

Sessão completa documentada em **[2026-06-09.md](./2026-06-09.md)**.

**Manhã (Cursor):** dev server, paleta Teal/Pêssego/Ouro/Ônix/Creme, upgrade Gemini CLI, instalação Antigravity (`agy`), `.gitignore` para `docs/`.

**Tarde (Claude + Antigravity):** ferramenta `/auditoria-seo`, sticky sidebar, hero 3D, portfólio Microlink, compliance CFM, bugs corrigidos, schema SEO/AEO/GEO, PR #1 mergeado.

**Pendências:** abrir PR `feat/seo-aeo-geo`, otimizar hero PNG, migrar para `agy`.
