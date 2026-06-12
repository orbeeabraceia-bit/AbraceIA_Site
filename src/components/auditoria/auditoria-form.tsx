"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { checkComplianceText } from "@/lib/compliance";
import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

type AuditResult = {
  mode: string;
  summary: string;
  items: string[];
  risks?: string[];
  disclaimer: string;
};

export function AuditoriaForm() {
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [city, setCity] = useState("Belo Horizonte");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [adText, setAdText] = useState("");
  const [compliance, setCompliance] = useState<{ ok: boolean; violations: string[] } | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);

  async function handleAuditSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    trackEvent("ai_audit_started", { specialty, city });
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, specialty, city, consent }),
      });
      const data = (await res.json()) as AuditResult;
      setResult(data);
      setModalOpen(true);
      trackEvent("ai_audit_completed", { mode: data.mode });
      toast.success("Auditoria concluída");
    } catch {
      toast.error("Erro na auditoria. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function checkAd() {
    const r = checkComplianceText(adText);
    setCompliance(r);
    if (!r.ok) toast.warning("Termos de risco detectados");
    else toast.success("Nenhum termo proibido na lista base");
  }

  return (
    <>
      <Card className="mt-10">
        <CardTitle>Solicitar auditoria</CardTitle>
        <CardDescription>
          Compare sua presença com sites Orbee Labs já em produção (neuropediatria, ortopedia,
          geriatria, psicologia).
        </CardDescription>
        <form onSubmit={handleAuditSubmit} className="mt-6 space-y-4">
          <Input
            label="Nome da clínica ou profissional"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Especialidade"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
          />
          <Input label="Cidade" value={city} onChange={(e) => setCity(e.target.value)} required />
          <label className="flex items-start gap-3 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
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
          <Button type="submit" intent="ai" disabled={loading}>
            {loading ? "Analisando…" : "Ver presença em IA"}
          </Button>
        </form>
      </Card>

      <Card className="mt-10">
        <CardTitle>Verificador de compliance de anúncio</CardTitle>
        <CardDescription>Termos proibidos (Diretrizes do CFM)</CardDescription>
        <textarea
          value={adText}
          onChange={(e) => setAdText(e.target.value)}
          rows={4}
          className="mt-4 w-full rounded-btn border border-border p-3 text-sm"
          placeholder="Cole o texto do anúncio ou post…"
        />
        <Button intent="outline" className="mt-3" onClick={checkAd} type="button">
          Verificar compliance
        </Button>
        {compliance && (
          <p
            className={`mt-3 text-sm ${compliance.ok ? "text-care" : "text-danger"}`}
            role="status"
          >
            {compliance.ok
              ? "Nenhum termo proibido detectado."
              : `Riscos: ${compliance.violations.join(", ")}`}
          </p>
        )}
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Resultado da auditoria">
        {result && (
          <div className="space-y-4 text-sm text-navy">
            <p className="font-medium text-navy">{result.summary}</p>
            <ul className="list-inside list-disc space-y-1">
              {result.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {result.risks && result.risks.length > 0 && (
              <>
                <p className="font-semibold text-danger">Riscos</p>
                <ul className="list-inside list-disc">
                  {result.risks.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </>
            )}
            <p className="text-xs text-muted-foreground">{result.disclaimer}</p>
            <Link href="/contato" onClick={() => setModalOpen(false)}>
              <Button intent="care" className="w-full">
                Agendar diagnóstico completo
              </Button>
            </Link>
          </div>
        )}
      </Modal>

      <p className="mt-8 text-xs text-muted-foreground">{siteConfig.aiDisclaimer}</p>
    </>
  );
}
