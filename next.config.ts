import type { NextConfig } from "next";
import path from "node:path";

const isDev = process.env.NODE_ENV === "development";

// Content-Security-Policy (Cap. 8.1/9). Abordagem por header, sem nonce, para
// preservar renderização estática e cache de CDN — crítico para a meta de LCP.
// Origens liberadas: GTM/GA4 (analytics), Meta Pixel (connect.facebook.net +
// facebook.com/tr) e api.microlink.io (thumbnails do portfólio). 'unsafe-inline'
// é exigido pelos snippets inline do GTM/GA4/Pixel e pelos estilos inline do
// Next. Fontes do Google são self-hosted pelo next/font.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://api.microlink.io https://www.googletagmanager.com https://www.google-analytics.com https://www.facebook.com https://connect.facebook.net",
  "font-src 'self' data:",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.facebook.com https://connect.facebook.net",
  "frame-src https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // CSP só fora de dev: em desenvolvimento o HMR (websocket/eval do Turbopack)
  // quebraria sob uma política estrita. Validar no preview/produção.
  ...(isDev ? [] : [{ key: "Content-Security-Policy", value: csp }]),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Permite HMR/assets via túnel Cloudflare (pnpm link)
  allowedDevOrigins: ["*.trycloudflare.com"],
  images: {
    // Miniaturas de sites do portfólio (screenshots via Microlink)
    remotePatterns: [{ protocol: "https", hostname: "api.microlink.io" }],
  },
  turbopack: {
    root: path.join(__dirname),
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
