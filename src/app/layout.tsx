import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, Newsreader } from "next/font/google";
import { FontSizeControls } from "@/components/accessibility/font-size-controls";
import { ScrollTracker } from "@/components/analytics/scroll-tracker";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { AnalyticsScripts } from "@/components/analytics/gtm";
import { ToastProvider } from "@/components/ui/toast-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

// Tipografia oficial AbraceIA (Manual de Marca):
// Bricolage Grotesque (títulos) · Hanken Grotesk (corpo) · Newsreader Italic (destaques)
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Presença de saúde com IA | BH`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: { icon: "/logo.png" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    // Imagem fornecida pela convenção app/opengraph-image.tsx (PNG 1200×630).
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${hanken.variable} ${newsreader.variable} h-full`}>
      <body className={`${hanken.className} flex min-h-full flex-col antialiased bg-background`}>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Header />
        <main id="conteudo-principal" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <FontSizeControls />
        <ScrollTracker />
        <CookieBanner />
        <AnalyticsScripts />
        <ToastProvider />
      </body>
    </html>
  );
}
