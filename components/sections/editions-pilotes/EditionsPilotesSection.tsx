"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  EDITIONS_PILOTES_COLUMNS,
  EDITIONS_PILOTES_COPY,
} from "@/data/editions-pilotes";
import type { EditionColumn, EditionSlide } from "@/types/editions-pilotes";
import { cn } from "@/lib/utils";

const TYPE = {
  family: "var(--font-apfel-grotezk), 'Apfel Grotezk', system-ui, sans-serif",
  mono: "var(--font-roboto-mono), 'Roboto Mono', ui-monospace, monospace",
} as const;

const SECTION = {
  bg: "#f7f3eb",
  forest: "#0a2b21",
  green: "#119d63",
  /** Accent brique — calé sur la puce maçonnerie */
  terre: "#b54a32",
  muted: "#5a6b60",
  ink: "#1a1f1c",
  yellow: "#ffd506",
  line: "rgba(10, 43, 33, 0.1)",
  wash: "rgba(17, 157, 99, 0.045)",
} as const;

const ROLE_BULLET = "/images/editions-pilotes/role-bullet-brick.png";

const HOVER = {
  ms: 320,
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

/** Horloge partagée : dwell confortable + crossfade ample. */
const SLIDE_MS = 5200;
const TRANSITION_MS = 980;
const EASE_CROSS = "cubic-bezier(0.33, 0.1, 0.2, 1)";
const SLIDE_COUNT = Math.max(
  ...EDITIONS_PILOTES_COLUMNS.map((c) => c.slides.length),
  1,
);

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

/** Une seule horloge pour les 3 galeries — changement simultané. */
function useSyncedSlideClock(paused: boolean) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const progressRef = useRef(0);
  const indexRef = useRef(0);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const goTo = useCallback((next: number) => {
    const target = ((next % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT;
    indexRef.current = target;
    setIndex(target);
    setProgress(0);
    progressRef.current = 0;
    startRef.current = performance.now();
  }, []);

  useEffect(() => {
    if (reduced || SLIDE_COUNT <= 1) return;

    startRef.current = performance.now() - progressRef.current * SLIDE_MS;

    const tick = (now: number) => {
      if (!pausedRef.current) {
        const elapsed = now - startRef.current;
        const p = Math.min(1, elapsed / SLIDE_MS);
        progressRef.current = p;
        setProgress(p);
        if (p >= 1) {
          const next = (indexRef.current + 1) % SLIDE_COUNT;
          indexRef.current = next;
          setIndex(next);
          setProgress(0);
          progressRef.current = 0;
          startRef.current = now;
        }
      } else {
        startRef.current = now - progressRef.current * SLIDE_MS;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  return { index, progress, goTo, reduced };
}

function ColumnCarousel({
  slides,
  index,
  progress,
  onGoTo,
  reduced,
}: {
  slides: EditionSlide[];
  index: number;
  progress: number;
  onGoTo: (next: number) => void;
  reduced: boolean;
}) {
  const total = slides.length;
  const safeIndex = total > 0 ? index % total : 0;
  const active = slides[safeIndex] ?? slides[0];
  const multi = total > 1;

  return (
    <div
      className="relative h-full min-h-[11rem] w-full flex-1 overflow-hidden rounded-[0.85rem] bg-[#ddd7cd]"
      role="region"
      aria-roledescription="carousel"
      aria-label={`Galerie ${active?.caption ?? ""}`}
    >
      {slides.map((slide, i) => {
        const on = i === safeIndex;
        return (
          <div
            key={slide.src}
            className="absolute inset-0"
            style={{
              zIndex: on ? 2 : 1,
              opacity: on ? 1 : 0,
              transform: reduced ? "none" : on ? "scale(1)" : "scale(1.025)",
              transition: reduced
                ? "opacity 220ms ease"
                : `opacity ${TRANSITION_MS}ms ${EASE_CROSS}, transform ${TRANSITION_MS}ms ${EASE_CROSS}`,
              pointerEvents: on ? "auto" : "none",
              willChange: "opacity, transform",
            }}
            aria-hidden={!on}
          >
            <Image
              src={slide.src}
              alt={on ? slide.alt : ""}
              fill
              sizes="(max-width: 900px) 100vw, 33vw"
              className="object-cover"
              priority={i < 2}
            />
          </div>
        );
      })}

      <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-[rgba(10,43,33,0.78)] via-[rgba(10,43,33,0.18)] to-transparent" />

      <div className="absolute inset-x-0 bottom-0 z-[4] px-3.5 pb-3 pt-10">
        <p
          className="mb-2.5 text-[0.68rem] font-medium tracking-[0.02em] text-white/95"
          style={{ fontFamily: TYPE.family }}
        >
          Photo {safeIndex + 1}/{total} — {active?.caption}
        </p>

        {multi ? (
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Slides">
            {slides.map((slide, i) => {
              const on = i === safeIndex;
              return (
                <button
                  key={slide.src}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-label={`Photo ${i + 1} sur ${total}`}
                  className={cn(
                    "relative h-1.5 overflow-hidden rounded-full transition-all duration-200 ease-out",
                    on
                      ? "w-7 bg-white/25"
                      : "w-1.5 bg-white/40 hover:bg-white/70",
                  )}
                  onClick={() => onGoTo(i)}
                >
                  {on && !reduced ? (
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-white"
                      style={{ width: `${Math.max(10, progress * 100)}%` }}
                    />
                  ) : on ? (
                    <span className="absolute inset-0 rounded-full bg-white" />
                  ) : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ColumnCard({
  column,
  index,
  slideIndex,
  progress,
  onGoTo,
  reduced,
}: {
  column: EditionColumn;
  index: number;
  slideIndex: number;
  progress: number;
  onGoTo: (next: number) => void;
  reduced: boolean;
}) {
  const [active, setActive] = useState(false);
  const n = String(index + 1).padStart(2, "0");

  return (
    <article
      className={cn(
        "group/col relative flex h-full min-h-0 flex-col overflow-hidden rounded-[1.15rem] outline-none",
        "border transition-[background-color,box-shadow,border-color] motion-reduce:transition-none",
      )}
      style={{
        borderColor: SECTION.line,
        transitionDuration: `${HOVER.ms}ms`,
        transitionTimingFunction: HOVER.ease,
        background: active ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.72)",
        boxShadow: active
          ? "0 10px 28px rgba(10, 43, 33, 0.06)"
          : "0 1px 0 rgba(10, 43, 33, 0.03)",
      }}
      tabIndex={0}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setActive(false);
        }
      }}
    >
      {/* Zone texte + rôle : le rôle pousse le contenu ; l’image absorbe (flex) */}
      <div className="relative z-10 flex min-h-0 flex-[0.95] flex-col px-4 pb-2.5 pt-4 md:px-5 md:pt-[1.05rem]">
        <div
          className="grid shrink-0 transition-[grid-template-rows,opacity,margin] motion-reduce:transition-none"
          style={{
            gridTemplateRows: active ? "1fr" : "0fr",
            opacity: active ? 1 : 0,
            marginBottom: active ? "0.55rem" : "0",
            transitionDuration: `${HOVER.ms}ms`,
            transitionTimingFunction: HOVER.ease,
          }}
          aria-hidden={!active}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              className="rounded-xl px-3 py-2 text-[0.74rem] leading-[1.4] [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none"
              style={{
                background: "color-mix(in srgb, #f7f3eb 88%, transparent)",
                border: "1px solid rgba(255, 255, 255, 0.62)",
                backdropFilter: "blur(14px) saturate(1.12)",
                WebkitBackdropFilter: "blur(14px) saturate(1.12)",
                color: SECTION.forest,
                boxShadow:
                  "0 8px 22px rgba(10, 43, 33, 0.08), inset 0 1px 0 rgba(255,255,255,0.65)",
              }}
            >
              <div className="mb-1 flex items-center gap-2">
                <Image
                  src={ROLE_BULLET}
                  alt=""
                  width={22}
                  height={19}
                  className="h-[1.05rem] w-[1.2rem] shrink-0 object-contain"
                  aria-hidden
                />
                <p
                  className="text-[0.58rem] font-bold uppercase tracking-[0.14em]"
                  style={{ fontFamily: TYPE.family, color: SECTION.terre }}
                >
                  Rôle dans Back2Mboa
                </p>
              </div>
              <p
                className="line-clamp-3"
                style={{ fontFamily: TYPE.family, color: "rgba(26, 31, 28, 0.9)" }}
              >
                {column.role}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-2 flex shrink-0 items-center gap-2.5">
          <span
            className="inline-flex h-6 min-w-6 items-center justify-center rounded-md px-1.5 text-[0.7rem] font-bold tabular-nums tracking-wide"
            style={{
              fontFamily: TYPE.family,
              color: active ? SECTION.forest : SECTION.green,
              background: active
                ? "rgba(17,157,99,0.14)"
                : "rgba(17,157,99,0.08)",
            }}
          >
            {n}
          </span>
          <span
            className="h-px flex-1"
            style={{ background: SECTION.line }}
            aria-hidden
          />
        </div>

        <h3
          className={cn(
            "mb-1.5 shrink-0 text-[clamp(0.92rem,1.35vw,1.12rem)] font-bold uppercase leading-[1.18] tracking-[-0.02em]",
            active ? "line-clamp-2 min-h-0" : "line-clamp-3 min-h-[3.55em]",
          )}
          style={{ fontFamily: TYPE.family, color: SECTION.forest }}
        >
          {column.title}
        </h3>

        <p
          className={cn(
            "mb-0 flex-1 text-[0.78rem] leading-[1.45] md:text-[0.8rem]",
            active ? "line-clamp-3 min-h-0" : "line-clamp-4 min-h-[5.8em]",
          )}
          style={{ fontFamily: TYPE.family, color: SECTION.muted }}
        >
          {column.body}
        </p>

        <Link
          href={column.href}
          className="group/link mt-auto inline-flex w-fit shrink-0 items-center gap-1.5 pt-2 text-[0.78rem] font-semibold transition-colors duration-200 hover:text-[#119d63]"
          style={{ fontFamily: TYPE.family, color: SECTION.forest }}
        >
          <span className="underline decoration-[rgba(10,43,33,0.35)] underline-offset-[3px] group-hover/link:decoration-[#119d63]">
            {column.linkLabel}
          </span>
          <span
            aria-hidden
            className="translate-x-0 transition-transform duration-200 group-hover/link:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </div>

      {/* Média : flex-1 min-h — se comprime au hover, jamais chevauché */}
      <div className="relative z-0 flex min-h-[7.5rem] flex-1 flex-col px-3 pb-3 md:min-h-[8.5rem] md:px-3.5 md:pb-3.5">
        <ColumnCarousel
          slides={column.slides}
          index={slideIndex}
          progress={progress}
          onGoTo={onGoTo}
          reduced={reduced}
        />
      </div>
    </article>
  );
}

export function EditionsPilotesSection() {
  const copy = EDITIONS_PILOTES_COPY;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(true);
  const { index, progress, goTo, reduced } = useSyncedSlideClock(!inView);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="editions-pilotes"
      className="relative isolate h-auto overflow-visible md:h-[100svh] md:max-h-[100svh] md:overflow-hidden"
      style={{
        background: SECTION.bg,
        color: SECTION.ink,
        fontFamily: TYPE.family,
      }}
      aria-labelledby="editions-pilotes-title"
    >
      <div className="mx-auto flex h-full w-full max-w-[min(100%,92rem)] flex-col px-[clamp(1.35rem,5.5vw,4.75rem)] py-[clamp(1rem,2.2vh,1.65rem)] md:py-[clamp(0.85rem,2vh,1.35rem)]">
        <header className="mb-[clamp(0.65rem,1.6vh,1rem)] shrink-0">
          <p
            className="mb-1.5 text-[0.65rem] font-bold uppercase tracking-[0.16em]"
            style={{ fontFamily: TYPE.mono, color: SECTION.green }}
          >
            {copy.kicker}
          </p>
          <h2
            id="editions-pilotes-title"
            className="mb-1 max-w-[22ch] text-[clamp(1.35rem,2.6vw,2rem)] font-bold leading-[1.12] tracking-[-0.035em]"
            style={{ fontFamily: TYPE.family, color: SECTION.forest }}
          >
            {copy.title}
          </h2>
          <p
            className="max-w-[54ch] text-[0.82rem] leading-snug md:text-[0.88rem]"
            style={{ fontFamily: TYPE.family, color: SECTION.muted }}
          >
            {copy.subtitle}{" "}
            <span className="text-[rgba(90,107,96,0.92)]">{copy.hoverHint}</span>
          </p>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-1 items-stretch gap-[clamp(0.9rem,1.8vw,1.25rem)] md:grid-cols-3">
          {EDITIONS_PILOTES_COLUMNS.map((column, i) => (
            <ColumnCard
              key={column.id}
              column={column}
              index={i}
              slideIndex={index}
              progress={progress}
              onGoTo={goTo}
              reduced={reduced}
            />
          ))}
        </div>

        <footer
          className="mt-[clamp(0.55rem,1.4vh,0.85rem)] grid shrink-0 grid-cols-1 gap-[clamp(0.9rem,1.8vw,1.25rem)] md:grid-cols-3"
          style={{ fontFamily: TYPE.family, color: SECTION.muted }}
        >
          <div className="flex min-w-0 items-center md:justify-center md:text-center">
            <p className="m-0 max-w-full text-[0.72rem] leading-snug md:text-[0.78rem]">
              {copy.foot2022}
            </p>
          </div>

          <div className="flex min-w-0 items-center md:justify-center md:text-center">
            <p className="m-0 max-w-full text-[0.72rem] leading-snug md:text-[0.78rem]">
              {copy.foot2023}
            </p>
          </div>

          <div className="flex min-w-0 items-center md:justify-center md:text-center">
            <p className="m-0 max-w-full text-[0.72rem] leading-snug md:text-[0.78rem]">
              {copy.footDate}
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
