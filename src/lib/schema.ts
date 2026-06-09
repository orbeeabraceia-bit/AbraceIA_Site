import { siteConfig } from "@/lib/site-config";
import { defaultAuthor, medicalReviewer } from "@/lib/content/cases";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.org.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
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
    datePublished: input.datePublished,
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
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.svg` },
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
