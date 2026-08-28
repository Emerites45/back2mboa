"use client";

import { useEffect, useRef, useState } from "react";
import { ModeleClaws } from "./ModeleClaws";

/** Griffes décoratives — paire diamétrale TR + BL, mêmes propriétés */
export function ModeleClawsDecor() {
  const decorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = decorRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  const decorClass = visible
    ? "modele-claws-decor is-visible"
    : "modele-claws-decor";

  return (
    <div ref={decorRef} className={decorClass} aria-hidden="true">
      <svg
        className="modele-claws is-corner-tr"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMaxYMin meet"
        fill="none"
      >
        <ModeleClaws instance="tr" />
      </svg>
      <svg
        className="modele-claws is-corner-bl"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMinYMax meet"
        fill="none"
      >
        <ModeleClaws instance="bl" />
      </svg>
    </div>
  );
}
