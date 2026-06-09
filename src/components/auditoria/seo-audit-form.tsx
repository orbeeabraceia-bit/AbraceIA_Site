"use client";

import { useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Gauge,
  Loader2,
  Search,
  Target,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import type { SeoAuditResult, SeoStatus } from "@/lib/seo-audit";

const STEPS = [
  { id: 1, title: "URL do Site", description: "Informe a URL do seu site" },
  { id: 2, title: "Dados da Empresa", description: "Informações básicas" },
  { id: 3, title: "Objetivos", description: "O que você quer alcançar" },
  { id: 4, title: "Análise", description: "Relatório completo" },
] as const;

const SETORES = [
  { value: "saude", label: "Saúde" },
  { value: "tecnologia", label: "Tecnologia" },
  { value: "servicos", label: "Serviços" },
  { value: "educacao", label: "Educação" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "industria", label: "Indústria" },
  { value: "outros", label: "Outros" },
];

const OBJETIVOS = [
  { value: "aumentar-visitas", label: "Aumentar visitas" },
  { value: "mais-leads", label: "Gerar mais leads" },
  { value: "vendas-online", label: "Aumentar vendas online" },
  { value: "autoridade", label: "Construir autoridade" },
  { value: "concorrencia", label: "Superar concorrentes" },
];

const FATURAMENTOS = [
  { value: "ate-10k", label: "Até R$ 10.000" },
  { value: "10k-50k", label: "R$ 10.000 - R$ 50.000" },
  { value: "50k-100k", label: "R$ 50.000 - R$ 100.000" },
  { value: "100k-500k", label: "R$ 100.000 - R$ 500.000" },
  { value: "500k+", label: "Acima de R$ 500.000" },
];

type FormData = {
  url: string;
  nomeEmpresa: string;
  setor: string;
  telefone: string;
  email: string;
  objetivo: string;
  faturamento: string;
  palavrasChave: string;
  concorrentes: string;
};

const EMPTY: FormData = {
  url: "",
  nomeEmpresa: "",
  setor: "",
  telefone: "",
  email: "",
  objetivo: "",
  faturamento: "",
  palavrasChave: "",
  concorrentes: "",
};

function Select({
  label,
  value,
  onChange,
  placeholder,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-navy">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex h-11 w-full rounded-btn border border-border bg-white px-3 py-2 text-base text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-care focus-visible:ring-offset-1"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

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

export function SeoAuditForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<SeoAuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const set = (key: keyof FormData) => (v: string) => setData((d) => ({ ...d, [key]: v }));

  function canAdvance() {
    if (step === 1) return data.url.trim().length > 2;
    return true;
  }

  function next() {
    if (step === 3) {
      void runAnalysis();
      return;
    }
    if (!canAdvance()) {
      toast.warning("Informe a URL do seu site para continuar");
      return;
    }
    setStep((s) => Math.min(4, s + 1));
  }

  function prev() {
    setStep((s) => Math.max(1, s - 1));
  }

  async function runAnalysis() {
    setStep(4);
    setLoading(true);
    setError(null);
    setResult(null);
    setProgress(8);
    trackEvent("seo_audit_started", { setor: data.setor, objetivo: data.objetivo });

    progressTimer.current = setInterval(() => {
      setProgress((p) => (p >= 90 ? 90 : p + Math.max(1, Math.round((90 - p) / 8))));
    }, 350);

    try {
      const res = await fetch("/api/analyze-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: data.url, formData: data }),
      });
      if (!res.ok) {
        const e = (await res.json()) as { error?: string };
        throw new Error(e.error || "Erro na análise");
      }
      const payload = (await res.json()) as SeoAuditResult;
      setProgress(100);
      setResult(payload);
      trackEvent("seo_audit_completed", { score: payload.overallScore });
      toast.success("Análise concluída");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro na análise");
      toast.error("Não foi possível concluir a análise");
    } finally {
      if (progressTimer.current) clearInterval(progressTimer.current);
      setLoading(false);
    }
  }

  function restart() {
    setStep(1);
    setData(EMPTY);
    setResult(null);
    setError(null);
    setProgress(0);
  }

  return (
    <div className="rounded-card border border-border bg-white p-5 shadow-sm sm:p-8">
      {/* Stepper */}
      <ol className="mb-8 flex items-center gap-2">
        {STEPS.map((s, i) => {
          const active = step === s.id;
          const done = step > s.id;
          return (
            <li key={s.id} className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                    done && "bg-care text-white",
                    active && "orbee-btn-gradient text-white",
                    !active && !done && "bg-muted text-muted-foreground",
                  )}
                >
                  {done ? <CheckCircle2 className="h-5 w-5" /> : s.id}
                </span>
                <div className="hidden sm:block">
                  <p className={cn("text-sm font-semibold", active ? "text-navy" : "text-muted-foreground")}>
                    {s.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.description}</p>
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <span className={cn("h-0.5 flex-1 rounded", step > s.id ? "bg-care" : "bg-muted")} />
              )}
            </li>
          );
        })}
      </ol>

      {/* Step 1 — URL */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-navy">
            <Search className="h-5 w-5 text-ai-500" />
            <h2 className="font-display text-xl font-bold">URL do Site</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Descubra o potencial do seu site nos mecanismos de busca e receba um relatório completo com
            recomendações personalizadas.
          </p>
          <Input
            label="URL do Site"
            placeholder="Informe a URL do seu site"
            value={data.url}
            onChange={(e) => set("url")(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && next()}
            autoFocus
          />
          <p className="text-xs text-muted-foreground">
            Digite a URL com ou sem protocolo (ex: google.com ou https://google.com)
          </p>
        </div>
      )}

      {/* Step 2 — Dados da Empresa */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-navy">
            <Target className="h-5 w-5 text-ai-500" />
            <h2 className="font-display text-xl font-bold">Dados da sua empresa</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Essas informações nos ajudam a personalizar a análise.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Nome da Empresa"
              placeholder="Sua Empresa LTDA"
              value={data.nomeEmpresa}
              onChange={(e) => set("nomeEmpresa")(e.target.value)}
            />
            <Select
              label="Setor de Atuação"
              placeholder="Selecione o setor"
              value={data.setor}
              onChange={set("setor")}
              options={SETORES}
            />
            <Input
              label="Telefone"
              placeholder="(31) 90000-0000"
              value={data.telefone}
              onChange={(e) => set("telefone")(e.target.value)}
            />
            <Input
              label="E-mail"
              type="email"
              placeholder="contato@empresa.com"
              value={data.email}
              onChange={(e) => set("email")(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Step 3 — Objetivos */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-navy">
            <Gauge className="h-5 w-5 text-ai-500" />
            <h2 className="font-display text-xl font-bold">Seus objetivos</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Conte-nos o que você quer alcançar com seu site.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Principal Objetivo"
              placeholder="Selecione o objetivo"
              value={data.objetivo}
              onChange={set("objetivo")}
              options={OBJETIVOS}
            />
            <Select
              label="Faturamento Mensal"
              placeholder="Selecione"
              value={data.faturamento}
              onChange={set("faturamento")}
              options={FATURAMENTOS}
            />
          </div>
          <Input
            label="Palavras-chave Principais"
            placeholder="marketing digital, seo, agência"
            value={data.palavrasChave}
            onChange={(e) => set("palavrasChave")(e.target.value)}
          />
          <Input
            label="Principais Concorrentes"
            placeholder="site1.com, site2.com, site3.com"
            value={data.concorrentes}
            onChange={(e) => set("concorrentes")(e.target.value)}
          />
        </div>
      )}

      {/* Step 4 — Análise / Relatório */}
      {step === 4 && (
        <div>
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Loader2 className="h-10 w-10 animate-spin text-ai-500" />
              <p className="mt-4 font-display text-lg font-bold text-navy">Analisando seu site...</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Estamos verificando mais de 50 fatores de SEO.
              </p>
              <div className="mt-6 h-3 w-full max-w-md overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-ai-500 to-care transition-[width] duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{progress}%</p>
            </div>
          )}

          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <XCircle className="h-10 w-10 text-danger" />
              <p className="mt-4 font-semibold text-navy">{error}</p>
              <Button intent="outline" className="mt-6" onClick={() => setStep(1)}>
                Tentar novamente
              </Button>
            </div>
          )}

          {result && !loading && <Report result={result} onRestart={restart} />}
        </div>
      )}

      {/* Navegação */}
      {step < 4 && (
        <div className="mt-8 flex items-center justify-between">
          <Button intent="ghost" onClick={prev} disabled={step === 1}>
            <ArrowLeft className="h-4 w-4" /> Anterior
          </Button>
          <Button intent="ai" onClick={next}>
            {step === 3 ? "Analisar site" : "Próximo"} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

function Report({ result, onRestart }: { result: SeoAuditResult; onRestart: () => void }) {
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
          <p className="mb-4 text-center text-sm font-semibold text-navy">Score de Performance</p>
          <ScoreRing score={result.performance.score} label={scoreLabel(result.performance.score).text} />
        </div>
      </div>

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
          label="Velocidade de Carregamento (LCP)"
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
