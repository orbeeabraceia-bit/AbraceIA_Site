import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { notifyCrmWebhook } from "@/lib/integrations";

const quizSchema = z.object({
  score: z.number().int().min(0).max(100),
  answers: z.record(z.string(), z.boolean()),
  email: z.email().optional(),
  consent: z.boolean().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = quizSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    // LGPD: e-mail é dado pessoal — só é aceito com consentimento explícito
    // validado no servidor (a API é pública e pode ser chamada direto).
    if (parsed.data.email && parsed.data.consent !== true) {
      return NextResponse.json(
        { error: "Para registrar seu e-mail, é necessário aceitar a Política de Privacidade (LGPD)." },
        { status: 400 },
      );
    }

    if (process.env.DATABASE_URL && prisma) {
      await prisma.quizResult.create({
        data: {
          score: parsed.data.score,
          answers: parsed.data.answers,
          email: parsed.data.email ?? null,
        },
      });
    }

    await notifyCrmWebhook({
      type: "quiz",
      score: parsed.data.score,
      email: parsed.data.email ?? null,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, score: parsed.data.score });
  } catch {
    return NextResponse.json({ error: "Erro ao salvar" }, { status: 500 });
  }
}
