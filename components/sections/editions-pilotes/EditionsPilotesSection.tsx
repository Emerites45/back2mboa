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
  kicker: "var(--font-inter)",
  title: "var(--font-bricolage)",
  body: "var(--font-inter)",
} as const;

const SECTION = {
  bg: "#f7f3eb",
  forest: "#0a2b21",
  green: "#119d63",
  muted: "#5a6b60",
  ink: "#1a1f1c",
  yellow: "#ffd506",
  line: "rgba(10, 43, 33, 0.1)",
  wash: "rgba(17, 157, 99, 0.045)",
} as const;

const HOVER = {
  ms: 320,
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

/** Autoplay rapide + crossfade snappy (boucle continue). */
const SLIDE_MS = 2400;
const TRANSITION_MS = 420;
const EASE_CROSS = "cubic-bezier(0.4, 0, 0.2, 1)";

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

function ColumnCarousel({
  slides,
  paused,
  startDelayMs = 0,
}: {
  slides: EditionSlide[];
  paused: boolean;
  startDelayMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(startDelayMs === 0);
  const reduced = usePrefersReducedMotion();
  const multi = slides.length > 1;
  const rafRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const progressRef = useRef(0);
  const indexRef = useRef(0);
  const pausedRef = useRef(paused);
  const active = slides[index] ?? slides[0];
  const total = slides.length;

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const goTo = useCallback(
    (next: number) => {
      const target = ((next % total) + total) % total;
      if (target === indexRef.current) return;
      indexRef.current = target;
      setIndex(target);
      setProgress(0);
      progressRef.current = 0;
      startRef.current = performance.now();
    },
    [total],
  );

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), Math.max(0, startDelayMs));
    return () => window.clearTimeout(t);
  }, [startDelayMs]);

  /* Boucle RAF continue — ne redémarre pas à chaque changement de slide. */
  useEffect(() => {
    if (!multi || !ready || reduced) return;

    startRef.current = performance.now() - progressRef.current * SLIDE_MS;

    const tick = (now: number) => {
      if (!pausedRef.current) {
        const elapsed = now - startRef.current;
        const p = Math.min(1, elapsed / SLIDE_MS);
        progressRef.current = p;
        setProgress(p);
        if (p >= 1) {
          const next = (indexRef.current + 1) % total;
          indexRef.current = next;
          setIndex(next);
          setProgress(0);
          progressRef.current = 0;
          startRef.current = now;
        }
      } else {
        /* Pause : fige le temps restant */
        startRef.current = now - progressRef.current * SLIDE_MS;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [multi, ready, reduced, total]);

  return (
    <div
      className="relative h-full min-h-0 w-full overflow-hidden rounded-t-[0.65rem] bg-[#ddd7cd]"
      role="region"
      aria-roledescription="carousel"
      aria-label={`Galerie ${active?.caption ?? ""}`}
    >
      {slides.map((slide, i) => {
        const on = i === index;
        return (
          <div
            key={slide.src}
            className="absolute inset-0"
            style={{
              zIndex: on ? 2 : 1,
              opacity: on ? 1 : 0,
              transform: reduced ? "none" : on ? "scale(1)" : "scale(1.02)",
              transition: reduced
                ? "opacity 180ms ease"
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
        <p className="mb-2.5 text-[0.68rem] font-medium tracking-[0.02em] text-white/95">
          Photo {index + 1}/{total} — {active?.caption}
        </p>

        {multi ? (
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Slides">
            {slides.map((slide, i) => {
              const on = i === index;
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
                  onClick={() => goTo(i)}
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
}: {
  column: EditionColumn;
  index: number;
}) {
  const [active, setActive] = useState(false);
  const n = String(index + 1).padStart(2, "0");

  return (
    <article
      className={cn(
        "group/col relative flex min-h-0 flex-col outline-none transition-[background-color,box-shadow] motion-reduce:transition-none",
        "border-t md:border-t-0 md:border-r md:last:border-r-0",
      )}
      style={{
        borderColor: SECTION.line,
        transitionDuration: `${HOVER.ms}ms`,
        transitionTimingFunction: HOVER.ease,
        background: active ? SECTION.wash : "transparent",
        boxShadow: active ? `inset 0 2px 0 ${SECTION.green}` : "none",
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
      <div className="flex shrink-0 flex-col px-4 pb-2.5 pt-4 md:px-5 md:pt-[1.05rem]">
        {/* Rôle en flux : s’ouvre au-dessus, pousse le texte (pas d’overlay) */}
        <div
          className="grid transition-[grid-template-rows,opacity,margin] motion-reduce:transition-none"
          style={{
            gridTemplateRows: active ? "1fr" : "0fr",
            opacity: active ? 1 : 0,
            marginBottom: active ? "0.65rem" : "0",
            transitionDuration: `${HOVER.ms}ms`,
            transitionTimingFunction: HOVER.ease,
          }}
          aria-hidden={!active}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              className="rounded-xl px-3 py-2.5 text-[0.76rem] leading-[1.45]"
              style={{
                background: "rgba(17, 157, 99, 0.08)",
                border: "1px solid rgba(17, 157, 99, 0.18)",
                color: SECTION.forest,
              }}
            >
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: SECTION.green }}
                  aria-hidden
                />
                <p
                  className="text-[0.6rem] font-bold uppercase tracking-[0.14em]"
                  style={{ color: SECTION.green }}
                >
                  Rôle dans Back2Mboa
                </p>
              </div>
              <p style={{ color: "rgba(26, 31, 28, 0.9)" }}>{column.role}</p>
            </div>
          </div>
        </div>

        <div className="mb-2 flex items-center gap-2.5">
          <span
            className="inline-flex h-6 min-w-6 items-center justify-center rounded-md px-1.5 text-[0.7rem] font-bold tabular-nums tracking-wide"
            style={{
              fontFamily: TYPE.title,
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
          className="mb-1.5 text-[clamp(0.92rem,1.35vw,1.12rem)] font-extrabold uppercase leading-[1.18] tracking-[-0.02em]"
          style={{ fontFamily: TYPE.title, color: SECTION.forest }}
        >
          {column.title}
        </h3>

        <p
          className="mb-2 line-clamp-4 text-[0.78rem] leading-[1.45] md:line-clamp-5 md:text-[0.8rem]"
          style={{ fontFamily: TYPE.body, color: SECTION.muted }}
        >
          {column.body}
        </p>

        <Link
          href={column.href}
          className="group/link inline-flex w-fit items-center gap-1.5 text-[0.78rem] font-semibold transition-colors duration-200 hover:text-[#119d63]"
          style={{ color: SECTION.forest }}
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

      <div className="min-h-0 flex-1 px-3 pb-0 md:px-3.5">
        <ColumnCarousel
          slides={column.slides}
          paused={false}
          startDelayMs={index * 450}
        />
      </div>
    </article>
  );
}

export function EditionsPilotesSection() {
  const copy = EDITIONS_PILOTES_COPY;

  return (
    <section
      id="editions-pilotes"
      className="relative isolate h-auto overflow-visible md:h-[100svh] md:max-h-[100svh] md:overflow-hidden"
      style={{ background: SECTION.bg, color: SECTION.ink }}
      aria-labelledby="editions-pilotes-title"
    >
      <div className="mx-auto flex h-full w-full max-w-[1180px] flex-col px-[clamp(1rem,2.8vw,2rem)] py-[clamp(1rem,2.2vh,1.65rem)] md:py-[clamp(0.85rem,2vh,1.35rem)]">
        <header className="mb-[clamp(0.65rem,1.6vh,1rem)] shrink-0">
          <p
            className="mb-1.5 text-[0.65rem] font-bold uppercase tracking-[0.16em]"
            style={{ fontFamily: TYPE.kicker, color: SECTION.green }}
          >
            {copy.kicker}
          </p>
          <h2
            id="editions-pilotes-title"
            className="mb-1 max-w-[22ch] text-[clamp(1.35rem,2.6vw,2rem)] font-extrabold leading-[1.12] tracking-[-0.035em]"
            style={{ fontFamily: TYPE.title, color: SECTION.forest }}
          >
            {copy.title}
          </h2>
          <p
            className="max-w-[54ch] text-[0.82rem] leading-snug md:text-[0.88rem]"
            style={{ color: SECTION.muted }}
          >
            {copy.subtitle}{" "}
            <span className="text-[rgba(90,107,96,0.92)]">{copy.hoverHint}</span>
          </p>
        </header>

        <div
          className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden rounded-2xl border bg-white/35 md:grid-cols-3"
          style={{ borderColor: SECTION.line }}
        >
          {EDITIONS_PILOTES_COLUMNS.map((column, i) => (
            <ColumnCard key={column.id} column={column} index={i} />
          ))}
        </div>

        <footer
          className="mt-[clamp(0.55rem,1.4vh,0.85rem)] flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2 text-[0.72rem] md:text-[0.78rem]"
          style={{ color: SECTION.muted }}
        >
          <span
            className="inline-flex items-center rounded-full px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.08em]"
            style={{
              background: "rgba(17,157,99,0.12)",
              color: SECTION.green,
            }}
          >
            {copy.badge}
          </span>
          <span className="hidden h-3 w-px bg-[rgba(10,43,33,0.12)] sm:block" aria-hidden />
          <span>{copy.foot2022}</span>
          <span className="hidden h-3 w-px bg-[rgba(10,43,33,0.12)] md:block" aria-hidden />
          <span>{copy.foot2023}</span>
          <span className="hidden h-3 w-px bg-[rgba(10,43,33,0.12)] lg:block" aria-hidden />
          <span className="lg:ml-auto">{copy.footDate}</span>
        </footer>
      </div>
    </section>
  );
}
