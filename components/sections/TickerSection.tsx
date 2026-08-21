"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const COPY =
  "Rejoignez les Bâtisseurs Solutionneurs · 16 · 17 · 18 décembre 2026 - Yaoundé · 300 places ·";

const REPEAT = 6;

export function TickerSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const items = Array.from({ length: REPEAT }, (_, i) => (
    <span key={i} className="px-3">
      {COPY}
    </span>
  ));

  return (
    <aside
      ref={ref}
      className="overflow-hidden bg-brand-cream py-3 text-brand-ink"
      aria-label="Événement Back2Mboa"
    >
      <p className="sr-only">
        Rejoignez les Bâtisseurs Solutionneurs. 16, 17 et 18 décembre 2026 à
        Yaoundé. 300 places.
      </p>
      {reduce ? (
        <p className="px-[var(--page-gutter)] text-center text-[0.9375rem] font-medium tracking-[0.02em] text-pretty">
          {COPY}
        </p>
      ) : (
        <div
          aria-hidden="true"
          className={cn(
            "ticker-track flex w-max text-[0.9375rem] font-medium tracking-[0.02em] whitespace-nowrap",
            !inView && "is-paused",
          )}
        >
          <div className="flex shrink-0">{items}</div>
          <div className="flex shrink-0">{items}</div>
        </div>
      )}
    </aside>
  );
}
