"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HOMECOMING_COPY } from "@/data/homecoming";
import "./HomecomingSection.css";

export function HomecomingSection() {
  const { programs, autoplayMs, brand, watchLabel } = HOMECOMING_COPY;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [runId, setRunId] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const wasInView = useRef(false);

  const active = programs[index] ?? programs[0];
  const len = programs.length;
  const playing = inView && !reduceMotion;

  const go = useCallback(
    (next: number) => {
      setIndex(((next % len) + len) % len);
    },
    [len],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting);
        setInView(visible);

        if (visible && !wasInView.current) {
          setIndex(0);
          setRunId((n) => n + 1);
        }
        wasInView.current = visible;
      },
      { threshold: 0.35, rootMargin: "0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => go(index + 1), autoplayMs);
    return () => window.clearInterval(id);
  }, [index, playing, autoplayMs, go]);

  return (
    <section
      ref={sectionRef}
      id="homecoming"
      className={`homecoming${playing ? " is-playing" : ""}`}
      aria-labelledby="homecoming-title"
      aria-roledescription="carousel"
    >
      <div className="homecoming-stage">
        {programs.map((program, i) => {
          const on = i === index;
          return (
            <div
              key={program.id}
              className={`homecoming-slide${on ? " is-active" : ""}`}
              aria-hidden={!on}
            >
              <div
                key={`${program.id}-ken-${runId}-${on ? index : "idle"}`}
                className={`homecoming-ken is-${program.kenBurns}${on && playing ? " is-running" : ""}`}
              >
                <Image
                  className="homecoming-photo"
                  src={program.image}
                  alt={on ? program.alt : ""}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  quality={88}
                  style={{ objectPosition: program.objectPosition }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="homecoming-ui">
        <p className="homecoming-brand" aria-label={brand}>
          BACK <span>2</span> MBOA
        </p>

        <div className="homecoming-footer">
          <div className="homecoming-main">
            <h2
              id="homecoming-title"
              key={`${active.id}-${runId}`}
              className="homecoming-title"
            >
              {active.title}
            </h2>
            <div className="homecoming-actions">
              <button type="button" className="homecoming-watch">
                <span className="homecoming-play" aria-hidden="true" />
                <span>{watchLabel}</span>
                <span className="homecoming-duration">{active.duration}</span>
              </button>
            </div>
          </div>

          <nav className="homecoming-bar" aria-label="Diaporama homecoming">
            {programs.map((program, i) => {
              const selected = i === index;
              return (
                <button
                  key={program.id}
                  type="button"
                  className={`homecoming-item${selected ? " is-active" : ""}`}
                  aria-pressed={selected}
                  aria-label={`${program.index} ${program.title}`}
                  onClick={() => go(i)}
                >
                  {selected && playing ? (
                    <span
                      className="homecoming-progress"
                      style={{ animationDuration: `${autoplayMs}ms` }}
                      key={`progress-${program.id}-${index}-${runId}`}
                    />
                  ) : null}
                  <span className="homecoming-index">{program.index}</span>
                  <span className="homecoming-item-copy">
                    <span className="homecoming-item-title">{program.title}</span>
                    <span className="homecoming-item-schedule">{program.schedule}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}
