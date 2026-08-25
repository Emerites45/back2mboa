import Image from "next/image";
import "./BeforeDuringAfterSection.css";

const PHASES = [
  {
    id: "before",
    aria: "Before — Qualifier et préparer",
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80",
    alt: "Préparation et qualification des territoires",
    phase: "Before",
    title: "Qualifier & préparer",
    items: [
      "Masterclass CTD (octobre) : attractivité, recettes, pitch",
      "Mayor Calls et fiches CAP structurées",
      "Mission & salon diaspora (1–7 déc., salon 4 déc.)",
      "Matching Solutionneurs ↔ territoires",
    ],
    gain: "Gain : dossiers prêts à financer — moins de blabla, plus de tickets sérieux.",
    date: "Avant · Octobre → début décembre",
    caption: "Before — Qualifier & préparer",
  },
  {
    id: "during",
    aria: "During — Connecter et closer",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",
    alt: "Événement Back2Mboa Deal Rooms",
    phase: "During",
    title: "Connecter & closer",
    items: [
      "Musée National, Yaoundé — 500 participants",
      "Deal Rooms mairies × Solutionneurs × financeurs",
      "Pitchs, signatures, lettres d’intention",
      "6 mairies championnes × 6 secteurs",
    ],
    gain: "Gain : des deals sur table — LOI, PPP, mandats — pas des selfies.",
    date: "Pendant · 16–17 décembre 2026",
    caption: "During — Connecter & closer",
  },
  {
    id: "after",
    aria: "After — Accompagner et mesurer",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
    alt: "Suivi et impact territorial",
    phase: "After",
    title: "Accompagner jusqu’à l’impact",
    items: [
      "Plateforme & suivi des pipelines CAP",
      "Mise en œuvre avec les CTD",
      "Recettes, emplois, actifs structurés",
      "Preuves chiffrées pour itérer",
    ],
    gain: "Gain : prospérité mesurable — cash en caisse, projets livrés, confiance durable.",
    date: "Après · 2027 et au-delà",
    caption: "After — Accompagner & mesurer",
  },
] as const;

export function BeforeDuringAfterSection() {
  return (
    <div className="b2m-bda">
      <section className="bda" id="before-during-after">
        <div className="bda-eyebrow">Approche Back2Mboa</div>
        <h2 className="bda-title">Before. During. After.</h2>
        <p className="bda-sub">
          Pas un événement isolé : un parcours qui qualifie, connecte et
          accompagne jusqu’à l’impact — contrats, recettes, prospérité
          territoriale.
        </p>

        <div className="grid">
          {PHASES.map((p) => (
            <div className="item" key={p.id}>
              <article className="card" tabIndex={0} aria-label={p.aria}>
                <Image
                  className="card-img"
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
                <div className="card-details">
                  <div className="details-phase">{p.phase}</div>
                  <h3 className="details-title">{p.title}</h3>
                  <ul className="details-list">
                    {p.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="details-gain">{p.gain}</div>
                </div>
              </article>
              <div className="caption">
                <div className="caption-meta">
                  <span className="indicator" aria-hidden="true">
                    <span className="indicator-dot" />
                    <span className="indicator-bar" />
                  </span>
                  <span className="caption-date">{p.date}</span>
                </div>
                <h3 className="caption-title">{p.caption}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="bda-foot">
          <span>
            <strong>Before</strong> prépare
          </span>
          <span>
            <strong>During</strong> convertit
          </span>
          <span>
            <strong>After</strong> livre l’impact
          </span>
          <span>Back2Mboa accompagne jusqu’à la prospérité territoriale.</span>
        </div>
      </section>
    </div>
  );
}
