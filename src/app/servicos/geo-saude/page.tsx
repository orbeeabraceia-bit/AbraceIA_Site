import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqAccordion } from "@/components/seo/faq-accordion";
import { createPageMetadata } from "@/lib/metadata";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";

type ServicePageProps = {
  title: string;
  description: string;
  h1: string;
  keyword: string;
  path: string;
  sections: { heading: string; body: string }[];
  faq?: { question: string; answer: string }[];
};

function ServicePage({
  title,
  description,
  h1,
  keyword,
  path,
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
      <article className="mx-auto max-w-[1400px] px-4 py-20 md:px-8">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:h-fit">
            <p className="text-sm font-bold uppercase tracking-widest text-ai">{keyword}</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-navy md:text-5xl lg:text-[3.5rem] lg:leading-[1.1] text-balance">{h1}</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{description}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/auditoria-ia">
                <Button intent="ai" className="rounded-full">Auditoria de presença em IA</Button>
              </Link>
              <Link href="/contato">
                <Button intent="outline" className="rounded-full">Falar com especialista</Button>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="space-y-12">
              {sections.map((section) => (
                <section key={section.heading} className="rounded-3xl border border-border bg-white p-8 shadow-sm">
                  <h2 className="font-display text-2xl font-bold text-navy">{section.heading}</h2>
                  <p className="mt-4 text-lg text-muted-foreground">{section.body}</p>
                </section>
              ))}
            </div>
            {faq.length > 0 && (
              <section className="mt-20">
                <h2 className="font-display text-3xl font-bold text-navy">Perguntas frequentes</h2>
                <div className="mt-8">
                  <FaqAccordion items={faq} />
                </div>
              </section>
            )}
          </div>
        </div>
      </article>
    </>
  );
}

export const metadata: Metadata = createPageMetadata({
  title: "GEO para Saúde — Como aparecer no ChatGPT",
  description:
    "Serviço de GEO (Generative Engine Optimization) para clínicas e médicos em BH. Citação em IAs com compliance CFM.",
  path: "/servicos/geo-saude",
  keywords: ["GEO saúde", "como aparecer no ChatGPT clínica", "Generative Engine Optimization médico"],
});

export default function GeoSaudePage() {
  return (
    <ServicePage
      title="GEO para Saúde"
      keyword="como aparecer no ChatGPT (saúde)"
      h1="Faça sua clínica ser citada por IAs generativas"
      description="Otimizamos llms.txt, conteúdo enciclopédico, Schema e E-E-A-T para ChatGPT, Perplexity, Claude e Google AI Overview — dentro da ética do seu conselho."
      path="/servicos/geo-saude"
      sections={[
        {
          heading: "Baseline de citação",
          body: "Testamos em ChatGPT e Perplexity se sua clínica já é citada e registramos a evolução em 90 dias — prova auditável para o case.",
        },
        {
          heading: "Conteúdo enciclopédico YMYL",
          body: "Artigos com autor credenciado (CRM + RQE) e revisor visível. Páginas sem E-E-A-T são excluídas de citações em saúde.",
        },
      ]}
      faq={[
        {
          question: "GEO substitui SEO?",
          answer:
            "Não. GEO complementa o SEO tradicional. Você precisa ranquear no Google e ser citado nas IAs — fazemos os dois.",
        },
        {
          question: "Quais IAs vocês monitoram?",
          answer:
            "ChatGPT, Perplexity, Claude, Gemini e Google AI Overview — com baseline documentado e reteste em 90 dias.",
        },
        {
          question: "É permitido pelo CFM?",
          answer:
            "Sim, quando o conteúdo é informativo, sem promessas de cura e com autor/revisor identificados — seguimos Cap. 1.6 do Livro-Guia.",
        },
      ]}
    />
  );
}
