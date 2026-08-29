import Image from "next/image";
import type { CSSProperties } from "react";
import type { ChampionVisualTheme } from "@/types/mairies-championnes";

type ChampionVisualProps = {
  theme: ChampionVisualTheme;
  kicker: string;
  caption: string;
  image: string;
  photoCard?: boolean;
  objectPosition?: string;
  objectFit?: "cover" | "contain";
};

export function ChampionVisual({
  theme,
  kicker,
  caption,
  image,
  photoCard = false,
  objectPosition = "center",
  objectFit = "cover",
}: ChampionVisualProps) {
  const photoStyle = {
    objectPosition,
    objectFit,
  } satisfies CSSProperties;

  return (
    <div
      className={`champ-stack theme-${theme}${photoCard ? " is-photo" : ""}${objectFit === "contain" ? " is-contain" : ""}`}
      aria-hidden="true"
    >
      <div className="champ-card is-back" />
      <div className="champ-card is-mid" />
      <div className="champ-card is-front">
        {photoCard && objectFit === "contain" ? (
          <Image
            className="champ-photo-backdrop"
            src={image}
            alt=""
            fill
            sizes="(max-width: 1024px) 80vw, 280px"
            style={{ objectPosition }}
            priority={photoCard}
            aria-hidden
          />
        ) : null}
        <Image
          className="champ-photo"
          src={image}
          alt=""
          fill
          sizes="(max-width: 1024px) 80vw, 280px"
          style={photoCard ? photoStyle : undefined}
          priority={photoCard}
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
