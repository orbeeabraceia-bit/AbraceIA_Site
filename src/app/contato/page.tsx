import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { TriageChat } from "@/components/chat/triage-chat";
import { JsonLd } from "@/components/seo/json-ld";
import { contactPageSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/metadata";
import { FaqAccordion } from "@/components/seo/faq-accordion";

const faq = [
  {
    question: "Quanto tempo leva uma auditoria?",
    answer:
      "A auditoria inicial de presença em IA é gratuita e entrega checklist orientativo em minutos.",
  },
  {
    question: "Atendem fora de BH?",
    answer:
      "Foco em Belo Horizonte e região metropolitana, com método replicável para outras cidades.",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "Contato",
  description: "Fale com o AbraceIA — auditoria de IA, GEO e SEO para saúde em BH.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <>
      <JsonLd
        data={[contactPageSchema(), faqSchema(faq), breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contato", path: "/contato" },
        ])]}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <h1 className="font-display text-3xl font-bold text-navy">Contato</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Agende conversa sobre GEO, SEO médico ou sites para clínicas.
        </p>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-navy">Formulário</h2>
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-navy">Triagem com IA</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Orientação sobre presença digital — com fallback humano em /contato.
            </p>
            <div className="mt-4">
              <TriageChat />
            </div>
          </div>
        </div>
        <section className="mt-16 max-w-xl">
          <h2 className="text-lg font-semibold text-navy">FAQ</h2>
          <div className="mt-4">
            <FaqAccordion items={faq} />
          </div>
        </section>
      </div>
    </>
  );
}
