import type { Metadata } from "next";
import { cases } from "@/lib/content/cases";
import { CaseCard } from "@/components/cases/case-card";
import { ClientPortfolioStrip } from "@/components/cases/client-portfolio-strip";
import { JsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { collectionPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Cases — Portfólio Orbee Labs Saúde",
  description:
    "Sites em produção: neuropediatria, ortopedia, geriatria e psicologia TCC — administrados pela AbraceIA em Belo Horizonte.",
  path: "/cases",
});

export default function CasesPage() {
  return (
    <div className="mx-auto max-w-[1500px] px-4 py-20 md:px-8">
      <JsonLd
        data={[
          collectionPageSchema({
            name: "Cases — Portfólio Orbee Labs Saúde",
            description:
              "Sites em produção administrados pela AbraceIA: neuropediatria, ortopedia, geriatria e psicologia TCC.",
            path: "/cases",
            items: cases.map((c) => ({ name: c.title, path: `/cases/${c.slug}` })),
          }),
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Cases", path: "/cases" },
          ]),
        ]}
      />
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:sticky lg:top-32 lg:h-fit">
          <h1 className="font-display text-4xl font-bold tracking-tight text-navy lg:text-5xl">Cases</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Portfólio Orbee Labs em produção: neuropediatria, ortopedia, geriatria e psicologia
            clínica em Belo Horizonte — sites que a AbraceIA administra e evolui continuamente.
          </p>
        </div>
        
        <div className="lg:col-span-8">
          <ClientPortfolioStrip className="rounded-3xl border border-border bg-white p-4 shadow-sm" showCaseLinks />
          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {cases.map((c) => (
              <CaseCard key={c.slug} caseStudy={c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
