/**
 * Palavras/expressões proibidas na publicidade de saúde, consolidando as
 * diretrizes dos conselhos atendidos pela vertical AbraceIA:
 * - CFM 2.336/2023 (medicina)
 * - CFP Código de Ética + Nota Técnica 1/2022 (psicologia)
 * - CFO 196/2019 (odontologia)
 * Termos em minúsculas; a checagem é case-insensitive, por palavra inteira
 * (limites Unicode-aware) — assim "desconto" não dispara em "descontos de
 * impostos" nem "o melhor" em palavras maiores.
 */
export const forbiddenTerms = [
  // CFM — sem promessa de resultado, superlativo ou sensacionalismo
  "garantia de resultado",
  "resultado garantido",
  "1º lugar garantido",
  "melhor médico",
  "o melhor",
  "a melhor",
  "cura definitiva",
  "trata 100% dos casos",
  "antes e depois sem tcle",
  "última chance",
  "promoção relâmpago",
  // CFP — preço como publicidade, exclusividade e sensacionalismo são proibidos
  "preço social",
  "desconto",
  "pacote promocional",
  "valor acessível",
  "método exclusivo",
  "técnica exclusiva",
  // CFO — preço como atrativo e promessa de ausência de dor/resultado
  "menor preço",
  "sem dor garantido",
  // Genéricos sensacionalistas (vedados em todos os conselhos)
  "milagre",
  "milagroso",
] as const;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Limite de "palavra" Unicode-aware: a posição não pode estar colada a uma
// letra ou número (mas pode estar junto a espaço, pontuação, início/fim).
function matchesWholeTerm(text: string, term: string): boolean {
  const re = new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(term)}(?![\\p{L}\\p{N}])`, "iu");
  return re.test(text);
}

export function checkComplianceText(text: string): {
  ok: boolean;
  violations: string[];
} {
  const violations = forbiddenTerms.filter((term) => matchesWholeTerm(text, term));
  return { ok: violations.length === 0, violations: [...violations] };
}
