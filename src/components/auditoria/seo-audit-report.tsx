"use client";

import { AlertTriangle, CheckCircle2, Gauge, Search, Target, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SeoAuditResult, SeoStatus } from "@/lib/seo-audit";

function scoreLabel(score: number) {
  if (score >= 80) return { text: "Excelente!", color: "text-care" };
  if (score >= 60) return { text: "Bom, mas pode melhorar", color: "text-gold-600" };
  return { text: "Precisa de melhorias significativas", color: "text-danger" };
}

function scoreStroke(score: number) {
  if (score >= 80) return "var(--color-care)";
  if (score >= 60) return "var(--color-gold)";
  return "var(--color-danger)";
}

function ScoreRing({ score, label }: { score: number; label: string }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.max(0, Math.min(100, score)) / 100) * circ;
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="var(--color-muted)" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke={scoreStroke(score)}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-bold text-navy">{score}</span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      <p className="mt-2 text-sm font-semibold text-navy">{label}</p>
    </div>
  );
}

const STATUS_STYLES: Record<SeoStatus, { icon: typeof CheckCircle2; cls: string }> = {
  good: { icon: CheckCircle2, cls: "text-care" },
  warning: { icon: AlertTriangle, cls: "text-gold-600" },
  error: { icon: XCircle, cls: "text-danger" },
};

function StatusRow({ label, value, status }: { label: string; value: string; status: SeoStatus }) {
  const { icon: Icon, cls } = STATUS_STYLES[status];
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/60 py-2.5 last:border-0">
      <span className="text-sm text-navy">{label}</span>
      <span className={cn("flex items-center gap-1.5 text-sm font-medium", cls)}>
        {value}
        <Icon className="h-4 w-4 shrink-0" />
      </span>
    </div>
  );
}

export function SeoAuditReport({
  result,
  onRestart,
}: {
  result: SeoAuditResult;
  onRestart: () => void;
}) {
  const { text: scoreText, color } = scoreLabel(result.overallScore);
  const t = result.technical;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-ai-500">Relatório Técnico Completo</p>
        <p className="mt-1 break-all text-sm text-muted-foreground">{result.url}</p>
      </div>

      {/* Scores */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-card border border-border bg-white p-6">
          <p className="mb-4 text-center text-sm font-semibold text-navy">Score de SEO</p>
          <ScoreRing score={result.overallScore} label={scoreText} />
        </div>
        <div className="rounded-card border border-border bg-white p-6">
          <p className="mb-4 text-center text-sm font-semibold text-navy">Score de Performance (estimado)</p>
          <ScoreRing score={result.performance.score} label={scoreLabel(result.performance.score).text} />
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        As métricas de performance (LCP, FCP, CLS) são estimativas calculadas a partir do tempo de
        resposta e do peso da página. Para Core Web Vitals medidos em usuários reais, consulte o
        PageSpeed Insights e o Google Search Console.
      </p>

      <p className={cn("text-center font-display text-lg font-bold", color)}>{scoreText}</p>

      {/* Análise Técnica */}
      <div className="rounded-card border border-border p-5">
        <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-navy">
          <Gauge className="h-5 w-5 text-ai-500" /> Análise Técnica
        </h3>
        <StatusRow
          label="Meta Title"
          value={t.title.length ? `${t.title.length} caracteres` : "Ausente"}
          status={t.title.status}
        />
        <StatusRow
          label="Meta Description"
          value={t.description.length ? `${t.description.length} caracteres` : "Ausente"}
          status={t.description.status}
        />
        <StatusRow
          label="Heading Structure"
          value={`${t.headings.h1} H1 · ${t.headings.h2} H2`}
          status={t.headings.status}
        />
        <StatusRow
          label="Imagens Alt Text"
          value={`${t.images.withoutAlt}/${t.images.total} sem alt`}
          status={t.images.status}
        />
        <StatusRow
          label="Links Internos"
          value={`${t.links.internal} internos · ${t.links.external} externos`}
          status={t.links.status}
        />
        <StatusRow
          label="Meta Tags (viewport/charset)"
          value={t.metaTags.viewport && t.metaTags.charset ? "OK" : "Incompleto"}
          status={t.metaTags.status}
        />
        <StatusRow
          label="Mobile-First Indexing"
          value={result.mobile.status === "good" ? "Responsivo" : "Pode melhorar"}
          status={result.mobile.status}
        />
        <StatusRow
          label="HTTPS / Segurança"
          value={result.security.https ? `HTTPS · ${result.security.securityHeaders.length} headers` : "Sem HTTPS"}
          status={result.security.status}
        />
      </div>

      {/* Análise de Conteúdo */}
      <div className="rounded-card border border-border p-5">
        <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-navy">
          <Search className="h-5 w-5 text-ai-500" /> Análise de Conteúdo
        </h3>
        <StatusRow
          label="Contagem de Palavras"
          value={`${result.content.wordCount} palavras`}
          status={result.content.status}
        />
        <StatusRow
          label="Densidade de Palavras-chave"
          value={`${result.content.keywordDensity}%`}
          status={result.content.keywordDensity > 0 && result.content.keywordDensity < 4 ? "good" : "warning"}
        />
        <StatusRow
          label="Velocidade de Carregamento (LCP estimado)"
          value={`${(result.performance.metrics.largestContentfulPaint / 1000).toFixed(1)}s`}
          status={result.performance.metrics.largestContentfulPaint > 2500 ? "warning" : "good"}
        />
        <StatusRow
          label="Conteúdo Misto"
          value={result.security.mixedContent ? "Detectado" : "Não detectado"}
          status={result.security.mixedContent ? "warning" : "good"}
        />
      </div>

      {/* Problemas críticos */}
      {result.criticalIssues.length > 0 && (
        <div className="rounded-card border border-danger/30 bg-danger/5 p-5">
          <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-danger">
            <XCircle className="h-5 w-5" /> Problemas Críticos
          </h3>
          <ul className="space-y-2">
            {result.criticalIssues.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-navy">
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" /> {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recomendações */}
      {result.recommendations.length > 0 && (
        <div className="rounded-card border border-ai-100 bg-ai-50 p-5">
          <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-navy">
            <Target className="h-5 w-5 text-ai-500" /> Recomendações Prioritárias
          </h3>
          <ul className="space-y-2">
            {result.recommendations.map((r, i) => (
              <li key={r} className="flex items-start gap-3 text-sm text-navy">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ai-500 text-xs font-bold text-white">
                  {i + 1}
                </span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Próximos Passos / CTA */}
      <div className="rounded-card orbee-btn-gradient p-6 text-center text-white">
        <h3 className="font-display text-xl font-bold">Próximos Passos</h3>
        <p className="mx-auto mt-2 max-w-lg text-sm text-white/90">
          Quer transformar essas recomendações em resultado? A AbraceIA implementa as correções e
          acompanha sua evolução nos mecanismos de busca e nas IAs generativas.
        </p>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/contato">
            <Button intent="care" className="bg-white text-navy hover:bg-white/90">
              Falar com um especialista
            </Button>
          </Link>
          <Button intent="ghost" className="text-white hover:bg-white/10" onClick={onRestart}>
            Analisar outro site
          </Button>
        </div>
      </div>
    </div>
  );
}
