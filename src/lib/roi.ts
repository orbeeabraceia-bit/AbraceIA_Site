// Estimativa de potencial de crescimento orgânico (lead magnet "Calculadora ROI",
// Cap. 6.6 do Livro-Guia). É uma SIMULAÇÃO orientativa — não promessa de
// resultado (compliance CFM/CFP/CFO). Os números são arredondados para exibição.

export type RoiInput = {
  /** Visitas orgânicas atuais por mês. */
  visitasMensais: number;
  /** % de visitantes que viram pacientes/agendamentos (ex.: 2 = 2%). */
  taxaConversao: number;
  /** Ticket médio por paciente, em reais. */
  ticketMedio: number;
  /** % de crescimento de tráfego projetado com o trabalho (ex.: 50 = +50%). */
  crescimentoEstimado: number;
};

export type RoiResult = {
  pacientesAtuais: number;
  receitaAtual: number;
  visitasProjetadas: number;
  pacientesProjetados: number;
  receitaProjetada: number;
  ganhoMensal: number;
  ganhoAnual: number;
};

function round(value: number, decimals = 0): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/**
 * Calcula o potencial estimado a partir das visitas, conversão, ticket médio e
 * crescimento projetado. Entradas inválidas/negativas são saneadas; a conversão
 * é limitada a 0–100%.
 */
export function calcularRoi(input: RoiInput): RoiResult {
  const visitas = Math.max(0, Number(input.visitasMensais) || 0);
  const conversao = Math.min(100, Math.max(0, Number(input.taxaConversao) || 0));
  const ticket = Math.max(0, Number(input.ticketMedio) || 0);
  const crescimento = Math.max(0, Number(input.crescimentoEstimado) || 0);

  const fracConversao = conversao / 100;
  const pacientesAtuais = visitas * fracConversao;
  const receitaAtual = pacientesAtuais * ticket;

  const visitasProjetadas = visitas * (1 + crescimento / 100);
  const pacientesProjetados = visitasProjetadas * fracConversao;
  const receitaProjetada = pacientesProjetados * ticket;

  const ganhoMensal = receitaProjetada - receitaAtual;
  const ganhoAnual = ganhoMensal * 12;

  return {
    pacientesAtuais: round(pacientesAtuais, 1),
    receitaAtual: round(receitaAtual),
    visitasProjetadas: round(visitasProjetadas),
    pacientesProjetados: round(pacientesProjetados, 1),
    receitaProjetada: round(receitaProjetada),
    ganhoMensal: round(ganhoMensal),
    ganhoAnual: round(ganhoAnual),
  };
}

/** Formata um valor em reais (pt-BR), sem casas decimais. */
export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}
