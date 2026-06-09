import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

// Gera o card de compartilhamento (OG) em PNG 1200×630 — substitui o og.svg,
// que não é renderizado por Facebook/LinkedIn/WhatsApp/X.
export const alt = `${siteConfig.name} — Presença de saúde com IA`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0B1F3A 0%, #0E4D5C 60%, #139D87 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#139D87",
              fontSize: 38,
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 980 }}>
            Seu consultório citado pela IA e no topo do Google
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#DFB55D", fontWeight: 600 }}>
            GEO · SEO · Compliance CFM — Belo Horizonte
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.85)" }}>
          {siteConfig.url.replace("https://", "")} · by Orbee Labs
        </div>
      </div>
    ),
    { ...size },
  );
}
