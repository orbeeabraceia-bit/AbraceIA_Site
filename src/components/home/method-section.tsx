import Link from "next/link";
import { FadeIn } from "@/components/animations/fade-in";
import { methodSteps } from "@/lib/content/home-marketing";

export function MethodSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6" aria-labelledby="method-heading">
      <FadeIn>
        <h2 id="method-heading" className="font-display text-2xl font-bold text-navy md:text-3xl">
          Quatro etapas. Um abraço completo.
        </h2>
        <p className="mt-4 max-w-5xl text-muted-foreground">
          Um processo claro e previsível, do diagnóstico à escala, para você acompanhar
          cada passo.{" "}
          <Link href="/metodo" className="font-semibold text-care hover:underline">
            Ver método completo
          </Link>
        </p>
      </FadeIn>
      <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {methodSteps.map((step, i) => (
          <FadeIn key={step.title} delay={i * 0.06}>
            <li className="relative rounded-card border border-border bg-white p-6 shadow-sm">
              <span
                className="font-display text-3xl font-extrabold text-care/30"
                aria-hidden
              >
                {step.step}
              </span>
              <h3 className="mt-2 font-display text-lg font-bold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </li>
          </FadeIn>
        ))}
      </ol>
    </section>
  );
}
