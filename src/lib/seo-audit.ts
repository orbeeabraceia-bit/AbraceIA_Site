// Analisador de SEO on-page. Busca a URL, faz parsing nativo do HTML (sem
// dependências externas) e calcula scores no mesmo formato da ferramenta de
// referência (orbeelabs.com/auditoria-seo).

import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { request as httpRequest, type IncomingMessage } from "node:http";
import { request as httpsRequest } from "node:https";

export type SeoStatus = "good" | "warning" | "error";

export type SeoAuditResult = {
  url: string;
  timestamp: string;
  performance: {
    score: number;
    metrics: {
      firstContentfulPaint: number;
      largestContentfulPaint: number;
      cumulativeLayoutShift: number;
      firstInputDelay: number;
    };
  };
  technical: {
    title: { text: string; length: number; status: SeoStatus };
    description: { text: string; length: number; status: SeoStatus };
    headings: {
      h1: number;
      h2: number;
      h3: number;
      h4: number;
      h5: number;
      h6: number;
      status: SeoStatus;
    };
    images: { total: number; withoutAlt: number; status: SeoStatus };
    links: { internal: number; external: number; broken: number; status: SeoStatus };
    metaTags: { viewport: boolean; charset: boolean; robots: boolean; status: SeoStatus };
  };
  mobile: { viewport: boolean; touchFriendly: boolean; textReadable: boolean; status: SeoStatus };
  security: { https: boolean; mixedContent: boolean; securityHeaders: string[]; status: SeoStatus };
  content: { wordCount: number; keywordDensity: number; readabilityScore: number; status: SeoStatus };
  overallScore: number;
  recommendations: string[];
  criticalIssues: string[];
  warnings: string[];
  auditId: string;
};

export function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) throw new Error("URL vazia");
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed) && !/^https?:\/\//i.test(trimmed)) {
    throw new Error("URL inválida");
  }
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  // Lança se inválida.
  const parsed = new URL(withProtocol);
  if (!/^https?:$/.test(parsed.protocol)) throw new Error("URL inválida");
  if (!parsed.hostname.includes(".") && !isBlockedHostname(parsed.hostname)) {
    throw new Error("URL inválida");
  }
  return parsed.toString();
}

// --- Proteção contra SSRF -------------------------------------------------
// A análise roda no servidor e busca uma URL fornecida pelo visitante, então
// nenhum destino pode resolver para rede privada, loopback ou link-local.

export class SsrfBlockedError extends Error {
  constructor() {
    super("URL não permitida para análise");
    this.name = "SsrfBlockedError";
  }
}

export function isPrivateIp(ip: string): boolean {
  const v4 = ip.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (v4) {
    const a = Number(v4[1]);
    const b = Number(v4[2]);
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 0) ||
      (a === 192 && b === 168) ||
      (a === 198 && (b === 18 || b === 19)) ||
      a >= 224
    );
  }
  const lower = ip.toLowerCase();
  if (lower === "::" || lower === "::1") return true;
  if (lower.startsWith("fe80:") || lower.startsWith("fc") || lower.startsWith("fd")) return true;
  if (lower.startsWith("::ffff:")) return isPrivateIp(lower.slice("::ffff:".length));
  return false;
}

export function isBlockedHostname(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "").replace(/\.$/, "");
  if (host === "localhost" || host.endsWith(".localhost")) return true;
  if (host.endsWith(".local") || host.endsWith(".internal")) return true;
  if (isIP(host)) return isPrivateIp(host);
  return false;
}

// Resolve e valida o host, devolvendo o IP público que DEVE ser usado na
// conexão. Conectar no IP validado (e não deixar o cliente HTTP resolver DNS
// de novo) elimina a janela de DNS rebinding/TOCTOU entre validação e fetch.
async function resolvePublicAddress(target: URL): Promise<string> {
  if (!/^https?:$/.test(target.protocol)) throw new SsrfBlockedError();
  const hostname = target.hostname.replace(/^\[|\]$/g, "");
  if (isBlockedHostname(hostname)) throw new SsrfBlockedError();
  if (isIP(hostname)) return hostname;
  let addresses: Array<{ address: string }>;
  try {
    addresses = await lookup(hostname, { all: true, verbatim: true });
  } catch {
    throw new Error("Não foi possível resolver o domínio");
  }
  if (addresses.length === 0 || addresses.some((a) => isPrivateIp(a.address))) {
    throw new SsrfBlockedError();
  }
  return addresses[0].address;
}

