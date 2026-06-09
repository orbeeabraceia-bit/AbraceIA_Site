import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { forbiddenTerms } from "@/lib/compliance";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Compliance CFM — Publicidade Digital em Saúde",
  description:
    "O que pode e não pode na publicidade digital médica — Res. CFM 2.336/2023 e checklist AbraceIA.",
  path: "/compliance",
});

const allowed = [
  "Identificação completa: nome, CRM, especialidade e RQE",
  "Conteúdo educativo e informativo sobre procedimentos",
  "Divulgação de serviços, equipamentos e preços",
  "Depoimentos com disclaimer e autorização documentada",
  "Presença em redes sociais e sites institucionais",
];

const forbidden = forbiddenTerms.slice(0, 6);

export default function CompliancePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <Breadcrumbs items={[{ name: "Início", path: "/" }, { name: "Compliance" }]} />
      <h1 className="font-display text-3xl font-bold text-navy">
        Compliance CFM na publicidade digital
      </h1>
      <p className="mt-4 text-muted-foreground">
        Res. CFM 2.336/2023 — orientações AbraceIA para clínicas e profissionais de saúde em BH.
      </p>
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-navy">O que PODE</h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-muted-foreground">
          {allowed.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-navy">O que NÃO PODE</h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-muted-foreground">
          <li>Prometer resultado ou cura garantida</li>
          <li>Superlativos como &ldquo;melhor médico&rdquo; ou &ldquo;único&rdquo; sem prova</li>
          <li>Antes/depois sem caráter educativo e TCLE</li>
          <li>Conteúdo que induza diagnóstico ou prescrição online</li>
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          Termos monitorados pelo verificador AbraceIA: {forbidden.join(", ")}.
        </p>
      </section>
      <section className="mt-10 rounded-card border border-border bg-muted p-6">
        <p className="font-semibold text-navy">Teste seu anúncio</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Use o verificador gratuito na página de auditoria antes de publicar posts ou anúncios.
        </p>
        <Link href="/auditoria-ia" className="mt-4 inline-block text-care font-medium hover:underline">
          Ir para auditoria IA →
        </Link>
      </section>
    </article>
  );
}
