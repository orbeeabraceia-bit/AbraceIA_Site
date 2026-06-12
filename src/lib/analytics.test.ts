import { applyAnalyticsConsent, hasAnalyticsConsent, trackEvent } from "@/lib/analytics";

const CONSENT_KEY = "abraceia-cookie-consent";

describe("analytics — consentimento LGPD", () => {
  beforeEach(() => {
    localStorage.clear();
    window.dataLayer = [];
    window.gtag = jest.fn();
  });

  it("hasAnalyticsConsent reflete a escolha salva", () => {
    expect(hasAnalyticsConsent()).toBe(false);
    localStorage.setItem(CONSENT_KEY, "accepted");
    expect(hasAnalyticsConsent()).toBe(true);
    localStorage.setItem(CONSENT_KEY, "rejected");
    expect(hasAnalyticsConsent()).toBe(false);
  });

  it("trackEvent NÃO envia nada sem consentimento", () => {
    trackEvent("generate_lead", { source: "test" });
    expect(window.dataLayer).toHaveLength(0);
    expect(window.gtag).not.toHaveBeenCalled();
  });

  it("trackEvent NÃO envia após revogação", () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    trackEvent("evento_antes");
    localStorage.setItem(CONSENT_KEY, "rejected");
    trackEvent("evento_depois");
    expect(window.dataLayer).toHaveLength(1);
    expect(window.dataLayer?.[0]).toMatchObject({ event: "evento_antes" });
    expect(window.gtag).toHaveBeenCalledTimes(1);
  });

  it("trackEvent envia com consentimento ativo", () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    trackEvent("quiz_completed", { score: 80 });
    expect(window.dataLayer?.[0]).toMatchObject({ event: "quiz_completed", score: 80 });
    expect(window.gtag).toHaveBeenCalledWith("event", "quiz_completed", { score: 80 });
  });

  it("applyAnalyticsConsent(false) nega analytics_storage e limpa a fila", () => {
    window.dataLayer = [{ event: "antigo" }];
    applyAnalyticsConsent(false);
    expect(window.gtag).toHaveBeenCalledWith("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
    });
    expect(window.dataLayer).toHaveLength(0);
  });

  it("applyAnalyticsConsent(true) concede analytics_storage", () => {
    applyAnalyticsConsent(true);
    expect(window.gtag).toHaveBeenCalledWith("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
    });
  });
});
