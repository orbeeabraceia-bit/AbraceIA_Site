/**
 * @jest-environment node
 */
import { POST } from "@/app/api/audit/route";
import { notifyCrmWebhook } from "@/lib/integrations";

jest.mock("ai", () => ({ generateText: jest.fn() }));
jest.mock("@/lib/integrations", () => ({ notifyCrmWebhook: jest.fn() }));

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/audit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
