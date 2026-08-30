"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftRight } from "lucide-react";
import {
  BONNE_PORTE_BG,
  BONNE_PORTE_COPY,
  BONNE_PORTE_PANELS,
} from "@/data/bonne-porte";
import type { BonnePortePanelId } from "@/types/bonne-porte";
import "./BonnePorteSection.css";

export function BonnePorteSection() {
  const uid = useId();
  const [panelId, setPanelId] = useState<BonnePortePanelId>("ctd");
  const panel = BONNE_PORTE_PANELS.find((p) => p.id === panelId) ?? BONNE_PORTE_PANELS[0];
  const copy = BONNE_PORTE_COPY;

  return (
    <section className="b2m-porte" id="la-bonne-porte" aria-labelledby={`${uid}-title`}>
      <div className="porte-bg" aria-hidden="true">
        <Image
          src={BONNE_PORTE_BG}
          alt=""
          fill
          sizes="100vw"
          quality={85}
          className="porte-bg-img"
        />
        <div className="porte-bg-veil" />
      </div>

      <div className="porte-inner">
        <header className="porte-head">
          <p className="porte-eyebrow">{copy.eyebrow}</p>
          <h2 className="porte-title" id={`${uid}-title`}>
            {copy.title}
          </h2>
          <p className="porte-sub">{copy.subtitle}</p>
        </header>

        <div className="flux-banner" role="note">
          <div className="flux-leg">
            <strong>{copy.fluxLeft.kicker}</strong>
            <span>{copy.fluxLeft.body}</span>
          </div>
          <div className="flux-mid" aria-hidden="true">
            <ArrowLeftRight size={16} strokeWidth={2.25} />
            <span>{copy.fluxMid}</span>
          </div>
          <div className="flux-leg">
            <strong>{copy.fluxRight.kicker}</strong>
            <span>{copy.fluxRight.body}</span>
          </div>
        </div>

        <div className="tabs" role="tablist" aria-label="Choisir votre profil">
          {BONNE_PORTE_PANELS.map((p) => {
            const active = panelId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                className={`tab${active ? " is-active" : ""}`}
                role="tab"
                aria-selected={active}
                id={`${uid}-tab-${p.id}`}
                aria-controls={`${uid}-panel`}
                tabIndex={active ? 0 : -1}
                onClick={() => setPanelId(p.id)}
              >
                {p.tabLabel}
              </button>
            );
          })}
        </div>

        <div
          className="panel"
          id={`${uid}-panel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${panel.id}`}
          key={panel.id}
        >
          <div className="panel-grid">
            <div className="panel-left">
              <h3>
                {panel.titleLines
                  ? panel.titleLines.map((line) => (
                      <span key={line} className="panel-title-line">
                        {line}
                      </span>
                    ))
                  : panel.title}
              </h3>
              <p className="lead">{panel.lead}</p>
              <Link className="btn-dark" href={panel.ctaHref}>
                {panel.cta}
              </Link>
            </div>

            <div className="gains">
              {panel.gains.map((g) => (
                <article className="gain" key={g.now}>
                  <div className="gain-cols">
                    <div className="gain-now">
                      <span className="gain-label is-now">Aujourd’hui</span>
                      <p>{g.now}</p>
                    </div>
                    <div className="gain-next">
                      <span className="gain-label is-next">Avec Back2Mboa</span>
                      <p>
                        <span className="arrow" aria-hidden="true">
                          →
                        </span>{" "}
                        {g.next}
                      </p>
                    </div>
                  </div>
                  <p className="gain-impact">{g.impact}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <footer className="porte-foot">
          {copy.foot.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </footer>
      </div>
    </section>
  );
}
