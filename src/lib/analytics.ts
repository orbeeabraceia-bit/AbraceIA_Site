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

// Consentimento de marketing (ad_storage) é separado do de analytics — LGPD
// exige consentimento por finalidade (Cap. 9.1).
export function hasMarketingConsent() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("abraceia-cookie-marketing") === "granted";
}

// Sincroniza o Google Consent Mode com a escolha do usuário, por finalidade.
// Na revogação de analytics, descarta a fila local para o GTM/GA já carregado
// parar de receber eventos. `marketing` controla o ad_storage.
export function applyAnalyticsConsent(analytics: boolean, marketing = false) {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: analytics ? "granted" : "denied",
      ad_storage: marketing ? "granted" : "denied",
    });
  }
  // Pixel da Meta: o ad_storage também controla o fbq. Na revogação, 'revoke'
  // faz o Pixel já injetado parar de enviar eventos (espelha o dataLayer=[]).
  if (window.fbq) {
    window.fbq("consent", marketing ? "grant" : "revoke");
  }
  if (!analytics) {
    window.dataLayer = [];
  }
}
