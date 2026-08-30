"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BDA_COPY } from "@/data/before-during-after";
import type { BdaPhaseId } from "@/types/before-during-after";
import "./BeforeDuringAfterSection.css";

export function BeforeDuringAfterSection() {
  const { eyebrow, title, titleAccent, subtitle, foot, phases, autoplayMs } =
    BDA_COPY;
  const rootRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [runId, setRunId] = useState(0);

  const playing = inView && !paused && !reduce;
  const activePhase = phases[active];

  const go = useCallback(
    (i: number) => {
      setActive(((i % phases.length) + phases.length) % phases.length);
      setRunId((current) => current + 1);
    },
    [phases.length],
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
      { threshold: 0.28 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Boucle circulaire infinie — 4 s par carte, visible dans le viewport */
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => go(active + 1), autoplayMs);
    return () => window.clearInterval(id);
  }, [active, playing, autoplayMs, go]);

  const sectionClass = [
    "b2m-bda",
    playing ? "is-playing" : "",
    hovered ? "is-hovered" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      ref={rootRef}
      className={sectionClass}
      id="before-during-after"
      aria-labelledby="bda-title"
      aria-roledescription="carousel"
    >
      <div className="bda-inner">
        <header className="bda-head">
          <p className="bda-eyebrow">{eyebrow}</p>
          <h2 id="bda-title" className="bda-title">
            {title}
            {titleAccent ? (
              <>
                {" "}
                <em>{titleAccent}</em>
              </>
            ) : null}
          </h2>
          <p className="bda-sub">{subtitle}</p>
        </header>

        <p className="bda-live" aria-live="polite" aria-atomic="true">
          {activePhase.phase} — {activePhase.title}
        </p>

        <div
          className="bda-grid"
          role="list"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            setPaused(false);
          }}
        >
          {phases.map((phase, i) => {
            const isActive = i === active;

            return (
              <div
                key={phase.id}
                className={`bda-item${isActive ? " is-active" : ""}${isActive && playing ? " is-timing" : ""}`}
                role="listitem"
                onMouseEnter={() => setPaused(true)}
              >
                <article
                  className="bda-card"
                  tabIndex={0}
                  aria-label={phase.aria}
                  aria-current={isActive ? "step" : undefined}
                  data-phase={phase.id as BdaPhaseId}
                  onClick={() => go(i)}
                  onFocus={() => setPaused(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                      setPaused(false);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      go(i);
                    }
                    if (e.key === "ArrowRight") {
                      e.preventDefault();
                      go(i + 1);
                    }
                    if (e.key === "ArrowLeft") {
                      e.preventDefault();
                      go(i - 1);
                    }
                  }}
                >
                  <Image
                    className="bda-card-img"
                    src={phase.image}
                    alt={phase.imageAlt}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    quality={85}
                    style={{
                      objectPosition:
                        phase.id === "before"
                          ? "center 40%"
                          : phase.id === "during"
                            ? "center 30%"
                            : "center 45%",
                    }}
                  />

                  <div className="bda-veil" aria-hidden="true" />

                  <div className="bda-rest" aria-hidden="true">
                    <span className="bda-rest-phase">{phase.phase}</span>
                    <span className="bda-rest-title">{phase.title}</span>
                  </div>

                  <div
                    className="bda-overlay"
                    id={`bda-overlay-${phase.id}`}
                    aria-hidden="true"
                  >
                    <div className="bda-overlay-inner">
                      <p className="bda-overlay-kicker">
                        {phase.phase}
                        <span className="bda-overlay-date">{phase.date}</span>
                      </p>
                      <h3 className="bda-overlay-title">{phase.title}</h3>
                      <ul className="bda-rows">
                        {phase.items.map((item, itemIndex) => (
                          <li
                            className="bda-row"
                            key={item}
                            style={{ ["--bi" as string]: itemIndex }}
                          >
                            <span className="bda-row-mark" aria-hidden="true" />
                            <span className="bda-row-label">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="bda-overlay-tool">{phase.tool}</p>
                    </div>
                  </div>

                  <div className="bda-foot-strip" aria-hidden="true">
                    {phase.tool.replace(/^Outil\s*:\s*/i, "")}
                  </div>
                </article>

                <div className="bda-caption">
                  <div className="bda-caption-meta">
                    <span className="bda-indicator" aria-hidden="true">
                      {isActive && playing ? (
                        <span
                          className="bda-progress"
                          style={{ animationDuration: `${autoplayMs}ms` }}
                          key={`bda-progress-${phase.id}-${active}-${runId}`}
                        />
                      ) : null}
                      <span className="bda-dot" />
                    </span>
                    <span className="bda-date">{phase.date}</span>
                  </div>
                  <p className="bda-caption-title">{phase.caption}</p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="bda-foot">{foot}</p>
      </div>
    </section>
  );
}
