import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Presença de saúde com IA | BH`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: { icon: "/logo.svg" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: siteConfig.name }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable} h-full`}>
      <body className={`${GeistSans.className} flex min-h-full flex-col antialiased bg-background`}>
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
