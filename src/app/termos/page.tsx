import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Termos de Uso",
  description: "Termos de uso do site AbraceIA — Orbee Labs.",
  path: "/termos",
});

export default function TermosPage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <h1 className="font-display text-3xl font-bold text-navy">Termos de Uso</h1>
      <p className="mt-4 text-muted-foreground">
        O conteúdo deste site é informativo sobre marketing digital e presença
        em IA para profissionais de saúde. Não constitui consulta, diagnóstico
        ou prescrição médica.
      </p>
      <p className="mt-4 text-muted-foreground">
        Marcas e logotipos de terceiros pertencem aos respectivos titulares.
        Cases e métricas publicados com autorização do cliente.
      </p>
    </article>
  );
}
