import { NextResponse } from "next/server";
import { z } from "zod";
import { analyzeSeo, normalizeUrl } from "@/lib/seo-audit";
import { notifyCrmWebhook } from "@/lib/integrations";

export const runtime = "nodejs";
export const maxDuration = 30;

const bodySchema = z.object({
  url: z.string().min(3).max(2048),
  formData: z
    .object({
      url: z.string().optional(),
      nomeEmpresa: z.string().max(160).optional(),
      setor: z.string().max(60).optional(),
      telefone: z.string().max(40).optional(),
      email: z.string().max(160).optional(),
      objetivo: z.string().max(60).optional(),
      faturamento: z.string().max(60).optional(),
      palavrasChave: z.string().max(400).optional(),
      concorrentes: z.string().max(400).optional(),
    })
    .optional(),
});

export async function POST(request: Request) {
  let parsed;
  try {
    parsed = bodySchema.safeParse(await request.json());
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido" }, { status: 400 });
  }
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  let url: string;
  try {
    url = normalizeUrl(parsed.data.url);
  } catch {
    return NextResponse.json(
      { error: "URL inválida. Use o formato google.com ou https://google.com" },
      { status: 400 },
    );
  }

  try {
    const result = await analyzeSeo(url);

    const fd = parsed.data.formData;
    if (fd?.email || fd?.telefone) {
      void notifyCrmWebhook({
        type: "seo-audit",
        url,
        score: result.overallScore,
        name: fd.nomeEmpresa,
        email: fd.email,
        phone: fd.telefone,
        sector: fd.setor,
        goal: fd.objetivo,
        createdAt: result.timestamp,
      });
    }

    return NextResponse.json(result);
  } catch (err) {
    const message =
      err instanceof Error && err.name === "AbortError"
        ? "O site demorou demais para responder. Tente novamente."
        : "Não foi possível acessar o site. Verifique a URL e tente novamente.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
