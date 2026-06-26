import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { notifyCrmWebhook, sendLeadEmail } from "@/lib/integrations";
import { sendMetaCapiEvent } from "@/lib/meta-capi";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.email(),
  phone: z.string().max(20).optional(),
  message: z.string().min(10).max(5000),
  consent: z.boolean().refine((v) => v === true, {
    message: "Consentimento LGPD obrigatório",
  }),
  // Mensuração (Meta CAPI): event_id para dedup com o Pixel e o sinal de
  // consentimento de marketing. Opcionais — o fluxo de lead não depende deles.
  metaEventId: z.string().max(100).optional(),
  marketingConsent: z.boolean().optional(),
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

    const { name, email, phone, message, consent, metaEventId, marketingConsent } = parsed.data;
    const lead = { name, email, phone: phone ?? null, message, source: "contact", consent };

    if (process.env.DATABASE_URL && prisma) {
      await prisma.lead.create({ data: lead });
    }

    const tasks: Promise<unknown>[] = [
      sendLeadEmail(lead),
      notifyCrmWebhook({ type: "lead", ...lead, createdAt: new Date().toISOString() }),
    ];

    // Conversão Lead pela CAPI — só com consentimento de marketing explícito,
    // pois envia PII (com hash) para a Meta. O event_id casa com o evento do
    // Pixel no browser para a Meta deduplicar (Cap. 9.1).
    if (marketingConsent) {
      tasks.push(
        sendMetaCapiEvent({
          eventName: "Lead",
          eventId: metaEventId,
          eventSourceUrl: request.headers.get("referer") ?? undefined,
          userData: {
            email,
            phone,
            clientIp: clientIp(request),
            userAgent: request.headers.get("user-agent"),
          },
          customData: { lead_source: "contact" },
        }),
      );
    }

    await Promise.all(tasks);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
