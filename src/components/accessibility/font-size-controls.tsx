"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "abraceia-font-scale";
const scales = [
  { label: "A-", value: 0.9 },
  { label: "A", value: 1 },
  { label: "A+", value: 1.12 },
] as const;

export function FontSizeControls() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setScale(Number(saved));
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${scale * 100}%`;
    localStorage.setItem(STORAGE_KEY, String(scale));
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
          onClick={() => setScale(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
