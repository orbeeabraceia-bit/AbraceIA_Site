import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { QuizIaReadiness } from "@/components/quiz-ia-readiness";
import { FaqAccordion } from "@/components/seo/faq-accordion";
import { HeroActions } from "@/components/home/hero-actions";
import { CaseCard } from "@/components/cases/case-card";
import { ClientPortfolioStrip } from "@/components/cases/client-portfolio-strip";
import { FadeIn } from "@/components/animations/fade-in";
import { cases } from "@/lib/content/cases";
import { siteFaq } from "@/lib/content/faq";
import { faqSchema, medicalBusinessSchema, physicianSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/metadata";
import { PillarsSection } from "@/components/home/pillars-section";
import { MethodSection } from "@/components/home/method-section";
import { FinalCta } from "@/components/home/final-cta";
import { emotionalLead } from "@/lib/content/home-marketing";
import { CrossParticles } from "@/components/animations/cross-particles";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "AbraceIA — Seu consultório citado pela IA | BH",
  description:
    "Faça sua clínica ser citada por ChatGPT e no topo do Google, com compliance CFM. Auditoria de presença em IA gratuita.",
  path: "/",
  keywords: ["presença de saúde com IA BH", "GEO saúde", "SEO médico Belo Horizonte"],
});

const kpis = [
  { label: "Buscas de saúde com AI Overview", value: "88%" },
  { label: "Meta LCP mobile", value: "≤ 0,8s" },
  { label: "Compliance", value: "CFM/CFP" },
  { label: "Stack", value: "Next.js 16" },
];

const differentials = [
  "Citação em IA generativa (GEO ativo)",
  "Stack 2026 com segurança monitorada",
  "Compliance setorial documentado",
  "Core Web Vitals verdes",
  "Automação com IA revisada por humano",
  "Schema Markup de saúde validado",
];

