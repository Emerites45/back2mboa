import Image from "next/image";
import Link from "next/link";
import { PRELUDE_COPY } from "@/data/prelude";
import type { PreludeBlock } from "@/types/prelude";
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
  const isCta = block.variant === "cta";

  return (
    <div className={`prelude-card${isCta ? " is-cta" : ""}`}>
      <span className="prelude-badge" aria-hidden="true">
        {block.index}
      </span>
      <h3 id={`prelude-${block.id}-title`} className="prelude-card-title">
        {block.title}
      </h3>
      <p className="prelude-card-body">{block.body}</p>

      {block.packs ? (
        <div className="prelude-packs">
          {block.packs.map((pack) => (
            <div className="prelude-pack" key={pack.title}>
              <strong>{pack.title}</strong>
              <span>{pack.body}</span>
            </div>
          ))}
        </div>
      ) : null}

      <Tags tags={block.tags} />

      {block.primaryCta || block.secondaryCta ? (
        <div className="prelude-actions">
          {block.primaryCta ? (
            <Link className="prelude-btn is-primary" href={block.primaryCta.href}>
              {block.primaryCta.label}
            </Link>
          ) : null}
          {block.secondaryCta ? (
            <Link className="prelude-btn is-ghost" href={block.secondaryCta.href}>
              {block.secondaryCta.label}
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function BlockRow({ block }: { block: PreludeBlock }) {
  const media = (
    <div className="prelude-media">
      <Image
        src={block.image}
        alt={block.imageAlt}
        fill
        sizes="(max-width: 900px) 100vw, 50vw"
        className="prelude-media-img"
      />
    </div>
  );
  const card = <BlockCard block={block} />;

  return (
    <article
      className={`prelude-row is-${block.layout}${block.variant === "cta" ? " is-cta-row" : ""}`}
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
          <div className="prelude-head-copy">
            <p className="prelude-eyebrow">{copy.eyebrow}</p>
            <h2 id="prelude-title" className="prelude-title">
              {copy.title}
            </h2>
            <p className="prelude-sub">{copy.subtitle}</p>
          </div>

          <div className="prelude-ring" aria-hidden="true">
            <span className="prelude-ring-orbit" />
            <span className="prelude-ring-thumb">
              <Image
                src={copy.ringImage}
                alt=""
                width={72}
                height={72}
                className="prelude-ring-img"
              />
            </span>
          </div>
        </header>

        <div className="prelude-stack">
          {copy.blocks.map((block) => (
            <BlockRow key={block.id} block={block} />
          ))}
        </div>

        <footer className="prelude-foot">
          {copy.foot.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </footer>
      </div>
    </section>
  );
}
