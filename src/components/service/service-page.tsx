import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqAccordion } from "@/components/seo/faq-accordion";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import type { FaqItem } from "@/lib/content/faq";

type ButtonIntent = "ai" | "primary" | "outline";

export type ServiceSection = {
  heading: string;
  body?: string;
  items?: string[];
};

export type ServiceCta = {
  href: string;
  label: string;
  intent?: ButtonIntent;
};

export type ServicePageProps = {
  title: string;
  description: string;
  h1: string;
  /** Texto do eyebrow (palavra-chave principal). */
  keyword: string;
  path: string;
  ctas: ServiceCta[];
  sections: ServiceSection[];
  faq?: FaqItem[];
};

export function ServicePage({
  title,
  description,
  h1,
  keyword,
  path,
  ctas,
  sections,
  faq = [],
}: ServicePageProps) {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema(title, description, path),
          ...(faq.length ? [faqSchema(faq)] : []),
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: title, path },
          ]),
        ]}
      />
      <div className="relative overflow-hidden bg-gradient-to-b from-cream/40 via-white to-white">
        {/* Glow de fundo sutil (mesma linguagem do hero) */}
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-care/5 opacity-60 blur-3xl" />

        <article className="mx-auto max-w-[1500px] px-4 py-20 md:px-8 md:py-24">
          <div className="grid gap-16 lg:grid-cols-12">
            {/* Coluna sticky: eyebrow + h1 + CTAs */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 lg:h-fit">
              <span className="inline-flex items-center rounded-full border border-care/20 bg-care/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-care backdrop-blur-sm">
                {keyword}
              </span>
              <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-navy md:text-5xl lg:text-[3.5rem] lg:leading-[1.1] text-balance">
                {h1}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{description}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                {ctas.map((cta, i) => (
                  <Link key={cta.href} href={cta.href}>
                    <Button intent={cta.intent ?? (i === 0 ? "ai" : "outline")} className="rounded-full">
                      {cta.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            {/* Coluna de conteúdo: cards numerados */}
            <div className="lg:col-span-7">
              <div className="space-y-6">
                {sections.map((section, i) => (
                  <section
                    key={section.heading}
                    className="group relative overflow-hidden rounded-3xl border border-border/70 bg-white p-8 shadow-sm shadow-navy/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-care/30 hover:shadow-md"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-care/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex items-start gap-4">
                      <span
                        aria-hidden
                        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-care/10 font-display text-sm font-bold text-care transition-colors group-hover:bg-care group-hover:text-white"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h2 className="font-display text-2xl font-bold text-navy">{section.heading}</h2>
                        {section.body && (
                          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{section.body}</p>
                        )}
                        {section.items && (
                          <ul className="mt-4 space-y-2.5">
                            {section.items.map((item) => (
                              <li key={item} className="flex items-start gap-2.5 text-lg text-muted-foreground">
                                <span aria-hidden className="mt-1 text-care">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </section>
                ))}
              </div>

              {faq.length > 0 && (
                <section className="mt-16">
                  <h2 className="font-display text-3xl font-bold text-navy">Perguntas frequentes</h2>
                  <div className="mt-8">
                    <FaqAccordion items={faq} />
                  </div>
                </section>
              )}
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