const homeFaq = [siteFaq[2], siteFaq[4], siteFaq[8], siteFaq[9], siteFaq[0], siteFaq[3]];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[faqSchema(homeFaq), medicalBusinessSchema(), physicianSchema()]} />
      <section className="relative overflow-hidden bg-gradient-to-b from-cream/30 via-white to-white px-4 py-12 md:py-20">
        <CrossParticles />
        {/* Glow de fundo simulando IA */}
        <div className="absolute left-1/2 top-0 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-care/5 opacity-50 blur-3xl md:left-1/3" />

        <div className="relative z-10 mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn className="text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border border-care/20 bg-care/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-care backdrop-blur-sm">
              Orbee Labs · Belo Horizonte
            </div>

            <p className="mt-6 font-serif text-xl italic leading-relaxed text-muted-foreground md:text-2xl">
              {emotionalLead}
            </p>

            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-navy md:text-5xl lg:text-[3.5rem] lg:leading-[1.1] text-balance">
              Seu consultório citado pela{" "}
              <span className="bg-gradient-to-br from-care to-teal-700 bg-clip-text text-transparent">
                IA e no topo
              </span>{" "}
              do Google
              <span className="mt-2 block text-2xl font-bold text-navy/80 md:text-3xl lg:text-[2.2rem]">
                dentro da ética do seu conselho.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">
              Cuidamos da sua presença no Google, da reputação online e da citação em ChatGPT e
              Perplexity — com Core Web Vitals verdes e a atenção que a medicina pede.
            </p>

            <div className="mt-10">
              <HeroActions />
            </div>

            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-white/50 p-4 shadow-sm backdrop-blur-md transition-all hover:border-care/30 hover:shadow-md"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-50" />
                  <p className="relative text-2xl font-black tracking-tight text-navy transition-colors group-hover:text-care">
                    {kpi.value}
                  </p>
                  <p className="relative mt-1 text-xs font-medium text-muted-foreground">
                    {kpi.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="relative hidden lg:block">
            {/* Decoração atrás da imagem (glow) */}
            <div className="absolute -inset-4 z-0 rounded-[2.5rem] bg-gradient-to-br from-care/15 to-transparent blur-2xl" />

            {/* Imagem com efeito glass/borda */}
            <div className="relative z-10 overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl shadow-navy/5 ring-1 ring-border/50 transition-transform duration-700 hover:-translate-y-1 hover:shadow-xl">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
              <Image
                src="/images/hero-ai-health.webp"
                alt="Profissional de saúde em clínica moderna com elementos sutis de IA representando a solução AbraceIA"
                width={800}
                height={800}
                priority
                className="w-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <PillarsSection />

      <section className="mx-auto max-w-[1500px] px-4 py-16 md:px-6">
        <FadeIn>
          <h2 className="font-display text-2xl font-bold text-navy md:text-3xl">
            A IA domina a SERP de saúde
          </h2>
          <p className="mt-4 max-w-5xl text-muted-foreground">
            Em BH, 88% das buscas de saúde acionam AI Overview. Quem não é citado, desaparece —
            mesmo na 1ª página do Google.
          </p>
        </FadeIn>
      </section>

      <section className="bg-muted px-4 py-16">
        <div className="mx-auto max-w-[1500px] md:px-6">
          <h2 className="font-display text-2xl font-bold text-navy">
            Como funciona: GEO + SEO + Compliance
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "GEO",
                desc: "llms.txt, conteúdo enciclopédico e E-E-A-T.",
                href: "/servicos/geo-saude",
              },
              {
                title: "SEO Arquitetural",
                desc: "Next.js 16, Schema de saúde, CWV verdes.",
                href: "/servicos/seo-medico",
              },
              {
                title: "Compliance",
                desc: "Checklist CFM/CFO/CFP antes de publicar.",
                href: "/sobre",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <Card className="h-full">
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                  <Link
                    href={item.href}
                    className="mt-4 inline-block text-sm font-semibold text-care hover:underline"
                  >
                    Saiba mais
                  </Link>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <MethodSection />

      <section className="mx-auto max-w-[1500px] px-4 py-16 md:px-6">
        <h2 className="font-display text-2xl font-bold text-navy">6 diferenciais verificáveis</h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {differentials.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 rounded-lg border border-border bg-white p-4 text-sm text-navy shadow-sm"
            >
              <span className="text-care" aria-hidden>
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-cream/60 px-4 py-16">
        <div className="mx-auto max-w-[1500px] md:px-6">
          <h2 className="font-display text-2xl font-bold text-navy">Prova social</h2>
          <p className="mt-2 text-muted-foreground">
            Sites em produção que a Orbee Labs administra para saúde em BH e online.
          </p>
          <ClientPortfolioStrip className="mt-6 bg-white" showCaseLinks />
          <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2">
            {cases.map((c) => (
              <CaseCard key={c.slug} caseStudy={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-16 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <FadeIn>
            <h2 className="font-display text-2xl font-bold text-navy">
              Auditoria de presença em IA
            </h2>
            <p className="mt-4 text-muted-foreground">
              Descubra se ChatGPT e Perplexity já citam sua clínica — relatório orientativo com
              checklist GEO.
            </p>
            <Link href="/auditoria-ia" className="mt-6 inline-block">
              <Button intent="ai">Iniciar auditoria gratuita</Button>
            </Link>
          </FadeIn>
          <QuizIaReadiness />
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-16 md:px-6">
        <h2 className="font-display text-2xl font-bold text-navy">FAQ</h2>
        <div className="mt-6">
          <FaqAccordion items={homeFaq} />
        </div>
        <Link href="/faq" className="mt-4 inline-block text-sm text-care hover:underline">
          Ver todas as perguntas →
        </Link>
        <p className="mt-8 text-xs text-muted-foreground">{siteConfig.aiDisclaimer}</p>
      </section>

      <FinalCta />
    </>
  );
}
