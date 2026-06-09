import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { siteConfig } from "@/lib/site-config";

const chatSchema = z.object({
  message: z.string().min(1).max(500),
});

const SYSTEM = `Você é assistente de triagem do AbraceIA (Orbee Labs), vertical de saúde em BH.
Regras: NÃO diagnostique, NÃO prescreva, NÃO prometa resultados. Oriente sobre presença digital, GEO e agendamento.
Se perguntarem sintomas, recomende procurar profissional presencial. Respostas curtas (máx 120 palavras).
Disclaimer: ${siteConfig.aiDisclaimer}`;

const FALLBACK =
  "Posso ajudar com orientações sobre presença digital e GEO para clínicas. Para questões clínicas, fale com um profissional. Quer agendar uma auditoria gratuita? Acesse /contato.";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = chatSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Mensagem inválida" }, { status: 400 });
    }

    const msg = parsed.data.message.toLowerCase();
    if (/diagn[oó]stico|rem[eé]dio|prescri|dor no peito|infarto|suic/i.test(msg)) {
      return NextResponse.json({
        reply:
          "Não posso orientar sobre sintomas ou tratamentos. Procure um profissional de saúde ou serviços de urgência. Posso ajudar com presença digital da sua clínica.",
        fallback: true,
      });
    }

    if (!process.env.AI_GATEWAY_KEY && !process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ reply: FALLBACK, fallback: true });
    }

    const { text } = await generateText({
      model: anthropic("claude-sonnet-4-20250514"),
      system: SYSTEM,
      prompt: parsed.data.message,
      maxOutputTokens: 300,
    });

    return NextResponse.json({ reply: text, fallback: false });
  } catch {
    return NextResponse.json({ reply: FALLBACK, fallback: true });
  }
}
