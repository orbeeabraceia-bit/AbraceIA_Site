import { SeoAuditForm } from "@/components/auditoria/seo-audit-form";

export default function AuditoriaSeoPage() {
  return (
    <div className="px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ai-500">Auditoria SEO</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-navy md:text-4xl">
            Auditoria SEO gratuita do seu site
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Descubra o potencial do seu site nos mecanismos de busca e receba um relatório completo com
            recomendações personalizadas. Vamos analisar seu site e identificar oportunidades de melhoria.
          </p>
        </div>

        <div className="mt-10">
          <SeoAuditForm />
        </div>
      </div>
    </div>
  );
}
