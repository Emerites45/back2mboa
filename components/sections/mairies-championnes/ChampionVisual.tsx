import Image from "next/image";
import type { ChampionVisualTheme } from "@/types/mairies-championnes";

type ChampionVisualProps = {
  theme: ChampionVisualTheme;
  kicker: string;
  caption: string;
  image: string;
};

export function ChampionVisual({
  theme,
  kicker,
  caption,
  image,
}: ChampionVisualProps) {
  return (
    <div className={`champ-stack theme-${theme}`} aria-hidden="true">
      <div className="champ-card is-back" />
      <div className="champ-card is-mid" />
      <div className="champ-card is-front">
        <Image
          className="champ-photo"
          src={image}
          alt=""
          fill
          sizes="(max-width: 1024px) 80vw, 280px"
        />
        <span className="champ-photo-veil" />
        <span className="champ-card-copy">
          <small>{kicker}</small>
          <strong>{caption}</strong>
        </span>
      </div>
    </div>
  );
}
