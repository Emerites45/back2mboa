"use client";

import { useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CHAMPION_COPY, CHAMPION_MAIRIES } from "@/data/mairies-championnes";
import { ChampionVisual } from "./ChampionVisual";
import "./MairiesChampionnesSection.css";

const SLIDE_MS = 6200;

export function MairiesChampionnesSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const mairie = CHAMPION_MAIRIES[index];

  const go = useCallback((next: number) => {
    const len = CHAMPION_MAIRIES.length;
    setIndex(((next % len) + len) % len);
  }, []);

  useEffect(() => {
    if (paused) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => go(index + 1), SLIDE_MS);
    return () => window.clearInterval(id);
  }, [index, paused, go]);

  return (
    <section
      id="mairies-championnes"
      className="champ"
      aria-labelledby="champ-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="champ-wrap">
        <header className="champ-head">
          <p className="champ-kicker">{CHAMPION_COPY.kicker}</p>
          <h2 id="champ-title" className="champ-title">
            {CHAMPION_COPY.title}
            <span className="champ-dot"> · </span>
            <em>{CHAMPION_COPY.titleAccent}</em>
          </h2>
          <p className="champ-sub">
            {CHAMPION_COPY.subtitle[0]}
            <br />
            {CHAMPION_COPY.subtitle[1]}
          </p>
        </header>

        <nav className="champ-pills" aria-label="Mairies championnes">
          {CHAMPION_MAIRIES.map((item, i) => {
            const on = i === index;
            return (
              <button
                key={item.id}
                type="button"
                className={`champ-pill${on ? " is-on" : ""}`}
                aria-pressed={on}
                onClick={() => go(i)}
              >
                <i style={{ background: item.dot }} />
                {item.nom}
              </button>
            );
          })}
        </nav>

        <article
          className="champ-stage"
          aria-live="polite"
          style={{ "--champ-photo": `url("${mairie.image}")` } as CSSProperties}
        >
          <div className="champ-left">
            <p className="champ-sector">
              <span className="champ-sector-mark" style={{ background: mairie.dot }} />
              {mairie.secteur}
            </p>
            <h3>{mairie.nom}</h3>
            <p className="champ-meta">
              {mairie.region} · {mairie.statut}
            </p>
            <p className="champ-lead">{mairie.lead}</p>
            <ul className="champ-stats">
              {mairie.stats.map((stat) => (
                <li key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
            <div className="champ-story">
              <strong>{mairie.storyTitle}</strong>
              <p>{mairie.storyBody}</p>
            </div>
            <div className="champ-ctas">
              <Link href="#digital-twin" className="champ-cta is-primary">
                {CHAMPION_COPY.ctaPrimary}
              </Link>
              <Link href="/inscription" className="champ-cta is-ghost">
                {CHAMPION_COPY.ctaSecondary}
              </Link>
            </div>
          </div>

          <ChampionVisual
            theme={mairie.theme}
            kicker={mairie.visualKicker}
            caption={mairie.visualCaption}
            image={mairie.image}
          />
        </article>

        <div className="champ-controls">
          <div className="champ-dots" role="tablist" aria-label="Progression">
            {CHAMPION_MAIRIES.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={i === index ? "is-on" : ""}
                aria-label={item.nom}
                aria-current={i === index ? "true" : undefined}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <p className="champ-hint">{CHAMPION_COPY.autoHint}</p>
          <div className="champ-arrows">
            <button
              type="button"
              aria-label="Mairie précédente"
              onClick={() => go(index - 1)}
            >
              <ChevronLeft size={20} strokeWidth={1.75} />
            </button>
            <button
              type="button"
              aria-label="Mairie suivante"
              onClick={() => go(index + 1)}
            >
              <ChevronRight size={20} strokeWidth={1.75} />
            </button>
          </div>
        </div>

        <ul className="champ-legend">
          {CHAMPION_COPY.legend.map((item) => (
            <li key={item.label} className={item.accent ? "is-accent" : ""}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
