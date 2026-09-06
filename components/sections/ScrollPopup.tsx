"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ScrollPopupShell = dynamic(
  () => import("./ScrollPopupShell").then((m) => m.ScrollPopupShell),
  { ssr: false },
);

interface ScrollPopupCtx {
  open: () => void;
}

const Ctx = createContext<ScrollPopupCtx>({ open: () => {} });

export function ScrollPopupProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggered = useRef(false);

  const openPopup = useCallback(() => setOpen(true), []);

  /* ---- auto-trigger après scroll past HeroLanding ---- */
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const seen = { current: false };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          seen.current = true;
          return;
        }
        if (seen.current && !triggered.current) {
          triggered.current = true;
          setTimeout(() => setOpen(true), 600);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <Ctx.Provider value={{ open: openPopup }}>
      {children}
      <ScrollPopupShell open={open} onClose={() => setOpen(false)} />
    </Ctx.Provider>
  );
}

export function useScrollPopup() {
  return useContext(Ctx);
}
