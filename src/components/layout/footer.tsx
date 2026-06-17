import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { footerTagline } from "@/lib/content/home-marketing";
import { CrossParticles } from "@/components/animations/cross-particles";

// Quebra o disclaimer na 1ª frase para a 2ª ("Não substitui…") iniciar em nova linha.
const [disclaimerHead, ...disclaimerTail] = siteConfig.aiDisclaimer.split(". ");

const footerLinks = [
  { href: "/privacidade", label: "Privacidade" },
  { href: "/cookies", label: "Cookies" },
  { href: "/termos", label: "Termos" },
  { href: "/compliance", label: "Compliance CFM" },
  { href: "/contato", label: "Contato" },
];

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border bg-white">
      <CrossParticles screensaverOnly />
      <div className="relative z-10 mx-auto max-w-[1500px] px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-[1.6fr_1fr_1fr] md:items-start">
          <div>
            {/* Título */}
            <p className="font-display text-lg font-bold text-navy">{siteConfig.name}</p>
            {/* Subtítulo (tagline) */}
            <p className="mt-3 text-sm font-medium text-navy/90">{siteConfig.tagline}</p>
            {/* Conteúdo */}
            <div className="mt-4 max-w-sm space-y-3 text-xs leading-relaxed text-muted-foreground">
              <p>{footerTagline}</p>
              <p>
                {disclaimerHead}.
                <br />
                {disclaimerTail.join(". ")}
              </p>
            </div>
            <a
              href="https://orbeelabs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm font-medium text-care hover:underline"
            >
              Desenvolvido por Orbee Labs ↗
            </a>
          </div>
          <div>
            <p className="font-display text-base font-bold text-navy">Serviços</p>
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
            <p className="font-display text-base font-bold text-navy">Legal</p>
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
