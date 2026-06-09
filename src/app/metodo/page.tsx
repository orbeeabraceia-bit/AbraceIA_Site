import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";
import { coreDifferentiators, methodSteps } from "@/lib/content/home-marketing";
import { breadcrumbSchema } from "@/lib/schema";
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
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Método", path: "/metodo" },
        ])}
      />
      <article className="mx-auto max-w-5xl px-4 py-16 md:px-6">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Método", path: "/metodo" },
          ]}
        />
        <FadeIn>
          <h1 className="font-display text-3xl font-bold text-navy">
            Quatro etapas. Um abraço completo.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Um processo claro e previsível, do diagnóstico à escala — GEO, SEO
            arquitetural e compliance CFM em cada fase.
          </p>
        </FadeIn>

        <ol className="mt-12 space-y-8">
          {methodSteps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.05}>
              <li className="rounded-card border border-border bg-white p-6 shadow-sm">
                <span className="font-display text-sm font-bold uppercase tracking-widest text-care">
                  Etapa {step.step}
                </span>
                <h2 className="mt-2 font-display text-xl font-bold text-navy">{step.title}</h2>
                <p className="mt-3 text-muted-foreground">{step.description}</p>
              </li>
            </FadeIn>
          ))}
        </ol>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-navy">
            Não somos mais uma agência. Somos o seu departamento de crescimento.
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {coreDifferentiators.map((item) => (
              <div
                key={item.title}
                className="rounded-card border border-care/20 bg-teal-50/80 p-5"
              >
                <h3 className="font-display font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/auditoria-ia">
            <Button intent="ai">Iniciar diagnóstico gratuito</Button>
          </Link>
          <Link href="/contato">
            <Button intent="outline">Falar com a equipe</Button>
          </Link>
        </div>
      </article>
    </>
  );
}
