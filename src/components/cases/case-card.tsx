import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";
import type { CaseStudy } from "@/lib/content/cases";

function clientInitials(name: string) {
  const parts = name.replace(/^Dra\.\s|^Dr\.\s/, "").split(/\s+/);
  return parts
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export function CaseCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const initials = clientInitials(caseStudy.clientName);

  return (
    <FadeIn>
      <Card className="flex h-full flex-col">
        <div className="flex items-start gap-3">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full orbee-btn-gradient text-sm font-bold"
            aria-hidden
          >
            {initials}
          </span>
          <div>
            <CardTitle className="text-lg">{caseStudy.title}</CardTitle>
            <CardDescription>
              {caseStudy.specialty} · {caseStudy.timeline}
            </CardDescription>
          </div>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{caseStudy.credentials}</p>
        <p className="mt-4 text-sm text-muted-foreground line-clamp-3">{caseStudy.challenge}</p>
        <ul className="mt-4 grid grid-cols-2 gap-2 text-xs">
          {caseStudy.metrics.slice(0, 2).map((m) => (
            <li key={m.label} className="rounded-lg bg-ai-50 p-2">
              <span className="font-semibold text-navy">{m.label}</span>
              <br />
              {m.before} → {m.after}
            </li>
          ))}
        </ul>
        {caseStudy.aiCitations && (
          <p className="mt-3 text-xs text-ai">
            Citações em IA: {caseStudy.aiCitations.before} → {caseStudy.aiCitations.after}
          </p>
        )}
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <Link href={`/cases/${caseStudy.slug}`}>
            <Button intent="outline" size="sm">
              Ver case
            </Button>
          </Link>
          <a
            href={caseStudy.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-ai hover:underline"
          >
            Site ao vivo
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </Card>
    </FadeIn>
  );
}
