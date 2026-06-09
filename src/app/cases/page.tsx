import type { Metadata } from "next";
import { cases } from "@/lib/content/cases";
import { CaseCard } from "@/components/cases/case-card";
import { ClientPortfolioStrip } from "@/components/cases/client-portfolio-strip";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Cases — Portfólio Orbee Labs Saúde",
  description:
    "Sites em produção: neuropediatria, ortopedia, geriatria e psicologia TCC — administrados pela AbraceIA em Belo Horizonte.",
  path: "/cases",
});

export default function CasesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <h1 className="font-display text-3xl font-bold text-navy">Cases</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Portfólio Orbee Labs em produção: neuropediatria, ortopedia, geriatria e psicologia
        clínica em Belo Horizonte — sites que a AbraceIA administra e evolui continuamente.
      </p>
      <ClientPortfolioStrip className="mt-8" showCaseLinks />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {cases.map((c) => (
          <CaseCard key={c.slug} caseStudy={c} />
        ))}
      </div>
    </div>
  );
}
