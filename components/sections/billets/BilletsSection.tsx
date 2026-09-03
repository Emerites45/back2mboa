"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { BILLET_QR_PATHS } from "@/data/billets/qr-paths";
import { PACKS, STUB_BG, packPrices, type BilletPack } from "@/data/billets/packs";
import "./BilletsSection.css";

const DEFAULT_SEL = 0;
const DEFAULT_CHIPS = ["Deal Rooms", "6 mairies", "500 décideurs"];

export type BilletsSectionProps = {
  id?: string;
  title?: string;
  when?: string;
  under?: string;
  eyebrow?: string;
  packs?: BilletPack[];
  stubBg?: readonly string[];
  ariaLabel?: string;
  tone?: "day" | "night";
};

function packVars(q: BilletPack): CSSProperties {
  return {
    "--sel": q.couleur,
    "--selTxt": q.texte,
    "--ctaTxt": "#fff",
    "--ctaBg": q.couleur,
  } as CSSProperties;
}

function TicketFace({
  p,
  open,
  eyebrow,
}: {
  p: BilletPack;
  open: boolean;
  eyebrow: string;
}) {
  const qr = BILLET_QR_PATHS[p.id];
  const chips = p.chips ?? DEFAULT_CHIPS;
  const cur = packPrices(p);
  return (
    <div className="face" inert={!open} aria-hidden={!open}>
      <span className="notch tl" />
      <span className="notch bl" />
      <span className="notch tm" />
      <span className="notch bm" />

      <div className="tier">
        <div className="dyn">
          <div className="eyebrow">{eyebrow}</div>
          <div className="name">{p.nom}</div>
          <div className="amount">{cur.xaf}</div>
          <div className="conv">
            <span>{cur.eur}</span>
            <span className="sep">·</span>
            <span>{cur.usd}</span>
          </div>
          <p className="unit">{p.position}</p>
          <div className={`avail ${p.dispo ? "dispo" : "clos"}`}>{p.statut}</div>
        </div>
      </div>

      <div className="pass-right">
        <div className="body">
          <p className="mast">{p.complet}</p>
          <div className="chips">
            {chips.map((c) => (
              <span className="chip" key={c}>
                {c}
              </span>
            ))}
          </div>
          <dl className="facts">
            <div>
              <dt>Lieu</dt>
              <dd>Musée National, Yaoundé</dd>
            </div>
            <div>
              <dt>Dates</dt>
              <dd>16–17 déc. 2026</dd>
            </div>
            <div>
              <dt>Ouverture</dt>
              <dd>08:30</dd>
            </div>
            <div>
              <dt>Info</dt>
              <dd>{p.extra}</dd>
            </div>
          </dl>
          <Link className="cta" href="/inscription">
            Choisir {p.nom}
          </Link>
        </div>
        <div className="qr-panel">
          <div
            className="qr-box"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: qr }}
          />
          <div className="qr-lab">SCAN · CHECK-IN</div>
        </div>
        <div className="seat">
          <span>
            N° <b>B2M-2026-{p.id.toUpperCase()}</b>
          </span>
          <span>
            Porte <b>{p.nom}</b>
          </span>
        </div>
      </div>
    </div>
  );
}

export function BilletsSection({
  id = "billets",
  title = "Packs entreprises",
  when = "16 & 17 décembre 2026",
  under = "500 participants sur sélection · Clôture le 30 novembre 2026 · Offres à la carte dès 50 000 F",
  eyebrow = "Offre entreprise",
  packs = PACKS,
  stubBg = STUB_BG,
  ariaLabel = "Packs entreprises",
  tone = "day",
}: BilletsSectionProps = {}) {
  const [sel, setSel] = useState(DEFAULT_SEL);
  const [live, setLive] = useState(false);

  const pick = (i: number) => {
    if (i === sel) return;
    setLive(true);
    setSel(i);
  };

  return (
    <div className="b2m-billets" id={id} data-tone={tone}>
      <header className="head">
        <p className="when">{when}</p>
        <h2>{title}</h2>
      </header>

      <section className="zone">
        <div
          className={`ticket${live ? " is-live" : ""}`}
          id={`${id}-ticket`}
          data-open={String(sel)}
          data-count={String(packs.length)}
          role="group"
          aria-label={ariaLabel}
        >
          {packs.map((q, i) => {
            const on = i === sel;
            const cur = packPrices(q);
            return (
              <button
                key={q.id}
                type="button"
                aria-pressed={on}
                aria-expanded={on}
                className={`stub${q.dispo ? "" : " clos"}${on ? " is-active" : ""}`}
                style={{
                  background: on ? q.couleur : stubBg[i],
                  color: on ? q.texte : q.texteInactif,
                  gridRow: "1",
                }}
                aria-label={`${q.complet}, ${cur.xaf}`}
                onClick={() => pick(i)}
              >
                <span className="stub-in">
                  {q.nom}
                  <span className="price">{cur.xaf}</span>
                  <span className="state">{q.statut}</span>
                </span>
              </button>
            );
          })}
          {packs.map((q, i) => (
            <div
              key={`face-${q.id}`}
              className={`lane${i === sel ? " on" : ""}`}
              style={{ ...packVars(q), gridRow: "1" }}
            >
              <TicketFace p={q} open={i === sel} eyebrow={eyebrow} />
            </div>
          ))}
        </div>

        <p className="under">{under}</p>
      </section>
    </div>
  );
}

export function BilletsPartenairesSection() {
  return (
    <BilletsSection
      id="partenaires"
      title="Packs partenaires"
      eyebrow="Pack partenaire"
      packs={PACKS}
      stubBg={STUB_BG}
      ariaLabel="Packs partenaires"
      tone="night"
    />
  );
}
