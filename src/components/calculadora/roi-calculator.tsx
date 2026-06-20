"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import Link from "next/link";
import { Calculator, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { calcularRoi, formatBRL } from "@/lib/roi";
import { trackEvent } from "@/lib/analytics";

const DEFAULTS = {
  visitasMensais: 500,
  taxaConversao: 2,
  ticketMedio: 300,
  crescimentoEstimado: 50,
};

type Field = keyof typeof DEFAULTS;

function Metric({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className={highlight ? "rounded-lg bg-ai-50 p-4" : "rounded-lg border border-border p-4"}>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p
        className={
          highlight ? "mt-1 text-2xl font-black text-navy" : "mt-1 text-xl font-bold text-navy"
        }
      >
        {value}
      </p>
    </div>
  );
}

export function RoiCalculator() {
  const [form, setForm] = useState(DEFAULTS);
  const [shown, setShown] = useState(false);

  const result = useMemo(() => calcularRoi(form), [form]);

  const set = (key: Field) => (e: ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: Number(e.target.value) }));

  function calcular() {
    setShown(true);
    trackEvent("roi_calculated", {
      visitas: form.visitasMensais,
      crescimento: form.crescimentoEstimado,
      ganho_anual: result.ganhoAnual,
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Entradas */}
      <Card>
        <CardTitle>Seus números</CardTitle>
        <CardDescription>
          Preencha com estimativas — todos os valores são orientativos.
        </CardDescription>
        <div className="mt-6 space-y-4">
          <Input
            label="Visitas orgânicas por mês"
            type="number"
            min={0}
            inputMode="numeric"
            value={form.visitasMensais}
            onChange={set("visitasMensais")}
          />
          <Input
            label="Taxa de conversão em pacientes (%)"
            type="number"
            min={0}
            max={100}
            step={0.1}
            inputMode="decimal"
            value={form.taxaConversao}
            onChange={set("taxaConversao")}
          />
          <Input
            label="Ticket médio por paciente (R$)"
            type="number"
            min={0}
            inputMode="numeric"
            value={form.ticketMedio}
            onChange={set("ticketMedio")}
          />
          <Input
            label="Crescimento de tráfego projetado (%)"
            type="number"
            min={0}
            inputMode="numeric"
            value={form.crescimentoEstimado}
            onChange={set("crescimentoEstimado")}
          />
          <Button intent="ai" className="w-full" onClick={calcular}>
            <Calculator className="h-4 w-4" /> Calcular potencial estimado
          </Button>
        </div>
      </Card>

      {/* Resultado */}
      {shown ? (
        <Card className="flex flex-col">
          <CardTitle>Potencial estimado</CardTitle>
          <CardDescription>Projeção a partir dos números informados.</CardDescription>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Metric label="Receita atual /mês" value={formatBRL(result.receitaAtual)} />
            <Metric label="Receita projetada /mês" value={formatBRL(result.receitaProjetada)} />
            <Metric label="Pacientes projetados /mês" value={String(result.pacientesProjetados)} />
            <Metric label="Ganho mensal estimado" value={formatBRL(result.ganhoMensal)} />
          </div>
          <div className="mt-3">
            <Metric label="Ganho anual estimado" value={formatBRL(result.ganhoAnual)} highlight />
          </div>
          <div className="mt-6 flex items-start gap-2 rounded-lg bg-cream/60 p-3 text-xs text-muted-foreground">
            <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-care" aria-hidden />
            <span>
              Simulação orientativa, não é promessa de resultado. Os ganhos reais dependem de
              concorrência, sazonalidade e execução. Sem garantia de faturamento (CFM/CFP/CFO).
            </span>
          </div>
          <Link href="/contato" className="mt-6">
            <Button intent="care" className="w-full">
              Quero um diagnóstico real
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="flex items-center justify-center rounded-card border border-dashed border-border bg-muted/40 p-8 text-center">
          <p className="max-w-xs text-sm text-muted-foreground">
            Informe seus números e clique em <strong>Calcular potencial estimado</strong> para ver a
            projeção de crescimento orgânico.
          </p>
        </div>
      )}
    </div>
  );
}
