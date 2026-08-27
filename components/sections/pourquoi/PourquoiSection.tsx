"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { POURQUOI_COPY } from "@/data/pourquoi";
import type { PourquoiStars } from "@/types/pourquoi";
import "./PourquoiSection.css";

const LOGO_SRC = "/images/pourquoi/logo-back2mboa.png";

function BrandLogo({ className }: { className?: string }) {
  return (
    <span className={className ?? "pourquoi-logo"}>
      <Image
        src={LOGO_SRC}
        alt="Back2Mboa"
        width={160}
        height={58}
        className="pourquoi-logo-img"
        priority
      />
    </span>
  );
}

function Stars({ value, label }: { value: PourquoiStars; label: string }) {
  return (
    <span className="pourquoi-stars" role="img" aria-label={`${value} sur 5 — ${label}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`pourquoi-star${i < value ? " is-on" : ""}`}
          style={{ ["--pq-si" as string]: i }}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </span>
  );
}

export function PourquoiSection() {
  const copy = POURQUOI_COPY;
  const [activeId, setActiveId] = useState(copy.rows[0]?.id ?? null);

  const active = copy.rows.find((row) => row.id === activeId) ?? copy.rows[0];

  useEffect(() => {
    if (!activeId && copy.rows[0]) setActiveId(copy.rows[0].id);
  }, [activeId, copy.rows]);

  return (
    <section id="pourquoi" className="pourquoi" aria-labelledby="pourquoi-title">
      <div className="pourquoi-inner">
        <header className="pourquoi-head">
          <p className="pourquoi-kicker">{copy.kicker}</p>
          <h2 id="pourquoi-title" className="pourquoi-title">
            {copy.title}
          </h2>
          <p className="pourquoi-sub">{copy.subtitle}</p>
        </header>

        <div className="pourquoi-layout">
          <div className="pourquoi-card">
            <div className="pourquoi-card-mark" aria-hidden="true">
              <span>BACK2MBOA</span>
            </div>
            <div className="pourquoi-table" role="table" aria-label="Comparaison Back2Mboa">
              <div className="pourquoi-row is-head" role="row">
                <div className="pourquoi-cell is-crit" role="columnheader">
                  {copy.headers.criterion}
                </div>
                <div className="pourquoi-cell is-score" role="columnheader">
                  {copy.headers.salons}
                </div>
                <div className="pourquoi-cell is-score" role="columnheader">
                  {copy.headers.forums}
                </div>
                <div className="pourquoi-cell is-reco" role="columnheader">
                  <BrandLogo className="pourquoi-logo is-head" />
                </div>
              </div>

              {copy.rows.map((row) => {
                const on = activeId === row.id;
                return (
                  <button
                    key={row.id}
                    type="button"
                    className={`pourquoi-row is-body${on ? " is-on" : ""}`}
                    role="row"
                    aria-pressed={on}
                    onClick={() => setActiveId(row.id)}
                    onMouseEnter={() => setActiveId(row.id)}
                    onFocus={() => setActiveId(row.id)}
                  >
                    <div className="pourquoi-cell is-crit" role="cell">
                      <strong>{row.title}</strong>
                      <span>{row.question}</span>
                    </div>
                    <div className="pourquoi-cell is-score" role="cell">
                      <Stars value={row.salons} label={copy.headers.salons} />
                    </div>
                    <div className="pourquoi-cell is-score" role="cell">
                      <Stars value={row.forums} label={copy.headers.forums} />
                    </div>
                    <div className="pourquoi-cell is-reco" role="cell">
                      <Stars value={5} label="Back2Mboa" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {active ? (
            <aside className="pourquoi-detail" aria-live="polite">
              <div className="pourquoi-detail-brand">
                <BrandLogo className="pourquoi-logo is-detail" />
              </div>
              <div className="pourquoi-detail-inner" key={active.id}>
                <h3 className="pourquoi-detail-title">{active.title}</h3>
                <p className="pourquoi-detail-question">{active.question}</p>
                <div className="pourquoi-detail-stars">
                  <Stars value={5} label="Back2Mboa" />
                </div>
                <blockquote className="pourquoi-note">
                  <span className="pourquoi-note-eyebrow">En bref</span>
                  <p>{active.note}</p>
                </blockquote>
              </div>
            </aside>
          ) : null}
        </div>

        <p className="pourquoi-footer">{copy.footer}</p>
      </div>
    </section>
  );
}
