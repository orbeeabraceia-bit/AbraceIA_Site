// Analisador de SEO on-page. Busca a URL, faz parsing nativo do HTML (sem
// dependências externas) e calcula scores no mesmo formato da ferramenta de
// referência (orbeelabs.com/auditoria-seo).

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
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  // Lança se inválida.
  const parsed = new URL(withProtocol);
  if (!parsed.hostname.includes(".")) throw new Error("URL inválida");
  return parsed.toString();
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
  const url = normalizeUrl(rawUrl);
  const hostname = new URL(url).hostname;

  const startedAt = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  let html = "";
  let responseHeaders: Headers | null = null;
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AbraceIA-SEO-Bot/1.0; +https://abraceia.com.br)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    responseHeaders = res.headers;
    html = await res.text();
  } finally {
    clearTimeout(timeout);
  }

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
