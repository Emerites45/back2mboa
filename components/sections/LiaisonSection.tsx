import type { CSSProperties } from "react";
import Image from "next/image";
import { Bricolage_Grotesque, Inter } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
});

const CARD = {
  color: "#D9D9D9",
  opacity: 0.3,
  blurPx: 6,
  maxWidth: "92rem",
  paddingX: "4rem",
  paddingY: "3.5rem",
  borderRadius: "1.75rem",
  offsetX: "0px",
  offsetY: "-6rem",
  text1Size: "0.8rem",
  text1Color: "#F9F7F0",
  text2Size: "clamp(1.35rem, 4.2vw, 3.75rem)",
  text2Color: "#FFF1DA",
  text3Size: "1.2rem",
  text3Color: "#F9F7F0",
  text3Weight: 200,
} as const;

const FLUX = {
  top: "34%",
  maxWidth: "72rem",
  gap: "0rem",
  paddingX: "1.75rem",
  paddingY: "1.85rem",
  borderRadius: "0rem",
  sideColor: "#454905",
  sideHeight: "30rem",
  sideWidth: "22rem",
  sideArrowWidth: "2.75rem",
  sideArrowColor: "#FFFFFF",
  sideArrowOpacity: 0.7,
  bridgeColor: "#506D0E",
  bridgeWidth: "22rem",
  bridgeHeight: "auto",
  bridgePaddingX: "1.75rem",
  bridgePaddingY: "2.85rem",
  arrowSize: "4.75rem",
  arrowColor: "#FFFFFF",
  arrowOpacity: 0.2,
  labelSize: "1.85rem",
  labelColor: "#FFFFFF",
  labelWeight: 400,
  labelOpacity: 0.2,
  titleSize: "clamp(1.75rem, 3vw, 5.5rem)",
  titleColor: "#FFF1DA",
  titleWeight: 700,
  subtitleSize: "0.9rem",
  subtitleColor: "#FFFFFF",
  subtitleWeight: 700,
  listSize: "1rem",
  listColor: "#FFFFFF",
  listWeight: 700,
  bridgeTitleSize: "1rem",
  bridgeTitleColor: "#FFFFFF",
  bridgeTitleWeight: 600,
  bridgeListSize: "1rem",
  bridgeListColor: "#FFFFFF",
  bridgeListWeight: 700,
} as const;

const FLUX_SIDES = [
  {
    label: "FLUX 1",
    title: "Diaspora",
    subtitle: "vers les Territoires",
    items: [
      "Expertise",
      "Technologies",
      "Investissements",
      "Réseaux",
      "Marchés",
      "Capital",
    ],
  },
  {
    label: "FLUX 2",
    title: "Territoires",
    subtitle: "vers la Diaspora & les marchés",
    items: [
      "Besoins solvables",
      "Foncier",
      "Ressources",
      "Contrats",
      "Talents",
      "Opportunités",
    ],
  },
] as const;

const FLUX_BRIDGE = [
  "Territoires",
  "Solutionneurs",
  "Décideurs",
  "Capital",
  "Marchés",
] as const;

const glassClass =
  "shadow-[inset_0_1px_0_rgb(255_255_255_/_0.14)] [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none";

