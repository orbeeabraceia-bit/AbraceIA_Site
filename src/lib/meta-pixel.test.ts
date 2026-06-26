import { applyAnalyticsConsent } from "@/lib/analytics";
import { generateMetaEventId, trackMetaEvent } from "@/lib/meta-pixel";

const MARKETING_KEY = "abraceia-cookie-marketing";

describe("meta-pixel — Pixel da Meta gateado por consentimento", () => {
  beforeEach(() => {
    localStorage.clear();
    delete window.fbq;
    delete window.gtag;
  });

  describe("generateMetaEventId", () => {
    it("retorna um id não-vazio e distinto a cada chamada (dedup com a CAPI)", () => {
      const a = generateMetaEventId();
      const b = generateMetaEventId();
      expect(a).toBeTruthy();
      expect(typeof a).toBe("string");
      expect(a).not.toBe(b);
    });
  });

  describe("trackMetaEvent", () => {
    it("é no-op SEM consentimento de marketing (LGPD)", () => {
      window.fbq = jest.fn();
      trackMetaEvent("Lead", { source: "contact" }, { eventID: "evt-1" });
      expect(window.fbq).not.toHaveBeenCalled();
    });

    it("não quebra quando o Pixel ainda não carregou (fbq ausente)", () => {
      localStorage.setItem(MARKETING_KEY, "granted");
      expect(() => trackMetaEvent("Lead")).not.toThrow();
    });

    it("dispara fbq('track', …) com consentimento de marketing + event_id", () => {
      localStorage.setItem(MARKETING_KEY, "granted");
      window.fbq = jest.fn();
      trackMetaEvent("Lead", { source: "contact" }, { eventID: "evt-1" });
      expect(window.fbq).toHaveBeenCalledWith(
        "track",
        "Lead",
        { source: "contact" },
        { eventID: "evt-1" },
      );
    });
  });

  describe("applyAnalyticsConsent — sincroniza o fbq", () => {
    it("concede (grant) quando há consentimento de marketing", () => {
      window.fbq = jest.fn();
      applyAnalyticsConsent(true, true);
      expect(window.fbq).toHaveBeenCalledWith("consent", "grant");
    });

    it("revoga (revoke) quando o marketing é negado", () => {
      window.fbq = jest.fn();
      applyAnalyticsConsent(true, false);
      expect(window.fbq).toHaveBeenCalledWith("consent", "revoke");
    });
  });
});
