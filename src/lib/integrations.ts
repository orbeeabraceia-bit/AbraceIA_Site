type LeadPayload = {
  name: string;
  email: string;
  phone?: string | null;
  message?: string | null;
  source: string;
  consent: boolean;
};

export async function notifyCrmWebhook(payload: Record<string, unknown>) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => undefined);
}

export async function sendLeadEmail(lead: LeadPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL ?? process.env.RESEND_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "AbraceIA <onboarding@resend.dev>";

  if (!apiKey || !to) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `[AbraceIA] Novo lead — ${lead.source}`,
      html: `
        <h2>Novo lead AbraceIA</h2>
        <p><strong>Nome:</strong> ${lead.name}</p>
        <p><strong>E-mail:</strong> ${lead.email}</p>
        <p><strong>Telefone:</strong> ${lead.phone ?? "—"}</p>
        <p><strong>Origem:</strong> ${lead.source}</p>
        <p><strong>Mensagem:</strong><br/>${lead.message ?? "—"}</p>
        <p><strong>LGPD:</strong> ${lead.consent ? "Consentiu" : "Não consentiu"}</p>
      `,
    }),
  }).catch(() => undefined);
}
