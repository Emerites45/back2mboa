import type { CSSProperties } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/** Typo section — taille, graisse, police. */
const TYPE = {
  titleFont: "var(--font-bricolage)",
  titleSize: "clamp(1.75rem, 4.4vw, 3.75rem)",
  titleWeight: 700,
  /** Style Figma Subtitle → Roboto (corps page). */
  subtitleFont: "var(--font-roboto)",
  subtitleSize: "1rem",
  subtitleWeight: 400,
  labelSize: "0.8125rem",
  labelWeight: 400,
  valueSize: "0.9375rem",
  valueWeight: 400,
} as const;

/** Mini-carte image 2 — ajuster ici. */
const MINI_CARD = {
  width: "13.5rem",
  height: "18rem",
  borderRadius: "33px",
  padding: "0.625rem",
  background: "#2a2a2a",
  imageRadius: "18px",
  /** Distance depuis le bas du grand bloc (0 = aligné). */
  bottom: "0px",
  /** Distance depuis le bord droit de la colonne. */
  right: "10px",
  offsetX: "0px",
  offsetY: "0px",
} as const;

const STATS = [
  {
    label: "Mairies/CTD",
    value: "40 couvrant les 10 régions & 20 de 6 régions",
  },
  { label: "Entrepreneurs diaspora", value: "35 & 70" },
  { label: "Satisfaction CTD", value: "89 %" },
  { label: "Satisfaction entrepreneurs", value: "97 %" },
  { label: "Renforcement de capacité", value: "91 %" },
  { label: "Mises en relation", value: "60+" },
  { label: "Portée numérique", value: "60 000+" },
] as const;

function ResultatImage({
  src,
  alt,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  className: string;
  sizes: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-[#2a2a2a]", className)}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

export function ResultatsSection() {
  return (
    <section
      id="resultats"
      className="relative z-10 h-dvh overflow-hidden rounded-t-[30px] bg-black"
      aria-labelledby="resultats-heading"
    >
      <Reveal className="grid h-full gap-2.5 p-2.5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <ResultatImage
          src="/images/resultat_1-1920.webp"
          alt="Participante d'une édition pilote Back2Mboa"
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="h-full min-h-0 rounded-[30px]"
        />

        <div
          className="relative flex min-h-0 flex-col px-5 pt-6 pb-0 text-white sm:px-8 sm:pt-8 lg:px-10 lg:pt-10"
          style={{ "--mini-card-w": MINI_CARD.width } as CSSProperties}
        >
          <h2
            id="resultats-heading"
            className="tracking-[-0.03em] text-balance"
            style={{
              fontFamily: TYPE.titleFont,
              fontSize: TYPE.titleSize,
              fontWeight: TYPE.titleWeight,
            }}
          >
            Résultats Des Éditions Pilotes
          </h2>
          <p
            className="mt-3 text-pretty text-white/65"
            style={{
              fontFamily: TYPE.subtitleFont,
              fontSize: TYPE.subtitleSize,
              fontWeight: TYPE.subtitleWeight,
            }}
          >
            La preuve par les chiffres (2022 &amp; 2023)
          </p>

          <dl className="mt-8 flex max-w-[28rem] flex-col gap-4 pr-[calc(var(--mini-card-w)+1.5rem)] lg:mt-10">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt
                  className="leading-snug text-white/55"
                  style={{
                    fontFamily: TYPE.subtitleFont,
                    fontSize: TYPE.labelSize,
                    fontWeight: TYPE.labelWeight,
                  }}
                >
                  {stat.label}
                </dt>
                <dd
                  className="mt-0.5 leading-snug text-pretty tabular-nums"
                  style={{
                    fontFamily: TYPE.subtitleFont,
                    fontSize: TYPE.valueSize,
                    fontWeight: TYPE.valueWeight,
                  }}
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <article
            className="absolute flex flex-col overflow-hidden"
            style={
              {
                width: MINI_CARD.width,
                height: MINI_CARD.height,
                borderRadius: MINI_CARD.borderRadius,
                padding: MINI_CARD.padding,
                backgroundColor: MINI_CARD.background,
                bottom: MINI_CARD.bottom,
                right: MINI_CARD.right,
                transform: `translate(${MINI_CARD.offsetX}, ${MINI_CARD.offsetY})`,
              } as CSSProperties
            }
          >
            <Image
              src="/images/resultat_2.webp"
              alt="Participants des éditions pilotes Back2Mboa"
              width={302}
              height={205}
              sizes={MINI_CARD.width}
              className="h-auto w-full"
              style={{ borderRadius: MINI_CARD.imageRadius }}
            />
          </article>
        </div>
      </Reveal>
    </section>
  );
}
