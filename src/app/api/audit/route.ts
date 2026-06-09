import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { siteConfig } from "@/lib/site-config";
import { notifyCrmWebhook } from "@/lib/integrations";

const auditSchema = z.object({
  name: z.string().min(2).max(120),
  specialty: z.string().min(2).max(80),
  city: z.string().min(2).max(80),
});

function fallbackReport(name: string, specialty: string, city: string) {
  return {
    mode: "checklist" as const,
    summary: `Checklist orientativo para ${name} (${specialty}, ${city}).`,
    items: [
      `Testar no ChatGPT: "melhor ${specialty} em ${city}" — registrar quem é citado`,
      "Verificar llms.txt e Schema MedicalBusiness/Physician",
      "Confirmar bots de IA permitidos no robots.txt",
      "Publicar conteúdo enciclopédico com autor CRM/RQE visível",
      "Comparar com referências Orbee Labs: janainadrumond.com.br (ortopedia), drapaulakac.com.br (geriatria)",
      "Agendar reteste em 90 dias com prints documentados",
    ],
    disclaimer: siteConfig.aiDisclaimer,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = auditSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const { name, specialty, city } = parsed.data;

    void notifyCrmWebhook({
      type: "audit",
      name,
      specialty,
      city,
      createdAt: new Date().toISOString(),
    });

    if (!process.env.AI_GATEWAY_KEY && !process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(fallbackReport(name, specialty, city));
    }

    const prompt = `Você é consultor de GEO para saúde em ${city}, Brasil.
Analise orientativamente (NÃO diagnostique, NÃO prescreva) como a clínica "${name}" (${specialty}) pode melhorar citação em IAs generativas.
Responda em JSON: { "summary": string, "items": string[5], "risks": string[] }
Respeite CFM 2.336/2023 — sem promessa de resultado.`;

    const { text } = await generateText({
      model: anthropic("claude-sonnet-4-20250514"),
      prompt,
      maxOutputTokens: 800,
    });

    try {
      const ai = JSON.parse(text) as {
        summary: string;
        items: string[];
        risks: string[];
      };
      return NextResponse.json({
        mode: "ai" as const,
        summary: ai.summary,
        items: ai.items,
        risks: ai.risks,
        disclaimer: siteConfig.aiDisclaimer,
      });
    } catch {
      return NextResponse.json({
        mode: "ai" as const,
        summary: text.slice(0, 500),
        items: fallbackReport(name, specialty, city).items,
        disclaimer: siteConfig.aiDisclaimer,
      });
    }
  } catch {
    return NextResponse.json({ error: "Erro na auditoria" }, { status: 500 });
  }
}
