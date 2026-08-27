import Image from "next/image";
import Link from "next/link";
import "./BatisseursSection.css";

export function BatisseursSection() {
  return (
    <div className="b2m-bat">
      <section className="snap" id="preuves-chiffres">
        <div className="snap-inner">
          <div className="snap-grid">
            <div className="snap-left">
              <h2>Des Bâtisseurs qui ont déjà fait leurs preuves</h2>
              <p>
                Back2Mboa n’est pas une idée sur papier. C’est une équipe avec
                15 ans de terrain, et deux éditions pilotes déjà mesurées.
              </p>
              <p className="note">
                Preuves 2022–2023 · MEET Administrations &amp; MEET Écosystème ·
                Continuité institutionnelle et diaspora.
              </p>
            </div>

            <div className="snap-right">
              <div className="snap-meta">
                <span>
                  <strong>Back2Mboa</strong> — trajectoire consolidée
                </span>
                <span>Indicateurs clés</span>
              </div>

              <div className="hero-num">
                5<span>Md FCFA</span>
              </div>
              <p
                style={{
                  fontSize: ".95rem",
                  color: "var(--muted)",
                  marginBottom: 8,
                }}
              >
                mobilisés autour des initiatives portées
              </p>

              <div className="metrics">
                <div className="metric">
                  <b>5 000+</b>
                  <span>Membres diaspora mobilisables</span>
                </div>
                <div className="metric">
                  <b>50+</b>
                  <span>Institutions partenaires</span>
                </div>
                <div className="metric">
                  <b>15+</b>
                  <span>Années d’expérience</span>
                </div>
                <div className="metric">
                  <b>2 000+</b>
                  <span>Entrepreneurs en réseau</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="proof" id="preuves-equipe">
        <div className="proof-inner">
          <div className="proof-head">
            <div className="proof-eyebrow">L’équipe derrière la promesse</div>
            <h2>Pas une structure improvisée — un parcours tracé</h2>
            <p>
              Des femmes et des hommes qui ont déjà mobilisé des réseaux, formé
              des milliers de jeunes et conduit des projets complexes à fort
              impact.
            </p>
          </div>

          <article className="row">
            <div>
              <h3 className="row-title">Olivia Mukam Wandji</h3>
              <p
                style={{
                  fontSize: ".88rem",
                  fontWeight: 600,
                  color: "var(--vert)",
                  marginTop: 6,
                }}
              >
                Présidente Fondatrice
              </p>
              <Link className="row-cta" href="#ressources" aria-label="En savoir plus">
                →
              </Link>
            </div>
            <div className="row-body">
              <ul>
                <li>
                  Fondatrice de Harambe-Cameroun (2008), devenue Solutionneurs
                  Initiative
                </li>
                <li>Certifiée PMP — 10+ ans de gestion de projets</li>
                <li>
                  A géré des projets de plus de 2 M$ avec des équipes de 300+
                  personnes
                </li>
                <li>Conseillère en Investissement Pays, Afrilanthropy</li>
                <li>Conseil consultatif Microsoft Afrique (2013–2016)</li>
                <li>
                  Projets pour le Département d’État américain au Cameroun
                  (2013–2017)
                </li>
              </ul>
            </div>
            <div className="row-img">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                alt="Leadership et direction de projet"
                width={480}
                height={300}
              />
            </div>
          </article>

          <article className="row">
            <div>
              <h3 className="row-title">Solutionneurs Initiative</h3>
              <p
                style={{
                  fontSize: ".88rem",
                  fontWeight: 600,
                  color: "var(--vert)",
                  marginTop: 6,
                }}
              >
                ex-Harambe-Cameroun
              </p>
              <Link
                className="row-cta"
                href="#salon"
                aria-label="En savoir plus"
              >
                →
              </Link>
            </div>
            <div className="row-body">
              <ul>
                <li>7 000 jeunes formés dans les 10 régions du Cameroun</li>
                <li>
                  7 entreprises créées via le concours annuel de plans
                  d’affaires
                </li>
                <li>10 à 15 emplois créés par entreprise lauréate</li>
                <li>
                  Partenaire reconnu du Fonds Fiduciaire d’Urgence de l’UE pour
                  l’Afrique
                </li>
              </ul>
            </div>
            <div className="row-img">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                alt="Communauté et formation de jeunes"
                width={480}
                height={300}
              />
            </div>
          </article>

          <blockquote className="quote-block">
            <p>
              « Plus qu’une équipe organisatrice, Back2Mboa est porté par des
              femmes et des hommes qui ont déjà démontré leur capacité à
              mobiliser des réseaux, fédérer des communautés et conduire des
              initiatives complexes à fort impact. »
            </p>
            <footer>
              — Équipe Back2Mboa · 15 ans de terrain · 2 éditions pilotes
              mesurées
            </footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
}
