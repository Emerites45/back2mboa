import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  MODELE_CARDS,
  MODELE_COPY,
  SECTOR_ACCENT,
  maillonsForSector,
  metricsForSector,
} from "@/data/modele";
import { ModeleClawsDecor } from "./ModeleClawsDecor";
import { SectorVisual } from "./SectorVisual";
import "./ModeleSection.css";

function TitleWithAmp({ title }: { title: string }) {
  const idx = title.lastIndexOf(" & ");
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)} <span className="modele-amp">&</span>{" "}
      {title.slice(idx + 3)}
    </>
  );
}

export function ModeleSection() {
  return (
    <section id="modele" className="modele" aria-labelledby="modele-title">
      <ModeleClawsDecor />
      <div className="modele-inner">
        <header className="modele-header">
          <p className="modele-kicker">{MODELE_COPY.kicker}</p>
          <h2 id="modele-title" className="modele-title">
            {MODELE_COPY.titleLead}{" "}
            {MODELE_COPY.titleAccent}
          </h2>
          <p className="modele-subtitle">{MODELE_COPY.subtitle}</p>
        </header>

        <ul className="modele-grid">
          {MODELE_CARDS.map((card) => {
            const metrics = metricsForSector(card.id);
            const maillons = maillonsForSector(card.id);
            const accent = SECTOR_ACCENT[card.id];

            return (
              <li key={card.id}>
                <Link
                  href="#potentialites"
                  className="modele-card"
                  style={
                    {
                      "--mod-sector": accent,
                    } as CSSProperties
                  }
                  aria-label={`${card.title}. ${maillons.length} maillons de valeur. ${metrics.communeCount} ${metrics.communeLabel}. Explorer les opportunités.`}
                >
                  <SectorVisual
                    visual={card.visual}
                    image={card.image}
                    imagePosition={card.imagePosition}
                    chart={card.id === "finance"}
                  />
                  <span className="modele-expand" aria-hidden="true">
                    <ArrowUpRight size={16} strokeWidth={1.75} />
                  </span>

                  <span className="modele-card-body modele-card-face">
                    <span className="modele-badge">
                      {card.index} / {card.category}
                    </span>
                    <span className="modele-card-title">
                      <TitleWithAmp title={card.title} />
                    </span>
                    <span className="modele-card-desc">{card.description}</span>
                    <span className="modele-metrics">
                      <span>
                        <strong>{metrics.communeCount}</strong>
                        <small>{metrics.communeLabel}</small>
                      </span>
                      <span className="modele-metrics-sep" aria-hidden="true" />
                      <span>
                        <strong>{metrics.habitantsValue}</strong>
                        <small>habitants</small>
                      </span>
                    </span>
                  </span>

                  <span className="modele-card-reveal" aria-hidden="true">
                    <span className="modele-reveal-head">
                      <span className="modele-reveal-kicker">
                        Chaîne de valeur
                      </span>
                      <span className="modele-reveal-title">
                        <TitleWithAmp title={card.title} />
                      </span>
                    </span>

                    <ul className="modele-rows">
                      {maillons.map((maillon, i) => (
                        <li
                          className="modele-row"
                          key={maillon}
                          style={{ ["--mi" as string]: i } as CSSProperties}
                        >
                          <span className="modele-row-inner">
                            <span className="modele-row-mark" aria-hidden="true" />
                            <span className="modele-row-label">{maillon}</span>
                          </span>
                        </li>
                      ))}
                    </ul>

                    <span className="modele-reveal-foot">
                      Voir les opportunités
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
