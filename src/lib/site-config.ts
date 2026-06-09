export const siteConfig = {
  name: "AbraceIA",
  tagline: "Abrace a IA. Cuide de quem importa.",
  description:
    "Vertical de saúde da Orbee Labs. Presença digital com IA, SEO arquitetural e compliance CFM/CFO/CFP em Belo Horizonte.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://abraceia.com.br",
  locale: "pt-BR",
  city: "Belo Horizonte",
  state: "MG",
  org: {
    name: "AbraceIA — Orbee Labs",
    email: "contato@orbeelabs.com",
    phone: "+5531982556751",
    address: "Rua Costa Senna, 597 — Belo Horizonte, MG",
  },
  social: {
    instagram: "https://www.instagram.com/orbeelabs",
    linkedin: "https://www.linkedin.com/company/orbeelabs",
    parent: "https://orbeelabs.com/",
  },
  aiDisclaimer:
    "Conteúdo informativo revisado por profissional habilitado. Não substitui consulta, diagnóstico ou prescrição.",
} as const;

export type SiteConfig = typeof siteConfig;
