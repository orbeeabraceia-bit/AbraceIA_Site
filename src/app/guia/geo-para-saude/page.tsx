import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { AuthorBox } from "@/components/seo/author-box";
import { FaqAccordion } from "@/components/seo/faq-accordion";
import { GuiaDownloadCta } from "@/components/guia/guia-download-cta";
import { FadeIn } from "@/components/animations/fade-in";
import { geoGuideFaq, geoGuideSections } from "@/lib/content/geo-guide";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/schema";
import { createPageMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = createPageMetadata({
  title: "O que é GEO em Saúde — Guia Completo",
  description:
    "Guia enciclopédico de GEO para clínicas e médicos em BH. llms.txt, E-E-A-T, Schema e compliance CFM.",
  path: "/guia/geo-para-saude",
  keywords: ["o que é GEO em saúde", "como aparecer no ChatGPT", "GEO saúde BH"],
});

export default function GeoGuiaPage() {
  const wordCount = geoGuideSections.reduce(
    (acc, s) => acc + s.paragraphs.join(" ").split(/\s+/).length,
    0,
  );

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: "GEO para Saúde — Guia Completo",
            description: "Guia enciclopédico AbraceIA",
            path: "/guia/geo-para-saude",
            datePublished: "2026-03-01",
          }),
          faqSchema(geoGuideFaq),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guia GEO", path: "/guia/geo-para-saude" },
          ]),
        ]}
      />
      <article className="mx-auto max-w-5xl px-4 py-16 md:px-6">
        <p className="text-sm font-medium text-ai">o que é GEO em saúde · {wordCount}+ palavras</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-navy">
          GEO para saúde: guia enciclopédico AbraceIA
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Otimização para citação em IAs generativas em Belo Horizonte — método
          auditável, compliance CFM/CFO/CFP e performance comprovada.
        </p>

        {geoGuideSections.map((section, i) => (
          <FadeIn key={section.heading} delay={i * 0.03}>
            <section className="mt-10">
              <h2 className="text-xl font-semibold text-navy">{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="mt-3 text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
            </section>
          </FadeIn>
        ))}

        <AuthorBox />

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-navy">FAQ</h2>
          <div className="mt-4">
            <FaqAccordion items={geoGuideFaq} />
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/auditoria-ia">
            <Button intent="ai">Auditoria de presença em IA gratuita</Button>
          </Link>
          <GuiaDownloadCta />
        </div>
      </article>
    </>
  );
}
