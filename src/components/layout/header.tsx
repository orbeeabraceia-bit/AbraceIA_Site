"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/metodo", label: "Método" },
  { href: "/servicos/geo-saude", label: "GEO Saúde" },
  { href: "/servicos/sites-medicos", label: "Sites" },
  { href: "/servicos/seo-medico", label: "SEO Médico" },
  { href: "/auditoria-seo", label: "Auditoria SEO" },
  { href: "/cases", label: "Cases" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <Button
        intent="ghost"
        size="sm"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 top-[73px] z-40 bg-white transition-opacity",
          open ? "visible opacity-100" : "invisible pointer-events-none opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1 border-t border-border p-4" aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="min-h-11 rounded-btn px-4 py-3 text-base font-medium text-navy hover:bg-teal-50"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/auditoria-ia" className="mt-4" onClick={() => setOpen(false)}>
            <Button intent="ai" className="w-full">
              Auditoria IA grátis
            </Button>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-md">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-btn focus:bg-peach focus:px-4 focus:py-2 focus:text-onyx"
      >
        Pular para o conteúdo
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <img src="/logo.svg" alt="" width={40} height={40} aria-hidden className="h-10 w-10" />
          </Link>
          <div className="leading-tight">
            <Link href="/" className="font-display text-xl font-bold text-navy">
              {siteConfig.name}
            </Link>
            <a
              href="https://orbeelabs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs font-medium text-care hover:underline"
            >
              by Orbee Labs · BH
            </a>
          </div>
        </div>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Principal">
          {nav.slice(0, 6).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition hover:text-care"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/auditoria-ia" className="hidden sm:block">
            <Button intent="ai" size="sm">
              Auditoria IA
            </Button>
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
