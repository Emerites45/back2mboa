"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { BILLET_QR_PATHS } from "@/data/billets/qr-paths";
import { PACKS, STUB_BG, type BilletPack } from "@/data/billets/packs";
import "./BilletsSection.css";

const DEFAULT_SEL = 0;

function packVars(q: BilletPack): CSSProperties {
  return {
    "--sel": q.couleur,
    "--selTxt": q.texte,
    "--ctaTxt": q.id === "vision" ? "#0A2B21" : "#fff",
    "--ctaBg": q.id === "vision" ? q.couleur : q.texte,
  } as CSSProperties;
}

function TicketFace({ p, open }: { p: BilletPack; open: boolean }) {
  const qr = BILLET_QR_PATHS[p.id];
  return (
    <div className="face" inert={!open} aria-hidden={!open}>
      <div className="tier">
        <div className="dyn">
          <div className="name">{p.nom}</div>
          <div className="amount">{p.prix}</div>
          <p className="unit">
            <span>FCFA TTC</span>
            {p.position}
          </p>
          <div className={`avail ${p.dispo ? "dispo" : "clos"}`}>{p.statut}</div>
          <div className="europe">{p.europe}</div>
        </div>
      </div>

      <div className="body">
        <p className="mast">Back2Mboa ASAP 2026</p>
        <Link className="cta" href="/inscription">
          Choisir {p.nom}
        </Link>
        <dl className="facts">
          <div>
            <dt>Lieu</dt>
            <dd>Yaoundé</dd>
          </div>
          <div>
            <dt>Dates</dt>
            <dd>16–17 décembre 2026</dd>
          </div>
          <div>
            <dt>Durée</dt>
            <dd>2 jours</dd>
          </div>
          <div>
            <dt>Site</dt>
            <dd>Musée National</dd>
          </div>
        </dl>
      </div>

      <div className="qr-panel">
        <span className="notch top" />
        <span className="notch bot" />
        <span className="qr-lab">Coupon</span>
        <div
          className="qr-box"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: qr }}
        />
        <div className="qr-ref">B2M-2026-{p.id.toUpperCase()}</div>
        <div className="qr-fine">Non cessible</div>
      </div>
    </div>
  );
}

export function BilletsSection() {
  const [sel, setSel] = useState(DEFAULT_SEL);
  const [live, setLive] = useState(false);
  const p = PACKS[sel] ?? PACKS[DEFAULT_SEL];

  const pick = (i: number) => {
    if (i === sel) return;
    setLive(true);
    setSel(i);
  };

  return (
    <div className="b2m-billets" id="billets">
      <header className="head">
        <p className="when">16 &amp; 17 décembre 2026</p>
        <h2>Offres de partenariat</h2>
      </header>

      <section className="zone">
        <div
          className={`ticket${live ? " is-live" : ""}`}
          id="ticket"
          data-open={String(sel)}
          role="group"
          aria-label="Offres"
        >
          {PACKS.map((q, i) => {
            const on = i === sel;
            return (
              <div
                key={q.id}
                className={`lane${on ? " on" : ""}`}
                style={packVars(q)}
              >
                <button
                  type="button"
                  aria-pressed={on}
                  aria-expanded={on}
                  className={`stub${q.dispo ? "" : " clos"}`}
                  style={{
                    background: on ? q.couleur : STUB_BG[i],
                    color: on
                      ? q.id === "vision"
                        ? "#0A2B21"
                        : "#fff"
                      : q.texte,
                  }}
                  aria-label={`${q.complet}, ${q.prix} FCFA`}
                  onClick={() => pick(i)}
                >
                  <span className="stub-in">
                    {q.nom}
                    <span className="price">{q.prix} F</span>
                    <span className="state">{q.statut}</span>
                  </span>
                </button>
                <TicketFace p={q} open={on} />
              </div>
            );
          })}
        </div>

        <div className="details" id="details" style={packVars(p)}>
          <div className={live ? "is-swap" : undefined} key={p.id}>
            <div className="det-head">
              <span className="dn">{p.complet}</span>
              <span className="dp">{p.prix} FCFA TTC</span>
              <span className={`db${p.dispo ? " dispo" : ""}`}>{p.statut}</span>
            </div>
            <div className="det-grid">
              <div className="det-col">
                <h4>Ce que l&apos;offre comprend</h4>
                <ul>
                  {p.inclus.map((x) => (
                    <li key={x} dangerouslySetInnerHTML={{ __html: x }} />
                  ))}
                </ul>
              </div>
              <div className="det-col who">
                <h4>Pour qui</h4>
                <ul>
                  {p.pourqui.map((x) => (
                    <li key={x} dangerouslySetInnerHTML={{ __html: x }} />
                  ))}
                </ul>
                <blockquote className="det-bl">
                  <p dangerouslySetInnerHTML={{ __html: p.bottom }} />
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        <p className="under">
          500 participants sur sélection · Clôture le 30 novembre 2026 · Offres
          à la carte dès 50 000 F
        </p>
      </section>
    </div>
  );
}
