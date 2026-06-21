"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Renderiza o conteúdo já visível (sem opacity:0 inicial). Use acima da
   *  dobra para não atrasar o LCP — o elemento conta como pintado de imediato. */
  eager?: boolean;
};

export function FadeIn({ children, className, delay = 0, eager = false }: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  // eager/reduced-motion: conteúdo visível imediatamente (bom para LCP/a11y).
  if (reduceMotion || eager) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
