import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { aboutPageSchema, breadcrumbSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/metadata";
import { FadeIn } from "@/components/animations/fade-in";
import { ClientPortfolioStrip } from "@/components/cases/client-portfolio-strip";
import { coreDifferentiators } from "@/lib/content/home-marketing";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Sobre o AbraceIA",
  description: "Vertical de saúde da Orbee Labs: IA responsável, GEO e compliance em BH.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <JsonLd
        data={[
          aboutPageSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Sobre", path: "/sobre" },
          ]),
        ]}
      />
      <article className="mx-auto max-w-5xl px-4 py-16 md:px-6">
        <FadeIn>
          <h1 className="font-display text-3xl font-bold text-navy">Sobre o AbraceIA</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {siteConfig.name} é a vertical da Orbee Labs para saúde em Belo Horizonte —
            arquétipo <strong>Cuidador + Mago</strong>: acolhimento humano e transformação
            via IA responsável.
          </p>
        </FadeIn>

        <ClientPortfolioStrip
          className="mt-10"
          title="Portfólio em produção"
          showCaseLinks
        />

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-navy">Por que o AbraceIA</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {coreDifferentiators.map((item) => (
              <div
                key={item.title}
                className="rounded-card border border-border bg-white p-5 shadow-sm"
              >
                <h3 className="font-display font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-navy">Missão</h2>
          <p className="mt-3 text-muted-foreground">
            Usar IA com responsabilidade para que clínicas sejam encontradas no Google e
            nas IAs generativas, dentro das normas dos conselhos.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-navy">Visão 2030</h2>
          <p className="mt-3 text-muted-foreground">
            Ser referência nacional em presença de saúde na era da IA — citados por
            ChatGPT, Perplexity e AI Overview sem comprometer ética.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-navy">Valores</h2>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>Compliance inegociável (CFM, CFO, CFP, CFN, COFFITO)</li>
            <li>IA com responsabilidade clínica — revisão humana obrigatória</li>
            <li>Excelência data-driven com prints reais (GSC, GA4, CWV)</li>
            <li>Transparência radical com o cliente</li>
            <li>Tecnologia a serviço da empatia</li>
          </ul>
        </section>

        <section className="mt-10 rounded-card border border-care/20 bg-cream p-6">
          <h2 className="text-lg font-semibold text-navy">Tagline</h2>
          <p className="mt-2 text-xl font-display font-bold text-navy">&ldquo;{siteConfig.tagline}&rdquo;</p>
        </section>
      </article>
    </>
  );
}
