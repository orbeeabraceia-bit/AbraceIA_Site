"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

const whatsappUrl = `https://wa.me/${siteConfig.org.phone.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Quero solicitar o diagnóstico gratuito AbraceIA.")}`;

export function FinalCta() {
  return (
    <section
      className="bg-gradient-to-br from-onyx via-navy to-navy/95 px-4 py-20 text-cream"
      aria-labelledby="final-cta-heading"
    >
      <div className="mx-auto max-w-[1500px] md:px-8">
        <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
          <div className="max-w-2xl text-center lg:text-left">
            <h2 id="final-cta-heading" className="font-display text-3xl font-bold tracking-tight text-gold md:text-4xl lg:text-5xl">
              Pronto para abraçar o futuro da sua medicina?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/80">
              Solicite seu diagnóstico gratuito e descubra o que está travando o crescimento
              do seu consultório — presença no Google, citação em IAs e compliance CFM.
            </p>
          </div>
          
          <div className="flex shrink-0 flex-col items-center gap-4 sm:flex-row lg:items-end">
            <Link
              href="/auditoria-ia"
              onClick={() => trackEvent("click_cta_final", { cta: "diagnostico_gratuito" })}
            >
              <Button intent="primary" size="lg" className="h-14 rounded-full px-10 text-lg shadow-xl shadow-peach/20 transition-all hover:-translate-y-1">
                Agendar diagnóstico gratuito
              </Button>
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex h-14 items-center justify-center gap-3 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-8 text-lg font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#25D366] hover:bg-[#25D366]/20 hover:shadow-[0_0_25px_rgba(37,211,102,0.4)]"
              onClick={() => trackEvent("click_whatsapp", { location: "final_cta" })}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#25D366] drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Falar no WhatsApp
              <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-20"></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
