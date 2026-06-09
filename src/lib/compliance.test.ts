import { checkComplianceText } from "@/lib/compliance";

describe("checkComplianceText", () => {
  it("aprova texto limpo", () => {
    const result = checkComplianceText(
      "Consultório em BH com SEO e compliance CFM.",
    );
    expect(result.ok).toBe(true);
    expect(result.violations).toHaveLength(0);
  });

  it("detecta termos proibidos", () => {
    const result = checkComplianceText("Garantia de resultado em 30 dias");
    expect(result.ok).toBe(false);
    expect(result.violations).toContain("garantia de resultado");
  });
});
