"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BDA_COPY } from "@/data/before-during-after";
import type { BdaPhaseId } from "@/types/before-during-after";
import "./BeforeDuringAfterSection.css";

export function BeforeDuringAfterSection() {
  const { eyebrow, title, subtitle, foot, phases, autoplayMs } = BDA_COPY;
  const rootRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduce, setReduce] = useState(false);

  const go = useCallback(
    (i: number) => {
      setActive(((i % phases.length) + phases.length) % phases.length);
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
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Itération automatique des phases tant que visible et non pausée */
  useEffect(() => {
    if (!inView || paused || reduce) return;
    const id = window.setInterval(() => go(active + 1), autoplayMs);
    return () => window.clearInterval(id);
  }, [active, inView, paused, reduce, autoplayMs, go]);

  return (
    <section
      ref={rootRef}
      className="b2m-bda"
      id="before-during-after"
      aria-labelledby="bda-title"
    >
      <div className="bda-inner">
        <header className="bda-head">
          <p className="bda-eyebrow">{eyebrow}</p>
          <h2 id="bda-title" className="bda-title">
            {title}
          </h2>
          <p className="bda-sub">{subtitle}</p>
        </header>

        <div className="bda-grid" role="list">
          {phases.map((phase, i) => {
            const isActive = i === active;
            return (
              <div
                key={phase.id}
                className={`bda-item${isActive ? " is-active" : ""}`}
                role="listitem"
                onMouseEnter={() => {
                  setPaused(true);
                  go(i);
                }}
                onMouseLeave={() => setPaused(false)}
                onFocusCapture={() => {
                  setPaused(true);
                  go(i);
                }}
                onBlurCapture={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                    setPaused(false);
                  }
                }}
              >
                <article
                  className="bda-card"
                  tabIndex={0}
                  aria-label={phase.aria}
                  aria-current={isActive ? "step" : undefined}
                  data-phase={phase.id as BdaPhaseId}
                  onClick={() => go(i)}
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

                  <div className="bda-overlay">
                    <h3 className="bda-overlay-title">{phase.title}</h3>
                    <ul className="bda-overlay-list">
                      {phase.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bda-tool">{phase.tool}</div>
                  <div className="bda-shade" aria-hidden="true" />
                </article>

                <div className="bda-caption">
                  <div className="bda-caption-meta">
                    <span className="bda-indicator" aria-hidden="true">
                      <span className="bda-dot" />
                      <span className="bda-bar" />
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
