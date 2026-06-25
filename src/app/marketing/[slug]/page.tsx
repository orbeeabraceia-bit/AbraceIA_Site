import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { landings, getLanding, type LandingAccent } from "@/lib/content/landings";
import { getCase } from "@/lib/content/cases";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqAccordion } from "@/components/seo/faq-accordion";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

const ACCENTS: Record<
  LandingAccent,
  { heroGrad: string; band: string; chip: string; num: string; check: string; cardHover: string; pill: string }
> = {
  cyan: {
    heroGrad: "from-cyan-600 via-cyan-500 to-teal-500",
    band: "from-cyan-600 to-teal-600",
    chip: "bg-white/15 text-white ring-1 ring-white/30",
    num: "bg-cyan-100 text-cyan-700",
    check: "text-cyan-600",
    cardHover: "hover:border-cyan-300",
    pill: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200",
  },
  violet: {
    heroGrad: "from-violet-600 via-violet-500 to-fuchsia-500",
    band: "from-violet-600 to-fuchsia-600",
    chip: "bg-white/15 text-white ring-1 ring-white/30",
    num: "bg-violet-100 text-violet-700",
    check: "text-violet-600",
    cardHover: "hover:border-violet-300",
    pill: "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
  },
  emerald: {
    heroGrad: "from-emerald-600 via-emerald-500 to-teal-500",
    band: "from-emerald-600 to-teal-600",
    chip: "bg-white/15 text-white ring-1 ring-white/30",
    num: "bg-emerald-100 text-emerald-700",
    check: "text-emerald-600",
    cardHover: "hover:border-emerald-300",
    pill: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  },
  amber: {
    heroGrad: "from-amber-500 via-orange-500 to-rose-500",
    band: "from-amber-500 to-orange-600",
    chip: "bg-white/15 text-white ring-1 ring-white/30",
    num: "bg-amber-100 text-amber-700",
    check: "text-amber-600",
    cardHover: "hover:border-amber-300",
    pill: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  },
  rose: {
    heroGrad: "from-rose-600 via-rose-500 to-pink-500",
    band: "from-rose-600 to-pink-600",
    chip: "bg-white/15 text-white ring-1 ring-white/30",
    num: "bg-rose-100 text-rose-700",
    check: "text-rose-600",
    cardHover: "hover:border-rose-300",
    pill: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
  },
};

export async function generateStaticParams() {
  return landings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const l = getLanding(slug);
  if (!l) return {};
  return createPageMetadata({
    title: l.metaTitle,
    description: l.metaDescription,
    path: `/marketing/${slug}`,
    keywords: l.keywords,
  });
}

export default async function LandingPage({ params }: Props) {
  const { slug } = await params;
  const l = getLanding(slug);
  if (!l) notFound();

  const a = ACCENTS[l.accent];
  const relatedCase = l.relatedCaseSlug ? getCase(l.relatedCaseSlug) : undefined;
  const others = landings.filter((x) => x.slug !== l.slug);
  const path = `/marketing/${l.slug}`;

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(l.metaTitle, l.metaDescription, path),
          faqSchema(l.faq),
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: `${l.shortLabel} em BH`, path },
          ]),
        ]}
      />

      {/* HERO */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${a.heroGrad} text-white`}>
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-black/10 blur-3xl" />
        <div className="mx-auto max-w-[1500px] px-4 py-20 md:px-8 md:py-28">
          <div className="max-w-3xl">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest backdrop-blur-sm ${a.chip}`}>
              {l.hero.eyebrow}
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-balance md:text-6xl">
              {l.hero.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">{l.hero.sub}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contato"
                className="rounded-full bg-white px-7 py-3.5 font-semibold text-navy shadow-lg shadow-black/10 transition hover:scale-[1.03]"
              >
                Quero atrair pacientes
              </Link>
              <Link
                href="/auditoria-ia"
                className="rounded-full px-7 py-3.5 font-semibold text-white ring-2 ring-white/40 transition hover:bg-white/10"
              >
                Auditoria gratuita de presença em IA
              </Link>
            </div>
            <p className="mt-8 text-sm font-medium text-white/80">
              Belo Horizonte e região · Citação em ChatGPT, Perplexity e Google AI · {l.council}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1500px] px-4 md:px-8">
        {/* DORES */}
        <section className="py-20">
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
            O que trava {l.shortLabel.toLowerCase()} em BH hoje
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {l.pains.map((p) => (
              <div
                key={p.title}
                className={`rounded-3xl border border-border bg-white p-7 shadow-sm transition hover:-translate-y-0.5 ${a.cardHover}`}
              >
                <h3 className="font-display text-xl font-bold text-navy">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ENTREGA */}
        <section className="pb-20">
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
            O que a AbraceIA constrói para você
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {l.deliver.map((d, i) => (
              <div
                key={d.title}
                className={`group rounded-3xl border border-border bg-white p-7 shadow-sm transition hover:-translate-y-0.5 ${a.cardHover}`}
              >
                <span className={`flex h-11 w-11 items-center justify-center rounded-2xl font-display text-base font-bold ${a.num}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-navy">{d.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COMPLIANCE */}
        <section className="pb-20">
          <div className="flex flex-col gap-5 rounded-3xl border border-border bg-cream p-8 md:flex-row md:items-center md:p-10">
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl ${a.pill}`} aria-hidden>
              ✓
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">Dentro da régua do conselho</h2>
              <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{l.complianceNote}</p>
            </div>
          </div>
        </section>

        {/* PROVA SOCIAL */}
        {relatedCase && (
          <section className="pb-20">
            <div className="rounded-3xl border border-border bg-white p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Prova real no portfólio</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-navy">
                {relatedCase.clientName} — {relatedCase.specialty}
              </h2>
              <div className="mt-5 flex flex-wrap gap-4">
                <Link href={`/cases/${l.relatedCaseSlug}`} className={`font-semibold underline-offset-4 hover:underline ${ACCENTS[l.accent].check}`}>
                  Ver o case →
                </Link>
                <a
                  href={relatedCase.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground underline-offset-4 hover:underline"
                >
                  Visitar o site ao vivo
                </a>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="pb-20">
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Perguntas frequentes</h2>
          <div className="mt-8 max-w-3xl">
            <FaqAccordion items={l.faq} />
          </div>
        </section>
      </div>

      {/* CTA FINAL */}
      <section className={`bg-gradient-to-r ${a.band} text-white`}>
        <div className="mx-auto max-w-[1500px] px-4 py-16 text-center md:px-8 md:py-20">
          <h2 className="font-display text-3xl font-bold md:text-4xl text-balance">
            Pronto para encher a agenda com o paciente certo?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Comece por uma auditoria gratuita da sua presença digital e em IA. Sem promessa de resultado — só método e dados.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/contato" className="rounded-full bg-white px-8 py-4 font-semibold text-navy shadow-lg shadow-black/10 transition hover:scale-[1.03]">
              Falar com a AbraceIA
            </Link>
            <Link href="/auditoria-seo" className="rounded-full px-8 py-4 font-semibold text-white ring-2 ring-white/40 transition hover:bg-white/10">
              Auditoria de SEO
            </Link>
          </div>
        </div>
      </section>

      {/* OUTRAS VERTICAIS */}
      <section className="mx-auto max-w-[1500px] px-4 py-16 md:px-8">
        <h2 className="font-display text-xl font-bold text-navy">Marketing para outras especialidades em BH</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/marketing/${o.slug}`}
              className="rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-care/40 hover:bg-cream"
            >
              {o.shortLabel}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
