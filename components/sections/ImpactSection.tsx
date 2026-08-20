"use client";

import { useRef, type RefObject } from "react";
import Image from "next/image";
import {
  cubicBezier,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const TEXT_Y_HIDDEN = "32vh";
const TEXT_Y_SHOWN = "0vh";
const REVEAL_EASE = cubicBezier(0.22, 1, 0.36, 1);
const REVEAL_MOUNT_1 = ["0.25 end", "start 0.28"] as const;
const REVEAL_MOUNT_2 = ["0.38 end", "start 0.46"] as const;

const STATS_MOUNT_1 = [
  { value: "100+", label: "Investisseurs diaspora" },
  { value: "50+", label: "Décideurs publics" },
  { value: "70+", label: "Entrepreneurs locaux" },
  { value: "40+", label: "Projets matchés qualifiés" },
] as const;

const STATS_MOUNT_2 = [
  { value: "50+", label: "Décideurs publics" },
  { value: "70+", label: "Entrepreneurs locaux" },
] as const;

const TYPE = {
  figureSize: "clamp(2.75rem, 8vw, 6rem)",
  figureWeight: 700,
  labelSize: "clamp(0.75rem, 1.4vw, 1.5rem)",
  labelWeight: 700,
  headlineSize: "clamp(1.75rem, 4.5vw, 3.75rem)",
  headlineWeight: 700,
} as const;

const PARTNERS = [1, 2, 3, 4, 5] as const;

const BAND = {
  top: "65%",
  gap: "5rem",
  blur: "8px",
} as const;

function useMountainReveal(
  target: RefObject<HTMLDivElement | null>,
  offset: typeof REVEAL_MOUNT_1 | typeof REVEAL_MOUNT_2,
) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: [offset[0], offset[1]],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [TEXT_Y_HIDDEN, TEXT_Y_SHOWN],
    { ease: REVEAL_EASE },
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.28, 1],
    [0, 1, 1],
    { ease: REVEAL_EASE },
  );
  return {
    style: reduce ? { y: TEXT_Y_SHOWN, opacity: 1 } : { y, opacity },
  };
}

function StatRow({
  stats,
  className,
  style,
  firstItemClassName,
}: {
  stats: readonly { value: string; label: string }[];
  className: string;
  style: { y: MotionValue<string> | string; opacity: MotionValue<number> | number };
  firstItemClassName?: string;
}) {
  return (
    <motion.ul style={style} className={className}>
      {stats.map((stat, index) => (
        <li
          key={stat.label}
          className={index === 0 ? `text-center ${firstItemClassName ?? ""}` : "text-center"}
        >
          <p
            className="font-[family-name:var(--font-oswald)] leading-none tracking-[-0.04em] text-white tabular-nums [text-shadow:0_2px_28px_rgb(0_0_0_/_0.35)]"
            style={{ fontSize: TYPE.figureSize, fontWeight: TYPE.figureWeight }}
          >
            {stat.value}
          </p>
          <p
            className="mx-auto mt-2 max-w-[16ch] text-pretty font-[family-name:var(--font-ibm-plex-mono)] leading-snug text-[#2c3d34]"
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
  const reveal1 = useMountainReveal(mount1Ref, REVEAL_MOUNT_1);
  const reveal2 = useMountainReveal(mount2Ref, REVEAL_MOUNT_2);

  return (
    <section
      id="impact"
      className="relative h-[140vh] overflow-hidden bg-[#0088aa]"
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

      <StatRow
        stats={STATS_MOUNT_1}
        style={reveal1.style}
        className="absolute inset-x-0 top-[18%] z-10 mx-auto grid max-w-[90rem] grid-cols-2 gap-x-6 gap-y-8 px-[var(--page-gutter)] md:grid-cols-4 md:gap-x-10"
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
        firstItemClassName="md:col-start-2"
        className="absolute inset-x-0 top-[38%] z-[25] mx-auto grid max-w-[90rem] grid-cols-2 gap-x-6 px-[var(--page-gutter)] md:grid-cols-4 md:gap-x-10"
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
            Des milliards
            <br />
            de FCFA en perspective.
          </h2>
          <div
            className="flex items-center justify-around bg-white/25 px-6 py-4 md:px-16"
            style={{ backdropFilter: `blur(${BAND.blur})` }}
          >
            {PARTNERS.map((partner) => (
              <span
                key={partner}
                className={
                  "font-[family-name:var(--font-ibm-plex-mono)] text-sm font-medium text-white/90 md:text-base"
                }
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
