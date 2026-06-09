import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { footerTagline } from "@/lib/content/home-marketing";

const footerLinks = [
  { href: "/privacidade", label: "Privacidade" },
  { href: "/cookies", label: "Cookies" },
  { href: "/termos", label: "Termos" },
  { href: "/compliance", label: "Compliance CFM" },
  { href: "/contato", label: "Contato" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-bold text-navy">{siteConfig.name}</p>
            <p className="mt-2 text-sm text-muted-foreground">{siteConfig.tagline}</p>
            <p className="mt-2 text-xs text-muted-foreground">{footerTagline}</p>
            <p className="mt-4 text-xs text-muted-foreground">{siteConfig.aiDisclaimer}</p>
            <a
              href="https://orbeelabs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-medium text-care hover:underline"
            >
              Desenvolvido por Orbee Labs ↗
            </a>
          </div>
          <div>
            <p className="font-semibold text-navy">Serviços</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/metodo" className="hover:text-care">
                  Método AbraceIA
                </Link>
              </li>
              <li>
                <Link href="/servicos/geo-saude" className="hover:text-care">
                  GEO para Saúde
                </Link>
              </li>
              <li>
                <Link href="/servicos/sites-medicos" className="hover:text-care">
                  Sites para Médicos
                </Link>
              </li>
              <li>
                <Link href="/servicos/seo-medico" className="hover:text-care">
                  SEO Médico
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-navy">Legal</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-care">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.org.name} · {siteConfig.city},{" "}
          {siteConfig.state}
        </p>
      </div>
    </footer>
  );
}
