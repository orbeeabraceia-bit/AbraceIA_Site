"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hasMarketingConsent, trackEvent } from "@/lib/analytics";
import { generateMetaEventId, trackMetaEvent } from "@/lib/meta-pixel";
import { siteConfig } from "@/lib/site-config";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("website")) {
      setStatus("success");
      form.reset();
      return;
    }

    // event_id compartilhado entre o Pixel (browser) e a Conversions API
    // (servidor) para que a Meta deduplique a mesma conversão. Só enviamos o
    // sinal de marketing ao servidor com consentimento explícito (LGPD): o CAPI
    // compartilha PII com a Meta e exige a finalidade de marketing.
    const metaEventId = generateMetaEventId();
    const marketingConsent = hasMarketingConsent();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
          consent: data.get("consent") === "on",
          website: data.get("website"),
          metaEventId,
          marketingConsent,
        }),
      });

      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        throw new Error(body.error ?? "Erro ao enviar");
      }

      setStatus("success");
      form.reset();
      trackEvent("generate_lead", { source: "contact" });
      // No-op sem consentimento de marketing (gateado em trackMetaEvent).
      trackMetaEvent("Lead", { source: "contact" }, { eventID: metaEventId });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Erro ao enviar");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      <Input label="Nome completo" name="name" required autoComplete="name" />
      <Input
        label="E-mail"
        name="email"
        type="email"
        required
        autoComplete="email"
      />
      <Input label="Telefone (opcional)" name="phone" type="tel" autoComplete="tel" />
      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-sm font-medium text-navy">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="flex w-full rounded-btn border border-border bg-white px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-care"
        />
      </div>
      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 rounded border-border"
        />
        <span>
          Autorizo o tratamento dos meus dados conforme a{" "}
          <a href="/privacidade" className="text-ai underline">
            Política de Privacidade
          </a>{" "}
          (LGPD).
        </span>
      </label>
      <p className="text-xs text-muted-foreground">{siteConfig.aiDisclaimer}</p>
      <Button type="submit" intent="primary" disabled={status === "loading"}>
        {status === "loading" ? "Enviando…" : "Enviar mensagem"}
      </Button>
      {status === "success" && (
        <p className="text-sm text-care" role="status">
          Mensagem enviada com sucesso. Retornaremos em breve.
        </p>
      )}
      {error && (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
