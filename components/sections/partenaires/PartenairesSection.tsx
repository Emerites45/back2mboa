import Image from "next/image";
import { PARTENAIRES_COPY, partenaireInitiales } from "@/data/partenaires";
import type { Partenaire } from "@/types/partenaires";
import { CAMEROON_OUTLINE_PATH } from "./cameroon-path";
import "./PartenairesSection.css";

function CameroonDotsMap() {
  return (
    <div className="partners-map" aria-hidden="true">
      <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="partners-cmr-dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="7" cy="7" r="1.6" fill="#c8d0c8" />
          </pattern>
        </defs>
        <path
          d={CAMEROON_OUTLINE_PATH}
          fill="url(#partners-cmr-dots)"
          stroke="#c8d0c8"
          strokeWidth="2"
          strokeDasharray="1.8 5.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function LogoTrack({ items, extraClass }: { items: Partenaire[]; extraClass: string }) {
  const loop = [...items, ...items];
  return (
    <div className={`partners-track ${extraClass}`}>
      {loop.map((item, i) => (
        <span key={`${item.nom}-${i}`} className="partners-logo" title={`${item.nom} — ${item.sous}`}>
          <span className="partners-glyph">
            {item.icon ? (
              <img src={item.icon} alt="" className="partners-icon" />
            ) : (
              partenaireInitiales(item.nom)
            )}
          </span>
          {item.nom}
          <small>{item.sous}</small>
        </span>
      ))}
    </div>
  );
}

function Door({ src }: { src: string }) {
  return (
    <div className="partners-door">
      <span className="partners-door-glow" aria-hidden="true" />
      <Image src={src} alt="" width={320} height={320} className="partners-archway-img" />
    </div>
  );
}

export function PartenairesSection() {
  const copy = PARTENAIRES_COPY;

  return (
    <section id="partenaires" className="partners" aria-labelledby="partenaires-title">
      <CameroonDotsMap />

      <div className="partners-intro">
        <span className="partners-eyebrow">{copy.eyebrow}</span>
        <h2 id="partenaires-title">
          {copy.titleBefore}
          <em>{copy.titleAccent}</em>.
        </h2>
        <p>{copy.body}</p>
      </div>

      <div className="partners-bands">
        <div className="partners-band is-enter">
          <div className="partners-big">
            BÂTISSEURS
            <br />
            DE PROSPÉRITÉ
            <span className="partners-bar" />
          </div>
          <div className="partners-corridor">
            <LogoTrack items={copy.enter} extraClass="is-in" />
          </div>
          <Door src="/images/layer-stone-archway_right.webp" />
        </div>

        <div className="partners-band is-exit">
          <Door src="/images/layer-stone-archway_left.webp" />
          <div className="partners-corridor">
            <LogoTrack items={copy.exit} extraClass="is-out" />
          </div>
          <div className="partners-big">
            VISIONNAIRES
            <span className="partners-bar" />
          </div>
        </div>
      </div>

      <div className="partners-legend">
        <div className="partners-leg">
          <b>
            <i>↗</i> {copy.legendEnterTitle.replace(/^↗\s*/, "")}
          </b>
          <p>{copy.legendEnterBody}</p>
        </div>
        <div className="partners-leg">
          <b>
            <i>↘</i> {copy.legendExitTitle.replace(/^↘\s*/, "")}
          </b>
          <p>{copy.legendExitBody}</p>
        </div>
      </div>
    </section>
  );
}
