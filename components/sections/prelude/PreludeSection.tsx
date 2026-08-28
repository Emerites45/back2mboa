import type { CSSProperties } from "react";
import Link from "next/link";
import { buildSceneSvg } from "@/lib/scene-svg";
import "./PreludeSection.css";

const CITY = buildSceneSvg("city", 301, "prelude-city");
const MUSEUM = buildSceneSvg("museum", 302, "prelude-mus");

/** Carte image — `height` = plancher de ligne ; le texte peut l’allonger. */
const CARD = {
  width: 520,
  height: 360,
  radius: 10,
} as const;

const cardVars = {
  ["--prelude-card-w" as string]: `${CARD.width}px`,
  ["--prelude-card-h" as string]: `${CARD.height}px`,
  ["--prelude-card-r" as string]: `${CARD.radius}px`,
} as CSSProperties;

export function PreludeSection() {
  return (
    <div className="b2m-prelude" style={cardVars}>
      <section className="prelude" id="prelude-mission" aria-labelledby="prelude-title">
        <h2 id="prelude-title" className="prelude-title">
          Avant Yaoundé : former, capter, signer.
        </h2>

        <article className="block lead">
          <div
            className="block-media"
            role="img"
            aria-label="Europe — 1er au 7 décembre 2026"
          >
            <div
              className="block-scene"
              dangerouslySetInnerHTML={{ __html: CITY }}
            />
            <div className="block-veil" />
            <span className="block-tag">Europe — 1er au 7 décembre 2026</span>
          </div>
          <div className="block-body">
            <p className="block-date">Le Salon de la Diaspora</p>
            <h3>
              Une semaine en Europe.{" "}
              <em>Des engagements signés avant Yaoundé.</em>
            </h3>
            <p>
              Le Salon se tient le 4 décembre. Autour de lui, Back2Mboa
              construit une semaine entière, du 1er au 7 décembre. Les
              délégations territoriales ne viennent pas exposer : elles
              viennent conclure.
            </p>
            <ul className="gains">
              <li>
                <span aria-hidden="true">✓</span>
                <span>
                  <b>Des deals fermés sur place</b> — les rendez-vous
                  d’affaires sont pré-arrangés, pas improvisés sur un stand.
                </span>
              </li>
              <li>
                <span aria-hidden="true">✓</span>
                <span>
                  <b>Des visites d’entreprises et de ports</b> — vos équipes
                  voient les procédés et les infrastructures qu’elles veulent
                  répliquer.
                </span>
              </li>
              <li>
                <span aria-hidden="true">✓</span>
                <span>
                  <b>Une visibilité auprès de la diaspora mobilisable</b> —
                  celle qui investit, pas celle qui commente.
                </span>
              </li>
              <li>
                <span aria-hidden="true">✓</span>
                <span>
                  <b>Les mêmes interlocuteurs retrouvés à Yaoundé</b> — dix
                  jours plus tard, la conversation reprend où elle s’est
                  arrêtée.
                </span>
              </li>
            </ul>
            <div className="tags">
              <span className="tag">Salon le 4 décembre</span>
              <span className="tag">Visites d’entreprises</span>
              <span className="tag">Visites de ports</span>
              <span className="tag">Rendez-vous d’affaires</span>
              <span className="tag">Délégations territoriales</span>
            </div>
          </div>
        </article>

        <article
          className="block reverse"
          style={{ ["--acc" as string]: "var(--terre)" }}
        >
          <div
            className="block-media"
            role="img"
            aria-label="Octobre 2026 — en ligne et en présentiel"
          >
            <div
              className="block-scene"
              dangerouslySetInnerHTML={{ __html: MUSEUM }}
            />
            <div className="block-veil" />
            <span className="block-tag">
              Octobre 2026 — en ligne et en présentiel
            </span>
          </div>
          <div className="block-body">
            <p className="block-date">La Masterclass — en prélude</p>
            <h3>
              Un territoire bien présenté{" "}
              <em>repart avec des rendez-vous</em>.
            </h3>
            <p>
              Deux mois avant le Salon, la Masterclass prépare les Décideurs
              et Intendants territoriaux. L’objectif est simple : arriver en
              Europe avec un dossier qu’un investisseur peut instruire, pas
              avec une intention.
            </p>
            <ul className="gains">
              <li>
                <span aria-hidden="true">✓</span>
                <span>
                  <b>Un pitch de territoire en trois minutes</b> — chiffres,
                  besoin, retour attendu. Rien d’autre.
                </span>
              </li>
              <li>
                <span aria-hidden="true">✓</span>
                <span>
                  <b>Une fiche d’opportunité par commune</b> — le format que
                  les Investisseurs et PTF acceptent de lire.
                </span>
              </li>
              <li>
                <span aria-hidden="true">✓</span>
                <span>
                  <b>Un marketing territorial qui tient</b> — ce que la
                  commune offre, pas ce qui lui manque.
                </span>
              </li>
              <li>
                <span aria-hidden="true">✓</span>
                <span>
                  <b>Des délégations prêtes</b> — celles qui n’ont pas préparé
                  perdent leur semaine en Europe.
                </span>
              </li>
            </ul>
            <div className="tags">
              <span className="tag">Pitch en 3 minutes</span>
              <span className="tag">Fiches d’opportunité</span>
              <span className="tag">Marketing territorial</span>
              <span className="tag">Préparation des délégations</span>
            </div>
          </div>
        </article>

        <p className="prelude-sub">
          En décembre, les territoires vont d’abord chercher ce que la diaspora
          a à offrir. Deux semaines plus tard, la diaspora vient chercher ce
          que les territoires ont à offrir. C’est la même route, parcourue
          dans les deux directions.
        </p>
        <div className="prelude-foot">
          <Link className="btn-jaune" href="/inscription">
            Nous rejoindre
          </Link>
        </div>
      </section>
    </div>
  );
}
