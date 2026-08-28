"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { AGENDA_COPY } from "@/data/agenda";
import "./AgendaSection.css";

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

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
      <rect
        x="3.5"
        y="5"
        width="17"
        height="15"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3.5 9.5h17M8 3.5v3M16 3.5v3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
      <path
        d="M12 21s6.5-5.2 6.5-10.2A6.5 6.5 0 0 0 12 4.3a6.5 6.5 0 0 0-6.5 6.5C5.5 15.8 12 21 12 21z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="10.8" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function AgendaDiscs({ slide }: { slide: number }) {
  return (
    <svg
      className={`agenda-discs is-slide-${slide}`}
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
      <g className="agenda-disc-layer is-a">
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
      <g className="agenda-disc-layer is-b">
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
  const copy = AGENDA_COPY;
  const { events, autoplayMs } = copy;
  const total = events.length;
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [runId, setRunId] = useState(0);
  const [inView, setInView] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const event = events[active] ?? events[0];
  const autoplay = inView && !reduce && !paused;
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
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      id="agenda"
      className={`agenda is-slide-${active}${autoplay ? " is-playing" : ""}${reduce ? " is-reduce" : ""}`}
      aria-labelledby="agenda-title"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="agenda-atmos" aria-hidden="true">
        <Image
          src="/images/agenda/events-ambient.webp"
          alt=""
          fill
          sizes="100vw"
          className="agenda-atmos-img"
          priority={false}
        />
        <div className="agenda-atmos-veil" />
      </div>

      <AgendaDiscs slide={active} />

      <div className="agenda-sil" aria-hidden="true">
        <Image
          src="/images/agenda/cover-silhouette.webp"
          alt=""
          fill
          sizes="(max-width: 900px) 0px, 40vw"
          className="agenda-sil-img"
        />
      </div>

      <div className={`agenda-portrait is-slide-${active}`} aria-hidden="true">
        <Image
          key={`portrait-${runId}`}
          src="/images/agenda/cover-speaker.webp"
          alt=""
          width={812}
          height={1007}
          className={`agenda-portrait-img is-${dir > 0 ? "next" : "prev"}`}
          priority
        />
      </div>

      <div className="agenda-stage">
        <p className="agenda-kicker">{copy.kicker}</p>

        <div className="agenda-counter" aria-hidden="true">
          <span>
            {event.index} / 0{total}
          </span>
          <i />
        </div>

        <div
          key={`${event.id}-${runId}`}
          className={`agenda-copy is-${dir > 0 ? "next" : "prev"}`}
        >
          <span className="agenda-tag">{event.tag}</span>

          <h2 id="agenda-title" className="agenda-title">
            <span className="agenda-title-lead">{event.titleLead}</span>{" "}
            <span className="agenda-title-accent">{event.titleAccent}</span>
          </h2>

          <p className="agenda-meta">
            <span>
              <IconCalendar /> {event.date}
            </span>
            <span>
              <IconPin /> {event.location}
            </span>
          </p>

          <p className="agenda-body">{event.body}</p>

          <div className="agenda-actions">
            <Link href={copy.ctaPrimaryHref} className="agenda-btn is-primary">
              {copy.ctaPrimary}
            </Link>
            <Link href={copy.ctaSecondaryHref} className="agenda-btn is-ghost">
              {copy.ctaSecondary}
            </Link>
          </div>
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
              style={{ "--ag-tab-accent": item.accent } as CSSProperties}
            >
              {selected && !reduce ? (
                <span
                  key={`${item.id}-${runId}`}
                  className="agenda-tab-fill"
                  style={{
                    animationDuration: `${autoplayMs}ms`,
                    animationPlayState: autoplay ? "running" : "paused",
                  }}
                  onAnimationEnd={() => {
                    if (i === activeRef.current) go(1);
                  }}
                />
              ) : null}
              <span className="agenda-thumb" aria-hidden="true">
                <i style={{ background: item.accent }} />
              </span>
              <span className="agenda-tab-copy">
                <em>{item.index}</em>
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
