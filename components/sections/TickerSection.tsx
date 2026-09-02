"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const COPY =
  "Rejoignez les Bâtisseurs Solutionneurs · 16 · 17 décembre 2026 - Yaoundé · 300 places";

const ITEMS = [
  "Identifier",
  "Qualifier",
  "Connecter",
  "Accompagner",
  "40 Mairies",
  "10 Régions",
];

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

  return (
    <aside
      ref={ref}
      className="overflow-hidden whitespace-nowrap border-t border-emerald-900/15 bg-[#F5F0E6] py-4 text-[#0a1f18]"
      aria-label="Événement Back2Mboa"
    >
      <p className="sr-only">
        Rejoignez les Bâtisseurs Solutionneurs. 16 et 17 décembre 2026 à
        Yaoundé. 300 places.
      </p>
      {reduce ? (
        <p className="px-[var(--page-gutter)] text-center text-[0.95rem] font-bold uppercase tracking-[0.14em] text-pretty">
          {COPY}
        </p>
      ) : (
        <div
          aria-hidden="true"
          className={cn(
            "flex w-max whitespace-nowrap",
            !inView && "[animation-play-state:paused]",
          )}
          style={{
            animation: "marquee 28s linear infinite",
          }}
        >
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
          {[0, 1].map((dup) => (
            <div
              key={dup}
              className="flex shrink-0 items-center gap-x-5 px-2 text-[0.95rem] font-bold uppercase leading-none tracking-[0.14em] sm:gap-x-7 sm:text-[1.05rem] md:text-[1.125rem]"
            >
              {ITEMS.flatMap((label, i) => [
                <span key={`${dup}-${label}`}>{label}</span>,
                <span
                  key={`${dup}-dot-${i}`}
                  className="inline-block text-[0.65em] text-orange-500"
                  aria-hidden
                >
                  •
                </span>,
              ])}
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
