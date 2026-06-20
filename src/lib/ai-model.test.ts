/**
 * @jest-environment node
 */
import { getAiModel, isAiConfigured } from "@/lib/ai-model";

describe("ai-model", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV };
    delete process.env.ANTHROPIC_API_KEY;
    delete process.env.AI_GATEWAY_API_KEY;
    delete process.env.AI_MODEL;
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("isAiConfigured é false sem nenhuma chave", () => {
    expect(isAiConfigured()).toBe(false);
  });

  it("isAiConfigured é true com qualquer uma das chaves", () => {
    process.env.ANTHROPIC_API_KEY = "sk-test";
    expect(isAiConfigured()).toBe(true);
    delete process.env.ANTHROPIC_API_KEY;
    process.env.AI_GATEWAY_API_KEY = "gw-test";
    expect(isAiConfigured()).toBe(true);
  });

  it("no modo gateway retorna a string provider/modelo", () => {
    process.env.AI_GATEWAY_API_KEY = "gw-test";
    process.env.AI_MODEL = "anthropic/claude-sonnet-4-6";
    expect(getAiModel()).toBe("anthropic/claude-sonnet-4-6");
  });

  it("no modo direto (sem gateway) retorna um objeto de modelo, não a string", () => {
    process.env.ANTHROPIC_API_KEY = "sk-test";
    const model = getAiModel();
    expect(typeof model).not.toBe("string");
    expect(model).toBeTruthy();
  });
});
