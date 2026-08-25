import Link from "next/link";
import {
  ArrowLeftRight,
  CalendarCheck,
  FileSpreadsheet,
  Handshake,
  Landmark,
  LineChart,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "./ComparatifSection.css";

type StarsValue = 1 | 1.5 | 2 | 2.5 | 3 | 4.5 | 5;

type Row = {
  Icon: LucideIcon;
  title: string;
  hint: string;
  classic: StarsValue;
  forum: StarsValue;
  b2m: StarsValue;
  why: string;
};

const ROWS: Row[] = [
  {
    Icon: Users,
    title: "Matching structuré",
    hint: "Qui est mis en face de qui, et sur quel projet précis ?",
    classic: 2,
    forum: 2.5,
    b2m: 5,
    why: "Chaque Solutionneur est relié à un besoin territorial déjà qualifié (Mayor Call). Moins de « networking vague », plus de rendez-vous qui peuvent devenir des contrats.",
  },
  {
    Icon: FileSpreadsheet,
    title: "Opportunités investissables",
    hint: "Le projet est-il crédible, chiffré, finançable ?",
    classic: 1.5,
    forum: 2,
    b2m: 5,
    why: "Méthode CAP — les opportunités sont qualifiées avant l’événement. Un investisseur lit un dossier, pas un slogan. Décision plus rapide, tickets plus sérieux.",
  },
  {
    Icon: Landmark,
    title: "Ancrage territorial (CTD / mairies)",
    hint: "Le maire et la commune sont-ils au centre du jeu ?",
    classic: 1,
    forum: 2,
    b2m: 5,
    why: "6 mairies championnes × 6 secteurs. Le territoire publie le besoin, reçoit les offres, garde la main sur la mise en œuvre — et sur les recettes futures (fiscalité, PPP, services).",
  },
  {
    Icon: CalendarCheck,
    title: "Continuité après l’événement",
    hint: "Que se passe-t-il le lundi suivant ?",
    classic: 1,
    forum: 2,
    b2m: 5,
    why: "La plateforme (jumeau numérique) et les Deal Rooms restent ouvertes. Les dossiers avancent, les contrats se négocient, le suivi est tracé — pas une carte de visite oubliée dans un tote bag.",
  },
  {
    Icon: Handshake,
    title: "Passage à l’acte (contrats / finance)",
    hint: "Y a-t-il un chemin clair vers la signature et le financement ?",
    classic: 1.5,
    forum: 2,
    b2m: 5,
    why: "Objectif explicite = deals. Deal Rooms, offtakers, financeurs et mairies autour de la même table. Ce que vous mesurez : lettres d’intention, PPP, tickets d’investissement — pas le nombre de selfies.",
  },
  {
    Icon: ArrowLeftRight,
    title: "Double flux diaspora ↔ territoire",
    hint: "Les deux côtés gagnent-ils concrètement ?",
    classic: 1,
    forum: 3,
    b2m: 5,
    why: "La diaspora trouve des projets bancables ; le territoire trouve des compétences et des capitaux. Résultat : emplois locaux, recettes municipales, actifs structurés — pas seulement des transferts familiaux.",
  },
  {
    Icon: LineChart,
    title: "Mesure des résultats",
    hint: "Peut-on prouver l’impact après 6–12 mois ?",
    classic: 1,
    forum: 2,
    b2m: 4.5,
    why: "Indicateurs suivis (mises en relation qualifiées, dossiers CAP, deals en cours). Les pilotes 2022–2023 ont déjà livré des chiffres. On itère sur des preuves, pas sur des promesses.",
  },
];

function Stars({ value }: { value: StarsValue }) {
  const full = Math.floor(value);
  const half = value % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="stars" aria-label={`${value} sur 5`}>
      {Array.from({ length: full }, (_, i) => (
        <i key={`f${i}`} className="fa-solid fa-star" />
      ))}
      {half ? <i className="fa-solid fa-star-half-stroke" /> : null}
      {Array.from({ length: empty }, (_, i) => (
        <i key={`e${i}`} className="fa-solid fa-star empty" />
      ))}
    </div>
  );
}

export function ComparatifSection() {
  return (
    <div className="b2m-cmp">
      <section className="cmp" id="comparatif">
        <div className="cmp-inner">
          <div className="cmp-eyebrow">Pourquoi Back2Mboa</div>
          <h2 className="cmp-title">
            Pas un salon de plus. Un système qui produit des deals.
          </h2>
          <p className="cmp-sub">
            Comparaison honnête avec les formats habituels. Les étoiles mesurent
            la capacité réelle à transformer une rencontre en contrat, en projet
            financé, en recettes pour le territoire.
          </p>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th className="col-classic">Salons classiques</th>
                  <th className="col-forum">Forums diaspora</th>
                  <th className="col-b2m">
                    <div className="logo-head">
                      <Link href="#la-bonne-porte" title="Aller à la section La bonne porte">
                        <span
                          style={{
                            fontFamily: "var(--font-bricolage), sans-serif",
                            fontWeight: 800,
                            fontSize: "1.35rem",
                            letterSpacing: "-0.04em",
                            color: "var(--forest)",
                            lineHeight: 1,
                          }}
                        >
                          BACK<span style={{ color: "var(--jaune)" }}>2</span>MBOA
                        </span>
                      </Link>
                      <span className="badge-reco">Recommandé</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.title}>
                    <td>
                      <div className="critere">
                        <i aria-hidden="true">
                          <row.Icon size={16} strokeWidth={2} />
                        </i>
                        <div className="critere-text">
                          {row.title}
                          <span>{row.hint}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Stars value={row.classic} />
                    </td>
                    <td>
                      <Stars value={row.forum} />
                    </td>
                    <td className="cell-b2m">
                      <div className="b2m-block">
                        <Stars value={row.b2m} />
                        <p className="b2m-why">{row.why}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="foot-note">
            <Link className="cta" href="#partenaires">
              <i aria-hidden="true">
                <Handshake size={16} strokeWidth={2} />
              </i>{" "}
              Devenir partenaire / sponsor
            </Link>
            <span>
              Événement 16 · 17 décembre 2026 — Musée National, Yaoundé · 500
              participants
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
