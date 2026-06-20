/**
 * @jest-environment node
 */
import { rateLimit, clientIp } from "@/lib/rate-limit";

describe("rateLimit", () => {
  it("permite requisições dentro do limite e informa o restante", () => {
    const key = "test:permite";
    const r1 = rateLimit(key, 2, 60_000);
    const r2 = rateLimit(key, 2, 60_000);
    expect(r1.ok).toBe(true);
    expect(r2.ok).toBe(true);
    if (r2.ok) expect(r2.remaining).toBe(0);
  });

  it("bloqueia (429) quando o limite é excedido, com retryAfter", () => {
    const key = "test:bloqueia";
    rateLimit(key, 1, 60_000);
    const blocked = rateLimit(key, 1, 60_000);
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) expect(blocked.retryAfter).toBeGreaterThan(0);
  });

  it("reinicia a contagem quando a janela expira", () => {
    const key = "test:reset";
    const nowSpy = jest.spyOn(Date, "now");
    nowSpy.mockReturnValue(1_000);
    rateLimit(key, 1, 100); // janela válida até 1.100
    nowSpy.mockReturnValue(2_000); // já passou da janela
    const later = rateLimit(key, 1, 100);
    expect(later.ok).toBe(true);
    nowSpy.mockRestore();
  });
});

describe("clientIp", () => {
  it("extrai o primeiro IP de x-forwarded-for", () => {
    const req = new Request("http://x", {
      headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" },
    });
    expect(clientIp(req)).toBe("1.2.3.4");
  });

  it("usa x-real-ip como fallback", () => {
    const req = new Request("http://x", { headers: { "x-real-ip": "9.9.9.9" } });
    expect(clientIp(req)).toBe("9.9.9.9");
  });

  it("retorna 'unknown' quando não há header de IP", () => {
    expect(clientIp(new Request("http://x"))).toBe("unknown");
  });
});
