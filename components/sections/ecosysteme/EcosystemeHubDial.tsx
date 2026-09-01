"use client";

import { useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { ECOSYSTEME_NODES, type EcosystemeNode } from "@/data/ecosysteme/nodes";
import { cn } from "@/lib/utils";

const SPOTLIGHT_MS = 3200;
const NODE_COUNT = ECOSYSTEME_NODES.length;
const STEP_DEG = 360 / NODE_COUNT;
const ICON_PX = { compact: 18, default: 20 } as const;

const DIAL = {
  default: { size: 220, radius: 96, node: 42, hub: 68, labelMinH: "2.5rem" },
  compact: { size: 188, radius: 78, node: 36, hub: 56, labelMinH: "2rem" },
} as const;

function HubCenterMark({
  hub,
}: {
  hub: number;
}) {
  return (
    <div
      className="absolute top-1/2 left-1/2 z-[2] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[14px] overflow-hidden shadow-[0_0_24px_rgba(227,167,59,0.3),0_6px_18px_rgba(10,43,33,0.22)]"
      style={{ width: hub, height: hub }}
      aria-hidden="true"
    >
      <img
        src="/images/portail-terre-cuite.png"
        alt=""
        className="h-full w-full object-cover"
      />
    </div>
  );
}

/** Taille fixe + brightness-0 : SVG blancs/multicolores → noir uniforme. */
function DialIcon({ node, px }: { node: EcosystemeNode; px: number }) {
  if (node.iconSrc) {
    return (
      <img
        src={node.iconSrc}
        alt=""
        width={px}
        height={px}
        className="shrink-0 object-contain brightness-0"
        aria-hidden="true"
      />
    );
  }
  const FallbackIcon = node.LucideIcon;
  if (!FallbackIcon) return null;
  return (
    <FallbackIcon
      size={px}
      strokeWidth={1.75}
      className="shrink-0 text-[#0a2b21]"
      aria-hidden="true"
    />
  );
}

export function EcosystemeHubDial({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const spec = compact ? DIAL.compact : DIAL.default;

  const go = useCallback((next: number) => {
    setActive(((next % NODE_COUNT) + NODE_COUNT) % NODE_COUNT);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => go(active + 1), SPOTLIGHT_MS);
    return () => window.clearInterval(id);
  }, [active, paused, reduceMotion, go]);

  const activeNode = ECOSYSTEME_NODES[active];
  const spokeH = spec.node * 1.28;

  return (
    <div
      className={cn(compact ? "mb-4" : "mb-7")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div
        className="relative mx-auto"
        style={{ width: spec.size, height: spec.size }}
        role="group"
        aria-roledescription="cadran"
        aria-label="Dix acteurs de l'écosystème Back2Mboa"
      >
        {ECOSYSTEME_NODES.map((node, index) => {
          const on = index === active;
          const iconPx = compact ? ICON_PX.compact : ICON_PX.default;
          return (
            <div
              key={node.id}
              className="absolute top-1/2 left-1/2"
              style={
                {
                  width: spec.node,
                  height: spec.node,
                  "--i": index,
                  transform: `translate(-50%, -50%) rotate(calc(var(--i) * ${STEP_DEG}deg)) translateY(-${spec.radius}px)`,
                } as CSSProperties
              }
            >
              <span
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 border-l border-dotted border-[#0a2b21]/30"
                style={{ height: spokeH }}
                aria-hidden="true"
              />
              <button
                type="button"
                className={cn(
                  "relative flex items-center justify-center rounded-full bg-white text-[#0a2b21]",
                  "shadow-[0_3px_10px_rgba(10,43,33,0.08)] transition-[transform,box-shadow] duration-300 motion-reduce:transition-none",
                  on && "ring-2 ring-white ring-offset-2 ring-offset-[#DCB700] hover:ring-white",
                )}
                style={{
                  width: spec.node,
                  height: spec.node,
                  transform: `rotate(calc(var(--i) * -${STEP_DEG}deg)) scale(${on ? 1.08 : 1})`,
                }}
                aria-label={node.label}
                onMouseEnter={() => go(index)}
                onFocus={() => go(index)}
              >
                <DialIcon node={node} px={iconPx} />
              </button>
            </div>
          );
        })}
        <HubCenterMark hub={spec.hub} />
      </div>

      <p
        className="mx-auto mt-2 max-w-[14rem] text-center text-[0.6875rem] leading-snug font-semibold tracking-wide text-[#0a2b21] uppercase"
        style={{ minHeight: spec.labelMinH }}
        aria-live="polite"
      >
        {activeNode.label}
      </p>

      {reduceMotion && (
        <ul className="sr-only">
          {ECOSYSTEME_NODES.map((node) => (
            <li key={node.id}>{node.label}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
