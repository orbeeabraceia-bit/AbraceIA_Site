"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border overflow-hidden rounded-card border border-border">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                className={cn(
                  "flex min-h-11 w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold transition-colors",
                  isOpen ? "bg-care text-white" : "text-navy hover:bg-cream",
                )}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {item.question}
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 transition",
                    isOpen ? "rotate-180 text-white" : "text-ai",
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="bg-teal-50 px-5 pb-5 pt-4 leading-relaxed text-navy/80"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
