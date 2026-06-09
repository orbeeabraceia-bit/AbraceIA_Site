import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCase, cases } from "@/lib/content/cases";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return createPageMetadata({
    title: c.title,
    description: c.challenge,
    path: `/cases/${slug}`,
  });
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Cases", path: "/cases" },
            { name: c.title, path: `/cases/${slug}` },
          ]),
        ]}
      />
      <article className="mx-auto max-w-5xl px-4 py-16 md:px-6">
        <p className="text-sm text-ai">{c.specialty} · {c.timeline}</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-navy">{c.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{c.credentials} · {c.location}</p>
        <a
          href={c.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-medium text-ai hover:underline"
        >
          Visitar {c.websiteUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} ↗
        </a>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-navy">Desafio</h2>
          <p className="mt-2 text-muted-foreground">{c.challenge}</p>
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-navy">Solução</h2>
          <p className="mt-2 text-muted-foreground">{c.solution}</p>
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-navy">Resultados</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {c.metrics.map((m) => (
              <div key={m.label} className="rounded-card border border-border p-4">
                <p className="text-sm font-semibold text-navy">{m.label}</p>
                <p className="mt-1 text-ai">
                  {m.before} → {m.after}
                </p>
              </div>
            ))}
          </div>
          {c.aiCitations && (
            <p className="mt-4 text-sm text-muted-foreground">
              Citações em IA: {c.aiCitations.before} → {c.aiCitations.after}
            </p>
          )}
          {c.aiNote && (
            <p className="mt-2 text-sm text-muted-foreground">{c.aiNote}</p>
          )}
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-navy">Evidências (GSC · GA4 · CWV)</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Métricas auditáveis disponíveis sob NDA do cliente. Solicite prints na auditoria
            comercial.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {["Google Search Console", "Google Analytics 4", "Core Web Vitals"].map((label) => (
              <div
                key={label}
                className="flex h-24 items-center justify-center rounded-card border border-dashed border-border bg-muted text-xs text-muted-foreground"
              >
                {label}
                <br />
                (sob NDA)
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-navy">Stack</h2>
          <p className="mt-2 text-muted-foreground">{c.stack}</p>
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-navy">O que faríamos diferente</h2>
          <p className="mt-2 text-muted-foreground">{c.lesson}</p>
        </section>
        {c.quote && (
          <blockquote className="mt-8 border-l-4 border-care bg-teal-50 p-4 italic text-navy">
            &ldquo;{c.quote.text}&rdquo;
            <footer className="mt-2 text-sm not-italic text-muted-foreground">— {c.quote.author}</footer>
          </blockquote>
        )}
        <Link href="/contato" className="mt-10 inline-block">
          <Button intent="ai">Quero resultados assim</Button>
        </Link>
      </article>
    </>
  );
}
