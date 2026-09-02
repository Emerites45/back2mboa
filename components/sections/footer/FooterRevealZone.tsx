"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { FooterBannerSection } from "@/components/sections/footer-banner/FooterBannerSection";
import { FooterSection } from "@/components/sections/footer/FooterSection";
import { cn } from "@/lib/utils";

/** Seuil de scroll forcé, maintien banner, durées d’anim. */
const REVEAL = {
  holdMs: 1000,
  revealDuration: 0.5,
  bounceDuration: 0.95,
  bannerHeight: "30vh",
  bannerHeightRatio: 0.3,
  footerScrollTolerance: 12,
} as const;

/** Élastique — résistance douce, relâchement en ease-out (pas de ressort). */
const RUBBER = {
  drag: 0.36,
  touchDrag: 0.62,
  maxPull: 240,
  releaseThreshold: 96,
  resistance: 0.5,
  footerShift: 0.26,
  idleMs: 120,
  releaseMs: 480,
} as const;

type Phase = "idle" | "revealing" | "hold" | "closing";

function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
}

function isAtFooterEnd(tolerance = REVEAL.footerScrollTolerance): boolean {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return window.scrollY >= max - tolerance;
}

function addRubberPull(current: number, delta: number): number {
  const t = Math.min(1, current / RUBBER.maxPull);
  const ease = 1 - t * t * RUBBER.resistance;
  return Math.min(RUBBER.maxPull, current + delta * RUBBER.drag * Math.max(0.2, ease));
}

function peekBannerHeight(pull: number): string {
  if (pull <= 0) return "0px";
  const maxPx = window.innerHeight * REVEAL.bannerHeightRatio;
  const ratio = Math.min(1, pull / RUBBER.releaseThreshold);
  return `${Math.sqrt(ratio) * maxPx}px`;
}

export function FooterRevealZone() {
  const lenis = useLenis();
  const [phase, setPhase] = useState<Phase>("idle");
  const [open, setOpen] = useState(false);
  const [pullPx, setPullPx] = useState(0);
  const [dragging, setDragging] = useState(false);

  const pullRef = useRef(0);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const releaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartY = useRef(0);
  const phaseRef = useRef<Phase>("idle");
  const reduceMotion = useRef(false);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reduceMotion.current = mq.matches;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const clearHold = useCallback(() => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    holdTimer.current = null;
  }, []);

  const resetPull = useCallback(() => {
    if (releaseTimer.current) clearTimeout(releaseTimer.current);
    releaseTimer.current = null;
    pullRef.current = 0;
    setDragging(false);
    setPullPx(0);
  }, []);

  const scheduleRelease = useCallback(() => {
    if (releaseTimer.current) clearTimeout(releaseTimer.current);
    releaseTimer.current = setTimeout(() => {
      if (phaseRef.current !== "idle" || pullRef.current <= 0) return;
      setDragging(false);
      requestAnimationFrame(() => {
        pullRef.current = 0;
        setPullPx(0);
      });
    }, RUBBER.idleMs);
  }, []);

  const closeBanner = useCallback(() => {
    clearHold();
    setPhase("closing");

    const finish = () => {
      setOpen(false);
      setPhase("idle");
      resetPull();
      lenis?.resize();
    };

    if (reduceMotion.current) {
      lenis?.scrollTo("#footer", { immediate: true });
      finish();
      return;
    }

    lenis?.scrollTo("#footer", {
      duration: REVEAL.bounceDuration,
      easing: easeOutBack,
      onComplete: finish,
    });
  }, [clearHold, lenis, resetPull]);

  const openBanner = useCallback(() => {
    if (phaseRef.current !== "idle") return;

    setPhase("revealing");
    resetPull();
    setOpen(true);

    requestAnimationFrame(() => {
      lenis?.resize();

      const onRevealed = () => {
        setPhase("hold");
        holdTimer.current = setTimeout(closeBanner, REVEAL.holdMs);
      };

      if (reduceMotion.current) {
        lenis?.scrollTo("#footer-banner", { immediate: true });
        onRevealed();
        return;
      }

      lenis?.scrollTo("#footer-banner", {
        duration: REVEAL.revealDuration,
        onComplete: onRevealed,
      });
    });
  }, [lenis, closeBanner, resetPull]);

  const applyPull = useCallback(
    (delta: number) => {
      if (phaseRef.current !== "idle" || !isAtFooterEnd() || delta <= 0) return;

      if (releaseTimer.current) clearTimeout(releaseTimer.current);
      setDragging(true);

      const next = addRubberPull(pullRef.current, delta);
      pullRef.current = next;
      setPullPx(next);

      if (next >= RUBBER.releaseThreshold) {
        openBanner();
        return;
      }

      scheduleRelease();
    },
    [openBanner, scheduleRelease],
  );

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const currentPhase = phaseRef.current;

      if (currentPhase === "revealing" || currentPhase === "hold" || currentPhase === "closing") {
        e.preventDefault();
        return;
      }

      if (!isAtFooterEnd()) {
        if (pullRef.current > 0) resetPull();
        return;
      }

      if (e.deltaY > 0) {
        e.preventDefault();
        applyPull(e.deltaY);
      } else if (pullRef.current > 0) {
        e.preventDefault();
        if (releaseTimer.current) clearTimeout(releaseTimer.current);
        setDragging(true);
        pullRef.current = Math.max(0, pullRef.current + e.deltaY * RUBBER.drag * 0.55);
        setPullPx(pullRef.current);
        if (pullRef.current > 0) scheduleRelease();
        else resetPull();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      const currentPhase = phaseRef.current;

      if (currentPhase === "revealing" || currentPhase === "hold" || currentPhase === "closing") {
        e.preventDefault();
        return;
      }

      if (!isAtFooterEnd()) return;

      const y = e.touches[0]?.clientY ?? touchStartY.current;
      const frameDelta = (touchStartY.current - y) * RUBBER.touchDrag * 0.06;

      if (frameDelta > 0) {
        e.preventDefault();
        applyPull(frameDelta);
        touchStartY.current = y;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      clearHold();
    };
  }, [applyPull, clearHold, resetPull, scheduleRelease]);

  const isElastic = phase === "idle" && !open && pullPx > 0;
  const bannerHeight = open ? REVEAL.bannerHeight : pullPx > 0 ? peekBannerHeight(pullPx) : "0px";
  const releaseEase = `${RUBBER.releaseMs}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;

  return (
    <div
      className="will-change-transform motion-reduce:transform-none"
      style={{
        transform: !open ? `translateY(${pullPx * RUBBER.footerShift}px)` : undefined,
        transition: dragging || open ? "none" : `transform ${releaseEase}`,
      }}
    >
      <FooterSection />
      <div
        className={cn(
          "overflow-hidden motion-reduce:transition-none",
          !dragging && "transition-[height] ease-out",
        )}
        style={{
          height: bannerHeight,
          transitionDuration: dragging ? "0ms" : `${RUBBER.releaseMs}ms`,
        }}
        aria-hidden={!open && !isElastic}
      >
        <FooterBannerSection />
      </div>
    </div>
  );
}
