import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { cases } from "@/lib/content/cases";
import { blogPosts } from "@/lib/content/blog";

const staticRoutes = [
  "",
  "/servicos/geo-saude",
  "/servicos/sites-medicos",
  "/servicos/seo-medico",
  "/sobre",
  "/metodo",
  "/guia/geo-para-saude",
  "/blog",
  "/cases",
  "/auditoria-ia",
  "/auditoria-seo",
  "/calculadora-roi",
  "/contato",
  "/faq",
  "/compliance",
  "/cookies",
  "/privacidade",
  "/termos",
];

// Data estável da última revisão de conteúdo do site. Evita usar `new Date()`,
// que marcaria TODAS as rotas como modificadas a cada deploy — sinal falso de
// frescor para os crawlers. Atualizar quando o conteúdo das páginas estáticas mudar.
const LAST_CONTENT_UPDATE = new Date("2026-06-30");

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = LAST_CONTENT_UPDATE;
  const entries = [
    ...staticRoutes.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified,
      changeFrequency: (path === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "" ? 1 : path.startsWith("/servicos") ? 0.9 : 0.7,
    })),
    ...cases.map((c) => ({
      url: `${siteConfig.url}/cases/${c.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...blogPosts.map((p) => ({
      url: `${siteConfig.url}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
  return entries;
}
