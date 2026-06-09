"use client";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
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
