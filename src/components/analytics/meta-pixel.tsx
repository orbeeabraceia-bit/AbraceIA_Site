"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { hasMarketingConsent } from "@/lib/analytics";

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

function subscribe(onChange: () => void) {
  window.addEventListener("abraceia:analytics-consent", onChange);
  return () => window.removeEventListener("abraceia:analytics-consent", onChange);
}

function getServerSnapshot() {
  return false;
}

// Pixel da Meta — injetado SOMENTE após consentimento de marketing (ad_storage).
// Usa o mesmo gatilho de consentimento do GTM (evento abraceia:analytics-consent),
// mas gateado por hasMarketingConsent (e não analytics): finalidades separadas
// por LGPD. A deduplicação com a Conversions API é feita via event_id (ver
// trackMetaEvent + lib/meta-capi).
export function MetaPixel() {
  const enabled = useSyncExternalStore(subscribe, hasMarketingConsent, getServerSnapshot);

  if (!enabled || !PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${PIXEL_ID}');
        fbq('track', 'PageView');
      `}</Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
