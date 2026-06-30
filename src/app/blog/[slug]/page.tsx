import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, getPost } from "@/lib/content/blog";
import { getCase } from "@/lib/content/cases";
import { JsonLd } from "@/components/seo/json-ld";
import { BlogReadTracker } from "@/components/blog/blog-read-tracker";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { AuthorBox } from "@/components/seo/author-box";
import { FaqAccordion } from "@/components/seo/faq-accordion";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    keywords: [post.keyword],
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.excerpt,
            path: `/blog/${slug}`,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
          ...(post.faq ? [faqSchema(post.faq)] : []),
        ]}
      />
      <BlogReadTracker slug={slug} />
      <article className="mx-auto max-w-5xl px-4 py-16 md:px-6">
        <Breadcrumbs
          items={[
            { name: "Início", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title },
          ]}
        />
        <p className="text-sm text-care">{post.keyword}</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-navy">{post.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {post.publishedAt} · {post.readMinutes} min de leitura
        </p>
        <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>

        {post.summary && (
          <div className="mt-6 rounded-card border border-care/20 bg-cream/60 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-care">Em resumo</p>
            <p className="mt-2 leading-relaxed text-navy">{post.summary}</p>
          </div>
        )}

        {post.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-xl font-semibold text-navy">{section.heading}</h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 30)} className="mt-3 text-muted-foreground leading-relaxed">
                {p}
              </p>
            ))}
          </section>
        ))}

        <AuthorBox />

        {post.relatedCaseSlugs && post.relatedCaseSlugs.length > 0 && (
          <section className="mt-12 rounded-card border border-border bg-cream p-6">
            <h2 className="text-lg font-semibold text-navy">Cases relacionados</h2>
            <ul className="mt-4 space-y-2">
              {post.relatedCaseSlugs.map((caseSlug) => {
                const c = getCase(caseSlug);
                if (!c) return null;
                return (
                  <li key={caseSlug}>
                    <Link href={`/cases/${caseSlug}`} className="text-ai hover:underline">
                      {c.clientName}
                    </Link>
                    <span className="text-sm text-muted-foreground"> — {c.specialty}</span>
                    {" · "}
                    <a
                      href={c.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:underline"
                    >
                      site ao vivo
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {post.faq && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-navy">FAQ</h2>
            <div className="mt-4">
              <FaqAccordion items={post.faq} />
            </div>
          </section>
        )}

        <Link href="/blog" className="mt-10 inline-block text-sm text-ai underline">
          ← Voltar ao blog
        </Link>
      </article>
    </>
  );
}
