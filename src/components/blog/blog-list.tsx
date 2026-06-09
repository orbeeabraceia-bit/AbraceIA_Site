"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/content/blog";

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.keyword.toLowerCase().includes(q),
    );
  }, [posts, query]);

  return (
    <>
      <label htmlFor="blog-search" className="sr-only">
        Buscar no blog
      </label>
      <input
        id="blog-search"
        type="search"
        placeholder="Buscar artigos por tema ou keyword…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mt-8 w-full rounded-btn border border-border bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-care"
      />
      <p className="mt-2 text-xs text-muted-foreground">
        {filtered.length} artigo(s) encontrado(s)
      </p>
      <ul className="mt-6 space-y-6">
        {filtered.map((post) => (
          <li key={post.slug} className="rounded-card border border-border p-6 shadow-sm">
            <p className="text-xs font-medium text-care">{post.keyword}</p>
            <h2 className="mt-1 text-lg font-semibold text-navy">
              <Link href={`/blog/${post.slug}`} className="hover:text-care">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {post.publishedAt} · {post.readMinutes} min
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
