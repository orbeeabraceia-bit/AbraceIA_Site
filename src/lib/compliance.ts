/**
 * Palavras/expressões proibidas na publicidade de saúde, consolidando as
 * diretrizes dos conselhos atendidos pela vertical AbraceIA:
 * - CFM 2.336/2023 (medicina)
 * - CFP Código de Ética + Nota Técnica 1/2022 (psicologia)
 * - CFO 196/2019 (odontologia)
 * Termos em minúsculas; a checagem é case-insensitive por substring.
 */
export const forbiddenTerms = [
  // CFM — sem promessa de resultado, superlativo ou sensacionalismo
  "garantia de resultado",
  "resultado garantido",
  "1º lugar garantido",
  "melhor médico",
  "o mais",
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

export function checkComplianceText(text: string): {
  ok: boolean;
  violations: string[];
} {
  const lower = text.toLowerCase();
  const violations = forbiddenTerms.filter((term) => lower.includes(term));
  return { ok: violations.length === 0, violations: [...violations] };
}