export function LiaisonSection() {
  return (
    <section id="liaison" className="relative" aria-label="Liaison">
      <div
        className="pointer-events-none absolute top-0 right-0 z-0 size-[71px] bg-brand-glow-mint"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-16 -right-16 z-0 size-72 rounded-full bg-brand-glow-mint opacity-90 blur-[90px] md:size-[32rem] md:blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-[1] overflow-hidden rounded-t-[71px]">
        <Image
          src="/images/background_link_section-1920.webp"
          alt=""
          width={3840}
          height={5782}
          sizes="100vw"
          className="block h-auto w-full"
        />

        <div className="absolute inset-x-0 top-0 z-10 flex min-h-[min(100dvh,52rem)] items-center justify-center px-[var(--page-gutter)] py-16">
          <div
            className={`w-full text-center text-brand-cream ${glassClass} [@media(prefers-reduced-transparency:reduce)]:[background-color:color-mix(in_srgb,var(--liaison-card-color)_82%,transparent)]`}
            style={
              {
                "--liaison-card-color": CARD.color,
                maxWidth: CARD.maxWidth,
                padding: `${CARD.paddingY} ${CARD.paddingX}`,
                borderRadius: CARD.borderRadius,
                backgroundColor: `color-mix(in srgb, ${CARD.color} ${CARD.opacity * 100}%, transparent)`,
                backdropFilter: `blur(${CARD.blurPx}px)`,
                WebkitBackdropFilter: `blur(${CARD.blurPx}px)`,
                transform: `translate(${CARD.offsetX}, ${CARD.offsetY})`,
              } as CSSProperties
            }
          >
            <p
              className="font-medium leading-snug"
              style={{ fontSize: CARD.text1Size, color: CARD.text1Color }}
            >
              La Prospérité à Double Sens
            </p>
            <h2
              className={`${bricolage.className} mt-4 text-balance font-bold leading-[1.15] uppercase`}
              style={{ fontSize: CARD.text2Size, color: CARD.text2Color }}
            >
              LA PROSPÉRITÉ NE DESCEND PAS DANS UN SEUL SENS.
            </h2>
            <p
              className={`${inter.className} mx-auto mt-5 max-w-[42rem] text-pretty leading-[1.2]`}
              style={{
                fontSize: CARD.text3Size,
                color: CARD.text3Color,
                fontWeight: CARD.text3Weight,
              }}
            >
              Back2Mboa n&apos;organise pas seulement le retour des
              compétences, il organise la circulation des opportunités, des
              solutions, du capital et des marchés dans les deux sens.
            </p>
          </div>
        </div>

        <div
          className="absolute inset-x-0 z-10 px-[var(--page-gutter)]"
          style={{ top: FLUX.top }}
        >
          <div
            className="mx-auto flex flex-col items-center md:flex-row md:justify-center"
            style={{ maxWidth: FLUX.maxWidth, gap: FLUX.gap }}
          >
            <FluxSide {...FLUX_SIDES[0]} />

            <article
              className="flex flex-col items-center self-center text-center"
              style={{
                borderRadius: FLUX.borderRadius,
                backgroundColor: FLUX.bridgeColor,
                padding: `${FLUX.bridgePaddingY} ${FLUX.bridgePaddingX}`,
                width: FLUX.bridgeWidth,
                height: FLUX.bridgeHeight,
                maxWidth: "100%",
                flexShrink: 0,
              }}
            >
              <span
                aria-hidden="true"
                className="leading-none"
                style={{
                  fontSize: FLUX.arrowSize,
                  color: FLUX.arrowColor,
                  opacity: FLUX.arrowOpacity,
                }}
              >
                ⇄
              </span>
              <p
                className={`${bricolage.className} mt-4 leading-snug`}
                style={{
                  fontSize: FLUX.bridgeTitleSize,
                  color: FLUX.bridgeTitleColor,
                  fontWeight: FLUX.bridgeTitleWeight,
                }}
              >
                L&apos;Autoroute de la Prospérité™
              </p>
              <ul
                className={`${inter.className} mt-6 flex flex-col gap-2`}
                style={{
                  fontSize: FLUX.bridgeListSize,
                  color: FLUX.bridgeListColor,
                  fontWeight: FLUX.bridgeListWeight,
                }}
              >
                {FLUX_BRIDGE.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <FluxSide {...FLUX_SIDES[1]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FluxSide({
  label,
  title,
  subtitle,
  items,
}: (typeof FLUX_SIDES)[number]) {
  return (
    <article
      className="flex flex-col"
      style={{
        borderRadius: FLUX.borderRadius,
        backgroundColor: FLUX.sideColor,
        padding: `${FLUX.paddingY} ${FLUX.paddingX}`,
        width: FLUX.sideWidth,
        height: FLUX.sideHeight,
        maxWidth: "100%",
        flexShrink: 0,
      }}
    >
      <p
        className="tracking-wide uppercase"
        style={{
          fontSize: FLUX.labelSize,
          color: FLUX.labelColor,
          fontWeight: FLUX.labelWeight,
          opacity: FLUX.labelOpacity,
        }}
      >
        {label}
      </p>
      <h3
        className={`${bricolage.className} mt-3 leading-none`}
        style={{
          fontSize: FLUX.titleSize,
          color: FLUX.titleColor,
          fontWeight: FLUX.titleWeight,
        }}
      >
        {title}
      </h3>
      <p
        className={`${inter.className} mt-3 flex items-center gap-1.5 leading-snug`}
        style={{
          fontSize: FLUX.subtitleSize,
          color: FLUX.subtitleColor,
          fontWeight: FLUX.subtitleWeight,
        }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 56 10"
          className="shrink-0"
          style={{
            width: FLUX.sideArrowWidth,
            height: "0.55em",
            color: FLUX.sideArrowColor,
            opacity: FLUX.sideArrowOpacity,
          }}
        >
          <path
            d="M0 5h46M40 1.6 54.5 5 40 8.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {subtitle}
      </p>
      <ul
        className={`${inter.className} mt-6 flex flex-col gap-2`}
        style={{
          fontSize: FLUX.listSize,
          color: FLUX.listColor,
          fontWeight: FLUX.listWeight,
        }}
      >
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2.5">
            <span className="size-1 shrink-0 rounded-full bg-current" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
