import { anthropic } from "@ai-sdk/anthropic";
import type { LanguageModel } from "ai";

// Modelo padrão (Cap. 4.1). Pode ser sobrescrito via AI_MODEL no formato
// "provider/modelo" (AI Gateway) — o prefixo é removido no modo direto.
const DEFAULT_MODEL = "anthropic/claude-sonnet-4-6";

export function isAiConfigured(): boolean {
  return Boolean(process.env.AI_GATEWAY_API_KEY || process.env.ANTHROPIC_API_KEY);
}

export function getAiModel(): LanguageModel {
  const modelId = process.env.AI_MODEL?.trim() || DEFAULT_MODEL;
  if (process.env.AI_GATEWAY_API_KEY) {
    // String "provider/modelo" é resolvida pelo SDK via Vercel AI Gateway,
    // autenticado por AI_GATEWAY_API_KEY.
    return modelId;
  }
  return anthropic(modelId.replace(/^anthropic\//, ""));
}
