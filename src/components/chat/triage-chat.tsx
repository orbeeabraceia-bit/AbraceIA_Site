"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

type Message = { role: "user" | "assistant"; text: string };

export function TriageChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Olá! Posso orientar sobre presença digital e GEO para clínicas. Não substituo consulta médica.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Erro");
      setMessages((m) => [...m, { role: "assistant", text: data.reply ?? "" }]);
      if (data.reply?.includes("contato")) {
        trackEvent("ai_chat_human_fallback", { trigger: "contato" });
      }
    } catch {
      setError("Não foi possível responder agora. Fale conosco em /contato.");
      trackEvent("ai_chat_error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-card border border-border bg-white">
      <div className="border-b border-border px-4 py-3">
        <p className="font-semibold text-navy">Triagem digital AbraceIA</p>
        <p className="text-xs text-muted-foreground">{siteConfig.aiDisclaimer}</p>
      </div>
      <div
        className="max-h-72 space-y-3 overflow-y-auto p-4"
        aria-live="polite"
        aria-label="Mensagens do chat"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`rounded-lg px-3 py-2 text-sm ${
              m.role === "user"
                ? "ml-8 bg-ai-50 text-navy"
                : "mr-8 bg-cream text-navy"
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <p className="text-sm text-muted-foreground" role="status">
            Analisando…
          </p>
        )}
      </div>
      {error && (
        <p className="px-4 text-sm text-danger" role="alert">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2 border-t border-border p-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pergunte sobre GEO ou presença digital…"
          className="min-h-11 flex-1 rounded-btn border border-border px-3 text-sm"
          aria-label="Sua mensagem"
        />
        <Button type="submit" intent="ai" disabled={loading}>
          Enviar
        </Button>
      </form>
    </div>
  );
}
