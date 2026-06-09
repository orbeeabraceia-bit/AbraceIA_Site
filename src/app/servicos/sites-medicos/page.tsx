import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqAccordion } from "@/components/seo/faq-accordion";
import { createPageMetadata } from "@/lib/metadata";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";

const faq = [
  {
    question: "Por que Next.js e não WordPress?",
    answer:
      "Stack 2026 sem CVEs críticas conhecidas, performance nativa, Schema no código e deploy preview por PR — ideal para YMYL.",
  },
  {
    question: "O site inclui formulários LGPD?",
    answer:
      "Sim: consentimento explícito, política de privacidade linkada e analytics só após aceite de cookies.",
  },
  {
    question: "Integram com CRM?",
    answer:
      "API de contato pronta para HubSpot, RD Station ou Resend — configuramos na implantação.",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "Sites para Médicos e Clínicas em BH",
  description:
    "Sites Next.js 16 com Schema MedicalBusiness, Core Web Vitals certificados e compliance CFM para consultórios em Belo Horizonte.",
  path: "/servicos/sites-medicos",
  keywords: ["site para médico BH", "site clínica Belo Horizonte", "site médico Next.js"],
});

export default function SitesMedicosPage() {
  const description =
    "Desenvolvemos sites arquitetados para SEO desde a primeira linha de código, com performance LCP ≤ 0,8s e Schema de saúde completo.";
  return (
    <>
      <JsonLd
        data={[
          serviceSchema("Sites para Médicos BH", description, "/servicos/sites-medicos"),
          faqSchema(faq),
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Sites Médicos", path: "/servicos/sites-medicos" },
          ]),
        ]}
      />
      <article className="mx-auto max-w-[1400px] px-4 py-20 md:px-8">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:h-fit">
            <p className="text-sm font-bold uppercase tracking-widest text-ai">site para médico/clínica BH</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-navy md:text-5xl lg:text-[3.5rem] lg:leading-[1.1] text-balance">
              Site para médico e clínica que performa e converte
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{description}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contato">
                <Button intent="primary" className="rounded-full">Solicitar proposta</Button>
              </Link>
              <Link href="/cases">
                <Button intent="outline" className="rounded-full">Ver cases</Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <section className="rounded-3xl border border-border bg-white p-8 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-navy">Funcionalidades Integradas</h2>
              <ul className="mt-6 list-inside list-disc space-y-4 text-lg text-muted-foreground">
                <li>Next.js 16 + React 19 (stack 2026, livre de CVEs conhecidas)</li>
                <li>Schema Physician, MedicalClinic, FAQPage</li>
                <li>Formulários com consentimento LGPD</li>
                <li>Integração GA4/GTM e CRM</li>
              </ul>
            </section>

            <div className="mt-12 space-y-12">
              <section className="rounded-3xl border border-border bg-white p-8 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-navy">Design system AbraceIA</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Tokens teal/peach/gold, acessibilidade WCAG 2.2 AA, menu mobile e skip link — padrão
                  Orbee Labs para saúde.
                </p>
              </section>

              <section className="rounded-3xl border border-border bg-white p-8 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-navy">Lead magnets integrados</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Quiz de prontidão IA, auditoria de presença em IAs e chat de triagem com guardrails
                  clínicos — prontos no template.
                </p>
              </section>
            </div>

            <section className="mt-20">
              <h2 className="font-display text-3xl font-bold text-navy">Perguntas frequentes</h2>
              <div className="mt-8">
                <FaqAccordion items={faq} />
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
