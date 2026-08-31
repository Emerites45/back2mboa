"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  CONTRASTE_ACTORS,
  CONTRASTE_COPY,
  CONTRASTE_COSTS,
} from "@/data/contraste";
import "./ContrasteSection.css";

function setCardPointerVars(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  if (r.width <= 0 || r.height <= 0) return;
  const x = ((e.clientX - r.left) / r.width) * 100;
  const y = ((e.clientY - r.top) / r.height) * 100;
  el.style.setProperty("--ct-mx", `${x}%`);
  el.style.setProperty("--ct-my", `${y}%`);
}

export function ContrasteSection() {
  const rootRef = useRef<HTMLElement>(null);
  const costRef = useRef<HTMLDivElement>(null);
  const bumpTimer = useRef<number | null>(null);
  const [inView, setInView] = useState(false);
  const [activeActor, setActiveActor] = useState<string | null>(null);
  const [bumpId, setBumpId] = useState<string | null>(null);
  const [costOpen, setCostOpen] = useState(false);

  const activeCostId =
    CONTRASTE_ACTORS.find((actor) => actor.id === activeActor)?.costId ?? null;

  const bump = (id: string) => {
    if (bumpTimer.current) window.clearTimeout(bumpTimer.current);
    setBumpId(id);
    bumpTimer.current = window.setTimeout(() => setBumpId(null), 520);
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = costRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setCostOpen(true);
      },
      { threshold: 0.28 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      if (bumpTimer.current) window.clearTimeout(bumpTimer.current);
    },
    [],
  );

  return (
    <section
      ref={rootRef}
      id="contraste"
      className={`contraste-section${inView ? " is-inview" : ""}`}
      aria-labelledby="contraste-title"
    >
      <div className="contraste-ambient" aria-hidden="true" />
      <div className="contraste-waves" aria-hidden="true">
        <div className="contraste-wave-band contraste-wave-band--top">
          <svg viewBox="0 0 2400 160" preserveAspectRatio="none">
            <path
              fill="rgba(96, 168, 128, 0.16)"
              d="M0,80 C200,120 400,40 600,80 C800,120 1000,40 1200,80 C1400,120 1600,40 1800,80 C2000,120 2200,40 2400,80 L2400,160 L0,160 Z"
            />
          </svg>
          <svg viewBox="0 0 2400 160" preserveAspectRatio="none">
            <path
              fill="rgba(96, 168, 128, 0.16)"
              d="M0,80 C200,120 400,40 600,80 C800,120 1000,40 1200,80 C1400,120 1600,40 1800,80 C2000,120 2200,40 2400,80 L2400,160 L0,160 Z"
            />
          </svg>
        </div>
        <div className="contraste-wave-band contraste-wave-band--mid">
          <svg viewBox="0 0 2400 200" preserveAspectRatio="none">
            <path
              fill="rgba(255, 255, 255, 0.045)"
              d="M0,100 C250,150 450,50 700,100 C950,150 1150,50 1400,100 C1650,150 1850,50 2100,100 C2250,125 2325,115 2400,100 L2400,200 L0,200 Z"
            />
          </svg>
          <svg viewBox="0 0 2400 200" preserveAspectRatio="none">
            <path
              fill="rgba(255, 255, 255, 0.045)"
              d="M0,100 C250,150 450,50 700,100 C950,150 1150,50 1400,100 C1650,150 1850,50 2100,100 C2250,125 2325,115 2400,100 L2400,200 L0,200 Z"
            />
          </svg>
        </div>
        <div className="contraste-wave-band contraste-wave-band--low">
          <svg viewBox="0 0 2400 180" preserveAspectRatio="none">
            <path
              fill="rgba(72, 132, 102, 0.14)"
              d="M0,90 C180,40 420,140 600,90 C780,40 1020,140 1200,90 C1380,40 1620,140 1800,90 C1980,40 2220,140 2400,90 L2400,180 L0,180 Z"
            />
          </svg>
          <svg viewBox="0 0 2400 180" preserveAspectRatio="none">
            <path
              fill="rgba(72, 132, 102, 0.14)"
              d="M0,90 C180,40 420,140 600,90 C780,40 1020,140 1200,90 C1380,40 1620,140 1800,90 C1980,40 2220,140 2400,90 L2400,180 L0,180 Z"
            />
          </svg>
        </div>
        <div className="contraste-wave-band contraste-wave-band--bottom">
          <svg viewBox="0 0 2400 220" preserveAspectRatio="none">
            <path
              fill="rgba(12, 36, 28, 0.35)"
              d="M0,110 C220,60 440,160 660,110 C880,60 1100,160 1320,110 C1540,60 1760,160 1980,110 C2160,75 2280,95 2400,110 L2400,0 L0,0 Z"
            />
          </svg>
          <svg viewBox="0 0 2400 220" preserveAspectRatio="none">
            <path
              fill="rgba(12, 36, 28, 0.35)"
              d="M0,110 C220,60 440,160 660,110 C880,60 1100,160 1320,110 C1540,60 1760,160 1980,110 C2160,75 2280,95 2400,110 L2400,0 L0,0 Z"
            />
          </svg>
        </div>
        <div className="contraste-wave-lines">
          <svg viewBox="0 0 2400 80" preserveAspectRatio="none">
            <path
              fill="none"
              stroke="rgba(255, 255, 255, 0.06)"
              strokeWidth="1"
              d="M0,40 C200,10 400,70 600,40 C800,10 1000,70 1200,40 C1400,10 1600,70 1800,40 C2000,10 2200,70 2400,40"
            />
          </svg>
          <svg viewBox="0 0 2400 80" preserveAspectRatio="none">
            <path
              fill="none"
              stroke="rgba(255, 255, 255, 0.06)"
              strokeWidth="1"
              d="M0,40 C200,10 400,70 600,40 C800,10 1000,70 1200,40 C1400,10 1600,70 1800,40 C2000,10 2200,70 2400,40"
            />
          </svg>
        </div>
      </div>
      <div className="contraste-container">
        <header className="contraste-text">
          <p className="contraste-kicker">{CONTRASTE_COPY.kicker}</p>
          <h2 id="contraste-title" className="contraste-title">
            {CONTRASTE_COPY.titleLines.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </h2>
          <p className="contraste-lead">{CONTRASTE_COPY.description}</p>
        </header>

        <div className="contraste-frame contraste-frame--actors">
          <div className="contraste-frame-glass" aria-hidden="true" />
          <div className="contraste-frame-content">
            <div
              className="contraste-actors"
              role="list"
              onMouseLeave={() => setActiveActor(null)}
            >
              {CONTRASTE_ACTORS.map((actor, i) => {
                const on = activeActor === actor.id;
                const dimmed = activeActor !== null && !on;
                return (
                  <article
                    key={actor.id}
                    role="listitem"
                    className={`contraste-card contraste-actor${on ? " is-on" : ""}${dimmed ? " is-dim" : ""}${bumpId === actor.id ? " is-bump" : ""}`}
                    style={{ ["--ct-i" as string]: i }}
                    tabIndex={0}
                    onPointerEnter={() => setActiveActor(actor.id)}
                    onPointerMove={setCardPointerVars}
                    onPointerDown={() => {
                      setActiveActor(actor.id);
                      bump(actor.id);
                    }}
                    onFocus={() => {
                      setActiveActor(actor.id);
                      bump(actor.id);
                    }}
                    onBlur={() => setActiveActor(null)}
                    onClick={() => {
                      setActiveActor(actor.id);
                      bump(actor.id);
                      setCostOpen(true);
                      costRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                      });
                    }}
                    aria-pressed={on}
                  >
                    <h3 className="contraste-card-title">{actor.label}</h3>
                    <p className="contraste-card-quote">« {actor.quote} »</p>
                    <p className="contraste-card-tags">
                      {actor.sentiments.join(" · ")}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div
          ref={costRef}
          className={`contraste-cost-block${costOpen ? " is-open" : ""}`}
        >
          <h3 className="contraste-cost-title">{CONTRASTE_COPY.costTitle}</h3>

          <div className="contraste-frame contraste-frame--costs">
            <div className="contraste-frame-glass" aria-hidden="true" />
            <div className="contraste-frame-content">
              <div className="contraste-costs" role="list">
                {CONTRASTE_COSTS.map((cost, i) => {
                  const linked = activeCostId === cost.id;
                  return (
                    <article
                      key={cost.id}
                      role="listitem"
                      className={`contraste-card contraste-cost${linked ? " is-linked" : ""}${bumpId === cost.id ? " is-bump" : ""}`}
                      style={{ ["--ct-i" as string]: i }}
                      tabIndex={0}
                      onPointerMove={setCardPointerVars}
                      onPointerDown={() => bump(cost.id)}
                      onFocus={() => bump(cost.id)}
                      onClick={() => bump(cost.id)}
                    >
                      <h4 className="contraste-card-title">{cost.title}</h4>
                      <p className="contraste-cost-body">{cost.body}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          <p
            className={`contraste-closing${bumpId === "closing" ? " is-bump" : ""}`}
            tabIndex={0}
            onPointerDown={() => bump("closing")}
            onFocus={() => bump("closing")}
            onClick={() => bump("closing")}
          >
            {CONTRASTE_COPY.closing}
          </p>
        </div>
      </div>
    </section>
  );
}
