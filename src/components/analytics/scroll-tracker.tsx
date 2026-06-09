"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function ScrollTracker() {
  useEffect(() => {
    const fired = new Set<number>();
    const thresholds = [25, 50, 75, 90];

    function onScroll() {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const height = doc.scrollHeight - doc.clientHeight;
      if (height <= 0) return;
      const pct = Math.round((scrollTop / height) * 100);

      for (const t of thresholds) {
        if (pct >= t && !fired.has(t)) {
          fired.add(t);
          trackEvent(`scroll_depth_${t}`, { page: window.location.pathname });
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
