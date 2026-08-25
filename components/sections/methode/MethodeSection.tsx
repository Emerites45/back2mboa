import type { CSSProperties } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { METHODE_COPY } from "@/data/methode";
import { cn } from "@/lib/utils";

/** Watermark « CAP » — typo + position. */
const WATERMARK = {
  font: "var(--font-oswald)",
  size: "clamp(8rem, 28vw, 16rem)",
  weight: 700,
  color: "#e8ebef",
  top: "-1.75rem",
  right: "0.15rem",
  offsetX: "0",
  offsetY: "0",
  zIndex: 0,
} as const;

/** Typo section — taille, graisse, police. */
const TYPE = {
  eyebrowFont: "var(--font-roboto)",
  eyebrowSize: "0.8125rem",
  eyebrowWeight: 500,

  titleFont: "var(--font-bricolage)",
  titleSize: "clamp(1.5rem, 4.2vw, 3.35rem)",
  titleWeight: 700,

  /** Style Figma Subtitle → Roboto. */
  leadFont: "var(--font-roboto)",
  leadSize: "1rem",
  leadWeight: 400,

  pillarTitleFont: "var(--font-bricolage)",
  pillarTitleSize: "1.05rem",
  pillarTitleWeight: 700,

  pillarBodyFont: "var(--font-roboto)",
  pillarBodySize: "0.875rem",
  pillarBodyWeight: 400,
} as const;

/** Section — hauteur viewport + espacements. */
const SECTION = {
  height: "100dvh",
  paddingY: "clamp(1.25rem, 3vh, 2.5rem)",
  headerMaxWidth: "40rem",
  headerGap: "0.75rem",
  leadMaxWidth: "120rem",
  cardsMarginTop: "clamp(1.25rem, 3vh, 2.5rem)",
} as const;

/** Carte pilier — dimensions, profondeur, zones image/texte. */
const CARD = {
  radius: "1rem",
  gap: "1.5rem",
  shadow: "0 8px 28px rgb(11 31 51 / 0.03), 0 2px 8px rgb(11 31 51 / 0.06)",
  border: "1px solid rgb(11 31 51 / 0.08)",
  imageHeight: "65%",
  imageBg: "#e8ebef",
  bodyHeight: "42%",
  bodyBg: "#ffffff",
  bodyPaddingX: "1.25rem",
  bodyPaddingTop: "1.15rem",
  bodyPaddingBottom: "1.35rem",
  titleGap: "0.5rem",
  titleColor: "#0b1f33",
  bodyColor: "#6b7280",
  bodyLineHeight: 1.55,
} as const;

/**
 * Hover carte — ombre + trait accent (pas de déplacement / tilt).
 */
const HOVER = {
  durationMs: 480,
  ease: "cubic-bezier(0.16, 1, 0.3, 1)",
  shadow:
    "0 22px 44px rgb(11 31 51 / 0.14), 0 6px 14px rgb(11 31 51 / 0.08)",
  accentColor: "#0b1f33",
  accentHeight: "2px",
  accentWidth: "2.75rem",
  accentDurationMs: 420,
} as const;

