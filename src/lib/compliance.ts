/** Palavras/expressões proibidas — Livro-Guia Cap. 1.6 */
export const forbiddenTerms = [
  "garantia de resultado",
  "1º lugar garantido",
  "melhor médico",
  "o mais",
  "cura definitiva",
  "trata 100% dos casos",
  "antes e depois sem tcle",
  "última chance",
  "promoção relâmpago",
] as const;

export function checkComplianceText(text: string): {
  ok: boolean;
  violations: string[];
} {
  const lower = text.toLowerCase();
  const violations = forbiddenTerms.filter((term) => lower.includes(term));
  return { ok: violations.length === 0, violations: [...violations] };
}
