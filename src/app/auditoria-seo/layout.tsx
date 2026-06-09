import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Auditoria SEO Gratuita",
  description:
    "Ferramenta gratuita: analise mais de 50 fatores de SEO do seu site e receba um relatório técnico completo com recomendações personalizadas.",
  path: "/auditoria-seo",
  keywords: ["auditoria SEO gratuita", "análise de SEO", "relatório SEO", "otimização de site"],
});

export default function AuditoriaSeoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
