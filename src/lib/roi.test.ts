import { calcularRoi, formatBRL } from "@/lib/roi";

describe("calcularRoi", () => {
  it("calcula o potencial com um cenário típico", () => {
    const r = calcularRoi({
      visitasMensais: 1000,
      taxaConversao: 2,
      ticketMedio: 300,
      crescimentoEstimado: 50,
    });
    expect(r.pacientesAtuais).toBe(20);
    expect(r.receitaAtual).toBe(6000);
    expect(r.visitasProjetadas).toBe(1500);
    expect(r.pacientesProjetados).toBe(30);
    expect(r.receitaProjetada).toBe(9000);
    expect(r.ganhoMensal).toBe(3000);
    expect(r.ganhoAnual).toBe(36000);
  });

  it("retorna tudo zero quando não há visitas", () => {
    const r = calcularRoi({
      visitasMensais: 0,
      taxaConversao: 2,
      ticketMedio: 300,
      crescimentoEstimado: 50,
    });
    expect(r.receitaAtual).toBe(0);
    expect(r.ganhoMensal).toBe(0);
    expect(r.ganhoAnual).toBe(0);
  });

  it("saneia valores negativos e limita a conversão a 100%", () => {
    const r = calcularRoi({
      visitasMensais: -500,
      taxaConversao: 150,
      ticketMedio: -100,
      crescimentoEstimado: -10,
    });
    expect(r.visitasProjetadas).toBe(0);
    expect(r.receitaAtual).toBe(0);
    expect(r.ganhoAnual).toBe(0);
  });

  it("sem crescimento, o ganho é zero mas há receita atual", () => {
    const r = calcularRoi({
      visitasMensais: 800,
      taxaConversao: 2.5,
      ticketMedio: 400,
      crescimentoEstimado: 0,
    });
    expect(r.pacientesAtuais).toBe(20);
    expect(r.receitaAtual).toBe(8000);
    expect(r.ganhoMensal).toBe(0);
  });
});

describe("formatBRL", () => {
  it("formata em reais sem casas decimais", () => {
    expect(formatBRL(36000)).toBe("R$ 36.000");
    expect(formatBRL(0)).toBe("R$ 0");
  });
});
