"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";

const questions = [
  { id: "schema", text: "Schema JSON-LD de saúde (Physician/MedicalBusiness)?", weight: 20 },
  { id: "cwv", text: "Core Web Vitals verdes no PageSpeed mobile?", weight: 20 },
  { id: "llms", text: "llms.txt publicado na raiz?", weight: 20 },
  { id: "author", text: "Autor CRM/RQE visível em conteúdo YMYL?", weight: 20 },
  { id: "faq", text: "FAQ com Schema FAQPage nas páginas-chave?", weight: 20 },
];

export function QuizIaReadiness() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);

  const score = questions.reduce((acc, q) => acc + (answers[q.id] ? q.weight : 0), 0);

  async function finish() {
    setDone(true);
    trackEvent("quiz_completed", { score });
    try {
      await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score, answers }),
      });
      toast.success(`Pontuação registrada: ${score}/100`);
    } catch {
      toast.message("Quiz concluído localmente");
    }
  }

  return (
    <Card>
      <CardTitle>Quiz: seu site está pronto para a era da IA?</CardTitle>
      <CardDescription>5 perguntas — checklist GEO AbraceIA (Cap. 5.3)</CardDescription>
      <div className="mt-6 space-y-4">
        {questions.map((q) => (
          <label
            key={q.id}
            className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border border-border p-4 hover:border-ai"
          >
            <input
              type="checkbox"
              checked={answers[q.id] ?? false}
              onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.checked }))}
              className="mt-1 h-4 w-4"
            />
            <span className="text-sm text-navy">{q.text}</span>
          </label>
        ))}
      </div>
      {!done ? (
        <Button intent="ai" className="mt-6" onClick={finish}>
          Ver minha pontuação
        </Button>
      ) : (
        <div className="mt-6 rounded-lg bg-ai-50 p-4">
          <p className="text-2xl font-bold text-navy">{score}/100</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {score >= 80
              ? "Excelente base! Foque em conteúdo enciclopédico e baseline de IA."
              : score >= 40
                ? "Gaps importantes: Schema, llms.txt e autor credenciado."
                : "Site ainda não preparado para GEO."}
          </p>
          <Link href="/auditoria-ia" className="mt-4 inline-block">
            <Button intent="care" size="sm">
              Auditoria técnica gratuita
            </Button>
          </Link>
        </div>
      )}
    </Card>
  );
}
