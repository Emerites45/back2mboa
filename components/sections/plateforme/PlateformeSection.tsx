"use client";

import { useState } from "react";
import Link from "next/link";
import { PLATEFORME_COPY, PLATEFORME_PROFILES } from "@/data/plateforme";
import type { PlateformeProfileId } from "@/types/plateforme";
import "./PlateformeSection.css";

export function PlateformeSection() {
  const [activeId, setActiveId] = useState<PlateformeProfileId>("maires");
  const profile = PLATEFORME_PROFILES.find((p) => p.id === activeId) ?? PLATEFORME_PROFILES[0];

  return (
    <section
      id="plateforme"
      className="plateforme"
      aria-labelledby="plateforme-title"
    >
      <div className="plateforme-inner">
        <header className="plateforme-intro">
          <p className="plateforme-kicker">{PLATEFORME_COPY.kicker}</p>
          <h2 id="plateforme-title" className="plateforme-title">
            {PLATEFORME_COPY.title}
          </h2>
          <p className="plateforme-subtitle">{PLATEFORME_COPY.subtitle}</p>
        </header>

        <div className="plateforme-tabs" role="tablist" aria-label="Profils Back2Mboa">
          {PLATEFORME_PROFILES.map((item) => {
            const selected = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`plateforme-tab-${item.id}`}
                aria-selected={selected}
                aria-controls="plateforme-panel"
                className={`plateforme-tab${selected ? " is-active" : ""}`}
                onClick={() => setActiveId(item.id)}
              >
                {item.tab}
              </button>
            );
          })}
        </div>

        <div
          id="plateforme-panel"
          className="plateforme-panel"
          role="tabpanel"
          aria-labelledby={`plateforme-tab-${profile.id}`}
        >
          <div className="plateforme-aside">
            {profile.title && <h3 className="plateforme-role">{profile.title}</h3>}
            {profile.body && <p className="plateforme-body">{profile.body}</p>}
            {profile.cta && (
              <Link href="/inscription" className="plateforme-cta">
                {profile.cta}
              </Link>
            )}
          </div>

          {profile.cards.length > 0 && (
            <div className="plateforme-cards">
              {profile.cards.map((card) => (
                <article key={card.today} className="plateforme-card">
                  <div className="plateforme-card-col">
                    <p className="plateforme-card-label is-today">AUJOURD’HUI –</p>
                    <p className="plateforme-card-text">{card.today}</p>
                  </div>
                  <div className="plateforme-card-col">
                    <p className="plateforme-card-label is-b2m">AVEC BACK2MBOA –</p>
                    <p className="plateforme-card-text is-solution">
                      <span className="plateforme-arrow" aria-hidden="true">
                        →
                      </span>
                      {card.withB2m}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
