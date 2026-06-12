/**
 * @jest-environment node
 */
import { POST } from "@/app/api/analyze-seo/route";
import { analyzeSeo, SsrfBlockedError } from "@/lib/seo-audit";
import { notifyCrmWebhook } from "@/lib/integrations";

jest.mock("@/lib/seo-audit", () => {
  const actual = jest.requireActual("@/lib/seo-audit");
  return { ...actual, analyzeSeo: jest.fn() };
});
jest.mock("@/lib/integrations", () => ({ notifyCrmWebhook: jest.fn() }));

const analyzeSeoMock = analyzeSeo as jest.Mock;

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/analyze-seo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const RESULT = { overallScore: 80, timestamp: "2026-06-12T00:00:00.000Z" };

describe("POST /api/analyze-seo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    analyzeSeoMock.mockResolvedValue(RESULT);
  });

  it("rejeita dados de contato sem consentimento LGPD", async () => {
    const res = await POST(
      makeRequest({
        url: "google.com",
        formData: { email: "lead@exemplo.com" },
      }),
    );
    expect(res.status).toBe(400);
    expect(analyzeSeoMock).not.toHaveBeenCalled();
    expect(notifyCrmWebhook).not.toHaveBeenCalled();
  });

  it("envia ao CRM apenas com consentimento explícito", async () => {
    const res = await POST(
      makeRequest({
        url: "google.com",
        formData: { email: "lead@exemplo.com", telefone: "(31) 90000-0000", consent: true },
      }),
    );
    expect(res.status).toBe(200);
    expect(notifyCrmWebhook).toHaveBeenCalledTimes(1);
  });

  it("analisa sem dados de contato mesmo sem consentimento", async () => {
    const res = await POST(makeRequest({ url: "google.com" }));
    expect(res.status).toBe(200);
    expect(notifyCrmWebhook).not.toHaveBeenCalled();
  });

  it("retorna 400 quando o alvo é bloqueado por SSRF", async () => {
    analyzeSeoMock.mockRejectedValue(new SsrfBlockedError());
    const res = await POST(makeRequest({ url: "interno.exemplo.com" }));
    expect(res.status).toBe(400);
    const json = (await res.json()) as { error: string };
    expect(json.error).toMatch(/não pode ser analisada/i);
  });

  it("retorna 400 para URL inválida", async () => {
    const res = await POST(makeRequest({ url: "javascript:alert(1)" }));
    expect(res.status).toBe(400);
    expect(analyzeSeoMock).not.toHaveBeenCalled();
  });
});
