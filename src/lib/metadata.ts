import type { Metadata } from "next";
import { siteConfig } from "./site-config";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
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
      type: "website",
      images: [{ url: `${siteConfig.url}/og.svg`, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.url}/og.svg`],
    },
  };
}
