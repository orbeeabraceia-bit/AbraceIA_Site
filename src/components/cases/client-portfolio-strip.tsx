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
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {managedClients.map((client) => (
          <li
            key={client.url}
            className="flex items-start gap-3 rounded-lg border border-border bg-cream/80 p-3"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ai text-sm font-bold text-white"
              aria-hidden
            >
              {client.initials}
            </span>
            <div className="min-w-0">
              <a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-navy hover:text-ai"
              >
                {client.name}
                <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
              </a>
              <p className="text-xs text-muted-foreground">{client.specialty}</p>
              <p className="text-xs text-muted-foreground/70">{client.credentials}</p>
              {showCaseLinks && client.caseSlug && (
                <Link
                  href={`/cases/${client.caseSlug}`}
                  className="mt-1 inline-block text-xs font-medium text-ai hover:underline"
                >
                  Ver case AbraceIA →
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
