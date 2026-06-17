// Rate-limit simples em memória (por instância serverless). É a primeira barreira
// anti-spam/anti-abuso; para um limite global multi-instância, migrar para Upstash
// Redis. Janela deslizante: `limit` requisições por `windowMs` por chave (IP).

type Hit = { count: number; resetAt: number };

const store = new Map<string, Hit>();

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfter: number };

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 10 * 60 * 1000,
): RateLimitResult {
  const now = Date.now();

  // Limpeza oportunista para não crescer indefinidamente
  if (store.size > 5000) {
    for (const [k, v] of store) {
      if (now > v.resetAt) store.delete(k);
    }
  }

  const hit = store.get(key);
  if (!hit || now > hit.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  hit.count += 1;
  if (hit.count > limit) {
    return { ok: false, retryAfter: Math.ceil((hit.resetAt - now) / 1000) };
  }
  return { ok: true, remaining: limit - hit.count };
}
