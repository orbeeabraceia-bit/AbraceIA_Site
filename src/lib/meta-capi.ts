import { createHash } from "node:crypto";

// Versão da Graph API da Meta. Cada versão é mantida por ~2 anos; revisar
// periodicamente para não cair em versão depreciada.
const GRAPH_API_VERSION = "v21.0";

type MetaUserData = {
  email?: string | null;
  phone?: string | null;
  clientIp?: string | null;
  userAgent?: string | null;
};

type MetaCapiEvent = {
  eventName: string;
  eventId?: string;
  eventSourceUrl?: string;
  userData: MetaUserData;
  customData?: Record<string, unknown>;
};

// A Conversions API só funciona com Pixel ID + token de acesso. Sem eles vira
// no-op — mesmo padrão de isAiConfigured()/Resend: o código fica pronto e a
// ativação depende apenas das chaves entrarem no ambiente (NEXT_PUBLIC_FB_PIXEL_ID
// e META_CAPI_TOKEN).
export function isMetaCapiConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_FB_PIXEL_ID && process.env.META_CAPI_TOKEN);
}

// A Meta exige PII com hash SHA-256 (normalizada: trim + lowercase) antes de
// sair do servidor. E-mail e telefone nunca trafegam em claro.
function hashField(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizePhone(phone: string) {
  // Só dígitos (a Meta recomenda E.164 sem o '+').
  return phone.replace(/\D/g, "");
}

// Envia um evento de conversão pela Conversions API (server-side). Complementa o
// Pixel do browser: cobre iOS/ad-blockers e, via event_id compartilhado, é
// DEDUPLICADO com o evento do Pixel. Falha silenciosa (igual integrations.ts):
// a mensuração nunca pode derrubar o fluxo de lead.
export async function sendMetaCapiEvent(event: MetaCapiEvent): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) return;

  const userData: Record<string, unknown> = {};
  if (event.userData.email) userData.em = [hashField(normalizeEmail(event.userData.email))];
  if (event.userData.phone) {
    const digits = normalizePhone(event.userData.phone);
    if (digits) userData.ph = [hashField(digits)];
  }
  if (event.userData.clientIp) userData.client_ip_address = event.userData.clientIp;
  if (event.userData.userAgent) userData.client_user_agent = event.userData.userAgent;

  const payload = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        ...(event.eventId ? { event_id: event.eventId } : {}),
        ...(event.eventSourceUrl ? { event_source_url: event.eventSourceUrl } : {}),
        user_data: userData,
        ...(event.customData ? { custom_data: event.customData } : {}),
      },
    ],
    access_token: token,
  };

  await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => undefined);
}
