"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

const whatsappUrl = `https://wa.me/${siteConfig.org.phone.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Quero solicitar o diagnóstico gratuito AbraceIA.")}`;

export function FinalCta() {
  return (
    <section
      className="bg-gradient-to-br from-onyx via-navy to-navy/95 px-4 py-16 text-cream"
      aria-labelledby="final-cta-heading"
    >
      <div className="mx-auto max-w-5xl text-center">
        <h2 id="final-cta-heading" className="font-display text-2xl font-bold text-gold md:text-3xl">
          Pronto para abraçar o futuro da sua medicina?
        </h2>
        <p className="mt-4 text-cream/80">
          Solicite seu diagnóstico gratuito e descubra o que está travando o crescimento
          do seu consultório — presença no Google, citação em IAs e compliance CFM.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/auditoria-ia"
            onClick={() => trackEvent("click_cta_final", { cta: "diagnostico_gratuito" })}
          >
            <Button intent="primary" size="lg">
              Agendar diagnóstico gratuito
            </Button>
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("click_whatsapp", { location: "final_cta" })}
          >
            <Button intent="outline" size="lg" className="border-gold/40 text-cream hover:bg-gold/10 hover:text-cream">
              Falar no WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
