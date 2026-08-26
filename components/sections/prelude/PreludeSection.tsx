import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import "./PreludeSection.css";

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
        <p className="prelude-sub">
          Masterclass d’octobre pour les mairies, puis mission et salon de la
          diaspora en décembre — le premier sens de la flèche : les territoires
          vont vers la diaspora.
        </p>

        <article className="block lead">
          <div className="block-media">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80"
              alt="Masterclass maires et équipes CTD"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
          </div>
          <div className="block-body">
            <p className="block-date">Octobre 2026</p>
            <h3>Masterclass CTD</h3>
            <p>
              Masterclass pratique pour les maires et leurs équipes :
              attractivité territoriale, mobilisation diaspora / investisseurs,
              outils numériques pour augmenter les recettes, cartes
              d’opportunités, pitch investisseur.
            </p>
          </div>
        </article>

        <article className="block reverse">
          <div className="block-media">
            <Image
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80"
              alt="Salon et networking diaspora"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
          </div>
          <div className="block-body">
            <p className="block-date">1–7 décembre 2026 · salon le 4</p>
            <h3>Salon de la Diaspora &amp; mission</h3>
            <p>
              Les territoires rencontrent la diaspora et les partenaires en
              Europe. Point d’orgue : le salon le 4 décembre — visibilité,
              deals, visites d’entreprises et d’infrastructures (ports, sites
              industriels).
            </p>
          </div>
        </article>

        <article className="block block-cta">
          <div className="block-media">
            <Image
              src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&q=80"
              alt="Partenaires et sponsors"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
          </div>
          <div className="block-body">
            <p className="block-date">Packs Vision &amp; Prosperity</p>
            <h3>Partenaires : rejoignez le salon</h3>
            <p>
              L’accès au salon de la diaspora et à la mission est désormais
              inclus dans les packs sponsors. Visibilité, networking décideurs,
              démonstration terrain — tous frais de prise en charge selon le
              niveau.
            </p>
            <div className="packs">
              <div className="pack">
                <strong>Prosperity Partner</strong>
                <span>
                  Prise en charge de <b>2 personnes</b>, tous frais payés —
                  salon + activités mission.
                </span>
              </div>
              <div className="pack">
                <strong>Vision Partner</strong>
                <span>
                  Prise en charge d’<b>1 personne</b>, tous frais payés — salon
                  + activités mission.
                </span>
              </div>
            </div>
            <div className="prelude-actions">
              <Link className="btn-jaune" href="#billets">
                Voir les packs partenaires
              </Link>
              <Link className="btn-ghost" href="#partenaires">
                Nous contacter
              </Link>
            </div>
          </div>
        </article>

        <div className="prelude-foot">
          <span>
            <strong>Masterclass</strong> · octobre 2026
          </span>
          <span>
            <strong>Mission / salon</strong> · 1–7 déc. (salon 4 déc.)
          </span>
          <span>
            <strong>Back2Mboa</strong> · 16–17 déc. · Musée National, Yaoundé
          </span>
        </div>
      </section>
    </div>
  );
}
