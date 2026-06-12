import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqAccordion } from "@/components/seo/faq-accordion";
import { createPageMetadata } from "@/lib/metadata";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";

const faq = [
  {
    question: "SEO médico é diferente de SEO comum?",
    answer:
      "Sim. Conteúdo YMYL exige E-E-A-T, Schema de saúde, compliance CFM/CRM e revisão por profissional habilitado — além de Core Web Vitals rigorosos.",
  },
  {
    question: "Quanto tempo para ver resultados?",
    answer:
      "Primeiros sinais em 60–90 dias para keywords locais; cases auditáveis em 6 meses com arquitetura correta.",
  },
  {
    question: "Vocês garantem posição no Google?",
    answer:
      "Não garantimos posição — garantimos método auditável: arquitetura, Schema, conteúdo e métricas documentadas.",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "SEO para Médico em Belo Horizonte",
  description:
    "SEO arquitetural para profissionais de saúde em BH: keywords, Schema, AEO e Core Web Vitals com compliance dos conselhos.",
  path: "/servicos/seo-medico",
  keywords: ["SEO médico BH", "SEO clínica Belo Horizonte", "AEO saúde"],
});

export default function SeoMedicoPage() {
  const description =
    "SEO médico não é plugin de WordPress — é arquitetura: URL, Schema, conteúdo YMYL e performance nativa.";
  return (
    <>
      <JsonLd
        data={[
          serviceSchema("SEO Médico BH", description, "/servicos/seo-medico"),
          faqSchema(faq),
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "SEO Médico", path: "/servicos/seo-medico" },
          ]),
        ]}
      />
      <article className="mx-auto max-w-5xl px-4 py-16 md:px-6">
        <p className="text-sm font-medium text-ai">SEO para médico BH</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-navy">
          SEO médico com método auditável
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{description}</p>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-navy">Arquitetura desde o código</h2>
          <p className="mt-3 text-muted-foreground">
            URLs semânticas, canonical, sitemap dinâmico e Schema Physician/MedicalBusiness
            implementados no Next.js — não como plugin tardio.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-navy">AEO e featured snippets</h2>
          <p className="mt-3 text-muted-foreground">
            FAQ estruturado, respostas diretas de 40–60 palavras e blocos enciclopédicos para
            Google AI Overview e assistentes de busca.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-navy">Performance certificada</h2>
          <p className="text-muted-foreground">
            LCP ≤ 0,8s, INP ≤ 200ms e CLS ≤ 0,1 — requisitos essenciais do Google para páginas YMYL em
            saúde. Performance nativa em Edge.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-navy">Perguntas frequentes</h2>
          <div className="mt-4">
            <FaqAccordion items={faq} />
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/guia/geo-para-saude">
            <Button intent="ai">Ler guia GEO para saúde</Button>
          </Link>
          <Link href="/contato">
            <Button intent="outline">Falar com especialista</Button>
          </Link>
        </div>
      </article>
    </>
  );
}
