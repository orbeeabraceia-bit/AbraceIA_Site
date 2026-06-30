/**
 * @jest-environment node
 */
import { isBlockedHostname, isPrivateIp, normalizeUrl } from "@/lib/seo-audit";

describe("normalizeUrl", () => {
  it("adiciona https:// quando o protocolo é omitido", () => {
    expect(normalizeUrl("google.com")).toBe("https://google.com/");
  });

  it("preserva URLs http/https válidas", () => {
    expect(normalizeUrl("https://exemplo.com.br/pagina")).toBe("https://exemplo.com.br/pagina");
    expect(normalizeUrl("http://exemplo.com.br")).toBe("http://exemplo.com.br/");
  });

  it("rejeita URL vazia", () => {
    expect(() => normalizeUrl("   ")).toThrow();
  });

  it("rejeita protocolos diferentes de http/https", () => {
    expect(() => normalizeUrl("ftp://exemplo.com")).toThrow();
    expect(() => normalizeUrl("file:///etc/passwd")).toThrow();
    expect(() => normalizeUrl("javascript:alert(1)")).toThrow();
  });

  it("rejeita hostname sem ponto que não seja alvo bloqueado", () => {
    expect(() => normalizeUrl("intranet")).toThrow();
  });
});

describe("isPrivateIp", () => {
  it.each([
    "127.0.0.1",
    "10.0.0.1",
    "172.16.0.1",
    "172.31.255.255",
    "192.168.1.1",
    "169.254.169.254",
    "100.64.0.1",
    "0.0.0.0",
    "192.0.0.1",
    "198.18.0.1",
    "224.0.0.1",
    "::1",
    "::",
    "fe80::1",
    "fd00::1",
    "fc00::1",
    "::ffff:127.0.0.1",
    "::ffff:192.168.0.10",
    "2002:c0a8:0101::", // 6to4 sobre 192.168.1.1
    "2002:7f00:0001::", // 6to4 sobre 127.0.0.1
    "64:ff9b::a9fe:a9fe", // NAT64 sobre 169.254.169.254
  ])("bloqueia %s", (ip) => {
    expect(isPrivateIp(ip)).toBe(true);
  });

  it.each([
    "8.8.8.8",
    "1.1.1.1",
    "200.100.50.25",
    "2606:4700::1111",
    "2002:0808:0808::", // 6to4 sobre 8.8.8.8 (público)
  ])("permite IP público %s", (ip) => {
    expect(isPrivateIp(ip)).toBe(false);
  });

  it("não bloqueia 172.x fora da faixa privada", () => {
    expect(isPrivateIp("172.15.0.1")).toBe(false);
    expect(isPrivateIp("172.32.0.1")).toBe(false);
  });
});

describe("isBlockedHostname", () => {
  it.each([
    "localhost",
    "api.localhost",
    "servidor.local",
    "metadata.internal",
    "127.0.0.1",
    "10.1.2.3",
    "::1",
    "LOCALHOST",
    "localhost.",
  ])("bloqueia %s", (host) => {
    expect(isBlockedHostname(host)).toBe(true);
  });

  it.each(["google.com", "abraceia.com.br", "8.8.8.8"])("permite %s", (host) => {
    expect(isBlockedHostname(host)).toBe(false);
  });
});
