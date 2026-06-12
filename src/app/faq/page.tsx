import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqAccordion } from "@/components/seo/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { siteFaq } from "@/lib/content/faq";
import { createPageMetadata } from "@/lib/metadata";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = createPageMetadata({
  title: "Perguntas Frequentes",
  description:
    "FAQ AbraceIA: GEO, SEO médico, compliance CFM, auditoria de IA e presença digital para saúde em BH.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(siteFaq),
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ]}
      />
      <div className="mx-auto max-w-5xl px-4 py-16 md:px-6">
        <Breadcrumbs items={[{ name: "Início", path: "/" }, { name: "FAQ" }]} />
        <h1 className="font-display text-3xl font-bold text-navy">Perguntas frequentes</h1>
        <p className="mt-4 text-muted-foreground">
          Respostas diretas sobre GEO, SEO arquitetural e compliance para clínicas — formato AEO
          (40–60 palavras por resposta).
        </p>
        <div className="mt-8">
          <FaqAccordion items={siteFaq} />
        </div>
        <div className="mt-12 rounded-card border border-care/20 bg-teal-50 p-6">
          <p className="font-semibold text-navy">Não encontrou sua dúvida?</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Agende uma auditoria gratuita de presença em IA ou fale com a equipe Orbee Labs.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/auditoria-ia">
              <Button intent="ai" size="sm">
                Auditoria IA grátis
              </Button>
            </Link>
            <Link href="/contato">
              <Button intent="outline" size="sm">
                Contato
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
