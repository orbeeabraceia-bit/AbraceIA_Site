import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";
import { coreDifferentiators, methodSteps } from "@/lib/content/home-marketing";
import { breadcrumbSchema, howToSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Método AbraceIA — Diagnóstico à Escala",
  description:
    "Processo em 4 etapas: diagnóstico digital, estratégia GEO/SEO, construção técnica e escala com dados — compliance CFM.",
  path: "/metodo",
});

export default function MetodoPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Método", path: "/metodo" },
          ]),
          howToSchema({
            name: "Método AbraceIA — do diagnóstico à escala",
            description:
              "Processo em 4 etapas para construir presença em IA e SEO para clínicas e médicos, dentro do compliance CFM.",
            path: "/metodo",
            steps: methodSteps.map((s) => ({ name: s.title, text: s.description })),
          }),
        ]}
      />
      <article className="mx-auto max-w-[1400px] px-4 py-20 md:px-8">
        <div className="mb-12">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Método", path: "/metodo" },
            ]}
          />
        </div>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:h-fit">
            <FadeIn>
              <h1 className="font-display text-4xl font-bold tracking-tight text-navy lg:text-5xl">
                Quatro etapas. Um abraço completo.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Um processo claro e previsível, do diagnóstico à escala — GEO, SEO
                arquitetural e compliance CFM em cada fase.
              </p>
            </FadeIn>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/auditoria-ia">
                <Button intent="ai" className="rounded-full">Iniciar diagnóstico gratuito</Button>
              </Link>
              <Link href="/contato">
                <Button intent="outline" className="rounded-full">Falar com a equipe</Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <ol className="space-y-8">
              {methodSteps.map((step, i) => (
                <FadeIn key={step.title} delay={i * 0.05}>
                  <li className="rounded-3xl border border-border bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                    <span className="font-display text-sm font-bold uppercase tracking-widest text-care">
                      Etapa {step.step}
                    </span>
                    <h2 className="mt-3 font-display text-2xl font-bold text-navy">{step.title}</h2>
                    <p className="mt-4 text-lg text-muted-foreground">{step.description}</p>
                  </li>
                </FadeIn>
              ))}
            </ol>

            <section className="mt-20">
              <h2 className="font-display text-3xl font-bold text-navy">
                Não somos mais uma agência. Somos o seu departamento de crescimento.
              </h2>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {coreDifferentiators.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-care/20 bg-teal-50/80 p-6"
                  >
                    <h3 className="font-display text-lg font-bold text-navy">{item.title}</h3>
                    <p className="mt-3 text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
