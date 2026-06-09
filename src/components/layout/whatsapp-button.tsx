"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

const whatsappUrl = `https://wa.me/${siteConfig.org.phone.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Quero saber sobre presença de saúde com IA (AbraceIA).")}`;

export function WhatsAppButton() {
  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full orbee-btn-gradient shadow-lg transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-care focus-visible:ring-offset-2"
      aria-label="Falar no WhatsApp"
      onClick={() => trackEvent("click_whatsapp", { location: "floating_button" })}
    >
      <MessageCircle className="h-7 w-7" aria-hidden />
    </Link>
  );
}
