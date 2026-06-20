import type { Metadata } from "next";
import { RoiCalculator } from "@/components/calculadora/roi-calculator";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { webApplicationSchema, breadcrumbSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Calculadora de ROI — potencial de crescimento orgânico",
  description:
    "Estime o potencial de pacientes e receita que sua clínica pode ganhar com mais presença orgânica e citação em IA. Simulação gratuita e orientativa.",
  path: "/calculadora-roi",
  keywords: ["calculadora ROI saúde", "ROI marketing médico", "potencial de crescimento clínica"],
});

export default function CalculadoraRoiPage() {
  return (
    <>
      <JsonLd
        data={[
          webApplicationSchema({
            name: "Calculadora de ROI AbraceIA",
            description:
              "Simulação do potencial de pacientes e receita a partir do crescimento de tráfego orgânico.",
            path: "/calculadora-roi",
          }),
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Calculadora de ROI", path: "/calculadora-roi" },
          ]),
        ]}
      />
      <div className="mx-auto max-w-[1500px] px-4 py-16 md:px-6">
        <Breadcrumbs items={[{ name: "Início", path: "/" }, { name: "Calculadora de ROI" }]} />
        <header className="mt-4 max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-care/20 bg-care/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-care">
            Simulação gratuita
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold text-navy md:text-4xl">
            Quanto sua presença digital pode valer?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Estime, em segundos, o potencial de pacientes e receita que sua clínica pode ganhar ao
            crescer em buscas orgânicas e citações em IA. É uma projeção orientativa — sem promessa
            de resultado.
          </p>
        </header>

        <section className="mt-10">
          <RoiCalculator />
        </section>

        <p className="mt-10 max-w-3xl text-xs text-muted-foreground">
          {siteConfig.aiDisclaimer} Os valores são estimativas calculadas a partir dos números que
          você informa e não representam garantia de faturamento, conforme as diretrizes de
          publicidade dos conselhos de saúde (CFM, CFP, CFO).
        </p>
      </div>
    </>
  );
}
