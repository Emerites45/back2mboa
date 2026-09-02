"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PREUVES_PILOTES_COLUMNS,
  PREUVES_PILOTES_COPY,
} from "@/data/preuves-pilotes";
import type { PreuvesPilotesColumn, PreuvesPilotesSlide } from "@/types/preuves-pilotes";
import "./PreuvesPilotesSection.css";

/** Typo section — tailles. */
const TYPE = {
  eyebrowSize: "0.72rem",
  titleSize: "clamp(1.5rem, 3.2vw, 2.35rem)",
  subSize: "0.92rem",
  leadSize: "0.86rem",
  headlineSize: "clamp(0.95rem, 1.5vw, 1.2rem)",
  bodySize: "0.84rem",
  linkSize: "0.84rem",
  hintSize: "0.76rem",
  footSize: "0.84rem",
} as const;

/** Section — viewport + espacements header / footer. */
const SECTION = {
  height: "100dvh",
  headPaddingY: "clamp(20px, 3.5vh, 40px)",
  headPaddingX: "clamp(20px, 4vw, 48px)",
  headPaddingBottom: "clamp(12px, 2vh, 20px)",
  headMaxWidth: "52rem",
  footPaddingY: "clamp(12px, 1.8vh, 18px)",
  footPaddingX: "clamp(20px, 4vw, 48px)",
} as const;

/** Colonne + carousel. */
const CARD = {
  paddingY: "clamp(14px, 2vh, 20px)",
  paddingX: "clamp(16px, 1.8vw, 24px)",
  bodyMinHeight: "10.5rem",
  carouselMinHeight: "12rem",
  imageOverlay: "0.24",
  imageOverlayHover: "0.12",
  dotsBottom: "14px",
  slideIntervalMs: 4000,
} as const;

/** Survol — carte rôle overlay. */
const HOVER = {
  roleHintMaxHeight: "9rem",
} as const;

const PILOTES_VARS = {
  "--pilotes-height": SECTION.height,
  "--pilotes-head-py": SECTION.headPaddingY,
  "--pilotes-head-px": SECTION.headPaddingX,
  "--pilotes-head-pb": SECTION.headPaddingBottom,
  "--pilotes-head-max-w": SECTION.headMaxWidth,
  "--pilotes-foot-py": SECTION.footPaddingY,
  "--pilotes-foot-px": SECTION.footPaddingX,
  "--pilotes-col-py": CARD.paddingY,
  "--pilotes-col-px": CARD.paddingX,
  "--pilotes-body-min-h": CARD.bodyMinHeight,
  "--pilotes-carousel-min-h": CARD.carouselMinHeight,
  "--pilotes-image-overlay": CARD.imageOverlay,
  "--pilotes-image-overlay-hover": CARD.imageOverlayHover,
  "--pilotes-dots-bottom": CARD.dotsBottom,
  "--pilotes-hint-max-h": HOVER.roleHintMaxHeight,
  "--pilotes-type-eyebrow": TYPE.eyebrowSize,
  "--pilotes-type-title": TYPE.titleSize,
  "--pilotes-type-sub": TYPE.subSize,
  "--pilotes-type-lead": TYPE.leadSize,
  "--pilotes-type-headline": TYPE.headlineSize,
  "--pilotes-type-body": TYPE.bodySize,
  "--pilotes-type-link": TYPE.linkSize,
  "--pilotes-type-hint": TYPE.hintSize,
  "--pilotes-type-foot": TYPE.footSize,
} as CSSProperties;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

function PilotCarousel({
  columnId,
  slides,
  active,
  ariaLabel,
}: {
  columnId: string;
  slides: PreuvesPilotesSlide[];
  active: boolean;
  ariaLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  const live = slides[index]?.alt ?? "";

  useEffect(() => {
    // Chaque colonne possède son propre premier slide.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIndex(0);
  }, [columnId]);

  useEffect(() => {
    if (!active || reduced || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, CARD.slideIntervalMs);
    return () => window.clearInterval(timer);
  }, [active, reduced, slides.length]);

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      {slides.map((slide, k) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          className={k === index ? "active" : undefined}
          aria-hidden={k !== index}
        />
      ))}
      <p className="carousel-live" aria-live="polite" aria-atomic="true">
        {live}
      </p>
      <div className="carousel-dots" role="tablist" aria-label={`Slides — ${ariaLabel}`}>
        {slides.map((slide, k) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            className={k === index ? "on" : undefined}
            aria-selected={k === index}
            aria-label={`Image ${k + 1} sur ${slides.length} — ${slide.alt}`}
            onClick={() => setIndex(k)}
          />
        ))}
      </div>
    </div>
  );
}

function ColCard({
  col,
  roleKicker,
  active,
  onActivate,
}: {
  col: PreuvesPilotesColumn;
  roleKicker: string;
  active: boolean;
  onActivate: () => void;
}) {
  return (
    <article className="col" tabIndex={0} onMouseEnter={onActivate} onFocus={onActivate}>
      <div className="role-hint">
        <strong>{roleKicker}</strong>
        {col.role}
      </div>
      <div className="col-body">
        <h3 className="col-headline">{col.title}</h3>
        <p className="col-text">{col.body}</p>
        <Link className="col-link" href={col.href}>
          {col.linkLabel}
        </Link>
      </div>
      <PilotCarousel
        columnId={col.id}
        slides={col.slides}
        active={active}
        ariaLabel={col.title}
      />
    </article>
  );
}

export function PreuvesPilotesSection() {
  const copy = PREUVES_PILOTES_COPY;
  const [activeId, setActiveId] = useState(PREUVES_PILOTES_COLUMNS[0]?.id ?? "");

  return (
    <div className="b2m-pilotes" style={PILOTES_VARS}>
      <section className="proof-section" aria-label="Preuves des éditions pilotes">
        <header className="proof-head">
          <div className="proof-eyebrow">{copy.kicker}</div>
          <h2 className="proof-title">{copy.title}</h2>
          <p className="proof-sub">{copy.subtitle}</p>
          <p className="proof-lead">{copy.lead}</p>
        </header>

        <div
          className="cols"
          onMouseLeave={() => setActiveId(PREUVES_PILOTES_COLUMNS[0]?.id ?? "")}
        >
          {PREUVES_PILOTES_COLUMNS.map((col) => (
            <ColCard
              key={col.id}
              col={col}
              roleKicker={copy.roleKicker}
              active={activeId === col.id}
              onActivate={() => setActiveId(col.id)}
            />
          ))}
        </div>

        <footer className="proof-foot">
          <span className="badge">{copy.badge}</span>
          <span>
            <strong>{copy.foot2022.year}</strong> — {copy.foot2022.detail}
          </span>
          <span>
            <strong>{copy.foot2023.year}</strong> — {copy.foot2023.detail}
          </span>
          <span>{copy.footDate}</span>
        </footer>
      </section>
    </div>
  );
}
