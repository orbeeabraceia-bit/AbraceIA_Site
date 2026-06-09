import { siteFaq } from "@/lib/content/faq";

describe("siteFaq", () => {
  it("tem pelo menos 10 perguntas para AEO", () => {
    expect(siteFaq.length).toBeGreaterThanOrEqual(10);
  });

  it("cada item tem pergunta e resposta", () => {
    for (const item of siteFaq) {
      expect(item.question.length).toBeGreaterThan(10);
      expect(item.answer.length).toBeGreaterThan(20);
    }
  });
});
