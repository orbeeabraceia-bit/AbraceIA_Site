"use client";

import { hasMarketingConsent } from "@/lib/analytics";

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean };
    _fbq?: unknown;
  }
}

// Eventos padrão da Meta efetivamente usados pelo site. Manter a lista restrita
// ao que de fato disparamos evita eventos órfãos no Gerenciador de Eventos.
export type MetaStandardEvent = "PageView" | "Lead" | "Contact" | "CompleteRegistration";

// Gera um event_id compartilhado entre o Pixel (browser) e a Conversions API
// (servidor). É o que permite a Meta DEDUPLICAR o mesmo evento vindo dos dois
// canais — sem ele, cada conversão contaria em dobro.
export function generateMetaEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `evt-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
}

// Dispara um evento para o Pixel da Meta. Gateado pelo consentimento de
// MARKETING (ad_storage), separado do de analytics (LGPD, Cap. 9.1): remarketing
// e mensuração de anúncios são finalidade distinta de medir visitas. Sem
// consentimento ou sem Pixel carregado, é no-op por design.
export function trackMetaEvent(
  name: MetaStandardEvent,
  params?: Record<string, unknown>,
  options?: { eventID?: string },
) {
  if (typeof window === "undefined") return;
  if (!hasMarketingConsent()) return;
  if (!window.fbq) return;
  window.fbq("track", name, params ?? {}, options);
}
