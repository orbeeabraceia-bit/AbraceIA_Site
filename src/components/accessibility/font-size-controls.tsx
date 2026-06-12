"use client";

import { useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "abraceia-font-scale";
const SCALE_EVENT = "abraceia:font-scale";
const scales = [
  { label: "A-", value: 0.9 },
  { label: "A", value: 1 },
  { label: "A+", value: 1.12 },
] as const;

let cachedScale: number | null = null;

function subscribe(onChange: () => void) {
  window.addEventListener(SCALE_EVENT, onChange);
  return () => window.removeEventListener(SCALE_EVENT, onChange);
}

function getScale() {
  if (cachedScale === null) {
    cachedScale = Number(localStorage.getItem(STORAGE_KEY)) || 1;
  }
  return cachedScale;
}

function getServerScale() {
  return 1;
}

function saveScale(value: number) {
  cachedScale = value;
  localStorage.setItem(STORAGE_KEY, String(value));
  window.dispatchEvent(new CustomEvent(SCALE_EVENT));
}

export function FontSizeControls() {
  const scale = useSyncExternalStore(subscribe, getScale, getServerScale);

  useEffect(() => {
    document.documentElement.style.fontSize = `${scale * 100}%`;
  }, [scale]);

  return (
    <div
      className="fixed bottom-24 left-4 z-40 flex overflow-hidden rounded-full border border-border bg-white shadow-md"
      role="group"
      aria-label="Tamanho da fonte"
    >
      {scales.map((item) => (
        <button
          key={item.label}
          type="button"
          className={`min-h-10 min-w-10 px-2 text-sm font-semibold transition ${
            scale === item.value ? "bg-peach text-onyx" : "text-navy hover:bg-muted"
          }`}
          aria-pressed={scale === item.value}
          onClick={() => saveScale(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
