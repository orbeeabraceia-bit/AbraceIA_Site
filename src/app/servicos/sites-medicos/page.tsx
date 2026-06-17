import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { ServicePage } from "@/components/service/service-page";

const description =
  "Desenvolvemos sites arquitetados para SEO desde a primeira linha de código, com performance LCP ≤ 0,8s e Schema de saúde completo.";

export const metadata: Metadata = createPageMetadata({
  title: "Sites para Médicos e Clínicas em BH",
  description:
    "Sites Next.js 16 com Schema MedicalBusiness, Core Web Vitals verdes e compliance CFM para consultórios em Belo Horizonte.",
  path: "/servicos/sites-medicos",
  keywords: ["site para médico BH", "site clínica Belo Horizonte", "site médico Next.js"],
});

export default function SitesMedicosPage() {
  return (
    <ServicePage
      title="Sites para Médicos BH"
      keyword="site para médico/clínica BH"
      h1="Site para médico e clínica que performa e converte"
      description={description}
      path="/servicos/sites-medicos"
      ctas={[
        { href: "/contato", label: "Solicitar proposta", intent: "primary" },
        { href: "/cases", label: "Ver cases", intent: "outline" },
      ]}
      sections={[
        {
          heading: "Funcionalidades integradas",
          items: [
            "Next.js 16 + React 19 (stack 2026, livre de CVEs conhecidas)",
            "Schema Physician, MedicalClinic, FAQPage",
            "Formulários com consentimento LGPD",
            "Integração GA4/GTM e CRM",
          ],
        },
        {
          heading: "Design system AbraceIA",
          body: "Tokens teal/pêssego/ouro, acessibilidade WCAG 2.2 AA, menu mobile e skip link — padrão Orbee Labs para saúde.",
        },
        {
          heading: "Lead magnets integrados",
          body: "Quiz de prontidão IA, auditoria de presença em IAs e chat de triagem com guardrails clínicos — prontos no template.",
        },
      ]}
      faq={[
        {
          question: "Por que Next.js e não WordPress?",
          answer:
            "Porque conteúdo de saúde é YMYL e não admite falhas de performance ou segurança. O Next.js entrega Core Web Vitals verdes nativos, Schema de saúde direto no código, segurança monitorada via CVEs e um deploy de preview a cada alteração. O WordPress depende de plugins que envelhecem e abrem brechas — um risco que a sua reputação médica não precisa correr.",
        },
        {
          question: "O site inclui formulários LGPD?",
          answer:
            "Sim. Todos os formulários nascem em conformidade com a LGPD: consentimento explícito do paciente antes do envio, política de privacidade linkada e clara, e analytics que só são ativados depois do aceite no banner de cookies. Os dados trafegam de forma segura e você mantém o registro de consentimento — proteção tanto para o paciente quanto para o seu CRM.",
        },
        {
          question: "Integram com CRM?",
          answer:
            "Sim. O site já vem com uma API de contato pronta para integrar com as principais ferramentas do mercado — HubSpot, RD Station ou Resend — e configuramos a integração na implantação, conforme o fluxo que você já usa. Assim, cada lead que chega pelo site entra direto no seu funil de atendimento, sem digitação manual e sem perder contato.",
        },
      ]}
    />
  );
}
