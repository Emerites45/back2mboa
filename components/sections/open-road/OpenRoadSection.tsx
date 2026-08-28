"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { OPEN_ROAD_COPY } from "@/data/open-road";
import "./OpenRoadSection.css";

export function OpenRoadSection() {
  const { programs, autoplayMs, brand, watchLabel } = OPEN_ROAD_COPY;
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

  /* Démarre dès que la section entre dans le viewport — sans clic */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting);
        setInView(visible);

        if (visible && !wasInView.current) {
          /* Arrivée : slide 01 (Pexels) + Ken Burns relancés */
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
      id="open-road"
      className={`open-road${playing ? " is-playing" : ""}`}
      aria-labelledby="open-road-title"
      aria-roledescription="carousel"
    >
      <div className="open-road-stage">
        {programs.map((program, i) => {
          const on = i === index;
          return (
            <div
              key={program.id}
              className={`open-road-slide${on ? " is-active" : ""}`}
              aria-hidden={!on}
            >
              <div
                key={`${program.id}-ken-${runId}-${on ? index : "idle"}`}
                className={`open-road-ken is-${program.kenBurns}${on && playing ? " is-running" : ""}`}
              >
                <Image
                  className="open-road-photo"
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

      <div className="open-road-ui">
        <p className="open-road-brand" aria-label={brand}>
          BACK <span>2</span> MBOA
        </p>

        <div className="open-road-footer">
          <div className="open-road-main">
            <h2 id="open-road-title" key={`${active.id}-${runId}`} className="open-road-title">
              {active.title}
            </h2>
            <div className="open-road-actions">
              <button type="button" className="open-road-watch">
                <span className="open-road-play" aria-hidden="true" />
                <span>{watchLabel}</span>
                <span className="open-road-duration">{active.duration}</span>
              </button>
            </div>
          </div>

          <nav className="open-road-bar" aria-label="Diaporama programmes">
            {programs.map((program, i) => {
              const selected = i === index;
              return (
                <button
                  key={program.id}
                  type="button"
                  className={`open-road-item${selected ? " is-active" : ""}`}
                  aria-pressed={selected}
                  aria-label={`${program.index} ${program.title}`}
                  onClick={() => go(i)}
                >
                  {selected && playing ? (
                    <span
                      className="open-road-progress"
                      style={{ animationDuration: `${autoplayMs}ms` }}
                      key={`progress-${program.id}-${index}-${runId}`}
                    />
                  ) : null}
                  <span className="open-road-index">{program.index}</span>
                  <span className="open-road-item-copy">
                    <span className="open-road-item-title">{program.title}</span>
                    <span className="open-road-item-schedule">{program.schedule}</span>
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
