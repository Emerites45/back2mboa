"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { TEAM_COPY } from "@/data/team";
import { cn } from "@/lib/utils";
import { TeamMemberCard } from "./TeamMemberCard";
import { getFeaturedTrack, getSecondaryGrid } from "./secondary-grid";

const TYPE = {
  titleFont: "var(--font-great-vibes)",
  /** Desktop. */
  titleSize: "clamp(2.4rem, 6vh, 4.25rem)",
  /** Mobile — un peu plus compact. */
  titleSizeMobile: "clamp(2.1rem, 10vw, 2.75rem)",
  subtitleFont: "var(--font-bricolage)",
  subtitleSize: "0.75rem",
  subtitleWeight: 600,
} as const;

const SECTION = {
  gridMax: "72rem",
  /** Hauteur max founder mobile. */
  featuredMaxHMobile: "min(48svh, 22rem)",
  hint: "Touchez une carte pour découvrir le profil",
} as const;

/** Démo flip mobile (1re carte après le founder) — jusqu’au 1er tap user. */
const DEMO = {
  /** Délai avant la 1re démo. */
  initialDelayMs: 1400,
  /** Intervalle face avant ↔ verso. */
  intervalMs: 2800,
} as const;

function CameroonMapWatermark() {
  return (
    <svg
      className="pointer-events-none absolute top-[6%] right-[-4%] z-0 hidden h-auto w-[min(36vw,22rem)] opacity-[0.12] sm:block"
      viewBox="0 0 200 220"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M100 8 C120 12 145 28 155 55 C168 90 175 120 168 150 C160 175 145 195 120 208 C95 218 70 215 50 200 C30 185 18 160 15 130 C12 95 20 65 40 40 C55 22 78 10 100 8Z"
        fill="var(--brand-result)"
      />
      <circle cx="118" cy="95" r="5" fill="var(--brand-yellow)" opacity="0.85" />
    </svg>
  );
}

function isFinePointerHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function TeamSection() {
  const { title, subtitle, members } = TEAM_COPY;
  const featured = members.find((m) => m.featured) ?? members[0];
  const rest = members.filter((m) => m.id !== featured.id);
  const { cols, rows } = getSecondaryGrid(rest.length);
  const featuredTrack = getFeaturedTrack(rest.length);
  const secondaryTracks =
    cols > 0 ? `repeat(${cols}, minmax(0, 1fr))` : null;

  /** Une seule carte retournée à la fois (mobile / tap). */
  const [flippedId, setFlippedId] = useState<string | null>(null);
  /** L’user a déjà tapé une carte → stop démo auto. */
  const [discovered, setDiscovered] = useState(false);
  const [sectionInView, setSectionInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const demoId = rest[0]?.id ?? null;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setSectionInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (discovered || !demoId || !sectionInView) return;
    if (isFinePointerHover() || prefersReducedMotion()) return;

    let showBack = false;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const delayId = setTimeout(() => {
      showBack = true;
      setFlippedId(demoId);
      intervalId = setInterval(() => {
        showBack = !showBack;
        setFlippedId(showBack ? demoId : null);
      }, DEMO.intervalMs);
    }, DEMO.initialDelayMs);

    return () => {
      clearTimeout(delayId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [discovered, demoId, sectionInView]);

  function activateCard(id: string) {
    setDiscovered(true);
    setFlippedId((current) => (current === id ? null : id));
  }

  return (
    <section
      ref={sectionRef}
      id="team"
      className={cn(
        "relative flex w-full flex-col",
        "min-h-dvh overflow-x-hidden",
        "px-4 py-5",
        "lg:h-dvh lg:overflow-y-auto lg:overflow-x-hidden lg:px-[clamp(1rem,3vw,2.5rem)] lg:py-[clamp(1rem,2.5vh,1.75rem)]",
        "bg-[linear-gradient(165deg,var(--color-dark-green)_0%,#061A14_48%,var(--brand-result)_100%)]",
      )}
      aria-labelledby="team-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_55%_45%_at_12%_88%,rgb(251_191_36_/_0.07),transparent_60%)]"
        aria-hidden="true"
      />
      <CameroonMapWatermark />

      <header className="relative z-[2] mb-4 flex shrink-0 items-end justify-between gap-4 lg:mb-[clamp(0.75rem,2vh,1.25rem)]">
        <div className="min-w-0">
          <h2
            id="team-heading"
            className="relative inline-block text-balance leading-[0.9] font-normal text-white max-lg:[font-size:var(--team-title-m)] lg:[font-size:var(--team-title)]"
            style={
              {
                fontFamily: TYPE.titleFont,
                "--team-title": TYPE.titleSize,
                "--team-title-m": TYPE.titleSizeMobile,
              } as CSSProperties
            }
          >
            <span
              className="absolute inset-x-0 bottom-[0.08em] -z-10 h-[0.16em] -skew-x-[8deg] rounded-sm bg-brand-yellow opacity-90"
              aria-hidden="true"
            />
            {title}
          </h2>
          <p
            className="mt-1.5 text-pretty text-white/55"
            style={{
              fontFamily: TYPE.subtitleFont,
              fontSize: TYPE.subtitleSize,
              fontWeight: TYPE.subtitleWeight,
            }}
          >
            {subtitle}
          </p>
        </div>
      </header>

      <div
        className={cn(
          "relative z-[2] mx-auto grid w-full max-w-[var(--team-grid-max)]",
          "grid-cols-2 gap-2.5",
          "lg:min-h-0 lg:flex-1 lg:gap-[clamp(0.65rem,1.2vh,1rem)]",
          "lg:[grid-template-columns:var(--team-gtc)]",
          "lg:[grid-template-rows:var(--team-gtr)]",
        )}
        style={
          {
            "--team-grid-max": SECTION.gridMax,
            "--team-gtc": secondaryTracks
              ? `${featuredTrack} ${secondaryTracks}`
              : featuredTrack,
            "--team-gtr": `repeat(${rows}, minmax(0, 1fr))`,
            "--team-row-span": String(rows),
          } as CSSProperties
        }
      >
        <TeamMemberCard
          member={featured}
          featured
          flipped={flippedId === featured.id}
          onActivate={() => activateCard(featured.id)}
          className={cn(
            "col-span-2 w-full",
            "aspect-[3/4] max-h-[var(--team-featured-max-h)]",
            "lg:col-span-1 lg:col-start-1 lg:row-start-1",
            "lg:aspect-auto lg:max-h-none lg:h-full lg:min-h-0",
            "lg:[grid-row:1/span_var(--team-row-span)]",
          )}
          style={
            {
              "--team-featured-max-h": SECTION.featuredMaxHMobile,
            } as CSSProperties
          }
        />
        {rest.map((member) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            flipped={flippedId === member.id}
            onActivate={() => activateCard(member.id)}
            className="aspect-[3/4] min-h-[10.5rem] w-full lg:aspect-auto lg:h-full lg:min-h-0"
          />
        ))}
      </div>

      <p className="relative z-[2] mt-4 shrink-0 text-center text-[0.7rem] tracking-[0.03em] text-white/40 lg:hidden">
        {SECTION.hint}
      </p>
    </section>
  );
}
