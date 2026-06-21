import { siteConfig } from "@/lib/site-config";
import { defaultAuthor, medicalReviewer } from "@/lib/content/cases";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.org.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo-full.png`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: "BR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: siteConfig.org.email,
      telephone: siteConfig.org.phone,
      availableLanguage: "Portuguese",
    },
    sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "pt-BR",
    publisher: { "@type": "Organization", name: siteConfig.org.name },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function serviceSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${siteConfig.url}${url}`,
    provider: { "@type": "Organization", name: siteConfig.org.name },
    areaServed: { "@type": "City", name: siteConfig.city },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function medicalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: siteConfig.org.name,
    url: siteConfig.url,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: "BR",
    },
  };
}

export function physicianSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: medicalReviewer.name,
    medicalSpecialty: "Medicina geral",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: "BR",
    },
    memberOf: { "@type": "MedicalOrganization", name: siteConfig.org.name },
  };
}

export function medicalClinicSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name,
    description,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: "BR",
    },
  };
}

export function medicalProcedureSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name,
    description,
    procedureType: "https://schema.org/TherapeuticProcedure",
  };
}

export function reviewSchema(ratingValue: number, reviewCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue,
    reviewCount,
    bestRating: 5,
    worstRating: 1,
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    // Imagem é recomendada pelo Google para rich results de Article.
    image: `${siteConfig.url}/opengraph-image`,
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    inLanguage: "pt-BR",
    author: {
      "@type": "Person",
      name: defaultAuthor.name,
      jobTitle: defaultAuthor.role,
    },
    reviewer: {
      "@type": "Person",
      name: medicalReviewer.name,
      jobTitle: medicalReviewer.role,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.org.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo-full.png` },
    },
    mainEntityOfPage: `${siteConfig.url}${input.path}`,
  };
}

export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `Sobre ${siteConfig.name}`,
    url: `${siteConfig.url}/sobre`,
    description: siteConfig.description,
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contato AbraceIA",
    url: `${siteConfig.url}/contato`,
  };
}

export function webPageSchema(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    url: `${siteConfig.url}${path}`,
  };
}

export function collectionPageSchema(input: {
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: `${siteConfig.url}${input.path}`,
    inLanguage: "pt-BR",
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: input.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: `${siteConfig.url}${item.path}`,
      })),
    },
  };
}

export function blogSchema(posts: { title: string; slug: string; publishedAt: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Blog ${siteConfig.name}`,
    url: `${siteConfig.url}/blog`,
    inLanguage: "pt-BR",
    publisher: { "@type": "Organization", name: siteConfig.org.name },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      datePublished: p.publishedAt,
      url: `${siteConfig.url}/blog/${p.slug}`,
    })),
  };
}

export function webApplicationSchema(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: input.name,
    description: input.description,
    url: `${siteConfig.url}${input.path}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: "pt-BR",
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
    provider: { "@type": "Organization", name: siteConfig.org.name },
  };
}

export function howToSchema(input: {
  name: string;
  description: string;
  path: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    inLanguage: "pt-BR",
    step: input.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${siteConfig.url}${input.path}#etapa-${i + 1}`,
    })),
  };
}
