"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { AGENDA_COPY } from "@/data/agenda";
import "./AgendaSection.css";

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

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

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
      setActive(i);
      setRunId((n) => n + 1);
    },
    [total],
  );

  const go = useCallback(
    (delta: number) => {
      goTo(activeRef.current + delta, delta > 0 ? 1 : -1);
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
          key={`atmos-${runId}`}
          src={event.image || "/images/agenda/events-ambient.webp"}
          alt=""
          fill
          sizes="100vw"
          className="agenda-atmos-img"
          priority={false}
        />
        <div className="agenda-atmos-veil" />
      </div>

      <div className="agenda-stage">
        <p className="agenda-kicker">{copy.kicker}</p>

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
            <span>{event.date}</span>
            <span>{event.location}</span>
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
            ←
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Événement suivant">
            →
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
