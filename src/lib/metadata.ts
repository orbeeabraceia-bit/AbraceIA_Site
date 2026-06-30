import type { Metadata } from "next";
import { siteConfig } from "./site-config";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** "article" para posts de blog (habilita publishedTime/authors no OG). */
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: PageMetaInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "pt_BR",
      // Imagem fornecida pela convenção app/opengraph-image.tsx (PNG 1200×630).
      ...(type === "article"
        ? { type: "article" as const, publishedTime, modifiedTime, authors }
        : { type: "website" as const }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
