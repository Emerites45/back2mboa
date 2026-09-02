"use client";

import { useRef, type RefObject } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* Y_HIDDEN : sous la crête opaque (alpha), pas de fade — occlusion réelle par mount_*.webp */
const TEXT_Y_SHOWN = "0vh";
const TEXT_Y_HIDDEN_1 = "56vh";
const TEXT_Y_HIDDEN_2 = "48vh";
/* Plage ≈ 80vh de scroll (linéaire) : plus courte, les stats dépassent le scroll. */
const REVEAL_MOUNT_1 = ["start end", "start 0.18"] as const;
const REVEAL_MOUNT_2 = ["start end", "start 0.32"] as const;

const IMPACT = {
  title: "2026 : Nous passons à l'échelle !",
  tagline: ["Des milliards", "de FCFA en perspective."],
} as const;

const STATS_MOUNT_1 = [
  { value: "100+", label: "Investisseurs" },
  { value: "50+", label: "Décideurs & Intendants territoriaux" },
  { value: "70+", label: "Régulateurs" },
  { value: "40+", label: "Investisseurs & PTF" },
  { value: "40+", label: "Entreprises" },
] as const;

const STATS_MOUNT_2 = [
  { value: "40+", label: "Projets matchés qualifiés" },
  { value: "50+", label: "Médias référencés" },
  { value: "10", label: "Chefs traditionnels" },
] as const;

const TYPE = {
  titleSize: "clamp(2rem, 5.5vw, 4rem)",
  titleWeight: 800,
  titleTop: "6%",
  figureSize: "clamp(2.75rem, 8vw, 6rem)",
  figureWeight: 700,
  labelSize: "clamp(0.75rem, 1.4vw, 1.5rem)",
  labelWeight: 700,
  headlineSize: "clamp(1.75rem, 4.5vw, 3.75rem)",
  headlineWeight: 700,
} as const;

const PARTNERS = [
  { src: "/images/partners/partner-1.svg", alt: "Logo partenaire 1" },
  { src: "/images/partners/partner-2.svg", alt: "Logo partenaire 2" },
  { src: "/images/partners/partner-3.svg", alt: "Logo partenaire 3" },
  { src: "/images/partners/partner-4.svg", alt: "Logo partenaire 4" },
  { src: "/images/partners/partner-5.svg", alt: "Logo partenaire 5" },
] as const;

const BAND = {
  top: "65%",
  gap: "5rem",
  blur: "8px",
  framePad: "0.55rem 0.85rem",
  frameRadius: "0.35rem",
} as const;

const CENTER_PARTNER_INDEX = Math.floor(PARTNERS.length / 2);

function useMountainReveal(
  target: RefObject<HTMLDivElement | null>,
  offset: typeof REVEAL_MOUNT_1 | typeof REVEAL_MOUNT_2,
  yHidden: string,
) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: [offset[0], offset[1]],
  });
  const y = useTransform(scrollYProgress, [0, 1], [yHidden, TEXT_Y_SHOWN]);
  return {
    style: reduce ? { y: TEXT_Y_SHOWN } : { y },
  };
}

function StatRow({
  stats,
  className,
  style,
}: {
  stats: readonly { value: string; label: string }[];
  className: string;
  style: { y: MotionValue<string> | string };
}) {
  return (
    <motion.ul style={style} className={className}>
      {stats.map((stat) => (
        <li key={stat.label} className="text-center">
          <p
            className="font-[family-name:var(--font-oswald)] leading-none tracking-[-0.04em] text-white tabular-nums [text-shadow:0_2px_28px_rgb(0_0_0_/_0.35)]"
            style={{ fontSize: TYPE.figureSize, fontWeight: TYPE.figureWeight }}
          >
            {stat.value}
          </p>
          <p
            className="mx-auto mt-2 max-w-[22ch] text-pretty font-[family-name:var(--font-ibm-plex-mono)] leading-snug text-[#2c3d34]"
            style={{ fontSize: TYPE.labelSize, fontWeight: TYPE.labelWeight }}
          >
            {stat.label}
          </p>
        </li>
      ))}
    </motion.ul>
  );
}

