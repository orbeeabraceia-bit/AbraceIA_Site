"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Flag client-only (SSR-safe, sem setState em efeito) para portalizar o menu.
const noopSubscribe = () => () => {};

type NavLink = { href: string; label: string };
type NavGroup = { label: string; children: NavLink[] };
type NavItem = NavLink | NavGroup;

const nav: NavItem[] = [
  { href: "/metodo", label: "Método" },
  {
    label: "Serviços",
    children: [
      { href: "/servicos/geo-saude", label: "GEO Saúde" },
      { href: "/servicos/sites-medicos", label: "Sites Médicos" },
      { href: "/servicos/seo-medico", label: "SEO Médico" },
      { href: "/auditoria-seo", label: "Auditoria SEO" },
    ],
  },
  { href: "/cases", label: "Cases" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

// Lista achatada (para o menu mobile e para varredura)
const flatNav: NavLink[] = nav.flatMap((item) =>
  "children" in item ? item.children : [item],
);

function ServicesDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-base font-medium text-muted-foreground transition hover:text-care"
      >
        {group.label}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      <div
        className={cn(
          "absolute left-0 top-full z-50 min-w-52 rounded-card border border-border bg-white p-2 shadow-lg shadow-navy/5 transition-opacity",
          open ? "visible opacity-100" : "invisible pointer-events-none opacity-0",
        )}
      >
        {group.children.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="block rounded-btn px-3 py-2 text-sm font-medium text-navy transition hover:bg-teal-50 hover:text-care"
            onClick={() => setOpen(false)}
          >
            {c.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Painel renderizado via portal no <body> para escapar do contexto de
  // backdrop-filter do header (que quebraria o position:fixed do overlay).
  const panel = (
    <div
      id="mobile-menu"
      className={cn(
        "fixed inset-0 top-[73px] z-40 bg-white transition-opacity lg:hidden",
        open ? "visible opacity-100" : "invisible pointer-events-none opacity-0",
      )}
    >
      <nav className="flex flex-col gap-1 border-t border-border p-4" aria-label="Mobile">
        {flatNav.map((item) => (
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
  );

  return (
    <div className="lg:hidden">
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
      {mounted && createPortal(panel, document.body)}
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
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="" width={40} height={40} unoptimized aria-hidden className="h-10 w-10 shrink-0 object-contain" />
          <span className="font-display text-xl font-bold text-navy">
            {siteConfig.name.split("—")[0].trim()}
          </span>
        </Link>
        <nav className="hidden items-center gap-4 lg:flex" aria-label="Principal">
          {nav.map((item) =>
            "children" in item ? (
              <ServicesDropdown key={item.label} group={item} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium text-muted-foreground transition hover:text-care"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="https://orbeelabs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:block"
          >
            <Button intent="outline" size="sm" className="h-9 border-border text-xs font-semibold text-muted-foreground hover:text-navy hover:bg-muted">
              by Orbee Labs
            </Button>
          </a>
          <Link href="/auditoria-ia" className="hidden sm:block">
            <Button intent="ai" size="sm" className="h-9">
              Auditoria IA
            </Button>
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
