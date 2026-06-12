"use client";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  // LGPD: nenhum evento sai para dataLayer/gtag sem consentimento ativo —
  // revogar precisa ser tão efetivo quanto consentir.
  if (!hasAnalyticsConsent()) return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...params });
  if (window.gtag) {
    window.gtag("event", name, params);
  }
}

export function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("abraceia-cookie-consent") === "accepted";
}

// Sincroniza o Google Consent Mode com a escolha do usuário. Na revogação,
// nega analytics_storage e descarta a fila local para o GTM/GA já carregado
// parar de receber eventos.
export function applyAnalyticsConsent(accepted: boolean) {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: accepted ? "granted" : "denied",
      ad_storage: "denied",
    });
  }
  if (!accepted) {
    window.dataLayer = [];
  }
}
