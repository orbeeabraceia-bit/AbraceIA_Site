import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { getAiModel, isAiConfigured } from "@/lib/ai-model";
import { siteConfig } from "@/lib/site-config";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { checkComplianceText } from "@/lib/compliance";

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
  // Rate-limit por IP: o chat aciona a IA (custo por token), então protegemos
  // contra abuso/flood. 30 mensagens a cada 10 minutos.
  const rl = rateLimit(`chat:${clientIp(request)}`, 30);
  if (!rl.ok) {
    return NextResponse.json(
      { reply: FALLBACK, fallback: true },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

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

    if (!isAiConfigured()) {
      return NextResponse.json({ reply: FALLBACK, fallback: true });
    }

    const { text } = await generateText({
      model: getAiModel(),
      system: SYSTEM,
      prompt: parsed.data.message,
      maxOutputTokens: 300,
    });

    // Compliance CFM (Cap. 9.2): a resposta da IA é "material publicado" e não
    // pode conter termo proibido. Se violar, descartamos e devolvemos o fallback.
    if (!checkComplianceText(text).ok) {
      return NextResponse.json({ reply: FALLBACK, fallback: true });
    }

    return NextResponse.json({ reply: text, fallback: false });
  } catch {
    return NextResponse.json({ reply: FALLBACK, fallback: true });
  }
}
