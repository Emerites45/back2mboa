import Link from "next/link";
import { PRELUDE_COPY } from "@/data/prelude";
import type { PreludeBlock } from "@/types/prelude";
import { PreludeBrickRing } from "./PreludeBrickRing";
import { PreludeRingAnimation } from "./PreludeRingAnimation";
import "./PreludeSection.css";

function Tags({ tags }: { tags: PreludeBlock["tags"] }) {
  if (!tags.length) return null;
  return (
    <ul className="prelude-tags">
      {tags.map((tag) => (
        <li key={tag.label} className={`prelude-tag is-${tag.tone}`}>
          {tag.label}
        </li>
      ))}
    </ul>
  );
}

function BlockCard({ block }: { block: PreludeBlock }) {
  const rich = Boolean(block.lead || block.points?.length);

  return (
    <div className={`prelude-card${rich ? " is-rich" : ""}`}>
      <div className="prelude-card-top">
        <span className="prelude-badge" aria-hidden="true">
          {block.index}
        </span>
        <h3 id={`prelude-${block.id}-title`} className="prelude-card-title">
          {block.title}
        </h3>
        {block.lead ? <p className="prelude-card-lead">{block.lead}</p> : null}
      </div>

      {block.body ? <p className="prelude-card-body">{block.body}</p> : null}

      {block.points?.length ? (
        <ul className="prelude-points">
          {block.points.map((point) => (
            <li key={point.slice(0, 48)}>
              <span className="prelude-check" aria-hidden="true">
                ✓
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <Tags tags={block.tags} />
    </div>
  );
}

function BlockRow({ block }: { block: PreludeBlock }) {
  const media = block.image ? (
    <div className={`prelude-media is-${block.id}`} aria-hidden={false}>
      {/*
        Cadre = hauteur de la carte (grid stretch).
        Photo en calque absolu + background-size: cover → formes intactes.
      */}
      <div
        className="prelude-media-fill"
        role="img"
        aria-label={block.imageAlt ?? ""}
        style={{
          backgroundImage: `url(${block.image})`,
          backgroundPosition: block.imageFocus ?? "center top",
        }}
      />
    </div>
  ) : null;

  const card = <BlockCard block={block} />;

  return (
    <article
      className={`prelude-row is-${block.layout}`}
      aria-labelledby={`prelude-${block.id}-title`}
    >
      {block.layout === "media-left" ? (
        <>
          {media}
          {card}
        </>
      ) : (
        <>
          {card}
          {media}
        </>
      )}
    </article>
  );
}

export function PreludeSection() {
  const copy = PRELUDE_COPY;

  return (
    <section
      className="b2m-prelude"
      id="prelude-mission"
      aria-labelledby="prelude-title"
    >
      <div className="prelude-inner">
        <header className="prelude-head">
          <p className="prelude-eyebrow">{copy.eyebrow}</p>
          <div className="prelude-ring" aria-hidden="true">
            <PreludeBrickRing />
            <span className="prelude-ring-thumb">
              <PreludeRingAnimation />
            </span>
          </div>
          <h2 id="prelude-title" className="prelude-title">
            {copy.title}
          </h2>
          <p className="prelude-sub">{copy.subtitle}</p>
        </header>

        <div className="prelude-stack">
          {copy.blocks.map((block) => (
            <BlockRow key={block.id} block={block} />
          ))}
        </div>

        <footer className="prelude-foot">
          <div className="prelude-foot-meta" aria-label="Calendrier">
            {copy.foot.map((line, i) => (
              <span key={line} className="prelude-foot-item">
                {i > 0 ? <span className="prelude-foot-sep" aria-hidden="true" /> : null}
                {line}
              </span>
            ))}
          </div>

          <Link className="prelude-btn is-contact" href={copy.contactCta.href}>
            {copy.contactCta.label}
          </Link>
        </footer>
      </div>
    </section>
  );
}
