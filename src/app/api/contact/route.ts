import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { notifyCrmWebhook, sendLeadEmail } from "@/lib/integrations";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.email(),
  phone: z.string().max(20).optional(),
  message: z.string().min(10).max(5000),
  consent: z.boolean().refine((v) => v === true, {
    message: "Consentimento LGPD obrigatório",
  }),
});

export async function POST(request: Request) {
  // Rate-limit por IP: 5 envios a cada 10 minutos
  const rl = rateLimit(`contact:${clientIp(request)}`);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente em alguns minutos." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  try {
    const body = await request.json();

    // Honeypot server-side: campo "website" só é preenchido por bots.
    // Finge sucesso (200) para não revelar a armadilha ao bot.
    if (typeof body?.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Dados inválidos" },
        { status: 400 },
      );
    }

    const { name, email, phone, message, consent } = parsed.data;
    const lead = { name, email, phone: phone ?? null, message, source: "contact", consent };

    if (process.env.DATABASE_URL && prisma) {
      await prisma.lead.create({ data: lead });
    }

    await Promise.all([
      sendLeadEmail(lead),
      notifyCrmWebhook({ type: "lead", ...lead, createdAt: new Date().toISOString() }),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
