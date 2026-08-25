"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import "./PreuvesPilotesSection.css";

type Slide = { src: string; alt: string };

type Col = {
  num: string;
  label: string;
  headline: string;
  text: ReactNode;
  href: string;
  link: string;
  hint: ReactNode;
  slides: Slide[];
};

const COLS: Col[] = [
  {
    num: "1",
    label: "Bâtisseurs-Solutionneurs™",
    headline: "Entrepreneurs & diaspora qui construisent",
    text: (
      <>
        35 (2022) puis 70 (2023) entrepreneurs et Solutionneurs diaspora : agro,
        finance, tech, énergie, habitat. 97&nbsp;% de satisfaction.
      </>
    ),
    href: "#salon",
    link: "Voir les profils",
    hint: (
      <>
        <strong>Rôle dans Back2Mboa</strong>
        Les Bâtisseurs-Solutionneurs™ apportent l’expertise, les technologies et
        les modèles d’affaires. Ils répondent aux Mayor Calls™, co-construisent
        les Opportunity Cards™ et entrent en Deal Room™ avec les territoires.
      </>
    ),
    slides: [
      { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85", alt: "Équipe entrepreneurs" },
      { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=85", alt: "Networking entrepreneurs" },
      { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=85", alt: "Collaboration" },
      { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=85", alt: "Atelier diaspora" },
      { src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=85", alt: "Pitch solution" },
    ],
  },
  {
    num: "2",
    label: "Écosystème & confiance",
    headline: "Régulateurs, PTF, investisseurs & médias",
    text: (
      <>
        MINREX, MINDDEVEL, FEICOM, AFD, UE, GIZ, APME, CCIMA, CARPA… +
        influenceurs (60&nbsp;000+ de portée) et Team Back2Mboa.
      </>
    ),
    href: "#partenaires",
    link: "Voir les partenaires",
    hint: (
      <>
        <strong>Rôle dans Back2Mboa</strong>
        Régulateurs et PTF sécurisent le cadre ; investisseurs et entreprises
        financent et déploient ; médias d’influence amplifient ; Team Back2Mboa
        orchestre matching, qualification CAP™ et suivi jusqu’à la mise en
        œuvre.
      </>
    ),
    slides: [
      { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=85", alt: "Conférence institutionnelle" },
      { src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&q=85", alt: "Panel investisseurs" },
      { src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=85", alt: "Médias" },
      { src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=85", alt: "Partenariat" },
      { src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=85", alt: "Équipe projet" },
    ],
  },
  {
    num: "3",
    label: "Intendants territoriaux · CTD",
    headline: "Maires & collectivités engagées",
    text: (
      <>
        40 mairies (10 régions) en 2022, 20 mairies (6 régions) en 2023.
        89&nbsp;% de satisfaction. 10 recommandations portées par les maires.
      </>
    ),
    href: "#mairies-championnes",
    link: "Voir les territoires",
    hint: (
      <>
        <strong>Rôle dans Back2Mboa</strong>
        Les intendants territoriaux (maires &amp; CTD) portent les besoins du
        terrain, publient les Mayor Calls™, accueillent les Solutionneurs et
        pilotent la mise en œuvre locale — du diagnostic CAP™ jusqu’aux recettes
        et services aux citoyens.
      </>
    ),
    slides: [
      { src: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=1200&q=85", alt: "Réunion territoriale" },
      { src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=85", alt: "Élus CTD" },
      { src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=85", alt: "Table ronde" },
      { src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=85", alt: "Terrain communal" },
      { src: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=1200&q=85", alt: "Assemblée locale" },
    ],
  },
];

function PilotCarousel({ slides, paused }: { slides: Slide[]; paused: boolean }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => {
      setI((cur) => (cur + 1) % slides.length);
    }, 3000);
    return () => window.clearInterval(t);
  }, [paused, slides.length]);

  return (
    <div className="carousel" data-carousel="" data-interval="3000">
      {slides.map((s, k) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.alt}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          className={k === i ? "active" : undefined}
        />
      ))}
      <div className="carousel-dots">
        {slides.map((s, k) => (
          <span
            key={s.src}
            className={k === i ? "on" : undefined}
            role="button"
            tabIndex={0}
            aria-label={`Slide ${k + 1}`}
            onClick={() => setI(k)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setI(k);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ColCard({ col }: { col: Col }) {
  const [paused, setPaused] = useState(false);
  return (
    <article
      className="col"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="role-hint">{col.hint}</div>
      <div className="col-num">{col.num}</div>
      <div className="col-label">{col.label}</div>
      <h3 className="col-headline">{col.headline}</h3>
      <p className="col-text">{col.text}</p>
      <Link className="col-link" href={col.href}>
        {col.link}
      </Link>
      <PilotCarousel slides={col.slides} paused={paused} />
    </article>
  );
}

export function PreuvesPilotesSection() {
  return (
    <div className="b2m-pilotes">
      <section className="proof-section" aria-label="Preuves des éditions pilotes">
        <header className="proof-head">
          <div className="proof-eyebrow">Back2Mboa ASAP™ · Preuve par l’action</div>
          <h2 className="proof-title">Les éditions pilotes ont prouvé le modèle.</h2>
          <p className="proof-sub">
            MEET Administrations 2022 (Douala) et MEET Écosystème 2023 (Musée
            National, Yaoundé). Survolez chaque colonne pour comprendre le rôle
            de ces acteurs dans Back2Mboa.
          </p>
        </header>

        <div className="cols">
          {COLS.map((col) => (
            <ColCard key={col.num} col={col} />
          ))}
        </div>

        <footer className="proof-foot">
          <span className="badge">Preuve · pas promesse</span>
          <span>
            <strong>2022</strong> — 90 acteurs · 60+ mises en relation
          </span>
          <span>
            <strong>2023</strong> — 400+ participants · SG MINREX · FEICOM
          </span>
          <span>16 · 17 décembre 2026 — Musée National, Yaoundé</span>
        </footer>
      </section>
    </div>
  );
}
