"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

export function BlogReadTracker({ slug }: { slug: string }) {
  const fired = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (fired.current) return;
      const doc = document.documentElement;
      const pct = doc.scrollHeight > 0 ? window.scrollY / (doc.scrollHeight - doc.clientHeight) : 0;
      if (pct >= 0.85) {
        fired.current = true;
        trackEvent("blog_read_complete", { slug });
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  return null;
}
