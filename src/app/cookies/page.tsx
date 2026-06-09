import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Política de Cookies",
  description: "Como o AbraceIA usa cookies e analytics com consentimento LGPD.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <Breadcrumbs items={[{ name: "Início", path: "/" }, { name: "Cookies" }]} />
      <h1 className="font-display text-3xl font-bold text-navy">Política de Cookies</h1>
      <p className="mt-4 text-muted-foreground">
        Utilizamos cookies essenciais para funcionamento do site e, somente com seu consentimento,
        cookies de analytics (Google Analytics 4 / Tag Manager).
      </p>
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-navy">Cookies essenciais</h2>
        <p className="mt-2 text-muted-foreground">
          Preferência de consentimento LGPD e tamanho de fonte (acessibilidade). Não exigem
          consentimento adicional.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-navy">Cookies de analytics</h2>
        <p className="mt-2 text-muted-foreground">
          Ativados apenas após clicar em &ldquo;Aceitar&rdquo; no banner. Medem tráfego, eventos
          (formulários, WhatsApp, scroll) de forma anonimizada (IP anonimizado quando GA4 direto).
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-navy">Como revogar</h2>
        <p className="mt-2 text-muted-foreground">
          Limpe os cookies do navegador ou entre em contato via{" "}
          <Link href="/contato" className="text-care hover:underline">
            formulário
          </Link>
          . Veja também a{" "}
          <Link href="/privacidade" className="text-care hover:underline">
            Política de Privacidade
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
