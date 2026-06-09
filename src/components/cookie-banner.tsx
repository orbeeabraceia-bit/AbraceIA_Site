"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "abraceia-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  function save(accepted: boolean) {
    localStorage.setItem(STORAGE_KEY, accepted ? "accepted" : "rejected");
    setVisible(false);
    window.dispatchEvent(new CustomEvent("abraceia:analytics-consent"));
    trackEvent(accepted ? "cookie_consent_accept" : "cookie_consent_reject");
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimento de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white p-4 shadow-lg md:p-6"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
        <div className="flex shrink-0 gap-3">
          <Button intent="outline" size="sm" onClick={() => save(false)}>
            Rejeitar
          </Button>
          <Button intent="primary" size="sm" onClick={() => save(true)}>
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
}
