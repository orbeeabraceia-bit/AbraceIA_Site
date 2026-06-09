"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

export function HeroActions() {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
      <Link
        href="/auditoria-ia"
        onClick={() => trackEvent("click_cta_hero", { cta: "diagnostico_gratuito" })}
      >
        <Button intent="ai" size="lg">
          Agendar diagnóstico gratuito
        </Button>
      </Link>
      <Link
        href="/metodo"
        onClick={() => trackEvent("click_cta_hero", { cta: "metodo" })}
      >
        <Button intent="outline" size="lg">
          Ver o método
        </Button>
      </Link>
    </div>
  );
}
