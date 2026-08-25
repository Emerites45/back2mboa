"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { BILLET_QR_PATHS } from "@/data/billets/qr-paths";
import { PACKS, STUB_BG } from "@/data/billets/packs";
import { TicketDesign } from "./TicketDesign";
import "./BilletsSection.css";

const DEFAULT_SEL = 2;

export function BilletsSection() {
  const [sel, setSel] = useState(DEFAULT_SEL);
  const p = PACKS[sel] ?? PACKS[DEFAULT_SEL];
  const qr = BILLET_QR_PATHS[p.id];

  const vars = {
    "--sel": p.couleur,
    "--selTxt": p.texte,
    "--ctaTxt": p.id === "vision" ? "#0A2B21" : "#fff",
    "--ctaBg": p.id === "vision" ? p.couleur : p.texte,
  } as CSSProperties;

  return (
    <>
      <div className="b2m-billets" id="billets">
        <header className="head">
          <div className="ghost" aria-hidden="true">
            BACK2MBOA
          </div>
          <h1>BILLETS</h1>
          <div className="sub">Offres de partenariat — 16 &amp; 17 décembre</div>
          <p className="note">
            Cliquez sur une souche à gauche pour découvrir le détail de chaque offre.
          </p>
        </header>

        <section className="zone">
          <div className="ticket" id="ticket" style={vars}>
            <div className="stubs" id="stubs">
              {PACKS.map((q, i) =>
                i === sel ? null : (
                  <button
                    key={q.id}
                    type="button"
                    className={`stub${q.dispo ? "" : " clos"}`}
                    style={{ background: STUB_BG[i], color: q.texte }}
                    aria-label={`Voir l'offre ${q.complet}`}
                    onClick={() => setSel(i)}
                  >
                    <div className="stub-in">
                      {q.complet}
                      <span className="price">{q.prix} F</span>
                      <span className="state">{q.statut}</span>
                    </div>
                    <span className="hint" aria-hidden="true">
                      ＋
                    </span>
                  </button>
                ),
              )}
            </div>

            <div className="tier" id="tier">
              <span className="notch top" style={{ left: -14 }} />
              <span className="notch bot" style={{ left: -14 }} />
              <div className="dyn fade" key={p.id}>
                <div className="name">{p.nom}</div>
                <div className="amount">
                  {p.prix}{" "}
                  <small>
                    FCFA TTC — {p.position}
                  </small>
                </div>
                <div className={`state ${p.dispo ? "dispo" : "clos"}`}>{p.statut}</div>
                <div className="europe">{p.europe}</div>
              </div>
            </div>

            <div className="body">
              <span className="notch top" style={{ right: -14 }} />
              <span className="notch bot" style={{ right: -14 }} />
              <h2>BACK2MBOA ASAP 2026</h2>
              <div className="cta-row">
                <span className="arrow" aria-hidden="true">
                  ➜
                </span>
                <Link className="cta" href="/inscription">
                  ◷ Choisir {p.nom}
                </Link>
                <span className="arrow" aria-hidden="true" style={{ transform: "scaleX(-1)" }}>
                  ➜
                </span>
              </div>
              <div className="facts">
                <div className="fact">YAOUNDÉ</div>
                <div className="fact">DÉC. · 16 – 17 · 2026</div>
                <div className="fact">2 JOURS</div>
                <div className="fact">MUSÉE NATIONAL</div>
              </div>
            </div>

            <div className="qr-panel">
              <div
                className="qr-box"
                id="qrBox"
                dangerouslySetInnerHTML={{ __html: qr }}
              />
              <div className="qr-cap">
                Scannez pour
                <br />
                cette offre
              </div>
              <div className="qr-ref" id="qrRef">
                B2M-2026-{p.nom.slice(0, 4)}
              </div>
            </div>
          </div>

          <div className="details" id="details" style={vars}>
            <div className="det-head fade" key={`head-${p.id}`}>
              <span className="dn">{p.complet}</span>
              <span className="dp">{p.prix} FCFA TTC</span>
              <span className={`db${p.dispo ? " dispo" : ""}`}>{p.statut}</span>
            </div>
            <div className="det-grid fade" key={`grid-${p.id}`}>
              <div className="det-col">
                <h4>Ce que l&apos;offre comprend</h4>
                <ul>
                  {p.inclus.map((x) => (
                    <li key={x} dangerouslySetInnerHTML={{ __html: x }} />
                  ))}
                </ul>
              </div>
              <div className="det-col">
                <h4>Pour qui</h4>
                <ul>
                  {p.pourqui.map((x) => (
                    <li key={x} dangerouslySetInnerHTML={{ __html: x }} />
                  ))}
                </ul>
                <div className="det-bl">
                  <div className="lab">En une phrase</div>
                  <p dangerouslySetInnerHTML={{ __html: p.bottom }} />
                </div>
              </div>
            </div>
          </div>

          <div className="under">
            <span className="chip">
              <b>500</b> participants sur sélection
            </span>
            <span className="chip">
              Clôture le <b>30 novembre 2026</b>
            </span>
            <span className="chip">
              Offres à la carte dès <b>50 000 F</b>
            </span>
          </div>
        </section>
      </div>

      <TicketDesign />
    </>
  );
}

export { TicketDesign };
