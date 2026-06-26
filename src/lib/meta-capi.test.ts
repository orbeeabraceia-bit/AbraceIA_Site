/**
 * @jest-environment node
 */
import { createHash } from "node:crypto";
import { isMetaCapiConfigured, sendMetaCapiEvent } from "@/lib/meta-capi";

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

describe("meta-capi — Conversions API server-side", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.NEXT_PUBLIC_FB_PIXEL_ID;
    delete process.env.META_CAPI_TOKEN;
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it("isMetaCapiConfigured exige Pixel ID e token", () => {
    expect(isMetaCapiConfigured()).toBe(false);
    process.env.NEXT_PUBLIC_FB_PIXEL_ID = "123";
    expect(isMetaCapiConfigured()).toBe(false);
    process.env.META_CAPI_TOKEN = "tok";
    expect(isMetaCapiConfigured()).toBe(true);
  });

  it("é no-op (não chama fetch) sem chaves configuradas", async () => {
    await sendMetaCapiEvent({
      eventName: "Lead",
      userData: { email: "a@b.com" },
    });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("envia PII com hash SHA-256 e o event_id para dedup", async () => {
    process.env.NEXT_PUBLIC_FB_PIXEL_ID = "123";
    process.env.META_CAPI_TOKEN = "tok";

    await sendMetaCapiEvent({
      eventName: "Lead",
      eventId: "evt-1",
      eventSourceUrl: "https://abraceia.com.br/contato",
      userData: {
        email: "  Pessoa@Exemplo.COM ",
        phone: "+55 (31) 99999-0000",
        clientIp: "203.0.113.7",
        userAgent: "jest",
      },
      customData: { lead_source: "contact" },
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url, init] = (global.fetch as jest.Mock).mock.calls[0];
    expect(url).toContain("/123/events");
    const body = JSON.parse((init as RequestInit).body as string);
    const ev = body.data[0];

    // E-mail normalizado (trim + lowercase) e telefone só com dígitos, ambos com hash.
    expect(ev.user_data.em).toEqual([sha256("pessoa@exemplo.com")]);
    expect(ev.user_data.ph).toEqual([sha256("5531999990000")]);
    // PII nunca em claro.
    expect((init as RequestInit).body).not.toContain("Pessoa@Exemplo");
    expect(ev.event_id).toBe("evt-1");
    expect(ev.action_source).toBe("website");
    expect(body.access_token).toBe("tok");
  });
});
