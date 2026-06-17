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
      "A auditoria inicial de presença em IA é gratuita e leva apenas alguns minutos: você informa nome, especialidade e cidade, e geramos um checklist orientativo com as maiores oportunidades de citação em ChatGPT, Perplexity e Google AI Overview. Já o diagnóstico comercial completo, mais aprofundado, é entregue em poucos dias úteis após a conversa inicial.",
  },
  {
    question: "Atendem fora de BH?",
    answer:
      "Nosso foco é Belo Horizonte e a região metropolitana, onde conhecemos a fundo a busca local e a concorrência. Mas o método AbraceIA é replicável: teleconsulta e sites de alcance nacional seguem o mesmo padrão de arquitetura, Schema e compliance. Se você atende em outra cidade, conversamos sobre como adaptar a estratégia ao seu mercado.",
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
      <div className="mx-auto max-w-[1500px] px-4 py-16 md:px-6">
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
