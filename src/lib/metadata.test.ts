import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

describe("createPageMetadata", () => {
  it("monta canonical, openGraph e twitter a partir do path", () => {
    const meta = createPageMetadata({
      title: "Contato",
      description: "Fale conosco",
      path: "/contato",
      keywords: ["contato"],
    });
    const url = `${siteConfig.url}/contato`;
    expect(meta.title).toBe("Contato");
    expect(meta.alternates?.canonical).toBe(url);
    expect(meta.openGraph?.url).toBe(url);
    expect(meta.twitter).toMatchObject({ card: "summary_large_image", title: "Contato" });
  });

  it("aceita ausência de keywords", () => {
    const meta = createPageMetadata({ title: "T", description: "D", path: "/x" });
    expect(meta.keywords).toEqual([]);
  });
});
