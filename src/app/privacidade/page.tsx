import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Política de Privacidade",
  description: "Política de privacidade e LGPD do AbraceIA — Orbee Labs.",
  path: "/privacidade",
});

export default function PrivacidadePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-16 md:px-6 prose prose-slate">
      <h1 className="font-display text-3xl font-bold text-navy">
        Política de Privacidade
      </h1>
      <p className="mt-4 text-muted-foreground">
        Em conformidade com a Lei 13.709/2018 (LGPD). Dados de saúde são
        sensíveis (Art. 5º, II); tratamos com base legal de consentimento e
        tutela da saúde quando aplicável.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-navy">Dados coletados</h2>
      <p className="mt-2 text-muted-foreground">
        Nome, e-mail, telefone e mensagens enviadas via formulários. Dados de
        navegação (GA4) somente após consentimento de cookies.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-navy">Seus direitos</h2>
      <p className="mt-2 text-muted-foreground">
        Acesso, correção, exclusão e portabilidade. Solicitações em até 15 dias
        via contato@abraceia.com.br.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-navy">IA e dados</h2>
      <p className="mt-2 text-muted-foreground">
        Ferramentas com IA não coletam diagnóstico clínico. Saídas são
        informativas e revisadas por profissional habilitado quando publicadas.
      </p>
    </article>
  );
}
