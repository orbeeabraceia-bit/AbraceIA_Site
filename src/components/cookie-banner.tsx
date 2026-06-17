"use client";

import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { applyAnalyticsConsent, trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "abraceia-cookie-consent";

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

  function save(accepted: boolean) {
    localStorage.setItem(STORAGE_KEY, accepted ? "accepted" : "rejected");
    forcedOpen = false;
    applyAnalyticsConsent(accepted);
    window.dispatchEvent(new CustomEvent(BANNER_REFRESH_EVENT));
    window.dispatchEvent(new CustomEvent("abraceia:analytics-consent"));
    // Com consentimento revogado, trackEvent é no-op por design.
    trackEvent(accepted ? "cookie_consent_accept" : "cookie_consent_reject");
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimento de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white p-4 shadow-lg md:p-6"
    >
      <div className="mx-auto flex max-w-[1500px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">
          Usamos cookies essenciais e, com seu consentimento, analytics (GA4/GTM).{" "}
          <a href="/cookies" className="font-medium text-care underline">
            Política de Cookies
          </a>{" "}
          e{" "}
          <a href="/privacidade" className="font-medium text-care underline">
            Política de Privacidade
          </a>
          .
        </p>
        {/* Mesmo peso visual nos dois botões (LGPD: aceitar não pode ser
            mais proeminente que rejeitar). */}
        <div className="flex shrink-0 gap-3">
          <Button intent="outline" size="sm" onClick={() => save(false)}>
            Rejeitar
          </Button>
          <Button intent="outline" size="sm" onClick={() => save(true)}>
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
}