const MAX_REDIRECTS = 3;
const MAX_HTML_BYTES = 2_000_000;
const REDIRECT_STATUS = new Set([301, 302, 303, 307, 308]);

const FETCH_HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; AbraceIA-SEO-Bot/1.0; +https://abraceia.com.br)",
  Accept: "text/html,application/xhtml+xml",
};

// Faz a requisição conectando diretamente no IP validado, preservando o
// header Host e o SNI do hostname original (necessário para TLS/vhosts).
function pinnedRequest(
  target: URL,
  address: string,
  signal: AbortSignal,
): Promise<IncomingMessage> {
  return new Promise((resolve, reject) => {
    const isHttps = target.protocol === "https:";
    const requestFn = isHttps ? httpsRequest : httpRequest;
    const req = requestFn(
      {
        host: address,
        port: target.port ? Number(target.port) : isHttps ? 443 : 80,
        path: `${target.pathname}${target.search}` || "/",
        method: "GET",
        headers: { ...FETCH_HEADERS, Host: target.host },
        ...(isHttps ? { servername: target.hostname } : {}),
        signal,
      },
      resolve,
    );
    req.on("error", reject);
    req.end();
  });
}

// Segue redirects manualmente para revalidar o host de cada salto contra
// redes privadas (um destino público pode redirecionar para um interno).
async function fetchPublicUrl(
  initialUrl: string,
  signal: AbortSignal,
): Promise<{ response: IncomingMessage; headers: Headers; finalUrl: string }> {
  let current = new URL(initialUrl);
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const address = await resolvePublicAddress(current);
    const response = await pinnedRequest(current, address, signal);
    const status = response.statusCode ?? 0;
    const location = response.headers.location;
    if (REDIRECT_STATUS.has(status) && location) {
      response.resume();
      current = new URL(location, current);
      continue;
    }
    const headers = new Headers();
    for (const [key, value] of Object.entries(response.headers)) {
      if (typeof value === "string") headers.set(key, value);
      else if (Array.isArray(value)) headers.set(key, value.join(", "));
    }
    return { response, headers, finalUrl: current.toString() };
  }
  throw new Error("Redirecionamentos em excesso");
}

async function readBodyLimited(response: IncomingMessage, maxBytes: number): Promise<string> {
  const chunks: Buffer[] = [];
  let total = 0;
  try {
    for await (const chunk of response) {
      const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      total += buf.byteLength;
      chunks.push(buf);
      if (total >= maxBytes) {
        response.destroy();
        break;
      }
    }
  } catch (err) {
    // Stream destruído por atingir o limite não é erro; o resto propaga.
    if (!response.destroyed) throw err;
  }
  return Buffer.concat(chunks).toString("utf8");
}

