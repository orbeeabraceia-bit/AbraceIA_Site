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
      "Sim, e muito. Saúde é conteúdo YMYL (“Your Money or Your Life”), que o Google avalia com rigor extra. Exige sinais de E-E-A-T (autoridade e experiência comprovadas), Schema de saúde, compliance com CFM/CRM, revisão por profissional habilitado e Core Web Vitals impecáveis. Um SEO genérico ignora essas camadas e, em medicina, isso custa ranqueamento e credibilidade.",
  },
  {
    question: "Quanto tempo para ver resultados?",
    answer:
      "Os primeiros sinais aparecem em 60–90 dias para keywords locais, quando a arquitetura é construída corretamente desde o início. Cases auditáveis — com evolução documentada no Google Search Console e GA4 — costumam amadurecer em torno de 6 meses. Temas mais competitivos levam mais tempo, e por isso registramos cada métrica para você acompanhar o progresso real.",
  },
  {
    question: "Vocês garantem posição no Google?",
    answer:
      "Não. Garantir posição viola o Art. 9º, IV da Res. CFM 2.336/2023 e nenhuma agência séria promete isso. O que garantimos é método auditável: arquitetura técnica correta, Schema de saúde, conteúdo YMYL com E-E-A-T e métricas documentadas no Google Search Console e GA4. Você acompanha a evolução com dados reais, não com promessas.",
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
          <h2 className="text-xl font-semibold text-navy">Performance comprovada</h2>
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
