/**
 * @jest-environment node
 */
import { POST } from "@/app/api/audit/route";
import { generateText } from "ai";
import { notifyCrmWebhook } from "@/lib/integrations";

// after() exige contexto de request do Next, ausente em teste unitário direto:
// mockamos para executar o callback na hora (preservando NextResponse).
jest.mock("next/server", () => {
  const actual = jest.requireActual("next/server");
  return { ...actual, after: (fn: () => unknown) => fn() };
});
jest.mock("ai", () => ({ generateText: jest.fn() }));
jest.mock("@/lib/integrations", () => ({ notifyCrmWebhook: jest.fn() }));

const mockGenerate = generateText as jest.Mock;

// IP único por chamada evita compartilhar o bucket de rate-limit entre testes.
function makeRequest(body: unknown, ip?: string) {
  return new Request("http://localhost/api/audit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(ip ? { "x-forwarded-for": ip } : {}),
    },
    body: JSON.stringify(body),
  });
}

const VALID = { name: "Clínica Vida", specialty: "Geriatria", city: "Belo Horizonte" };

describe("POST /api/audit — consentimento LGPD", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.ANTHROPIC_API_KEY;
    delete process.env.AI_GATEWAY_API_KEY;
  });

  it("rejeita requisição sem consentimento", async () => {
    const res = await POST(makeRequest(VALID));
    expect(res.status).toBe(400);
    expect(notifyCrmWebhook).not.toHaveBeenCalled();
  });

  it("rejeita consentimento falso", async () => {
    const res = await POST(makeRequest({ ...VALID, consent: false }));
    expect(res.status).toBe(400);
    expect(notifyCrmWebhook).not.toHaveBeenCalled();
  });

  it("aceita com consentimento e cai no checklist sem chave de IA", async () => {
    const res = await POST(makeRequest({ ...VALID, consent: true }));
    expect(res.status).toBe(200);
    const json = (await res.json()) as { mode: string };
    expect(json.mode).toBe("checklist");
    expect(notifyCrmWebhook).toHaveBeenCalledTimes(1);
  });
});

describe("POST /api/audit — modo IA (parse robusto + compliance)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.ANTHROPIC_API_KEY = "sk-test";
    delete process.env.AI_GATEWAY_API_KEY;
  });
  afterAll(() => {
    delete process.env.ANTHROPIC_API_KEY;
  });

  type AuditJson = { mode: string; summary?: string; items?: string[] };

  it("extrai JSON mesmo com cercas markdown (SEG-03)", async () => {
    mockGenerate.mockResolvedValue({
      text: '```json\n{"summary":"Resumo ok","items":["a","b"],"risks":[]}\n```',
    });
    const res = await POST(makeRequest({ ...VALID, consent: true }, "10.0.0.1"));
    const json = (await res.json()) as AuditJson;
    expect(json.mode).toBe("ai");
    expect(json.summary).toBe("Resumo ok");
    expect(json.items).toEqual(["a", "b"]);
  });

  it("descarta saída com termo proibido e cai no checklist (CMP-01)", async () => {
    mockGenerate.mockResolvedValue({
      text: '{"summary":"Garantia de resultado para sua clínica","items":["x"],"risks":[]}',
    });
    const res = await POST(makeRequest({ ...VALID, consent: true }, "10.0.0.2"));
    const json = (await res.json()) as AuditJson;
    expect(json.mode).toBe("checklist");
  });

  it("cai no checklist quando a IA não retorna JSON utilizável (SEG-03)", async () => {
    mockGenerate.mockResolvedValue({ text: "desculpe, não consegui gerar o relatório" });
    const res = await POST(makeRequest({ ...VALID, consent: true }, "10.0.0.3"));
    const json = (await res.json()) as AuditJson;
    expect(json.mode).toBe("checklist");
  });
});
