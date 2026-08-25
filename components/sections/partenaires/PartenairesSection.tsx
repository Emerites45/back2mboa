"use client";

import { useMemo } from "react";
import {
  AFRICA,
  ENTRENT,
  SORTENT,
  inPoly,
  initiales,
  type Partenaire,
} from "@/data/partenaires";
import "./PartenairesSection.css";

const MAP_W = 1600;
const MAP_H = 900;
const MAP_STEP = 14;
const MAP_SEED = 2026;

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function DoorSvg() {
  return (
    <svg className="door-svg" viewBox="0 0 120 220" fill="none" aria-hidden="true">
      <rect x="48" y="8" width="64" height="204" rx="6" fill="#1a1510" stroke="#C9A66B" strokeWidth="3" />
      <rect x="56" y="20" width="48" height="180" rx="3" fill="#0d0a08" />
      <rect x="62" y="32" width="36" height="70" rx="2" stroke="#C9A66B" strokeWidth="1.5" opacity=".5" />
      <rect x="62" y="118" width="36" height="70" rx="2" stroke="#C9A66B" strokeWidth="1.5" opacity=".5" />
      <circle cx="58" cy="110" r="4" fill="#FFD506" />
      <path d="M48 8 L36 20 L36 200 L48 212" fill="#2a2218" stroke="#C9A66B" strokeWidth="2" />
      <path d="M36 20 L28 28 L28 192 L36 200" fill="#3d3228" opacity=".9" />
    </svg>
  );
}

function LogoItem({ nom, sous }: { nom: string; sous: string }) {
  return (
    <span className="logo" title={`${nom} — ${sous}`}>
      <span className="glyph">{initiales(nom)}</span>
      {nom}
      <small>{sous}</small>
    </span>
  );
}

function LogoTrack({ items, direction }: { items: Partenaire[]; direction: "in" | "out" }) {
  const loop = [...items, ...items];
  return (
    <div className={`track ${direction}`}>
      {loop.map(([nom, sous], i) => (
        <LogoItem key={`${nom}-${i}`} nom={nom} sous={sous} />
      ))}
    </div>
  );
}

export function PartenairesSection() {
  const mapSvg = useMemo(() => {
    const rng = mulberry32(MAP_SEED);
    const circles: { x: number; y: number; o: string }[] = [];
    for (let y = MAP_STEP; y < MAP_H; y += MAP_STEP) {
      for (let x = MAP_STEP; x < MAP_W; x += MAP_STEP) {
        const px = (x / MAP_W) * 100;
        const py = (y / MAP_H) * 100;
        if (!inPoly(px, py, AFRICA)) continue;
        circles.push({ x, y, o: (0.22 + rng() * 0.48).toFixed(2) });
      }
    }
    return (
      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {circles.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={1.6} fill="#fff" opacity={c.o} />
        ))}
      </svg>
    );
  }, []);

  return (
    <div className="b2m-part">
      <section className="partners" id="partenaires">
        <div className="map" id="map" aria-hidden="true">
          {mapSvg}
        </div>

        <div className="intro">
          <span className="eyebrow">Ils font circuler la prospérité</span>
          <h2>
            Les uns entrent. Les autres <em>en ressortent transformés</em>.
          </h2>
          <p>
            D’un côté ceux qui franchissent la porte pour bâtir. De l’autre ceux
            qui en sortent avec un projet, un contrat, un territoire. La même
            porte, dans les deux sens.
          </p>
        </div>

        <div className="band enter">
          <div className="big">
            BÂTISSEURS
            <br />
            DE PROSPÉRITÉ
            <span className="bar" />
          </div>
          <div className="corridor">
            <LogoTrack items={ENTRENT} direction="in" />
          </div>
          <div className="door" aria-hidden="true">
            <span className="door-glow" />
            <DoorSvg />
          </div>
        </div>

        <div className="band exit">
          <div className="door" aria-hidden="true">
            <span className="door-glow" />
            <DoorSvg />
          </div>
          <div className="corridor">
            <LogoTrack items={SORTENT} direction="out" />
          </div>
          <div className="big">
            VISIONNAIRES
            <br />
            &amp; PARTENAIRES
            <span className="bar" />
          </div>
        </div>

        <div className="legend">
          <div className="leg">
            <b>
              Ils <i>entrent</i> pour bâtir
            </b>
            <p>
              Institutions, ministères et structures nationales qui ouvrent les
              territoires et qualifient les besoins.
            </p>
          </div>
          <div className="leg">
            <b>
              Ils <i>ressortent</i> transformés
            </b>
            <p>
              Partenaires techniques, financeurs et acteurs qui quittent la table
              avec un deal, un mandat ou un pipeline.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
