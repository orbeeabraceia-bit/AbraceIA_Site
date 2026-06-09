import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Auditoria de Presença em IA",
  description:
    "Ferramenta gratuita: descubra se sua clínica está preparada para citação em ChatGPT, Perplexity e Google AI Overview.",
  path: "/auditoria-ia",
  keywords: ["auditoria IA saúde", "presença ChatGPT clínica", "GEO saúde BH"],
});

export default function AuditoriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
