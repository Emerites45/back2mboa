"use client";

import type { CSSProperties, FocusEvent } from "react";
import { CARTES, SECTEURS, type BoulevardCarte } from "@/data/boulevard";
import "./BoulevardSection.css";

function setTrackPlay(e: FocusEvent<HTMLElement>, state: "paused" | "running") {
  const track = e.currentTarget.closest(".col-track");
  if (track instanceof HTMLElement) {
    track.style.animationPlayState = state;
  }
}

function toColumns(lot: BoulevardCarte[], n = 3): BoulevardCarte[][] {
  const cols: BoulevardCarte[][] = Array.from({ length: n }, () => []);
  lot.forEach((c, i) => cols[i % n].push(c));
  return cols;
}

function Carte({ c, dup }: { c: BoulevardCarte; dup: "a" | "b" }) {
  return (
    <article
      className="card"
      style={{ ["--sc" as string]: `var(${c.s.v})` } as CSSProperties}
      tabIndex={0}
      aria-label={`${c.s.court} — ${c.e}`}
      data-n={c.n}
      data-dup={dup}
      onFocus={(e) => setTrackPlay(e, "paused")}
      onBlur={(e) => setTrackPlay(e, "running")}
    >
      <span className="ico">
        <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: c.s.ico }} />
      </span>
      <span className="sec">{c.s.court}</span>
      <span className="step">{c.e}</span>
      <div className="reveal">
        <div className="rt">
          {c.s.court} · {c.e}
        </div>
        <ol>
          {c.s.maillons.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ol>
      </div>
    </article>
  );
}

function Side({ lot }: { lot: BoulevardCarte[] }) {
  const cols = toColumns(lot);
  return (
    <>
      {cols.map((col, ci) => (
        <div className="col" key={ci}>
          <div className="col-track">
            {col.map((c) => (
              <Carte key={`${c.n}-a`} c={c} dup="a" />
            ))}
            {col.map((c) => (
              <Carte key={`${c.n}-b`} c={c} dup="b" />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export function BoulevardSection() {
  return (
    <div className="b2m-blvd">
      <section className="blvd" id="boulevard">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow">Le boulevard d&apos;opportunités</span>
            <h2>
              6 secteurs × 6 cycles de vie = <em>36 portes d&apos;entrée</em>.
            </h2>
            <p>
              Chaque carte croise un secteur prioritaire et une étape du cycle de
              vie d&apos;un projet. Survolez-en une pour voir ses 6 maillons de
              chaîne de valeur — soit 216 points d&apos;entrée au total.
            </p>
            <div className="legend" id="legend">
              {SECTEURS.map((s) => (
                <span className="lg" key={s.court}>
                  <i style={{ background: `var(${s.v})` }} />
                  {s.court}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="road-zone">
          <div className="side" id="left">
            <Side lot={CARTES.slice(0, 18)} />
          </div>
          <div className="road">
            <div className="road-dash" />
            <div className="road-tag">Prospérité — les deux sens</div>
          </div>
          <div className="side" id="right">
            <Side lot={CARTES.slice(18)} />
          </div>
        </div>

        <div className="foot">
          <div className="big">
            36 cartes. 216 maillons. <em>Une seule route.</em>
          </div>
          <p>Passez le curseur sur une carte pour arrêter la colonne et lire le détail.</p>
        </div>
      </section>
    </div>
  );
}
