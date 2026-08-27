"use client";

import { useEffect, useRef, useState } from "react";
import {
  CONTRASTE_ACTORS,
  CONTRASTE_COPY,
  CONTRASTE_COSTS,
} from "@/data/contraste";
import "./ContrasteSection.css";

export function ContrasteSection() {
  const [activeActor, setActiveActor] = useState<string | null>(null);
  const [bumpId, setBumpId] = useState<string | null>(null);
  const [costOpen, setCostOpen] = useState(false);
  const costRef = useRef<HTMLDivElement>(null);
  const bumpTimer = useRef<number | null>(null);

  const activeCostId =
    CONTRASTE_ACTORS.find((actor) => actor.id === activeActor)?.costId ?? null;

  const bump = (id: string) => {
    if (bumpTimer.current) window.clearTimeout(bumpTimer.current);
    setBumpId(id);
    bumpTimer.current = window.setTimeout(() => setBumpId(null), 420);
  };

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
      id="contraste"
      className="contraste-section"
      aria-labelledby="contraste-title"
    >
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

        <div
          className="contraste-actors"
          role="list"
          onMouseLeave={() => setActiveActor(null)}
        >
          {CONTRASTE_ACTORS.map((actor) => {
            const on = activeActor === actor.id;
            const dimmed = activeActor !== null && !on;
            return (
              <article
                key={actor.id}
                role="listitem"
                className={`contraste-card contraste-actor${on ? " is-on" : ""}${dimmed ? " is-dim" : ""}${bumpId === actor.id ? " is-bump" : ""}`}
                tabIndex={0}
                onPointerEnter={() => setActiveActor(actor.id)}
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
                <p className="contraste-card-tags">{actor.sentiments.join(" · ")}</p>
              </article>
            );
          })}
        </div>

        <div
          ref={costRef}
          className={`contraste-cost-block${costOpen ? " is-open" : ""}`}
        >
          <h3 className="contraste-cost-title">{CONTRASTE_COPY.costTitle}</h3>

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