export function MethodeSection() {
  const { eyebrow, watermark, title, lead, pillars } = METHODE_COPY;

  return (
    <section
      id="methode"
      className="relative flex flex-col overflow-hidden bg-white px-[var(--page-gutter)]"
      style={{
        height: SECTION.height,
        paddingTop: SECTION.paddingY,
        paddingBottom: SECTION.paddingY,
      }}
      aria-labelledby="methode-heading"
    >
      <span
        className="pointer-events-none absolute select-none leading-none tracking-[-0.04em]"
        style={{
          fontFamily: WATERMARK.font,
          fontSize: WATERMARK.size,
          fontWeight: WATERMARK.weight,
          color: WATERMARK.color,
          top: WATERMARK.top,
          right: WATERMARK.right,
          transform: `translate(${WATERMARK.offsetX}, ${WATERMARK.offsetY})`,
          zIndex: WATERMARK.zIndex,
        }}
        aria-hidden="true"
      >
        {watermark}
      </span>

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[1120px] flex-1 flex-col">
        <div
          className="relative mx-auto flex w-full shrink-0 flex-col text-center"
          style={{
            maxWidth: SECTION.headerMaxWidth,
            gap: SECTION.headerGap,
          }}
        >
          <Reveal as="p" delay={0} className="tracking-[0.04em] text-brand-copy">
            <span
              style={{
                fontFamily: TYPE.eyebrowFont,
                fontSize: TYPE.eyebrowSize,
                fontWeight: TYPE.eyebrowWeight,
              }}
            >
              {eyebrow}
            </span>
          </Reveal>

          <Reveal as="div" delay={0.08}>
            <h2
              id="methode-heading"
              className="leading-[1.15] tracking-[-0.03em] text-balance text-[#0b1f33] uppercase"
              style={{
                fontFamily: TYPE.titleFont,
                fontSize: TYPE.titleSize,
                fontWeight: TYPE.titleWeight,
              }}
            >
              {title}
            </h2>
          </Reveal>

          <Reveal
            as="p"
            delay={0.16}
            className="mx-auto text-pretty leading-[1.65] text-brand-copy"
          >
            <span
              style={{
                display: "block",
                maxWidth: SECTION.leadMaxWidth,
                marginInline: "auto",
                fontFamily: TYPE.leadFont,
                fontSize: TYPE.leadSize,
                fontWeight: TYPE.leadWeight,
              }}
            >
              {lead}
            </span>
          </Reveal>
        </div>

        <ul
          className="grid min-h-0 flex-1 list-none grid-cols-3 p-0"
          style={{
            gap: CARD.gap,
            marginTop: SECTION.cardsMarginTop,
          }}
        >
          {pillars.map((pillar, index) => (
              <Reveal
                key={pillar.id}
                as="li"
                delay={0.2 + index * 0.1}
                className="h-full min-h-0 min-w-0"
              >
                <Card
                  size="sm"
                  className={cn(
                    "group flex h-full min-h-0 flex-col gap-0 overflow-hidden py-0 ring-0",
                    "transition-[box-shadow]",
                    "hover:z-[2] hover:shadow-[var(--methode-hover-shadow)]",
                    "focus-within:z-[2] focus-within:shadow-[var(--methode-hover-shadow)]",
                    "motion-reduce:transition-none",
                  )}
                  style={
                    {
                      borderRadius: CARD.radius,
                      background: CARD.bodyBg,
                      border: CARD.border,
                      boxShadow: CARD.shadow,
                      transitionDuration: `${HOVER.durationMs}ms`,
                      transitionTimingFunction: HOVER.ease,
                      ["--methode-hover-shadow" as string]: HOVER.shadow,
                      ["--methode-accent" as string]: HOVER.accentColor,
                      ["--methode-accent-h" as string]: HOVER.accentHeight,
                      ["--methode-accent-w" as string]: HOVER.accentWidth,
                      ["--methode-accent-ms" as string]: `${HOVER.accentDurationMs}ms`,
                    } as CSSProperties
                  }
                >
                  <div
                    className="relative w-full shrink-0 overflow-hidden"
                    style={{
                      height: CARD.imageHeight,
                      background: CARD.imageBg,
                    }}
                  >
                    <Image
                      src={pillar.image}
                      alt={pillar.imageAlt}
                      fill
                      sizes="(min-width: 640px) 30vw, 90vw"
                      className="object-cover"
                    />
                  </div>

                  <CardContent
                    className="flex min-h-0 flex-col overflow-hidden px-0"
                    style={{
                      height: CARD.bodyHeight,
                      paddingLeft: CARD.bodyPaddingX,
                      paddingRight: CARD.bodyPaddingX,
                      paddingTop: CARD.bodyPaddingTop,
                      paddingBottom: CARD.bodyPaddingBottom,
                      gap: CARD.titleGap,
                    }}
                  >
                    <div className="shrink-0">
                      <CardTitle
                        className="tracking-[-0.02em] uppercase"
                        style={{
                          fontFamily: TYPE.pillarTitleFont,
                          fontSize: TYPE.pillarTitleSize,
                          fontWeight: TYPE.pillarTitleWeight,
                          color: CARD.titleColor,
                        }}
                      >
                        {pillar.title}
                      </CardTitle>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-1.5 block w-0 transition-[width]",
                          "group-hover:w-[var(--methode-accent-w)]",
                          "group-focus-within:w-[var(--methode-accent-w)]",
                          "motion-reduce:transition-none",
                          "motion-reduce:group-hover:w-[var(--methode-accent-w)]",
                          "motion-reduce:group-focus-within:w-[var(--methode-accent-w)]",
                        )}
                        style={{
                          height: "var(--methode-accent-h)",
                          background: "var(--methode-accent)",
                          transitionDuration: "var(--methode-accent-ms)",
                          transitionTimingFunction: HOVER.ease,
                        }}
                      />
                    </div>
                    <CardDescription
                      className="min-h-0 flex-1 overflow-hidden text-pretty"
                      style={{
                        fontFamily: TYPE.pillarBodyFont,
                        fontSize: TYPE.pillarBodySize,
                        fontWeight: TYPE.pillarBodyWeight,
                        color: CARD.bodyColor,
                        lineHeight: CARD.bodyLineHeight,
                      }}
                    >
                      {pillar.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