function countMatches(html: string, regex: RegExp): number {
  const matches = html.match(regex);
  return matches ? matches.length : 0;
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

let auditCounter = 0;
function makeAuditId(): string {
  auditCounter = (auditCounter + 1) % 1_000_000;
  return `audit_${Date.now().toString(36)}_${auditCounter.toString(36)}`;
}

/**
 * Busca a URL e executa a análise on-page completa.
 */
export async function analyzeSeo(rawUrl: string): Promise<SeoAuditResult> {
  let url = normalizeUrl(rawUrl);

  const startedAt = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  let html = "";
  let responseHeaders: Headers | null = null;
  try {
    const { response, headers, finalUrl } = await fetchPublicUrl(url, controller.signal);
    url = finalUrl;
    responseHeaders = headers;
    html = await readBodyLimited(response, MAX_HTML_BYTES);
  } finally {
    clearTimeout(timeout);
  }

  const hostname = new URL(url).hostname;

  const loadMs = Date.now() - startedAt;
  const byteSize = Buffer.byteLength(html, "utf8");
  const head = html.slice(0, html.search(/<\/head>/i) + 1 || html.length);

  // --- Técnico: title ---
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const titleText = titleMatch ? decodeEntities(stripTags(titleMatch[1])) : "";
  const titleLen = titleText.length;
  const titleStatus: SeoStatus =
    titleLen >= 30 && titleLen <= 60 ? "good" : titleLen === 0 ? "error" : "warning";

  // --- Técnico: meta description ---
  const descMatch = head.match(
    /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i,
  );
  const descText = descMatch ? decodeEntities(descMatch[1].trim()) : "";
  const descLen = descText.length;
  const descStatus: SeoStatus =
    descLen >= 120 && descLen <= 160 ? "good" : descLen === 0 ? "error" : "warning";

  // --- Técnico: headings ---
  const headings = {
    h1: countMatches(html, /<h1[\s>]/gi),
    h2: countMatches(html, /<h2[\s>]/gi),
    h3: countMatches(html, /<h3[\s>]/gi),
    h4: countMatches(html, /<h4[\s>]/gi),
    h5: countMatches(html, /<h5[\s>]/gi),
    h6: countMatches(html, /<h6[\s>]/gi),
    status: "good" as SeoStatus,
  };
  headings.status =
    headings.h1 === 1 && headings.h2 >= 1 ? "good" : headings.h1 === 0 ? "error" : "warning";

  // --- Técnico: imagens ---
  const imgTags = html.match(/<img\b[^>]*>/gi) ?? [];
  const imagesTotal = imgTags.length;
  const imagesWithoutAlt = imgTags.filter(
    (tag) => !/\balt\s*=\s*["'][^"']*["']/i.test(tag) && !/\balt\s*=\s*["']{2}/i.test(tag),
  ).length;
  const imagesStatus: SeoStatus =
    imagesWithoutAlt === 0 ? "good" : imagesWithoutAlt / Math.max(imagesTotal, 1) > 0.3 ? "error" : "warning";

  // --- Técnico: links ---
  const hrefs = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map((m) => m[1]);
  let internal = 0;
  let external = 0;
  for (const href of hrefs) {
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    if (href.startsWith("/") || href.includes(hostname)) internal += 1;
    else if (/^https?:\/\//i.test(href)) external += 1;
    else internal += 1;
  }
  const linksStatus: SeoStatus = internal >= 3 ? "good" : internal >= 1 ? "warning" : "error";

  // --- Técnico: meta tags ---
  const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(head);
  const hasCharset = /<meta[^>]+charset/i.test(head);
  const hasRobots = /<meta[^>]+name=["']robots["']/i.test(head);
  const metaTagsStatus: SeoStatus = hasViewport && hasCharset ? "good" : hasViewport ? "warning" : "error";

  // --- Mobile ---
  const textReadable = hasViewport && /width=device-width/i.test(head);
  const touchFriendly = hasViewport;
  const mobileStatus: SeoStatus = hasViewport && textReadable ? "good" : hasViewport ? "warning" : "error";

  // --- Segurança ---
  const https = url.startsWith("https://");
  const mixedContent = https && /(?:src|href)=["']http:\/\//i.test(html);
  const securityHeaders: string[] = [];
  if (responseHeaders) {
    const checks: Array<[string, string]> = [
      ["strict-transport-security", "HSTS"],
      ["content-security-policy", "CSP"],
      ["x-content-type-options", "X-Content-Type-Options"],
      ["x-frame-options", "X-Frame-Options"],
      ["referrer-policy", "Referrer-Policy"],
    ];
    for (const [header, label] of checks) {
      if (responseHeaders.get(header)) securityHeaders.push(label);
    }
  }
  const securityStatus: SeoStatus =
    https && !mixedContent ? (securityHeaders.length >= 2 ? "good" : "warning") : "error";

  // --- Conteúdo ---
  const visibleText = stripTags(html);
  const words = visibleText.split(/\s+/).filter((w) => w.length > 1);
  const wordCount = words.length;
  const freq = new Map<string, number>();
  for (const w of words) {
    const k = w.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
    if (k.length < 4) continue;
    freq.set(k, (freq.get(k) ?? 0) + 1);
  }
  const topFreq = Math.max(0, ...freq.values());
  const keywordDensity = wordCount > 0 ? Number(((topFreq / wordCount) * 100).toFixed(1)) : 0;
  const avgWordLen = wordCount > 0 ? visibleText.length / wordCount : 0;
  const readabilityScore = Math.max(0, Math.min(100, Math.round(100 - (avgWordLen - 5) * 8)));
  const contentStatus: SeoStatus =
    wordCount >= 600 ? "good" : wordCount >= 300 ? "warning" : "error";

  // --- Performance (estimada a partir do tempo de resposta e peso da página) ---
  const fcp = Math.round(loadMs * 0.6 + byteSize / 4000);
  const lcp = Math.round(loadMs * 0.9 + byteSize / 2500);
  const fid = Math.round(8 + byteSize / 120000);
  const cls = byteSize > 800_000 ? 0.12 : byteSize > 400_000 ? 0.06 : 0.01;
  let perfScore = 100;
  if (lcp > 4000) perfScore -= 40;
  else if (lcp > 2500) perfScore -= 20;
  else if (lcp > 1800) perfScore -= 8;
  if (fcp > 3000) perfScore -= 20;
  else if (fcp > 1800) perfScore -= 8;
  if (cls > 0.1) perfScore -= 15;
  else if (cls > 0.05) perfScore -= 6;
  if (byteSize > 1_500_000) perfScore -= 10;
  const performanceScore = Math.max(0, Math.min(100, perfScore));

  // --- Score geral (média ponderada) ---
  const statusScore = (s: SeoStatus) => (s === "good" ? 100 : s === "warning" ? 60 : 25);
  const technicalAvg =
    (statusScore(titleStatus) +
      statusScore(descStatus) +
      statusScore(headings.status) +
      statusScore(imagesStatus) +
      statusScore(linksStatus) +
      statusScore(metaTagsStatus)) /
    6;
  const overallScore = Math.round(
    technicalAvg * 0.35 +
      performanceScore * 0.25 +
      statusScore(mobileStatus) * 0.15 +
      statusScore(securityStatus) * 0.15 +
      statusScore(contentStatus) * 0.1,
  );

  // --- Recomendações / problemas críticos / avisos ---
  const recommendations: string[] = [];
  const criticalIssues: string[] = [];
  const warnings: string[] = [];

  if (titleStatus !== "good")
    recommendations.push("Otimize o título da página para 30-60 caracteres");
  if (descStatus === "error") {
    criticalIssues.push("Meta description ausente");
    recommendations.push("Adicione uma meta description (120-160 caracteres)");
  } else if (descStatus === "warning") {
    warnings.push("Meta description pode ser otimizada");
    recommendations.push("Ajuste a meta description para 120-160 caracteres");
  }
  if (headings.status === "error") {
    criticalIssues.push("Estrutura de headings inadequada (H1 ausente ou duplicado)");
    recommendations.push("Use uma estrutura de headings adequada (1 H1, múltiplos H2-H6)");
  } else if (headings.status === "warning") {
    warnings.push("Estrutura de headings pode melhorar");
  }
  if (imagesStatus !== "good")
    recommendations.push("Adicione alt text em todas as imagens");
  if (!hasViewport) {
    criticalIssues.push("Meta viewport ausente — site não é mobile-friendly");
    recommendations.push("Adicione meta tags essenciais (viewport, charset)");
  }
  if (mobileStatus !== "good") {
    warnings.push("Otimização mobile pode ser melhorada");
    recommendations.push("Otimize o site para dispositivos móveis");
  }
  if (!https) {
    criticalIssues.push("Site não usa HTTPS");
    recommendations.push("Implemente certificado SSL/HTTPS");
  }
  if (mixedContent) warnings.push("Conteúdo misto (HTTP) detectado em página HTTPS");
  if (contentStatus !== "good")
    recommendations.push("Aumente o conteúdo da página (mínimo 300 palavras)");
  if (performanceScore < 70)
    recommendations.push("Otimize a velocidade de carregamento da página");
  if (lcp > 2500) warnings.push("LCP acima do recomendado (> 2,5s)");

  return {
    url,
    timestamp: new Date().toISOString(),
    performance: {
      score: performanceScore,
      metrics: {
        firstContentfulPaint: fcp,
        largestContentfulPaint: lcp,
        cumulativeLayoutShift: cls,
        firstInputDelay: fid,
      },
    },
    technical: {
      title: { text: titleText, length: titleLen, status: titleStatus },
      description: { text: descText, length: descLen, status: descStatus },
      headings,
      images: { total: imagesTotal, withoutAlt: imagesWithoutAlt, status: imagesStatus },
      links: { internal, external, broken: 0, status: linksStatus },
      metaTags: { viewport: hasViewport, charset: hasCharset, robots: hasRobots, status: metaTagsStatus },
    },
    mobile: { viewport: hasViewport, touchFriendly, textReadable, status: mobileStatus },
    security: { https, mixedContent, securityHeaders, status: securityStatus },
    content: { wordCount, keywordDensity, readabilityScore, status: contentStatus },
    overallScore,
    recommendations,
    criticalIssues,
    warnings,
    auditId: makeAuditId(),
  };
}
