import { SeoAuditForm } from "@/components/auditoria/seo-audit-form";
import { JsonLd } from "@/components/seo/json-ld";
import { webApplicationSchema, breadcrumbSchema } from "@/lib/schema";

export default function AuditoriaSeoPage() {
  return (
    <div className="mx-auto max-w-[1500px] px-4 py-20 md:px-8">
      <JsonLd
        data={[
          webApplicationSchema({
            name: "Auditoria SEO Gratuita — AbraceIA",
            description:
              "Ferramenta gratuita que analisa mais de 50 fatores de SEO do seu site e gera um relatório técnico com recomendações personalizadas.",
            path: "/auditoria-seo",
          }),
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Auditoria SEO", path: "/auditoria-seo" },
          ]),
        ]}
      />
      <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5 text-center lg:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ai-500">Auditoria SEO</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-navy md:text-5xl lg:text-[3.5rem] lg:leading-[1.1] text-balance">
            Auditoria SEO gratuita do seu site
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Descubra o potencial do seu site nos mecanismos de busca e receba um relatório completo com
            recomendações personalizadas. Vamos analisar seu site e identificar oportunidades de melhoria
            focadas no compliance e na área da saúde.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-border bg-white p-8 shadow-xl">
            <SeoAuditForm />
          </div>
        </div>
      </div>
    </div>
  );
}
