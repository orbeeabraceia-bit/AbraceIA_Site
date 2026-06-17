import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { ServicePage } from "@/components/service/service-page";

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
      ctas={[
        { href: "/auditoria-ia", label: "Auditoria de presença em IA", intent: "ai" },
        { href: "/contato", label: "Falar com especialista", intent: "outline" },
      ]}
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
            "Não. GEO complementa o SEO tradicional, não o substitui. Sua clínica precisa ranquear no Google e, ao mesmo tempo, ser citada pelas IAs generativas que já respondem antes dos links azuis. Fazemos as duas frentes a partir de uma única base técnica — arquitetura Next.js, Schema de saúde e conteúdo informativo que alimenta tanto o buscador quanto os modelos de IA.",
        },
        {
          question: "Quais IAs vocês monitoram?",
          answer:
            "Acompanhamos as principais plataformas que respondem perguntas de saúde: ChatGPT, Perplexity, Claude, Gemini e o Google AI Overview. Para cada uma, registramos um baseline de citação no início do projeto e retestamos em 90 dias, com a evolução documentada em prints. Assim você enxerga, com prova, se sua clínica passou a ser citada e em quais perguntas.",
        },
        {
          question: "É permitido pelo CFM?",
          answer:
            "Sim, desde que feito dentro das regras. A Resolução CFM 2.336/2023 permite presença digital quando o conteúdo é informativo, sem promessa de cura ou resultado, e com autor e revisor identificados (nome, CRM e RQE). Seguimos o Manual de Publicidade Médica e passamos cada peça por um checklist de compliance antes de publicar.",
        },
      ]}
    />
  );
}
