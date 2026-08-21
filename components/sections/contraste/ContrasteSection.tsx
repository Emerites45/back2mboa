import { CONTRASTE_ACTORS, CONTRASTE_COPY } from "@/data/contraste";
import "./ContrasteSection.css";

export function ContrasteSection() {
  return (
    <section
      id="contraste"
      className="contraste-section"
      aria-labelledby="contraste-title"
    >
      <div className="contraste-container">
        <header className="contraste-text">
          <p className="contraste-kicker">{CONTRASTE_COPY.kicker}</p>
          <h2 id="contraste-title" className="contraste-title">
            {CONTRASTE_COPY.titleLines.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </h2>
          <p className="contraste-lead">{CONTRASTE_COPY.descriptionLines.join(" ")}</p>
        </header>

        <div className="contraste-cards-wrapper">
          <div className="contraste-cards">
            {CONTRASTE_ACTORS.map((actor) => (
              <article key={actor.id} className="contraste-card">
                <h3 className="contraste-card-title">{actor.label}</h3>
                <p className="contraste-card-quote">« {actor.quote} »</p>
                <p className="contraste-card-tags">{actor.sentiments.join(" · ")}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
