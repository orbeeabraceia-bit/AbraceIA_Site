import { checkComplianceText } from "@/lib/compliance";

describe("checkComplianceText", () => {
  it("aprova texto limpo", () => {
    const result = checkComplianceText("Consultório em BH com SEO e compliance CFM.");
    expect(result.ok).toBe(true);
    expect(result.violations).toHaveLength(0);
  });

  it("detecta termos proibidos (CFM)", () => {
    const result = checkComplianceText("Garantia de resultado em 30 dias");
    expect(result.ok).toBe(false);
    expect(result.violations).toContain("garantia de resultado");
  });

  it("detecta preço como publicidade (CFP)", () => {
    const result = checkComplianceText("Terapia com pacote promocional e preço social neste mês");
    expect(result.ok).toBe(false);
    expect(result.violations).toContain("pacote promocional");
    expect(result.violations).toContain("preço social");
  });

  it("detecta promessa de ausência de dor (CFO)", () => {
    const result = checkComplianceText("Implante sem dor garantido");
    expect(result.ok).toBe(false);
    expect(result.violations).toContain("sem dor garantido");
  });
});
