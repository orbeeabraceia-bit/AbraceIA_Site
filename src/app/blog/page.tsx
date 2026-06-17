import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { blogPosts } from "@/lib/content/blog";
import { BlogList } from "@/components/blog/blog-list";
import { createPageMetadata } from "@/lib/metadata";
import { blogSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Blog — Saúde e IA",
  description: "Artigos sobre GEO, SEO médico e compliance CFM para clínicas em BH.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-[1500px] px-4 py-16 md:px-6">
      <JsonLd
        data={[
          blogSchema(blogPosts),
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: "Início", path: "/" }, { name: "Blog" }]} />
      <h1 className="font-display text-3xl font-bold text-navy">Blog</h1>
      <p className="mt-4 text-muted-foreground">
        Conteúdo informacional (ToFU) com autor credenciado — {blogPosts.length} artigos.
      </p>
      <BlogList posts={blogPosts} />
    </div>
  );
}
