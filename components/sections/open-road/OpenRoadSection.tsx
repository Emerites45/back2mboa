"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { OPEN_ROAD_COPY } from "@/data/open-road";
import "./OpenRoadSection.css";

export function OpenRoadSection() {
  const { programs, autoplayMs, brand, watchLabel, viewAll } = OPEN_ROAD_COPY;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const active = programs[index] ?? programs[0];

  const go = useCallback(
    (next: number) => {
      const len = programs.length;
      setIndex(((next % len) + len) % len);
    },
    [programs.length],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => go(index + 1), autoplayMs);
    return () => window.clearInterval(id);
  }, [index, paused, reduceMotion, autoplayMs, go]);

  return (
    <section
      id="open-road"
      className={`open-road${paused ? " is-paused" : ""}`}
      aria-labelledby="open-road-title"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="open-road-stage">
        {programs.map((program, i) => {
          const on = i === index;
          return (
            <div
              key={program.id}
              className={`open-road-slide${on ? " is-active" : ""}${program.kenBurns === "zoom-stars" ? " is-stars" : ""}`}
              aria-hidden={!on}
            >
              <div
                key={`${program.id}-${on ? "on" : "off"}-${index === i ? index : "idle"}`}
                className={`open-road-ken is-${program.kenBurns}${on && !reduceMotion ? " is-running" : ""}`}
              >
                <Image
                  className={`open-road-photo${program.kenBurns === "zoom-stars" ? " is-stars-photo" : ""}`}
                  src={program.image}
                  alt={on ? program.alt : ""}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  style={{ objectPosition: program.objectPosition }}
                />
              </div>
              {program.kenBurns === "zoom-stars" ? (
                <span className="open-road-stars-veil" aria-hidden="true" />
              ) : null}
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
            <h2 id="open-road-title" key={active.id} className="open-road-title">
              {active.title}
            </h2>
            <div className="open-road-actions">
              <button type="button" className="open-road-watch">
                <span className="open-road-play" aria-hidden="true" />
                <span>{watchLabel}</span>
              </button>
              <button type="button" className="open-road-viewall">
                {viewAll}
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
                  {selected && !reduceMotion ? (
                    <span
                      className="open-road-progress"
                      style={{ animationDuration: `${autoplayMs}ms` }}
                      key={`progress-${program.id}-${index}`}
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
