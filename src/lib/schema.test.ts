import {
  organizationSchema,
  websiteSchema,
  breadcrumbSchema,
  serviceSchema,
  faqSchema,
  professionalServiceSchema,
  articleSchema,
  webApplicationSchema,
  howToSchema,
  blogSchema,
} from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

describe("schema.org generators", () => {
  it("organizationSchema tem tipo, url e sameAs", () => {
    const s = organizationSchema();
    expect(s["@context"]).toBe("https://schema.org");
    expect(s["@type"]).toBe("Organization");
    expect(s.url).toBe(siteConfig.url);
    expect(Array.isArray(s.sameAs)).toBe(true);
  });

  it("websiteSchema expõe SearchAction", () => {
    const s = websiteSchema();
    expect(s["@type"]).toBe("WebSite");
    expect(s.potentialAction).toMatchObject({ "@type": "SearchAction" });
  });

  it("breadcrumbSchema numera e prefixa as URLs", () => {
    const s = breadcrumbSchema([
      { name: "Início", path: "/" },
      { name: "Blog", path: "/blog" },
    ]);
    expect(s["@type"]).toBe("BreadcrumbList");
    expect(s.itemListElement).toHaveLength(2);
    expect(s.itemListElement[0]).toMatchObject({ position: 1, name: "Início" });
    expect(s.itemListElement[1].item).toBe(`${siteConfig.url}/blog`);
  });

  it("serviceSchema monta a URL com o path", () => {
    const s = serviceSchema("GEO", "desc", "/servicos/geo-saude");
    expect(s["@type"]).toBe("Service");
    expect(s.url).toBe(`${siteConfig.url}/servicos/geo-saude`);
  });

  it("faqSchema mapeia perguntas para Question/Answer", () => {
    const s = faqSchema([{ question: "P?", answer: "R." }]);
    expect(s["@type"]).toBe("FAQPage");
    expect(s.mainEntity[0]).toMatchObject({
      "@type": "Question",
      name: "P?",
      acceptedAnswer: { "@type": "Answer", text: "R." },
    });
  });

  it("professionalServiceSchema é ProfessionalService (não entidade médica)", () => {
    const s = professionalServiceSchema();
    // AbraceIA é agência de marketing: NÃO deve se declarar MedicalBusiness/Physician.
    expect(s["@type"]).toBe("ProfessionalService");
    expect(s.areaServed).toMatchObject({ "@type": "City" });
    expect(s.contactPoint).toMatchObject({ "@type": "ContactPoint" });
  });

  it("articleSchema usa dateModified quando fornecido", () => {
    const s = articleSchema({
      title: "T",
      description: "D",
      path: "/blog/x",
      datePublished: "2026-01-01",
      dateModified: "2026-05-10",
    });
    expect(s.datePublished).toBe("2026-01-01");
    expect(s.dateModified).toBe("2026-05-10");
  });

  it("articleSchema inclui autor e revisor", () => {
    const s = articleSchema({
      title: "T",
      description: "D",
      path: "/blog/x",
      datePublished: "2026-01-01",
    });
    expect(s["@type"]).toBe("Article");
    expect(s.headline).toBe("T");
    expect(s.image).toContain("/opengraph-image");
    expect(s.author).toMatchObject({ "@type": "Person" });
    expect(s.reviewer).toMatchObject({ "@type": "Person" });
    expect(s.mainEntityOfPage).toBe(`${siteConfig.url}/blog/x`);
  });

  it("webApplicationSchema é uma oferta gratuita", () => {
    const s = webApplicationSchema({ name: "Calc", description: "d", path: "/calculadora-roi" });
    expect(s["@type"]).toBe("WebApplication");
    expect(s.offers).toMatchObject({ price: "0", priceCurrency: "BRL" });
  });

  it("howToSchema numera os passos com âncoras", () => {
    const s = howToSchema({
      name: "Como",
      description: "d",
      path: "/guia",
      steps: [
        { name: "A", text: "1" },
        { name: "B", text: "2" },
      ],
    });
    expect(s["@type"]).toBe("HowTo");
    expect(s.step).toHaveLength(2);
    expect(s.step[1]).toMatchObject({ position: 2, url: `${siteConfig.url}/guia#etapa-2` });
  });

  it("blogSchema lista os posts", () => {
    const s = blogSchema([{ title: "T", slug: "t", publishedAt: "2026-01-01" }]);
    expect(s["@type"]).toBe("Blog");
    expect(s.blogPost[0]).toMatchObject({
      "@type": "BlogPosting",
      url: `${siteConfig.url}/blog/t`,
    });
  });
});
