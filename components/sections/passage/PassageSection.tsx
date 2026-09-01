"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PASSAGE_COPY } from "@/data/passage";
import "./PassageSection.css";

export function PassageSection() {
  const { programs, autoplayMs, watchLabel } = PASSAGE_COPY;
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
      id="passage"
      className={`passage${playing ? " is-playing" : ""}`}
      aria-labelledby="passage-title"
      aria-roledescription="carousel"
    >
      <div className="passage-stage">
        {programs.map((program, i) => {
          const on = i === index;
          return (
            <div
              key={program.id}
              className={`passage-slide${on ? " is-active" : ""}`}
              aria-hidden={!on}
            >
              <div
                key={`${program.id}-ken-${runId}-${on ? index : "idle"}`}
                className={`passage-ken is-${program.kenBurns}${on && playing ? " is-running" : ""}`}
              >
                <Image
                  className="passage-photo"
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

      <div className="passage-ui">
        <button
          type="button"
          className="passage-next"
          onClick={() => go(index + 1)}
          aria-label="Programme suivant"
        >
          <ArrowUpRight size={20} strokeWidth={2.4} aria-hidden="true" />
        </button>

        <div className="passage-footer">
          <div className="passage-main">
            <h2
              id="passage-title"
              key={`${active.id}-${runId}`}
              className="passage-title"
            >
              {active.title}
            </h2>
            <div className="passage-actions">
              <button type="button" className="passage-watch">
                <span className="passage-play" aria-hidden="true" />
                <span>{watchLabel}</span>
                <span className="passage-duration">{active.duration}</span>
              </button>
            </div>
          </div>

          <nav className="passage-bar" aria-label="Diaporama passage">
            {programs.map((program, i) => {
              const selected = i === index;
              return (
                <button
                  key={program.id}
                  type="button"
                  className={`passage-item${selected ? " is-active" : ""}`}
                  aria-pressed={selected}
                  aria-label={`${program.index} ${program.title}`}
                  onClick={() => go(i)}
                >
                  {selected && playing ? (
                    <span
                      className="passage-progress"
                      style={{ animationDuration: `${autoplayMs}ms` }}
                      key={`progress-${program.id}-${index}-${runId}`}
                    />
                  ) : null}
                  <span className="passage-index">{program.index}</span>
                  <span className="passage-item-copy">
                    <span className="passage-item-title">{program.title}</span>
                    <span className="passage-item-schedule">{program.schedule}</span>
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
