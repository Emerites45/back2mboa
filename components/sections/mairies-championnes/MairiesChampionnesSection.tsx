"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CHAMPION_COPY, CHAMPION_MAIRIES } from "@/data/mairies-championnes";
import { ChampionStageBackdrop } from "./ChampionStageBackdrop";
import { ChampionVisual } from "./ChampionVisual";
import "./MairiesChampionnesSection.css";

export function MairiesChampionnesSection() {
  const { autoplayMs } = CHAMPION_COPY;
  const sectionRef = useRef<HTMLElement | null>(null);
  const wasInView = useRef(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [runId, setRunId] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const mairie = CHAMPION_MAIRIES[index];
  const len = CHAMPION_MAIRIES.length;
  const playing = inView && !paused && !reduceMotion;

  const go = useCallback(
    (next: number) => {
      setIndex(((next % len) + len) % len);
      setRunId((current) => current + 1);
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
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting);
        setInView(visible);

        if (visible && !wasInView.current) {
          setIndex(0);
          setRunId((current) => current + 1);
        }
        wasInView.current = visible;
      },
      { threshold: 0.18, rootMargin: "35% 0px 10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* Warm the first videos before the user reaches the stage. */
  useEffect(() => {
    const urls = CHAMPION_MAIRIES.map((item) => item.video).filter(
      (url): url is string => Boolean(url),
    );
    const links: HTMLLinkElement[] = [];

    urls.slice(0, 3).forEach((href) => {
      const existing = document.querySelector(
        `link[rel="preload"][as="video"][href="${href}"]`,
      );
      if (existing) return;
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = href;
      link.type = "video/mp4";
      document.head.appendChild(link);
      links.push(link);
    });

    return () => {
      links.forEach((link) => link.remove());
    };
  }, []);

  useEffect(() => {
    if (!playing) return;

    const id = window.setInterval(() => {
      go(index + 1);
    }, autoplayMs);

    return () => window.clearInterval(id);
  }, [index, playing, autoplayMs, go]);

  const nextMairie = CHAMPION_MAIRIES[(index + 1) % len];

  return (
    <section
      ref={sectionRef}
      id="mairies-championnes"
      className={`champ${playing ? " is-playing" : ""}`}
      aria-labelledby="champ-title"
      aria-roledescription="carousel"
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

        <nav className="champ-pills-frame" aria-label="Mairies championnes">
          <div className="champ-pills-track" role="tablist">
            {CHAMPION_MAIRIES.map((item, i) => {
              const on = i === index;
              const pillName = item.nomPill ?? item.nom;
              const pillRegion = item.regionPill ?? item.region;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`champ-tab-${item.id}`}
                  aria-controls="champ-panel"
                  aria-selected={on}
                  className={`champ-pill${on ? " is-on" : ""}`}
                  onClick={() => go(i)}
                >
                  <span
                    className="champ-pill-dot"
                    style={{ background: item.dot }}
                    aria-hidden="true"
                  />
                  <span className="champ-pill-label">
                    <span className="champ-pill-name">{pillName}</span>
                    <span className="champ-pill-region">{pillRegion}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        <article
          id="champ-panel"
          className="champ-stage"
          role="tabpanel"
          aria-labelledby={`champ-tab-${mairie.id}`}
          aria-live="polite"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ChampionStageBackdrop
            key={mairie.id}
            image={mairie.image}
            video={mairie.video}
            active
            eager={index === 0}
          />
          {nextMairie.video && nextMairie.id !== mairie.id ? (
            <video
              key={`prefetch-${nextMairie.id}`}
              src={nextMairie.video}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              tabIndex={-1}
              className="champ-video-prefetch"
            />
          ) : null}
          <div className="champ-stage-scrim" aria-hidden="true" />

          <div className="champ-stage-body">
            <div className="champ-left" key={`${mairie.id}-${runId}`}>
              <p className="champ-sector">
                <span
                  className="champ-sector-mark"
                  style={{ background: mairie.dot }}
                />
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
              key={`${mairie.id}-${mairie.visualImage ?? mairie.image}-${runId}`}
              theme={mairie.theme}
              kicker={mairie.visualKicker}
              caption={mairie.visualCaption}
              image={mairie.visualImage ?? mairie.image}
              photoCard={Boolean(mairie.visualImage)}
              objectPosition={mairie.visualPosition}
              objectFit={mairie.visualFit}
            />
          </div>
        </article>

        <div className="champ-controls">
          <div className="champ-dots" role="tablist" aria-label="Progression">
            {CHAMPION_MAIRIES.map((item, i) => {
              const on = i === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`${on ? "is-on" : ""}${on && playing ? " is-timing" : ""}`}
                  aria-label={item.nom}
                  aria-current={on ? "true" : undefined}
                  onClick={() => go(i)}
                >
                  {on && playing ? (
                    <span
                      className="champ-dot-progress"
                      style={{ animationDuration: `${autoplayMs}ms` }}
                      key={`progress-${item.id}-${index}-${runId}`}
                    />
                  ) : null}
                </button>
              );
            })}
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
