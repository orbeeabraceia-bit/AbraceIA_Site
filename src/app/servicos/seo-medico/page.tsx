import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { ServicePage } from "@/components/service/service-page";

const description =
  "SEO médico não é plugin de WordPress — é arquitetura: URL, Schema, conteúdo YMYL e performance nativa.";

export const metadata: Metadata = createPageMetadata({
  title: "SEO para Médico em Belo Horizonte",
  description:
    "SEO arquitetural para profissionais de saúde em BH: keywords, Schema, AEO e Core Web Vitals com compliance dos conselhos.",
  path: "/servicos/seo-medico",
  keywords: ["SEO médico BH", "SEO clínica Belo Horizonte", "AEO saúde"],
});

export default function SeoMedicoPage() {
  return (
    <ServicePage
      title="SEO Médico BH"
      keyword="SEO para médico BH"
      h1="SEO médico com método auditável"
      description={description}
      path="/servicos/seo-medico"
      ctas={[
        { href: "/guia/geo-para-saude", label: "Ler guia GEO para saúde", intent: "ai" },
        { href: "/contato", label: "Falar com especialista", intent: "outline" },
      ]}
      sections={[
        {
          heading: "Arquitetura desde o código",
          body: "URLs semânticas, canonical, sitemap dinâmico e Schema Physician/MedicalBusiness implementados no Next.js — não como plugin tardio.",
        },
        {
          heading: "AEO e featured snippets",
          body: "FAQ estruturado, respostas diretas de 40–60 palavras e blocos enciclopédicos para Google AI Overview e assistentes de busca.",
        },
        {
          heading: "Performance comprovada",
          body: "LCP ≤ 0,8s, INP ≤ 200ms e CLS ≤ 0,1 — requisitos essenciais do Google para páginas YMYL em saúde. Performance nativa em Edge.",
        },
      ]}
      faq={[
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
      ]}
    />
  );
}
