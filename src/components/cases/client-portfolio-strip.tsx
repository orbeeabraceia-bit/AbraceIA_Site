import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { managedClients } from "@/lib/content/cases";
import { cn } from "@/lib/utils";

type ClientPortfolioStripProps = {
  title?: string;
  className?: string;
  showCaseLinks?: boolean;
};

export function ClientPortfolioStrip({
  title = "Portfólio Orbee Labs em produção",
  className,
  showCaseLinks = false,
}: ClientPortfolioStripProps) {
  return (
    <section className={cn("rounded-card border border-border bg-white p-6", className)}>
      <p className="text-sm font-semibold text-navy">{title}</p>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {managedClients.map((client) => (
          <li
            key={client.url}
            className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-care/40 hover:shadow-xl"
          >
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted border-b border-border/50">
              <img
                src={`https://api.microlink.io/?url=${encodeURIComponent(client.url)}&screenshot=true&meta=false&embed=screenshot.url`}
                alt={`Miniatura do site: ${client.name}`}
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                crossOrigin="anonymous"
              />
              {/* Overlay sutil para elegância */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
            
            <div className="flex flex-1 flex-col p-6">
              <a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-display text-xl font-bold text-navy transition-colors hover:text-care"
              >
                {client.name}
                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-care" aria-hidden />
              </a>
              <p className="mt-2 text-sm font-semibold text-care">{client.specialty}</p>
              <p className="mt-1 text-sm text-muted-foreground">{client.credentials}</p>
              
              {showCaseLinks && client.caseSlug && (
                <div className="mt-auto pt-6">
                  <Link
                    href={`/cases/${client.caseSlug}`}
                    className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-ai transition-colors hover:text-ai-700"
                  >
                    Ler estudo de caso completo
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