export function ImpactSection() {
  const mount1Ref = useRef<HTMLDivElement>(null);
  const mount2Ref = useRef<HTMLDivElement>(null);
  const reveal1 = useMountainReveal(mount1Ref, REVEAL_MOUNT_1, TEXT_Y_HIDDEN_1);
  const reveal2 = useMountainReveal(mount2Ref, REVEAL_MOUNT_2, TEXT_Y_HIDDEN_2);

  return (
    <section
      id="impact"
      className="relative min-h-[120vh] overflow-x-hidden overflow-y-visible bg-[#0088aa] md:h-[165vh] md:overflow-hidden"
      aria-label="Impact"
    >
      <div className="absolute inset-x-0 -top-[4%] bottom-0 z-0">
        <Image
          src="/images/sky-1920.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      <h2
        className="pointer-events-none absolute inset-x-0 z-[15] px-[var(--page-gutter)] text-center font-[family-name:var(--font-bricolage)] leading-[1.05] tracking-[-0.03em] text-balance text-white [text-shadow:0_2px_32px_rgb(0_0_0_/_0.4)]"
        style={{
          top: TYPE.titleTop,
          fontSize: TYPE.titleSize,
          fontWeight: TYPE.titleWeight,
        }}
      >
        {IMPACT.title}
      </h2>

      <StatRow
        stats={STATS_MOUNT_1}
        style={reveal1.style}
        className="absolute inset-x-0 top-[22%] z-10 mx-auto grid max-w-[90rem] grid-cols-2 gap-x-4 gap-y-8 px-[var(--page-gutter)] sm:grid-cols-3 md:grid-cols-5 md:gap-x-6"
      />

      <div
        ref={mount1Ref}
        className="absolute inset-x-0 top-[26%] bottom-0 z-20"
      >
        <Image
          src="/images/mount_1-1920.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      <StatRow
        stats={STATS_MOUNT_2}
        style={reveal2.style}
        className="absolute inset-x-0 top-[38%] z-[25] mx-auto grid max-w-[52rem] grid-cols-1 gap-y-8 px-[var(--page-gutter)] sm:grid-cols-3 sm:gap-x-6 md:gap-x-10"
      />

      <div
        ref={mount2Ref}
        className="absolute inset-x-0 top-[42%] bottom-0 z-30"
      >
        <Image
          src="/images/mount_2-1920.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
        <div
          className="absolute inset-x-0 z-10 -translate-y-1/2"
          style={{ top: BAND.top }}
        >
          <h2
            className="px-[var(--page-gutter)] text-center font-[family-name:var(--font-bricolage)] leading-[1.05] tracking-[-0.03em] text-balance text-white [text-shadow:0_2px_28px_rgb(0_0_0_/_0.4)]"
            style={{
              fontSize: TYPE.headlineSize,
              fontWeight: TYPE.headlineWeight,
              marginBottom: BAND.gap,
            }}
          >
            {IMPACT.tagline[0]}
            <br />
            {IMPACT.tagline[1]}
          </h2>
          <div
            className="flex flex-wrap items-center justify-center gap-4 bg-white/25 px-4 py-4 sm:justify-around sm:gap-2 md:px-16"
            style={{ backdropFilter: `blur(${BAND.blur})` }}
          >
            {PARTNERS.map((partner, index) => {
              const isCenter = index === CENTER_PARTNER_INDEX;
              return (
                <div
                  key={partner.src}
                  className={
                    isCenter
                      ? "relative flex items-center justify-center bg-white"
                      : "relative flex h-8 w-[5.5rem] shrink-0 items-center justify-center sm:w-[7.5rem] md:h-10 md:w-[9rem]"
                  }
                  style={
                    isCenter
                      ? {
                          padding: BAND.framePad,
                          borderRadius: BAND.frameRadius,
                        }
                      : undefined
                  }
                >
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={isCenter ? 148 : 160}
                    height={48}
                    unoptimized
                    className={
                      isCenter
                        ? "mx-auto h-8 w-auto object-contain md:h-10"
                        : "h-full w-auto max-w-full object-contain opacity-90"
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
