"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

export function GuiaDownloadCta() {
  return (
    <Link
      href="/llms.txt"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("download_guia", { resource: "llms_txt" })}
    >
      <Button intent="outline" size="sm">
        Baixar llms.txt (GEO)
      </Button>
    </Link>
  );
}
