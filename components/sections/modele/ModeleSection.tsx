import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MODELE_CARDS, MODELE_COPY, metricsForSector } from "@/data/modele";
import { SectorVisual } from "./SectorVisual";
import "./ModeleSection.css";

function ClawsMark() {
  return (
    <>
      <path
        className="modele-claw is-green"
        d="M820 28 C 620 70 390 170 70 318 C 62 324 70 338 82 334 C 390 196 610 92 812 52 C 828 48 834 34 820 28 Z"
      />
      <path
        className="modele-claw is-red"
        d="M848 86 C 640 140 400 250 88 402 C 80 408 88 422 100 418 C 400 276 630 164 840 110 C 856 106 862 92 848 86 Z"
      />
      <path
        className="modele-claw is-yellow"
        d="M872 148 C 658 210 412 328 118 478 C 110 484 118 498 130 494 C 412 354 648 236 864 172 C 880 168 886 154 872 148 Z"
      />
    </>
  );
}
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
      <svg
        className="modele-claws"
        viewBox="0 0 900 560"
        fill="none"
        aria-hidden="true"
      >
        <ClawsMark />
      </svg>
      <svg
        className="modele-claws is-opposite"
        viewBox="0 0 900 560"
        fill="none"
        aria-hidden="true"
      >
        <ClawsMark />
      </svg>
      <div className="modele-inner">
        <header className="modele-header">
          <p className="modele-kicker">
            <span className="modele-kicker-line" aria-hidden="true" />
            {MODELE_COPY.kicker}
          </p>
          <h2 id="modele-title" className="modele-title">
            <span>{MODELE_COPY.titleLead}</span>{" "}
            <em>{MODELE_COPY.titleAccent}</em>
          </h2>
          <p className="modele-subtitle">{MODELE_COPY.subtitle}</p>
        </header>

        <ul className="modele-grid">
          {MODELE_CARDS.map((card) => {
            const metrics = metricsForSector(card.id);
            return (
              <li key={card.id}>
                <Link
                  href="#potentialites"
                  className="modele-card"
                  aria-label={`${card.title}. ${metrics.communeCount} ${metrics.communeLabel}. Explorer les opportunités.`}
                >
                  <SectorVisual
                    visual={card.visual}
                    image={card.image}
                    chart={card.id === "finance"}
                  />
                  <span className="modele-expand" aria-hidden="true">
                    <ArrowUpRight size={16} strokeWidth={1.75} />
                  </span>
                  <span className="modele-card-body">
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
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
