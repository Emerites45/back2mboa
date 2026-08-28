"use client";

import type { CSSProperties } from "react";
import { CARTES, SECTEURS, type BoulevardCarte } from "@/data/boulevard";
import "./BoulevardSection.css";

/** Intercale les secteurs dans chaque voie : pas deux cartes de la même filière à la suite (y compris la boucle marquee). */
function toColumns(lot: BoulevardCarte[], n = 3): BoulevardCarte[][] {
  const bySector: BoulevardCarte[][] = [];
  const index = new Map<string, number>();
  for (const c of lot) {
    const key = c.s.court;
    let i = index.get(key);
    if (i === undefined) {
      i = bySector.length;
      index.set(key, i);
      bySector.push([]);
    }
    bySector[i].push(c);
  }

  const sectors = bySector.length;
  const rows = bySector[0]?.length ?? 0;
  const cols: BoulevardCarte[][] = Array.from({ length: n }, () => []);
  if (!sectors || !rows) return cols;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < n; c++) {
      const card = bySector[(c + r) % sectors][r];
      if (card) cols[c].push(card);
    }
  }
  return cols;
}

function Carte({ c, dup }: { c: BoulevardCarte; dup: "a" | "b" }) {
  return (
    <article
      className="card"
      style={{ ["--sc" as string]: `var(${c.s.v})` } as CSSProperties}
      tabIndex={0}
      aria-label={`${c.s.court} — ${c.e}. Six maillons.`}
      data-n={c.n}
      data-dup={dup}
    >
      <div className="face">
        <div className="row">
          <span className="ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: c.s.ico }} />
          </span>
          <span className="sec">{c.s.court}</span>
        </div>
        <span className="step">{c.e}</span>
      </div>
      <div className="reveal">
        <p className="rt">
          {c.s.court} · {c.e}
        </p>
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
          <header className="head">
            <h2>Six filières, une route.</h2>
            <p>
              Chaque carte croise un secteur prioritaire et une étape du cycle
              de vie. Trente-six portes, deux cent seize maillons.
            </p>
            <div className="legend" id="legend">
              {SECTEURS.map((s) => (
                <span className="lg" key={s.court}>
                  <span
                    className="swatch"
                    style={{ background: `var(${s.v})` }}
                    aria-hidden="true"
                  />
                  {s.court}
                </span>
              ))}
            </div>
          </header>
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
          <p className="big">Les deux sens de la prospérité.</p>
        </div>
      </section>
    </div>
  );
}
