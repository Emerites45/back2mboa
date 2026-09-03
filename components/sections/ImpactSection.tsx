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
import { cn } from "@/lib/utils";

/* Y_HIDDEN : sous la crête opaque (alpha), pas de fade — occlusion réelle par mount_*.webp */
const TEXT_Y_SHOWN = "0vh";
const TEXT_Y_HIDDEN_1 = "56vh";
const TEXT_Y_HIDDEN_2 = "48vh";
/* Plage ≈ 80vh de scroll (linéaire) : plus courte, les stats dépassent le scroll. */
const REVEAL_MOUNT_1 = ["start end", "start 0.18"] as const;
const REVEAL_MOUNT_2 = ["start end", "start 0.32"] as const;

const IMPACT = {
  title: "2026 : Nous passons à l'échelle !",
  subtitle:
    "L'alliance inédite des investisseurs, décideurs territoriaux et entreprises pour propulser l'économie camerounaise.",
  tagline: ["Des milliards", "de FCFA en perspective."],
  taglineSub:
    "Une force de frappe économique mobilisée pour catalyser les projets d'avenir.",
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

function MobileImpactSection() {
  const reduce = useReducedMotion();

  const fadeUp = {
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-30px" },
    transition: { duration: reduce ? 0 : 0.5, ease: "easeOut" as const },
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0088aa] via-[#025b70] to-[#0a2b21] px-4 pt-14 pb-16 sm:px-6 md:hidden">
      {/* Ciel en arrière-plan */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] overflow-hidden opacity-60">
        <Image
          src="/images/sky-768.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0088aa]/40 to-[#025b70]" />
      </div>

      <div className="relative z-10 mx-auto max-w-lg">
        {/* ── EN-TÊTE ─────────────────────────── */}
        <motion.header {...fadeUp} className="text-center">
          <h2 className="font-[family-name:var(--font-bricolage)] text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] sm:text-4xl">
            {IMPACT.title}
          </h2>
          <p className="mx-auto mt-2.5 max-w-xs text-pretty text-xs font-medium leading-relaxed text-emerald-100/90 sm:text-sm">
            {IMPACT.subtitle}
          </p>
        </motion.header>

        {/* ── PALIER 1 : ÉCOSYSTÈME (5 STATS) ─── */}
        <motion.div {...fadeUp} className="mt-9">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {STATS_MOUNT_1.slice(0, 4).map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/[0.13] p-4 text-center"
              >
                <p className="font-[family-name:var(--font-oswald)] text-3xl font-bold tracking-tight text-white tabular-nums sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1.5 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-semibold leading-tight text-white/95 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}

            {/* 5ème stat mise en valeur (pleine largeur) */}
            <div className="col-span-2 flex items-center justify-between gap-3 rounded-2xl border border-amber-300/30 bg-white/[0.14] px-4 py-3.5">
              <div className="flex items-center gap-3">
                <span className="font-[family-name:var(--font-oswald)] text-3xl font-bold tracking-tight text-amber-300 tabular-nums sm:text-4xl">
                  {STATS_MOUNT_1[4].value}
                </span>
                <div className="h-7 w-px bg-white/25" />
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs font-semibold text-white sm:text-sm">
                  {STATS_MOUNT_1[4].label}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── PALIER 2 : TERRAIN (3 STATS) ───── */}
        <motion.div {...fadeUp}>
          <div className="flex flex-col gap-2.5">
            {STATS_MOUNT_2.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3.5 rounded-2xl border border-white/20 bg-white/[0.13] px-4 py-3.5"
              >
                <div className="flex h-11 w-14 shrink-0 items-center justify-center rounded-xl border border-amber-400/35 bg-amber-400/15">
                  <span className="font-[family-name:var(--font-oswald)] text-2xl font-bold tracking-tight text-amber-300 tabular-nums sm:text-3xl">
                    {stat.value}
                  </span>
                </div>
                <p className="flex-1 font-[family-name:var(--font-ibm-plex-mono)] text-xs font-semibold leading-snug text-white/95 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── SOMMET : TAGLINE & PERSPECTIVE ── */}
        <motion.div
          {...fadeUp}
          className="relative mt-8 overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-b from-[#024350]/85 to-[#0a2b21] p-6 text-center"
        >
          <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
            <Image
              src="/images/mount_2-768.webp"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a2b21] via-[#0a2b21]/70 to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-bold uppercase tracking-widest text-amber-300">
              Objectif 2026
            </span>
            <h3 className="mt-2 font-[family-name:var(--font-bricolage)] text-2xl font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)] sm:text-3xl">
              {IMPACT.tagline[0]}
              <br />
              {IMPACT.tagline[1]}
            </h3>
            <p className="mt-2 max-w-xs text-pretty text-xs font-medium leading-relaxed text-emerald-100/90">
              {IMPACT.taglineSub}
            </p>
          </div>
        </motion.div>

        {/* ── BANDEAU PARTENAIRES ─── */}
        <motion.div
          {...fadeUp}
          className="mt-5 rounded-2xl border border-white/20 bg-white/[0.12] p-4"
        >
          <p className="mb-3.5 text-center font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-bold uppercase tracking-widest text-emerald-200">
            Partenaires & Alliances stratégiques
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {PARTNERS.map((partner, index) => {
              const isCenter = index === CENTER_PARTNER_INDEX;
              return (
                <div
                  key={partner.src}
                  className={cn(
                    "flex h-11 items-center justify-center rounded-xl px-3 py-1.5 transition-transform",
                    isCenter
                      ? "border border-white bg-white"
                      : "border border-white/20 bg-white/10",
                  )}
                  style={
                    isCenter
                      ? { padding: "0.45rem 0.85rem" }
                      : { width: "7.25rem" }
                  }
                >
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={isCenter ? 120 : 110}
                    height={36}
                    unoptimized
                    className={cn(
                      "h-7 w-auto object-contain",
                      isCenter ? "opacity-100" : "max-w-full opacity-90",
                    )}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function ImpactSection() {
  const mount1Ref = useRef<HTMLDivElement>(null);
  const mount2Ref = useRef<HTMLDivElement>(null);
  const reveal1 = useMountainReveal(mount1Ref, REVEAL_MOUNT_1, TEXT_Y_HIDDEN_1);
  const reveal2 = useMountainReveal(mount2Ref, REVEAL_MOUNT_2, TEXT_Y_HIDDEN_2);

  return (
    <section id="impact" aria-label="Impact et Passage à l'échelle">
      {/* ═══════ 1. VERSION MOBILE REPENSÉE DE ZÉRO (< md:) ═══════ */}
      <MobileImpactSection />

      {/* ═══════ 2. VERSION DESKTOP AVEC PARALLAXE (>= md:) ═══════ */}
      <div className="relative hidden h-[165vh] overflow-hidden bg-[#0088aa] md:block">
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
          className="absolute inset-x-0 top-[22%] z-10 mx-auto grid max-w-[90rem] grid-cols-5 gap-x-4 gap-y-8 px-[var(--page-gutter)] md:gap-x-6"
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
          className="absolute inset-x-0 top-[38%] z-[25] mx-auto grid max-w-[52rem] grid-cols-3 gap-x-6 gap-y-8 px-[var(--page-gutter)] md:gap-x-10"
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
              className="flex items-center justify-around bg-white/25 px-6 py-4 md:px-16"
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
                        : "relative flex h-8 w-[7.5rem] items-center justify-center md:h-10 md:w-[9rem]"
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
      </div>
    </section>
  );
}
