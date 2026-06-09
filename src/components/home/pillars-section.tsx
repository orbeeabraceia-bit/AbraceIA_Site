import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/animations/fade-in";
import { marketingPillars } from "@/lib/content/home-marketing";

export function PillarsSection() {
  return (
    <section className="bg-cream px-4 py-16" aria-labelledby="pillars-heading">
      <div className="mx-auto max-w-7xl md:px-6">
        <FadeIn>
          <h2 id="pillars-heading" className="font-display text-2xl font-bold text-navy md:text-3xl">
            Tudo o que a sua presença digital precisa, num só lugar
          </h2>
          <p className="mt-4 max-w-5xl text-muted-foreground">
            Da primeira busca ao paciente fidelizado — com tecnologia de verdade e a
            atenção que a medicina pede.
          </p>
        </FadeIn>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {marketingPillars.map((pillar, i) => (
            <FadeIn key={pillar.title} delay={i * 0.08}>
              <Card className="h-full border-care/20 bg-white">
                <CardTitle>{pillar.title}</CardTitle>
                <CardDescription className="mt-2">{pillar.description}</CardDescription>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
