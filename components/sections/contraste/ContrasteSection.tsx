import Image from "next/image";
import { CONTRASTE_ACTORS, CONTRASTE_COPY } from "@/data/contraste";
import "./ContrasteSection.css";

export function ContrasteSection() {
  return (
    <section
      id="contraste"
      className="contraste-section"
      aria-labelledby="contraste-title"
    >
      <div className="contraste-bg-image">
        <Image
          src="/images/contraste/homme.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </div>

      <div className="contraste-container">
        <div className="contraste-text">
          <span className="contraste-kicker">{CONTRASTE_COPY.kicker}</span>
          <h2 id="contraste-title" className="contraste-title">
            {CONTRASTE_COPY.titleLines.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </h2>
          <p className="contraste-lead">
            {CONTRASTE_COPY.descriptionLines.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>

        <div className="contraste-cards-wrapper">
          <div className="contraste-cards">
            {CONTRASTE_ACTORS.map((actor) => (
              <article key={actor.id} className="contraste-card">
                <h3 className="contraste-card-title">{actor.label}</h3>
                <p className="contraste-card-quote">« {actor.quote} »</p>
                <div className="contraste-card-tags">
                  {actor.sentiments.join(" · ")}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
