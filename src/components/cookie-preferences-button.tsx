"use client";

import { Button } from "@/components/ui/button";
import { COOKIE_SETTINGS_EVENT } from "@/components/cookie-banner";

export function CookiePreferencesButton() {
  return (
    <Button
      intent="outline"
      onClick={() => window.dispatchEvent(new CustomEvent(COOKIE_SETTINGS_EVENT))}
    >
      Alterar preferências de cookies
    </Button>
  );
}
