"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { METHODE_COPY } from "@/data/methode";
import { cn } from "@/lib/utils";

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

const TYPE = {
  eyebrowFont: "var(--font-roboto)",
  eyebrowSize: "0.8125rem",
  eyebrowWeight: 500,

  titleFont: "var(--font-bricolage)",
  titleSize: "clamp(1.5rem, 4.2vw, 3.35rem)",
  titleWeight: 700,

  leadFont: "var(--font-roboto)",
  leadSize: "1rem",
  leadWeight: 400,

  pillarTitleFont: "var(--font-bricolage)",
  pillarTitleSize: "1.05rem",
  pillarTitleWeight: 700,

  pillarBodyFont: "var(--font-roboto)",
  pillarBodySize: "0.875rem",
  pillarBodyWeight: 400,

  versoTitleFont: "var(--font-bricolage)",
  versoTitleSize: "1.3rem",
  versoTitleWeight: 700,

  versoSubtitleFont: "var(--font-bricolage)",
  versoSubtitleSize: "0.92rem",
  versoSubtitleWeight: 600,

  versoBodyFont: "var(--font-roboto)",
  versoBodySize: "0.88rem",
  versoBodyWeight: 400,

  versoBottomFont: "var(--font-roboto-mono)",
  versoBottomSize: "0.7rem",
  versoBottomWeight: 500,
} as const;

const SECTION = {
  height: "100dvh",
  paddingY: "clamp(1.25rem, 3vh, 2.5rem)",
  headerMaxWidth: "40rem",
  headerGap: "0.75rem",
  leadMaxWidth: "120rem",
  cardsMarginTop: "clamp(1.25rem, 3vh, 2.5rem)",
} as const;

