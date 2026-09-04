import type { CSSProperties } from "react";
import Image from "next/image";

const CARD = {
  color: "#D9D9D9",
  opacity: 0.3,
  blurPx: 6,
  borderRadius: "1.75rem",
  text1Size: "clamp(0.75rem, 1.2vw, 0.8rem)",
  text1Color: "#F9F7F0",
  text2Size: "clamp(1.1rem, 4.2vw, 3.75rem)",
  text2Color: "#FFF1DA",
  text3Size: "clamp(0.85rem, 1.5vw, 1.2rem)",
  text3Color: "#F9F7F0",
  text3Weight: 200,
} as const;

const FLUX = {
  sideColor: "#454905",
  bridgeColor: "#506D0E",
  labelSize: "clamp(1rem, 2vw, 1.85rem)",
  labelColor: "#FFFFFF",
  labelWeight: 400,
  labelOpacity: 0.2,
  titleSize: "clamp(1.1rem, 3vw, 5.5rem)",
  titleColor: "#FFF1DA",
  titleWeight: 700,
  subtitleSize: "clamp(0.75rem, 1.2vw, 0.9rem)",
  subtitleColor: "#FFFFFF",
  subtitleWeight: 700,
  listSize: "clamp(0.8rem, 1.3vw, 1rem)",
  listColor: "#FFFFFF",
  listWeight: 700,
  bridgeTitleSize: "clamp(0.85rem, 1.3vw, 1rem)",
  bridgeTitleColor: "#FFFFFF",
  bridgeTitleWeight: 600,
  bridgeListSize: "clamp(0.85rem, 1.3vw, 1rem)",
  bridgeListColor: "#FFFFFF",
  bridgeListWeight: 700,
  arrowColor: "#FFFFFF",
  arrowOpacity: 0.2,
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

const JOURNEY = {
  lead:
    "En décembre, les territoires vont d'abord chercher ce que la diaspora a à offrir. Deux semaines plus tard, la diaspora vient chercher ce que les territoires ont à offrir. C'est la même route, parcourue dans les deux directions.",
  bridge: "Aller ⇄ Retour",
  legs: [
    {
      id: "europe",
      when: "1er au 7 décembre en Europe",
      where: "Les territoires vont vers la diaspora",
      detail:
        "Salon de la Diaspora, visites d'entreprises et de ports, rendez-vous d'affaires.",
    },
    {
      id: "yaounde",
      when: "16 au 17 décembre à Yaoundé",
      where: "La diaspora vient vers les territoires",
      detail:
        "Musée National : Mayor Calls, Deal Rooms, ateliers sectoriels, signatures.",
    },
  ],
} as const;

const glassClass =
  "shadow-[inset_0_1px_0_rgb(255_255_255_/_0.14)] [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none";

/* Flèche verticale SVG (mobile bridge) */
function ArrowVertical({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <line x1="12" y1="0" x2="12" y2="32" />
      <polyline points="6,26 12,34 18,26" />
    </svg>
  );
}

export function LiaisonSection() {
  return (
    <section
      id="liaison"
      className="relative z-0 isolate overflow-hidden bg-[#1a2a10]"
      aria-label="Liaison"
    >
      <div
        className="pointer-events-none absolute top-0 right-0 z-0 size-[71px] bg-brand-glow-mint"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-16 -right-16 z-0 size-72 rounded-full bg-brand-glow-mint opacity-90 blur-[90px] md:size-[32rem] md:blur-[120px]"
        aria-hidden="true"
      />

      {/* ═══════ MOBILE ═══════ */}
      <div className="relative z-[1] md:hidden">
        {/* Image fond — hauteur contrôlée */}
        <div className="relative h-[55dvh] w-full overflow-hidden">
          <Image
            src="/images/background_link_section-1920.webp"
            alt=""
            width={3840}
            height={5782}
            sizes="100vw"
            className="h-full w-full object-cover object-top"
          />
          {/* Dégradé bas pour fondu vers le contenu */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1a2a10] to-transparent" />

          {/* Carte titre — en tête de l'image */}
          <div
            className={`absolute inset-x-4 top-4 text-center text-brand-cream ${glassClass}`}
            style={
              {
                "--liaison-card-color": CARD.color,
                padding: "clamp(1.15rem, 3.5vw, 1.75rem) clamp(1rem, 4vw, 1.5rem)",
                borderRadius: CARD.borderRadius,
                backgroundColor: `color-mix(in srgb, ${CARD.color} ${CARD.opacity * 100}%, transparent)`,
                backdropFilter: `blur(${CARD.blurPx}px)`,
                WebkitBackdropFilter: `blur(${CARD.blurPx}px)`,
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
              className="mt-2 text-balance font-bold uppercase leading-[1.15] sm:mt-3"
              style={{ fontSize: CARD.text2Size, color: CARD.text2Color }}
            >
              LA PROSPÉRITÉ NE DESCEND PAS DANS UN SEUL SENS.
            </h2>
            <p
              className="mx-auto mt-3 max-w-[42rem] text-pretty leading-[1.2] sm:mt-4"
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

        {/* Flux diagram — flèches verticales */}
        <div className="mx-4 mt-8 flex flex-col items-center gap-0">
          <FluxSide {...FLUX_SIDES[0]} />

          {/* Bridge — flèche verticale */}
          <article
            className="flex w-full flex-col items-center px-6 py-7 text-center"
            style={{ backgroundColor: FLUX.bridgeColor }}
          >
            <ArrowVertical
              className="h-8 w-5"
              style={{
                color: FLUX.arrowColor,
                opacity: FLUX.arrowOpacity,
              } as CSSProperties}
            />
            <p
              className="mt-2 leading-snug"
              style={{
                fontSize: FLUX.bridgeTitleSize,
                color: FLUX.bridgeTitleColor,
                fontWeight: FLUX.bridgeTitleWeight,
              }}
            >
              L&apos;Autoroute de la Prospérité™
            </p>
            <ul
              className="mt-3 flex flex-col gap-1"
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

        {/* Itinéraire — "Aller" ↑ → flèches ↓ → "Retour" ↓ */}
        <div className="mx-4 mt-10 mb-12">
          <p
            className="mx-auto max-w-[46rem] text-center text-pretty font-medium leading-[1.55] tracking-[-0.01em] text-[#FFF1DA]/95"
            style={{ fontSize: "clamp(0.85rem, 3.5vw, 1.12rem)" }}
          >
            {JOURNEY.lead}
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-0">
            <JourneyLeg leg={JOURNEY.legs[0]} />

            {/* Badge Aller ⇄ Retour — vertical */}
            <div className="flex flex-col items-center gap-1.5 py-4">
              <span className="text-[0.7rem] font-bold tracking-[0.06em] text-white/70">
                Aller
              </span>
              <div className="flex flex-col items-center gap-0.5">
                <ArrowVertical
                  className="h-5 w-4 text-white/50"
                />
                <ArrowVertical
                  className="h-5 w-4 text-white/50"
                />
              </div>
              <span className="text-[0.7rem] font-bold tracking-[0.06em] text-white/70">
                Retour
              </span>
            </div>

            <JourneyLeg leg={JOURNEY.legs[1]} />
          </div>
        </div>
      </div>

      {/* ═══════ DESKTOP — overlay sur image ═══════ */}
      <div className="relative z-[1] hidden overflow-hidden md:block">
        <Image
          src="/images/background_link_section-1920.webp"
          alt=""
          width={3840}
          height={5782}
          sizes="100vw"
          className="block h-auto w-full"
        />

        {/* Carte titre — ancrée en tête de section (lecture immédiate) */}
        <div className="absolute inset-x-0 top-0 z-10 flex justify-center px-[var(--page-gutter)] pt-8 pb-6 lg:pt-10">
          <div
            className={`w-full max-w-[92rem] text-center text-brand-cream ${glassClass} [@media(prefers-reduced-transparency:reduce)]:[background-color:color-mix(in_srgb,var(--liaison-card-color)_82%,transparent)]`}
            style={
              {
                "--liaison-card-color": CARD.color,
                padding: "clamp(1.75rem, 3vw, 3rem) clamp(1.5rem, 4vw, 4rem)",
                borderRadius: CARD.borderRadius,
                backgroundColor: `color-mix(in srgb, ${CARD.color} ${CARD.opacity * 100}%, transparent)`,
                backdropFilter: `blur(${CARD.blurPx}px)`,
                WebkitBackdropFilter: `blur(${CARD.blurPx}px)`,
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
              className="mt-4 text-balance font-bold uppercase leading-[1.15]"
              style={{ fontSize: CARD.text2Size, color: CARD.text2Color }}
            >
              LA PROSPÉRITÉ NE DESCEND PAS DANS UN SEUL SENS.
            </h2>
            <p
              className="mx-auto mt-5 max-w-[42rem] text-pretty leading-[1.2]"
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

        {/* Flux diagram */}
        <div
          className="absolute inset-x-0 z-10 px-[var(--page-gutter)]"
          style={{ top: "34%" }}
        >
          <div className="mx-auto flex max-w-[72rem] flex-col items-center gap-0 md:flex-row md:justify-center">
            <FluxSide {...FLUX_SIDES[0]} />

            <article
              className="flex flex-col items-center self-center px-7 py-11 text-center"
              style={{
                borderRadius: "0rem",
                backgroundColor: FLUX.bridgeColor,
                width: "22rem",
                maxWidth: "100%",
                flexShrink: 0,
              }}
            >
              <span
                aria-hidden="true"
                className="text-[4.75rem] leading-none"
                style={{
                  color: FLUX.arrowColor,
                  opacity: FLUX.arrowOpacity,
                }}
              >
                ⇄
              </span>
              <p
                className="mt-4 leading-snug"
                style={{
                  fontSize: FLUX.bridgeTitleSize,
                  color: FLUX.bridgeTitleColor,
                  fontWeight: FLUX.bridgeTitleWeight,
                }}
              >
                L&apos;Autoroute de la Prospérité™
              </p>
              <ul
                className="mt-6 flex flex-col gap-2"
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

            <FluxSide {...FLUX_SIDES[1]} align="end" />
          </div>
        </div>

        {/* Itinéraire double sens */}
        <div
          className="absolute inset-x-0 z-10 px-[var(--page-gutter)]"
          style={{ top: "calc(34% + 45rem)" }}
        >
          <div className="mx-auto max-w-[78rem]">
            <p className="mx-auto max-w-[46rem] text-center text-pretty text-[clamp(0.98rem,1.35vw,1.12rem)] font-medium leading-[1.55] tracking-[-0.01em] text-[#FFF1DA]/95">
              {JOURNEY.lead}
            </p>

            <div className="mt-12 grid grid-cols-1 items-stretch gap-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-x-10 md:gap-y-6 lg:gap-x-14">
              <JourneyLeg leg={JOURNEY.legs[0]} />

              <div className="flex items-center justify-center self-center px-2 py-2">
                <p className="rounded-full border border-white/20 bg-[#506D0E]/90 px-5 py-2.5 text-center text-[0.78rem] font-semibold tracking-[0.04em] text-white shadow-[0_10px_28px_rgba(10,43,33,0.25)]">
                  {JOURNEY.bridge}
                </p>
              </div>

              <JourneyLeg leg={JOURNEY.legs[1]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneyLeg({
  leg,
}: {
  leg: (typeof JOURNEY.legs)[number];
}) {
  return (
    <article className="flex h-full flex-col gap-2.5 rounded-[1.15rem] border border-white/10 bg-[#454905]/92 px-4 py-4 shadow-[0_16px_40px_rgba(10,43,33,0.22)] backdrop-blur-[2px] sm:px-5 sm:py-5 md:px-6 md:py-6">
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/55 sm:text-[0.72rem]">
        {leg.when}
      </p>
      <h4 className="text-[clamp(1rem,1.8vw,1.45rem)] font-bold leading-[1.2] tracking-[-0.02em] text-[#FFF1DA]">
        {leg.where}
      </h4>
      <p className="mt-auto text-[0.82rem] font-medium leading-[1.5] text-white/88 sm:text-[0.92rem]">
        {leg.detail}
      </p>
    </article>
  );
}

function FluxSide({
  label,
  title,
  subtitle,
  items,
  align = "start",
}: (typeof FLUX_SIDES)[number] & { align?: "start" | "end" }) {
  const end = align === "end";

  return (
    <article
      className={`flex w-full flex-col px-5 py-5 sm:px-7 sm:py-7 md:w-[22rem] md:flex-shrink-0 ${
        end ? "md:items-end" : "items-start"
      }`}
      style={{
        borderRadius: "0rem",
        backgroundColor: FLUX.sideColor,
      }}
    >
      <p
        className={`tracking-wide uppercase ${end ? "md:text-right" : "text-left"}`}
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
        className={`mt-2 leading-none sm:mt-3 ${end ? "md:text-right" : "text-left"}`}
        style={{
          fontSize: FLUX.titleSize,
          color: FLUX.titleColor,
          fontWeight: FLUX.titleWeight,
        }}
      >
        {title}
      </h3>
      {/* Même ordre que FLUX 1 (→ + texte) ; le bloc est collé à droite si end */}
      <p
        className={`mt-2 flex items-center gap-1.5 leading-snug sm:mt-3 ${
          end ? "md:self-end" : ""
        }`}
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
            width: "clamp(1.5rem, 3vw, 2.75rem)",
            height: "0.55em",
            color: FLUX.subtitleColor,
            opacity: 0.7,
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
      {/*
        Bloc collé à droite ; chaque ligne en justify-end :
        puces à gauche du mot, fins de texte alignées à droite.
      */}
      <ul
        className={`mt-4 flex w-max flex-col gap-y-1.5 text-right sm:mt-6 sm:gap-y-2 ${
          end ? "md:ml-auto md:self-end" : "self-start text-left"
        }`}
        style={{
          fontSize: FLUX.listSize,
          color: FLUX.listColor,
          fontWeight: FLUX.listWeight,
        }}
      >
        {items.map((item) => (
          <li
            key={item}
            className={`flex w-full items-center gap-2.5 leading-[1.25] ${
              end ? "justify-end" : "justify-start"
            }`}
          >
            {end ? (
              <>
                <span className="text-right">{item}</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="size-3.5 shrink-0"
                  fill="none"
                >
                  <path
                    d="M3.2 8.2 6.4 11.4 12.8 4.6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            ) : (
              <>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="size-3.5 shrink-0"
                  fill="none"
                >
                  <path
                    d="M3.2 8.2 6.4 11.4 12.8 4.6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-left">{item}</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}
