/**
 * @jest-environment node
 */
import { POST } from "@/app/api/quiz/route";
import { notifyCrmWebhook } from "@/lib/integrations";

jest.mock("@/lib/db", () => ({ prisma: null }));
jest.mock("@/lib/integrations", () => ({ notifyCrmWebhook: jest.fn() }));

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const VALID = { score: 80, answers: { schema: true, cwv: false } };

describe("POST /api/quiz — consentimento LGPD", () => {
  beforeEach(() => jest.clearAllMocks());

  it("rejeita e-mail sem consentimento", async () => {
    const res = await POST(makeRequest({ ...VALID, email: "lead@exemplo.com" }));
    expect(res.status).toBe(400);
    expect(notifyCrmWebhook).not.toHaveBeenCalled();
  });

  it("rejeita e-mail com consentimento falso", async () => {
    const res = await POST(makeRequest({ ...VALID, email: "lead@exemplo.com", consent: false }));
    expect(res.status).toBe(400);
    expect(notifyCrmWebhook).not.toHaveBeenCalled();
  });

  it("aceita e-mail com consentimento explícito", async () => {
    const res = await POST(makeRequest({ ...VALID, email: "lead@exemplo.com", consent: true }));
    expect(res.status).toBe(200);
    expect(notifyCrmWebhook).toHaveBeenCalledTimes(1);
  });

  it("aceita quiz anônimo (sem e-mail) sem exigir consentimento", async () => {
    const res = await POST(makeRequest(VALID));
    expect(res.status).toBe(200);
    const json = (await res.json()) as { ok: boolean; score: number };
    expect(json).toEqual({ ok: true, score: 80 });
  });
});
