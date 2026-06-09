import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { name: string; path?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-1">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />}
              {isLast || !item.path ? (
                <span className="font-medium text-navy" aria-current={isLast ? "page" : undefined}>
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-care">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
