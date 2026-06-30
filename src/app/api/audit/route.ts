import { NextResponse, after } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { getAiModel, isAiConfigured } from "@/lib/ai-model";
import { siteConfig } from "@/lib/site-config";
import { notifyCrmWebhook } from "@/lib/integrations";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { checkComplianceText } from "@/lib/compliance";

// Extrai um objeto JSON da resposta do modelo, tolerando cercas markdown
// (```json … ```) e texto ao redor. Retorna null se não houver JSON válido.
function extractJson(text: string): unknown {
  const withoutFences = text.replace(/```(?:json)?/gi, "");
  const start = withoutFences.indexOf("{");
  const end = withoutFences.lastIndexOf("}");
  if (start === -1 || end <= start) return null;
  try {
    return JSON.parse(withoutFences.slice(start, end + 1));
  } catch {
    return null;
  }
}

const auditSchema = z.object({
  name: z.string().min(2).max(120),
  specialty: z.string().min(2).max(80),
  city: z.string().min(2).max(80),
  consent: z.boolean().refine((v) => v === true, {
    message: "Consentimento LGPD obrigatório",
  }),
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
  // Rate-limit por IP: a auditoria aciona a IA (custo por token). 5/10min.
  const rl = rateLimit(`audit:${clientIp(request)}`);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente em alguns minutos." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  try {
    const body = await request.json();
    const parsed = auditSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const { name, specialty, city } = parsed.data;

    // after(): notifica o CRM após a resposta sem risco de truncamento serverless.
    after(() =>
      notifyCrmWebhook({
        type: "audit",
        name,
        specialty,
        city,
        createdAt: new Date().toISOString(),
      }),
    );

    if (!isAiConfigured()) {
      return NextResponse.json(fallbackReport(name, specialty, city));
    }

    const prompt = `Você é consultor de GEO para saúde em ${city}, Brasil.
Analise orientativamente (NÃO diagnostique, NÃO prescreva) como a clínica "${name}" (${specialty}) pode melhorar citação em IAs generativas.
Responda em JSON: { "summary": string, "items": string[5], "risks": string[] }
Respeite CFM 2.336/2023 — sem promessa de resultado.`;

    const { text } = await generateText({
      model: getAiModel(),
      prompt,
      maxOutputTokens: 800,
    });

    const ai = extractJson(text) as { summary?: string; items?: string[]; risks?: string[] } | null;

    // Sem JSON utilizável → checklist orientativo (não devolvemos texto cru).
    if (!ai || typeof ai.summary !== "string" || !Array.isArray(ai.items)) {
      return NextResponse.json(fallbackReport(name, specialty, city));
    }

    // Compliance CFM (Cap. 9.2): se a IA escorregar num termo proibido,
    // descartamos a saída e devolvemos o checklist seguro.
    const combined = [ai.summary, ...(ai.items ?? []), ...(ai.risks ?? [])].join(" ");
    if (!checkComplianceText(combined).ok) {
      return NextResponse.json(fallbackReport(name, specialty, city));
    }

    return NextResponse.json({
      mode: "ai" as const,
      summary: ai.summary,
      items: ai.items,
      risks: ai.risks ?? [],
      disclaimer: siteConfig.aiDisclaimer,
    });
  } catch {
    return NextResponse.json({ error: "Erro na auditoria" }, { status: 500 });
  }
}
