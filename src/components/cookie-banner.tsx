"use client";

import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { applyAnalyticsConsent, trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "abraceia-cookie-consent";
const MARKETING_KEY = "abraceia-cookie-marketing";

// Evento que reabre o banner para alterar/revogar o consentimento (LGPD:
// retirar deve ser tão fácil quanto consentir). Disparado em /cookies.
export const COOKIE_SETTINGS_EVENT = "abraceia:cookie-settings";

const BANNER_REFRESH_EVENT = "abraceia:cookie-banner-refresh";

// Estado de "reaberto manualmente" fora do React: o banner é singleton e a
// visibilidade deriva de localStorage + eventos (useSyncExternalStore).
let forcedOpen = false;

function subscribe(onChange: () => void) {
  const open = () => {
    forcedOpen = true;
    onChange();
  };
  window.addEventListener(COOKIE_SETTINGS_EVENT, open);
  window.addEventListener(BANNER_REFRESH_EVENT, onChange);
  return () => {
    window.removeEventListener(COOKIE_SETTINGS_EVENT, open);
    window.removeEventListener(BANNER_REFRESH_EVENT, onChange);
  };
}

function getSnapshot() {
  return forcedOpen || !localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot() {
  return false;
}

export function CookieBanner() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [customizing, setCustomizing] = useState(false);
  // Checkboxes nunca vêm pré-marcadas (LGPD).
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  function save(analyticsConsent: boolean, marketingConsent: boolean) {
    localStorage.setItem(STORAGE_KEY, analyticsConsent ? "accepted" : "rejected");
    localStorage.setItem(MARKETING_KEY, marketingConsent ? "granted" : "denied");
    forcedOpen = false;
    setCustomizing(false);
    applyAnalyticsConsent(analyticsConsent, marketingConsent);
    window.dispatchEvent(new CustomEvent(BANNER_REFRESH_EVENT));
    window.dispatchEvent(new CustomEvent("abraceia:analytics-consent"));
    // Com consentimento revogado, trackEvent é no-op por design.
    trackEvent(
      analyticsConsent || marketingConsent ? "cookie_consent_accept" : "cookie_consent_reject",
    );
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimento de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white p-4 shadow-lg md:p-6"
    >
      <div className="mx-auto flex max-w-[1500px] flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Usamos cookies essenciais e, com seu consentimento, cookies de analytics (GA4/GTM) e de
          marketing.{" "}
          <a href="/cookies" className="font-medium text-care underline">
            Política de Cookies
          </a>{" "}
          e{" "}
          <a href="/privacidade" className="font-medium text-care underline">
            Política de Privacidade
          </a>
          .
        </p>

        {/* Painel de finalidades (LGPD: consentimento separado por finalidade). */}
        {customizing && (
          <div className="flex flex-col gap-2 rounded-card border border-border bg-muted/40 p-4 text-sm">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-border"
              />
              <span>
                <strong className="text-navy">Analytics</strong> — medir visitas e desempenho
                (GA4/GTM).
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-border"
              />
              <span>
                <strong className="text-navy">Marketing</strong> — remarketing e mensuração de
                anúncios.
              </span>
            </label>
          </div>
        )}

        {/* Botões com o mesmo peso visual (LGPD: aceitar não pode ser mais
            proeminente que rejeitar). */}
        <div className="flex flex-wrap gap-3 md:justify-end">
          {customizing ? (
            <Button intent="outline" size="sm" onClick={() => save(analytics, marketing)}>
              Salvar escolhas
            </Button>
          ) : (
            <Button intent="outline" size="sm" onClick={() => setCustomizing(true)}>
              Personalizar
            </Button>
          )}
          <Button intent="outline" size="sm" onClick={() => save(false, false)}>
            Rejeitar
          </Button>
          <Button intent="outline" size="sm" onClick={() => save(true, true)}>
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
}
