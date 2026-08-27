"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AGENDA_COPY } from "@/data/agenda";
import "./AgendaSection.css";

const AUTO_MS = 6500;

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d={dir === "prev" ? "M14.5 5.5 8 12l6.5 6.5" : "M9.5 5.5 16 12l-6.5 6.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
      />
    </svg>
  );
}

function AgendaBackdrop({ slide }: { slide: number }) {
  return (
    <svg
      className={`agenda-bg is-slide-${slide}`}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ag-disc-a" cx="42%" cy="38%" r="58%">
          <stop offset="0%" stopColor="#2a6a4c" />
          <stop offset="55%" stopColor="#164433" />
          <stop offset="100%" stopColor="#0c241c" />
        </radialGradient>
        <radialGradient id="ag-disc-b" cx="48%" cy="40%" r="58%">
          <stop offset="0%" stopColor="#1f5a40" />
          <stop offset="60%" stopColor="#123226" />
          <stop offset="100%" stopColor="#0a1c16" />
        </radialGradient>
      </defs>
      <g className="agenda-bg-layer is-a">
        <circle cx="1160" cy="250" r="390" fill="url(#ag-disc-a)" opacity="0.92" />
        <circle
          cx="1160"
          cy="250"
          r="288"
          fill="none"
          stroke="#d7eadc"
          strokeOpacity="0.14"
          strokeWidth="1.5"
        />
      </g>
      <g className="agenda-bg-layer is-b">
        <circle cx="940" cy="430" r="290" fill="url(#ag-disc-b)" opacity="0.88" />
        <circle
          cx="940"
          cy="430"
          r="198"
          fill="none"
          stroke="#d7eadc"
          strokeOpacity="0.1"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}

export function AgendaSection() {
  const { kicker, cta, events } = AGENDA_COPY;
  const total = events.length;
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [runId, setRunId] = useState(0);
  const [inView, setInView] = useState(true);
  const [reduce, setReduce] = useState(false);
  const event = events[active] ?? events[0];
  const autoplay = inView && !reduce;
  const activeRef = useRef(active);
  activeRef.current = active;

  const goTo = useCallback(
    (next: number, forcedDir?: 1 | -1) => {
      const i = ((next % total) + total) % total;
      const prev = activeRef.current;
      if (i === prev) return;

      if (forcedDir) {
        setDir(forcedDir);
      } else {
        const forward = (i - prev + total) % total;
        const backward = (prev - i + total) % total;
        setDir(forward <= backward ? 1 : -1);
      }
      setRunId((n) => n + 1);
      setActive(i);
    },
    [total],
  );

  const go = useCallback(
    (step: -1 | 1) => {
      goTo(activeRef.current + step, step);
    },
    [goTo],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      id="agenda"
      className={`agenda${autoplay ? " is-playing" : ""}${reduce ? " is-reduce" : ""}`}
      aria-labelledby="agenda-title"
      aria-roledescription="carousel"
    >
      <AgendaBackdrop slide={active} />

      <div className="agenda-stage">
        <p className="agenda-kicker">{kicker}</p>

        <div
          key={`${event.id}-${runId}`}
          className={`agenda-copy is-${dir > 0 ? "next" : "prev"}`}
        >
          <h2 id="agenda-title" className="agenda-title">
            {event.title}
          </h2>

          <p className="agenda-meta">
            <span>{event.date}</span>
            <span>{event.location}</span>
          </p>

          <p className="agenda-body">{event.body}</p>

          <Link href="/inscription" className="agenda-btn">
            {cta}
          </Link>
        </div>

        <div className="agenda-nav" role="group" aria-label="Événements">
          <button type="button" onClick={() => go(-1)} aria-label="Événement précédent">
            <Chevron dir="prev" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Événement suivant">
            <Chevron dir="next" />
          </button>
        </div>
      </div>

      <nav className="agenda-tabs" aria-label="Agenda 2026">
        {events.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.id}
              type="button"
              className={selected ? "is-active" : undefined}
              aria-pressed={selected}
              onClick={() => goTo(i)}
            >
              {selected && !reduce ? (
                <span
                  key={`${item.id}-${runId}`}
                  className="agenda-tab-fill"
                  style={{
                    animationDuration: `${AUTO_MS}ms`,
                    animationPlayState: autoplay ? "running" : "paused",
                  }}
                  onAnimationEnd={() => {
                    if (i === activeRef.current) go(1);
                  }}
                />
              ) : null}
              <span className="agenda-thumb" aria-hidden="true">
                {item.index}
              </span>
              <span className="agenda-tab-copy">
                <strong>{item.tabTitle}</strong>
                <span>{item.date}</span>
              </span>
            </button>
          );
        })}
      </nav>
    </section>
  );
}