const CARD = {
  radius: "1rem",
  gap: "1.5rem",
  shadow: "0 8px 28px rgb(11 31 51 / 0.03), 0 2px 8px rgb(11 31 51 / 0.06)",
  border: "1px solid rgb(11 31 51 / 0.08)",
  imageBg: "#e8ebef",
  bodyBg: "#ffffff",
  bodyHeight: "clamp(9.75rem, 22vh, 11rem)",
  bodyPaddingX: "1.25rem",
  bodyPaddingTop: "1.15rem",
  bodyPaddingBottom: "1.35rem",
  titleGap: "0.5rem",
  titleColor: "#0b1f33",
  bodyColor: "#6b7280",
  bodyLineHeight: 1.55,
  flipMs: 650,
  ease: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

export function MethodeSection() {
  const { eyebrow, watermark, title, lead, pillars } = METHODE_COPY;
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [demoFlip, setDemoFlip] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const demoRan = useRef(false);

  const toggleFlip = useCallback((index: number) => {
    setFlippedCards((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  /* Demo flip : retourne la 1ère carte 2s après apparition, puis la retourne après 3s — une seule fois */
  useEffect(() => {
    if (demoRan.current) return;
    const el = sectionRef.current;
    if (!el) return;

    let flipTimer: ReturnType<typeof setTimeout>;
    let unflipTimer: ReturnType<typeof setTimeout>;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !demoRan.current) {
          demoRan.current = true;
          flipTimer = setTimeout(() => setDemoFlip(true), 2000);
          unflipTimer = setTimeout(() => setDemoFlip(false), 5000);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(flipTimer);
      clearTimeout(unflipTimer);
    };
  }, []);

  const isFlipped = useCallback(
    (index: number) => flippedCards.has(index) || (index === 0 && demoFlip),
    [flippedCards, demoFlip],
  );

  return (
    <section
      ref={sectionRef}
      id="methode"
      className="relative flex flex-col overflow-hidden bg-white px-[var(--page-gutter)] max-lg:h-auto max-lg:min-h-dvh lg:h-dvh"
      style={{
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

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[1120px] flex-col lg:flex-1">
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
          className="grid list-none grid-cols-1 gap-4 p-0 lg:min-h-0 lg:flex-1 lg:grid-cols-3 lg:gap-6"
          style={{
            marginTop: SECTION.cardsMarginTop,
          }}
        >
          {pillars.map((pillar, index) => (
            <Reveal
              key={pillar.id}
              as="li"
              delay={0.2 + index * 0.1}
              className="min-w-0 lg:h-full lg:min-h-0"
            >
              <article
                className="group relative lg:min-h-0 lg:h-full [perspective:1200px]"
                tabIndex={0}
                onClick={() => toggleFlip(index)}
                onFocus={() => toggleFlip(index)}
              >
                <div
                  className={cn(
                    "relative w-full [transform-style:preserve-3d]",
                    "transition-transform duration-[var(--methode-flip)] ease-[var(--methode-ease)]",
                    "h-[clamp(31rem,145vw,38rem)] lg:h-full",
                  )}
                  style={
                    {
                      borderRadius: CARD.radius,
                      "--methode-flip": `${CARD.flipMs}ms`,
                      "--methode-ease": CARD.ease,
                      transform: isFlipped(index) ? "rotateY(180deg)" : "rotateY(0deg)",
                    } as CSSProperties
                  }
                >
                  {/* FRONT */}
                  <div
                    className={cn(
                      "absolute inset-0 flex flex-col overflow-hidden rounded-[inherit]",
                      CARD.border,
                      "[backface-visibility:hidden] [transform:translateZ(0)]",
                    )}
                    style={{ background: CARD.bodyBg, boxShadow: CARD.shadow }}
                  >
                    <div
                      className="relative min-h-0 w-full flex-1 overflow-hidden"
                      style={{ background: CARD.imageBg }}
                    >
                      <Image
                        src={pillar.image}
                        alt={pillar.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 30vw, 90vw"
                        className="absolute inset-0 size-full object-cover object-center"
                      />
                    </div>
                    <div
                      className="flex shrink-0 flex-col"
                      style={{
                        height: CARD.bodyHeight,
                        minHeight: CARD.bodyHeight,
                        paddingLeft: CARD.bodyPaddingX,
                        paddingRight: CARD.bodyPaddingX,
                        paddingTop: CARD.bodyPaddingTop,
                        paddingBottom: CARD.bodyPaddingBottom,
                        gap: CARD.titleGap,
                      }}
                    >
                      <div className="shrink-0">
                        <p
                          className="tracking-[-0.02em] uppercase"
                          style={{
                            fontFamily: TYPE.pillarTitleFont,
                            fontSize: TYPE.pillarTitleSize,
                            fontWeight: TYPE.pillarTitleWeight,
                            color: CARD.titleColor,
                          }}
                        >
                          {pillar.title}
                        </p>
                        <span
                          aria-hidden="true"
                          className="mt-1.5 block h-[2px] w-[2.75rem]"
                          style={{ background: CARD.titleColor, opacity: 0.15 }}
                        />
                      </div>
                      <p
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
                      </p>
                    </div>
                  </div>

                  {/* BACK */}
                  <div
                    className={cn(
                      "absolute inset-0 flex flex-col overflow-hidden rounded-[inherit]",
                      "border border-[rgb(11_31_51/0.08)]",
                      "bg-[#e8ebef]",
                      "p-5 max-lg:overflow-visible",
                      "[backface-visibility:hidden] [transform:rotateY(180deg)]",
                    )}
                  >
                    <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden max-lg:overflow-visible">
                      <p
                        className="leading-tight tracking-[-0.01em]"
                        style={{
                          fontFamily: TYPE.versoTitleFont,
                          fontSize: TYPE.versoTitleSize,
                          fontWeight: TYPE.versoTitleWeight,
                          color: "#0b1f33",
                        }}
                      >
                        {pillar.versoTitle}
                      </p>
                      <p
                        className="leading-snug tracking-[-0.005em]"
                        style={{
                          fontFamily: TYPE.versoSubtitleFont,
                          fontSize: TYPE.versoSubtitleSize,
                          fontWeight: TYPE.versoSubtitleWeight,
                          color: "#1e3a5f",
                        }}
                      >
                        {pillar.versoSubtitle}
                      </p>
                      <div
                        className="min-h-0 flex-1 overflow-hidden text-pretty whitespace-pre-line max-lg:overflow-visible"
                        style={{
                          fontFamily: TYPE.versoBodyFont,
                          fontSize: TYPE.versoBodySize,
                          fontWeight: TYPE.versoBodyWeight,
                          color: "#4b5563",
                          lineHeight: 1.6,
                        }}
                      >
                        {pillar.versoText}
                      </div>
                      <p
                        className="shrink-0 pt-2"
                        style={{
                          fontFamily: TYPE.versoBottomFont,
                          fontSize: TYPE.versoBottomSize,
                          fontWeight: TYPE.versoBottomWeight,
                          color: "#0b1f33",
                          letterSpacing: "0.02em",
                          borderTop: "1px solid rgb(11 31 51 / 0.12)",
                        }}
                      >
                        {pillar.versoBottom}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
